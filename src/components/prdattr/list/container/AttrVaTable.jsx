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

class AttrValueTable extends React.Component {
  constructor(props) {
    super(props)
    this.columns = [
    {
      title: '属性值',
      dataIndex: 'value',
      render: (text,record,index) =>(
        <Input placeholder="属性值" 
        defaultValue={record.value}
        onBlur={this.onBlur.bind(this,record)}/>
      )
    },
    {
      title:'对应ERP',    
      dataIndex:'erpCode',
      render:(text,record,index) => (
        <Input placeholder="对应ERP" 
        defaultValue={record.erpCode}
        onBlur={this.onBlur.bind(this,record)}/>)
    },
    {
      title:'启用状态',    
      dataIndex:'enableState',
      render:(i,record,index)=> (  
        <Switch defaultChecked={record.enableState == 1?  true:false}  
          onChange = {this.changeFCheck.bind(this,record)}/>)
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
    let changedData = this.props.$$state.get('changeData').toJS();
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
    this.props.action.onChangeAttrVa(changedData); 
  }

  onBlur(record,e){//输入框变化回调
    let flag = true; 
    let {title,value}  = e.target;
    if (record[title]!=value){
      record.value=value;    
      if (record.editState != 'add') { 
        record.editState='update';
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
      record.editState = 'detele'; 
      changeData.push(record);         
    }

    this.props.action.onChangeAttrVa(changeData);
    let k = attrValue.indexOf(record);
    attrValue.splice(k,1);  
    this.props.action.onEditAttrVa(attrValue);   
  }

  render(){ 
   // debugger
    //let formData = this.props.$$state.get('formData').toJS();
    let dataSource =this.props.$$state.get('attrValue').toJS();
    let columns=this.columns;
    return (
      <Table 
        dataSource = { dataSource } 
        columns = { columns } 
        pagination = { false } 
        rowKey = "id"
      />)
  }
}

function mapStateToProps(state, ownProps) {
  return {
    $$state: state.prdattr
  }
}

function mapDispatchToProps(dispatch) {
  return {
      action: bindActionCreators(Actions, dispatch)
  }
}

export default  connect( mapStateToProps, mapDispatchToProps)(AttrValueTable);


