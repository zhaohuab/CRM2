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
        let lang = this.props.$$state.get("lang");
        let getLang = this.props.getLang; 
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
                        label={ getLang.call(this, lang, 'damc') }
                        { ...formItemLayout }
                      >  
                        <Row gutter = { 10 }>
                          <Col span= { 20 }>
                          { getFieldDecorator('name', {
                            rules: [{
                                required: true, message: getLang(lang, 'qsrdamc'),
                            }],
                          })(
                            <Input placeholder = { getLang.call(this, lang, 'qsr') }/>
                            )}
                            </Col>
                            <Col span = { 4 }>
                              { isDefault == 1 ? <span style={{ fontSize: '10px' }}>{ getLang.call(this, lang ,'xtyzda') }</span>:''}                   
                            </Col>
                         </Row>
                    </FormItem>
                   
                    <FormItem
                        label = { getLang.call(this, lang, 'dams') }
                        {...formItemLayout}
                    >  <Row gutter = { 10 }>
                          <Col span = { 20 }>
                        { getFieldDecorator('description', {
                            rules: [{
                                required: true, message: getLang(lang,'qsrdams'),
                            }],
                        })(
                            <Input type='textarea'placeholder = { getLang.call(this, lang, 'qsr') }/>
                            )}
                               </Col>
                            <Col span = { 4 }>                  
                            </Col>
                         </Row>
                    </FormItem>
                    <FormItem
                        label = { getLang.call(this, lang, 'damx') }
                        {...formItemLayout}
                    >
                          <MyTable 
                            getLang = { getLang }
                          />                     
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





















































/* 
 componentDidMount() {//一切想要操作真实DOM的方法之后均要放在这里。这个方法会在render方法之后，且真实的DOM数渲染自后执行；所以这里操作数据状态的话，紧接着就会重新渲染一次
        let data = this.props.$$state.get('editData').toJS(); 
        this.props.form.setFieldsValue(data);
    } 
        //只能通过this.props和this.state访问数据
    //不能在render方法中任何位置修改state状态或者是DOM输出；

 */