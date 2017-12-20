/*
 * @Author: yangtmm 
 * @Date: 2017-11-06 14:00:54 
 * @Last Modified by: yangtmm
 * @Last Modified time: 2017-12-11 13:27:34
 */

import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { Form, Input, Button, Dropdown, Icon, Row, Col, Modal } from 'antd';
const FormItem = Form.Item;

import Card from './tpl-setting-card';
import AddForm from './tpl-setting-form';

//action方法
import * as Actions from "../action/tpl-setting"



class TplSet extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
  }

  render() {
    let { $$state, action } = this.props;

    //pc编辑模板布局
    let nodePcEditListCard = $$state.get("pcEditListData").toJS().map((item, index) => {
      return <Card
        data={item}
        edit={() => { }}
        delete={() => { }}
      />
    });

    //pc详情模板布局
    let nodePcDetailListCard = $$state.get("pcDetailListData").toJS().map((item, index) => {
      return <Card
        data={item}
        edit={() => { }}
        delete={() => { }}
      />
    });

    //Mobile编辑模板布局
    let nodeMobileEditListCard = $$state.get("mobileEditListData").toJS().map((item, index) => {
      return <Card
        data={item}
        edit={() => { }}
        delete={() => { }}
      />
    });

    //Mobile详情模板布局
    let nodeMobileDetailListCard = $$state.get("mobileDetailListData").toJS().map((item, index) => {
      return <Card
        data={item}
        edit={() => { }}
        delete={() => { }}
      />
    });

    return (
      <div className="tpl-setting-warpper">
        <Row className="tpl-setting-title">
          <Col span={22} className="title">PC编辑模板</Col>
          <Col span={2} className="text-align-right" >
            <Button type="primary" onClick={action.addTplData} icon="plus">新建</Button>
          </Col>
        </Row>
        <div className="card-con">{nodePcEditListCard}</div>
        <Row className="tpl-setting-title">
          <Col span={22} className="title">PC详情模板</Col>
          <Col span={2} className="text-align-right" >
            <Button type="primary" onClick={action.addTplData} icon="plus">新建</Button>
          </Col>
        </Row>
        <div className="card-con">{nodePcDetailListCard}</div>
        <Row className="tpl-setting-title">
          <Col span={22} className="title">Mobile编辑模板</Col>
          <Col span={2} className="text-align-right" >
            <Button type="primary" onClick={action.addTplData} icon="plus">新建</Button>
          </Col>
        </Row>
        <div className="card-con">{nodeMobileEditListCard}</div>
        <Row className="tpl-setting-title">
          <Col span={22} className="title">Mobile详情模板</Col>
          <Col span={2} className="text-align-right" >
            <Button type="primary" onClick={action.addTplData} icon="plus">新建</Button>
          </Col>
        </Row>
        <div className="card-con">{nodeMobileDetailListCard}</div>
        <Modal
          width={900}
          title={"创建布局模板"}
          visible={$$state.get('addModelVisible')}
          onOk={() => { }}
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