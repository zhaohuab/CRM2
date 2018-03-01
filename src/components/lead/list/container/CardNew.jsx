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
    Radio
} from "antd";
const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const { TextArea } = Input;
import Email from "utils/components/emails";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as Actions from "../action";
import Enum from "utils/components/enums";
import * as enumDataFake from "./enumdata.jsx";
//省市县
import CityChioce from "./CityChioce";
class NewForm extends React.Component {
    componentDidMount() {

    }

    render() {
        let formItemLayout = {
            labelCol: { span: 7 },
            wrapperCol: { span: 14 }
        };
        let formItemLayout1 = {
            labelCol: { span: 4 },
            wrapperCol: { span: 20 }
        };
        const { getFieldDecorator } = this.props.form;
        let {
            enumData,
        } = this.props.$$state.toJS();
        return (
            <div>
                <Row className="form-input-recover">
                    <Row>
                        <Form>
                            <Row type="flex" justify="center">
                                <Col span={11}>
                                    <FormItem style={{ display: "none" }}>
                                        {getFieldDecorator("id", {})(<Input />)}
                                    </FormItem>
                                    <FormItem
                                        label="姓名"
                                        {...formItemLayout}
                                    >
                                        {getFieldDecorator("name", {
                                            rules: [
                                                {
                                                    required: true,
                                                    message: "请输入姓名"
                                                }
                                            ]
                                        })(<Input placeholder="请输入" />)}
                                    </FormItem>
                                </Col>
                                <Col span={11}>
                                    {" "}
                                    <FormItem label="电话" {...formItemLayout}>
                                        {getFieldDecorator("tel", {

                                        })(<Input placeholder="请输入" />)}
                                    </FormItem>
                                </Col>
                            </Row>
                            <Row type="flex" justify="center">
                                <Col span={11}>
                                    <FormItem label="公司名称" {...formItemLayout}>
                                        {getFieldDecorator("companyName", {
                                            rules: [
                                                {
                                                    required: true,
                                                    message: "请输入公司名称"
                                                }
                                            ]
                                        })(<Input placeholder="请输入..." />)}
                                    </FormItem>
                                </Col>
                                <Col span={11}>
                                    <FormItem label="线索来源" {...formItemLayout}>
                                        {getFieldDecorator("source", {
                                            rules: [
                                                {
                                                    required: true,
                                                    message: "请输入..."
                                                }
                                            ]
                                        })(<Enum
                                            addOptionAll={"线索来源"}
                                            dataSource={enumData.source}
                                        />)}
                                    </FormItem>
                                </Col>
                            </Row>
                            <Row type="flex" justify="center">
                                <Col span={11}>
                                    <FormItem label="行业" {...formItemLayout}>
                                        {getFieldDecorator("industryName")(
                                            <Input placeholder="请输入..." />
                                        )}
                                    </FormItem>
                                </Col>
                                <Col span={11}>
                                    <FormItem label="线索等级" {...formItemLayout}>
                                        {getFieldDecorator("level", {
                                        })(<Enum
                                            addOptionAll={"线索等级"}
                                            dataSource={enumData.level}
                                        />)}
                                    </FormItem>
                                </Col>
                            </Row>
                            <Row type="flex" justify="center">
                                <Col span={11}>
                                    <FormItem label="性别" {...formItemLayout}>
                                        {getFieldDecorator("genderName")(
                                            <Enum
                                                addOptionAll={"性别"}
                                                dataSource={enumDataFake.genderName}
                                            />
                                        )}
                                    </FormItem>
                                </Col>
                                <Col span={11}>
                                    <FormItem label="电子邮件" {...formItemLayout}>
                                        {getFieldDecorator("email", {

                                        })(<Input placeholder="请输入..." />)}
                                    </FormItem>
                                </Col>
                            </Row>
                            <Row type="flex" justify="center">
                                <Col span={11}>
                                    <FormItem label="固定电话" {...formItemLayout}>
                                        {getFieldDecorator("mobile", {

                                        })(<Input placeholder="请输入..." />)}
                                    </FormItem>
                                </Col>
                                <Col span={11}>
                                    <FormItem label="测试数据" {...formItemLayout}>
                                        {getFieldDecorator("email", {

                                        })(<Input placeholder="请输入..." />)}
                                    </FormItem>
                                </Col>
                            </Row>
                            <Row type="flex" justify="center">
                                <Col span={11}>
                                    <FormItem label="职务" {...formItemLayout}>
                                        {getFieldDecorator("post")(
                                            <Enum
                                                addOptionAll={"职务"}
                                                dataSource={enumData.post}
                                            />
                                        )}
                                    </FormItem>
                                </Col>
                                <Col span={11}>
                                    <FormItem label="网址" {...formItemLayout}>
                                        {getFieldDecorator("website", {

                                        })(<Input placeholder="请输入..." />)}
                                    </FormItem>
                                </Col>
                            </Row>
                            <Row type="flex" justify="center">
                                <Col span={11}>
                                    <FormItem label="省/市/区"
                                        {...formItemLayout}
                                    >
                                        {getFieldDecorator(
                                            "province_city_district"
                                        )(<CityChioce />)}
                                    </FormItem>
                                </Col>
                                <Col span={11}>
                                    <FormItem label="地址" {...formItemLayout}>
                                        {getFieldDecorator("address", {

                                        })(<Input placeholder="请输入..." />)}
                                    </FormItem>
                                </Col>
                            </Row>
                            <Row type="flex" justify="space-between">
                                <Col span={24} >
                                    <FormItem label="备注" {...formItemLayout1}>
                                        {getFieldDecorator("remarks")(
                                            <TextArea rows={4} placeholder="请输入..." />
                                        )}
                                    </FormItem>
                                </Col>
                            </Row>
                        </Form>
                    </Row>
                </Row>
            </div>
        );
    }
}

const EditForm = Form.create({
    mapPropsToFields: (props) => {
        //把redux中的值取出来赋给表单
       // debugger
        let viewdata = props.$$state.toJS().editData;
        let value = {};
        debugger
        for (let key in viewData) {
            value[key] = { value: viewData[key] }
        }

        return {
            ...value
        };
    },

    onFieldsChange: (props, onChangeFild) => {
       // debugger
        //往redux中写值
        let viewData = props.$$state.toJS().editData;

        //往redux中写值//把值进行更新改变
        for (let key in onChangeFild) {
            if (onChangeFild[key].value && onChangeFild[key].value.key) {
                viewData[key] = onChangeFild[key].value.key;
            } else {
                if (key == "address") {
                    viewData[key] = onChangeFild[key].value;
                    // let value = onChangeFild[key].value;
                    // viewData["address"] = value.address;
                } else if (key == "province_city_district") {
                    viewData[key] = onChangeFild[key].value.result;
                    viewData["cityMyself"] = onChangeFild[key].value.custom;
                } else {
                    viewData[key] = onChangeFild[key].value;
                } //把对像拆成字段  
            }
        }
        props.action.editCardFn(viewData);
    }
})(NewForm);

//绑定状态到组件props
function mapStateToProps(state, ownProps) {
    return {
        $$state: state.lead
    };
}
//绑定action到组件props
function mapDispatchToProps(dispatch) {
    return {
        action: bindActionCreators(Actions, dispatch)
    };
}
//输出绑定state和action后组件
export default connect(mapStateToProps, mapDispatchToProps)(EditForm);
