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
    Radio,
    Select
} from "antd";
const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const Option = Select.Option;
const childrenUser = [];
const childrenResp = [];
import Email from "utils/components/emails";
import Tags from "../../../common/tags/tags.jsx";
import CustomTags from "../../../common/tags/custom-tags.jsx";
import Department from 'components/refs/departments'
export default class Card extends React.Component {
    componentDidMount() {
        this.props.form.setFieldsValue(this.props.dataSource);
    }
    onChangeUser(){
        let {userList } = this.props.dataSource;
        for (let i = 0, len = userList.length; i < len; i++) {
            childrenUser.push(<Option key={userList[i].id}>{userList[i].name}</Option>);
        }
    }
    onChangeResp(){
        let {userList } = this.props.dataSource;
        for (let i = 0, len = userList.length; i < len; i++) {
            childrenResp.push(<Option key={userList[i].id}>{userList[i].name}</Option>);
        }
    }
    render() {
        let formItemLayout = {
            labelCol: { span: 7 },
            wrapperCol: { span: 14 }
        };
        let formItemLayout1 = {
            labelCol: { span: 4 },
            wrapperCol: { span: 19 }
        };
        const { getFieldDecorator } = this.props.form;
        let ccc = (rule, value, callback) => {
            var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/;
            if (!myreg.test(value)) {
                callback("wrong");
            }
            callback();
        };
        return (
            <div>
                <Form>
                    <div className="card-header-title">
                        基本信息{" "}
                        <i className="iconfont icon-xiajiantou-lanse" />
                    </div>
                    <Row type="flex" justify="center">
                        <Col span={11}>
                            <FormItem style={{ display: "none" }}>
                                {getFieldDecorator("id", {})(<Input />)}
                            </FormItem>
                            <FormItem
                                label="姓名"
                                {...formItemLayout}
                            //hasFeedback={true}
                            >
                                {getFieldDecorator("name", {
                                    rules: [
                                        {
                                            required: true,
                                            message: "请输入姓名"
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
                                            message: "请选择客户"
                                        }
                                    ]
                                })(<Select
                                    showSearch
                                    style={{ width: 200 }}
                                    placeholder="请选择客户"
                                    optionFilterProp="children"
                                    onChange={this.onChangeUser()}
                                    filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                >
                                    {childrenUser}
                                </Select>)}
                            </FormItem>
                        </Col>
                    </Row>
                    <Row type="flex" justify="center">
                        <Col span={11}>
                            <FormItem label="负责人" {...formItemLayout}>
                                {getFieldDecorator("ownerUserId")(
                                    <Select
                                        showSearch
                                        style={{ width: 200 }}
                                        placeholder="请选择负责人"
                                        optionFilterProp="children"
                                        onChange={this.onChangeResp()}
                                        filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                    >
                                        {childrenResp}
                                    </Select>
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
                                    <RadioGroup value={1}>
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
                                {getFieldDecorator('deptId', {
                                    rules: [{
                                        required: true, message: '请选择部门',
                                    }],
                                })(
                                    <Department />
                                    )}
                            </FormItem>
                        </Col>
                        <Col span={11}>
                            {" "}
                            <FormItem label="职务" {...formItemLayout}>
                                {getFieldDecorator("post")(
                                    <Select
                                        showSearch
                                        style={{ width: 200 }}
                                        placeholder="请选择职务"
                                        optionFilterProp="children"
                                        filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                    >
                                        <Option value="jack" selected>Jack</Option>
                                        <Option value="lucy">Lucy</Option>
                                        <Option value="tom">Tom</Option>
                                    </Select>
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
                            <FormItem
                                label="备注"
                                {...formItemLayout}
                            //hasFeedback={true}
                            >
                                {getFieldDecorator(
                                    "remarks"
                                    // {
                                    //     rules: [
                                    //         {
                                    //             required: true
                                    //             //message: "请输出姓名",
                                    //             //validator: ccc
                                    //             //pattern: /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/
                                    //         }
                                    //     ]
                                    // }
                                )(
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
                            <FormItem label="角色" {...formItemLayout1}>
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
                            <FormItem label="态度" {...formItemLayout1}>
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
                            <FormItem label="兴趣爱好" {...formItemLayout1}>
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
