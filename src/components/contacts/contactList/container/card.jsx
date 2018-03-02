
import React, { Component, PropTypes } from "react";
import * as Actions from "../action";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Enum from "utils/components/enums";
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
const { TextArea } = Input;
const RadioGroup = Radio.Group;
const Option = Select.Option;
const childrenUser = [];
const childrenResp = [];
import Choosed from '../../../customer/list/container/list/SuperiorCustomer.jsx';
import Post from './RolesChoosed.jsx';
import Email from "utils/components/emails";
import Tags from "../../../common/tags/tags.jsx";
import CustomTags from "../../../common/tags/custom-tags.jsx";
import Department from 'components/refs/departments'
class Card extends React.Component {
    componentDidMount() {} 
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
        const { editData, post, customer } = this.props.$$state.toJS();
        if(editData.customerList){
            editData.customerList.forEach((item,index,arr)=>{
                arr[index].id=arr[index].customer;
                arr[index].name=arr[index].customerName;
            })
        }
        let postId=[];
        postId.push(post.id);
        let columns={post:[{title: "职务",dataIndex: "name"}]};
        //debugger;
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
                                })(<Input placeholder="请输入..." />)}
                            </FormItem>
                        </Col>
                        <Col span={11}>
                            <FormItem
                                label="客户"
                                {...formItemLayout}
                            >
                                {getFieldDecorator("customer", {
                                    rules: [
                                        {
                                            required: true, 
                                            message: "请选择客户"
                                        }
                                    ]
                                })(<Choosed />)}
                            </FormItem>
                        </Col>
                    </Row>
                    <Row type="flex" justify="center">
                        <Col span={11}>                          
                            <FormItem label="职务" {...formItemLayout}>
                                {getFieldDecorator("post")(
                                  <Post 
                                    onChange={this.props.action.choosed.bind(this)} 
                                    dataSource={editData.postList} 
                                    columns={columns.post}
                                    idArr={postId}
                                    name={post.name}
                                    placeholder="选择" />
                                )}
                            </FormItem>
                        </Col>
                        <Col span={11}>
                            <FormItem label="邮箱" {...formItemLayout}>
                                {getFieldDecorator("email")(<Email />)}
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
                            <FormItem label="办公电话" {...formItemLayout}>
                                {getFieldDecorator("officePhone")(
                                    <Input placeholder="请输入..." />
                                )}
                            </FormItem>
                        </Col>
                    </Row>
                    <Row type="flex" justify="center">
                        <Col span={11}>
                            <FormItem
                                label="兴趣爱好"
                                {...formItemLayout}
                            >
                                {getFieldDecorator(
                                    "hobby"
                                )(
                                    <TextArea
                                        autosize={{
                                            minRows: 3,
                                            maxRows: 8
                                        }}
                                        placeholder="请输入"
                                    />
                                    )}
                            </FormItem>
                        </Col>
                        <Col span={11}>
                            <FormItem
                                label="备注"
                                {...formItemLayout}
                            >
                                {getFieldDecorator(
                                    "remarks"
                                )(
                                    <TextArea
                                        autosize={{
                                            minRows: 3,
                                            maxRows: 8
                                        }}
                                        placeholder="请输入"
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


const CardModal = Form.create({
    mapPropsToFields: props => {
        //把redux中的值取出来赋给表单
        debugger
        let modalData = props.$$state.toJS().modalData;
        let value = {}
        let changeFieldData = (modalData,key)=>{
            if(key == 'biztype') debugger
            if(modalData[key] && modalData[key].hasOwnProperty('value')){//带验证信息的值
                return modalData[key].value
            }else if(modalData[key] && !modalData[key].hasOwnProperty('value')){//值为编辑时附上值，而不是带验证信息的值
                return modalData[key]
            }else{
                return undefined
            }
        }

        if(modalData.id){//如果是编辑挨个赋值
            for (let key in modalData) {
              value[key] = { value: changeFieldData(modalData,key)};
            }
            return {
                ...value
            }
        }
        return {
            ...modalData
        };
    },
    onFieldsChange: (props, onChangeFild) => {
        debugger;
        let {modalData,nameArr} = props.$$state.toJS();
        for (let key in onChangeFild) { 
          /*   if(key=='customer') {
                modalData[key]=onChangeFild[key].value.id
            }else{
               modalData[key] = onChangeFild[key].value; 
            } */
            modalData[key] = onChangeFild[key];
            nameArr.push(key)
        }
        nameArr= Array.from(new Set(nameArr));
        props.action.saveAddCard(modalData,nameArr) 
    }
})(Card);

export default connect(
    state => {
        return {
            $$stateComponent: state.componentReducer,
            $$state: state.contacts
        };
    },
    dispatch => {
        return {
            action: bindActionCreators(Actions, dispatch)
        };
    }
)(CardModal);

// data传值
// 组件内保存选中状态
// 点击时改变状态
// 使用ref，获取已选择项
