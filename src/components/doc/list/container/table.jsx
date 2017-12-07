import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Table, Button,Icon, Select } from 'antd';
import {Input,Radio,Popconfirm,Form} from 'antd';

import './index.less'
let Option = Select.Option;
let Search = Input.Search;
let RadioGroup = Radio.Group;
let ButtonGroup = Button.Group;
import 'assets/stylesheet/all/iconfont.css'
import * as Actions from "../action"

class FileDetail extends React.Component {
  constructor(props) {
    super(props)
    this.columns = [
    {
      title: '操作',
      width: '3%',
      dataIndex: 'delete',
      render: (text, record, index) => ( 
        <a href='#' onClick = { this.onDelete.bind(this, record) }>
          <Icon type="minus-circle-o" />
        </a>)
      } ,
    {
      title: '名称',
      width: '56%',
      dataIndex: 'name',
      render: (text, record, index, storage, dataSource) => (
        <Input  onBlur = { this.onBlur.bind(this, record) } 
        defaultValue = { text }/>)
    },
    {
      title: '状态',
      width: '30%',
      dataIndex: 'enableState',
      render: (i, record, index) => (  
        <Select defaultValue = { i } style = {{ width: '100%' }} 
          dropdownMatchSelectWidth = { true } 
          getPopupContainer = { triggerNode => triggerNode.parentNode } 
          onChange = { this.onChange.bind(this, record) }>
          <Option value = { 1 }>启用</Option>
          <Option value = { 2 }>停用</Option>
        </Select>)
    },
    {
      title: 'add',
      width: '11%',
      dataIndex: 'add',
      render: (text, record, index) => {
        return index == 0 ? 
        <a href = '#' 
        onClick = { this.add.bind(this) }>
        <Icon type="plus-circle-o" />
        </a>:''
        }
    }
    ]
  }

  onBlur(record,e){//档案明细输入框变化回调
    let flag = true;
    let { value } = e.target;
    if (record.name != value){
      record.name = value;
      if (record.editState != 'ADD'){ 
        record.editState = 'UPDATE';
      }
    let storage = this.props.$$state.get('storage').toJS();
    for (let i=0,len=storage.length; i<len; i++){
      if (storage[i].key == record.key){
        storage[i] = record;
        flag = false;
      }
    }
    if (flag){ storage.push(record) };
    let dataSource = this.props.$$state.get('dataSource').toJS();
    for (let i=0,len=dataSource.length; i<len; i++){
      if (dataSource[i].key == record.key){
        dataSource[i] = record;
      }
    }
    this.props.action.onBlur(dataSource)  
    this.props.action.storage(storage)      
    }
  }

  onChange(record, value){
    debugger;
    if (record.editState != 'ADD' ){
      record.editState = 'UPDATE';
    }
    record.enableState = value; 
    let dataSource = this.props.$$state.get('dataSource').toJS(); 
    let data = dataSource.map(item => {
      if (item.key == record.key){
        return record
      }
      return item 
    })
   this.props.action.changeEnabe(data)  
  }

  onDelete(record){
    record.editState = 'DELETE';
    let dataSource = this.props.$$state.get('dataSource').toJS();
    let storage = this.props.$$state.get('storage').toJS();
    let data = dataSource.filter(item => {
      return item.key != record.key 
    })
   this.props.action.detailDelete(data);
   if (record.key.indexOf('add') == -1){
     storage.push(record)
     this.props.action.storage(storage)
   }else{
     let arr = storage.filter(item => item.key != record.key)
     this.props.action.storage(arr)
   }      
  }

  add(){
    let obj = {};
    obj.name = '';
    obj.editState = 'ADD';
    obj.enableState = 1;
    obj.key = 'add'+Math.random().toFixed(5);
    let dataSource = this.props.$$state.get('dataSource').toJS(); 
    dataSource.push(obj)
    this.props.action.detailAdd(dataSource) 
  }

  render(){ 
    let editData = this.props.$$state.get('editData').toJS();
    let dataSource = this.props.$$state.get('dataSource').toJS();
    let storage = this.props.$$state.get('storage').toJS();
    let columns = this.columns;
    return (
      <Table 
        dataSource = { dataSource } 
        columns = { columns } 
        pagination = { false } 
        showHeader = { false } 
      />)
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

export default  connect( mapStateToProps, mapDispatchToProps)(FileDetail);


