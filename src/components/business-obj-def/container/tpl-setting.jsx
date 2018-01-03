/*
 * @Author: yangtmm 
 * @Date: 2017-11-06 14:00:54 
 * @Last Modified by: yangtmm
 * @Last Modified time: 2017-12-22 16:53:10
 */

import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { Form, Input, Button, Dropdown, Icon, Row, Col, Modal } from 'antd';
const FormItem = Form.Item;
const ButtonGroup = Button.Group;

import Card from './tpl-setting-card';
import AddForm from './tpl-setting-form';
import Distribute from './tpl-setting-dist';

//action方法
import * as Actions from "../action/tpl-setting"



class TplSet extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    let { $$state, action } = this.props;
    action.getTplConfigList();     //获取模板列表
  }

  savaData = () => {

    let { $$state, action } = this.props;
    //组装待添加数据
    let param = {
      name: $$state.get("name"),
      clientType: $$state.get("clientType"),
      type: $$state.get("type"),
      mainLayout: $$state.get("targetList").toJS(),
      itemLayout: [],
      relationLayout: $$state.get("selectRelativeObj").toJS(),
    }
    //debugger
    if ($$state.get("isEdit")) {
      param.id = $$state.get("editId");
      action.saveEditTpl(param)
    } else {
      action.saveAddTpl(param)
    }
  }

  savaDistribute = () => {
    let { $$state, action } = this.props;
    let assignments = $$state.get("distData").get("assignments").toJS();
    //debugger
    let assignments_bak = Object.keys(assignments).map((item, index)=>{
      if(assignments[item]){
        return {
          roleId: Number(item.split("-")[0]),
          biztypeId: Number(item.split("-")[1]),
          layoutId: assignments[item].id
        }
      }
      return {
        roleId: Number(item.split("-")[0]),
        biztypeId: Number(item.split("-")[1]),
        layoutId: "null"
      }
    })

    assignments_bak = assignments_bak.filter((item)=>{
      return item.layoutId != "null";
    });
    
    let param = {
      clientType: $$state.get("clientType"),
      layoutType: $$state.get("type"),
      assignments: assignments_bak
    }
  
    action.savaDistribute(param)
  }

  render() {
    let { $$state, action } = this.props;
    let objFlag = $$state.get('objFlag');
    let nameFlag = $$state.get('nameFlag');

    //pc编辑模板布局
    let nodePcEditListCard = $$state.get("pcEditData").toJS().map((item, index) => {
      return <Card
        data={item.data}
        operations={item.operations}
        edit={action.editTplData.bind(null, item.data, index, "pcEditData",false)}
        delete={action.delTplConfig.bind(null, item.data, index, "pcEditData")}
      />
    });

    //pc详情模板布局
    let nodePcDetailListCard = $$state.get("pcViewData").toJS().map((item, index) => {
      return <Card
        data={item.data}
        operations={item.operations}
        edit={action.editTplData.bind(null, item.data, index, "pcViewData",true)}
        delete={action.delTplConfig.bind(null, item.data, index, "pcViewData")}
      />
    });

    //Mobile编辑模板布局
    let nodeMobileEditListCard = $$state.get("mobileEditData").toJS().map((item, index) => {
      return <Card
        data={item.data}
        operations={item.operations}
        edit={action.editTplData.bind(null, item.data, index, "mobileEditData",false)}
        delete={action.delTplConfig.bind(null, item.data, index, "mobileEditData")}
      />
    });

    //Mobile详情模板布局
    let nodeMobileDetailListCard = $$state.get("mobileViewData").toJS().map((item, index) => {
      return <Card
        data={item.data}
        operations={item.operations}
        edit={action.editTplData.bind(null, item.data, index, "mobileViewData",true)}
        delete={action.delTplConfig.bind(null, item.data, index, "mobileViewData")}
        nameFlag={nameFlag}
      />
    });

    return (
      <div className="tpl-setting-warpper">
        <Row className="tpl-setting-title">
          <Col span={20} className="title">PC编辑模板</Col>
          <Col span={4} className="text-align-right" >
            <ButtonGroup>
              <Button type="primary" onClick={action.addTplData.bind(null, 1, 2, "pcEditData",false)} icon="plus">新建</Button>
              <Button type="primary" onClick={action.distribute.bind(null, "pcEditData")} >分配</Button>
            </ButtonGroup>
          </Col>
        </Row>
        <div className="card-con">{nodePcEditListCard}</div>
        <Row className="tpl-setting-title">
          <Col span={20} className="title">PC详情模板</Col>
          <Col span={4} className="text-align-right" >
            <ButtonGroup>
              <Button type="primary" onClick={action.addTplData.bind(null, 1, 1, "pcViewData",true)} icon="plus">新建</Button>
              <Button type="primary" onClick={action.distribute.bind(null, "pcViewData")} >分配</Button>
            </ButtonGroup>
          </Col>
        </Row>
        <div className="card-con">{nodePcDetailListCard}</div>
        <Row className="tpl-setting-title">
          <Col span={20} className="title">Mobile编辑模板</Col>
          <Col span={4} className="text-align-right" >
            <ButtonGroup>
              <Button type="primary" onClick={action.addTplData.bind(null, 2, 2, "mobileEditData",false)} icon="plus">新建</Button>
              <Button type="primary" onClick={action.distribute.bind(null, "mobileEditData")} >分配</Button>
            </ButtonGroup>
          </Col>
        </Row>
        <div className="card-con">{nodeMobileEditListCard}</div>
        <Row className="tpl-setting-title">
          <Col span={20} className="title">Mobile详情模板</Col>
          <Col span={4} className="text-align-right" >
            <ButtonGroup>
              <Button type="primary" onClick={action.addTplData.bind(null, 2, 1, "mobileViewData",true)} icon="plus">新建</Button>
              <Button type="primary" onClick={action.distribute.bind(null, "mobileViewData")} >分配</Button>
            </ButtonGroup>
          </Col>
        </Row>
        <div className="card-con">{nodeMobileDetailListCard}</div>
        <Modal
          width={900}
          title={"创建布局模板"}
          visible={$$state.get('addModelVisible')}
          onOk={this.savaData}
          onCancel={action.handleTplCancel}
          style={{ top: 10 }}
        >
          <AddForm
            name={$$state.get('name')}
            sourceList={$$state.get("sourceList").toJS()}
            targetList={$$state.get("targetList").toJS()}
            relativeObj={$$state.get("relativeObj").toJS()}
            selectRelativeObj={$$state.get("selectRelativeObj").toJS()}
            onChange={action.changeTplList}
            objFlag = {objFlag}
            nameFlag = {nameFlag}
          />
        </Modal>
        <Modal
          width={900}
          title={"列表模板分配"}
          visible={$$state.get('distributeVisible')}
          onOk={this.savaDistribute}
          onCancel={action.distributeCancel}
          style={{ top: 10 }}
        >

          <Distribute
            data={{
              selectData: $$state.get($$state.get("moduleType")).toJS(), //下拉框数据
              biztypes: $$state.get("distData").get("biztypes").toJS(),  //业务类型数据
              roles: $$state.get("distData").get("roles").toJS(),        //角色数据
              assignments: $$state.get("distData").get("assignments").toJS()  //已分配数据
            }}
            onChange={action.changeAssignments}
          />

        </Modal>
      </div>
    )
  }
}

//绑定状态到组件props
function mapStateToProps(state, ownProps) {
  return {
    $$state: state.businessObjDef.tplSetting
  }
}

//绑定action到组件props
function mapDispatchToProps(dispatch) {
  return {
    action: bindActionCreators(Actions, dispatch)
  }
}

//输出绑定state和action后组件
export default connect(mapStateToProps, mapDispatchToProps)(TplSet);