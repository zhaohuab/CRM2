/*
 * @Author: yangtmm 
 * @Date: 2017-11-06 14:00:54 
 * @Last Modified by: yangtmm
 * @Last Modified time: 2017-12-11 10:17:35
 */

import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'


import Card from './list-config-card';
import ListConfigPcForm from './list-config-pc-form';
import ListConfigMobileForm from './list-config-mobile-form';

import { Form, Input, Button, Dropdown, Icon, Row, Col, Modal } from 'antd';

//action方法
import * as Actions from "../action/list-config"

class ListConfig extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
  }

  render() {
    let { $$state, action } = this.props;
    //pc编辑模板布局
    let nodePcListCard = $$state.get("pcListData").toJS().map((item, index) => {
      return <Card
        data={item}
        edit={() => { }}
        delete={() => { }}
      />
    });

    //pc详情模板布局
    let nodeMobileListCard = $$state.get("mobileListData").toJS().map((item, index) => {
      return <Card
        data={item}
        edit={() => { }}
        delete={() => { }}
      />
    });

    return (
      <div className="list-config-warpper">
        <Row className="list-config-title">
          <Col span={22} className="title">PC列表配置</Col>
          <Col span={2} className="text-align-right" >
            <Button type="primary" onClick={action.addListConfigData.bind(null, "pc")} icon="plus">新建</Button>
          </Col>
        </Row>
        <div className="card-con">{nodePcListCard}</div>
        <Row className="list-config-title">
          <Col span={22} className="title">Mobile列表配置</Col>
          <Col span={2} className="text-align-right" >
            <Button type="primary" onClick={action.addListConfigData.bind(null, "mob")} icon="plus">新建</Button>
          </Col>
        </Row>
        <div className="card-con">{nodeMobileListCard}</div>
        <Modal
          width={900}
          title={"创建PC列表模板"}
          visible={$$state.get('pcVisible')}
          onOk={() => { }}
          onCancel={action.pcListConfigCancel}
          style={{ top: 10 }}
        >
          <ListConfigPcForm
            name={$$state.get('name')}
            sourceList={$$state.get("sourceList").toJS()}
            targetList={$$state.get("targetList").toJS()}
            onChange={action.changeListConfig}
          />
        </Modal>
        <Modal
          width={900}
          title={"创建Mobile列表模板"}
          visible={$$state.get('mobileVisible')}
          onOk={() => { }}
          onCancel={action.mobileListConfigCancel}
          style={{ top: 10 }}
        >
          <ListConfigMobileForm
            name={$$state.get('name')}
            sourceList={$$state.get("sourceList").toJS()}
            targetList={$$state.get("targetList").toJS()}
            onChange={action.changeListConfig}
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