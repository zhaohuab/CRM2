/**
 * Created by yangtmm on 2017-08-30
 */

import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Table, Modal, Button } from 'antd';

import {Input,Radio} from 'antd';
import Card from './UserForm.jsx';
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

  }

  componentDidMount() {
    this.props.action.getListData();
  }

  onAdd() {
    this.props.action.showForm(true,{});
  }
  onEdit() {
    //this.props.action.showForm(true,);
  }
  onClose() {
    this.props.action.showForm(false,{});
  }
  onSave4Add() {
    let form = this.formRef.props.form;
    this.props.action.onSave4Add(form.getFieldsValue());
  }
  render() {

    const page = this.props.$$state.get("data").toJS();
    const visible = this.props.$$state.get("visible");

    return (
      <div>
        <div className='head_panel'>
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
        <div className="list-box">
          <Table
            columns={this.columns}
            dataSource={page.data}
            rowSelection={{}}
          />
        </div>
        <Modal
          title="新增人员"
          visible={visible}
          onOk={this.onSave4Add.bind(this)}
          onClose={this.onClose.bind(this)}
        >
          <Card wrappedComponentRef={(inst) => this.formRef = inst}/>
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