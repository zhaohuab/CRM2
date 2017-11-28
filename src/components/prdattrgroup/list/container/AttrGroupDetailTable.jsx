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

class AttrGrpDeTable extends React.Component {
  constructor(props) {
    super(props)
    this.columns = [      
    {
      title: '属性名',
      dataIndex: 'name',
    },
    {
      title: '属性值',
      dataIndex: 'values',
    },
    {
      title:'启用状态',
      dataIndex:'enableStateName',
    }
    ]
  }

  render(){ 
    //let formData = this.props.$$state.get('formData').toJS();
    debugger
    let dataSource =this.props.$$state.get("detailList").toJS();
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
    $$state: state.prdattrgroup
  }
}

function mapDispatchToProps(dispatch) {
  return {
      action: bindActionCreators(Actions, dispatch)
  }
}

export default  connect( mapStateToProps, mapDispatchToProps)(AttrGrpDeTable);


