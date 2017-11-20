/**
 * Created by litcb on 2017-08-30
 */

import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Table, Modal, Button, Icon, Input, Radio, Popconfirm, Form } from 'antd';
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

    this.columns = [
      {
        title: '阶段名称',
        dataIndex: 'name',
      },
      {
        title: '阶段描述',
        dataIndex: 'description',
      },
      {
        title: '预制销售阶段',
        dataIndex: 'isPresetedName',
      },
      {
        title: '启用',
        dataIndex: 'enableStateName',
      }
    ]

    this.state = {
      isEdit: false,
      pagination: {
        pageSize: 10,
        page: 1,
      },
    }
    this.onSelectChange = (selectedRowKeys, selectedRows) => {
      this.props.action.selectData({ selectedRows, selectedRowKeys });
    };
  }

  componentDidMount() {
    this.props.action.getListData(this.props.$$state.get("pagination").toJS());
  }

  onAdd() {
    this.setState({ isEdit: false });
    this.props.action.showForm(true, {});
  }
  onDelete() {
    let that = this
    confirm({
      title: '确定要删除吗?',
      content: '此操作不可逆',
      okText: '是',
      okType: 'danger',
      cancelText: '否',
      onOk() {
        that.props.action.onDelete(that.props.$$state.get("selectedRowKeys").toJS(), that.props.$$state.get("pagination").toJS());
      },
      onCancel() {
        console.log('Cancel');
      },
    });

  }
  onEdit = () => {
    this.setState({ isEdit: true });
    let  rowData = this.props.$$state.get("selectedRows").toJS()[0];
    this.props.action.showForm(true, rowData);
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
    debugger
    let { $$state } = this.props;
    let page = $$state.get("data").toJS();
    let visible = $$state.get("visible");
    let selectedRows = $$state.get("selectedRows").toJS();
    let selectedRowKeys = $$state.get("selectedRowKeys").toJS();
    let rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange
    };
    let editData = $$state.get("editData").toJS();
    const WrapCard = Form.create()(Card);
    return (
      <div className='user-warpper'>
        {
          selectedRowKeys && selectedRowKeys.length ?
            <div className='head_edit'>


              <HeaderButton
                length={selectedRows.length}
                goBack={this.onBack.bind(this)}>
                {selectedRows.length != 1 ?
                  <Button className="default_button" disabled><i className='iconfont icon-bianji'></i>编辑</Button> :
                  <Button className="default_button" onClick={this.onEdit.bind(this)}><i className='iconfont icon-bianji'></i>编辑</Button>
                }

                <Button className="default_button" onClick={this.onDelete.bind(this)}><i className='iconfont icon-shanchu'></i>删除</Button>

                <Button className="default_button" onClick={this.onEnable(2).bind(this, 2)}><i className='iconfont icon-tingyong'></i>停用</Button>
                <Button className="default_button" onClick={this.onEnable(1).bind(this, 1)}><i className='iconfont icon-qiyong'></i>启用</Button>

              </HeaderButton>
            </div>


            :
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
            dataSource={page.voList}
            rowSelection={rowSelection}
            rowKey="id"
            pagination={{ size: "large", showSizeChanger: true, showQuickJumper: true, total: page.total, showTotal: this.showTotal, onChange: this.onPageChange.bind(this), onShowSizeChange: this.onPageSizeChange.bind(this) }}
          />
        </div>
        <Modal
          title={this.state.isEdit ? "编辑销售阶段" : "新增销售阶段"}
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
    $$state: state.oppstagelist
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