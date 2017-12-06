import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Form, Input, Select, Radio } from 'antd';
import Enum from 'utils/components/enums';
import * as Actions from "../action"
//import RadioGroup from 'utils/components/radios'
const RadioGroup = Radio.Group
const FormItem = Form.Item;
const Option = Select.Option;
const { TextArea } = Input;
class Card extends React.Component {
    constructor(props) {
        super(props)
        const value = this.props.value || {};
        this.state = {
          mtObjId:'',
          mtBiztypeId:'',
          value:1
    };
    }
   

    componentDidMount() {}
    render() {
        let { getFieldDecorator } = this.props.form;
        let bizTypes = this.props.$$state.get("bizTypes").toJS();
        let biztypeList = bizTypes.biztypeList||[];
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
        <Form >         
          <FormItem  
                label = '业务对象'
                { ...formItemLayout } 
            >              
                { getFieldDecorator('mtObjId', {
                    rules: [{ required: true, message: '请选择业务对象!' }],
                    })(
                        <Select  style = {{ width: 120 }} placeholder = '请选择...'>
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
                    rules: [{ required: true, message: '请选择业务类型!' }],
                    })(
                        <Select style = {{ width: 120 }} placeholder = '请选择...'>
                        { biztypeList.map(item =>(
                          <Option value = { item.key }>{ item.title }</Option>
                        )) }
                        </Select>
                      )}
            </FormItem>
            <FormItem
                label = "启用状态"
                { ...formItemLayout }
            >
                { getFieldDecorator('enableState', {
                    rules: [{ required: true, message: '请输入名称' }],
                })(
                       <RadioGroup>
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


let WrapedCard = Form.create({
 onFieldsChange(props, changedFields) {//当 Form.Item 子节点的值发生改变时触发，可以把对应的值转存到 Redux store  ;
    let data = props.dataSource;
    for (let key in changedFields){
        data[key] = changedFields[key].value
        if(key == 'mtObjId'){
          props.action.typeSelected(data[key])
        }
    }
    props.action.valueChange(data)    
  },
  mapPropsToFields(props) {//把redux中的数据读出
    return {
      mtObjId: { value: props.dataSource.mtObjId },
      mtBiztypeId: { value: props.dataSource.mtBiztypeId },
      enableState: { value: (props.dataSource.enableState||1) },
      remark: { value: props.dataSource.remark }
    };
  },
})(Card)

function mapStateToProps(state, ownProps) {
  return {
    $$state: state.taskcard
  }
}

function mapDispatchToProps(dispatch) {
  return {
      action: bindActionCreators(Actions, dispatch)
  }
}

export default  connect( mapStateToProps, mapDispatchToProps)(WrapedCard);
