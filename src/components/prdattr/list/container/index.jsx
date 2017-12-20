import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Table, Modal, Button, Icon, Input,  Form ,Row, Col, message, Select} from 'antd';
import WrappedCard from './CardForm.jsx';
import HeadLabel from './HeadLabel.jsx';
import AttrVaTable from './AttrVaTable.jsx'
import AttrVaDeTable from './AttrVaDetailTable.jsx'
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
        title: '属性名称',
        dataIndex: 'name',
        render:(text,record,index) => (
          <a onClick = {this.showDetail.bind(this,record)}>{text}</a>)
      },
      {
        title: 'ERP',
        dataIndex: 'erpCode',
      },
      {
        title: '属性值',
        dataIndex: 'values',
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
    this.props.action.resetAddNum();
    this.props.action.setAttrData([]);
    this.props.action.setFormData({});
    this.props.action.onChangeAttrVa([]);    
    this.setState({ status: "add" });
    this.props.action.showAddForm(true, {});
  }

  //属性值删除
  onAttrVaDelete(){
    let flag = false;
    let changedData = this.props.$$state.get('changeData').toJS();
    let selectedRowKeys =this.props.$$state.get('AttrVaSelectedKeys').toJS();
    let attrValue =this.props.$$state.get('attrValue').toJS();       
    //先校验此条数据是否是本次新增或编辑的，如果是，从change数组里删掉
    for(let rowKey of selectedRowKeys){
      changedData = changedData.filter(change => { return change.id !== rowKey});
      attrValue = attrValue.filter(data => {
        if(data.id !== rowKey){
          data.editState = "delete";
          changedData.push(data);
        }
        return data.id !== rowKey
      });
    }
    let sel = [];
    this.props.action.setSecRowKeys([]);
    this.props.action.onChangeAttrVa(changedData);
    this.props.action.onEditAttrVa(attrValue);
  }

  showDetail (record) {
    let id = record.id;  
    this.setState({ status: "showdetail" });
    this.props.action.getAttrDetail(id);
    this.props.action.showAddForm(true);
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
    this.props.action.getAttrDetail(id);
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
    let { status } = this.state;
    let formData = this.props.$$state.get("formData").toJS();
    let changeData = this.props.$$state.get("changeData").toJS();
    let attrValue = this.props.$$state.get("attrValue").toJS()
    let erpCode = "";
    let name = "";
    let id = "";

    if(status == "edit"){
      erpCode = formData.erpCode;
      id = formData.id;    
      name = formData.name;
      let addAttr = {erpCode:erpCode, name:name,id:id, valueList: changeData};
      this.props.action.onSave4Edit(addAttr);
    }else if(status =="add"){
      erpCode = formData.erpCode;
      id = formData.id;    
      name = formData.name;  
      let addAttr = {erpCode:erpCode, name:name,id:id, valueList: changeData};
      this.props.action.onSave4Add(addAttr);
    }   
  }

  onSelectChange = (selectedRowKeys) => {
    let state = {
      selectedRowKeys: selectedRowKeys
    }
    state.headLabel = selectedRowKeys.length ? true : false;
    this.setState(state);
  }

  onBack = () => {
    this.setState({ headLabel: false });
  }

  showTotal(total) {
    return `共 ${total} 条`;
  }
  
  addRow= ()=> {
    let k = this.props.$$state.get("addNum");
    this.props.action.addAttrVaRow({id:'add_'+k.toString(),enableState:1,editState:'add'});
  }

  //查询
  onSearch(searchMap){
    let { pagination } = this.state;
    this.props.action.getListData( pagination,searchMap );
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
 
  render() {
    let lessFormData = this.props.$$state.get("lessFormData").toJS();
    let page = this.props.$$state.get("data").toJS();
    let visible = this.props.$$state.get("visible");
    let { headLabel, selectedRowKeys,status } = this.state;
    let attrValue = this.props.$$state.get("attrValue").toJS();
    let rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
    };
    let formData = this.props.$$state.get("formData").toJS();
    let title = "";
    let table = undefined;
    if(status =="edit"){
      title = "编辑";
      table =  <AttrVaTable/>;
    }else if(status == "add"){
      title = "新增";
      table =  <AttrVaTable/>;
    }else if(status =="showdetail"){
      title = "详情";
      table = <AttrVaDeTable/>;
    }

    const formItemLayout = {
      labelCol: {
          xs: { span: 48 },
          sm: { span: 26 },
      },
      wrapperCol: {
          xs: { span: 48 },
          sm: { span: 26 },
      },
    };
    return (
      <div className='prdattr-warpper'>
        {
          headLabel ?
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
          onOk={status == "showdetail"?this.onEdit.bind(this):this.onSave.bind(this)}
          onCancel={this.onClose.bind(this)}
          width={600}
          cancelText = {status == "showdetail"?"关闭":"取消"}
          okText = {status == "showdetail"?"编辑":"确认"}
          className="detail_box"
          maskClosable={false}
        >
        {status =="showdetail"?
        <div>
          <div>        
            <Form layout="inline">
              <Row>
                <Col span={9} offset={2}>
                  <FormItem   label="属性名称"
                    {...formItemLayout}>             
                      <span>{formData.name}</span>             
                  </FormItem>
                </Col>
                <Col span={9}>
                  <FormItem   label="属性对应ERP"
                    {...formItemLayout}> 
                      <span>{formData.name}</span>              
                  </FormItem>
                </Col>
              </Row>
            </Form>         
          </div>
        </div>:
          <div className='model-height'>
            <WrappedCard dataSource={formData} wrappedComponentRef={(inst) => this.formRef = inst} />
          </div>}
          <div>
            {status !== "showdetail" ? 
            <Row>
              <Col span={3}>
                <Button onClick = {this.addRow.bind(this)}>新增</Button>
              </Col>
              <Col span={3}>
                <Button onClick = {this.onAttrVaDelete.bind(this)}>删除</Button>
              </Col>
            </Row> :<div/>}               
            <div>        
              {table}
            </div>                           
          </div>
        </Modal>
      </div>
    )
  }
}

//绑定状态到组件props
function mapStateToProps(state, ownProps) {
  return {
    $$state: state.prdattr
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