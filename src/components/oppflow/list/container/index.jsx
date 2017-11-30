/**
 * Created by litcb on 2017-08-30
 */

import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Table, Modal, Button, Icon, Input, Radio, Popconfirm, Form, Row, Col } from 'antd';
import Card from './CardForm.jsx';
import ActionCard from './ActionCard.jsx';
import Department from 'components/refs/departments'
import './index.less'
import HeaderButton from "../../../common/headerButtons/headerButtons.jsx";
const ButtonGroup = Button.Group;
const confirm = Modal.confirm;
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
    this.props.action.getListData(this.props.$$state.get("pagination").toJS());
    this.props.action.getEnumData();
  }

  onAdd() {
    this.setState({ isEdit: false });
    this.props.action.showForm(true, {});
  }
  onDelete(id) {

    let that = this
    confirm({
      title: '确定要删除吗?',
      content: '此操作不可逆',
      okText: '是',
      okType: 'danger',
      cancelText: '否',
      onOk() {
        that.props.action.onDelete(id);
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  }
  onEdit = (item) => {
    this.props.action.showForm(true, item);
  }
  onClose() {
    this.props.action.showForm(false, {});
  }
  onEnable(enable) {
    return (enable) => {
      this.props.action.onEnable(this.props.$$state.get("selectedRowKeys").toJS(), enable, this.props.$$state.get("pagination").toJS());
    }
  }
  onSave() {
    let form = this.actionRef.props.form;
    let that = this;
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
      const editData = this.props.$$state.get("editData").toJS();
      editData.oppdimension=undefined;
      editData.oppstage=undefined;
      editData.flowState = editData.flowState.key;
      const result = this.props.$$state.get("result").toJS();
      for(let i=0;i<result.length;i++){
        if(result[i].key == values.nowStage){
          const stage = result[i];
          const dimensions = stage.children
          for(let i=0;i<dimensions.length;i++){
            const actions = values['oppdimension'+dimensions[i].key];
            dimensions[i].children = [];
            dimensions[i].children.push(actions)
          }
          break;
        }
      }

      if (this.state.isEdit) {
        this.props.action.onSave4Edit(form.getFieldsValue());
      }
      else {
        this.props.action.onSave4Add(editData,result);
      }
    });
  }

  showTotal(total) {
    return `共 ${total} 条`;
  }
  onPageChange(page, pageSize) {
    //可能有问题
    let pagination = { page: page, pageSize: pageSize };
    this.props.action.getListData(pagination);
  }
  onPageSizeChange(page, pageSize) {
    let pagination = { page: page, pageSize: pageSize };
    this.props.action.getListData(pagination);
  }

  onBack() {
    this.props.action.selectData({ selectedRows: [], selectedRowKeys: [] });
  }


  configAction() {
    this.props.action.getOppaction(this.props.$$state.get("allDimension").toJS())
    const data = this.formRef.props.form.getFieldsValue();
    this.props.action.saveEditData(data)
    const oppstage = data.oppstage;
    const oppdimension = data.oppdimension;
    for(let i=0;i<oppstage.length;i++){
      for(let i=0;i<oppdimension.length;i++){
        oppstage[i].children = oppdimension;
      }
    }
    this.props.action.saveResult(oppstage)
  }

  changeStep(index) {
    this.props.action.changeStep(index)
  }

  render() {

    let { $$state } = this.props;
    let data = $$state.get("data").toJS().data;
    let visible = $$state.get("visible");
    let editData = $$state.get("editData").toJS();
    const WrapCard = Form.create()(Card);
    const WrapActionCard = Form.create()(ActionCard);
    const step = this.props.$$state.get("step");
    const showFlow = data =>
      data.map(item => {
        return (
          <Col span={6}>
            <Row>
              流程名称
            </Row>
            <Row>
              业务类型：{item.name}
            </Row>
            <Row>
              流程描述：{item.description}
            </Row>
            <Row
              type="flex"
              justify="end">
              <Col span={3} >
                <div onClick={this.onEdit.bind(this, item)}>编辑</div>
              </Col>
              <Col span={3}>
                <div onClick={this.onDelete.bind(this, item.id)}>删除</div>
              </Col>
              <Col span={3}>
                <div onClick={this.onDelete.bind(this, item.id)}>启用</div>
              </Col>
            </Row>
          </Col>
        );

      });

    return (
      <div className='user-warpper'>
        <Row>
          <Button onClick={this.onAdd.bind(this)}>新建</Button>
        </Row>
        <Row>
          {showFlow(data)}
        </Row>
        <Modal
          title={this.state.isEdit ? "编辑销售流程" : "新增销售流程"}
          visible={visible}
          onOk={this.onSave.bind(this)}
          onCancel={this.onClose.bind(this)}
          width="60%"
          footer={
            step == 1 ? <div>
              <Button onClick={this.onClose.bind(this)}>取消</Button>
              <Button onClick={this.configAction.bind(this)}>配置阶段动作</Button>
              <Button>保存</Button>
            </div> :
              <div>
                <Button onClick={this.onClose.bind(this)}>取消</Button>
                <Button onClick={this.changeStep.bind(this, 1)}>上一步</Button>
                <Button >发布</Button>
                <Button onClick={this.onSave.bind(this)}>保存</Button>
              </div>
          }
        >
          <div className='model-height'>

            {step == 1 ?
              <WrapCard dataSource={editData} wrappedComponentRef={(inst) => this.formRef = inst} />
              : <WrapActionCard dataSource={editData} wrappedComponentRef={(inst) => this.actionRef = inst} />}
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