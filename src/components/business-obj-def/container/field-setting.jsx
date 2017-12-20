/*
 * @Author: yangtmm 
 * @Date: 2017-11-06 14:00:33 
 * @Last Modified by: yangtmm
 * @Last Modified time: 2017-12-06 13:44:53
 */

import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { Table, Modal, Button, Input, Select, Radio, Popconfirm, Form, Row, Col, Checkbox } from 'antd';
//action方法
import * as Actions from "../action/field-setting.js"
import AddForm from './field-setting-add-form';
import EditForm from './field-setting-edit-form';
import Card from './field-setting-card';


class FieldSet extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    //action.getFieldSettingList();
  }

  render() {

    let { $$state, action } = this.props;

    let nodeMainModuleCard = $$state.get("data").get("mainModule").get("fields").toJS().map((item, index) => {
      return <Card
        data={item.data}
        operations={item.operations}
        edit={action.editFieldSettingShow.bind(this, item.data, index, "mainModule")}
        delete={action.delFieldSetting.bind(this, item.data, index, "mainModule")}
      />
    });
    
    let nodeItemModuleCard = $$state.get("data").get("itemModule").get("fields").toJS().map((item, index) => {
      return <Card
        data={item.data}
        operations={item.operations}
        edit={action.editFieldSettingShow.bind(this, item.data, index, "itemModule")}
        delete={action.delFieldSetting.bind(this, item.data, index, "itemModule")}
      />
    });

    return (
      <div className="field-setting-warpper">
        <Row className="field-setting-title">
          <Col span={22} className="title">主体字段</Col>
          <Col span={2} className="text-align-right" ><Button type="primary" icon="plus" onClick={action.addFieldSettingShow}>新建</Button></Col>
        </Row>
        <div className="card-con">
          {nodeMainModuleCard}
        </div>
        <Row className="field-setting-title">
          <Col span={22} className="title">产品明细字段</Col>
          <Col span={2} className="text-align-right" ><Button type="primary" icon="plus" onClick={action.addFieldSettingShow}>新建</Button></Col>
        </Row>
        <div className="card-con">
          {nodeItemModuleCard}
        </div>
        <AddForm
          title={"创建字段"}
          visible={$$state.get('addModelVisible')}
          formControls={$$state.get("formControls").toJS()}
          addData={$$state.get("addData").toJS()}
          onChange = {action.changeAddData}
          onCancel={action.addFieldSettingHide}
          onAdd={action.onAdd.bind(null, $$state.get("addData").toJS())}
          checkFormControls = {action.checkFormControls}
        />
        <EditForm
          title={"编辑字段"}
          visible={$$state.get('editModelVisible')}
          editData={$$state.get("editData").toJS()}
          onChange = {action.changeEditData}
          onCancel={action.eidtFieldSettingHide}
          onSave={action.onSave.bind(null, $$state.get("editData").toJS())}
        />
      </div>
    )
  }
}

//绑定状态到组件props
function mapStateToProps(state, ownProps) {
  return {
    $$state: state.businessObjDef.fieldSetting
  }
}

//绑定action到组件props
function mapDispatchToProps(dispatch) {
  return {
    action: bindActionCreators(Actions, dispatch)
  }
}

//输出绑定state和action后组件
export default connect(mapStateToProps, mapDispatchToProps)(FieldSet);
