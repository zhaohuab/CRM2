import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Select, Input, Form, Table, Modal, Button, Icon, Row, Col } from 'antd';
import ToolForm from './ButtonTool.jsx'
let Search = Input.Search;
const FormItem = Form.Item;
const ButtonGroup = Button.Group;
import Card from './card'
//导入action方法
import * as Actions from "../action"
import * as enumData from "./enumdata"
import cityData from "./citydata"
import ViewPanel from "./ViewPanel"

class List extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      pagination: {
        pageSize: 20,
        page: 1,
      }

    }
    this.columns = [
      {
        title: '客户名称',
        dataIndex: 'name',
        render: (text, record) => (
          <a onClick={this.btnView.bind(this, record)}> {record.name}</a>
        ),
      }, {
        title: '渠道类型',
        dataIndex: 'cannelType',
      }, {
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
        dataIndex: 'regAddr',
      }]
    const that = this
    this.rowSelectionFn = {
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

  componentDidMount() {

    this.props.action.getListData(this.state.pagination);
  }
  formHandleOk() {

    // this.props.action.setFormVisible(false);
    this.formRef.props.form.validateFields((err, values) => {
      if (!err) {

        if (this.state.isEdit) {
          this.props.action.listAddSave(values);
        } else {
          this.props.action.listAddSave(values);
        }
      }
    });
  }
  formHandleCancel() {
    this.props.action.showForm(false);
  }

  handleSearch(searchMap) {
    this.props.action.getListData(this.state.pagination, { searchMap });
  }

  btnSetEnable(enableState) {
    const selectRow = this.props.$$state.get("selectedRows").toJS();
    this.props.action.setEnableState(selectRow, enableState, this.state.pagination, searchMap)
  }
  btnNew() {
    this.setState({isEdit:true});
    this.props.action.showForm(true);
  }
  btnView(record) {
    this.props.action.showViewForm(true,record);
  }

  render() {
    const { $$state } = this.props;
    const page = $$state.get("data").toJS();
    const selectedRows = $$state.get('selectedRows').toJS();
    const searchMap = $$state.get('searchMap').toJS();
    const toolVisible = $$state.get('toolVisible').toJS();
    const formVisitable = $$state.get("formVisitable");
    const CardForm = Form.create()(Card);
    const editData = $$state.get("editData").toJS();
    const viewData = $$state.get("viewData").toJS();
    const viewFormVisible = $$state.get("viewFormVisible");
    debugger
    return (
      
      <div className style={{position:'relative'}}>
        <ToolForm
          visible={toolVisible}
          btnBack={this.btnBack.bind(this)}
          btnLess={this.changeVisible.bind(this)}
          btnMore={this.changeVisible.bind(this)}
          btnSetEnable={this.btnSetEnable.bind(this)}
          handleSearch={this.handleSearch.bind(this)}
          btnNew={this.btnNew.bind(this)}
          enumData={enumData}
          cityData={cityData}
          searchMap={searchMap}
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
          <CardForm
            wrappedComponentRef={(inst) => this.formRef = inst}
            data={editData}
            enumData={enumData}
            cityData={cityData}
          />
        </Modal>
        <div style={{display:"inline" , position:'absolute',zIndex:'500',background:'#EEEEEE',top:0,bottom:0,left:'20%',right:0}} >
          <ViewPanel data={viewData}/>
        </div>
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