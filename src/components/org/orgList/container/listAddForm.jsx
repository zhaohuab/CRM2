import  React, { Component } from 'react';
import './index.less'
import { Form, Icon, Input, Button, Checkbox,Col,DatePicker ,message,Select,Spin,TimePicker,Radio} from 'antd';
const FormItem = Form.Item;
import Department from 'components/refs/Department'
import moment from 'moment';

import Person from './personCustomForm.jsx'
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
        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 6 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 14 },
            },
        };
        const { getFieldDecorator } = this.props.form;
        return (
            <div>
                <Form onSubmit={this.handleSubmit} className="login-form home-form" >
                    <FormItem  {...formItemLayout} label='编码'>
                        {getFieldDecorator('code', {
                            rules: [{ required: true, message: '请输入项目名称' }],
                        })(
                            <Input prefix={<Icon type="folder" style={{ fontSize: 13 }} />} type="text" placeholder="请输入项目名称" />
                            )}
                    </FormItem>
                    <FormItem  {...formItemLayout} label='名称'>
                        {getFieldDecorator('name', {
                            rules: [{ required: true, message: '请输入编号!' }],
                        })(
                            <Input prefix={<Icon type="tag-o" style={{ fontSize: 13 }} />} type='text' placeholder="请输入编号!" />
                            )}
                    </FormItem>
                    <FormItem  {...formItemLayout} label='简称'>
                        {getFieldDecorator('simpleName', {
                            rules: [{ required: true, message: '请输入编号!' }],
                        })(
                            <Input prefix={<Icon type="tag-o" style={{ fontSize: 13 }} />} type='text' placeholder="请输入编号!" />
                            )}
                    </FormItem>
                    <FormItem  {...formItemLayout} label='助记码'>
                        {getFieldDecorator('simpleCode', {
                            rules: [{ required: true, message: '请输入编号!' }],
                        })(
                            <Input prefix={<Icon type="tag-o" style={{ fontSize: 13 }} />} type='text' placeholder="请输入编号!" />
                            )}
                    </FormItem>
                    <FormItem
                        label="所属公司"
                        {...formItemLayout}
                    >
                        {getFieldDecorator('fatherOrgId', {
                            rules: [{
                                required: true, message: 'Please input your Org!',
                            }],
                        })(
                            <Department />
                            )}
                    </FormItem>
                    <FormItem  {...formItemLayout} label='负责人'>
                        {getFieldDecorator('respoPerson', {
                            rules: [{ required: true, message: '请输入编号!' }],
                        })(
                            <Input prefix={<Icon type="tag-o" style={{ fontSize: 13 }} />} type='text' placeholder="请输入编号!" />
                            
                        )}
                    </FormItem>
                    <FormItem  {...formItemLayout} label='其他负责人'>
                        {getFieldDecorator('otherRespoPerson', {
                            rules: [{ required: true, message: '请输入编号!' }],
                        })(
                            <Input prefix={<Icon type="tag-o" style={{ fontSize: 13 }} />} type='text' placeholder="请输入编号!" />
                            )}
                    </FormItem>
                    <FormItem  {...formItemLayout} label='组织类型'>
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

/* <Person/> */