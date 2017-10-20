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
        //装箱过程
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
        {
            getFieldDecorator('enableState', {
            })(
                <Input value = "1"/>
                )
        }
        return (
            <Form >

                <FormItem
                    label="商机类型"
                    {...formItemLayout}
                >
                    {getFieldDecorator('type', {
                        rules: [{
                            required: true, message: '请选择商机类型',
                        }],
                    })(
                        <Input placeholder='请输入...' />
                        )}
                </FormItem>
                <FormItem
                    label="商机名称"
                    {...formItemLayout}
                >
                    {getFieldDecorator('name', {
                        rules: [{
                            required: true, message: '请输出商机名称',
                        }],
                    })(
                        <Input placeholder='请输入...' />
                        )}
                </FormItem>

                <FormItem
                label="客户名称"
                {...formItemLayout}
            >
                {getFieldDecorator('customerName', {
                    rules: [{
                        required: true, message: '请选择客户',
                    }],
                })(
                    <Input placeholder='请输入...' />
                    )}
            </FormItem>
            <FormItem
                    label="商机阶段"
                    {...formItemLayout}
                >
                    {getFieldDecorator('saleStage', {
                        rules: [{
                            required: true, message: '请选择商机阶段',
                        }],
                    })(
                        <Input placeholder='请输入...' />
                        )}
                </FormItem>
                <FormItem
                    label="赢单概率"
                    {...formItemLayout}
                >
                    {getFieldDecorator('winProbability', {
                        rules: [{
                            required: true, message: '请输入赢单概率',
                        }],
                    })(
                        <Input placeholder='请输入...' />
                        )}
                </FormItem>
                <FormItem
                    label="商机日期"
                    {...formItemLayout}
                >
                    {getFieldDecorator('sysCreatedTime', {
                        rules: [{
                            required: true, message: '请选择商机时间',
                        }],
                    })(
                        <Input placeholder='请输入...' />
                        )}
                </FormItem>
                <FormItem
                    label="预计签单时间"
                    {...formItemLayout}
                >
                    {getFieldDecorator('expectSignTime', {
                        rules: [{
                            required: true, message: '请选择预计签单时间',
                        }],
                    })(
                        <Input placeholder='请输入...' />
                        )}
                </FormItem>
                <FormItem
                    label="客户名称"
                    {...formItemLayout}
                >
                    {getFieldDecorator('customerName', {
                        rules: [{
                            required: true, message: '请选择客户',
                        }],
                    })(
                        <Input placeholder='请输入...' />
                        )}
                </FormItem>
                <FormItem
                    label="客户名称"
                    {...formItemLayout}
                >
                    {getFieldDecorator('customerName', {
                        rules: [{
                            required: true, message: '请选择客户',
                        }],
                    })(
                        <Input placeholder='请输入...' />
                        )}
                </FormItem>
                <FormItem
                    label="客户名称"
                    {...formItemLayout}
                >
                    {getFieldDecorator('customerName', {
                        rules: [{
                            required: true, message: '请选择客户',
                        }],
                    })(
                        <Input placeholder='请输入...' />
                        )}
                </FormItem>

                <FormItem
                    label="备注"
                    {...formItemLayout}
                >
                    {getFieldDecorator('description', {
                        rules: [{
                            required: true, message: '请输出备注',
                        }],
                    })(
                        <Input placeholder='请输入...' />
                        )}
                </FormItem>
                <FormItem
                    label="启用状态"
                    {...formItemLayout}
                >
                    {getFieldDecorator('enableStateName', {
                        initialValue:"启用"
                    })(
                        <Input disabled />
                        )}
                </FormItem>
              
            </Form>)
    }
}

export default Card;