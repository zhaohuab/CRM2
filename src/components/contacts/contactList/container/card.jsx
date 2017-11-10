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
import Email from "utils/components/emails";
import Tags from "./tags.jsx";
import CustomTags from "./custom-tags.jsx";

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
            wrapperCol: { span: 21 }
        };
        const { getFieldDecorator } = this.props.form;

        return (
            <div>
                <Form>
                    <div className="card-header-title">
                        基本信息 <i className="iconfont icon-xiajiantou-lanse" />
                    </div>
                    <Row type="flex" justify="center">
                        <Col span={11}>
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
                        <Col span={11}>
                            {" "}
                            <FormItem label="客户" {...formItemLayout}>
                                {getFieldDecorator("customer", {
                                    rules: [
                                        {
                                            required: true,
                                            message: "请输入客户"
                                        }
                                    ]
                                })(<Input placeholder="请输入..." />)}
                            </FormItem>
                        </Col>
                    </Row>
                    <Row type="flex" justify="center">
                        <Col span={11}>
                            <FormItem label="负责人" {...formItemLayout}>
                                {getFieldDecorator("ownerUserId")(
                                    <Input placeholder="请输入..." />
                                )}
                            </FormItem>
                        </Col>
                        <Col span={11}>
                            {" "}
                            <FormItem label="主联系人" {...formItemLayout}>
                                {getFieldDecorator("mainContact", {
                                    rules: [
                                        {
                                            required: true,
                                            message: "请输入..."
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
                    <Row type="flex" justify="center">
                        <Col span={11}>
                            <FormItem label="部门" {...formItemLayout}>
                                {getFieldDecorator("deptId")(
                                    <Input placeholder="请输入..." />
                                )}
                            </FormItem>
                        </Col>
                        <Col span={11}>
                            {" "}
                            <FormItem label="职务" {...formItemLayout}>
                                {getFieldDecorator("post")(
                                    <Input placeholder="请输入..." />
                                )}
                            </FormItem>
                        </Col>
                    </Row>
                    <Row type="flex" justify="center">
                        <Col span={11}>
                            <FormItem label="手机" {...formItemLayout}>
                                {getFieldDecorator("mobile")(
                                    <Input placeholder="请输入..." />
                                )}
                            </FormItem>
                        </Col>
                        <Col span={11}>
                            {" "}
                            <FormItem label="办公室电话" {...formItemLayout}>
                                {getFieldDecorator("officePhone")(
                                    <Input placeholder="请输入..." />
                                )}
                            </FormItem>
                        </Col>
                    </Row>
                    <Row type="flex" justify="center">
                        <Col span={11}>
                            <FormItem label="备注" {...formItemLayout}>
                                {getFieldDecorator("remarks")(
                                    <Input
                                        placeholder="请输入..."
                                        type="textarea"
                                        rows={3}
                                    />
                                )}
                            </FormItem>
                        </Col>
                        <Col span={11}>
                            <FormItem label="邮箱" {...formItemLayout}>
                                {getFieldDecorator("email")(<Email />)}
                            </FormItem>
                        </Col>
                    </Row>
                    <div className="card-header-title">
                        标签
                        <i className="iconfont icon-xiajiantou-lanse" />
                    </div>
                    <Row>
                        <Col>
                            <FormItem label="角色" {...formItemLayout}>
                                {getFieldDecorator("role")(
                                    <Tags
                                        dataSource={[
                                            "决策人",
                                            "商务决策人",
                                            "技术决策人",
                                            "财务决策人",
                                            "项目决策人",
                                            "审批者",
                                            "评估者",
                                            "影响人",
                                            "使用人",
                                            "普通人"
                                        ]}
                                    />
                                )}
                            </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <FormItem label="态度" {...formItemLayout}>
                                {getFieldDecorator("attitude")(
                                    <Tags
                                        dataSource={[
                                            "还不错",
                                            "非常好",
                                            "一般",
                                            "恶略",
                                            "无视"
                                        ]}
                                    />
                                )}
                            </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <FormItem label="兴趣爱好" {...formItemLayout}>
                                {getFieldDecorator("hobby")(
                                    <CustomTags dataSource={["踢球", "跑步"]} />
                                )}
                            </FormItem>
                        </Col>
                    </Row>
                </Form>
            </div>
        );
    }
}

// data传值
// 组件内保存选中状态
// 点击时改变状态
// 使用ref，获取已选择项
