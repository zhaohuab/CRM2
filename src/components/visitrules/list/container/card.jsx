
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
    this.state = {
      isEdit: false,
    }
  }

  singleDelete = (item) => {//删除
    if (item.isDefault == 1){
      alert('亲，预制档案，不可删除！')
      return
    }
    let arr = [];
    arr.push(item.id);
    this.props.action.onDelete(arr);
  }
  onCancel = () => { return }
  onEdit = (item) => { //编辑按钮
    this.props.action.showForm(true, item, true,[]);
    this.props.action.typeSelected(item.mtObjId);
    
  }

  enableChange=(item)=>{//停启用切换
      let arr = [];
      let num = item.enableState == 1 ? 2 : 1;
      arr.push(item.id);
      this.props.action.onEnable(arr, num)
  }
  translateTime = (time) => {
    Date.prototype.toLocaleString = function() {
          return this.getFullYear() + "年" + (this.getMonth() + 1) + "月" + this.getDate() + "日 " 
    };
    let unixTimestamp = new Date( time*1000 ) ;
     return  unixTimestamp.toLocaleString();
  }
 

  render() {   //只能通过this.props和this.state访问数据;不能在render方法中任何位置修改state状 态或者是DOM输出；
    let item= this.props.dataSource;
    console.log('item=======',item)
    let menu = (
        <Menu>
            <Menu.Item key="0">
              <Popconfirm title="确认删除" okText="是" cancelText="否" onConfirm={this.singleDelete.bind(this,item)}      onCancel={this.onCancel}>
                <div>删除</div>
              </Popconfirm>
            </Menu.Item>
            <Menu.Divider />
            <Menu.Item key="2"><div onClick = { this.onEdit.bind(this,item) }>编辑</div></Menu.Item>
        </Menu>
    )
    return (
            <Card 
                title='拜访规则'              
                extra={<div style={{cursor:'pointer'}}>任务卡</div>} 
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
            </Card>       
    )
  }
}

//绑定状态到组件props
function mapStateToProps(state, ownProps) {
  return {
    $$state: state.visitrules
  }
}

//绑定action到组件props
function mapDispatchToProps(dispatch) {
  return {
      action: bindActionCreators(Actions, dispatch)
  }
}

//输出绑定state和action后组件
export default  connect( mapStateToProps, mapDispatchToProps)(Cards);





/*  
{
   column.map((item,index)=> {
                return  <p>{item.title}:{data[index][item.dataIndex]}</p>
              })
            } 
*/
            
