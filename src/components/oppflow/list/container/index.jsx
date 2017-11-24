/**
 * Created by litcb on 2017-08-30
 */

import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Table, Modal, Button, Icon, Input, Radio, Popconfirm, Form, Row, Col } from 'antd';
import Card from './CardForm.jsx';
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
    let form = this.formRef.props.form;
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
    if (this.state.isEdit) {
      this.props.action.onSave4Edit(form.getFieldsValue());
    }
    else {
      this.props.action.onSave4Add(form.getFieldsValue());
    }
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



  render() {
    let { $$state } = this.props;
    let data = $$state.get("data").toJS().data;
    let visible = $$state.get("visible");
    let editData = $$state.get("editData").toJS();
    const WrapCard = Form.create()(Card);
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
        >
          <div className='model-height'>
            <WrapCard dataSource={editData} wrappedComponentRef={(inst) => this.formRef = inst} />
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