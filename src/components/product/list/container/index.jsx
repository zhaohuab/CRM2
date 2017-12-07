import React from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {Table, Button, Popconfirm, Input, Radio, Icon, Form, Modal,Row,Col,Select} from 'antd'
import WrapCard from './ProductForm.jsx';
import WrapCardDetail from './ProductFormDetail.jsx';
import HeadLabel from './HeadLabel.jsx';
import SaleUnitTable from './SaleUnitTable'
import SaleUnitDeTable from './SaleUnitDetailTable'

import HeaderButton from '../../../common/headerButtons/headerButtons.jsx'
import './index.less';

import * as Actions from '../action'
import LessForm from "./lessForm.jsx";
import MoreForm from "./moreForm.jsx";
let Search = Input.Search;
let RadioGroup = Radio.Group;
const ButtonGroup = Button.Group;
let Option = Select.Option;
import 'assets/stylesheet/all/iconfont.css'

class List extends React.Component{
    constructor(props){
        super(props)
        this.state = {   
            headLabel : false,
            selectedRowKeys : [],
            isEdit : false,
            enable : 1,
            pagination : {
              pageSize:10,
              page:1,
            },
            searchMap : {
            //  enableState:1,
            },
            moreShow:false,
            status:"add"      
        },      
        

    this.columns = [
        {
            title: '编码',
            dataIndex: 'code',
            key: 'code',
            render:(text,record,index) => (
                <a onClick = {this.showDetail.bind(this,record)}>{text}</a>)           
        },{
            title: '名称',
            dataIndex: 'name',
            key: 'name'           
        },
        {
            title: '助记码',
            dataIndex: 'memCode',
            key: 'memCode'           
        },
        {
            title: '规格',
            dataIndex: 'spec',
            key: 'spec'           
        },{
            title: '产品分类',
            dataIndex: 'prdtypeName',
            key: 'prdtypeName'  
        },{
            title: '主单位',
            dataIndex:'measureName',
            key: 'measureName',             
        },{
            title: '品牌',
            dataIndex: 'brandName',
            key: 'brandName'  
        },{
            title: '参考售价',
            dataIndex: 'price',
            key: 'price'  
        },{
            title: '适用组织',
            dataIndex: 'orgName',
            key: 'orgName'  
        },{
            title: '属性组',
            dataIndex: 'attrGroupName',
            key: 'attrGroupName'  
        },{
            title: '启用状态',
            dataIndex: 'enableStateName',
            key: 'enableStateName'  
        }]
    }

    componentDidMount() {
        let { pagination,searchMap } = this.state;
        this.props.action.getListData({ pagination,searchMap });
    }

    showDetail(record){
        this.setState({status:"showdetail"});
        let rowKey = record.id;
        let rowData = {};
        let page = this.props.$$state.get("data").toJS();
        for(let i=0,len=page.data.length;i<len;i++) {
          if(rowKey == page.data[i].id) {
            this.props.action.showEditForm(rowKey ,true);
            break;
          }          
        }      
    }
    //点击新增编辑界面销售单位的新增按钮，增加一行
    addRow() {
        let k = this.props.$$state.get("addNum");
        this.props.action.addSaleUnitRow({id:'add_'+k.toString(),editState:'ADD',fixedConvert:1});
    }
    //销售单位删除
    onSuDelete(){
        let flag = false;
        let changedData = this.props.$$state.get('changedData').toJS();
        let selectedRowKeys =this.props.$$state.get('suSelectedRowKeys').toJS();
        let salesunitTable =this.props.$$state.get('salesunitTable').toJS();       
         //先校验此条数据是否是本次新增或编辑的，如果是，从change数组里删掉
        for(let rowKey of selectedRowKeys){
            changedData = changedData.filter(change => { return change.id !== rowKey});
            salesunitTable = salesunitTable.filter(data => {
                if(data.id !== rowKey){
                    data.editState = "delete";
                    changedData.push(data);
                }
                return data.id !== rowKey
            });
        }
        let sel = [];
        this.props.action.setSecRowKeys([]);
        this.props.action.onChangeSuVa(changedData);
        this.props.action.setSuTableData(salesunitTable);
    }

    onAdd() {
        this.setState({status:"add"});
        let dataSource =this.props.$$state.get('salesunitTable').toJS();
        let { pagination,searchMap } = this.state;
        this.setState({isEdit:false});
        this.props.action.showForm(true,{});
        //this.props.action.getMeaUnitRef(pagination);//获取计量单位参照列表
       // this.props.action.getProdClassRef();//获取产品分类参照列表
       // this.props.action.getBrandRef(pagination);//获取品牌参照列表
       // this.props.action.getAttrsGrpRef(pagination);//获取属性组参照列表

    }

