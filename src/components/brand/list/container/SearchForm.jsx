import { Form, Input, Select, Radio, Row, Col } from 'antd';
import Department from 'components/refs/departments'
const { TextArea } = Input;
const FormItem = Form.Item;
const Option = Select.Option;
class SearchForm extends React.Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        //装箱过程
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
        }

        return (
         
            // <Form layout="inline">
                 <Form >
                <Row
               
                    type="flex"
                    gutter={15}
                 
                >
                    <Col span={6}  >
                        <FormItem
                        >
                            {getFieldDecorator('searchKey', {
                                rules: [],
                            })(
                                <Input placeholder='品牌' />
                                )}
                        </FormItem>
                    </Col>
                    <Col span={6}>
                        <FormItem 
                        >
                            {getFieldDecorator('enableState', {
                                rules: [],
                            })(
                                <Select placeholder='启用状态' >
                                    <Option value="1">启用</Option>
                                    <Option value="2">停用</Option>
                                </Select>
                                )}
                        </FormItem>
                    </Col>
                    <Col span={4}>
                        <a onClick={this.props.onSearch}>搜索</a>
                    </Col>
                </Row>
            </Form>
           
            )
    }
}

export default SearchForm;