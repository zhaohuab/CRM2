/**
 * Created by litcb on 2017-08-30
 */

import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Table, Modal, Button, Icon, Input, Radio, Popconfirm, Form, Row, Col, Switch ,Card as AntdCard} from 'antd';
import Card from './CardForm.jsx';
import ActionCard from './ActionCard.jsx';
import Department from 'components/refs/departments'
import './index.less'
import HeaderButton from "../../../common/headerButtons/headerButtons.jsx";
import SearchPanel from "./SearchPanel.jsx";
const ButtonGroup = Button.Group;
const confirm = Modal.confirm;
const FormItem = Form.Item;
import 'assets/stylesheet/all/iconfont.css'


//导入action方法
import * as Actions from "../action"

class List extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      isEdit: false,
    }
  }

  componentDidMount() {
    this.props.action.getListData();
    this.props.action.getEnumData();
  }

  onAdd() {

    this.props.action.setIsEdit(false);
    this.props.action.showForm(true);
  }
  onDelete(id) {
    const listData = this.props.$$state.get("data").toJS().data;
    for (let i = 0; i < listData.length; i++) {
      if (listData[i].id == id) {
        listData.splice(i, 1)
      }
    }

    let that = this
    confirm({
      title: '确定要删除吗?',
      content: '此操作不可逆',
      okText: '是',
      okType: 'danger',
      cancelText: '否',
      onOk() {
        that.props.action.onDelete(id, listData);
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  }
  onEdit(id) {
    this.props.action.setIsEdit(true);
    this.props.action.showForm(true);
    this.props.action.getEditData(id)
  }
  onClose() {
    this.props.action.showForm(false);
  }

  onSave() {
    let form = this.actionRef.props.form;
    let that = this;
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
      const editData = this.props.$$state.get("editData").toJS();
      editData.oppdimension = undefined;
      editData.oppstage = undefined;
      // if (editData.flowState) {
      //   editData.flowState = editData.flowState.key;
      // }
      const result = this.props.$$state.get("result").toJS();
      for (let i = 0; i < result.length; i++) {
        if (result[i].key == values.nowStage) {
          result[i].winProbability = values.winProbability
          const stage = result[i];
          const dimensions = stage.children
          for (let i = 0; i < dimensions.length; i++) {
            const actions = values['oppdimension' + dimensions[i].key];
            dimensions[i].children = actions
          }
          break;
        }
      }

      if (that.props.$$state.get('isEdit')) {
        that.props.action.onSave4Edit(editData, result);
      }
      else {
        that.props.action.onSave4Add(editData, result);
      }
    });
  }


  configAction() {
    this.props.action.getOppaction(this.props.$$state.get("allDimension").toJS())
    const data = this.formRef.props.form.getFieldsValue();
    this.props.action.saveEditData(data)
    const result = this.props.$$state.get("result").toJS();
    const oppstage = data.oppstage;
    const oppdimension = data.oppdimension;
    oppdimension.children = [];
    let i, j, k;
    let flag;

    for (i = 0; i < oppstage.length; i++) {
      oppstage[i].children = []
    }
    for (i = 0; i < oppdimension.length; i++) {
      oppdimension[i].children = []
    }
    for (i = result.length - 1; i >= 0; i--) {
      flag = false
      for (j = 0; j < oppstage.length; j++) {
        if (result[i].key == oppstage[j].key) {
          flag = true
          break;
        }
      }
      if (flag == false) {
        result.splice(i, 1)
      }
    }

    for (i = 0; i < oppstage.length; i++) {
      flag = false
      for (j = 0; j < result.length; j++) {
        if (oppstage[i].key == result[j].key) {
          flag = true;
          break;
        }
      }
      if (flag == false) {
        oppstage[i].children = oppdimension;
        result.push(oppstage[i])
      }
    }

    for (i = 0; i < result.length; i++) {
      if (!result[i].children) {
        break;
      }
      for (j = result[i].children.length - 1; j >= 0; j--) {
        flag = false;
        for (k = 0; k < oppdimension.length; k++) {
          if (result[i].children[j].key == oppdimension[k].key) {
            flag = true;
            break;
          }
        }
        if (flag == false) {
          result[i].children.splice(j, 1)
        }
      }
    }

    for (i = 0; i < result.length; i++) {
      for (j = 0; j < oppdimension.length; j++) {
        flag = false;
        if (!result[i].children) {
          result[i].children = oppdimension;
          break;
        }
        for (k = 0; k < result[i].children.length; k++) {
          if (oppdimension[j].key == result[i].children[k].key) {
            flag = true
            break;
          }
        }
        if (flag == false) {
          result[i].children.push(oppdimension[j])
        }
      }
    }



    this.props.action.saveResult(result)
  }

  changeStep(index) {
    this.props.action.changeStep(index)
  }

  onChangeEnabel(id, oldState) {
    let state = 1
    if (oldState == 1) {
      state = 2
    }
    const listData = this.props.$$state.get("data").toJS().data;
    for (let i = 0; i < listData.length; i++) {
      if (listData[i].id == id) {
        listData[i].enableState = state
      }
    }
    this.props.action.onEnable(id, state, listData)
  }

  render() {
    let { $$state } = this.props;
    let data = $$state.get("data").toJS().data;
    let visible = $$state.get("visible");
    let editData = $$state.get("editData").toJS();
    const WrapCard = Form.create()(Card);
    const WrapActionCard = Form.create()(ActionCard);
    const WrapSearchPanel = Form.create()(SearchPanel);
    const step = this.props.$$state.get("step");
    const showFlow = data =>
      data.map(item => {
        return (
          <Col span={6}>
            <Row type="flex" justify="center">
              <Col span={23} className='data_box'>
                <Row className="box_title">
                  <Col span={12} class="box_title_left">
                    {item.name}
                  </Col>
                  <Col span={12} class="box_title_right" >
                    {/* <div >{item.enableState == 1 ? '启用' : '停用'}</div> */}
                    <Row type="flex" justify="end">
                      <Switch defaultChecked={item.enableState == 1 ? true : false} checkedChildren="启用" unCheckedChildren="停用" onClick={this.onChangeEnabel.bind(this, item.id, item.enableState)} />
                    </Row>
                  </Col>
                </Row>

                <Row>
                  <Col span={16}>
                    <Row className="box_line1">
                      <Col className="box_line1_title">
                        业务类型：
                      </Col>
                      <Col className="box_line1_value">
                        {item.biztypeName}
                      </Col>
                    </Row>
                    <Row className="box_line2">

                      <Col className="box_line2_title">
                        流程描述：
                      </Col>
                      <Col className="box_line2_value">
                        {item.description}
                      </Col>
                    </Row>
                  </Col>
                  <Col span={8}>

                    <Row className="box_button1">
                      <div onClick={this.onDelete.bind(this, item.id)}>
                        <i className="iconfont icon-shanchu" />
                      </div>
                    </Row>
                    <Row className="box_button2">
                      <div onClick={this.onEdit.bind(this, item.id)}>
                        <i className="iconfont icon-bianji" />
                      </div>
                    </Row>



                  </Col>
                </Row>



              </Col>
            </Row>
          </Col>
        );

      });
    return (
      <div className='content'>
        <Row>
          <Button onClick={this.onAdd.bind(this)}>新建</Button>
        </Row>
        <Row>
          <WrapSearchPanel />
        </Row>
        <Row gutter={0}>
          {showFlow(data)}
        </Row>
        <Modal
          title={this.props.$$state.get('isEdit') ? "编辑销售流程" : "新增销售流程"}
          visible={visible}
          onOk={this.onSave.bind(this)}
          onCancel={this.onClose.bind(this)}
          width="60%"
          maskClosable={false}
          footer={
            step == 1 ? <div>
              <Button onClick={this.onClose.bind(this)}>取消</Button>
              <Button type="primary" onClick={this.configAction.bind(this)}>配置阶段动作</Button>
              
            </div> :
              <div>
                <Button onClick={this.onClose.bind(this)}>取消</Button>
                <Button onClick={this.changeStep.bind(this, 1)}>上一步</Button>
                <Button className="border-blue">发布</Button>
                <Button type="primary" onClick={this.onSave.bind(this)}>保存</Button>
              </div>
          }
        >
          <div className='model-height'>
            <AntdCard title="基本信息" bordered={false}>
              {step == 1 ?
                <WrapCard dataSource={editData} wrappedComponentRef={(inst) => this.formRef = inst} />
                : <WrapActionCard dataSource={editData} wrappedComponentRef={(inst) => this.actionRef = inst} />}
            </AntdCard>
          </div>
        </Modal>
      </div>
    )
  }
}

//绑定状态到组件props
function mapStateToProps(state, ownProps) {
  return {
    $$state: state.oppflowList
  }
}

//绑定action到组件props
function mapDispatchToProps(dispatch) {
  return {
    action: bindActionCreators(Actions, dispatch)
  }
}

//输出绑定state和action后组件
export default connect(mapStateToProps, mapDispatchToProps)(List);