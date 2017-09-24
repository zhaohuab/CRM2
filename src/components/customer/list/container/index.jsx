import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Form,Table, Modal, Button} from 'antd';
import {Input} from 'antd';
import AdvancedSearchForm from './card.jsx'
let Search = Input.Search;
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
  addFormHandleOk(){
    this.props.action.closeAddForm();
  }
  addFormHandleCancel(){

  }

  addFormBtn(){
    this.props.action.showAddForm()
  }


  render() {
    const CardForm = Form.create()(AdvancedSearchForm)

    const page = this.props.$$state.get("data").toJS();
    const {$$state} = this.props;
    const addFormVisitable = $$state.get("addFormVisitable");
    return (
      <div>
        <div className='head_panel'>
          <div className='list-add'>
              <Button type="primary" onClick={this.addFormBtn.bind(this)}>增加组织</Button>
          </div>
        </div>

        <div className="list-box">
          <Table
            columns={this.columns}
            dataSource={page.data}
            rowSelection={{}}
          />
        </div>
        <Modal
            title="增加客户"
            visible={addFormVisitable}
            onOk={this.addFormHandleOk.bind(this)}
            onCancel={this.addFormHandleCancel.bind(this)}
        >
        <CardForm />  
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