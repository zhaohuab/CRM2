import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { LocaleProvider, Table, Modal, Button,Icon, Input, Radio, Popconfirm, Form } from 'antd';
import enUS from 'antd/lib/locale-provider/en_US';
import Card from './listForm.jsx';
import HeadLabel from './HeadLabel.jsx';
import Tables from './table.jsx';
import './index.less'
let Search = Input.Search;
let RadioGroup = Radio.Group;
const ButtonGroup = Button.Group;
import 'assets/stylesheet/all/iconfont.css'
import * as Actions from "../action"
import  en from './lang/en/en_header.jsx'
import  zh from './lang/zh/zh_header.jsx'

class List extends React.Component {
  constructor(props) {
    super(props) 
    let lang = this.props.$$state.get("lang")
    let title = this.getLang(lang, 'damc')  
    this.columns = [
      {
        title: title,
        dataIndex:'name',
      },
      {
        title: '档案描述',
        dataIndex: 'description',
        render:(text, record)=><a href='javascript:;' onClick={this.onDetail.bind(this,record)}>{text}</a>
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

 
  onDetail = (record) => {//详情展示

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

  onEdit = () => {  
    this.setState({ isEdit: true });
    let rowKey = this.state.selectedRowKeys[0];
    let rowData = {};
    let page = this.props.$$state.get("data").toJS();
    for(let i=0,len=page.data.length;i<len;i++) {
      if(rowKey == page.data[i].id) {
        rowData = page.data[i];
        break;
      }
    }
    this.props.action.showFormEdit(true, rowData);
  }

  onClose = () => {
    this.props.action.showForm(false, {});
  }

  onEnable = (enable) => {
    return (enable) => {
      let { pagination, searchMap } = this.state;
      this.setState({ headLabel: false });
      this.props.action.onEnable(this.state.selectedRowKeys, enable, { pagination, searchMap });
    }
  }

  componentDidMount() {
    let { pagination, searchMap } = this.state;
    this.props.action.getListData({ pagination, searchMap });
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
    this.setState({ eadLabel: false });
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
    console.info(`pageSize: ${pageSize}`)
  }
  onChange = (data) => {
    this.props.action.valueChange(data)
  }
  langChange = (lan) => {//语言变换
    this.props.action.langChange(lan)
  }
  getLang = (lan, name) => {
    let key;
    switch (lan){
      case 'zh':
        key = zh[name]
        break;
      case 'en':
        key = en[name]
        break
    }
    return key
  }

  render() {
    let lang = this.props.$$state.get("lang")
    let getLang = this.getLang;
    let page = this.props.$$state.get("data").toJS();
     let editData = this.props.$$state.get("editData").toJS();
    let visible = this.props.$$state.get("visible");
    let { headLabel, selectedRowKeys } = this.state;
    let rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
    };
    const detail = this.props.action.detail;
    return (
      <div className= 'user-warpper'>
        {
          headLabel ? 
          <div className= 'head_edit'>
            <HeadLabel selectedRowKeys= { selectedRowKeys } onBack= { this.onBack } getLang={getLang} lang={lang}>
            {             
              this.state.selectedRowKeys.length == 1 ? <Button className="default_button" onClick = { this.onEdit.bind(this) }><i className = 'iconfont icon-bianji'></i>'编辑'</Button> :''}
                    
              <Popconfirm placement = "bottom"  title = '确认删除' onConfirm = { this.onDelete } okText = '是' cancelText = '否'>
                <Button className = "default_button" ><i className = 'iconfont icon-shanchu'>'删除'</i></Button>
              </Popconfirm>
              
              { this.state.enable == 1 ? <Button className = "default_button" onClick = { this.onEnable(2).bind(this, 2) }><i className = 'iconfont icon-tingyong'></i>'停用'</Button>:
              <Button className = "default_button" onClick = { this.onEnable(1).bind(this, 1) }><i className = 'iconfont icon-qiyong-lanse'></i>'启用'</Button>}
              <Button className = "default_button"><i className = 'iconfont icon-fenpeijiaose'></i>'分配角色'</Button>
            </HeadLabel> 
          </div>: 
          <div className = 'head_panel'>
              <div className = 'head_panel-left'>
                <div>
                  <span className = 'deep-title-color'>'所属部门':</span>
                  <Input
                    placeholder = "请选择..."
                    className = "search"
                    onSearch = { value => console.log(value) }
                  />
                </div>
                <div className = 'head_panel-state'>
                  <span className = 'simple-title-color'>{getLang.call(this,lang,'zt')}：</span>
                  <RadioGroup onChange = { this.onEableRadioChange } value = { this.state.enable } className = 'simple-title-color'>
                    <Radio value = { 1 }>{getLang.call(this,lang,'qy')}</Radio>
                    <Radio value = { 2 }>{getLang.call(this,lang,'zt')}</Radio>
                  </RadioGroup>
                </div>
              </div>
              <div className = 'head_panel-right'>
                <ButtonGroup className = 'add-more'>
                  <Button onClick = {this.langChange.bind(this,'zh')}><i className = 'iconfont icon-daochu' ></i>中文</Button>
                  <Button onClick = {this.langChange.bind(this,'en')}><i className = 'iconfont icon-daoru' ></i>English</Button>
                </ButtonGroup>
                <Button  type = "primary" className = "button_add" onClick = { this.onAdd.bind(this) }><Icon type = "plus" />{getLang.call(this,lang,'xz')}</Button>
              </div>
          </div>
        }

        <div className = "list-box" >
        <LocaleProvider locale={lang=='en'?enUS:''}>
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
              showTotal: this.showTotal.bind(this, lang, 'gong', 'tiao'), 
              onChange: this.onPageChange.bind(this), 
              onShowSizeChange: this.onPageSizeChange.bind(this) }}
          />
          </LocaleProvider>
        </div>
        <LocaleProvider locale = { lang == 'en' ? enUS : '' }>
        <Modal
          title = { headLabel ? getLang(lang,'bj') : getLang(lang,'xz') }
          visible = { visible }
          onOk = { this.onSave.bind(this) }
          onCancel = { this.onClose.bind(this) }
          width= { 500 }
        >
          <div className = 'model-height' id = 'doc'>
            <Card
              getLang = { getLang }              
              editData = { editData } 
              onChange={ this.onChange.bind(this) }
              wrappedComponentRef={ ref => this.formRef = ref } 
            />
          </div>
        </Modal>
        </LocaleProvider>
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
