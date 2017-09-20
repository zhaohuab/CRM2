/**
 * Created by yangtmm on 2017-08-30
 */

import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Table, Modal, Button } from 'antd';

import {Input,Radio,Popconfirm,Form} from 'antd';
import Card from './UserForm.jsx';
import HeadLabel from './HeadLabel.jsx';
import './index.less'
let Search = Input.Search;
let RadioGroup = Radio.Group;
//导入action方法
import * as Actions from "../action"

class List extends React.Component {
  constructor(props) {
    super(props)
    
    this.columns = [
      {
        title: '姓名',
        dataIndex:'name',
      },
      {
        title: '性别',
        dataIndex: 'gender',
      },
      {
        title: '所属公司',
        dataIndex: 'orgName',
      },
      {
        title: '所属部门',
        dataIndex: 'deptName',
      },
      {
        title: '职位',
        dataIndex: 'jobName',
      },
      {
        title: '手机',
        dataIndex: 'phone',
      },
      {
        title: '邮箱',
        dataIndex: 'email',
      },
      {
        title: '角色',
        dataIndex: 'role_id',
      },
      {
        title: '状态',
        dataIndex: 'enable_state',
      }
    ]

    this.state = {
      headLabel : false,
      selectedRowKeys : [],
      isEdit : false,
      enable : 1,
    }
  }

  componentDidMount() {
    this.props.action.getListData();
  }

  onAdd() {
    this.setState({isEdit:false});
    this.props.action.showForm(true,{});
  }
  onDelete=()=>{
    debugger
    this.setState({headLabel:false});
    this.props.action.onDelete(this.state.selectedRowKeys);
  }
  onEdit = () => {
    
    this.setState({isEdit:true});
    let rowKey = this.state.selectedRowKeys[0];
    let rowData = {};
    let page = this.props.$$state.get("data").toJS();
    for(let i=0,len=page.data.length;i<len;i++) {
      if(rowKey == page.data[i].id) {
        rowData = page.data[i];
        break;
      }
    }
    this.props.action.showForm(true,rowData);
  }
  onClose() {
    this.props.action.showForm(false,{});
  }
  onEnable(enable) {
    return (enable) => {
      this.props.action.onEnable(this.state.selectedRowKeys,enable,{enable:this.state.enable});
    }
  }
  onSave4Add() {
    let form = this.formRef.props.form;
    if(this.state.isEdit) {
      this.props.action.onSave4Edit(form.getFieldsValue());
    }
    else {
      this.props.action.onSave4Add(form.getFieldsValue());
    }
    
  }
  onSelectChange = (selectedRowKeys) => {  
    let state = {
      selectedRowKeys:selectedRowKeys
    }
    state.headLabel = selectedRowKeys.length ? true:false;
    this.setState(state);
  }
  onBack = ()=>{
    this.setState({headLabel:false});
  }
  onEableRadioChange = (e) => {
    let enable = e.target.value;
    this.setState({enable,selectedRowKeys:[]});
    this.props.action.getListData({enable});
  }
  render() {

    let page = this.props.$$state.get("data").toJS();
    let visible = this.props.$$state.get("visible");

    let {headLabel,selectedRowKeys} = this.state;
    let rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
    };
    let editData = this.props.$$state.get("editData").toJS();
    const WrapCard = Form.create()(Card);
    return (
      <div>
        {
          headLabel ? <HeadLabel selectedRowKeys={selectedRowKeys} onBack={this.onBack}>
            <Button className="default_button" onClick={this.onEdit}>编辑</Button>
            <Popconfirm placement="bottom" title="确认删除吗" onConfirm={this.onDelete} okText="是" cancelText="否">
              <Button className="default_button">删除</Button>
            </Popconfirm>
            <Button className="default_button" onClick={this.onEnable(2)}>停用</Button>
            <Button className="default_button" >分配角色</Button>
          </HeadLabel> : <div className='head_panel'>
              <span className='head_panel_span'>所属部门：</span>
              <Search
                placeholder="请选择..."
                style={{ width: 200 }}
                onSearch={value => console.log(value)}
              />
              <span className='head_panel_span'>状态：</span>
              <RadioGroup onChange={this.onEableRadioChange} defaultValue={1}>
                <Radio value={1}>启用</Radio>
                <Radio value={2}>停用</Radio>
              </RadioGroup>
              <Button type="primary" className="button_add" onClick={this.onAdd.bind(this)}>新增人员</Button>
            </div>
        }

        <div className="list-box">
          <Table
            columns={this.columns}
            dataSource={page.data}
            rowSelection={rowSelection}
            rowKey="id"
          />
        </div>
        <Modal
          title="新增人员"
          visible={visible}
          onOk={this.onSave4Add.bind(this)}
          onClose={this.onClose.bind(this)}
        >
          <WrapCard dataSource={editData} wrappedComponentRef={(inst) => this.formRef = inst}/>
        </Modal>
      </div>
    )
  }
}

//绑定状态到组件props
function mapStateToProps(state, ownProps) {
  return {
    $$state: state.userlist
  }
}

//绑定action到组件props
function mapDispatchToProps(dispatch) {
  return {
      action : bindActionCreators(Actions, dispatch)
  }
}

//输出绑定state和action后组件
export default  connect( mapStateToProps, mapDispatchToProps)(List);