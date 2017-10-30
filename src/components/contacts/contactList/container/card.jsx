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
import Email from "utils/components/email";

export default class Card extends React.Component {
    componentDidMount() {
        this.props.form.setFieldsValue(this.props.dataSource);
    }

    render() {
        let formItemLayout = {
            labelCol: { span: 7 },
            wrapperCol: { span: 14 }
        };
        let formItemLayout1 = {
            labelCol: { span: 3 },
            wrapperCol: { span: 20 }
        };
        const { getFieldDecorator } = this.props.form;

        return (
            <div>
                <div className="card-header-title">基本信息</div>
                <Form>
                    <Row type="flex" justify="center">
                        <Col span={12}>
                            <FormItem style={{ display: "none" }}>
                                {getFieldDecorator("id", {})(<Input />)}
                            </FormItem>
                            <FormItem label="姓名" {...formItemLayout}>
                                {getFieldDecorator("name", {
                                    rules: [
                                        {
                                            required: true,
                                            message: "请输出姓名"
                                        }
                                    ]
                                })(<Input placeholder="请输入..." />)}
                            </FormItem>
                        </Col>
                        <Col span={12}>
                            {" "}
                            <FormItem label="客户" {...formItemLayout}>
                                {getFieldDecorator("customer", {
                                    rules: [
                                        {
                                            required: true,
                                            message: "请输入..."
                                        }
                                    ]
                                })(<Input placeholder="请输入..." />)}
                            </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={12}>
                            <FormItem label="负责人" {...formItemLayout}>
                                {getFieldDecorator("ownerUserId", {
                                    rules: [
                                        {
                                            required: true,
                                            message: "请输出姓名"
                                        }
                                    ]
                                })(<Input placeholder="请输入..." />)}
                            </FormItem>
                        </Col>
                        <Col span={12}>
                            {" "}
                            <FormItem label="主联系人" {...formItemLayout}>
                                {getFieldDecorator("mainContact", {
                                    rules: [
                                        {
                                            required: true,
                                            message: "请输入"
                                        }
                                    ]
                                })(
                                    <RadioGroup>
                                        <Radio value={1}>是</Radio>
                                        <Radio value={2}>否</Radio>
                                    </RadioGroup>
                                )}
                            </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={12}>
                            <FormItem label="部门" {...formItemLayout}>
                                {getFieldDecorator("deptId", {
                                    rules: [
                                        {
                                            required: true,
                                            message: "请输出姓名"
                                        }
                                    ]
                                })(<Input placeholder="请输入..." />)}
                            </FormItem>
                        </Col>
                        <Col span={12}>
                            {" "}
                            <FormItem label="职务" {...formItemLayout}>
                                {getFieldDecorator("post", {
                                    rules: [
                                        {
                                            required: true,
                                            message: "请输出手机号"
                                        }
                                    ]
                                })(<Input placeholder="请输入..." />)}
                            </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={12}>
                            <FormItem label="手机" {...formItemLayout}>
                                {getFieldDecorator("mobile", {
                                    rules: [
                                        {
                                            required: true,
                                            message: "请输出姓名"
                                        }
                                    ]
                                })(<Input placeholder="请输入..." />)}
                            </FormItem>
                        </Col>
                        <Col span={12}>
                            {" "}
                            <FormItem label="办公室电话" {...formItemLayout}>
                                {getFieldDecorator("officePhone", {
                                    rules: [
                                        {
                                            required: true,
                                            message: "请输出手机号"
                                        }
                                    ]
                                })(<Input placeholder="请输入..." />)}
                            </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={12}>
                            <FormItem label="邮箱" {...formItemLayout}>
                                {getFieldDecorator("email", {
                                    rules: [
                                        {
                                            required: true,
                                            message: "请输出姓名"
                                        }
                                    ]
                                })(<Email />)}
                            </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={24}>
                            <FormItem label="备注" {...formItemLayout1}>
                                {getFieldDecorator("remarks", {
                                    rules: [
                                        {
                                            required: true,
                                            message: "请输出姓名"
                                        }
                                    ]
                                })(
                                    <Input
                                        placeholder="请输入..."
                                        type="textarea"
                                        rows={2}
                                    />
                                )}
                            </FormItem>
                        </Col>
                    </Row>
                </Form>
            </div>
        );
    }
}
