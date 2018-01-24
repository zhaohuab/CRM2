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
const Search = Input.Search;
import Card from './tpl-setting-card';
import AddForm from './tpl-setting-form';
import Distribute from './tpl-setting-dist/';
import RolesChoosed from './tpl-setting-dist/RolesChoosed.jsx';

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
      biztypeId: $$state.get("businessObj").toJS().id,//----自添加角色id
      biztypeName: $$state.get("businessObj").toJS().name,//-----自添加角色name
      description: $$state.get("description"),//------------自添加布局描述
      mainLayout: $$state.get("targetList").toJS(),
      itemLayout: [],
      relationLayout: $$state.get("selectRelativeObj").toJS(),
    }
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

  onSave = () => {//----------------分配保存
  
    let { $$state, action } = this.props;
    let moduleType = $$state.get("moduleType");
    let str = moduleType+'Obj';
    let layoutObj = $$state.get(str).toJS();
    let rolesIdList = $$state.get("rolesIdList").toJS();
    let assignment = rolesIdList.map(item=>{
      let obj={};
      obj.biztypeId = layoutObj.data.biztypeId;//biztypesId代表的是传参的同名参数，未定
      obj.roleId = item;//rolesId代表的是传参的同名参数，未定
      obj.layoutId=layoutObj.data.id;
      return obj;
    })
    let param={
      clientType: $$state.get("clientType"),
      layoutType: $$state.get("type"),
      assignments: assignment
    }
    action.savaDistribute(param)
  }

  render() {
    let { $$state, action } = this.props;
    let objFlag = $$state.get('objFlag'),
        nameFlag = $$state.get('nameFlag'),
        businessObj = $$state.get('businessObj').toJS(),
        arr=[];
    arr.push(businessObj.id);
    businessObj.id=arr;
    let moduleType = $$state.get("moduleType");
    let str =  moduleType+'Id';
    let biztypeId= $$state.get(str);
    //pc编辑模板布局
    let nodePcEditListCard = $$state.get("pcEditData").toJS().map((item, index) => {
      return <Card
        data={item.data}
        operations={item.operations}
        enable={action.enable.bind(this, 'pcEditData', item, index)}
        onChange={action.layoutChoosed.bind(this,'pcEditData',item.data.biztypeId)}
        edit={action.editTplData.bind(null, item.data, index, "pcEditData",false)}
        delete={action.delTplConfig.bind(null, item.data, index, "pcEditData")}
      />
    });

    //pc详情模板布局
    let nodePcDetailListCard = $$state.get("pcViewData").toJS().map((item, index) => {
      return <Card
        data={item.data}
        operations={item.operations}
        enable={action.enable.bind(this, 'pcViewData', item, index)}
        onChange={action.layoutChoosed.bind(this,'pcViewData',item.data.biztypeId)}
        edit={action.editTplData.bind(null, item.data, index, "pcViewData",true)}
        delete={action.delTplConfig.bind(null, item.data, index, "pcViewData")}
      />
    });

    //Mobile编辑模板布局
    let nodeMobileEditListCard = $$state.get("mobileEditData").toJS().map((item, index) => {
      return <Card
        data={item.data}
        operations={item.operations}
        enable={action.enable.bind(this, 'mobileEditData', item, index)}
        onChange={action.layoutChoosed.bind(this,'mobileEditData',item.data.biztypeId)}
        edit={action.editTplData.bind(null, item.data, index, "mobileEditData",false)}
        delete={action.delTplConfig.bind(null, item.data, index, "mobileEditData")}
      />
    });

    //Mobile详情模板布局
    let nodeMobileDetailListCard = $$state.get("mobileViewData").toJS().map((item, index) => {
      return <Card
        data={item.data}
        operations={item.operations}
        enable={action.enable.bind(this, "mobileViewData", item, index)}
        onChange={action.layoutChoosed.bind(this,'mobileViewData',item.data.biztypeId)}
        edit={action.editTplData.bind(null, item.data, index, "mobileViewData",true)}
        delete={action.delTplConfig.bind(null, item.data, index, "mobileViewData")}
        nameFlag={nameFlag}
      />
    });

    let getTitle = () => {//------获取弹窗title
      return (
        <Row
            type="flex"
            justify="space-between"
            className="reference-main-header"
            align="middle"
        >
            <div className="title">分配角色</div>
            <div className='search' style={{marginLeft:'30px'}}>
                <Search
                    placeholder="请输入角色关键字"
                    style={{ width: 200 }}
                    onChange={this.props.action.onSearch.bind(this)}
                />
            </div>
        </Row>
      )
    }
    return (
      <div className="tpl-setting-warpper">
        <Row className="tpl-setting-title">
          <Col span={20} className="title"><i className="iconfont icon-pcbianjimoban" />PC编辑模板</Col>
          <Col span={4} className="text-align-right" >
            <ButtonGroup>
              <Button type="primary" onClick={action.addTplData.bind(null, 1, 2, "pcEditData",false)} icon="plus">新建</Button>
              <Button type="primary" onClick={action.distribute.bind(null, "pcEditData",biztypeId)} >分配</Button>
            </ButtonGroup>
          </Col>
        </Row>
        <div className="card-con">{nodePcEditListCard}</div>
        <Row className="tpl-setting-title">
          <Col span={20} className="title"><i className="iconfont icon-pcxiangqingmoban" />PC详情模板</Col>
          <Col span={4} className="text-align-right" >
            <ButtonGroup>
              <Button type="primary" onClick={action.addTplData.bind(null, 1, 1, "pcViewData",true)} icon="plus">新建</Button>
              <Button type="primary" onClick={action.distribute.bind(null, "pcViewData",biztypeId)} >分配</Button>
            </ButtonGroup>
          </Col>
        </Row>
        <div className="card-con">{nodePcDetailListCard}</div>
        <Row className="tpl-setting-title">
          <Col span={20} className="title"><i className="iconfont icon-yidongbianjimoban" />Mobile编辑模板</Col>
          <Col span={4} className="text-align-right" >
            <ButtonGroup>
              <Button type="primary" onClick={action.addTplData.bind(null, 2, 2, "mobileEditData",false)} icon="plus">新建</Button>
              <Button type="primary" onClick={action.distribute.bind(null, "mobileEditData",biztypeId)} >分配</Button>
            </ButtonGroup>
          </Col>
        </Row>
        <div className="card-con">{nodeMobileEditListCard}</div>
        <Row className="tpl-setting-title">
          <Col span={20} className="title"><i className="iconfont icon-yidongxiangqingmoban" />Mobile详情模板</Col>
          <Col span={4} className="text-align-right" >
            <ButtonGroup>
              <Button type="primary" onClick={action.addTplData.bind(null, 2, 1, "mobileViewData",true)} icon="plus">新建</Button>
              <Button type="primary" onClick={action.distribute.bind(null, "mobileViewData",biztypeId)} >分配</Button>
            </ButtonGroup>
          </Col>
        </Row>
        <div className="card-con">{nodeMobileDetailListCard}</div>
          <Modal
          width={800}
          title={"创建布局模板"}
          visible={$$state.get('addModelVisible')}
          onOk={this.savaData}
          onCancel={action.handleTplCancel}
          style={{ top: 10 }}
        >
          <AddForm
            name={$$state.get('name')}
            sourceList={$$state.get("filterSourceList").toJS()}
            targetList={$$state.get("targetList").toJS()}
            relativeObj={$$state.get("relativeObj").toJS()}
            selectRelativeObj={$$state.get("selectRelativeObj").toJS()}
            onChange={action.changeTplList}
            changeTplList={action.changeTplList2}
            filterSource={action.filterSource}
            restoreSource={action.restoreSource}
            businessChoosed={action.businessChoosed}
            objFlag={objFlag}
            nameFlag={nameFlag}
            businessObj={businessObj}
            description={$$state.get('description')}
          />
        </Modal>
        <Modal
          width={400}
          title={getTitle()}
          visible={$$state.get('distributeVisible')}
          onOk={this.onSave}
          onCancel={action.distributeCancel}
          style={{ top: 10 }}
        >
          <RolesChoosed
            dataFlag={$$state.get('dataFlag')}
            rolesChoosed={action.rolesChoosed}
            rolesIdList={$$state.get('rolesIdList').toJS()}
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

/* 
  <Distribute
    data={{
      selectData: $$state.get($$state.get("moduleType")).toJS(), //下拉框数据
      biztypes: $$state.get("distData").get("biztypes").toJS(),  //业务类型数据
      roles: $$state.get("distData").get("roles").toJS(),        //角色数据
      assignments: $$state.get("distData").get("assignments").toJS()  //已分配数据
    }}
    onChange={action.changeAssignments}
  />
*/