/**
 * Created by litcb on 2017-08-30
 */
import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Table, Modal, Button,Icon } from 'antd';
import { Input, Radio, Popconfirm, Form } from 'antd';
import Card from './listForm.jsx';
import HeadLabel from './HeadLabel.jsx';
import Department from 'components/refs/departments'
import './index.less'
let Search = Input.Search;
let RadioGroup = Radio.Group;
const ButtonGroup = Button.Group;
import 'assets/stylesheet/all/iconfont.css'

//导入action方法
import * as Actions from "../action"

class List extends React.Component {
  constructor(props) {
    super(props)    
    this.columns = [
      {
        title: '序号',
        dataIndex: 'id',
      },
      {
        title: '名称',
        dataIndex:'name',
      },
      
      {
        title: '业务对象',
        dataIndex: 'mtObjName',
      },
      {
        title: '业务类型',
        dataIndex: 'mtBiztypeName',
      },
      {
        title: '状态',
        dataIndex: 'enableStateName',
      },
      {
        title: '创建人',
        dataIndex: 'userName',
      },
      {
        title: '备注',
        dataIndex: 'remark',
      }
    ]
    this.state = {
      headLabel: false,
      selectedRowKeys: [],
      isEdit: false,
      enable: 1,
      pagination: {
        pageSize: 10,
        page: 1,
      },
      searchMap: {
        enableState: 1,
      }
    }
  }

  componentDidMount() {
    let { pagination, searchMap } = this.state;
    this.props.action.getListData({ pagination, searchMap });
  }

  onAdd() {//添加按钮
    this.setState({ isEdit: false });
    this.props.action.showForm(true, {});
  }
  onDelete = () => {//删除按钮
    let { pagination, searchMap } = this.state;
    this.props.action.onDelete(this.state.selectedRowKeys, { pagination, searchMap });
    this.setState({ headLabel: false, selectedRowKeys: [] });
  }
  onEdit = () => { //编辑按钮
    this.setState({ isEdit: true });
    let rowKey = this.state.selectedRowKeys[0];
    let rowData = {};
    let page = this.props.$$state.get("data").toJS();
    for (let i=0, len=page.data.length; i<len; i++) {
      if (rowKey == page.data[i].id) {
        rowData = page.data[i];
        break;
      }
    }
    this.props.action.showForm(true, rowData);
  }
  onClose() {//弹出框的取消和关闭按钮
    this.props.action.showForm(false, {});
  }
  onEnable(enable) { //停启用
    return (enable) => {
      let { pagination, searchMap } = this.state;
      this.setState({ headLabel: false });
      this.props.action.onEnable(this.state.selectedRowKeys, enable, { pagination, searchMap });
    }
  }
  onSave() { //确认
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
  onSelectChange = (selectedRowKeys) => { //选中列表数据触发
    let state = {//如果这个state中只有一个参数的话，是否setState的时候就只会改变全局state中的同名参数，而不是把全局state覆盖掉了？
      selectedRowKeys: selectedRowKeys
    }
    state.headLabel = selectedRowKeys.length ? true : false;
    this.setState(state);
  }
  onBack = () => { //列表头操作中的返回按钮
    this.setState({ headLabel: false });
  }
  onEableRadioChange = (e) => { //停启用选择
    let enable = e.target.value;
    let { pagination, searchMap } = this.state;
    //可能有问题
    searchMap.enableState = enable;
    this.props.action.getListData({ pagination, searchMap });
    this.setState({ enable, selectedRowKeys: [], searchMap });
  }
  showTotal (total) { //显示条数
    return `共 ${total} 条`;
  }
  onPageChange (page, pageSize) { //页面跳转
    let { pagination, searchMap } = this.state;
    //可能有问题
    pagination = { page: page, pageSize: pageSize };
    this.setState({ pagination })
    this.props.action.getListData({ pagination, searchMap });
  }
  onPageSizeChange (current, pageSize) { //页面条数
    let { pagination, searchMap } = this.state;
    pagination = { page: pagination.page, pageSize: pageSize };
    this.setState({ pagination })
    this.props.action.getListData({ pagination, searchMap });
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
      <div className = 'user-warpper'>
        {
          headLabel ? 
          <div className='head_edit'>
            <HeadLabel selectedRowKeys={selectedRowKeys} onBack={this.onBack}>
              { this.state.selectedRowKeys.length === 1 ?
                <Button className="default_button" onClick={this.onEdit}><i className='iconfont icon-bianji'></i>编辑</Button> : ''}
              <Popconfirm placement="bottom"  title="确认删除吗" onConfirm={this.onDelete} okText="是" cancelText="否">
                <Button className="default_button" ><i className='iconfont icon-shanchu'></i>删除</Button>
              </Popconfirm>
              
              {this.state.enable==1 ? <Button className="default_button" onClick={this.onEnable(2).bind(this,2)}><i className='iconfont icon-tingyong'></i>停用</Button>:
              <Button className="default_button" onClick={this.onEnable(1).bind(this,1)}><i className='iconfont icon-qiyong-lanse'></i>启用</Button>}
              <Button className="default_button"><i className='iconfont icon-fenpeijiaose'></i>分配角色</Button>
            </HeadLabel> 
          </div>: 
          <div className='head_panel'>
              <div className='head_panel-left'>
                <div>
                  <span className='deep-title-color'>所属部门：</span>
                  <Input
                    placeholder="请选择..."
                    className="search"
                    onSearch={value => console.log(value)}
                  />
                </div>
                <div className='head_panel-state'>
                  <span className='simple-title-color'>状态：</span>
                  <RadioGroup onChange={this.onEableRadioChange} value={this.state.enable} className='simple-title-color'>
                    <Radio value={1}>启用</Radio>
                    <Radio value={2}>停用</Radio>
                  </RadioGroup>
                </div>
              </div>
              <div className='head_panel-right'>
                <ButtonGroup className='add-more'>
                  <Button><i className='iconfont icon-daochu'></i>导入</Button>
                  <Button><i className='iconfont icon-daoru'></i>导出</Button>
                </ButtonGroup>
                <Button type="primary" className="button_add" onClick={this.onAdd.bind(this) }><Icon type="plus" />新增</Button>
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
            pagination={{size:"large",showSizeChanger:true,showQuickJumper:true,total:page.total,showTotal:this.showTotal,onChange:this.onPageChange.bind(this),onShowSizeChange:this.onPageSizeChange.bind(this)}}
          />
        </div>
        <Modal
          title="新增任务卡"
          visible={visible}
          onOk={this.onSave.bind(this)}
          onCancel={this.onClose.bind(this)}
          width={500}
        >
          <div className='model-height'>
            <WrapCard dataSource={editData} wrappedComponentRef={(inst) => this.formRef = inst}/>
          </div>
        </Modal>
      </div>
    )
  }
}

//绑定状态到组件props
function mapStateToProps(state, ownProps) {
  return {
    $$state: state.taskcard
  }
}

//绑定action到组件props
function mapDispatchToProps(dispatch) {
  return {
      action: bindActionCreators(Actions, dispatch)
  }
}

//输出绑定state和action后组件
export default  connect( mapStateToProps, mapDispatchToProps)(List);