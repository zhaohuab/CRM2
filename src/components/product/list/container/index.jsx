import React from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {Table, Button, Input,  Icon, Form, Modal, Row, Col, Select, Tree} from 'antd'
import WrapCard from './ProductForm.jsx';
import WrapCardDetail from './ProductFormDetail.jsx';
import HeadLabel from './HeadLabel.jsx';
import SaleUnitTable from './SaleUnitTable'
import SaleUnitDeTable from './SaleUnitDetailTable'
import HeaderButton from '../../../common/headerButtons/headerButtons.jsx'

import './index.less';
import 'assets/stylesheet/all/iconfont.css'

import * as Actions from '../action'
import LessForm from "./lessForm.jsx";
import MoreForm from "./moreForm.jsx";
const Search = Input.Search;
const ButtonGroup = Button.Group;
const Option = Select.Option;
const TreeNode = Tree.TreeNode;

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
            searchMap : {},
            moreShow:false,
            status:"add" ,//状态：新增 编辑 详情
            assignVisible:false, 
            selectedTreeKeys:[],//分配时选中组织id
            selectedOrgnames:[],//分配时选中组织名称
            rootFlag:false, //分配选中组织是否是根节点 
            editRow:{},
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

    //产品详情
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
        this.setState({editRow:record});   
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
        this.props.action.setSecRowKeys([]);
        this.props.action.onChangeSuVa(changedData);
        this.props.action.setSuTableData(salesunitTable);
    }

    //产品新增
    onAdd() {
        this.props.action.setSuTableData([]);
        this.props.action.setFormData({});  
        //this.props.action.onChangeSuVa([]); 
        this.props.action.setBrandValue("");
        this.props.action.setAttrGrpValue(""); 
        this.props.action.setMeaUnitValue("");
        this.props.action.setPrdClassValue({});
        this.setState({status:"add"});
        let dataSource =this.props.$$state.get('salesunitTable').toJS();
        let { pagination,searchMap } = this.state;
        this.setState({isEdit:false});
        this.props.action.showForm(true,{});
    }

    onBack = ()=>{
        this.setState({selectedRowKeys:[]});
    }

    //新增|编辑取消
    onClose(){
        this.props.action.showForm(false,{});
        this.props.action.onChangeSuVa([]);
        this.props.action.setAddNum(0);
        this.setState({editRow:{}});
        this.props.action.setIsRefered(2);
    }

    //批量删除
    onDelete = () => {
        let { pagination,searchMap } = this.state;     
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

    //编辑
    onEdit = () => {
        this.setState({status:"edit"});
        let { pagination,searchMap } = this.state;
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

    //更改停启用状态
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

    //查询
    onSearch(searchMap){
        let { pagination } = this.state;
        this.props.action.getListData({ pagination,searchMap });
    }

    //新增|编辑保存
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
        this.set({editRow:{}});
        this.props.action.setIsRefered(2);
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
    
    //点击“展开”
    moreForm() {
        let{ moreShow } = this.state;
        if(moreShow == true){
            this.setState({moreShow:false});
        }else{
            this.setState({moreShow:true});
        }
    }

    //分配
    onAssign() {
        this.setState({assignVisible: true});
        this.props.action.getOrgTree();
        let {selectedTreeKeys, selectedRowKeys, editRow} = this.state;
        let editData = this.props.$$state.get("editData").toJS();
        let rowData = {};
        let orgIds = [];
        let orgNames = [];
        let page = this.props.$$state.get("data").toJS();
        for(let i=0,len=page.data.length;i<len;i++) {
            if(JSON.stringify(editData) !== "{}" && JSON.stringify(editRow) !== "{}"){
                if(editData.id == page.data[i].id) {
                    rowData = editData;
                    orgIds = rowData.orgId.split(",");
                    orgNames = rowData.orgName.split(",");
                    break;
                }       
            }else if(selectedRowKeys.length>0){
                if(selectedRowKeys[0] == page.data[i].id) {
                    rowData = page.data[i];
                    orgIds = rowData.orgId.split(",");
                    orgNames = rowData.orgName.split(",");
                    break;
                }       
            }        
        }     
        this.setState({selectedTreeKeys:orgIds});
        this.setState({selectedOrgnames:orgNames});           
    }
    //取消分配
    onAssignClose() {
        this.setState({assignVisible: false});      
    }

    //保存分配
    onAssignOk(){
        let {selectedTreeKeys, selectedRowKeys, selectedOrgnames, editRow} = this.state;
        let id = 0;
        if(JSON.stringify(editRow) !== "{}"){
            id = editRow.id;
        }else{
            id = selectedRowKeys[0];
        }
        let ids = selectedTreeKeys.join();  
        let names = selectedOrgnames.join();
        this.props.action.prdAssign(id ,ids, names);  
        this.setState({assignVisible:false});
        //Object.assign(editRow,{orgId:ids,orgName:names});
        //this.setState({editRow:editRow});
        if(JSON.stringify(editRow) !== "{}"){
            let editData = this.props.$$state.get("editData").toJS();
            Object.assign(editData,{orgName:names,orgId:ids}); 
            this.props.action.setFormData(editData);
        }        
    }

    //分配时选择组织树节点  最顶层为集团，选中则其他节点全选，其他树节点选中与否互不相关
    onTreeCheck(checkedKeys,e){
        let {selectedTreeKeys, selectedOrgnames, rootFlag} = this.state;
        let classRefTree = this.props.$$state.get("orgTree").toJS().data;
        let node = e.node;
        let pos = node.props.pos;
        let loop = () =>{};
        let keys = [];
        let names = [];
        loop = (data) => {
            if(data !== undefined && data.length>0){
                data.map((item) => {
                    if(item.children && item.children.length>0){
                        loop(item.children);                   
                        if(pos !== "0-0"){
                            keys.push(item.id.toString());
                            names.push(item.name);
                        }                   
                    }else{                    
                        if(pos !== "0-0"){
                            keys.push(item.id.toString());
                            names.push(item.name);
                        }  
                    }
                });
            }
            return keys;
        };
        if(pos == "0-0" && rootFlag == true){
            selectedTreeKeys = loop(classRefTree);
            this.setState({rootFlag:false});
            this.setState({selectedTreeKeys:selectedTreeKeys});
            this.setState({selectedOrgnames:names});
        }else if(pos == "0-0" && rootFlag == false){
            this.setState({rootFlag:true});
            this.setState({selectedTreeKeys:[]});
            this.setState({selectedOrgnames:[]});
        }else{
            this.setState({selectedTreeKeys:checkedKeys.checked});
            if(node.props.checked == true){
                selectedOrgnames = selectedOrgnames.filter( x => {return x !== node.props.title});
                this.setState({selectedOrgnames:selectedOrgnames});
            }else{
                selectedOrgnames.push(node.props.title);
                this.setState({selectedOrgnames:selectedOrgnames});
            }
        }    
    }

   
    render(){
        let page = this.props.$$state.get("data").toJS();
        let visible = this.props.$$state.get("visible");
        let {headLabel,selectedRowKeys,isEdit,moreShow,status,assignVisible,selectedTreeKeys} = this.state;
        let rowSelection = {
          selectedRowKeys,
          onChange: this.onSelectChange.bind(this),
        };
        let editData = this.props.$$state.get("editData").toJS();
        let lessFormData = this.props.$$state.get("lessFormData").toJS();
        let moreFormData = this.props.$$state.get("moreFormData").toJS();
        // let classRefTree = [{title:"集团", key:"0", fatherorg_id:0,children:[{title:"公司A", key:"0-1",fatherorg_id:1,
        //     children:[{title:"公司A-a", key:"0-1-1",fatherorg_id:2,
        // children:[{title:"公司A-a-1", key:"0-1-1-1",fatherorg_id:3}]},
        //{title:"公司A-b", key:"0-1-2",fatherorg_id:2}]},{title:"公司B", key:"0-2",fatherorg_id:1}]}];
        let orgRefTree = this.props.$$state.get("orgTree").toJS().data;
        let title = "";
        let loop = () =>{};
        if(orgRefTree!== undefined && orgRefTree.length>0){
            loop = data => data.map((item) => {
                if (item.children && item.children.length>0) {
                    return (
                        <TreeNode  key={item.id} 
                            title={item.name}>
                            {loop(item.children)}
                        </TreeNode>
                    );
                }else{
                    return <TreeNode key={item.id } title={item.name }/>;       
                }
                                     
                });
        }else{            
            loop = data => {return <div/>};
        }
        if(status =="edit"){
            title = "编辑";
        }else if(status == "add"){
            title = "新增";
        }else if(status =="showdetail"){
            title = "详情";
        }

        let modalButton = 
            <Row gutter={6}>
                <Col offset={20} span={2}>
                    <Button size='large' onClick = {this.onClose.bind(this)}>取消</Button>
                </Col>                            
                <Col span={2}>
                    <Button size='large' onClick = {this.onSave.bind(this)} type="primary">保存</Button>
                </Col>                
            </Row>;

        let detailButton =
            <Row gutter={6}>
                <Col offset={17} span={2}>
                    <Button size='large' onClick = {this.onClose.bind(this)}>关闭</Button>
                </Col>
                <Col span={2}>
                    <Button size='large' onClick = {this.onAssign.bind(this)}>分配</Button>
                </Col>
                <Col span={2}>
                     <Button size='large' onClick = {this.onEdit.bind(this)} type="primary">编辑</Button>
                </Col>
            </Row>;

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
                            {selectedRowKeys.length != 1 ?
                                <Button                           
                                    className="returnbtn-class"
                                    disabled
                                >
                                    <Icon type="team" />分配
                                </Button>:
                                 <Button                           
                                 className="returnbtn-class"
                                 onClick={this.onAssign.bind(this)}
                                >
                                    <Icon type="team" />分配
                                </Button>
                            }
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
                                            dataSource={lessFormData}
                                            handleSearch={this.onSearch.bind(
                                             this
                                            )} //点击查询方法
                                            //动态赋值查询条件到redux中
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
                                    dataSource={moreFormData}
                                    handleSearch={this.onSearch.bind(this)} //点击查询方法
                                    searchMapFn={this.onAdd.bind(this)} //动态赋值查询条件到redux中
                                    formMore={this.moreForm.bind(this)} //控制查询显隐
                                    />
                                </Row>
                            </div>
                        </div>                             
                    }                                    
                </Row>   
              
                <div className = 'list-box'>
                    <Table  size="middle" 
                    rowSelection={rowSelection}
                    dataSource={page.data} 
                    rowKey="id" 
                    columns = {this.columns}
                    pagination={{size:"large",showSizeChanger:true,showQuickJumper:true,
                    total:page.total,showTotal:this.showTotal,onChange:this.onPageChange.bind(this),
                    onShowSizeChange:this.onPageSizeChange.bind(this)}}/>
                </div>
                <Modal title={title} visible={visible} 
                    cancelText = {status == "showdetail"?"关闭":"取消"}
                    okText = {status == "showdetail"?"编辑":"确认"}
                    onOk={status == "showdetail"?this.onEdit.bind(this):this.onSave.bind(this)} 
                    onCancel={this.onClose.bind(this)} 
                    width={850}
                    maskClosable={false}
                    footer={status =="showdetail"? detailButton : modalButton}
                >
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
                    </div>:
                    <div>
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
                <Modal title="分配" 
                visible={assignVisible}
                onCancel={this.onAssignClose.bind(this)}
                onOk={this.onAssignOk.bind(this)}
                width={450} >
                    <Tree 
                        checkStrictly={true}
                        onCheck={this.onTreeCheck.bind(this)}              
                        checkedKeys={selectedTreeKeys}                
                        className="reference-tree"
                        checkable = {true}
                        defaultExpandAll = {true}
                    >
                      {loop(orgRefTree)}  
                    </Tree>      
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