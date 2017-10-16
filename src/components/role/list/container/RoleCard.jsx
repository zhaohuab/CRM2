import { Form, Input, Select } from 'antd';
import Department from 'components/refs/departments'
// import Email from 'utils/components/email'
// import Department from 'components/refs/departments'
// import Enum from 'utils/components/enum'
// import RadioGroup from 'utils/components/radio'
const FormItem = Form.Item;
const Option = Select.Option;
class Card extends React.Component {
    constructor(props) {
        super(props)
    }
    jobEnum = [{
        key: 1,
        title: "员工"
    }, {
        key: 2,
        title: "负责人"
    }, {
        key: 3,
        title: "其他负责人"
    }]
    genderEnum = [{
        key: 1,
        title: "男",
    }, {
        key: 2,
        title: "女",
    }]
    componentDidMount() {
        debugger
        //装箱过程
        let { orgId,orgName } = this.props.dataSource; 
        this.props.dataSource.orgId = {key:orgId,title:orgName};
        // this.props.dataSource.deptId = {key:deptId,title:deptName};
        // this.props.dataSource.job = {key:job,title:jobName};
        // this.props.dataSource.gender = {key:gender,title:genderName};
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
        return (
            <Form >
                <FormItem
                    label="角色编码"
                    {...formItemLayout}
                >
                    {getFieldDecorator('code', {
                        rules: [{
                            required: true, message: '请输出角色编码',
                        }],
                    })(
                        <Input placeholder='请输入...' />
                        )}
                </FormItem>

                <FormItem
                    label="角色名称"
                    {...formItemLayout}
                >
                    {getFieldDecorator('name', {
                        rules: [{
                            required: true, message: '请输出角色名称',
                        }],
                    })(
                        <Input placeholder='请输入...' />
                        )}
                </FormItem>

                <FormItem
                    label="所属组织"
                    {...formItemLayout}
                >
                    {getFieldDecorator('orgId', {

                    })(
                        <Department />
                        )}
                </FormItem>
              
            </Form>)
    }
}

export default Card;