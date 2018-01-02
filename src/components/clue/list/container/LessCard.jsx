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

    handleSubmit=()=>{
        
    }
    render() {
        const { getFieldDecorator, getFieldsValue } = this.props.form;

        return (
            <div id="btnClue-recover">
                <Form layout="inline" onSubmit={this.handleSubmit}>
                    <Row className="formitem-width" type="flex" gutter={15}>
                        <Col span={6}>
                            <FormItem>
                                {getFieldDecorator("level")(
                                    <Input placeholder="线索等级" />
                                )}
                            </FormItem>
                        </Col>
                        <Col span={6}>
                            <FormItem>
                                {getFieldDecorator("clueSource")(
                                    <Input placeholder="线索来源" />
                                )}
                            </FormItem>
                        </Col>
                    
                        <Col span={6}>
                            <FormItem>
                                <div className="more-btn">
                                    <Button htmlType="submit">搜索</Button>
                                    <span onClick={this.showFn.bind(this)}>
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
