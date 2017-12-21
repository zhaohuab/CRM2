import  React, { Component } from 'react';
import { Table, Icon, Button, Form, Input, Checkbox, Row, Col, Modal, Spin, Select} from 'antd';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux';
import * as Actions from '../action/index.js'

import Immutable from 'immutable'
import ClassCard from './ListForm.jsx'
import ListTree from './ListTree.jsx'
import EditButton from './EditButtons.jsx'
const ButtonGroup = Button.Group;
const Search = Input.Search;
const Option = Select.Option;
import './index.less'
import 'assets/stylesheet/all/iconfont.css'
import DateTime from '../../../../utils/components/datetime'
import LessForm from "./lessForm.jsx";

class List extends Component {
    constructor(){
        super();
        this.columns= [
          {
            title: '编码',
            dataIndex: 'code',
          },
          {
            title: '名称',
            dataIndex: 'name',
          }, 
          {
            title: '上级分类',
            dataIndex: 'fatherTypeName',
          },
          {
            title: '属性组',
            dataIndex: 'attrGroupName',
          }, 
          {
            title: '状态',
            dataIndex: 'enableStateName'
          },
          {
            title: '停用时间',
            dataIndex: 'disableTime',
            render:(text,record,index) => (
               text == null ? text :new Date(text.time).toLocaleDateString())                    
          },
          {
            title: '对应ERP',
            dataIndex: 'erpCode'
          }  
        ]; 

        this.state={
            minH:'',
            isEdit : false,
            pagination : {
              pageSize:10,
              page:1,
            },
            searchMap : {              
            },
            selectedKey:[],
            showTree:true,//是否显示左侧分类树
          //  selectedData:{}
        }
        //点击每行table触发的onchange方法
        let that = this
        this.rowSelectionFn={
            onChange(selected, selectedRows){
                if(selectedRows.length){
                    that.props.prdAction.buttonEdit(selectedRows)
                
                }else{
                    that.props.prdAction.buttonEdit(selectedRows)
        
                }
            }
         }      
    }

    //编辑
    changeForm(record){ 
        this.setState({isEdit:true});
        this.props.prdAction.showForm(true,record);
    }

    //删除
    btnDelete(treeSelect,searchFilter,record,){
        let {pagination} = this.state;
        this.props.prdAction.listdel(record,treeSelect,searchFilter,pagination)
    }

    //启停用按钮
    btnSetEnablestate(treeSelect,searchFilter,data,state){
        let {pagination} = this.state;
        this.props.prdAction.setEnablestate(treeSelect,searchFilter,data,state,pagination);
    }

    //新增|编辑取消 
    handleCancel(){
        //let item =  this.props.prdState.get("editData").toJS();
        this.props.prdAction.showForm(false,{});
    }

    //表单页面确定方法
    formHandelOk(){
        let editData = this.props.prdState.get("editData").toJS();
        let id = editData.id;
        let fieldsChangeData = this.props.prdState.get("fieldsChangeData").toJS();
        Object.assign(editData,fieldsChangeData);
        if(this.state.isEdit){
            this.props.prdAction.listchange(editData,id);
        }else{
            this.props.prdAction.listadd(editData);                    
        }                     
    }      

    //显示每行数据后的返回按钮
    btnBack(){
        this.props.prdAction.buttonEdit([])
    }

    //点击树节点触发的方法
    treeSelectFn(selectedKeys,obj){
        let rowData = {};      
        let {pagination} = this.state;      
        if(selectedKeys.length){
            this.props.prdAction.listTreeChange(pagination,selectedKeys[0])
        }
       // this.setState({selectedData:rowData});
        this.props.prdAction.getDetail(selectedKeys,false);
    }
   
    //点击一个节点树的编辑操作
    treeSelectEditFn(rowKey){
        let item = this.props.prdState.get("selectedTreeData").toJS(); 
        let {pagination, searchMap} = this.state;
        this.setState({isEdit:true});
        //this.props.prdAction.setFormData(item);
        //this.props.prdAction.setFormVisible(true);
        this.props.prdAction.showForm(true,item);
        //this.props.prdAction.getAttrsGrpRef(pagination);
    }

    //点击一个节点树的增加操作
    treeSelectAddFn(){
        //this.props.prdAction.setAttrGrpValue("");
        let item = this.props.prdState.get("selectedTreeData").toJS();   
        let {pagination, searchMap} = this.state;
        this.setState({isEdit:false});
        let path ="";
        let rowData = {};
        //debugger
        if(item !== undefined && item !== null && JSON.stringify(item) !== "{}"){
            rowData = {fatherTypeId:item.id,fatherTypeName: item.name,
            path:(item.path !== undefined && item.path !== "")?item.path+","+item.id.toString():item.id.toString(),
            attrGroupId:item.attrGroupId, attrGroupName:item.attrGroupName};
            }
        this.props.prdAction.showForm(true,rowData);
        //this.props.prdAction.getAttrsGrpRef(pagination);
    }

    //点击一个节点树的删除操作
    treeSelectDeleteFn(item){//这里的record和item不用传参，点击的时候是ant design插件自动传递的么    
        let {pagination, searchMap} = this.state;
        const record = [];
        record.push(item);
        this.props.prdAction.listdel(record,item.id,searchMap,pagination);
    }

    //点击查询按钮
    searchList(item){
        this.props.prdAction.getlistByClickSearch({searchKey:item});
    }

