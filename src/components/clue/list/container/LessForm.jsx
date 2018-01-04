import React, { Component, PropTypes } from "react";

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
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as Actions from "../action";
import Enum from "utils/components/enums";
class LessForm extends React.Component {
    handleSearch(e) {
        e.preventDefault();
        debugger;
        this.props.handleSearch(this.props.$$state.toJS().searchMap);
    }

    moreFn() {
        this.props.formMore();
    }
    render() {
        const { getFieldDecorator, getFieldsValue } = this.props.form;
        const formItemLayout = {
            labelCol: { span: 2 },
            wrapperCol: { span: 22 }
        };
        let { enumData } = this.props.$$state.toJS();
        return (
            <div className="less-form">
                <Form layout="inline" onSubmit={this. handleSearch.bind(this)}>
                    <Row className="formitem-width" type="flex" gutter={15}>
                        <Col span={6}>
                            <FormItem  {...formItemLayout}>
                                {getFieldDecorator("level")(
                                    <Enum
                                    addOptionAll={"线索等级"}
                                    dataSource={enumData.level}
                                />
                                )}
                            </FormItem>
                        </Col>
                        <Col span={6}>
                            <FormItem  {...formItemLayout}>
                                {getFieldDecorator("source")(
                                     <Enum
                                     addOptionAll={"线索来源"}
                                     dataSource={enumData.source}
                                 />
                                )}
                            </FormItem>
                        </Col>
                    
                        <Col span={6}>
                            <FormItem >
                                <div className="more-btn">
                                    <Button htmlType="submit">搜索</Button>
                                    <span onClick={this.moreFn.bind(this)}>
                                        展开<Icon type="down" />
                                    </span>
                                </div>
                            </FormItem>
                        </Col>
                    </Row>
                </Form>
            </div>
        );
    }
}
const WarpMilForm = Form.create({
    mapPropsToFields: (props, onChangeFild) => {
        //从redux中读值
        let searchMap = props.$$state.toJS().searchMap;

        let value = {};
        for (let key in searchMap) {
            value[key] = { value: searchMap[key] };
        }
        return {
            ...value
        };
    },
    onFieldsChange: (props, onChangeFild) => {
        //往redux中写值//把值进行更新改变

        let searchMap = props.$$state.toJS().searchMap;
        for (let key in onChangeFild) {
            if (onChangeFild[key].value.key) {
                searchMap[key] = onChangeFild[key].value.key;
            } else {
                searchMap[key] = onChangeFild[key].value;
            }
        }
        props.searchMapFn(searchMap);
    }
})(LessForm);

//绑定状态到组件props
function mapStateToProps(state, ownProps) {
    return {
        $$state: state.clue
    };
}
//绑定action到组件props
function mapDispatchToProps(dispatch) {
    return {
        action: bindActionCreators(Actions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(WarpMilForm);