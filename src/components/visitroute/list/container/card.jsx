import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as Actions from "../action";
import {
    Table,
    Modal,
    Button,
    Icon,
    Row,
    Col,
    Input,
    Dropdown,
    Select,
    Menu,
    Form,
    Radio
} from "antd";
const ButtonGroup = Button.Group;
const Option = Select.Option;
const FormItem = Form.Item;
const RadioGroup = Radio.Group;

export default class Card extends React.Component {
    componentDidMount() {
        debugger;
        this.props.form.setFieldsValue(this.props.dataSource);
    }

    render() {
        let formItemLayout = {
            labelCol: { span: 7 },
            wrapperCol: { span: 14 }
        };
        const { getFieldDecorator } = this.props.form;
        return (
            <div>
                <Form>
                    <FormItem>{getFieldDecorator("id")(<Input />)}</FormItem>

                    <FormItem label="拜访路线名称">
                        {getFieldDecorator("name", {
                            rules: [{ required: true, message: "请" }]
                        })(<Input placeholder="请输入..." />)}
                    </FormItem>
                    <FormItem label="负责人">
                        {getFieldDecorator("ownerUserId", {
                            rules: [{ required: false, message: "请" }]
                        })(<Input placeholder="请输入..." />)}
                    </FormItem>
                    <FormItem label="所属部门">
                        {getFieldDecorator("deptId", {
                            rules: [{ required: true, message: "请" }]
                        })(<Input placeholder="请输入..." />)}
                    </FormItem>
                    <FormItem label="覆盖网点数">
                        {getFieldDecorator("coverNodeNum", {
                            rules: [{ required: true, message: "请" }]
                        })(<Input placeholder="请输入..." />)}
                    </FormItem>
                    <FormItem label="负责网点数">
                        {getFieldDecorator("ownerNodeNum", {
                            rules: [{ required: true, message: "请" }]
                        })(<Input placeholder="请输入..." />)}
                    </FormItem>
                    <FormItem label="网点名称">
                        {getFieldDecorator("nodeId", {
                            rules: [{ required: true, message: "请" }]
                        })(<Input placeholder="请输入..." />)}
                    </FormItem>
                    <FormItem label="备注">
                        {getFieldDecorator("remarks", {
                            rules: [{ required: true, message: "请" }]
                        })(
                            <Input
                                type="textarea"
                                rows={2}
                                placeholder="请输入..."
                            />
                        )}
                    </FormItem>
                </Form>
            </div>
        );
    }
}
