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

class AttrTable extends React.Component {
  constructor(props) {
    super(props)

    this.columns = [
    {
      title: '属性',
      dataIndex: 'name',
    }]
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

  //选择
  onSelectChange = (selectedRowKeys) => {
    //let selectedAttrs = this.props.$$state.get("selectedAttrs").toJS();
    //let isSelected = this.props.$$state.get("isSelected");
    //  let selectedRowKeys = this.props.$$state.get("selectedAttrVas").toJS();
   // let attrId = this.props.$$state.get("attrId");
     
    this.props.action.selecAttr(selectedRowKeys);
  }

  onRowClick = (record) => {
    //保存上一个属性选择的属性值
    //debugger
    this.props.action.setRecord(record);
    let selectedRowKeys = this.props.$$state.get("selectedAttrVas").toJS();
    let attrId = this.props.$$state.get("attrId");
    let attrGrpId = this.props.$$state.get("attrGrpId");
    let status = this.props.$$state.get("status");
    //如果有选中的属性，保存上一次的值
    if(attrId !== undefined && attrId !== null &&  attrId !== ""){
      this.props.action.addSelectedData(selectedRowKeys,attrId);
      //this.props.action.addSelectedDataMap(selectedRowKeys,attrId);
      //清空选择状态
      this.props.action.selecAttrVa([],"");
    }       
    //获取当前点击的属性上一次选择的属性值  遍历savedData 选择状态
    //debugger
    let savedData =this.props.$$state.get('savedData').toJS();
    let flag = false;
    let id = record.id;
  //   let selectedAttrs = this.props.$$state.get("selectedAttrs").toJS();
  // //  let selectedRowKeys = this.props.$$state.get("selectedAttrVas").toJS();
  //   for (let clickId of selectedAttrs){
  //    // debugger
  //     if(id == clickId){
  //       this.props.action.attrIsSelected(true);
  //       break;
  //     }
  //   }
    //本地是否存储该数据  但是没有选择状态
    let localAttrs = this.props.$$state.get("localAttrs").toJS();
    if(localAttrs.length>0){
      for( let attr of localAttrs){
        if(attr.id==id ){
          this.props.action.getLocalAttrList(attr);
          for(let sele of savedData){
            if(sele.id == attr.id){
              this.props.action.setSelAttrVas(sele);
              break;
            }
          }
          flag = true;
          break;
        } 
      }
    }
    if(!flag){
      if(status == "add"){
        this.props.action.getAttrVaList(id);
      }else if(status == 'edit'){
        this.props.action.getAttrVaEditList(attrGrpId ,id);
      }
      
    }    
  }

  render(){ 
    let data =this.props.$$state.get('attrData').toJS();
    let selectedRowKeys = this.props.$$state.get("selectedAttrs").toJS();
    let columns=this.columns;
    let rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
    };
   // let attrId = this.props.$$state.get("attrId");
    let selectedAttrs = this.props.$$state.get("selectedAttrs").toJS();
    let record = this.props.$$state.get("record").toJS();
    let flag = true;
    //  let selectedRowKeys = this.props.$$state.get("selectedAttrVas").toJS();
      for (let clickId of selectedAttrs){
       // debugger
        if(record.id == clickId){
          this.props.action.attrIsSelected(true);
          flag = false;
          break;
        }
      }
      if(flag){
        this.props.action.attrIsSelected(false);
      }
    return (
      <Table 
        dataSource = { data } 
        columns = { columns } 
        pagination = { false } 
        rowSelection={rowSelection}
        rowKey = "id"
        scroll={{ y: 200 }}
        onRowClick = {this.onRowClick}
      />)
  }
}

function mapStateToProps(state, ownProps) {
  return {
    $$state: state.prdattrgroup
  }
}

function mapDispatchToProps(dispatch) {
  return {
      action: bindActionCreators(Actions, dispatch)
  }
}

export default  connect( mapStateToProps, mapDispatchToProps)(AttrTable);


