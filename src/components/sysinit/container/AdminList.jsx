import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Table, Button,Icon} from 'antd';
import './index.less'
import {Input} from 'antd';
//导入action方法
import * as Actions from "../action"

class EditableCell extends React.Component {
  state = {
    value:this.props.value,
    editable: false,
  }

  edit = () => {
    this.setState({ editable: true });
  }

  handleChange = (e) => {
    const value = e.target.value;
    this.setState({ value });
  }
  save = () => {
    this.setState({ editable: false });
    if(this.props.onChange) {
      this.props.onChange(this.state.value);
    }
  }

  render() {
    
    let { value } = this.state;
    value = value || '';
    return <div className="editable-cell">
    {
      this.state.editable ?
        <div className="editable-cell-input-wrapper">
          <Input
            value={value}
            onChange={this.handleChange}
            onPressEnter={this.save}
          />
          <Icon
            type="check"
            className="editable-cell-icon-check"
            onClick={this.save}
          />
        </div>
        :
        <div className="editable-cell-text-wrapper">
          {value || ' '}
          <Icon
            type="edit"
            className="editable-cell-icon"
            onClick={this.edit}
          />
        </div>
    }
  </div>
  }
}

class List extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
        //dataSource : [],
        isAdd:false,
    }
    this.enableColumns = [
      "code","name","phone","mail"
    ];
    this.columns = [
      {
        title: '编码',
        dataIndex:'code',
        width: "200px",
        render:(text, record, index) => this.renderColumn('code',text,record,index),
      },
      {
        title: '姓名',
        dataIndex:'name',
        width: "200px",
        render:(text, record, index) => this.renderColumn('name',text,record,index),
      },
      {
        title: '手机',
        dataIndex:'phone',
        width: "200px",
        render:(text, record, index) => this.renderColumn('phone',text,record,index),
      },
      {
        title: '邮箱',
        dataIndex:'mail',
        width: "200px",
        render:(text, record, index) => this.renderColumn('mail',text,record,index),
      },
      {
        title: '密码',
        dataIndex:'password',
        render:(text, record, index) => this.renderColumn('password',"123456",record,index),
      },
      // {
      //   title: '确认密码',
      //   dataIndex:'password2',
      //   render:(text, record, index) => this.renderColumn('password2',"123456",record,index),
      // },
      {
        title: '角色',
        dataIndex:'role',
        render:(text, record, index) => this.renderColumn('role',"集团管理员",record,index),
      },
      {
        title: '启用状态',
        dataIndex:'enableState',
        render:(text, record, index) => this.renderColumn("enableState","已启用",record,index),
      }
    ]
  }
  renderColumn = (key,text,record,index) => {
      
      if(this.enableColumns.indexOf(key) != -1) {
        if(record.status == "ADD") {
          return <Input onBlur={this.onInputChange(record.key,key).bind(this)}/>
        }
        if(this.state.isAdd) {
          return text;
        }
        return <EditableCell value={text} onChange={this.onCellChange(record.key,key).bind(this)}/>;
      }
      return text;
  }
  componentDidMount() {
    
  }
  nextIndex = 1;
  onAdminListAdd = () => {
    
    let adminList = this.props.$$state.get("adminList").toJS();
    // adminList.push({
    //     status:"ADD",
    // })
    this.setState({ isAdd:true })
    this.props.action.onAdminListAdd({status:"ADD",key:this.nextIndex++});
  }
  onAdminListSave = () => {
    let adminList = this.props.$$state.get("adminList").toJS();
    adminList.map((item) => {
      if(item.status == "ADD") {
        item.status = "NORMAL"
      }
    })
    this.setState({isAdd:false});
    this.props.action.onAdminListSave(adminList);
  }
  onInputChange = (key, dataIndex) => {
    return (e) => {
      debugger
      let value = e.target.value;
      let adminList = this.props.$$state.get("adminList").toJS();
      const target = adminList.find(item => item.key === key);
      if (target) {
        target[dataIndex] = value;
        this.props.action.adminChange(adminList);
      }
    };
  }
  onCellChange = (key, dataIndex) => {
    return (value) => {
      debugger
      let adminList = this.props.$$state.get("adminList").toJS();
      const target = adminList.find(item => item.key === key);
      if (target) {
        target[dataIndex] = value;
        this.props.action.adminChange(adminList);
      }
    };
  }
  render() {
    
    let adminList = this.props.$$state.get("adminList").toJS();
    return (
      <div>
        <div className="sider-layout">
            <span className="head-label">管理员列表</span>
            <div className="left-action">
                <Button  type="primary" className="button_add" onClick={this.onAdminListAdd.bind(this)}><Icon type="plus" />新增</Button>
                <Button  type="primary" className="button_save" onClick={this.onAdminListSave.bind(this)}>保存</Button>
            </div>
        </div>
        <div className="list-box">
          <Table
            size="middle"
            columns={this.columns}
            dataSource={adminList}
            pagination={false}
            //rowSelection={{}}
          />
        </div>
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