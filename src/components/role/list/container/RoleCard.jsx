import { Form, Input, Select } from 'antd';
import Department from 'components/refs/departments'

const FormItem = Form.Item;
const Option = Select.Option;
class Card extends React.Component {
    constructor(props) {
        super(props)
    }
    
    componentDidMount() {
        //装箱过程
        let { orgId,orgName } = this.props.dataSource; 
        this.props.dataSource.orgId = {key:orgId,title:orgName};
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
                    label="角色描述"
                    {...formItemLayout}
                >
                    {getFieldDecorator('description', {

                    })(
                        <Input placeholder='请输入...' />
                        )}
                </FormItem>
              
            </Form>)
    }
}

export default Card;