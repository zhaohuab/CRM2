import { Form, Input, Select, Radio } from 'antd';
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
        debugger
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
                  
                        {this.props.dataSource.name}
                       
                </FormItem>

                <FormItem
                    label="英文"
                    {...formItemLayout}
                >
                    {this.props.dataSource.enName}
                </FormItem>

                <FormItem
                    label="启用状态"
                    {...formItemLayout}
                >
                        {this.props.dataSource.enableStateName}
                </FormItem>

                <FormItem
                    label="备注"
                    {...formItemLayout}
                >
                        {this.props.dataSource.description}
                </FormItem>
            </Form>)
    }
}

export default Card;