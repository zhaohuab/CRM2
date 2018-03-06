import React, { Component, PropTypes } from "react";
import * as Actions from "../action";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Enum from "utils/components/enums";
import {
    Icon,
    Button,
    Dropdown,
    Menu,
    Collapse,
    Input,
    Row,
    Col,
    Table,
    Modal,
    Form,
    Select
} from "antd";
const Option = Select.Option;
const FormItem = Form.Item;

class LessCard extends React.Component {
    render() {
        const { getFieldDecorator, getFieldsValue } = this.props.form;
        const {pagination, searchMap} = this.props.$$state.toJS();
        return (
            <div id="btn-recover">
                <Form layout="inline" onSubmit={this.handleSubmit}>
                    <Row className="formitem-width" type="flex" gutter={15}>
                        <Col span={6}>
                            <FormItem>
                                {getFieldDecorator("name")(
                                    <Input placeholder="姓名" />
                                )}
                            </FormItem>
                        </Col>
                        <Col span={6}>
                            <FormItem>
                                {getFieldDecorator("mobile")(
                                    <Input placeholder="手机号" />
                                )}
                            </FormItem>
                        </Col>
                        <Col span={6}>
                            <FormItem>
                                <div className="more-btn">
                                    <Button htmlType="submit" onClick={this.props.action.getContactList.bind(this,pagination, searchMap)}>查询</Button>                                 
                                </div>
                            </FormItem>
                        </Col>
                    </Row>
                </Form>
            </div>
        );
    }
}

const SearchForm = Form.create({
    mapPropsToFields: props => {//把redux中的值取出来赋给表单   
        let searchMap = props.$$state.toJS().searchMap;
        let value = {};
        for (let key in searchMap) {
            value[key] = { value: searchMap[key] };
        }
        return {
            ...value
        };
    },
    onFieldsChange: (props, onChangeFild) => {//往redux中写值//把值进行更新改变  
        let searchMap = props.$$state.toJS().searchMap;
        for (let key in onChangeFild) {         
            searchMap[key] = onChangeFild[key].value;
        }
        props.saveSearchMap(searchMap);
    }
})(LessCard);

export default connect(
    state => {
        return {
            $$stateComponent: state.componentReducer,
            $$state: state.contacts
        };
    },
    dispatch => {
        return {
            action: bindActionCreators(Actions, dispatch)
        };
    }
)(SearchForm);
