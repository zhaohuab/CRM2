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
        // this.props.form.setFieldsValue(this.props.dataSource);
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

            // <Row>
            //     <Col span={6}>品牌</Col>
            //     <Col span={14}></Col>
            // </Row>
            // <Row>
            //     <Col span={6}>英文</Col>
            //     <Col span={14}></Col>
            // </Row>
            // <Row>
            //     <Col span={6}>启用状态</Col>
            //     <Col span={14}></Col>
            // </Row>
            // <Row>
            //     <Col span={6}>备注</Col>
            //     <Col span={14}></Col>
            // </Row>
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