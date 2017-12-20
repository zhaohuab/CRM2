import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Table, Modal, Button, Icon,Input, Radio, Popconfirm, Form,Row,Col,Select } from 'antd';
import WrappedCard from './CardForm.jsx';
import HeadLabel from './HeadLabel.jsx';
import AttrTable from './AttrTable.jsx'
import AttrVaTable from './AttrVaTable.jsx'
import AttrGrpDeTable from './AttrGroupDetailTable.jsx'
import './index.less'
const ButtonGroup = Button.Group;
const confirm = Modal.confirm;
const Search = Input.Search;
const FormItem = Form.Item;
const Option = Select.Option;
import 'assets/stylesheet/all/iconfont.css'
import LessForm from "./lessForm.jsx";
//导入action方法
import * as Actions from "../action"

class List extends React.Component {
  constructor(props) {
    super(props)

    this.columns = [
      {
        title: '属性组名称',
        dataIndex: 'name',
        render:(text,record,index) => (
          <a onClick = {this.showDetail.bind(this,record)}>{text}</a>)
      },
      {
        title: '属性名',
        dataIndex: 'attrNames',
      },
      {
        title: '状态',
        dataIndex: 'enableStateName',
      }
    ]

    this.state = {
      headLabel: false,
      selectedRowKeys: [],
      status: "",
      pagination : {
        pageSize:10,
        page:1,
      },
      searchMap : {        
      }         
    }
  }

  componentDidMount() {
    let { pagination, searchMap } = this.state;
    this.props.action.getListData(pagination, searchMap);
  }

  onAdd() {
    this.setState({ status: "add" });
    this.props.action.showAddForm(true);
    this.props.action.getAttrList();
  }

  showDetail (record) {
    let id = record.id;  
    this.setState({ status: "showdetail" });
    this.props.action.getAttrGroupDetail(id, true);
  }

  onDelete(){
    let that = this
    let { pagination, searchMap } = this.state;
    confirm({
      title: '确定要删除吗?',
      content: '此操作不可逆',
      okText: '是',
      okType: 'danger',
      cancelText: '否',
      onOk() {
        that.props.action.onDelete(that.state.selectedRowKeys, pagination, searchMap);
        that.setState({ headLabel: false, selectedRowKeys: [] });
      },
      onCancel() {
        console.log('Cancel');
      },
    });  
  }

  onEdit = () => {
    this.setState({ status: "edit" });
    let rowKey = this.state.selectedRowKeys[0];
    let rowData = {};
    let data = this.props.$$state.get("data").toJS().data;
    for (let i = 0, len = data.length; i < len; i++) {
      if (rowKey == data[i].id) {
        rowData = data[i];
        break;
      }
    }
    let id = rowData.id;  
    let name = rowData.name;
    this.props.action.eidtAttrGroup(id, name);
  }


  onClose() {    
    this.props.action.showAddForm(false);    
  }

  onEableRadioChange = (enableState) => {
     let { pagination,searchMap,selectedRowKeys} = this.state;
     let ids = selectedRowKeys.join();     
     this.props.action.changeEnableState( enableState,ids,pagination,searchMap );
  }

  onSave() {
    let selectedRowKeys = this.props.$$state.get("selectedAttrVas").toJS();
    let attrId = this.props.$$state.get("attrId"); 
    let savedData = this.props.$$state.get("savedData").toJS();
    if(attrId !== undefined && attrId!== null && attrId !== ""){
      let selectedAttr = {id:attrId,selectedRowKeys:selectedRowKeys};
      savedData.push(selectedAttr);
    }  
    let attrList = [];
    for(let attr of savedData){
      for(let attrva of attr.selectedRowKeys){
        if(attrva.length == 0){
          return;
        }else{
          let data = {attrId:attr.id,attrBId:attrva};
          attrList.push(data);
        }        
      }      
    }
    let formData = this.props.$$state.get("formData").toJS();
    let save = {...formData, attrList:attrList};
    let { status } = this.state;
    if(status == "add"){
      this.props.action.onSave4Add(save);
    }else if(status == "edit"){
      let attrGrpId = this.props.$$state.get("attrGrpId");
      this.props.action.onSave4Edit(save,attrGrpId);
    }
    
  }

  onSelectChange = (selectedRowKeys) => {
    let state = {
      selectedRowKeys: selectedRowKeys
    }
    state.headLabel = selectedRowKeys.length ? true : false;
    this.setState(state);
  }

