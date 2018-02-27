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

export default class LessCard extends React.Component {
    showFn() {
        this.props.showFn();
    }
    render() {
        const { getFieldDecorator, getFieldsValue } = this.props.form;

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
                                {getFieldDecorator("customer")(
                                    <Input placeholder="客户" />
                                )}
                            </FormItem>
                        </Col>
                        <Col span={6}>
                            <FormItem>
                                <div className="more-btn">
                                    <Button htmlType="submit">查询</Button>
                                   
                                </div>
                            </FormItem>
                        </Col>
                    </Row>
                </Form>
            </div>
        );
    }
}
