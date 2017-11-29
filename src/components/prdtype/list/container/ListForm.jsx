import { Table, Icon, Button, Form, Input, Checkbox, Col, DatePicker, message, Radio, Select } from 'antd';
import moment from 'moment';
import PrdClass from 'components/refs/prdtype'

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
                                           {
                                    getFieldDecorator('path', {
                                    })(
                                        <Input style={{ display: 'none'}}/>
                                        )
                                    }
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
                                <FormItem
                                    label="上级分类"
                                    {...formItemLayout}
                                >
                                    {getFieldDecorator('fatherTypeId', {
                                        rules: [],
                                    })(
                                        <PrdClass />
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
