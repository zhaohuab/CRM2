
import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {  Card, Col, Row, Menu, Dropdown, Checkbox, Switch, Popconfirm, Button } from 'antd';
import './index.less'

//导入action方法
import * as Actions from "../action"

class Cards extends React.Component {
  constructor(props) {
    super(props)    
  }

  onCancel = () => { return }
  onEdit = (item) => { //选择任务卡
    this.props.action.returnCards(true, item);  
  }

  enableChange=(item)=>{//停启用切换
      let arr = [];
      let num = item.enableState == 1 ? 2 : 1;
      arr.push(item.id);
      this.props.action.onEnable(arr, num)
  }

  componentDidMount(){}

  render() { 
    let item= this.props.dataSource;
    return (
            <Card 
                title='拜访规则'              
                extra={<div onClick={this.onEdit.bind(this,item)} style={{cursor:'pointer'}}>任务卡</div>} 
                bordered={false} 
                style={{marginTop:'16px'}} 
                >
                  <div>
                    <Row>
                      <Col span={8}><span>客户等级：</span></Col>
                      <Col span={16}>{item.cumEnumValueName}</Col>
                    </Row> 
                    <Row>
                      <Col span={8}><span>适用公司：</span></Col>
                      <Col span={16}>{item.orgName}</Col>
                    </Row> 
                    <Row> 
                      <Col span={20}></Col>
                      <Col span={4}>
                        <Popconfirm 
                          title = { item.enableState == 1 ? '确认停用' : '确认启用' } 
                          okText = "是" 
                          cancelText = "否" 
                          onConfirm = { this.enableChange.bind(this, item) }      
                          onCancel = { this.onCancel }
                        >
                          <Button size = 'small' type = { item.enableState == 1 ? 'primary' : '' }>
                             { item.enableState == 1 ? '启用' : '停用' }
                          </Button>
                        </Popconfirm>
                      </Col>
                    </Row> 
                  </div>
            </Card>)
  }
}

function mapStateToProps(state, ownProps) {
  return {
    $$state: state.visitrules
  }
}
function mapDispatchToProps(dispatch) {
  return {
      action: bindActionCreators(Actions, dispatch)
  }
}
export default  connect( mapStateToProps, mapDispatchToProps)(Cards);






 