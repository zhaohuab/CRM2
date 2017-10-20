import { Table, Icon, Button, Form, Input, Checkbox, Col, DatePicker, message, Radio, Select } from 'antd';
import moment from 'moment';
import Department from 'components/refs/departments'

const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const Option = Select.Option;

export default class NormalLoginForm extends React.Component {
    constructor(props) {
        super(props);
    }
 
    componentDidMount() {
    //装箱过程
        let { fatherorgId,fatherorgName} = this.props.data; 
        this.props.data.fatherorgId = {key:fatherorgId,title:fatherorgName};    
        this.props.form.setFieldsValue(this.props.data);
    }

    render() {
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
        const { getFieldDecorator } = this.props.form;
        return (
            <div>
                {
                    this.props.data ?
                            <Form {...formItemLayout}  className="login-form home-form" >
                                <div>
                                    {getFieldDecorator('id', {
                                        rules: [],
                                    })(
                                        <Input style={{ display: 'none'}} type='text' placeholder="请输入编号!" />
                                        )}
                                </div>
                                <FormItem {...formItemLayout} label='编码'>
                                    {getFieldDecorator('code', {
                                        rules: [{ required: true, message: '请输入编码' }],
                                    })(
                                        <Input  type="text" placeholder="请输入编码" />
                                        )}
                                </FormItem>
                                <FormItem {...formItemLayout} label='名称'>
                                    {getFieldDecorator('name', {
                                        rules: [{ required: true, message: '请输入名称!' }],
                                    })(
                                        <Input type='text' placeholder="请输入名称!" />
                                        )}
                                </FormItem>
                                <FormItem  {...formItemLayout} label='上级分类'>
                                    {getFieldDecorator('fatherTypeId', {
                                        rules: [{ required: true, message: '上级分类!' }],
                                    })(
                                         <Select style={{ width: 120 }} placeholder = '请选择...'>
                                            <Option value = { 1 }>肥料</Option>
                                            <Option value = { 2 }>农药</Option>
                                            <Option value = { 3 }>种子</Option>
                                            <Option value = { 4 }>农膜</Option>
                                          </Select>
                                        )}
                                </FormItem>
                                <FormItem  {...formItemLayout} label='属性组'>
                                    {getFieldDecorator('attrGroupId', {
                                        rules: [{ required: true, message: '请输入属性组!' }],
                                    })(
                                          <Select style={{ width: 120 }} placeholder = '请选择...'>
                                            <Option value = { 1 }>肥料属性</Option>
                                            <Option value = { 2 }>农药属性</Option>
                                            <Option value = { 3 }>种子属性</Option>
                                            <Option value = { 4 }>农膜属性</Option>
                                          </Select>
                                        )}
                                </FormItem>
                                <FormItem  { ...formItemLayout } label='对应ERP组织'>
                                    { getFieldDecorator('erpCode', {
                                        rules: [],
                                    })(
                                        <Input type='text' placeholder = "无" />
                                        )}
                                </FormItem>
                            </Form>
                         : ''
                }
            </div>
        );
    }
}
