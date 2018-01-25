
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Form, Input, Table, Row, Col, Radio  } from 'antd';
import './index.less';
import 'assets/stylesheet/all/iconfont.css';
import * as Actions from "../../action/approved.js";

const FormItem = Form.Item;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

class Child extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    //debugger;
    let { $$state } = this.props;
    let myState = $$state.get('myState');
    let { getFieldDecorator } = this.props.form; 
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
          label='时间范围'
          { ...formItemLayout }
        >  
        <Row gutter = { 10 }>
          <Col span= { 24 }>
            { getFieldDecorator('date', {
              rules: [{}],initialValue: 'a' 
            })(
                <RadioGroup size="large">
                  <RadioButton value="a">今天</RadioButton>
                  <RadioButton value="b">本周</RadioButton>
                  <RadioButton value="c">本季</RadioButton>
                  <RadioButton value="d">今年</RadioButton>
                  <RadioButton value="e">不限</RadioButton>  
                </RadioGroup>
            )}
          </Col>
        </Row>
        </FormItem>                   
        <FormItem
          label = '单据状态'
          {...formItemLayout}
        >  
            <Row gutter = { 10 }>
              { 
               myState ? 
                <Col span = { 24 }>
                { getFieldDecorator('status', {
                    rules: [{}], initialValue: '1' 
                })(
                    <RadioGroup size="large">
                      <RadioButton value="1">未完成</RadioButton>
                      <RadioButton value="2">已完成</RadioButton>                
                    </RadioGroup>
                  )}
                </Col>:
                 <Col span = { 24 }>
                { getFieldDecorator('status', {
                    rules: [{}], initialValue: '3' 
                })(
                        <RadioGroup  size="large">
                            <RadioButton value="3">待办</RadioButton>
                            <RadioButton value="4">已办</RadioButton>               
                        </RadioGroup>
                    )}
                </Col>}
            </Row>
        </FormItem>:
        <FormItem
          label = '模糊搜索'
          {...formItemLayout}
        >
            <Row gutter = { 10 }>
            <Col span = { 24 }>
                { getFieldDecorator('searchData', {
                    rules: [{
                        required: true,
                    }],
                })(           
                        <Input />                 
                    )}
                </Col>
                <Col span = { 4 }>
                        <span style={{cursor:'pointer',marginLeft:'20px'}}>搜索</span>                    
                </Col>
          </Row>               
        </FormItem>
     </Form>)          
    }
}

let WrapedCard = Form.create({
  onFieldsChange(props, changedFields) {//当 Form.Item 子节点的值发生改变时触发，可以把对应的值转存到 Redux store  ;
  console.log('changedFields=======',changedFields)
  if('status' in changedFields){
   props.action.tableStateChange(changedFields.status.value)
  }
  /*   let data = props.editData;
    for (let key in changedFields){
      data[key] = changedFields[key].value
    }
    */
  },
  mapPropsToFields(props) {//把redux中的数据读出
  //debugger;)
 /*    return {
      name: { value: props.editData.name },
      description: { value: props.editData.description }
    }; */
  },
})(Child)

function mapStateToProps(state, ownProps) {
  return {
    $$state: state.header
  }
}

function mapDispatchToProps(dispatch) {
  return {
      action: bindActionCreators(Actions, dispatch)
  }
}

export default  connect( mapStateToProps, mapDispatchToProps)(WrapedCard);













































