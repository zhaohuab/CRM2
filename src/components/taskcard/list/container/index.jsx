
import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Input, Radio, Form, Col, Row, Modal, Button, Icon } from 'antd';
import FormCard from './listForm.jsx';
import Cards from './card.jsx';
import './index.less'
let Search = Input.Search;
let RadioGroup = Radio.Group;
const ButtonGroup = Button.Group;
import 'assets/stylesheet/all/iconfont.css'
import * as Actions from "../action"

class List extends React.Component {
  constructor(props) {
    super(props)    
    this.state = {
      enable: 1,
      headLabel:false,
    }
  }

  onAdd=()=> {//添加按钮
    this.setState({ isEdit: false });
    this.props.action.showForm(true, {});
  }

  onClose=()=> {//弹出框的取消和关闭按钮
    this.props.action.showForm(false, {});
  }

  onSave() { //确认
    let isEdit = this.props.$$state.get("isEdit");
    let form = this.formRef.props.form;
    let data = form.getFieldsValue();
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
    if (isEdit) {
      this.props.action.onSave4Edit(data);
    }
    else {
      this.props.action.onSave4Add(data);
    }
  }

  onBack = () => { //列表头操作中的返回按钮
    this.setState({ headLabel: false });
  }

  renderCardList = (data) => {//循环生成卡片
    if (data){
      return data.map(item => {
        return (
        <Col span = { 6 }>
          <Cards dataSource = { item }/>
        </Col>
      )}) 
       
    }   
  } 

  componentWillMount() { this.props.action.getListData() }

  render() {   //只能通过this.props和this.state访问数据;不能在render方法中任何位置修改state状态或者是DOM输出；
    let page = this.props.$$state.get("data").toJS();
    let visible = this.props.$$state.get("visible");
    let editData = this.props.$$state.get("editData").toJS();
    const WrapCard = Form.create()(FormCard);
    return (
      <div className = 'user-warpper taskcard-user-warpper'>
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
          <div>
            <Row gutter={16}>
              {this.renderCardList(page.data)}
            </Row>
          </div>              
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

function mapStateToProps(state, ownProps) {
  return {
    $$state: state.taskcard
  }
}

function mapDispatchToProps(dispatch) {
  return {
      action: bindActionCreators(Actions, dispatch)
  }
}
export default  connect( mapStateToProps, mapDispatchToProps)(List);