    onBack = ()=>{
        this.setState({selectedRowKeys:[]});
    }

    onClose(){
        this.props.action.showForm(false,{});
        this.props.action.onChangeSuVa([]);
        this.props.action.setAddNum(0);
        this.props.action.setSuTableData([]);
        this.props.action.setFormData({});
    }

    onDelete = () => {
        let { pagination,searchMap } = this.state;     
       // this.props.action.onDelete(this.state.selectedRowKeys,{ pagination,searchMap });
       // this.setState({headLabel:false,selectedRowKeys:[]});
        confirm({
            title: '确定要删除吗?',
            content: '此操作不可逆',
            okText: '是',
            okType: 'danger',
            cancelText: '否',
            onOk() {
                this.props.action.onDelete(this.state.selectedRowKeys,{ pagination,searchMap });
                that.setState({ headLabel: false, selectedRowKeys: [] });
            },
            onCancel() {
              console.log('Cancel');
            },
          });  
    }

    onEdit = () => {
        this.setState({status:"edit"});
        let { pagination,searchMap } = this.state;
     //   this.props.action.getMeaUnitRef(pagination);//获取计量单位参照列表
      //  this.props.action.getProdClassRef();//获取产品分类参照列表
      //  this.props.action.getBrandRef(pagination);//获取品牌参照列表
      //  this.props.action.getAttrsGrpRef(pagination);//获取属性组参照列表
     //   this.setState({isEdit:true});
        console.info(this.state.selectedRowKeys);
        let rowKey = this.state.selectedRowKeys[0];
        let rowData = {};
        let page = this.props.$$state.get("data").toJS();
        for(let i=0,len=page.data.length;i<len;i++) {
          if(rowKey == page.data[i].id) {
            this.props.action.showEditForm(rowKey ,true);
            break;
          }          
        }      
    }

    onEnable(enable) {
        return (enable) => {
          let { pagination,searchMap } = this.state;
          this.setState({headLabel:false});
          this.props.action.onEnable(this.state.selectedRowKeys,enable,{ pagination,searchMap });
        }
    }

    onEableRadioChange = (enableState) => {
        let { pagination,searchMap,selectedRowKeys} = this.state;      
        let ids = selectedRowKeys.join();        
        this.props.action.changeEnableState( enableState,ids,pagination,searchMap );      
    }

    onPageChange(page,pageSize) {
        let { pagination,searchMap } = this.state;
        pagination = {page:page,pageSize:pageSize};
        this.setState({pagination})
        this.props.action.getListData({ pagination,searchMap });
    }

    onPageSizeChange(current,pageSize) {
        let { pagination,searchMap } = this.state;
        pagination = {page:pagination.page,pageSize:pageSize};
        this.setState({pagination})
        this.props.action.getListData({ pagination,searchMap });
        console.info(`pageSize:${pageSize}`)
    }

    onSave(){       
        let editData = this.props.$$state.get("editData").toJS();
        let formData = this.props.$$state.get("formData").toJS();
        let id = editData.id;
        let fieldsChangeData = this.props.$$state.get("fieldsChangeData").toJS();
        Object.assign(editData,fieldsChangeData);
        let saleUnits =this.props.$$state.get('changedData').toJS();
        let addData = {...editData,saleUnits:saleUnits}; 
        if(this.state.isEdit) {         
          this.props.action.onSave4Edit(addData,id);
        } else {
          this.props.action.onSave4Add(addData);
        }
        this.props.action.setAddNum(0);
        this.props.action.setSuTableData([]);
        this.props.action.setFormData({});  
        this.props.action.onChangeSuVa([]); 
        this.props.action.setBrandValue("");
        this.props.action.setAttrGrpValue(""); 
        this.props.action.setMeaUnitValue("");
        this.props.action.setPrdClassValue("");
        //this.props.$$state.get("brandValue")
    }

    onSelectChange(selectedRowKeys){
        let state = {
            selectedRowKeys:selectedRowKeys
        }
        state.headLabel = selectedRowKeys.length ? true:false;
        this.setState( state );
    }
    showTotal(total) {
        return `共 ${total} 条`;
    }
    
