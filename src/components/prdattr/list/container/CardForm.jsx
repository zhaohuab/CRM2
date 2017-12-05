import { Form, Input, Select,Icon, Button } from 'antd';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import classNames from 'classnames';

//导入action方法
import * as Actions from "../action"

const FormItem = Form.Item;
const Option = Select.Option;

class AttrCard extends React.Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        //this.props.form.setFieldsValue(this.props.dataSource);
    }

    addRow(){

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
                label="属性名称"
              //  {...formItemLayout}
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
                label="属性对应ERP"
               // {...formItemLayout}
            >
                {getFieldDecorator('erpCode', {
                
                })(
                    <Input  placeholder='请输入...'/>
                    )}
            </FormItem>
        </Form>)
    }
}


//const WrapCard = Form.create({options})(Card);

//绑定状态到组件props
function mapStateToProps(state, ownProps) {
    return {
      $$state: state.prdattr
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
           // let data = props.$$state.get("formData").toJS();
           debugger
            let changeData = {};
            for(let i in fields){
                let key = i;
                changeData = {[i]:fields[i].value};
            }
            props.action.changeFormData(changeData);
        },
        mapPropsToFields(props){
            let data = props.$$state.get("formData").toJS();
            return{
                name:{
                    ...data.name,
                    value:data.name
                },
                erpCode:{
                    ...data.erpCode,
                    value:data.erpCode
                },
            };
        },
        onValuesChange(_, values){
            //console.log(values);
        },
    })(AttrCard));

