import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Table, Modal, Button,Icon, Input, Radio, Popconfirm, Form, Row, Col, Select, Menu, Dropdown } from 'antd';
import enUS from 'antd/lib/locale-provider/en_US';
import Cards from './listForm.jsx';
import HeadLabel from './HeadLabel.jsx';
import Tables from './table.jsx';
import './index.less'
let Search = Input.Search;
let Option = Select.Option
let RadioGroup = Radio.Group;
let ButtonGroup = Button.Group;
import 'assets/stylesheet/all/iconfont.css'
import * as Actions from "../action"

class List extends React.Component {
  constructor(props) {
    super(props) 
    this.columns = [
      {
        title: '档案名称',
        dataIndex:'name',
        render:(text, record)=><a href='javascript:;' onClick={this.onDetail.bind(this,record)} style={{  textDecoration:'none' }}>{text}</a>,
      },
      {
        title: '档案描述',
        dataIndex: 'description',
      },
      {
        title: '系统档案',
        dataIndex: 'isDefaultName',
      },
      {
        title: '状态',
        dataIndex: 'enableStateName',
      }
    ]

    this.state = {
      headLabel : false,
      selectedRowKeys : [],
      isEdit : false,
      enable : 1,
      pagination : {
        pageSize: 10,
        page: 1,
      },
      searchMap : {
        enableState: 1,
      }
    }
  }

 
  onDetail = (record) => {//详情展示;;
    this.props.action.onDetail(record, true)
  }

  onAdd = () => {
      this.setState({ isEdit: false });
      this.props.action.showFormAdd(true, {});   
  }

  onDelete = () => {
    let aa = this.state.selectedRowKeys;
    let { pagination, searchMap } = this.state;
    this.props.action.onDelete(this.state.selectedRowKeys, { pagination, searchMap });
    this.setState({ headLabel: false, selectedRowKeys: [] }); 
  }

  onEdit = (data) => {  
    this.setState({ isEdit: true });
    let rowData = {};
    if(data){//如果是从详情中点击的编辑按钮
      rowData=data;
      this.onClose('detail')
    }else{
      let rowKey = this.state.selectedRowKeys[0];
      let page = this.props.$$state.get("data").toJS();
      for(let i=0,len=page.data.length;i<len;i++) {
        if(rowKey == page.data[i].id) {
          rowData = page.data[i];
          break;
        }
      }
    }
    this.props.action.showFormEdit(true, rowData);
  }

  onClose = (detail) => {
    this.props.action.showForm(detail, false);
  }

  onEnable = (enable) => {
    return (enable) => {
      let { pagination, searchMap } = this.state;
      this.setState({ headLabel: false });
      this.props.action.onEnable(this.state.selectedRowKeys, enable, { pagination, searchMap });
    }
  }

  onSave = () => {
    let data = this.props.$$state.get("editData").toJS();
    data.baseDocDetailList = this.props.$$state.get('storage').toJS().filter(item=>item.name!='');
    this.formRef.props.form.validateFields((err, values) => {
      if (!err) {                  
        if (this.state.isEdit) {
          this.props.action.onSave4Edit(data);
        }else {
          this.props.action.onSave4Add(data);
        }   
      } 
    })
  }

  onSelectChange = (selectedRowKeys) => {
    let state = {
      selectedRowKeys: selectedRowKeys
    }
    state.headLabel = selectedRowKeys.length ? true : false;
    this.setState(state);
  }

  onBack = () => {
    this.setState({ headLabel: false,selectedRowKeys:[]});
  }

