import { Table, Icon, Button, Form, Input, Checkbox, Col, DatePicker, message, Radio, Select } from 'antd';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux';
import * as Actions from '../action/index.js'
import moment from 'moment';
import PrdClass from 'components/refs/prdtype'
import AttrsGrpRef from './AttrsGrpRef'
import FatherClassInput from './FatherClass'

const FormItem = Form.Item;

class PrdClassForm extends React.Component {
    constructor(props) {
        super(props);
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
                <Form {...formItemLayout}  className="login-form home-form" >
                    <div>
                        { getFieldDecorator('path', {
                        })(
                            <Input style={{ display: 'none'}}/>
                        )}
                    </div>                            
                    <FormItem {...formItemLayout} label='编码'>
                        {getFieldDecorator('code', {
                            rules: [{ required: true, message: '' }],
                        })(
                             <Input  type="text" placeholder=" "/>
                        )}
                    </FormItem>
                    <FormItem {...formItemLayout} label='名称'>
                        {getFieldDecorator('name', {
                            rules: [{ required: true, message: '' }],
                        })(
                            <Input type='text' placeholder="" />
                        )}
                    </FormItem>
                    <FormItem
                    label="上级分类"
                    {...formItemLayout}
                    >
                        {getFieldDecorator('fatherTypeId', {
                            rules: [],
                        })(
                            <FatherClassInput/>
                        )}
                    </FormItem>
                    <FormItem  { ...formItemLayout } label='属性组'>
                        { getFieldDecorator('attrGroupId', {
                            rules: [],
                        })(
                            <AttrsGrpRef />
                        )}
                    </FormItem>
                    <FormItem  { ...formItemLayout } label='对应ERP'>
                        { getFieldDecorator('erpCode', {
                            rules: [],
                        })(
                            <Input type='text' placeholder = "" />
                        )}
                    </FormItem>
                </Form>                          
            </div>
        );
    }
}

//绑定状态到组件props
function mapStateToProps(state, ownProps) {
    return {
      $$state: state.prdtype
    }
}
  
  //绑定action到组件props
function mapDispatchToProps(dispatch) {
    return {
      action: bindActionCreators(Actions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(
    Form.create({
        onFieldsChange(props, fields){ 
            let fieldsChangeData = {};
            let dataSource = props.dataSource;
            for(let item in fields){              
                if(item == "fatherTypeId"){
                    fieldsChangeData = {[item]:parseInt(fields[item].value)};
                }else if(item == "attrGroupId"){
                    fieldsChangeData = {[item]:parseInt(fields[item].value.attrGroupId[0]),attrGroupName:fields[item].value.attrGroupName};
                }else{           
                    fieldsChangeData = {[item]:fields[item].value};
                }
            }
            Object.assign(props.dataSource, fieldsChangeData);
           // props.action.setFieldsChangeData(fieldsChangeData);
            props.action.setFormData(props.dataSource);
        },
        mapPropsToFields(props){
            let data = props.dataSource;
            return{
                fatherTypeId:{
                    ...data.fatherTypeName,
                    value:data.fatherTypeName
                },  
                attrGroupId:{
                    ...data.attrGroupName,
                    value:data.attrGroupName
                }, 
                code:{
                    ...data.code,
                    value:data.code
                },  
                erpCode:{
                    ...data.erpCode,
                    value:data.erpCode
                }, 
                name:{
                    ...data.name,
                    value:data.name
                }, 
            };
        }
    })(PrdClassForm));

