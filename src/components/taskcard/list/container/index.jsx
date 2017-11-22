/**
 * Created by litcb on 2017-08-30
 */
import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Table, Modal, Button, Icon, Checkbox  } from 'antd';
import { Input, Radio, Popconfirm, Form, Col, Row } from 'antd';
import FormCard from './listForm.jsx';
import Cards from './card.jsx';
import HeadLabel from './HeadLabel.jsx';

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
        title: '业务对象',
        dataIndex: 'mtObjName',
      },
      {
        title: '业务类型',
        dataIndex:'mtBiztypeName',
      },
      {
        title: '简介',
        dataIndex: 'remark',
      },
      {
        title: '创建人',
        dataIndex: 'userName',
      },
      {
        title: '创建时间',
        dataIndex: 'sysCreatedTime',
      }    
    ]

    this.state = {
      isEdit: false,
      enable: 1,
      headLabel:false,
    }
  }

  onAdd=()=> {//添加按钮
    this.setState({ isEdit: false });
    this.props.action.showForm(true, {});
  }

  singleDelete = (id) => {//删除按钮
    let arr = [];
    arr.push(id);
    this.props.action.onDelete(arr);
  }
   onDelete = () => {
     let { selectedRowKeys } = this.state;
     //debugger;
     this.props.action.onDelete(selectedRowKeys);
     this.setState({selectedRowKeys:[], headLabel:false})
   }
  /*
    let rowKey = this.state.selectedRowKeys[0];
    let rowData = {};
    let page = this.props.$$state.get("data").toJS();
    for (let i=0, len=page.data.length; i<len; i++) {
      if (rowKey == page.data[i].id) {
        rowData = page.data[i];
        break;
      }
    }
   */
  onEdit = (item) => { //编辑按钮
    this.setState({ isEdit: true });
    this.props.action.showForm(true, item);
  }
  onClose=()=> {//弹出框的取消和关闭按钮
    this.props.action.showForm(false, {});
  }
  onEnable=(enable)=> { //停启用
    return (enable) => {
      let { pagination, searchMap } = this.state;
      this.setState({ headLabel: false });
      this.props.action.onEnable(this.state.selectedRowKeys, enable, { pagination, searchMap });
    }
  }

  onSave() { //确认
    let form = this.formRef.props.form;
    let data = form.getFieldsValue();
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
    if (this.state.isEdit) {
      this.props.action.onSave4Edit(data);
    }
    else {
      this.props.action.onSave4Add(data);
    }
    
  }
  onSelectChange = (id,e) => { //选中列表数据触发
    let { selectedRowKeys, headLabel } =this.state;
     if (e.target.checked){
       selectedRowKeys.push(id)
     }else{
       selectedRowKeys=selectedRowKeys.filter(item => item.id==id)
     }
    headLabel = selectedRowKeys.length ? true : false;
    this.setState({selectedRowKeys:selectedRowKeys,headLabel:headLabel});
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
  singleOPerate=()=>{//单个卡片删除编辑显隐
    //debugger;
     let operate1 = this.state.operate;
     operate1 = !operate1;
     this.setState({operate:operate1})
  }
   renderCardList=(data)=>{//循环生成卡片
    if(data){
      return data.map(item => {
        return (
        <Col span={6}>
          <Cards dataSource={item}/>
        </Col>
      )}) 
       
    }   
  } 
  componentWillMount() {
    this.props.action.getListData({});
  }

  render() {   //只能通过this.props和this.state访问数据;不能在render方法中任何位置修改state状态或者是DOM输出；
    let page = this.props.$$state.get("data").toJS();
    let visible = this.props.$$state.get("visible");
    let editData = this.props.$$state.get("editData").toJS();
    let selectedRowKeys = this.props.$$state.get("selectedRowKeys").toJS();
    let headLabel =  selectedRowKeys.length ? true : false;
    const WrapCard = Form.create()(FormCard);
    return (
      <div className = 'user-warpper taskcard-user-warpper'>
        {
          headLabel ? 
          <div className='head_edit'>
            <HeadLabel selectedRowKeys={selectedRowKeys} onBack={this.onBack}>
              { selectedRowKeys.length === 1 ?
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
        
          <Row gutter={16}>
           {this.renderCardList(page.data)}
          </Row>
              
        <Modal
          title = "新增任务卡"
          visible = { visible }
          onOk = { this.onSave.bind(this) }
          onCancel = { this.onClose.bind(this) }
          width = { 500 }
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





/*  {
   column.map((item,index)=> {
                return  <p>{item.title}:{data[index][item.dataIndex]}</p>
              })
            } */ 






            /* 
                <a href="javascript:;" onClick={this.singleOPerate.bind(this)}>操作{
                    this.state.operate ? 
                    <div>
                    <a href='javascript:;' onClick= {this.singleDelete.bind(this,item.id)}>删除</a>
                    <a href='javascript:;' onClick = {this.onEdit(this,item)}>编辑</a>
                    </div>:''
                }</a>*/