import { Form, Input, Select } from 'antd';

import Email from 'utils/components/email'
import Department from 'components/refs/departments'
import Enum from 'utils/components/enum'
import RadioGroup from 'utils/components/radio'
const FormItem = Form.Item;
const Option = Select.Option;
class Card extends React.Component {
    constructor(props) {
        super(props)
    }
    jobEnum = [{
        key : 1,
        title : "员工"
    },{
        key : 2,
        title : "负责人"
    },{
        key : 3,
        title : "其他负责人"
    }]
    genderEnum = [{
        key : 1,
        title : "男",
    },{
        key : 2,
        title : "女",
    }]
    componentDidMount() {
        
        //装箱过程
        let { gender,genderName,orgId,orgName,deptId,deptName,job,jobName } = this.props.dataSource; 
        this.props.dataSource.orgId = {key:orgId,title:orgName};
        this.props.dataSource.deptId = {key:deptId,title:deptName};
        this.props.dataSource.job = {key:job,title:jobName};
        this.props.dataSource.gender = {key:gender,title:genderName};
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
                        required: true, message: '请输出姓名',
                    }],
                })(
                    <Input placeholder='请输入...'/>
                    )}
            </FormItem>
            <FormItem
                label="手机"
                {...formItemLayout}
            >
                {getFieldDecorator('phone', {
                    rules: [{
                        required: true, message: '请输出手机号',
                    }],
                })(
                    <Input placeholder='请输入...'/>
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
                        required: true, message: '请输入邮箱',
                    }],
                })(
                    <Email/>
                    )}
            </FormItem>
            <FormItem
                label="性别"
                {...formItemLayout}
            >
                {getFieldDecorator('gender', {
                    rules: [{
                        required: true, message: '',
                    }],
                })(
                    <RadioGroup type="button" dataSource={this.genderEnum}/>
                    )}
            </FormItem>
            <FormItem
                label="所属公司"
                {...formItemLayout}
            >
                {getFieldDecorator('orgId', {
                    rules: [{
                        required: true, message: '请输入公司',
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
                    <Enum dataSource={this.jobEnum}/>
                    )}
            </FormItem>

        </Form>)
    }
}

export default Card;