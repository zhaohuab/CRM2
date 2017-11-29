import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Table, Modal, Button, Icon,Input, Radio, Popconfirm, Form,Row,Col } from 'antd';
import WrappedCard from './CardForm.jsx';
import HeadLabel from './HeadLabel.jsx';
import AttrTable from './AttrTable.jsx'
import AttrVaTable from './AttrVaTable.jsx'
import AttrGrpDeTable from './AttrGroupDetailTable.jsx'
import './index.less'
const ButtonGroup = Button.Group;
const confirm = Modal.confirm;
const Search = Input.Search;
import 'assets/stylesheet/all/iconfont.css'

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
        enableState:1,
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
    this.props.action.eidtAttrGroup(id);
  }

  onClose() {  
   
    this.props.action.showAddForm(false);
    
    //this.props.action.resetAddNum();   
  }

  onEnable(enable) {
    return (enable) => {
     // let { pagination } = this.state;
      this.setState({ headLabel: false, selectedRowKeys: [] });
      this.props.action.onEnable(this.state.selectedRowKeys, enable, { pagination });
    }
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
    this.props.action.onSave4Add(save);
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
    this.props.action.addAttrVaRow({id:'add_'+k.toString(),enableState:1,editState:'ADD'});
  }

  render() {
    let data = this.props.$$state.get("data").toJS().data;
    let visible = this.props.$$state.get("visible");
    let attrGrpName = this.props.$$state.get("name");
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
      //table =  <AttrVaTable/>;
    }else if(status == "add"){
      title = "新增";
    }else if(status =="showdetail"){
      title = "详情";
     // table = <AttrVaDeTable/>;
    }
    return (
      <div className='user-warpper'>
        {
          headLabel ?
            <div className='head_edit'>
              <HeadLabel selectedRowKeys={selectedRowKeys} onBack={this.onBack}>
                {selectedRowKeys.length != 1 ?
                  <Button className="default_button" disabled><i className='iconfont icon-bianji'></i>编辑</Button> :
                  <Button className="default_button" onClick={this.onEdit.bind(this)}><i className='iconfont icon-bianji'></i>编辑</Button>
                }               
                <Button className="default_button" onClick={this.onDelete.bind(this)}><i className='iconfont icon-shanchu'></i>删除</Button>               
                <Button className="default_button" onClick={this.onEnable(2).bind(this, 2)}><i className='iconfont icon-tingyong'></i>停用</Button>
                <Button className="default_button" onClick={this.onEnable(1).bind(this, 1)}><i className='iconfont icon-qiyong'></i>启用</Button>
              </HeadLabel>
            </div> :
            <div className='head_panel'>
              <div className='head_panel-left'>
                <Search placeholder = "属性值名称"></Search>
              </div>
              <div className='head_panel-right'>               
                <ButtonGroup className='add-more'>
                  <Button><i className='iconfont icon-daochu'></i>导入</Button>
                  <Button><i className='iconfont icon-daoru'></i>导出</Button>
                </ButtonGroup>
                <Button type="primary" className="button_add" onClick={this.onAdd.bind(this)}><Icon type="plus" />新增</Button>
              </div>
            </div>
        }
        <div className="list-box">
          <Table
            size="middle"
            columns={this.columns}
            dataSource={data}
            rowSelection={rowSelection}
            rowKey="id"
            //pagination={ size: "large", showSizeChanger: true, showQuickJumper: true,  showTotal: this.showTotal}
          />
        </div>
        <Modal
          title={title}
          visible={visible}
          onOk={this.onSave.bind(this)}
          onCancel={this.onClose.bind(this)}
          width={600}
        >{status == "showdetail"?<div>
            <span>属性组名称：{attrGrpName}</span>
            <AttrGrpDeTable/>
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