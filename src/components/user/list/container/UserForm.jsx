import { Form, Input, Radio, Select } from 'antd';

import Email from 'utils/components/Email'
import Department from 'components/refs/Department'
const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const Option = Select.Option;
class Card extends React.Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        debugger
        //装箱过程
        let { orgId,orgName,deptId,deptName } = this.props.dataSource; 
        this.props.dataSource.orgId = {key:orgId,title:orgName};
        this.props.dataSource.deptId = {key:deptId,title:deptName};
        this.props.form.setFieldsValue(this.props.dataSource);
    }
    componentWillMount() {

    }
    render() {
        const { getFieldDecorator } = this.props.form;

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
        {
            getFieldDecorator('id', {
            })(
                <Input />
                )
        }
        return (<Form >

            <FormItem
                label="姓名"
                {...formItemLayout}
            >
                {getFieldDecorator('name', {
                    rules: [{
                        required: true, message: 'Please input your Name',
                    }],
                })(
                    <Input />
                    )}
            </FormItem>
            <FormItem
                label="手机"
                {...formItemLayout}
            >
                {getFieldDecorator('phone', {
                    rules: [{
                        required: true, message: 'Please input your Phone!',
                    }],
                })(
                    <Input />
                    )}
            </FormItem>
            <FormItem
                label="邮箱"
                {...formItemLayout}
            >
                {getFieldDecorator('email', {
                    rules: [{
                        type: 'email', message: 'The input is not valid E-mail!',
                    }, {
                        required: true, message: 'Please input your E-mail!',
                    }],
                })(
                    <Email />
                    )}
            </FormItem>
            <FormItem
                label="性别"
                {...formItemLayout}
            >
                {getFieldDecorator('gender', {
                    rules: [{
                        type: 'integer', message: 'The input is not valid E-mail!',
                    }, {
                        required: true, message: 'Please input your E-mail!',
                    }],
                })(
                    <RadioGroup value={1}>
                        <Radio value={1}>男</Radio>
                        <Radio value={2}>女</Radio>
                    </RadioGroup>
                    )}
            </FormItem>
            <FormItem
                label="所属公司"
                {...formItemLayout}
            >
                {getFieldDecorator('orgId', {
                    rules: [{
                        required: true, message: 'Please input your Org!',
                    }],
                })(
                    <Department />
                    )}
            </FormItem>
            <FormItem
                label="所属部门"
                {...formItemLayout}
            >
                {getFieldDecorator('deptId', {

                })(
                    <Department />
                    )}
            </FormItem>
            <FormItem
                label="职位"
                {...formItemLayout}
            >
                {getFieldDecorator('job', {

                })(
                    <Select>
                        <Option value={0}>员工</Option>
                        <Option value={1}>负责人</Option>
                        <Option value={2}>其他负责人</Option>
                    </Select>
                    )}
            </FormItem>

        </Form>)
    }
}

export default Card;