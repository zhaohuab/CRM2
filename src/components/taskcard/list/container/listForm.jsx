import { Form, Input, Select, Radio } from 'antd';

import Email from 'utils/components/emails'
import Department from 'components/refs/departments'
import Enum from 'utils/components/enums'
//import RadioGroup from 'utils/components/radios'
const RadioGroup = Radio.Group
const FormItem = Form.Item;
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
                label = '业务对象'
                { ...formItemLayout } 
            >              
                { getFieldDecorator('mtObjId', {
                    rules: [{ required: true, message: '请选择业务对象!' }],
                    })(
                        <Input placeholder = '请输入...' />
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
                        <Input placeholder = '请输入...' />
                      )}
            </FormItem>
              <FormItem
                label = "启用状态"
                { ...formItemLayout }
            >
                { getFieldDecorator('enableState', {
                    rules: [{ required: true, message: '请输入名称' }],
                })(
                       <RadioGroup value={this.state.value}>
                         <Radio value={1}>启用</Radio>
                         <Radio value={2}>停用</Radio>
                       </RadioGroup>
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