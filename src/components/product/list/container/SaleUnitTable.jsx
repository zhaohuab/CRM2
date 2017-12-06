import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Table, Button,Icon, Select, Switch } from 'antd';
import {Input,Radio,Popconfirm,Form} from 'antd';

import SalesUnitRef from './SalesUnitRef'
import './index.less'
const Option = Select.Option;
let Search = Input.Search;
let RadioGroup = Radio.Group;
const ButtonGroup = Button.Group;
import 'assets/stylesheet/all/iconfont.css'
import * as Actions from "../action"
import { debug } from 'util';

class SaleUnitTable extends React.Component {
  constructor(props) {
    super(props)
    this.state ={
      fchecked:false
    }
    this.columns = [
      {
        title: '序号',
        dataIndex: 'number',
        render: (text,record,index) =>(
         index +1
        )
      },
    {
      title: '销售单位',
      dataIndex: 'measureId',
      render: (text,record,index) =>(
        <SalesUnitRef record = {record}/>
      )
    },
    {
      title:'换算率',
      dataIndex:'convertRate',
      render:(text,record,index) => (
        <Input  
        title = "convertRate"
        defaultValue={record.convertRate}
        onBlur={this.onBlur.bind(this,record)}/>)
    },
    {
      title:'固定换算',
      dataIndex:'fixedConvert',
      render:(i,record,index)=> (  
        <Switch defaultChecked={record.fixedConvert == 1? true: false} 
          onChange = {this.changeFCheck.bind(this,record)} />)
    }]
  }

  changeFCheck(record,checked) {
    let flag = true;
    let fixedConvert = {};
    if(checked == true){
      fixedConvert = {fixedConvert:1};
    }else{
      fixedConvert = {fixedConvert:2};
    }
     
    Object.assign(record, fixedConvert);
    if (record.editState != 'add') { 
      record.editState='update';
    } 
    let changedData = this.props.$$state.get('changedData').toJS();
    //遍历变化值，是否有此条数据，如果没有加到变化结构里，如果有，覆盖原来数据
    for (let i=0,len=changedData.length; i<len; i++){
      if(changedData[i].id==record.id){         
        Object.assign(changedData[i],record);
        flag = false;
        break;
      }
    }
    this.setState({fchecked:checked});
    if (flag){ changedData.push(record) };   
    this.props.action.onChangeSuVa(changedData); 

  }

  onBlur(record,e){//输入框变化回调
    let flag = true; 
    let {title,value}  = e.target;
    if (record[title]!=value){
      record[title]=value;    
      if (record.editState != 'add') { 
        record.editState='update';
      } 
      let changedData = this.props.$$state.get('changedData').toJS();
      //遍历变化值，是否有此条数据，如果没有加到变化结构里，如果有，覆盖原来数据
      for (let i=0,len=changedData.length; i<len; i++){
        if(changedData[i].id==record.id){         
          Object.assign(changedData[i],record);
          flag = false;
          break;
        }
      }
      if (flag){ changedData.push(record) };   
      this.props.action.onChangeSuVa(changedData); 
    }
  }

  onChange(record,value){
    if(record.editState!='add' ){
      record.editState='update';
    }
    record.enableState=value 
    let dataSource = this.props.$$state.get('dataSource').toJS(); 
    let data = dataSource.map(item=>{
      if(item.key==record.key){
        return record
      }
      return item 
    })
   this.props.action.changeEnabe(data)  
  }

  render(){ 
    let dataSource =this.props.$$state.get('salesunitTable').toJS();
    let columns=this.columns;
    let selectedRowKeys =this.props.$$state.get('suSelectedRowKeys').toJS();
    let rowSelection = {
      selectedRowKeys,
      onChange: (selectedRowKeys,selectedRows) =>{
        this.props.action.setSecRowKeys(selectedRowKeys);
      },
    };
    return (
      <Table 
        dataSource = { dataSource } 
        columns = { columns } 
        pagination = { false } 
        showHeader = { true } 
        rowKey = "id"s
        rowSelection={rowSelection}
      />)
  }
}

function mapStateToProps(state, ownProps) {
  return {
    $$state: state.product
  }
}

function mapDispatchToProps(dispatch) {
  return {
      action: bindActionCreators(Actions, dispatch)
  }
}

export default  connect( mapStateToProps, mapDispatchToProps)(SaleUnitTable);


