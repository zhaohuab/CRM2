
import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Input, Col, Row, Modal, Button, Select } from 'antd';
import Cards from './card.jsx';
import './index.less'
let Search = Input.Search;
const Option = Select.Option
import 'assets/stylesheet/all/iconfont.css'
import * as Actions from "../action"
import TaskCards from './transform/index.jsx'

class List extends React.Component {
  constructor(props) {
    super(props)    
    this.state = {
      more:false
    }
  }

  refresh = () => { this.props.action.getListData() };//刷新按钮

  onClose=()=> {//弹出框的取消和关闭按钮
    this.props.action.showForm(false, {});
  }

  onSave() { //保存
    let editData =this.props.$$state.get("editData").toJS();
    let id = editData.id;
    let num=1;
    let checkedData = this.props.$$state.get("checkedData").toJS();
    checkedData.forEach(item=>{
      item.visitruleId=id;
      item.orderNum=num;
      num++;
    })
    this.props.action.onSave4Edit(id, checkedData)
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
      data.searchKey=searchKey;
      this.props.action.search(data)
    }else{
      let data = {};
      data.searchKey=searchKey;
      data.enableState=enableState; 
      this.props.action.search(data)
    }
  }

  moreCard = () => {//显示更多
    this.setState({more:!this.state.more})
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

  render() {
    let page = this.props.$$state.get("data").toJS();
    let moreData = page.voList ? page.voList.slice(0,12) : [];
    let data = this.state.more ? page.voList:moreData;
    let visible = this.props.$$state.get("visible");
    let more = this.props.$$state.get("more");
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
                <Button type="primary" className="button_add" onClick={ this.refresh }>刷新</Button>
              </div>
          </div>
          <div>
            <Row gutter={16}>
              {this.renderCardList(data)}
            </Row>
          </div>
         { more ? <div onClick={this.moreCard} style={{marginTop:'15px',fontSize:'20px', cursor:'pointer'}}>{this.state.more?'收起':'更多' }</div>:'' }
        <Modal
          title = "任务卡"
          visible = { visible }
          onOk = { this.onSave.bind(this) }
          onCancel = { this.onClose.bind(this) }
          width = { 800 }
        >
          <div className='model-height'>
          <TaskCards />
          </div>
        </Modal>
      </div>
    )
  }
}

function mapStateToProps(state, ownProps) {
  return {
    $$state: state.visitrules
  }
}
function mapDispatchToProps(dispatch) {
  return {
    action: bindActionCreators(Actions, dispatch)
  }
}
export default  connect( mapStateToProps, mapDispatchToProps)(List);