    reSizeFn(){
        let h=document.documentElement.clientHeight
        this.setState({
            minH : h - 70
        })
    }

    //分页
    showTotal(total) {
        return `共 ${total} 条`;
    }

    onPageChange(page,pageSize) {
        let { pagination,searchMap } = this.state;
        pagination = {page:page,pageSize:pageSize};
        this.setState({pagination})
        this.props.prdAction.getlist({ pagination,searchMap });
    }

    onPageSizeChange(current,pageSize) {
        let { pagination,searchMap } = this.state;
        pagination = {page:pagination.page,pageSize:pageSize};
        this.setState({pagination})
        this.props.prdAction.getlist({ pagination,searchMap });
    }

    //是否显示左侧分类树
    showClassTree(flag){
        this.setState({showTree:flag});
    }

    //查询
    onSearch(searchMap){
        let { pagination } = this.state;
        let params = {pagination:pagination,searchMap:searchMap};
        this.props.prdAction.getlist(params);
        //this.props.prdAction.getlistByClickSearch({searchKey:searchMap});
    }
    //组件渲染完毕获取数据
    componentDidMount(){
        let { pagination,searchMap } = this.state;
        let params = {pagination:pagination,searchMap:searchMap};
        this.props.prdAction.getlist(params);
        this.props.prdAction.getTreeList();
        this.setState({
            minH:document.documentElement.clientHeight- 70
        })
        window.onreset=()=>{
           this.reSizeFn()
        }
    }

    render() {
        let {isEdit} = this.state;
        let {prdState} = this.props;
        let tabelLoading = prdState.get('tabelLoading');
        let formVisitable = prdState.get('formVisitable')
        let treeLoading = prdState.get('treeLoading')
        let treeSelect = prdState.get('treeSelect');
        let searchFilter = prdState.get('searchFilter');     
        let treeData = prdState.get('treeData').toJS();
        let page = prdState.get('page').toJS();
        let tableListCheckbox = prdState.get('tableListCheckbox').toJS();
        let selectedTreeData = prdState.get("selectedTreeData").toJS();
        let editData = prdState.get("editData").toJS();
        let lessFormData = {};

        return (
            <div className='prdclass-list-warpper'>
                <div className='list-main'>            
                    <div className={this.state.showTree?'list-table-trees':'list-table-trees list-table-trees-width'} 
                        style={{minHeight:this.state.minH?this.state.minH+'px':'auto'}}>
                        {/* <div className='org-tree-top'>
                            <Search placeholder="请输入关键字段" onSearch={this.searchList.bind(this)}/>
                        </div> */}
                        <Spin spinning={treeLoading} tip='正在加载'/>
                        <ListTree 
                            data={treeData} 
                            onSelect={this.treeSelectFn.bind(this)} 
                            edit={this.treeSelectEditFn.bind(this)}
                            add={this.treeSelectAddFn.bind(this)}
                            delete={this.treeSelectDeleteFn.bind(this)}
                        />
                    </div>                   
                    <div className='list-tables' ref="listTablePanel">
                        {this.state.showTree?
                            <span className='list-left-arrow'>
                                <Icon type="caret-left" onClick={this.showClassTree.bind(this,false)}/>                                
                            </span>:
                            <span className='list-right-arrow'>
                                <Icon type="caret-right" onClick={this.showClassTree.bind(this,true)}/>                                
                            </span>
                        }                        
                        <div className='table-header'>
                            {tableListCheckbox.length? <EditButton data={tableListCheckbox}
                                setEnablestate={this.btnSetEnablestate.bind(this,treeSelect,searchFilter)} 
                                enablestate={this.state.searchMap.enableState} 
                                deleteList={this.btnDelete.bind(this,treeSelect,searchFilter)} 
                                returnFn={this.btnBack.bind(this)} 
                                changeForm={this.changeForm.bind(this)}/>:
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
                                                    handleSearch={this.onSearch.bind(
                                                    this
                                                    )} //点击查询方法
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
                                                    onClick={this.treeSelectAddFn.bind(this)}
                                                    >
                                                        <i className="iconfont icon-xinjian" />新建
                                                    </Button>
                                                </Col>
                                            </Row>
                                        </Col>
                                    </Row>
                                </div>                             
                            }                          
                        </div>
                        <div className='org-tabel' id = 'prdtype'>                         
                            <Table columns={this.columns} rowKey ='id' dataSource={page.data} loading={tabelLoading}  rowSelection={this.rowSelectionFn} size='middle' 
                             pagination={{size:"large",showSizeChanger:true,showQuickJumper:true,total:page.total,showTotal:this.showTotal,onChange:this.onPageChange.bind(this),onShowSizeChange:this.onPageSizeChange.bind(this)}}
                            />
                        </div>
                        <Modal
                            title={isEdit?"编辑":"新增"}
                            visible={formVisitable}
                            onOk={this.formHandelOk.bind(this)}
                            onCancel={this.handleCancel.bind(this)}
                            maskClosable={false}
                        >
                            <div className='model-height'>
                                <ClassCard wrappedComponentRef={(inst) => this.formRef = inst} dataSource={editData} /> 
                            </div>
                        </Modal>   
                    </div>                 
                </div>
            </div>
        );
    }
}


export default connect(
    state=>{
        return{
            prdState:state.prdtype
        }
    },
    dispatch=>{
        return{
            prdAction:bindActionCreators(Actions,dispatch)
        }
    }
)(List)
