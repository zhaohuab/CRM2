/*
 * @Author: yangtmm 
 * @Date: 2017-11-06 14:00:54 
 * @Last Modified by: yangtmm
 * @Last Modified time: 2017-12-22 16:52:29
 */

import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Form, Input, Button, Dropdown, Icon, Row, Col, Modal } from 'antd';
const ButtonGroup = Button.Group;
const Search = Input.Search;

import Card from './list-config-card';
import ListConfigPcForm from './list-config-pc-form';
import ListConfigMobileForm from './list-config-mobile-form';
import Distribute from './list-config-dist';
import RolesChoosed from './list-config-dist/RolesChoosed.jsx';

//action方法
import * as Actions from "../action/list-config"

class ListConfig extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    let { $$state, action } = this.props;
    action.getListConfigList();
  }

  savaPcData = () => {
    
    let { $$state, action } = this.props;
    //组装待添加数据
    let param = {
      name: $$state.get("name"),
      description: "",
      clientType: $$state.get("clientType"),
      rows: $$state.get("targetList").toJS(),
    }
    if ($$state.get("isEdit")) {
      param.id = $$state.get("editId");
      action.savePcEditTpl(param)

    } else {
      action.savePcAddTpl(param)
    }
  }

  savaMobileData = () => {
    let { $$state, action } = this.props;
    //组装待添加数据
    let param = {
      name: $$state.get("name"),
      description: "",
      clientType: $$state.get("clientType"),
      rows: $$state.get("targetList").toJS(),
    }

    if ($$state.get("isEdit")) {
      param.id = $$state.get("editId");
      action.saveMobileEditTpl(param)
    } else {
      action.saveMobileAddTpl(param)
    }
  }

  savaDistribute = () => {
    let { $$state, action } = this.props;
    let assignments = $$state.get("distData").get("assignments").toJS();
    let assignments_bak = Object.keys(assignments).map((item, index) => {
      if (assignments[item]) {
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

    assignments_bak = assignments_bak.filter((item) => {
      return item.layoutId != "null";
    });

    let param = {
      clientType: $$state.get("clientType"),
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
     /*  obj.biztypeId = layoutObj.data.biztypeId;//biztypesId代表的是传参的同名参数，未定 */
      obj.roleId = item;//rolesId代表的是传参的同名参数，未定
      obj.layoutId=layoutObj.data.id;
      return obj;
    })
    let param={
      clientType: $$state.get("clientType"),
      assignments: assignment
    }
    action.savaDistribute(param)
  }
  render() {
   
    let { $$state, action } = this.props;
    let nameFlag = $$state.get("nameFlag");
    let listFlag = $$state.get("listFlag");
    let xx=$$state.get("pcListData").toJS();
    let aa =  $$state.get("mobileListData").toJS();
    //pc编辑模板布局
    let nodePcListCard = $$state.get("pcListData").toJS().map((item, index) => {
      
      return <Card
        data={item.data}
        operations={item.operations}
        onChange={action.layoutChoosed.bind(this,'pcListData')}
        enable={action.enable.bind(this, 'pcListData', item, index)}
        edit={action.editListConfigData.bind(null, item.data, index, "pcListData")}
        delete={action.delListConfig.bind(null, item.data, index, "pcListData")}
      />
    });

    //pc详情模板布局
    let nodeMobileListCard = $$state.get("mobileListData").toJS().map((item, index) => {
    
      return <Card
        data={item.data}
        operations={item.operations}
        onChange={action.layoutChoosed.bind(this,'mobileListData')}
        enable={action.enable.bind(this, 'mobileListData', item, index)}
        edit={action.editListConfigData.bind(null, item.data, index, "mobileListData")}
        delete={action.delListConfig.bind(null, item.data, index, "mobileListData")}
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
            <div style={{marginLeft:'30px'}}>
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
      <div className="list-config-warpper">
        <Row className="list-config-title">
          <Col span={20} className="title"><i className="iconfont icon-pcxiangqingmoban" />PC列表配置</Col>
          <Col span={4} className="text-align-right" >
            <ButtonGroup>
              <Button type="primary" onClick={action.addListConfigData.bind(null, "pcListData")} icon="plus">新建</Button>
              <Button type="primary" onClick={action.distribute.bind(null, "pcListData")} >分配</Button>
            </ButtonGroup>
          </Col>
        </Row>
        <div className="card-con">{nodePcListCard}</div>
        <Row className="list-config-title">
          <Col span={20} className="title"><i className="iconfont icon-yidongxiangqingmoban" />Mobile列表配置</Col>
          <Col span={4} className="text-align-right" >
            <ButtonGroup>
              <Button type="primary" onClick={action.addListConfigData.bind(null, "mobileListData")} icon="plus">新建</Button>
              <Button type="primary" onClick={action.distribute.bind(null, "mobileListData")} >分配</Button>
            </ButtonGroup>
          </Col>
        </Row>
        <div className="card-con">{nodeMobileListCard}</div>
        <Modal
          width={900}
          title={$$state.get("isEdit") ? "编辑PC列表模板" : "创建PC列表模板"}
          visible={$$state.get('pcVisible')}    
          onOk={this.savaPcData}
          onCancel={action.pcListConfigCancel}
          style={{ top: 10 }}
        >
          <ListConfigPcForm
            name={$$state.get('name')}
            description={$$state.get('description')}
            sourceList={$$state.get("filterSourceList").toJS()}
            targetList={$$state.get("targetList").toJS()}
            changeListConfig={action.changeListConfig}
            onChange={action.addLayout}
            filterSource={action.filterSource}
            restoreSource={action.restoreSource}
            nameFlag={nameFlag}
            listFlag={listFlag}
          />
        </Modal>
        <Modal
          width={900}
          title={$$state.get("isEdit") ? "编辑Mobile列表模板" : "创建Mobile列表模板"}
          visible={$$state.get('mobileVisible')}
          onOk={this.savaMobileData}
          onCancel={action.mobileListConfigCancel}
          style={{ top: 10 }}
        >
          <ListConfigMobileForm
            name={$$state.get('name')}
            description={$$state.get('description')}
            sourceList={$$state.get("filterSourceList").toJS()}
            targetList={$$state.get("targetList").toJS()}      
            changeListConfig={action.changeListConfig}
            onChange={action.addLayout}
            filterSource={action.filterSource}
            restoreSource={action.restoreSource}
            nameFlag={nameFlag}
            listFlag={listFlag}
          />
        </Modal>
        <Modal
          width={425}
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
    $$state: state.businessObjDef.listConfig
  }
}

//绑定action到组件props
function mapDispatchToProps(dispatch) {
  return {
    action: bindActionCreators(Actions, dispatch)
  }
}

//输出绑定state和action后组件
export default connect(mapStateToProps, mapDispatchToProps)(ListConfig);



/* 
  <Distribute
    data={{
      selectData: $$state.get($$state.get("moduleType")).toJS(), //下拉框数据
      roles: $$state.get("distData").get("roles").toJS(),        //角色数据
      assignments: $$state.get("distData").get("assignments").toJS()  //已分配数据
    }}
    onChange={action.changeAssignments}
  />
//分配时候原弹出框
 */