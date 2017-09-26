import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Select,Input,Form,Table, Modal, Button,Icon,Row,Col} from 'antd';
import ToolForm from './ButtonTool.jsx'
let Search = Input.Search;
const FormItem = Form.Item;
const ButtonGroup = Button.Group;

//导入action方法
import * as Actions from "../action"
class List extends React.Component {
  constructor(props) {
    super(props)
    this.columns = [
      {
        title: '客户名称',
        dataIndex:'name',
      }, {
        title: '渠道类型',
        dataIndex:'cannelType',
      }, {
        title: '客户等级',
        dataIndex:'level',
      }, {
        title: '营销区域',
        dataIndex:'saleArea',
      }, {
        title: '行业',
        dataIndex:'industry',
      }, {
        title: '地址',
        dataIndex:'regAddr',
      }]
  }

  componentDidMount() {
    this.props.action.getListData();
  }
  formHandleOk(){
    this.props.action.closeAddForm();
  }
  formHandleCancel(){

  }

  render() {
    const {$$state} = this.props;
    const page = $$state.get("data").toJS();
    const selectedRows = $$state.get('selectedRows').toJS();
    const toolVisible = $$state.get('toolVisible').toJS();
    const formVisitable = $$state.get("formVisitable");
    return (
      <div>
        <ToolForm visible={toolVisible} btnLess={this.changeVisible} btnMore={this.changeVisible}/>
        <div className="list-box">
          <Table
            columns={this.columns}
            dataSource={page.data}
            rowSelection={{}}
          />
        </div>
        <Modal
            title="增加客户"
            visible={formVisitable}
            onOk={this.formHandleOk.bind(this)}
            onCancel={this.formHandleCancel.bind(this)}
        >
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
      action : bindActionCreators(Actions, dispatch)
  }
}
//输出绑定state和action后组件
export default  connect( mapStateToProps, mapDispatchToProps)(List);