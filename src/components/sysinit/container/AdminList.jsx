import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Table, Button,Icon} from 'antd';
import './index.less'
import {Input} from 'antd';
//导入action方法
import * as Actions from "../action"
import Department from 'components/refs/departments'
class List extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      //dataSource : [],
    }
    this.enableColumns = [
      "code", "name", "phone", "email","orgId",
    ];
    this.columns = [
      {
        title: '编码',
        dataIndex: 'code',
        width: "200px",
        render: (text, record, index) => this.renderColumn('code', text, record, index),
      },
      {
        title: '姓名',
        dataIndex: 'name',
        width: "200px",
        render: (text, record, index) => this.renderColumn('name', text, record, index),
      },
      {
        title: '手机',
        dataIndex: 'phone',
        width: "200px",
        render: (text, record, index) => this.renderColumn('phone', text, record, index),
      },
      {
        title: '邮箱',
        dataIndex: 'email',
        width: "200px",
        render: (text, record, index) => this.renderColumn('email', text, record, index),
      },
      {
        title: '启用状态',
        dataIndex: 'enableStateName',
        render: (text, record, index) => this.renderColumn("enableStateName", "已启用", record, index),
      },
      {
        title: '负责公司',
        dataIndex: 'orgId',
        width: "200px",
        render: (text, record, index) => this.renderOrg('orgId', text, record, index),
      },
    ]
  }
  renderColumn = (key, text, record, index) => {

    //编辑态 且 列可编辑
    if (this.props.editable && this.enableColumns.indexOf(key) != -1) {
      
      return <Input defaultValue={record[key]} onBlur={this.onInputChange(record.id,key).bind(this)}/>
    }
    return text;
  }

  renderOrg = (key, text, record, index) => {

        //编辑态 且 列可编辑
        if (this.props.editable && this.enableColumns.indexOf(key) != -1) {
          // <Department />
          let value = {key:record[key],title:record["orgName"]}
          
          return <Department value={value} onBlur={this.onOrgChange(record.id,key).bind(this) }onChange={this.onOrgChange(record.id,key).bind(this)}/>
        }
        if(key == "orgId"){
          return record["orgName"]
        }
        return text;
      }
  onInputChange = (id, dataIndex) => {
    return (e) => {
      let value = e.target.value;
      let adminList = this.props.$$state.get("adminList").toJS();
      const target = adminList.find(item => item.id === id);
      if (target) {
        target[dataIndex] = value;
        if(target.editState == "" || target.editState == "NORMAL") {
          target.editState = "UPDATE";
        }
        this.props.action.onAdminListChange(adminList);
      }
    };
  }
  onOrgChange = (id, dataIndex) => {
    return (e) => {
      let orgId = e.key;
      let orgName = e.title;
      let adminList = this.props.$$state.get("adminList").toJS();
      const target = adminList.find(item => item.id === id);
      if (target) {
        target["orgId"] = orgId;
        target["orgName"] = orgName;
        if(target.editState == "" || target.editState == "NORMAL") {
          target.editState = "UPDATE";
        }
        this.props.action.onAdminListChange(adminList);
      }
    };
  }
  onSelectChange = selectedRowKeys => {
    let state = {
        selectedRowKeys: selectedRowKeys
    };
    this.setState(state);
  };
  nextIndex = 1;
  onAdminListAdd = () => {
    
    let adminList = this.props.$$state.get("adminList").toJS();
    adminList.push({editState:"ADD",id:"SYS_"+this.nextIndex++});
    this.props.action.onAdminListChange(adminList);
  }
  onAdminListSave = () => {
    let adminList = this.props.$$state.get("adminList").toJS();
    this.props.action.onAdminListSave(adminList);
  }
  onAdminListDel = () => {
    let adminList = this.props.$$state.get("adminList").toJS();
    let { selectedRowKeys } = this.state;
    
    //选中行，行标识修改
    adminList = adminList.map((item) => {
      if(selectedRowKeys.includes(item.id)) {
        item.editState = "DELETE"
      }
      return item;
    });
    this.props.action.onAdminListChange(adminList);
  }
  onAdminListEdit = () => {
    this.props.action.onEdit();
  }
  render() {
    
    let adminList = this.props.$$state.get("adminList").toJS();
    let { selectedRowKeys } = this.state;
    let rowSelection = {
        selectedRowKeys,
        onChange: this.onSelectChange
    };
    adminList = adminList.filter((item) => {
      return item.editState != "DELETE";
    })
    return (
      <div>
        <div >
          <span className="head-label">管理员列表</span>
          {
            this.props.editable ? 
            <div className="table-action">
              <Button type="primary" className="button_add" onClick={this.onAdminListAdd.bind(this)}><Icon type="plus" />增行</Button>
              <Button type="primary" style={{ marginLeft: 15 }} className="button_del" onClick={this.onAdminListDel.bind(this)}><Icon type="minus" />删行</Button>
            </div>:""
          }
          
        </div>
        <div className="list-box">
          <Table
            size="middle"
            columns={this.columns}
            dataSource={adminList}
            pagination={false}
            rowSelection={rowSelection}
            rowKey="id"
          />
        </div>
        {
          this.props.editable ? 
          <Button type="primary" style={{ marginLeft: 15 }} onClick={this.onAdminListSave.bind(this)}>保存</Button>
          :
          <Button type="primary" style={{ marginLeft: 15 }}  onClick={this.onAdminListEdit.bind(this)}>编辑</Button>
        }
        
      </div>
    )
  }
}

//绑定状态到组件props
function mapStateToProps(state, ownProps) {
  return {
    $$state: state.sysinit
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