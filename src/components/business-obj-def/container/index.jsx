/*
 * @Author: yangtmm 
 * @Date: 2017-11-06 14:00:44 
 * @Last Modified by: yangtmm
 * @Last Modified time: 2017-12-08 11:04:23
 */

import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Table, Tabs, Icon } from 'antd';
const TabPane = Tabs.TabPane;
import './index.less';
import BusinessObj from './business-obj';
import Fieldset from './field-setting';
import TplSet from './tpl-setting';
import ListConfig from './list-config';
import Approval from './approval';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import * as Actions from "../action/approval.js";

@DragDropContext(HTML5Backend)
class BusinessObjDefine extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let { $$state, action } = this.props;
    let url = $$state.get("url");
    let add = $$state.get("add");
    let { onClosed } = action;
    return (
      <div className='business-obj-def-warpper'>
        <Tabs size="small" defaultActiveKey="1" animated={false}>
          <TabPane tab="业务类型" key="1">
            <BusinessObj />
          </TabPane>
          <TabPane tab="字段" key="2">
            <Fieldset />
          </TabPane>
          <TabPane tab="页面布局" key="3">
            <TplSet />
          </TabPane>
          <TabPane tab="列表配置" key="4">
            <ListConfig />
          </TabPane>
          <TabPane tab="审批流程设置" key="5">
            <Approval />
          </TabPane>
        </Tabs>
        {
          add ? 
          <div style={{width:'100%',height:'100%'}}>
            <iframe className='ifram' frameborder="0" scrolling='auto' src={url}></iframe>
            <Icon type="close-square" className='closed' onClick={onClosed}/>
          </div>
          :''
        }
      </div>
    )
  }
}

//绑定状态到组件props
function mapStateToProps(state, ownProps) {
  return {
    $$state: state.businessObjDef.approval
  }
}

function mapDispatchToProps(dispatch) {
  return {
    action: bindActionCreators(Actions, dispatch)
  }
}
//输出绑定state和action后组件
export default connect(mapStateToProps,mapDispatchToProps)(BusinessObjDefine);