    moreForm() {
        let{ moreShow } = this.state;
        if(moreShow == true){
            this.setState({moreShow:false});
        }else{
            this.setState({moreShow:true});
        }
    }
    render(){
        let page = this.props.$$state.get("data").toJS();
        let visible = this.props.$$state.get("visible");
        let {headLabel,selectedRowKeys,isEdit,moreShow,status} = this.state;
        let rowSelection = {
          selectedRowKeys,
          onChange: this.onSelectChange.bind(this),
        };
        let editData = this.props.$$state.get("editData").toJS();
        let title = "";
        if(status =="edit"){
            title = "编辑";
            //table =  <AttrVaTable/>;
          }else if(status == "add"){
            title = "新增";
          }else if(status =="showdetail"){
            title = "详情";
           // table = <AttrVaDeTable/>;
          }
        return(
            <div className='product-warpper'>  
                <Row className='header-warpper'>               
                    {selectedRowKeys && selectedRowKeys.length >= 1 ? ( 
                        <HeaderButton
                            goBack={this.onBack.bind(this)}
                            length={selectedRowKeys.length}
                        >
                            {selectedRowKeys.length != 1 ?
                                <Button className="default_button" disabled><i className='iconfont icon-bianji'></i>编辑</Button> :
                                <Button className="default_button" onClick={this.onEdit.bind(this)}><i className='iconfont icon-bianji'></i>编辑</Button>
                            }   
                            <Button
                                className="returnbtn-class"
                                onClick={this.onDelete.bind(this)}
                            >
                                <i className="iconfont icon-shanchu" />删除
                            </Button>

                            <ButtonGroup className="returnbtn-class">
                                <Button onClick={this.onEableRadioChange.bind(this, 1)}>
                                    <i className="iconfont icon-qiyong" />启用
                                </Button>
                                <Button onClick={this.onEableRadioChange.bind(this, 2)}>
                                    <i className="iconfont icon-tingyong" />停用
                                </Button>
                            </ButtonGroup>
                        </HeaderButton>
                        ):<div>
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
                                     className={
                                         moreShow
                                             ? "less-hide-height"
                                             : "less-show-height"
                                     }
                                 >
                                     <LessForm
                                         handleSearch={this.showTotal.bind(
                                             this
                                         )} //点击查询方法
                                         searchMapFn={this.showTotal.bind(
                                             this
                                         )} //动态赋值查询条件到redux中
                                         formMore={this.moreForm.bind(
                                             this
                                         )} //控制查询显隐
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
                     <div className="header-bottom">
                         <Row
                             className={
                                 moreShow
                                     ? "more-show-height"
                                     : "less-hide-height"
                             }
                         >
                             <MoreForm
                                 handleSearch={this.onAdd.bind(this)} //点击查询方法
                                 searchMapFn={this.onAdd.bind(this)} //动态赋值查询条件到redux中
                                 formMore={this.moreForm.bind(this)} //控制查询显隐
                             />
                         </Row>
                     </div>
                    </div>                             
                    }                                    
                </Row>   
              
                <div className = 'list-box'>
                    <Table  size="middle" rowSelection={rowSelection} dataSource={page.data} rowKey="id" columns = {this.columns}
                    pagination={{size:"large",showSizeChanger:true,showQuickJumper:true,total:page.total,showTotal:this.showTotal,onChange:this.onPageChange.bind(this),onShowSizeChange:this.onPageSizeChange.bind(this)}}/>
                </div>
                <Modal title={title} visible={visible} 
                    cancelText = {status == "showdetail"?"关闭":"取消"}
                    okText = {status == "showdetail"?"编辑":"确认"}
                    onOk={status == "showdetail"?this.onEdit.bind(this):this.onSave.bind(this)} 
                    onCancel={this.onClose.bind(this)} width={850}
                    maskClosable={false}>
                {status !== "showdetail"?
                   <div>
                    <div >
                        <WrapCard dataSource={editData} wrappedComponentRef={(inst) => this.formRef = inst}/>
                    </div>
                    <div >
                        <Row>
                            <Col span={2}>
                                <Button onClick = {this.addRow.bind(this)}>新增</Button>
                            </Col>
                            <Col span={2}>
                                <Button onClick = {this.onSuDelete.bind(this)}>删除</Button>
                            </Col>
                        </Row >
                        <div style ={{margin:15}}>
                            <SaleUnitTable />
                        </div>
                    </div>
                </div>:<div>
                    <div className='model-height'>
                        <WrapCardDetail dataSource={editData} wrappedComponentRef={(inst) => this.formRef = inst}/>
                    </div>
                    <div>
                        <p>销售单位:</p>
                        <SaleUnitDeTable/>
                    </div>
                </div>
                }
                </Modal>
            </div>)
    }
}

function mapStateToProps(state, ownProps) {
    return{
        
        $$state: state.product
    }
}

function mapDispatchToProps(dispatch) {
    return {
       action: bindActionCreators(Actions,dispatch)
    }
}

export default connect( mapStateToProps, mapDispatchToProps)(List);