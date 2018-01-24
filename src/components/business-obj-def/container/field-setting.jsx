/*
 * @Author: yangtmm 
 * @Date: 2017-11-06 14:00:33 
 * @Last Modified by: yangtmm
 * @Last Modified time: 2017-12-22 18:47:07
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
    this.state={
      moreMainState:false,
      moreItemState:false,
      mainVisible:false,
      itemVisible:false,
    }
  }

  componentDidMount() {
    let { $$state, action } = this.props;
    action.getFieldSettingList();
    action.getFieldtTypeList();
  }

  moreMainStateChange = () => {//-----主体字段"更多"控制
    this.setState({
      moreMainState:!this.state.moreMainState,
    })
  }
  
  moreItemStateChange = () => {//-----明细字段"更多"控制
    this.setState({
      moreItemState:!this.state.moreItemState,
    })
  }
  render() {

    let { $$state, action } = this.props;
    let nameFlag =  $$state.get("nameFlag");
    let objId = $$state.get($$state.get("moduleType") + "Id");
    let nodeMainList = this.state.moreMainState?$$state.get("mainModuleData").toJS():$$state.get("mainModuleData").toJS().slice(0,15);
    let nodeMainModuleCard = nodeMainList.map((item, index) => {
      return <Card
        data={item.data}
        operations={item.operations}
        edit={action.editFieldSettingShow.bind(null, item.data, index, "mainModule")}
        delete={action.delFieldSetting.bind(null, item.data, index, "mainModule")}
      />
    });

    let nodeItemModuleCard = $$state.get("itemModuleData").toJS().map((item, index) => {
      return <Card
        data={item.data}
        operations={item.operations}
        edit={action.editFieldSettingShow.bind(null, item.data, index, "itemModule")}
        delete={action.delFieldSetting.bind(null, item.data, index, "itemModule")}
      />
    });

    return (
      <div className="field-setting-warpper">
        <Row className="field-setting-title">
          <Col span={22} className="title"><i className="iconfont icon-zhutiziduan" />主体字段</Col>
          <Col span={2} className="text-align-right" ><Button type="primary" icon="plus" onClick={action.addFieldSettingShow.bind(null, "mainModule")}>新建</Button></Col>
        </Row>
        <div className="card-con">
          {nodeMainModuleCard}
        </div>   
          <div className='more' onClick={this.moreMainStateChange.bind(this)}>{this.state.moreMainState?'收起':'更多'}<i className="iconfont icon-gengduo" /></div>
        <Row className="field-setting-title">
          <Col span={22} className="title"><i className="iconfont icon-chanpinmingxi" />产品明细</Col>
          <Col span={2} className="text-align-right" ><Button type="primary" icon="plus" onClick={action.addFieldSettingShow.bind(null, "itemModule")}>新建</Button></Col>
        </Row>
        <div className="card-con">
          {nodeItemModuleCard}
        </div>
        <Modal
          title={"新增"}
          width={800}
          visible={$$state.get('addModelVisible')}
          onCancel={action.addFieldSettingHide}
          onOk={action.saveAddField.bind(null, $$state.get("addData").toJS(), objId)}
          style={{ top: 10 }}
        >
          <AddForm
            formTypeList = {$$state.get("formTypeList").toJS()}
            data={$$state.get("addData").toJS()}
            menuData = {$$state.get("menuData").toJS()}
            onChange={action.changeAddData}
            checkFormControls={action.checkFormControls}
            refChoice={action.refChoice}
            nameFlag = {nameFlag}
          />
        </Modal>
        <Modal
          title={"编辑"}
          width={500}
          visible={$$state.get('editModelVisible')}
          onOk={action.saveEditField.bind(null, $$state.get("editData").toJS())}
          onCancel={action.eidtFieldSettingHide}
          style={{ top: 10 }}
        >
          <EditForm
            data={$$state.get("editData").toJS()}          
            onChange={action.changeEditData}
            nameFlag={nameFlag}
          />
        </Modal>
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
 