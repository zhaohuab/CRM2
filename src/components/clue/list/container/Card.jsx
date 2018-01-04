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

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
//导入action方法
import * as Actions from "../action";

import CityChioce from "./cityChioce";
class EditForm extends React.Component {
    componentDidMount() {
        // this.props.form.setFieldsValue(this.props.dataSource);
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
                 <Row className="form-input-recover">
                    <Row>
                <Form>
                    {/* <div className="card-header-title">
                        基本信息{" "}
                        <i className="iconfont icon-xiajiantou-lanse" />
                    </div> */}
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
                                            message: "请输出姓名"
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
                                })(<Input placeholder="请输入..." />)}
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
                                {getFieldDecorator("levelName", {
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
                    <Row type="flex" justify="center">
                        <Col span={11}>
                            <FormItem label="性别" {...formItemLayout}>
                                {getFieldDecorator("genderName")(
                                    <Input placeholder="请输入..." />
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
                            <FormItem label="职务" {...formItemLayout}>
                                {getFieldDecorator("postName")(
                                    <Input placeholder="请输入..." />
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
                        <Col span={2}>
                            <Row
                                type="flex"
                                justify="start"
                            >
                                <div>省/市/区：</div>
                            </Row>
                        </Col>
                        <Col span={11}>
                            <FormItem
                                {...formItemLayout}
                            >
                                {getFieldDecorator(
                                    "province_city_district"
                                )(<CityChioce/>)}
                            </FormItem>
                        </Col>
                        <Col span={11}>
                            <FormItem label="地址" {...formItemLayout}>
                                {getFieldDecorator("address", {

                                })(<Input placeholder="请输入..." />)}
                            </FormItem>
                        </Col>
                    </Row>
                    <Row type="flex">
                        <Col span={24}>
                            <FormItem label="备注" {...formItemLayout}>
                                {getFieldDecorator("remarks")(
                                    <Input placeholder="请输入..." type="textarea" />
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

const cardForm = Form.create({
    mapPropsToFields: (props) => {
        
        //把redux中的值取出来赋给表单
        //debugger
        let viewData = props.$$state.toJS().editData;
            let value = {};
            for (let key in viewData) {
            //     if (key == "address") {
            //         value[key] = {
            //             value: {
            //                 address: viewData[key],
            //             }
            //         };
            //     } else {
            //         value[key] = { value: viewData[key] };
            //     }

            value[key] = { value: viewData[key] };
            }
           
            //address  把字段合成对象
            return {
                ...value
            };


        //     if(data.name == null){
        //         data.name = undefined;
        //     }
        //     if(data.id == null){
        //         data.id = undefined;
        //     }
        //     if(data.companyName == null){
        //         data.companyName = undefined;
        //     }
        //     if(data.tel == null){
        //         data.tel = undefined;
        //     }
        //     if(data.source == null){
        //         data.source = undefined;
        //     }
        //     return{
        //         id:{
        //             value:data.id
        //         }, 
        //        name:{
        //             value:data.name
        //         },  
        //        tel:{
        //             value:data.tel
        //         },  
        //         companyName:{
        //             value:data.companyName
        //         }, 
        //         source:{
        //             value:data.source
        //         }
        // }
        // //debugger
        // let value = {};
        // for (let key in viewData) {
        //     // value[key] = { value: undefined/*viewData[key]*/ };
        //     value[key] = { value: viewData[key] };
        // }
        // return {
        //     ...value
        // };


    },
    onFieldsChange: (props, onChangeFild) => {
        
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
            } //把对像拆成字段  latlng
        }
    }
    props.action.editCardFn(viewData);
    }
})(EditForm);

//绑定状态到组件props
function mapStateToProps(state, ownProps) {
    return {
        $$state: state.clue
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
