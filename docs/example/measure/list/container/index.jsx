import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Table, Modal, Button} from 'antd';
import './index.less'
import {Input} from 'antd';
let Search = Input.Search;
//导入action方法
import * as Actions from "../action"
class List extends React.Component {
  constructor(props) {
    super(props)
    this.columns = [
      {
        title: '姓名',
        dataIndex:'name',
      }
    ]
  }
  componentDidMount() {
    this.props.action.getListData();
  }
  render() {
    const page = this.props.$$state.get("data").toJS();
    return (
      <div>
        <div className='head_panel'>
        </div>
        <div className="list-box">
          <Table
            columns={this.columns}
            dataSource={page.data}
            rowSelection={{}}
          />
        </div>
      </div>
    )
  }
}
//绑定状态到组件props
function mapStateToProps(state, ownProps) {
  return {
    $$state: state.measureList
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