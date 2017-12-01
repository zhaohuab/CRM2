
import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Input, Radio, Form, Col, Row, Modal, Button, Icon, Select } from 'antd';
import FormCard from './listForm.jsx';
import Cards from './card.jsx';
import './index.less'
let Search = Input.Search;
const Option = Select.Option
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
      more:false,
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
    let data = this.props.$$state.get("editData").toJS()
    this.formRef.props.form.validateFieldsAndScroll((err, values) => {
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

  typeSelected = (id) => {//选择业务对象
    this.props.action.typeSelected(id)
  }
  
  inputChange = (e) => {//搜索中的输入框
    let { value } = e.target;
    this.props.action.inputChange(value)
  }

  selectChange = (value) => {//搜索中的选择框
    this.props.action.selectChange(value)
  }

  onSearch = (flag) => {//搜索
    let searchKey = this.props.$$state.get('searchKey');
    let enableState = this.props.$$state.get('enableState');
    if (flag){//如果只点击输入框的搜索按钮
      let data = {};
      if(searchKey){
        data.searchKey=searchKey;
      }
      this.props.action.search(data)
    }else{
      let data = {};
      if(searchKey){ data.searchKey=searchKey;}
      data.enableState=enableState; 
      this.props.action.search(data)
    }
  }

  moreCard = () => {//显示更多
    this.setState({more:!this.state.more})
  }

  componentWillMount() { this.props.action.getListData() }

  render() { 
    let page = this.props.$$state.get("data").toJS();
    let data = page.data || [];
    this.state.more ? null : data = data.slice(0,12);   
    let visible = this.props.$$state.get("visible");
    let more = this.props.$$state.get("more");
    let editData = this.props.$$state.get("editData").toJS();
    let searchKey = this.props.$$state.get("searchKey");
    let enableState = this.props.$$state.get("enableState");
    
    return (
      <div className = 'user-warpper taskcard-user-warpper'>
          <div className='head_panel'>
              <div className='head_panel-left'>
                <div>
                  <Search
                    className = 'search'
                    placeholder="请输入"
                    style={{ width: 200 }}
                    value={searchKey}
                    onChange={this.inputChange.bind(this)}
                    onSearch={this.onSearch.bind(this,true)}
                  />
                </div>
                <div className='head_panel-state'>
                  <Select value={enableState}  onChange={this.selectChange.bind(this)} style={{ width: 120 }}>
                    <Option value = { 1 }>启用状态</Option>
                    <Option value = { 2 }>停用状态</Option>
                  </Select>
                </div>
                <span onClick={this.onSearch.bind(this,false)} style={{marginLeft:'20px',cursor:'pointer'}}>搜索</span>
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
              {this.renderCardList(data)}
            </Row>
          </div>
          { more ? <div onClick={this.moreCard} style={{marginTop:'15px',fontSize:'20px', cursor:'pointer'}}>{this.state.more?'收起':'更多' }</div>:'' }
        <Modal
          title = "新增任务卡"
          visible = { visible }
          onOk = { this.onSave.bind(this) }
          onCancel = { this.onClose.bind(this) }
          width = { 500 }
        >
          <div className='model-height'>
              <FormCard dataSource={editData} wrappedComponentRef={(inst) => this.formRef = inst}/>
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