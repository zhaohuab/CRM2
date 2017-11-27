import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Table, Modal, Button, Icon,Input, Radio, Popconfirm, Form } from 'antd';
import WrappedCard from './CardForm.jsx';
import HeadLabel from './HeadLabel.jsx';
import AttrVaTable from './AttrVaTable.jsx'
import AttrVaDeTable from './AttrVaDetailTable.jsx'
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
    this.props.action.showAddForm(true, {});
  }

  showDetail (record) {
    let id = record.id;  
    this.setState({ status: "showdetail" });
   // this.props.action.edit();
    this.props.action.getAttrDetail(id);
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
   // this.props.action.edit();
    this.props.action.getAttrDetail(id);
  }

  onClose() {  
   
    this.props.action.showAddForm(false);
    
    this.props.action.resetAddNum();   
  }

  onEnable(enable) {
    return (enable) => {
     // let { pagination } = this.state;
      this.setState({ headLabel: false, selectedRowKeys: [] });
      this.props.action.onEnable(this.state.selectedRowKeys, enable, { pagination });
    }
  }

  onSave() {
    let { status } = this.state;
    let formData = this.props.$$state.get("formData").toJS();
    let changeData = this.props.$$state.get("changeData").toJS();
    let erpCode = "";
    let name = "";
    let id = "";
    //let addAttr = {erpCode:erpCode, name:name,id:id, valueList: changeData};
    if(status == "edit"){
      erpCode = formData.erpCode;
      id = formData.id;    
      name = formData.name;
     // id = formData.id.value;
     // erpCode = formData.erpCode.value;
      // name = formData.name.value;
      let addAttr = {erpCode:erpCode, name:name,id:id, valueList: changeData};
      this.props.action.onSave4Edit(addAttr);
    }else if(status =="add"){
      erpCode = formData.erpCode;
      id = formData.id;    
      name = formData.name;  
      let addAttr = {erpCode:erpCode, name:name,id:id, valueList: changeData};
      this.props.action.onSave4Add(addAttr);
      this.props.action.resetAddNum();
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
    this.props.action.addAttrVaRow({id:'add_'+k.toString(),enableState:1,editState:'ADD'});
  }

  render() {
    let data = this.props.$$state.get("data").toJS().data;
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
        >
          <div className='model-height'>
            <WrappedCard dataSource={formData} wrappedComponentRef={(inst) => this.formRef = inst} />
          </div>
          <div>  
           {
            attrValue.length==0?
            <div/>:  
            <div>        
            {table}
            </div>                   
            }{status =="showdetail"?
          <div/>:<div>
           <Button type = "dashed" onClick={this.addRow.bind(this)} style={{width: '100%'}}>
              <Icon type="plus" className = 'icon' />增加属性值
            </Button>
          </div>}            
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