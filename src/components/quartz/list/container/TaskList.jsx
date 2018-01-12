


import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {
  Table, Menu, Icon, Modal, Form, Row, Col, Button, Layout, Input,
  Switch, Tooltip, Popconfirm
} from 'antd';
import ViewForm from './ViewForm';
import RegistrationForm from './Card';
//const WrappedCardForm = Form.create()(RegistrationForm);
//const WrappedViewForm = Form.create()(ViewForm);
const Search = Input.Search;
const { SubMenu } = Menu;
const { Column } = Table;
const { Header, Content, Sider } = Layout;
import './index.less'
import * as Actions from "../action"

class TaskList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      
    }
    this.columns = [
      {
        title: "任务编码",
        dataIndex: "code"
      },
      {
        title: "任务名称",
        dataIndex: "name",
        key: "name"
      },
      {
        title: "任务分组",
        dataIndex: "groupName",
        key: "groupName"
      },
      {
        title: "描述",
        dataIndex: "description",
        key: "description"
      },
      {
        title: "创建人",
        dataIndex: "created_user_id",
        key: "created_user_id"
      },
      {
        title: "创建时间",
        dataIndex: "created_time",
        key: "created_time"
      },
      {
        title: "修改人",
        dataIndex: "modified_user_id",
        key: "modified_user_id"
      },
      {
        title: "修改时间",
        dataIndex: "modified_time",
        key: "modified_time"
      },
      {
        title: "立即执行",
        render: (text, record) => (<Button type="danger" size={'small'} onClick={this.onExecute.bind(this, record)}>执行</Button>)
      },
      {
        title: "停/启用",
        dataIndex: "enableStatus",
        key: "enableStatus",
        render: (text, record) => {
          if (record.enableStatus == 1) {
            return (<Switch defaultChecked={true} checkedChildren="启用" unCheckedChildren="停用" onChange={(checked) => {
              this.onOpen(record)
            }} />)
          }
          else if (record.enableStatus == 0) {
            return (<Switch defaultChecked={false} checkedChildren="启用" unCheckedChildren="停用" onChange={(checked) => {
              this.onOpen(record)
            }
            } />)
          }
        }
      },
      {
        title: "操作",
        key: "action",
        render: (text, record) => (
          <span>
            <a href="#" onClick={this.onView.bind(this, record)}><Tooltip placement="topLeft" title="查看"><Icon type="search" />
            </Tooltip></a>
            <span className="ant-divider" />
            <Popconfirm title="是否删除?" onConfirm={this.confirm.bind(this, record)} onCancel={this.cancel} okText="是" cancelText="否">
              <a href="#"><Icon type="delete" /></a>
            </Popconfirm>
            <span className="ant-divider" />
            <a href="#" onClick={this.onEdit.bind(this, record)}><Tooltip placement="topLeft" title="编辑"><Icon type="edit" /></Tooltip></a>
          </span>
        )
      },
    ]
  }

  componentDidMount() {
    this.props.action.getListData(
      this.props.$$state.get("pagination").toJS()
    );
  }

  onDelete = (record) => {
    this.props.action.onDelete(record);
  }

  onSave = () => {
    debugger
    this.formRef.props.form.validateFieldsAndScroll((err, values) => {//取值
      debugger;
      if (!err) {
        this.props.action.onEdit(values,false);
        // this.setState({
        //   visible: false,
        // }, () => {
        //   this.props.action.onEdit(values);
        // });
      }
    });
  }

  //点击编辑获取数据
  onEdit = (record) => {
    debugger
    this.props.action.onView(record, record.id,true)
    // this.setState({
    //   visible: true,
    // }, () => {
    //   this.props.action.onView(record, record.id)
    // });
  }

  onView = (record) => {
    debugger
   
    this.props.action.onView(record, record.id,true)
    // this.setState({
    //   viewVisible: true,
    // }, () => {
    //   this.props.action.onView(record, record.id)

    // });
  }

  //停启用
  onOpen = (record) => {
    //debugger
    this.props.action.onOpen(record);
  }
  //立即执行
  onExecute = (record) => {
    debugger
    this.props.action.onExecute(record);
  }
  onViewTask = (record) => {
    debugger
    this.setState({
      taskVisible: true,
    });
  }
  confirm = (record) => {
    this.onDelete(record);
  }

  handleOk = (e) => {
    console.log(e);
    this.setState({
      visible: false,
      viewVisible: false
    });
  }
  handleCancel = (e) => {
    this.props.action.showTask(false);
    // this.setState({
    //   visible: false,
    //   viewVisible: false
    // });
  }

  //分页方法
  showTotal=(total)=> {
    return `共 ${total} 条`;
}
onPageChange=(page, pageSize)=>{
    let pagination = { page: page, pageSize: pageSize };
    this.props.action.getListData(
        pagination
    );
}
onPageSizeChange=(current, pageSize)=>{
    let pagination = { page: current, pageSize: pageSize };
    this.props.action.getListData(
        pagination
    );
}

  render() {
    debugger
    const { $$state } = this.props;
    const page = $$state.get("data").toJS();
    let {
      viewVisible
   } = this.props.$$state.toJS(); //分组，任务显隐
    return (
      <div>
        <Table
          size="middle"
          columns={this.columns}
          dataSource={page.data}
          rowKey="id"
          // rowSelection={rowSelection}
          pagination={{
            size: "large",
            showSizeChanger: true,
            showQuickJumper: true,
            // total: page.total,
            // showTotal: this.showTotal,
            onChange: this.onPageChange,
            onShowSizeChange: this.onPageSizeChange
          }}
        />
        <Modal
          title="编辑任务"
          visible={viewVisible}
          onOk={this.onSave.bind(this)}
          onCancel={this.handleCancel}
        >
          <ViewForm wrappedComponentRef={(inst) => this.formRef = inst} />
        </Modal>
        <Modal
          title="查看任务"
          visible={viewVisible}
          onOk={this.handleCancel}
          onCancel={this.handleCancel}
        >
          <ViewForm wrappedComponentRef={(inst) => this.formRefView = inst} />
        </Modal>
      </div>
    );
  }
}

//绑定状态到组件props
function mapStateToProps(state, ownProps) {
  return {
    $$state: state.quartz
  }
}

//绑定action到组件props
function mapDispatchToProps(dispatch) {
  return {
    action: bindActionCreators(Actions, dispatch)
  }
}

//输出绑定state和action后组件
export default connect(mapStateToProps, mapDispatchToProps)(TaskList);





















