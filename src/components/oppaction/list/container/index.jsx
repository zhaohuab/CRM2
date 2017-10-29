/**
 * Created by litcb on 2017-08-30
 */

import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Table, Modal, Button, Icon,Input, Radio, Popconfirm, Form } from 'antd';
import Card from './CardForm.jsx';
import HeadLabel from './HeadLabel.jsx';
import Department from 'components/refs/departments'
import './index.less'
const ButtonGroup = Button.Group;
const confirm = Modal.confirm;
import 'assets/stylesheet/all/iconfont.css'

//导入action方法
import * as Actions from "../action"

class List extends React.Component {
  constructor(props) {
    super(props)

    this.columns = [
      {
        title: '动作名称',
        dataIndex: 'name',
      },
      {
        title: '动作描述',
        dataIndex: 'description',
      },
      {
        title: '预制关键动作',
        dataIndex: 'isPresetedName',
      },
      {
        title: '启用',
        dataIndex: 'enableStateName',
      }
    ]

    this.state = {
      headLabel: false,
      selectedRowKeys: [],
      isEdit: false,
      pagination: {
        pageSize: 10,
        page: 1,
      },
    }
  }

  componentDidMount() {
    let { pagination } = this.state;
    this.props.action.getListData({ pagination });
  }

  onAdd() {
    this.setState({ isEdit: false });
    this.props.action.showForm(true, {});
  }
  onDelete(){
const aaa = this.state.pagination
    let that = this
    confirm({
      title: '确定要删除吗?',
      content: '此操作不可逆',
      okText: '是',
      okType: 'danger',
      cancelText: '否',
      onOk() {
        debugger
        let { pagination } = that.state;
        that.props.action.onDelete(that.state.selectedRowKeys, { pagination });
        that.setState({ headLabel: false, selectedRowKeys: [] });
      },
      onCancel() {
        console.log('Cancel');
      },
    });

   
  }
  onEdit = () => {
    this.setState({ isEdit: true });
    let rowKey = this.state.selectedRowKeys[0];
    let rowData = {};
    let page = this.props.$$state.get("data").toJS();
    for (let i = 0, len = page.data.length; i < len; i++) {
      if (rowKey == page.data[i].id) {
        rowData = page.data[i];
        break;
      }
    }
    this.props.action.showForm(true, rowData);
  }
  onClose() {
    this.props.action.showForm(false, {});
  }
  onEnable(enable) {
    return (enable) => {
      let { pagination } = this.state;
      this.setState({ headLabel: false, selectedRowKeys: [] });
      this.props.action.onEnable(this.state.selectedRowKeys, enable, { pagination });
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
  onSelectChange = (selectedRowKeys) => {
    let state = {
      selectedRowKeys: selectedRowKeys
    }
    state.headLabel = selectedRowKeys.length ? true : false;
    this.setState(state);
  }
  onBack = () => {
    this.setState({ headLabel: false });
  }

  showTotal(total) {
    return `共 ${total} 条`;
  }
  onPageChange(page, pageSize) {
    let { pagination } = this.state;
    //可能有问题
    pagination = { page: page, pageSize: pageSize };
    this.setState({ pagination })
    this.props.action.getListData({ pagination });
  }
  onPageSizeChange(current, pageSize) {
    let { pagination } = this.state;
    pagination = { page: pagination.page, pageSize: pageSize };
    this.setState({ pagination })
    this.props.action.getListData({ pagination });
    console.info(`pageSize:${pageSize}`)
  }
  render() {
    let page = this.props.$$state.get("data").toJS();
    let visible = this.props.$$state.get("visible");
    let { headLabel, selectedRowKeys } = this.state;
    let rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
    };
    let editData = this.props.$$state.get("editData").toJS();
    const WrapCard = Form.create()(Card);
    return (
      <div className='user-warpper'>
        {
          headLabel ?
            <div className='head_edit'>
              <HeadLabel selectedRowKeys={selectedRowKeys} onBack={this.onBack}>
                {selectedRowKeys.length != 1 ?
                  <Button className="default_button" disabled><i className='iconfont icon-bianji'></i>编辑</Button> :
                  <Button className="default_button" onClick={this.onEdit.bind(this)}><i className='iconfont icon-bianji'></i>编辑</Button>
                }
               
                  <Button className="default_button" onClick={this.onDelete.bind(this)}><i className='iconfont icon-shanchu'></i>删除</Button>
               
                <Button className="default_button" onClick={this.onEnable(2).bind(this, 2)}><i className='iconfont icon-tingyong'></i>停用</Button>
                <Button className="default_button" onClick={this.onEnable(1).bind(this, 1)}><i className='iconfont icon-qiyong'></i>启用</Button>
              </HeadLabel>
            </div> :
            <div className='head_panel'>
              <div className='head_panel-left'>
              </div>
              <div className='head_panel-right'>
                <ButtonGroup className='add-more'>
                  <Button><i className='iconfont icon-daochu'></i>导入</Button>
                  <Button><i className='iconfont icon-daoru'></i>导出</Button>
                </ButtonGroup>
                <Button type="primary" className="button_add" onClick={this.onAdd.bind(this)}><Icon type="plus" />新增</Button>
              </div>
            </div>
        }
        <div className="list-box">
          <Table
            size="middle"
            columns={this.columns}
            dataSource={page.data}
            rowSelection={rowSelection}
            rowKey="id"
            pagination={{ size: "large", showSizeChanger: true, showQuickJumper: true, total: page.total, showTotal: this.showTotal, onChange: this.onPageChange.bind(this), onShowSizeChange: this.onPageSizeChange.bind(this) }}
          />
        </div>
        <Modal
          title={this.state.isEdit ? "编辑关键动作" : "新增关键动作"}
          visible={visible}
          onOk={this.onSave.bind(this)}
          onCancel={this.onClose.bind(this)}
          width={500}
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
    $$state: state.oppactionlist
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