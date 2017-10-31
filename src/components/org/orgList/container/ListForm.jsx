import { Table, Icon, Button, Form, Input, Checkbox, Col, DatePicker, message, Radio } from 'antd';
import moment from 'moment';
import Department from 'components/refs/departments'

const FormItem = Form.Item;

const RadioGroup = Radio.Group;
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
                                <FormItem  {...formItemLayout} label='简称'>
                                    {getFieldDecorator('simpleName', {
                                        rules: [{ required: true, message: '请输入简称!' }],
                                    })(
                                        <Input type='text' placeholder="请输入简称!" />
                                        )}
                                </FormItem>
                                <FormItem  {...formItemLayout} label='助记码'>
                                    {getFieldDecorator('simpleCode', {
                                        rules: [{ required: true, message: '请输入助记码!' }],
                                    })(
                                        <Input type='text' placeholder="请输入助记码!" />
                                        )}
                                </FormItem>
                                <FormItem
                                    label="上级组织"
                                    {...formItemLayout}
                                >
                                    {getFieldDecorator('fatherorgId', {
                                        rules: [],
                                    })(
                                        <Department />
                                        )}
                                </FormItem>
                                <FormItem  {...formItemLayout} label='负责人'>
                                    {getFieldDecorator('respoPerson', {
                                        rules: [],
                                    })(
                                        <Input disabled='true' type='text' placeholder="无" />
                                        )}
                                </FormItem>
                                <FormItem  {...formItemLayout} label='其他负责人'>
                                    {getFieldDecorator('otherRespoPerson', {
                                        rules: [],
                                    })(
                                        <Input disabled='true' type='text' placeholder="无" />
                                        )}
                                </FormItem>
                                <FormItem  {...formItemLayout} label='组织类型'>
                                    {getFieldDecorator('orgType', {
                                        rules: [{ required: true, message: '请输入组织类型!' }],
                                    })(
                                        <RadioGroup>
                                            <Radio value={1}>公司</Radio>
                                            <Radio value={2}>部门</Radio>
                                        </RadioGroup>
                                        )}
                                </FormItem>
                            </Form>
                         : ''
                }
            </div>
        );
    }
}