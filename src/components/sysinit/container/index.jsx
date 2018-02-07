import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Table, Button, message, Steps, Form } from 'antd';
import moment from 'moment'
import './index.less'
import { Input } from 'antd';
//导入action方法
import * as Actions from "../action"

import InfoCard from './InfoCard.jsx'
import InfoView from './InfoView.jsx'
import AdminList from './AdminList.jsx'

const Step = Steps.Step;



class Page extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      current: 0,
      isEdit: false,
      dataSource: {},
    };
  }
  steps = [{
    title: '企业信息',
  }, {
    title: '管理员列表',
  }, {
    title: '完成',
  }];
  

  componentWillMount() {
    //页面初始化前重置数据
    this.props.action.resetState();
  }

  componentDidMount() {
    this.props.action.getMainEditTpl();
    this.props.action.getSysInitInfo();
  }

  render() {
    
    let current = this.props.$$state.get("current");
    let orgFields = this.props.$$state.get("tenantFields").toJS();
    let orgInfo = this.props.$$state.get("tenantInfo").toJS();
    
    let tpl = this.props.$$state.get("template").toJS();
    if(tpl) {
      tpl = tpl.edit;
    }
    let content = "";
    let WrapInfoCard = InfoCard;
    switch (current) {
      case 0:
        content = <WrapInfoCard tpl={tpl} onChange={this.props.action.onOrgChange} dataSource={orgFields} wrappedComponentRef={(inst) => this.formRef = inst} />;
        break;
      case 1:
        content = <div><InfoView dataSource={orgInfo}/><AdminList editable={true}/></div>;
        break;
      case 2:
        content = <div><InfoView dataSource={orgInfo}/><AdminList editable={false}/></div>;
        break;
    }
    return (
      <div>
        <Steps current={current} className="sysinit-steps">
          {this.steps.map(item => <Step key={item.title} title={item.title} />)}
        </Steps>

        <div className="sider-layout">
          {
            current != 2
            &&
            <span className="head-label">企业信息</span>
          }
          {
            current == 2
            &&
            <span className="head-label">完成</span>
          }

        </div>
        <div className="steps-content">{content}</div>
        

      </div>
    );
  }
}
//绑定状态到组件props
function mapStateToProps(state, ownProps) {
  return {
    $$state: state.sysinit
  }
}
//绑定action到组件props
function mapDispatchToProps(dispatch) {
  return {
    action: bindActionCreators(Actions, dispatch)
  }
}
//输出绑定state和action后组件
export default connect(mapStateToProps, mapDispatchToProps)(Page);
//export default Page;