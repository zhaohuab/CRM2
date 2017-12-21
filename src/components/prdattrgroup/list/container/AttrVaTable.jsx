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

    this.state = {
      //selectedRowKeys: [],
    }

    this.columns = [
    {
      title: '属性值',
      dataIndex: 'value',
    }]
  }


  render(){ 
    let status = this.props.$$state.get("status");
    let dataSource = [];
    let attrId = 0;
    if(status == "add"){
       let data =this.props.$$state.get('attrValueData').toJS();
       attrId = data.id;
       dataSource = data.voList;
      // debugger
    }else if(status == "edit"){
      let  data =this.props.$$state.get('attrValueData').toJS();
      if(data !== undefined && data !== null && JSON.stringify(data) !== "{}"){
        dataSource = data;
      }     
      attrId = parseInt(this.props.$$state.get('attrId'));
    }
   // let selectedAttrs = this.props.$$state.get("selectedAttrs").toJS();
    let selectedRowKeys = this.props.$$state.get("selectedAttrVas").toJS();
    // for (let id of selectedAttrs){
    //   if(id == attrId){
    //     this.props.action.attrIsSelected(true);
    //     break;
    //   }
    // }
    //debugger
    let isSelected = this.props.$$state.get("isSelected");
    let rowSelection = {
      selectedRowKeys,
      onChange: (selectedRowKeys,selectedRows) =>{
        this.props.action.selecAttrVa(selectedRowKeys,attrId);
      },
      getCheckboxProps: record => ({
        disabled: !isSelected || record.isRefered == true,    
      }),
    };
    let columns=this.columns;
    return (
      <Table 
        dataSource = { dataSource } 
        columns = { columns } 
        pagination = { false } 
        rowSelection={rowSelection}

        rowKey = "id"
        scroll={{ y: 200 }}
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

export default  connect( mapStateToProps, mapDispatchToProps)(AttrValueTable);


