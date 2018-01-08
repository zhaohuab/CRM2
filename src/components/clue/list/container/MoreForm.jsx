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
    Select,
    DatePicker,
    Cascader
} from "antd";
import cityData from "./citydata";
const Option = Select.Option;
const FormItem = Form.Item;
const { RangePicker } = DatePicker;
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as Actions from "../action";
import Enum from "utils/components/enums";
import * as enumDataFake from "./enumdata.jsx";
 class MoreForm extends React.Component {
    handleSearch(e) {
        e.preventDefault();
        debugger
        this.props.handleSearch(this.props.$$state.toJS().searchMap);
    }
    moreFn() {
        this.props.formMore();
    }


    render() {
        const formItemLayout = {
            labelCol: { span: 2 },
            wrapperCol: { span: 22 }
        };
        const { getFieldDecorator, getFieldsValue } = this.props.form;
        let { enumData } = this.props.$$state.toJS();
        return (
            <div className="header-bottom-inner">
                <Form layout="inline" onSubmit={this.handleSearch.bind(this)}>
                    <Row
                        type="flex"
                        align="middle"
                        className="formitem-width"
                    >
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
                            <FormItem  {...formItemLayout}>
                                {getFieldDecorator("state")(
                                    <Enum
                                    addOptionAll={"线索状态"}
                                    dataSource={enumDataFake.state}
                                />
                                )}
                            </FormItem>
                        </Col>
                        <Col span={6}>
                        
                            <FormItem  {...formItemLayout}>
                                {getFieldDecorator("signTime")(
                                    <RangePicker/>
                                )}
                            </FormItem>
                           
                        </Col>
                      
                    </Row>

                    <Row
                        type="flex"
                        align="middle"
                        className="formitem-width"
                    >
                      <Col span={6}>
                            <FormItem  {...formItemLayout}>
                            {getFieldDecorator("province_city_district")(
                                    <Cascader
                                        options={cityData}
                                        placeholder="省/市/县"
                                    />
                                )}
                            </FormItem>
                        </Col>
                        <Col span={6}>
                            <FormItem  {...formItemLayout}>
                                {getFieldDecorator("industryId")(
                                    <Input placeholder="行业" />
                                )}
                            </FormItem>
                        </Col>
                        {/* <Col span={4}>
                            <FormItem>
                                {getFieldDecorator("deptId")(
                                    <Input placeholder="部门" />
                                )}
                            </FormItem>
                        </Col>
                        <Col span={4}>
                            <FormItem>
                                {getFieldDecorator("name")(
                                    <Input placeholder="负责人" />
                                )}
                            </FormItem>
                        </Col> */}
                        <Col span={4}>
                            <FormItem>
                                <div className="more-btn">
                                    <Button htmlType="submit">查询</Button>
                                    <span  className="more-up"
                                     onClick={this.moreFn.bind(this)}>
                                        收起<Icon type="up" />
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
debugger
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
})(MoreForm);

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