  onEableRadioChange = (e) => {
    let enable = e.target.value;
    let { pagination, searchMap } = this.state;
    searchMap.enableState = enable;
    this.props.action.getListData({ pagination, searchMap });
    this.setState({ enable, selectedRowKeys: [], searchMap });
  }
  showTotal = (total) => {
   return `共 ${total} 条`;
  }
  onPageChange = (page, pageSize) => { 
    let { pagination, searchMap } = this.state;
    pagination = { page: page, pageSize: pageSize };
    this.setState({ pagination })
    this.props.action.getListData({ pagination, searchMap });
  }
  onPageSizeChange = (current, pageSize) => {
    let { pagination, searchMap } = this.state;
    pagination = { page: pagination.page, pageSize: pageSize };
    this.setState({ pagination })
    this.props.action.getListData({ pagination, searchMap });
  }
  onChange = (data) => {
    this.props.action.valueChange(data)
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

  menu1 = (
    <Menu>
      <Menu.Item key="0">全部</Menu.Item>
      <Menu.Item key="1">最近创建</Menu.Item>
      <Menu.Item key="2">最近查看</Menu.Item>
    </Menu>
  );
  menu2 = (
    <Menu>
      <Menu.Item key="0">导入</Menu.Item>
      <Menu.Divider />
      <Menu.Item key="2">导出</Menu.Item>
    </Menu>
  );

  componentDidMount() {
    let { pagination, searchMap } = this.state;
    this.props.action.getListData({ pagination, searchMap });
  }

  render() {
    let page = this.props.$$state.get("data").toJS();
    /* 后台返回来的数据中有一个total：73的键值对；这个导致'共73条'一直不会变化，后台只要动态返回数据库中的真实条数在这里，应该就没问题了 */
    let editData = this.props.$$state.get("editData").toJS();
    let detailContent = this.props.$$state.get("detailContent").toJS();
    let detailSource = this.props.$$state.get("detailSource").toJS();
    let detailVisible = this.props.$$state.get("detailVisible");
    let visible = this.props.$$state.get("visible");
    let searchKey = this.props.$$state.get("searchKey");
    let enableState = this.props.$$state.get("enableState");
    let { headLabel, selectedRowKeys } = this.state;
    let rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
    };
    let detail = this.props.action.detail;
    return (
      <div className= 'user-warpper'>
        {
          headLabel ? 
          <div className= 'head_edit'>
            <HeadLabel selectedRowKeys= { selectedRowKeys } onBack= { this.onBack }>
            {             
              this.state.selectedRowKeys.length == 1 ? <Button className="default_button" onClick = { this.onEdit.bind(this,false) }><i className = 'iconfont icon-bianji'></i>编辑</Button> :''}
                    
              <Popconfirm placement = "bottom"  title = '确认删除' onConfirm = { this.onDelete } okText = '是' cancelText = '否'>
                <Button className = "default_button" ><i className = 'iconfont icon-shanchu'>删除</i></Button>
              </Popconfirm>
              
              { this.state.enable == 1 ? <Button className = "default_button" onClick = { this.onEnable(2).bind(this, 2) }><i className = 'iconfont icon-tingyong'></i>停用</Button>:
              <Button className = "default_button" onClick = { this.onEnable(1).bind(this, 1) }><i className = 'iconfont icon-qiyong-lanse'></i>启用</Button>}
              <Button className = "default_button"><i className = 'iconfont icon-fenpeijiaose'></i>分配角色</Button>
            </HeadLabel> 
          </div>: 
          <div className = 'head_panel'>
               <div className='head_panel-left'>
                <Dropdown overlay={this.menu1} trigger={['click']}>
                  <span className="ant-dropdown-link" style={{cursor:'pointer', margin:'0 20px'}}>
                    最近查看 <Icon type="down" />
                  </span>
                </Dropdown>
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
              <div className = 'head_panel-right'>
                <Button  type = "primary" className = "button_add" onClick = { this.onAdd.bind(this) }><Icon type = "plus" />新增</Button>          
                <Dropdown overlay={this.menu2} trigger={['click']} className = 'add-more' >
                  <Button className="ant-dropdown-link" style={{cursor:'pointer', margin:'0 10px'}}>更多</Button>
                </Dropdown>
              </div>
          </div>
        }

        <div className = "list-box" >
          <Table
            size = "middle"
            columns = { this.columns }
            dataSource = { page.data }
            rowSelection = { rowSelection }
            rowKey = "id"
            pagination={{
              size: "large",
              showSizeChanger: true,
              showQuickJumper: true,
              total: page.total,
              showTotal: this.showTotal, 
              onChange: this.onPageChange.bind(this), 
              onShowSizeChange: this.onPageSizeChange.bind(this) }}
          />
        </div>
        <Modal
          title = { headLabel ? '编辑' : '新增' }
          visible = { visible }
          onOk = { this.onSave.bind(this) }
          onCancel = { this.onClose.bind(this) }
          width= { 500 }
        >
          <div className = 'model-height' id = 'doc'>
            <Cards           
              editData = { editData } 
              onChange={ this.onChange.bind(this) }
              wrappedComponentRef={ ref => this.formRef = ref } 
            />
          </div>
        </Modal>
        <Modal
          title = '详情'
          visible = { detailVisible }
          cancelText = {<span><Icon type="poweroff" />关闭</span>}
          okText = {<span><Icon type="edit" />编辑</span>}
          onOk = { this.onEdit.bind(this,detailContent) }
          onCancel = { this.onClose.bind(this,'detail') }
          width= { 500 }
        >
          <div className = 'model-height' id = 'doc'>           
            <Row gutter={16} style={{marginTop:'20px'}}>
              <Col span={8}><span style={{float:'right'}}>档案名称：</span></Col>
              <Col span={10}>{detailContent.name}</Col>
              <Col style={{color:'rgb(102,144,204)'}} span={6}>{detailContent.isDefault==1?'系统档案':''}</Col>
            </Row>  
            <Row gutter={16} style={{marginTop:'20px'}}>
              <Col span={8}><span style={{float:'right'}}>档案描述：</span></Col>
              <Col span={16}>{detailContent.description}</Col>
            </Row>
            <Row gutter={16} style={{marginTop:'20px'}}>
              <Col span={8}><span style={{float:'right'}}>档案明细：</span></Col>
              <Col span={12}>           
                {
                  detailSource.map(item=>{     
                    return (
                      <div style={{marginBottom:'15px',overflow: 'hidden', whiteSpace: 'nowrap' ,textOverflow: 'ellipsis'}}>
                        {item.enableState==1?<span>{item.name}</span>:<span style={{color:'#f3f3f3'}}>{item.name}</span>}
                      </div>
                    )
                  })
                }
              </Col>
              <Col span={4}></Col>
            </Row>
          </div>
        </Modal>
      </div>
    )
  }
}

function mapStateToProps(state, ownProps) {
  return {
    $$state: state.doc
  }
}

function mapDispatchToProps(dispatch) {
  return {
      action: bindActionCreators(Actions, dispatch)
  }
}

export default  connect( mapStateToProps, mapDispatchToProps)(List);

/* 
 未解决：新增和编辑之后，立即点击详情按钮，会报错，说id不能为空

*/