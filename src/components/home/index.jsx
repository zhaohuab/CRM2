import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Select, Input, Form, Table, Modal, Button, Icon, Row, Col } from 'antd';
import ToolForm from './ButtonTool.jsx'
import EditForm from './card';
let Search = Input.Search;
const FormItem = Form.Item;
const ButtonGroup = Button.Group;

//导入action方法
import * as Actions from "../action"


import * as enumData from './enumdata'
import cityData from './citydata'

class List extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      pagination: {
        pageSize: 20,
        page: 1,
      },
      isEdit: true
    }
    this.columns = [
      {
        title: '客户名称',
        dataIndex: 'name',
      },{
        title: '客户等级',
        dataIndex: 'levelName',
      }, {
        title: '营销区域',
        dataIndex: 'saleAreaName',
      }, {
        title: '行业',
        dataIndex: 'industryName',
      }, {
        title: '地址',
        dataIndex: 'address',
      }]
    const that = this
    this.rowSelectionFn = {
      /**
        * 行选中事件
        */
      onChange(selected, selectedRows) {
        const nowVisible = that.props.$$state.get("toolVisible").toJS();
        if (selectedRows.length > 0) {
          nowVisible.simForm = false
          nowVisible.btnPanel = true
        } else {
          nowVisible.btnPanel = false
          if (nowVisible.milForm == true) {
            nowVisible.simForm = false
          } else {
            nowVisible.simForm = true
          }
        }
        that.props.action.selectRow(selectedRows, nowVisible)
      }
    }
  }

  componentDidMount() {
    this.props.action.getListData(this.state.pagination);
  }
  /**
   * 点击展开或收缩事件
   */
  changeVisible(visible) {
    const nowVisible = this.props.$$state.get("toolVisible").toJS();
    if (visible.simForm != undefined) {
      nowVisible.simForm = visible.simForm
      if (nowVisible.btnPanel == true) {
        nowVisible.simForm = false
      }
    }
    if (visible.milForm != undefined) {
      nowVisible.milForm = visible.milForm
    }

    this.props.action.changeVisible(nowVisible);
  }
  /**
   * 返回按钮
   */
  btnBack() {
    const nowVisible = this.props.$$state.get("toolVisible").toJS();
    nowVisible.btnPanel = false;
    if (nowVisible.milForm == true) {
      nowVisible.simForm = false
    } else {
      nowVisible.simForm = true
    }
    this.props.action.changeVisible(nowVisible);
  }

  /**
   * 保存按钮
   */
  formHandleOk() {
    const that = this;
    this.formRef.props.form.validateFields((err, values) => {
      if (!err) {

        if (that.state.isEdit) {
          that.props.action.listEditSave(values);
        } else {
          that.props.action.listAddSave(values);

        }
      }
    });
  }
  /**
   * 关闭按钮
   */
  formHandleCancel() {
    this.props.action.setFormVisible(false)
  }

  /**
   * 查询方法
   */
  handleSearch(searchMap) {
    this.props.action.getListData(this.state.pagination, searchMap);
  }

  /**
   * 启停用
   */
  btnSetEnable(enableState) {
    const selectRow = this.props.$$state.get("selectedRows").toJS();
    this.props.action.setEnableState(selectRow, enableState, this.state.pagination, searchMap)
  }

  /**
   * 新增
   */
  btnNew() {
    this.setState({ isEdit: false });
    this.props.action.setFormVisible(true)
  }

  render() {
    const { $$state } = this.props;
    const page = $$state.get("data").toJS();
    const editData = $$state.get("editData").toJS();
    const selectedRows = $$state.get('selectedRows').toJS();
    const toolVisible = $$state.get('toolVisible').toJS();
    const formVisitable = $$state.get("formVisitable");
    const FormCard = Form.create()(EditForm)
    return (
      <div>
        <ToolForm
          enumData={enumData}
          cityData={cityData}
          visible={toolVisible}
          btnBack={this.btnBack.bind(this)}
          btnLess={this.changeVisible.bind(this)}
          btnMore={this.changeVisible.bind(this)}
          btnSetEnable={this.btnSetEnable.bind(this)}
          handleSearch={this.handleSearch.bind(this)}
          btnNew={this.btnNew.bind(this)}
        />
        <div className="list-box">
          <Table
            columns={this.columns}
            dataSource={page.data}
            rowKey='id'
            rowSelection={this.rowSelectionFn}
          />
        </div>
        <Modal
          title="增加客户"
          visible={formVisitable}
          onOk={this.formHandleOk.bind(this)}
          onCancel={this.formHandleCancel.bind(this)}
        >
          <FormCard
            wrappedComponentRef={(inst) => this.formRef = inst}
            data={editData}
            enumData={enumData}
            cityData={cityData}
          />
        </Modal>
      </div>
    )
  }
}
//绑定状态到组件props
function mapStateToProps(state, ownProps) {
  return {
    $$state: state.customerList
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