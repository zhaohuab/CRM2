import { Form, Input, Select } from 'antd';

import Email from 'utils/components/emails'
import Department from 'components/refs/departments'
import Enum from 'utils/components/enums'
import RadioGroup from 'utils/components/radios'
const FormItem = Form.Item;
const Option = Select.Option;
const { TextArea } = Input;
class Card extends React.Component {
    constructor(props) {
        super(props)
        const value = this.props.value || {};
        this.state = {
          mtObjId:'',
          mtBiztypeId:''
    };
    }
   
    componentDidMount() {        
        //装箱过程   
       /*  let { mtObjId, mtObjName, mtBiztypeId, mtBiztypeName } = this.props.dataSource;  
        this.props.dataSource.mtObjId = { key: mtObjId, title: mtObjName }; 
        this.props.dataSource.mtBiztypeId = { key: mtBiztypeId, title: mtBiztypeId };  */      
        this.props.form.setFieldsValue(this.props.dataSource);
    }
    componentWillMount() {}
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
                label = "名称"
                { ...formItemLayout }
            >
                { getFieldDecorator('name', {
                    rules: [{ required: true, message: '请输入名称' }],
                })(
                    <Input placeholder = '请输入...' />
                    )}
            </FormItem>
            <FormItem  
                label = '业务对象'
                { ...formItemLayout } 
            >              
                { getFieldDecorator('mtObjId', {
                    rules: [{ required: true, message: '请选择业务对象!' }],
                    })(
                        <Select style = {{ width: 120 }} placeholder = '请选择...'>
                            <Option value = { 1 }>联系人</Option>
                            <Option value = { 2 }>线索</Option>
                            <Option value = { 3 }>商机</Option>
                            <Option value = { 4 }>竞品采集</Option>
                        </Select>
                      )}
            </FormItem>
            <FormItem  
                label = '业务类型'
                { ...formItemLayout } 
            >              
                { getFieldDecorator('mtBiztypeId', {
                   // initialValue:{ mtBiztypeId },
                    rules: [{ required: true, message: '请选择业务类型!' }],
                    })(
                        <Select style = {{ width: 120 }} placeholder = '请选择...'>
                            <Option value = { 1 }>重点联系人</Option>
                            <Option value = { 2 }>线索</Option>
                            <Option value = { 3 }>普通商机</Option>
                            <Option value = { 4 }>重点商机</Option>
                            <Option value = { 5 }>竞品采集</Option>
                        </Select>
                      )}
            </FormItem>
            <FormItem
                label = "备注"
                { ...formItemLayout }
            >
                { getFieldDecorator('remark', { rules: [] })(
                    <TextArea placeholder = '请输入...'/>
                    )}
            </FormItem>
        </Form>)
    }
}

export default Card;