  onPageChange(page,pageSize) {
    let { pagination,searchMap } = this.state;
    pagination = {page:page,pageSize:pageSize};
    this.setState({pagination})
    this.props.action.getListData( pagination,searchMap );
  }

  onPageSizeChange(current,pageSize) {
    let { pagination,searchMap } = this.state;
    this.setState({pagination})
    this.props.action.getListData( pagination,searchMap );
    console.info(`pageSize:${pageSize}`)
  }

  onBack = () => {
    this.setState({ headLabel: false });
  }

  showTotal(total) {
    return `共 ${total} 条`;
  }
  
  //查询
  onSearch(searchMap){
    let { pagination } = this.state;
    this.props.action.getListData( pagination,searchMap );
  }

  render() {
    let page = this.props.$$state.get("data").toJS();
    let visible = this.props.$$state.get("visible");
    let attrGrpName = this.props.$$state.get("name");
    let lessFormData = this.props.$$state.get("lessFormData").toJS();
    let { headLabel, selectedRowKeys,status } = this.state;
    let rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
    };
    let formData = this.props.$$state.get("formData").toJS();
    let title = "";
    let table = undefined;
    if(status =="edit"){
      title = "编辑";
    }else if(status == "add"){
      title = "新增";
    }else if(status =="showdetail"){
      title = "详情";
    }
    const formItemLayout = {
      labelCol: {
          xs: { span: 24 },
          sm: { span: 6 },
      },
      wrapperCol: {
          xs: { span: 24 },
          sm: { span: 14 },
      },
    };
    return (
      <div className='prdattrgrp-warpper'>
        {
          headLabel ?
            <div className='head_edit'>
              <HeadLabel selectedRowKeys={selectedRowKeys} onBack={this.onBack}>
                {selectedRowKeys.length !== 1 ?
                  <Button className="default_button" disabled><i className='iconfont icon-bianji'></i>编辑</Button> :
                  <Button className="default_button" onClick={this.onEdit.bind(this)}><i className='iconfont icon-bianji'></i>编辑</Button>
                }               
                <Button className="default_button" onClick={this.onDelete.bind(this)}><i className='iconfont icon-shanchu'></i>删除</Button>               
                <Button className="default_button" onClick={this.onEableRadioChange.bind(this, 2)}><i className='iconfont icon-tingyong'></i>停用</Button>
                <Button className="default_button" onClick={this.onEableRadioChange.bind(this, 1)}><i className='iconfont icon-qiyong'></i>启用</Button>
              </HeadLabel>
            </div> :
            <div>
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
            </div>            
        }
        <div className="list-box">
          <Table
            size="middle"
            columns={this.columns}
            dataSource={page.data}
            rowSelection={rowSelection}
            rowKey="id"
            pagination={{size:"large",showSizeChanger:true,showQuickJumper:true,total:page.total,
            showTotal:this.showTotal,onChange:this.onPageChange.bind(this),
            onShowSizeChange:this.onPageSizeChange.bind(this)}}
          />
        </div>
        <Modal
          title={title}
          visible={visible}
         // onOk={this.onSave.bind(this)}
          onCancel={this.onClose.bind(this)}
          width={600}
          okText = {status == "showdetail"?"编辑":"确认"}
          onOk={status == "showdetail"?this.onEdit.bind(this):this.onSave.bind(this)} 
          maskClosable={false}
        >{status == "showdetail"?<div>
            <div>
              <Form>
                <FormItem   label="属性组名称"
                  {...formItemLayout}>                  
                    <span>{attrGrpName}</span>                 
                </FormItem>
              </Form>
            </div>
            <div>
              <AttrGrpDeTable/>
            </div>
          </div>:
        <div>
        <div className='model-height'>
          <WrappedCard dataSource={formData} wrappedComponentRef={(inst) => this.formRef = inst} />
        </div>
        <div>
          <Row gutter={54}>
            <Col span ={12}>
              <AttrTable />
            </Col>
            <Col span={12}>
              <AttrVaTable />
            </Col>
          </Row>                     
        </div>
        </div>}         
      </Modal>
      </div>
    )
  }
}

//绑定状态到组件props
function mapStateToProps(state, ownProps) {
  return {
    $$state: state.prdattrgroup
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