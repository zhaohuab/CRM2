import { Form, Input, Select } from 'antd';

import Email from 'utils/components/emails'
import Department from 'components/refs/departments'
import Enum from 'utils/components/enums'
import RadioGroup from 'utils/components/radios'
const FormItem = Form.Item;
const Option = Select.Option;
class Card extends React.Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        this.props.form.setFieldsValue(this.props.dataSource);
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
                label="关键动作名称"
                {...formItemLayout}
            >
                {getFieldDecorator('name', {
                    rules: [{
                        required: true, message: '请输入关键动作名称',
                    }],
                })(
                    <Input placeholder='请输入...'/>
                    )}
            </FormItem>
            <FormItem
                label="关键动作描述"
                {...formItemLayout}
            >
                {getFieldDecorator('description', {
                
                })(
                    <Input type="textarea" placeholder='请输入...'/>
                    )}
            </FormItem>

        </Form>)
    }
}

export default Card;