import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Table, Button, message, Steps, Form } from 'antd';
import './index.less'
import { Input } from 'antd';
//导入action方法
import * as Actions from "../action"

import InfoCard from './InfoCard.jsx'
import AdminList from './AdminList.jsx'
import InfoView from './InfoView.jsx'

const Step = Steps.Step;
const WrapInfoCard = Form.create()(InfoCard);


class Page extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      current: 0,
      isEdit:false,
      dataSource:{},
    };
  }
  steps = [{
    title: '企业信息',
    //content: <WrapInfoCard wrappedComponentRef={(inst) => this.formRef = inst} />,
  }, {
    title: '管理员列表',
    //content: <div><InfoView /*dataSource={this.state.dataSource}*//><AdminList /></div>,
  }, {
    title: '完成',
    //content: '完成',
  }];
  next() {
    let current = this.state.current;
    if (current == 0) {
      let form = this.formRef.props.form;

      form.validateFieldsAndScroll((err, values) => {
        if (!err) {
          if (this.state.isEdit) {
            this.props.action.onSave4Edit(form.getFieldsValue());
          }
          else {
            this.props.action.onSave4Add(form.getFieldsValue());
          }
          current += 1;
          this.setState({ current });
        }
      });
    }
    else if (current == 1) {
      current += 1;
      this.setState({ current });
    }
    else if (current == 2) {
      current += 1;
      this.setState({ current });
    }

  }
  prev() {
    const current = this.state.current - 1;
    this.setState({ current });
  }
  render() {
    let { current } = this.state;
    
    let orgInfo = this.props.$$state.get("orgInfo").toJS();
  
    let content = "";
    debugger
    switch(current) {
      case 0:
        content = <WrapInfoCard dataSource={orgInfo} wrappedComponentRef={(inst) => this.formRef = inst} />;
        break;
      case 1:
        content = <div><InfoView dataSource={orgInfo} /><AdminList /></div>;
        break;
      // case 2:
      //   content = '完成';
    }
    return (
      <div>
        <Steps current={current} className="sysinit-steps">
          {this.steps.map(item => <Step key={item.title} title={item.title} />)}
        </Steps>

        <div className="sider-layout">
          {
            this.state.current != 2
            &&
            <span className="head-label">企业信息</span>
          }
          {
            this.state.current == 2
            &&
            <span className="head-label">完成</span>
          }
          <div>
            {
              this.state.current > 0
              &&
              <Button onClick={() => this.prev()}>
                上一步
                </Button>
            }
            {
              this.state.current < this.steps.length - 1
              &&
              <Button type="primary" style={{ marginLeft: 15 }} onClick={() => this.next()}>下一步</Button>
            }
            {
              this.state.current === this.steps.length - 1
              &&
              <Button type="primary" style={{ marginLeft: 15 }} onClick={() => message.success('操作完成')}>完成</Button>
            }

          </div>
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