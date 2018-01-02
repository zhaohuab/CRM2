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

export default class MoreCard extends React.Component {
    showFn() {
        this.props.showFn();
    }
    handleSubmit=()=>{
        
    }
    render() {
        const { getFieldDecorator, getFieldsValue } = this.props.form;
        return (
            <div className="more-card" id="btn-recover">
                <Form layout="inline" onSubmit={this.handleSubmit}>
                    <Row
                        type="flex"
                        align="middle"
                        gutter={15}
                        className="formitem-width"
                    >
                        <Col span={6}>
                            <FormItem>
                                {getFieldDecorator("level")(
                                    <Input placeholder="姓名" />
                                )}
                            </FormItem>
                        </Col>
                        <Col span={6}>
                            <FormItem>
                                {getFieldDecorator("clueSource")(
                                    <Input placeholder="手机号" />
                                )}
                            </FormItem>
                        </Col>
                        <Col span={6}>
                            <FormItem>
                                {getFieldDecorator("clueSource")(
                                    <Input placeholder="客户" />
                                )}
                            </FormItem>
                        </Col>
                        <Col span={6}>
                            <FormItem>
                                {getFieldDecorator("level")(
                                    <Input placeholder="客户" />
                                )}
                            </FormItem>
                        </Col>
                    </Row>

                    <Row
                        type="flex"
                        align="middle"
                        justify="space-between"
                        gutter={15}
                        className="formitem-width"
                    >
                        <Col span={6}>
                            <FormItem>
                                {getFieldDecorator("level")(
                                    <Input placeholder="办公室电话" />
                                )}
                            </FormItem>
                        </Col>
                        <Col span={6}>
                            <FormItem>
                                {getFieldDecorator("level")(
                                    <Input placeholder="家庭电话" />
                                )}
                            </FormItem>
                        </Col>
                        <Col span={6}>
                            <FormItem>
                                {getFieldDecorator("level")(
                                    <Input placeholder="邮箱" />
                                )}
                            </FormItem>
                        </Col>
                        <Col span={6}>
                            <FormItem>
                                {getFieldDecorator("level")(
                                    <Input placeholder="角色" />
                                )}
                            </FormItem>
                        </Col>
                    </Row>
                    <Row
                        type="flex"
                        align="middle"
                        justify="space-between"
                        gutter={15}
                        className="formitem-width"
                    >
                        <Col span={6}>
                            <FormItem>
                                {getFieldDecorator("level")(
                                    <Input placeholder="态度" />
                                )}
                            </FormItem>
                        </Col>
                        <Col span={6}>
                            <FormItem>
                                {getFieldDecorator("level")(
                                    <Input placeholder="主联系人" />
                                )}
                            </FormItem>
                        </Col>
                        <Col span={6}>
                            <FormItem>
                                {getFieldDecorator("level")(
                                    <Input placeholder="负责人" />
                                )}
                            </FormItem>
                        </Col>
                        <Col span={6}>
                            <FormItem>
                                <div className="more-btn">
                                    <Button htmlType="submit">查询</Button>
                                    <span onClick={this.showFn.bind(this)}>
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
