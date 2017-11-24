
import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {  Card, Col, Row, Menu, Dropdown, Checkbox } from 'antd';
import './index.less'

//导入action方法
import * as Actions from "../action"

class Cards extends React.Component {
  constructor(props) {
    super(props)    
    this.state = {
      rowKeys: [],
      isEdit: false,
    }
  }

  singleDelete = (id) => {//删除按钮
  debugger;
    let arr = [];
    let selectedRowKeys = this.props.$$state.get("selectedRowKeys").toJS();
    arr.push(id);
    if(selectedRowKeys.indexOf(id)!=-1){
       selectedRowKeys=selectedRowKeys.filter(item => item!=id)
       this.props.action.onSelected(selectedRowKeys)
    }
    this.props.action.onDelete(arr);
  }
   onDelete = () => {
     let { selectedRowKeys } = this.state;
     //debugger;
     this.props.action.onDelete(selectedRowKeys);
     this.setState({selectedRowKeys:[], headLabel:false})
   }

  onEdit = (item) => { //编辑按钮
    this.props.action.showForm(true, item, true);
  }

  onSelectChange = (id,e) => { //选中列表数据触发
     let selectedRowKeys = this.props.$$state.get("selectedRowKeys").toJS();
     if (e.target.checked){
       selectedRowKeys.push(id)
     }else{
       selectedRowKeys=selectedRowKeys.filter(item => item!=id)
     }
    this.props.action.onSelected(selectedRowKeys)
  }

  render() {   //只能通过this.props和this.state访问数据;不能在render方法中任何位置修改state状态或者是DOM输出；
    let item= this.props.dataSource;
    let menu = (
        <Menu>
            <Menu.Item key="0"><div onClick = { this.singleDelete.bind(this,item.id) }>删除</div></Menu.Item>
            <Menu.Divider />
            <Menu.Item key="2"><div onClick = { this.onEdit.bind(this,item) }>编辑</div></Menu.Item>
        </Menu>
    )
    return (
            <Card 
                title={ 
                    <div><Checkbox onChange={this.onSelectChange.bind(this, item.id)}/> <span style={{marginLeft:'-10px'}}>任务卡</span></div>
                } 
                extra= { 
                    <div><Checkbox onChange={this.onSelectChange.bind(this, item.id)}/> <span style={{marginLeft:'-10px'}}>任务卡</span></div>
                } 
                extra={
                <Dropdown overlay={menu} trigger={['click']}>
                    <div  href="javascript:;" style={{cursor:'pointer'}}>
                    <p style={{fontSize:'30px', color:'#555'}}>...</p>
                    </div>
                </Dropdown>
                }  
                bordered={false} 
                style={{marginTop:'16px'}} 
                >
                
                    <div>
                        <p><span>业务对象：</span>{item.mtObjId}</p>
                        <p><span>业务类型：</span>{item.mtBiztypeId}</p>
                        <p><span>简介：</span>{item.remark}</p>
                        <p><span>创建人：</span>{item.userName}</p>
                        <p><span>创建时间：</span>2017/11/20</p>
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





/*  {
   column.map((item,index)=> {
                return  <p>{item.title}:{data[index][item.dataIndex]}</p>
              })
            } */ 