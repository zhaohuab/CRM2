import  React, { Component } from 'react';
import './index.less'
import { Form, Icon, Input, Button, Checkbox,Col,DatePicker ,message,Select,Spin,TimePicker,Radio} from 'antd';
const FormItem = Form.Item;
import moment from 'moment';

import debounce from 'lodash.debounce';
const Option = Select.Option;
const RadioGroup = Radio.Group;

export default class NormaladdForm extends React.Component {
    constructor(props){
        super(props);
        this.state={
            value:'1111'
        }
    }
 
    render() {
       
      const { getFieldDecorator } = this.props.form;
      return (
        <div>
            <Form onSubmit={this.handleSubmit}  className="login-form home-form" >
                <FormItem label='编码'>
                    {getFieldDecorator('code', {
                    rules: [{ required: true, message: '请输入项目名称' }],
                    })(
                    <Input prefix={<Icon type="folder" style={{ fontSize: 13 }}/>} type="text" placeholder="请输入项目名称"/>
                    )}
                </FormItem>
                <FormItem label='名称'>
                    {getFieldDecorator('name', {
                    rules: [{ required: true, message: '请输入编号!' }],
                    })(
                    <Input prefix={<Icon type="tag-o" style={{ fontSize: 13 }}/>} type='text' placeholder="请输入编号!"/>
                    )}
                </FormItem>
                <FormItem label='简称'>
                    {getFieldDecorator('simpleName', {
                    rules: [{ required: true, message: '请输入编号!' }],
                    })(
                    <Input prefix={<Icon type="tag-o" style={{ fontSize: 13 }}/>} type='text' placeholder="请输入编号!"/>
                    )}
                </FormItem>
                <FormItem label='助记码'>
                    {getFieldDecorator('simpleCode', {
                    rules: [{ required: true, message: '请输入编号!' }],
                    })(
                    <Input prefix={<Icon type="tag-o" style={{ fontSize: 13 }}/>} type='text' placeholder="请输入编号!"/>
                    )}
                </FormItem>
                <FormItem label='上级组织'>
                    {getFieldDecorator('pkFatherorg', {
                    rules: [{ required: true, message: '请输入编号!' }],
                    })(
                    <Input prefix={<Icon type="tag-o" style={{ fontSize: 13 }}/>} type='text' placeholder="请输入编号!"/>
                    )}
                </FormItem>
                <FormItem label='负责人'>
                    {getFieldDecorator('respMan', {
                    rules: [{ required: true, message: '请输入编号!' }],
                    })(
                    <Input prefix={<Icon type="tag-o" style={{ fontSize: 13 }}/>} type='text' placeholder="请输入编号!"/>
                    )}
                </FormItem>
                <FormItem label='其他负责人'>
                    {getFieldDecorator('otherRespMan', {
                    rules: [{ required: true, message: '请输入编号!' }],
                    })(
                    <Input prefix={<Icon type="tag-o" style={{ fontSize: 13 }}/>} type='text' placeholder="请输入编号!"/>
                    )}
                </FormItem>
                <FormItem label='组织类型'>
                    {getFieldDecorator('orgType', {
                    rules: [{ required: true, message: '请输入编号!' }],
                    })(
                        <RadioGroup>
                            <Radio value={0}>部门</Radio>
                            <Radio value={1}>公司</Radio>
                        </RadioGroup>
                    )}
                </FormItem>
            </Form>
        </div>
      );
    }
  }
