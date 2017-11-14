import { Input, Row, Col } from 'antd';
import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import MyTable from './table.jsx'
import './index.less'
const { TextArea } = Input;
import 'assets/stylesheet/all/iconfont.css'
import * as Actions from "../action"

class Card extends React.Component {
  constructor(props){
    super(props)
  }
  handleFormChange = (changedFields) => {
    this.props.action.valueChange(changedFields)
  }
  onChange=(e)=>{
    let editData = this.props.$$state.get('editData').toJS()
    let{value}= e.target
    if (e.target.nodeName=='INPUT'){
      editData.name=value;
    }else{
      editData.description=value 
    }      
    this.props.action.valueChange(editData)
  }

  render() { 
    let editData = this.props.$$state.get('editData').toJS();
    let {isDefault} = editData;
    let name = this.props.$$state.get('name');
    let description  = this.props.$$state.get('description');
    return (
      <div>
        <div style = {{marginTop:'20px'}}>
          <Row type="flex" gutter={10} align="middle" >
            <Col span={4}>
              <span style={{float:'right'}}>档案名称：</span>
            </Col>
            <Col span= { 15 }>
              <Input
                value = { editData.name }  
                onChange = { this.onChange.bind(this) } 
              />   
            </Col>
            <Col span= { 5 }>
              { isDefault == 1 ? <span>*系统预制档案</span> :'' }
            </Col>
          </Row>
        </div>
        <div style = {{marginTop:'20px'}}>
          <Row type="flex" gutter={10} align="middle" >
            <Col span={4}>
              <span style={{float:'right'}}>档案描述：</span>
            </Col>
            <Col span = { 15 }>
              <TextArea 
                value = { editData.description } 
                onChange = { this.onChange.bind(this) } 
              />           
            </Col>
            <Col span= { 5 }></Col>
          </Row>
        </div>
        <div style = {{marginTop:'20px'}} id='docDetail'>
          <Row type="flex" gutter={10} >
            <Col span={4}>
              <span style={{float:'right'}}>档案明细：</span>
            </Col>
            <Col span={17}>
              <MyTable />
            </Col>
            <Col span={3}></Col>
          </Row>
        </div> 
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