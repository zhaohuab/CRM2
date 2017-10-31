import { Form, Input, Select, Checkbox, Table, Row, Col  } from 'antd';
import Tables from './table.jsx'
const FormItem = Form.Item;

class Card extends React.Component {
    constructor(props) {
        super(props)
        this.columns = [
          {
          title: '名称',
          dataIndex: 'name',
          },
          {
          title: '状态',
          dataIndex: 'enableStateName',
          }
        ]
    }

    componentDidMount() {
        this.props.form.setFieldsValue(this.props.dataSource);
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        const data = this.data;
        const columns = this.columns;
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
            <div>
                <Form >
                    <FormItem
                        label="档案名称"
                        {...formItemLayout}
                    >
                        {getFieldDecorator('name', {
                            rules: [{
                                required: true, message: '请输入名称',
                            }],
                        })(
                            <Input placeholder='请输入...'/>
                            )}
                    </FormItem>
                    <FormItem
                        label="档案描述"
                        {...formItemLayout}
                    >
                        {getFieldDecorator('description', {
                            rules: [{
                                required: true, message: '请输入描述',
                            }],
                        })(
                            <Input type='textarea'placeholder='请输入...'/>
                            )}
                    </FormItem>
                    <FormItem
                        label=""
                        {...formItemLayout}
                    >
                        {getFieldDecorator('isDefault', {
                            rules: [],
                        })(<div></div>)}                          
                   </FormItem>
            </Form>
        </div>)          
    }
}

export default Card;