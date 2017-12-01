import { Form, Input, Select, Checkbox, Table, Row, Col  } from 'antd';
const FormItem = Form.Item;
import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import MyTable from './table.jsx'
import './index.less'
let Search = Input.Search;
import 'assets/stylesheet/all/iconfont.css'
import * as Actions from "../action"

class Child extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    const isDefault = this.props.$$state.get('isDefault')
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
    return (
      <Form >               
        <FormItem
          label='档案名称'
          { ...formItemLayout }
        >  
        <Row gutter = { 10 }>
          <Col span= { 20 }>
            { getFieldDecorator('name', {
              rules: [{
                required: true, message: '请输入档案名称...',
              }],
            })(
                <Input placeholder = '请输入...' />
            )}
          </Col>
          <Col span = { 4 }>
            { isDefault == 1 ? <span>系统档案</span>:''}
          </Col>
        </Row>
        </FormItem>                    
        <FormItem
          label = '档案描述'
          {...formItemLayout}
        >  
          <Row gutter = { 10 }>
            <Col span = { 20 }>
              { getFieldDecorator('description', {
                rules: [{
                    required: true, message: '请输入档案描述...',
                }],
              })(
                <Input type='textarea'placeholder = '请输入...'/>
                )}
            </Col>
            <Col span = { 4 }></Col>
          </Row>
        </FormItem>
        <FormItem
          label = '档案明细'
          {...formItemLayout}
        >
          <MyTable />                     
        </FormItem>
     </Form>)          
    }
}

let WrapedCard = Form.create({
 onFieldsChange(props, changedFields) {//当 Form.Item 子节点的值发生改变时触发，可以把对应的值转存到 Redux store  ;
    let data = props.editData;
    for (let key in changedFields){
      data[key] = changedFields[key].value
    }
    props.onChange(data);
  },
  mapPropsToFields(props) {//把redux中的数据读出
    return {
      name: { value: props.editData.name },
      description: { value: props.editData.description }
    };
  },
})(Child)
function mapStateToProps(state, ownProps) {
  return {
    $$state: state.doc
  }
}

function mapDispatchToProps(dispatch) {
  return {
    action: bindActionCreators(Actions, dispatch)
  }
}

export default  connect( mapStateToProps, mapDispatchToProps)(WrapedCard);













































