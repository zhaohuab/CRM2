import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import TaskGroupForm from './NewCard';
import RegistrationForm from './Card';
import TaskList from './TaskList';
import { Table, Menu, Icon, Modal, Form, Row, Col, Button, Layout, Input } from 'antd';
const Search = Input.Search;
const { SubMenu } = Menu;
const { Column } = Table;
//const WrappedListForm = Form.create()(TaskList);
//const WrappedCardForm = Form.create()(RegistrationForm);
const WrappedTaskGroupForm = Form.create()(TaskGroupForm);
const { Header, Content, Sider } = Layout;
import './index.less'
import * as Actions from "../action"

class List extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      taskGroupVisible: false,
      pagination: {
        pageSize: 10,
        page: 1
      }
    }
  }
  componentDidMount() {
    this.props.action.getTaskgroups(
      this.props.$$state.get("pagination").toJS()
    );
  }
  //点击新建按钮清空字段
  onAddTask = () => {
    debugger
    this.props.action.addTask(true)
  }

  //新建分组设置属性
  onAddTaskGroup = () => {
    this.setState({
      taskGroupVisible: true,
    }, () => {
      this.formRefTaskGroup.props.form.setFieldsValue({ name: '' });
    });
  }

  //新建任务点击保存
  onSaveTask = () => {
    debugger;
    this.formRef.props.form.validateFieldsAndScroll((err, values) => {//取值
      debugger;
      if (!err) {
        this.props.action.onAdd(values, false);
      }
    });
  }

  //新建分组点击保存
  onSaveTaskGroup = () => {
    debugger
    let card = this.formRefTaskGroup.props.form;
    let value = card.getFieldsValue();
    this.setState({
      taskGroupVisible: false,
    }, () => {
      this.props.action.onAddTaskGroup(value);
    });
  }
  //点击分组或者搜索框搜索
  onSearchGroup = (id, name) => {
    debugger
    this.props.action.onSearchGroup(id, name, this.props.$$state.get("pagination").toJS());
  }
  handleCancel = (e) => {
    this.setState({
      taskGroupVisible: false
    });
  }
  //任务点击取消
  taskCancel = (e) => {
    this.props.action.showForm(false);
  }
  render() {
    debugger
    const { $$state } = this.props;
    const taskgroupdata = $$state.get("taskgroupdata").toJS();
    let {
     taskVisible,
      groupVisible
  } = this.props.$$state.toJS(); //分组，任务显隐
    return (
      <div className="quartz-warpper">
        <Modal
          title="新建任务"
          visible={taskVisible}
          onOk={this.onSaveTask.bind(this)}
          onCancel={this.taskCancel}
        >
          <RegistrationForm wrappedComponentRef={(inst) => this.formRef = inst} />
        </Modal>
        <Modal
          title="分组名称"
          visible={this.state.taskGroupVisible}
          onOk={this.onSaveTaskGroup.bind(this, WrappedTaskGroupForm)}
          onCancel={this.handleCancel}
        >
          <WrappedTaskGroupForm wrappedComponentRef={(inst) => this.formRefTaskGroup = inst} />
        </Modal>

        <div className="header">
          <Row type="flex" align="middle" justify="space-between" gutter={15}>
            <Col span={10}>
              <Row type="flex">
                <Col span={8}></Col>
              </Row>
            </Col>
            <Col span={14}>
              <Row type="flex" align="middle" justify="space-between" gutter={15}>
                <Col span={6} ><Button type="primary" onClick={this.onAddTaskGroup}>新建分组</Button></Col>
                <Col span={6} ><Button type="primary" onClick={this.onAddTask}>新建任务</Button></Col>
                <Col span={6}>
                  <Search
                    placeholder="搜任务"
                    style={{ width: 200 }}
                    onSearch={value => this.onSearchGroup('', value)} />
                </Col>
              </Row>
            </Col>
          </Row>
        </div>
        <Content>
          <Layout>
            <Layout style={{ background: '#fff', padding: '14px 0' }}>
              <Sider width={200} style={{ background: '#fff' }}>
                <Menu
                  mode="inline"
                  defaultSelectedKeys={['1']}
                  defaultOpenKeys={['sub1']}
                  style={{ height: '100%', borderRight: 0 }}
                  onClick={(param) => {
                    this.onSearchGroup(param.key, '')
                  }}
                >
                  <SubMenu key="sub1" title={<span><Icon type="laptop" />任务分组</span>}>
                    {
                      taskgroupdata.map(function (item) {
                        return (
                          <Menu.Item key={item.id}>{item.name}
                            {/* <span className="ant-divider" />
                          <Icon type="delete" /> */}
                          </Menu.Item>
                        )
                      })
                    }
                  </SubMenu>
                </Menu>
              </Sider>
              <Content>
                <div className="list-box">
                  <TaskList />
                </div>
              </Content>
            </Layout>
          </Layout>
        </Content>
      </div>
    )
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
export default connect(mapStateToProps, mapDispatchToProps)(List);