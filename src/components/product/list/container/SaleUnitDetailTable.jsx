import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Table, Input} from 'antd';
import './index.less'

import 'assets/stylesheet/all/iconfont.css'
import * as Actions from "../action"
import { debug } from 'util';

class SaleUnitDeTable extends React.Component {
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
      
    },
    {
      title:'换算率',
      dataIndex:'convertRate',
  
    },
    {
      title:'固定换算',
      dataIndex:'fixedConvertName',
    }]
  }  

  render(){ 
    let dataSource =this.props.$$state.get('salesunitTable').toJS();
    let columns=this.columns;
    let selectedRowKeys =this.props.$$state.get('suSelectedRowKeys').toJS();
    let rowSelection = {
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
        rowKey = "id"
        style = {{margin:10}}
      //  rowSelection={rowSelection}
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

export default  connect( mapStateToProps, mapDispatchToProps)(SaleUnitDeTable);


