import React, { Component, PropTypes } from "react";
import reqwest from "utils/reqwest";
import { cum as url, doc, baseDir } from "api";

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

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as Actions from "../../action";

import Email from "utils/components/emails";
import Tags from "../../../../common/tags/tags.jsx";
import CustomTags from "../../../../common/tags/custom-tags.jsx";
import CuperiorCustomer from '../list/SuperiorCustomer'
import ContactsDepart from './ContactsDepart'
import OwnUser from '../list/OwnUser'

class ContactsCard extends React.Component {
    constructor(props){
        super(props);
        this.state={
            visit:false
        }
    }

    cardShow(e){
        e.stopPropagation()
        this.props.action.clearRefContactsForm()
        this.setState({
            visit:true
        })
    }

    onCancel(){
        this.setState({
            visit:false
        })
    }

    onOk(){
        let {contactsCardData} = this.props.$$state.toJS();
        this.props.form.validateFields((err, values) => {
            if(!err){
                
                this.setState({
                    visit:false
                })
                reqwest(
                    {
                        url: baseDir +'cum/contacts',
                        method: "POST",
                        data: {
                            param: {
                                ...contactsCardData
                            }
                        }
                    },
                    data => {
                        
                        this.props.action.refContactFormAdd(data)
                    }
                );
            }
        })
    }

    render() {
        let formItemLayout = {
            labelCol: { span: 7 },
            wrapperCol: { span: 14 }
        };
        let formItemLayout1 = {
            labelCol: { span:4 },
            wrapperCol: { span: 19 }
        };
        const { getFieldDecorator } = this.props.form;
        let {contactsCardData,viewData} = this.props.$$state.toJS();
        debugger
        return (
            <div>
                <i className={'iconfont icon-tianjia'} onClick={this.cardShow.bind(this)}/>
                <Modal
                    title="联系人"
                    visible={this.state.visit}
                    onCancel={this.onCancel.bind(this)}
                    onOk={this.onOk.bind(this)}
                    width={900}
                    maskClosable={false}
                >
                    <div className='crm-panel-contacts-card'>
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
                                    >
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
                                    <FormItem label="客户" {...formItemLayout}>
                                        {getFieldDecorator("customer", {
                                            rules: [
                                                {
                                                    required: true,
                                                    message: "请输入客户"
                                                }
                                            ]
                                        })(<CuperiorCustomer width={500} disabled = {true} viewData = {viewData}/>)}
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
                                           <ContactsDepart viewData={viewData}/>
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
                                    <FormItem
                                        label="备注"
                                        {...formItemLayout}
                                    >
                                        {getFieldDecorator(
                                            "remarks"
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
                </Modal>
            </div>
        );
    }
}

const cardForm = Form.create({
    mapPropsToFields: props => {
        //把redux中的值取出来赋给表单
        let {contactsCardData,viewData} = props.$$state.toJS()
        let value = {};
        //把客户id保存
        if(viewData.id){
            value.customer = {value:viewData.id}
        }
        //保存部门id
        if(viewData.salesVOs && viewData.salesVOs[0]){
            value.deptId = {value:viewData.salesVOs[0].ownerDeptId}
        }
        for (let key in contactsCardData) {
            value[key] = { value: contactsCardData[key] };
        }
        
        return {
            ...value
        };
    },
    onFieldsChange: (props, onChangeFild) => {
        //往redux中写值//把值进行更新改变
        
        let {contactsCardData,viewData} = props.$$state.toJS();
        for (let key in onChangeFild) {
            contactsCardData[key] = onChangeFild[key].value;
        }
        //把客户id保存
        if(viewData.id){
            contactsCardData.customer = viewData.id
        }

        //保存部门id
        if(viewData.salesVOs && viewData.salesVOs[0]){
            contactsCardData.deptId = viewData.salesVOs[0].ownerDeptId
        }
        
        
        props.action.refContactForm(contactsCardData);
    }
})(ContactsCard);

//绑定状态到组件props
function mapStateToProps(state, ownProps) {
    return {
        $$state: state.contacts
    };
}
//绑定action到组件props
function mapDispatchToProps(dispatch) {
    return {
        action: bindActionCreators(Actions, dispatch)
    };
}
//输出绑定state和action后组件
export default connect(mapStateToProps, mapDispatchToProps)(cardForm);
