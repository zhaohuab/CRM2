import { Form, Input, Select,Radio } from 'antd';
import Department from 'components/refs/departments'
const { TextArea } = Input;
const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const Option = Select.Option;
class Card extends React.Component {
    constructor(props) {
        super(props)
    }
    
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
                        rules: [],
                    })(
                        <Input placeholder='请输入...' />
                        )}
                </FormItem>
               
                {/* <FormItem
                    label="启用状态"
                    {...formItemLayout}
                >
                    {getFieldDecorator('enableState', {
                        initialValue:1
                    })(
                        <RadioGroup >
                            <Radio value={1}>启用</Radio>
                            <Radio value={2}>停用</Radio>
                        </RadioGroup>
                        )}
                </FormItem> */}
              
                <FormItem
                    label="备注"
                    {...formItemLayout}
                >
                    {getFieldDecorator('description', {
                        rules: [],
                    })(
                        <TextArea rows='4' placeholder='请输入...' />
                        )}
                </FormItem>
            </Form>)
    }
}

export default Card;