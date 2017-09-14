import { Table, Icon,Button ,Form,  Input,  Checkbox,Col,DatePicker,message ,Radio} from 'antd';
import Myself from './formCustomDepart.jsx'
import moment from 'moment';
const FormItem = Form.Item;
const RadioGroup = Radio.Group;
export default class NormalLoginForm extends React.Component {
    constructor(props){
        super(props);
    }
    
    
    // componentDidMount() {
    //     debugger
    //     if(this.props.data) {
    //         this.props.form.setFieldsValue(this.props.data);
    //     }
        
    // }
    
    changeValueFn(){
        let data=this.props.data;
        for(var key in data){
            // if(key ==='sysCreatedTime'){
            //     debugger
            //     this.props.form.setFieldsValue({
            //         [key]: moment(data[key], 'YYYY-MM-DD')
            //     });
            //}else{
                this.props.form.setFieldsValue({
                    [key]: data[key],
                });
            //}
        }
    }

    handleSubmit = (e) => {
      e.preventDefault();
      let that=this;
    }

    render() {
      const { getFieldDecorator } = this.props.form;
      return (
          <div>
              {
                  this.props.data?
               <div>
                    <Form onSubmit={this.handleSubmit}  className="login-form home-form" >

                        <FormItem>
                            {getFieldDecorator('id', {
                            rules: [{ required: true, message: '请输入编号!' }],
                            })(
                            <Input  style={{display:'none'}} prefix={<Icon type="tag-o" style={{ fontSize: 13 }}/>} type='text' placeholder="请输入编号!"/>
                            )}
                        </FormItem>
                        <FormItem label='编码'>
                            {getFieldDecorator('code', {
                            rules: [{ required: true, message: '请输入项目名称' }],
                            })(
                            <Input prefix={<Icon type="folder" style={{ fontSize: 13 }}/>} type="text" placeholder="请输入项目名称"/>
                            )}
                        </FormItem>
                        <FormItem label='名称'>
                            {getFieldDecorator('name', {
                            rules: [{ required: true, message: '请输入编号!' }],
                            })(
                            <Input prefix={<Icon type="tag-o" style={{ fontSize: 13 }}/>} type='text' placeholder="请输入编号!"/>
                            )}
                        </FormItem>
                        <FormItem label='简称'>
                            {getFieldDecorator('simpleName', {
                            rules: [{ required: true, message: '请输入编号!' }],
                            })(
                            <Input prefix={<Icon type="tag-o" style={{ fontSize: 13 }}/>} type='text' placeholder="请输入编号!"/>
                            )}
                        </FormItem>
                        <FormItem label='助记码'>
                            {getFieldDecorator('simpleCode', {
                            rules: [{ required: true, message: '请输入编号!' }],
                            })(
                            <Input prefix={<Icon type="tag-o" style={{ fontSize: 13 }}/>} type='text' placeholder="请输入编号!"/>
                            )}
                        </FormItem>
                        <FormItem label='上级组织'>
                            {getFieldDecorator('fatherorgId', {
                            rules: [{ required: true, message: '请输入编号!' }],
                            })(
                            <Input prefix={<Icon type="tag-o" style={{ fontSize: 13 }}/>} type='text' placeholder="请输入编号!"/>
                            )}
                        </FormItem>
                        <FormItem label='负责人'>
                            {getFieldDecorator('respoPerson', {
                            rules: [{ required: true, message: '请输入编号!' }],
                            })(
                            <Input prefix={<Icon type="tag-o" style={{ fontSize: 13 }}/>} type='text' placeholder="请输入编号!"/>
                            )}
                        </FormItem>
                        <FormItem label='其他负责人'>
                            {getFieldDecorator('otherRespoPerson', {
                            rules: [{ required: true, message: '请输入编号!' }],
                            })(
                            <Input prefix={<Icon type="tag-o" style={{ fontSize: 13 }}/>} type='text' placeholder="请输入编号!"/>
                            )}
                        </FormItem>
                        <FormItem label='组织类型'>
                            {getFieldDecorator('orgType', {
                            rules: [{ required: true, message: '请输入编号!' }],
                            })(
                                <RadioGroup>
                                    <Radio value={0}>部门</Radio>
                                    <Radio value={1}>公司</Radio>
                                </RadioGroup>
                            )}
                        </FormItem>
                    </Form>
                </div>:''
           }
        </div>
      );
    }
  }