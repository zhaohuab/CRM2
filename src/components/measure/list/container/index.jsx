import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Table, Modal, Button ,Radio,Icon ,Form, Popconfirm,Select,Row, Col} from 'antd';

import HeadLabel from './HeadLabel.jsx';
import Card from './Card.jsx'
import './index.less'
import {Input} from 'antd';
//导入action方法
import * as Actions from "../action"
import LessForm from "./lessForm.jsx";
const Option = Select.Option;
let Search = Input.Search;
let RadioGroup = Radio.Group;
let ButtonGroup = Button.Group;
const confirm = Modal.confirm;
class List extends React.Component {
  constructor(props) {
    super(props)
    this.columns = [
      {
        title: '代号',
        dataIndex:'code',
      },
      {
        title: '名称',
        dataIndex:'name',
      },
      {
        title: '精度',
        dataIndex:'precision',
      },
      {
        title: '对应ERP',
        dataIndex:'erpCode',
      },
      {
        title: '启用状态',
        dataIndex:'enableState',
        render:(text,record,index) => (
          text == 2? text = "停用" : text = "启用"
         )
      },
    ]

    this.state = {
      headLable : false,
      selectedRowKeys : [],
      isEdit:false,
      pagination : {
        pageSize:10,
        page:1,
      },
    }
  }
  componentDidMount() {
    let { pagination ,searchMap } = this.state;
    this.props.action.getListData({pagination});
  }
  onSelectChange = (selectedRowKeys) => {
    let state = {
      selectedRowKeys:selectedRowKeys
    }
    state.headLabel = selectedRowKeys.length ? true:false;
    this.setState(state);
  }
  onAdd() {
    this.setState({isEdit:false});
    this.props.action.showForm(true,{});
  }
  onEdit = () => {
    
    this.setState({isEdit:true});
    let rowKey = this.state.selectedRowKeys[0];
    let rowData = {};
    let page = this.props.$$state.get("data").toJS();
    for(let i=0,len=page.data.length;i<len;i++) {
      if(rowKey == page.data[i].id) {
        rowData = page.data[i];
        break;
      }
    }
    this.props.action.showForm(true,rowData);
  }
  onDelete=()=>{
    let { pagination,searchMap } = this.state;
    let that = this;
    confirm({
      title: '确定要删除吗?',
      content: '此操作不可逆',
      okText: '是',
      okType: 'danger',
      cancelText: '否',
      onOk() {
        that.props.action.onDelete(that.state.selectedRowKeys,{ pagination });
        that.setState({headLabel:false,selectedRowKeys:[]});
      },
      onCancel() {
          console.log('Cancel');
      },
    });
    
  }
  onClose() {
    this.props.action.showForm(false,{});
  }
  showTotal(total) {
    return `共 ${total} 条`;
  }
  onPageChange(page,pageSize) {
    let { pagination } = this.state;
    //可能有问题
    pagination = {page:page,pageSize:pageSize};
    this.setState({pagination})
    this.props.action.getListData({ pagination });
  }
  onPageSizeChange(current,pageSize) {
    let { pagination } = this.state;
    pagination = {page:pagination.page,pageSize:pageSize};
    this.setState({pagination})
    this.props.action.getListData({ pagination, });
  }
  onBack = ()=>{
    this.setState({headLabel:false});
  }

  onEnable(enable) {
    return (enable) => {
      let { pagination } = this.state;
      this.setState({ headLabel: false, selectedRowKeys: [] });
      this.props.action.onEnable(this.state.selectedRowKeys, enable, { pagination });
    }
  }

  onEableRadioChange = (enableState) => {
     let { pagination,searchMap,selectedRowKeys} = this.state;
     let ids = selectedRowKeys.join();    
     this.props.action.changeEnableState( enableState,ids,pagination,searchMap );
   }

  onSearch(searchMap) {
    //this.setState({ searchMap });
    let { pagination } = this.state;
    this.props.action.getListData({ pagination, searchMap });
    //this.props.action.getListData({pagination});
  }

  onSave() {
    let form = this.formRef.props.form;
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
    if(this.state.isEdit) {
      this.props.action.onSave4Edit(form.getFieldsValue());
    }
    else {
      this.props.action.onSave4Add(form.getFieldsValue());
    }
    
  }
  render() {
    let {headLabel,selectedRowKeys} = this.state;
    
    let rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
    };
    let visible = this.props.$$state.get("visible");
    let page = this.props.$$state.get("data").toJS();
    let editData = this.props.$$state.get("editData").toJS();
    let lessFormData = this.props.$$state.get("lessFormData").toJS();
    const WrapCard = Form.create()(Card);
    return (
      <div className='measure-warpper'>
        {
          headLabel?
          <div className='head_edit'>
              <HeadLabel selectedRowKeys={selectedRowKeys} onBack={this.onBack}>
                {selectedRowKeys.length != 1 ?
                  <Button className="default_button" disabled><i className='iconfont icon-bianji'></i>编辑</Button> :
                  <Button className="default_button" onClick={this.onEdit.bind(this)}><i className='iconfont icon-bianji'></i>编辑</Button>
                }               
                <Button className="default_button" onClick={this.onDelete.bind(this)}><i className='iconfont icon-shanchu'></i>删除</Button>               
                <Button className="default_button" onClick={this.onEableRadioChange.bind(this, 2)}><i className='iconfont icon-tingyong'></i>停用</Button>
                <Button className="default_button" onClick={this.onEableRadioChange.bind(this, 1)}><i className='iconfont icon-qiyong'></i>启用</Button>
              </HeadLabel>
            
          </div>:
         <Row 
           type="flex"
           align="middle"
            justify="space-between"
            className="header-top">
            <Col span={18}>
              <Row type="flex" align="middle">
                <Col className="select-recover">
                   <Select defaultValue="0">
                     <Option value="0">全部</Option>                                       
                      <Option value="1">最近查看</Option>                                       
                    </Select>
                  </Col>
                 <Col
                  span={18}
                   className={"less-show-height"}
                  >
                    <LessForm
                      dataSource={lessFormData}
                      handleSearch={this.onSearch.bind(this)} //点击查询方法
                     />
                  </Col>
              </Row>
             </Col>
             <Col span={6}>
                <Row type="flex" gutter={15} justify="end">
                   <Col>
                    <ButtonGroup>
                       <Button>
                         <i className="iconfont icon-daoru" />导入
                        </Button>
                        <Button>
                          <i className="iconfont icon-daochu" />导出
                        </Button>
                    </ButtonGroup>
                  </Col>
                   <Col>
                    <Button
                      type="primary"
                      onClick={this.onAdd.bind(this)}
                    >
                      <i className="iconfont icon-xinjian" />新建
                    </Button>
                  </Col>
                </Row>
              </Col>
           </Row>                           
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
          title="计量单位"
          visible={visible}
          onOk={this.onSave.bind(this)}
          onCancel={this.onClose.bind(this)}
          width={500}
          maskClosable={false}
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
    $$state: state.measureList
  }
}
//绑定action到组件props
function mapDispatchToProps(dispatch) {
  return {
      action : bindActionCreators(Actions, dispatch)
  }
}
//输出绑定state和action后组件
export default  connect( mapStateToProps, mapDispatchToProps)(List);