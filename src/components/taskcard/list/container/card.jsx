
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import moment from 'moment';
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
    if (item.isDefault == 1){
        alert('亲，预制档案，不可编辑！')
        return
    }
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
    return  moment(time).format("YYYY-MM-DD")
    /* moment(getDBStr(time,'create_date') ).format('YYYY-MM-DD') */
  }
 

  render() {   //只能通过this.props和this.state访问数据;不能在render方法中任何位置修改state状 态或者是DOM输出；
    let item= this.props.dataSource;
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
                title='任务卡'              
                extra={
                <Dropdown overlay={menu} trigger={['click']}>
                    <div  href="javascript:;" style={{cursor:'pointer'}}>
                    <p style={{fontSize:'30px', color:'#555'}}>...</p>
                    </div>
                </Dropdown>
                }  
                bordered={false} 
                style={{marginTop:'16px', height:'180px'}} 
                >
                  <div>
                    <Row>
                      <Col span={8}><span>业务对象：</span></Col>
                      <Col span={14}>{item.mtObjName}</Col>
                      <Col span={4}></Col>
                    </Row> 
                    <Row>
                      <Col span={8}><span>业务类型：</span></Col>
                      <Col span={14}>{item.mtBiztypeName}</Col>
                      <Col span={4}></Col>
                    </Row> 
                    <Row> 
                      <Col span={8}><span>简介：</span></Col>
                      <Col span={14}>{item.remark}</Col>
                      <Col span={4}></Col>
                    </Row> 
                    <Row> 
                      <Col span={8}><span>创建人：</span></Col>
                      <Col span={14}>{item.userName}</Col>
                      <Col span={4}></Col>
                    </Row> 
                    <Row> 
                      <Col span={8}><span>创建时间：</span></Col>
                      <Col span={12}>{this.translateTime(item.time)}</Col>
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
    $$state: state.taskcard
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
            
