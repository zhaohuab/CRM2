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
                    label="品牌"
                    {...formItemLayout}
                >
                    {getFieldDecorator('name', {
                        rules: [{
                            required: true, message: '请输出品牌',
                        }],
                    })(
                        <Input placeholder='请输入...' />
                        )}
                </FormItem>

                <FormItem
                    label="英文"
                    {...formItemLayout}
                >
                    {getFieldDecorator('enName', {
                        rules: [{
                            required: true, message: '请输出英文',
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