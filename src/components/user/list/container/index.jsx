/**
 * Created by yangtmm on 2017-08-30
 */

import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Table, Modal, Button,Form } from 'antd';

import {Input,Radio} from 'antd';
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
        dataIndex: 'org_id',
      },
      {
        title: '所属部门',
        dataIndex: 'dept_id',
      },
      {
        title: '职位',
        dataIndex: 'job',
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
    this.props.action.onDelete(this.state.selectedRowKeys);
  }
  onEdit = () => {
    debugger
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
    debugger
    let state = {
      selectedRowKeys:selectedRowKeys
    }
    state.headLabel = selectedRowKeys.length ? true:false;
    this.setState(state);
  }
  onBack = ()=>{
    this.setState({headLabel:false});
  }
  render() {

    let page = this.props.$$state.get("data").toJS();
    let visible = this.props.$$state.get("visible");

    let {headLabel,selectedRowKeys} = this.state;
    let rowSelection = {
      onChange: this.onSelectChange,
    };
    let editData = this.props.$$state.get("editData").toJS();
    const WrapCard = Form.create()(Card);
    return (
      <div>
        
        
        {
          headLabel ? <HeadLabel selectedRowKeys={selectedRowKeys} onBack={this.onBack}>
            <Button className="default_button" onClick={this.onDelete}>删除</Button>
            <Button className="default_button" onClick={this.onEdit}>编辑</Button>
            <Button className="default_button" onClick={this.onEnable.bind(this, false)}>停用</Button>
            <Button className="default_button" >分配角色</Button>
          </HeadLabel> : <div className='head_panel'>
              <span className='head_panel_span'>所属部门：</span>
              <Search
                placeholder="请选择..."
                style={{ width: 200 }}
                onSearch={value => console.log(value)}
              />
              <span className='head_panel_span'>状态：</span>
              <RadioGroup>
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