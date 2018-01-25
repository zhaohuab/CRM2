/*
 * @Author: yangtmm 
 * @Date: 2017-11-06 14:01:09 
 * @Last Modified by: yangtmm
 * @Last Modified time: 2017-12-14 14:53:54
 */

import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Table, Modal, Button, Input, Select, Radio, Popconfirm, Form, Row, Col, Checkbox } from 'antd';

import Operation from 'components/common/operation'
const Search = Input.Search;
const FormItem = Form.Item;
const CheckboxGroup = Checkbox.Group;
import './index.less';

//action方法
import * as Actions from "../action/business-obj.js"

import CreateForm from './business-obj-form';
import Card from './business-obj-card';

class BusinessObj extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    //初始请求数据
    let { action } = this.props;
    //获取业务对象列表
    action.getBusinessObjList();
    //获取角色
    action.getRolesList();
  }

  addData = () => {
    let { $$state, action } = this.props;
    let data = $$state.get("editData").toJS();
    let editId = $$state.get("editId");
    let editIndex = $$state.get("editIndex");
    let isEdit = $$state.get("isEdit");
    if (isEdit) {
      action.saveEditBusinessObj(data, editId, editIndex);
      return;
    }
    action.saveAddBusinessObj(data);
  }

  render() {
    //引入状态与方法
    let { $$state, action } = this.props;
    let editData = $$state.get("editData").toJS();
    //批量渲染card
    let data = $$state.get("data").toJS()

    //非空验证
    let nameFlag = $$state.get("nameFlag");
    let roleFlag = $$state.get("roleFlag");
    let nodeCard = data.map((item, index) => {
      return <Card
        data={item.data}
        operations={item.operations}
        edit={action.showModalEdit.bind(this, item, index)}
        delete={action.delBusinessObj.bind(this, item, index)}
        enable={action.enable.bind(this, item, index)}
      />
    });

    return (
      <div className='business-obj-warpper'>
        <div className='head-panel'>
          <Row gutter={16}>
            <Col className="gutter-row" span={22}>
            </Col>
            <Col className="gutter-row" span={2} className="text-align-right">
              <Operation disabled={0}>
                <Button type="primary" icon="plus" onClick={action.showModalAdd}>新建</Button>
              </Operation>
            </Col>
          </Row>
        </div>
        <div className="card-con">{nodeCard}</div>
        <Modal
          visible={$$state.get('addModelVisible')}
          title={$$state.get("isEdit") ? "编辑" : "新建"}
          onCancel={action.handleCancel}
          onOk={this.addData}
          width={500}
        >
          <CreateForm
            data={editData}
            onChange={action.editBusinessObj}
            nameFlag={nameFlag}
            roleFlag={roleFlag}
          />
        </Modal>
      </div>
    )
  }
}

//绑定状态到组件props
function mapStateToProps(state, ownProps) {
  return {
    $$state: state.businessObjDef.businessObj
  }
}

//绑定action到组件props
function mapDispatchToProps(dispatch) {
  return {
    action: bindActionCreators(Actions, dispatch)
  }
}

//输出绑定state和action后组件
export default connect(mapStateToProps, mapDispatchToProps)(BusinessObj);