/*
 * @Author: yangtmm 
 * @Date: 2017-11-06 14:00:44 
 * @Last Modified by: yangtmm
 * @Last Modified time: 2017-12-22 14:48:29
 */

import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Table, Tabs, } from 'antd';
const TabPane = Tabs.TabPane;
import './index.less';
import BusinessObj from './business-obj';
import Fieldset from './field-setting';
import TplSet from './tpl-setting';
import ListConfig from './list-config';

import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

@DragDropContext(HTML5Backend)
class BusinessObjDefine extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className='business-obj-def-warpper'>
        <Tabs size="small" defaultActiveKey="2" animated={false}>
          <TabPane tab="业务类型" key="1" forceRender = {false}>
            <BusinessObj />
          </TabPane>
          <TabPane tab="字段" key="2" forceRender = {false}>
            <Fieldset />
          </TabPane>
          <TabPane tab="页面布局" key="3" forceRender = {false}>
            <TplSet />
          </TabPane>
          <TabPane tab="列表配置" key="4" forceRender = {false}>
            <ListConfig />
          </TabPane>
        </Tabs>
      </div>
    )
  }
}

//绑定状态到组件props
function mapStateToProps(state, ownProps) {
  return {
    $$state: state.businessObjDef
  }
}

//输出绑定state和action后组件
export default connect(mapStateToProps, {})(BusinessObjDefine);