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

   /*  componentDidMount() {//一切想要操作真实DOM的方法之后均要放在这里。这个方法会在render方法之后，且真实的DOM数渲染自后执行；所以这里操作数据状态的话，紧接着就会重新渲染一次
        let data = this.props.$$state.get('editData').toJS(); 
        this.props.form.setFieldsValue(data);
    } */
    render() {
    //只能通过this.props和this.state访问数据
    //不能在render方法中任何位置修改state状态或者是DOM输出；
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
                        label="档案名称"
                        {...formItemLayout}
                      >  
                        <Row gutter={10}>
                          <Col span={20}>
                          {getFieldDecorator('name', {
                            rules: [{
                                required: true, message: '请输入名称',
                            }],
                          })(
                            <Input placeholder='请输入...'/>
                            )}
                            </Col>
                            <Col span={4}>
                              {isDefault==1?<span>系统预制档案</span>:<span>非预制档案</span>}                   
                            </Col>
                         </Row>
                    </FormItem>
                   
                    <FormItem
                        label="档案描述"
                        {...formItemLayout}
                    >
                        {getFieldDecorator('description', {
                            rules: [{
                                required: true, message: '请输入描述',
                            }],
                        })(
                            <Input type='textarea'placeholder='请输入...'/>
                            )}
                    </FormItem>
                    <FormItem
                        label="档案明细"
                        {...formItemLayout}
                    >
                          <MyTable />                     
                   </FormItem>
            </Form>)          
    }
}

let WrapedCard = Form.create({
 onFieldsChange(props, changedFields) {//当 Form.Item 子节点的值发生改变时触发，可以把对应的值转存到 Redux store  ;
    for(let key in changedFields){
        props[key]=changedFields[key].value
    }
    props.onChange(props);
  },
  mapPropsToFields(props) {//把redux中的数据读出
    return {
      ...props
    };
  },
 /*  onValuesChange(props, values) {//任一表单域的值发生改变时的回调
    console.log(values);
  }, */
})(Child)

class Card extends React.Component {
  constructor(props){
    super(props)
  }
  handleFormChange = (changedFields) => {
    this.props.action.valueChange(changedFields)
  }
  render() {  
    const editData = this.props.$$state.get('editData').toJS();
    let valueObj={};
    valueObj.name={}
    valueObj.description={};
    valueObj.name.value=editData.name;
    valueObj.description.value=editData.description;
    /* debugger; */
    return (
      <div>
        <WrapedCard { ...editData } onChange={this.handleFormChange} />
      </div>
    );
  }
}

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

export default  connect( mapStateToProps, mapDispatchToProps)(Card);

/* 
最大的问题：怎么一次性获取到所有formItem的值;getFieldsValue()这个方法在哪里执行？？？

 */