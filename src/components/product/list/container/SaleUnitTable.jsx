import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Table, Button,Icon, Select, Switch } from 'antd';
import {Input,Radio,Popconfirm,Form} from 'antd';

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
      selectedRowKeys:[]
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
        <Input 
        defaultValue={record.value}
        onBlur={this.onValueBlur.bind(this,record)}/>
      )
    },
    {
      title:'换算率',
      dataIndex:'convertRate',
      render:(text,record,index) => (
        <Input  
        defaultValue={record.erpCode}
        onBlur={this.onErpBlur.bind(this,record)}/>)
    },
    {
      title:'固定换算',
      dataIndex:'fixedConvert',
      render:(i,record,index)=> (  
        <Switch defaultChecked={true}  />)
    }]
  }

  onValueBlur(record,e){//输入框变化回调
    let flag = true; 
    let {value}  = e.target;
    if (record.value!=value){
      record.value=value;    
      if (record.editState != 'ADD') { 
        record.editState='UPDATE';
      } 
      let changeData = this.props.$$state.get('changeData').toJS();
      //遍历变化值，是否有此条数据，如果没有变为update
      for (let i=0,len=changeData.length; i<len; i++){
        if(changeData[i].id==record.id){         
          Object.assign(changeData[i],record);
          flag = false;
          break;
        }
      }
      if (flag){ changeData.push(record) };   
      this.props.action.onChangeAttrVa(changeData); 
    }
  }

  onErpBlur(record,e){//档案明细输入框变化回调
    let flag = true; 
    let {value}  = e.target;
    if (record.erpCode!=value){
      record.erpCode=value;
      if (record.editState!='ADD'){ 
        record.editState='UPDATE';
      }
      let changeData = this.props.$$state.get('changeData').toJS();      
      for (let i=0,len=changeData.length; i<len; i++){
        if(changeData[i].id==record.id){
         Object.assign(changeData[i],record);
         flag = false;
         break;
        }
      }
      if (flag){ changeData.push(record) }; 
      this.props.action.onChangeAttrVa(changeData);
    }
  }

  onChange(record,value){
    if(record.editState!='ADD' ){
      record.editState='UPDATE';
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

  // //点击新增按钮，增加一行
  // addRow= ()=> {
  //   let k = this.props.$$state.get("addNum");
  //   this.props.action.addAttrVaRow({id:'add_'+k.toString(),enableState:1,editState:'ADD'});
  // }
  //属性值表删除数据
  onDelete(record){
    let flag = false;
    let changeData = this.props.$$state.get('changeData').toJS();
    let attrValue = this.props.$$state.get('attrValue').toJS();
    let id = record.id;
     //先校验此条数据是否是本次新增或编辑的，如果是，从change数组里删掉
    for(let i = 0; i<changeData.length; i++){
      if(changeData[i].id == id){
        changeData.splice(i,1);
        //this.props.action.onChangeAttrVa(changeData);
        flag = true;
        break;
      }
    }
    //如果不是本次新增或编辑，则将该条数据加到change数组里，并添加DELETE标签
    if(!flag){
      record.editState = 'DELETE'; 
      changeData.push(record);         
    }

    this.props.action.onChangeAttrVa(changeData);
    let k = attrValue.indexOf(record);
    attrValue.splice(k,1);  
    this.props.action.onEditAttrVa(attrValue);   
  }

  onSelectChange(selectedRowKeys){
    let state = {
        selectedRowKeys:selectedRowKeys
    }
  }

  render(){ 
    //let formData = this.props.$$state.get('formData').toJS();
    let dataSource =this.props.$$state.get('salesunitTable').toJS();
    let columns=this.columns;
    let {selectedRowKeys} = this.state;
    
    let rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange.bind(this),
    };

    return (
      <Table 
        dataSource = { dataSource } 
        columns = { columns } 
        pagination = { false } 
        showHeader = { true } 
        rowKey = "id"
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


