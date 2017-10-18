import  React, { Component } from 'react';
import { Table, Icon,Button ,Form,  Input,  Checkbox,Col,Modal,Spin} from 'antd';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux';
import * as Actions from '../action/index.js'

import Immutable from 'immutable'
import card from './ListForm.jsx'
import ListTree from './ListTree.jsx'
import EditButton from './EditButtons.jsx'
const ButtonGroup = Button.Group;
const Search = Input.Search;
import './index.less'
import 'assets/stylesheet/all/iconfont.css'

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
            dataIndex: 'attrGroupId',
          }, 
          {
            title: '状态',
            dataIndex: 'enableState'
          },
           {
            title: '停用时间',
            dataIndex: 'enableTime',
          },
           {
            title: '对应ERP组织',
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
              enableState:1,
            } 
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

    //修改一条数据方法
    changeForm(record){ 
        this.setState({isEdit:true});
        this.props.prdAction.showForm(true,record);
    }

    //删除一条数据方法
    btnDelete(treeSelect,searchFilter,record){
        this.props.prdAction.listdel(record,treeSelect,searchFilter)
    }

    //启停用按钮
    btnSetEnablestate(treeSelect,searchFilter,data,state){
        this.props.prdAction.setEnablestate(treeSelect,searchFilter,data,state)
    }

    //修改页面取消按钮 
    handleCancel(){
        this.props.prdAction.showForm(false,{})
    }

   //表单页面确定方法
    formHandelOk(){
        this.formRef.props.form.validateFields((err, values) => {
            if (!err) {                  
                if(this.state.isEdit){
                    this.props.prdAction.listchange(values);
                }else{
                    this.props.prdAction.listadd(values);                    
                }
            }
        });
    }

    //点击增加组织
    addFormBtn(){
        this.setState({isEdit:false});
        this.props.prdAction.showForm(true,{});
        // this.props.prdAction.changeAdd()
    }

    //显示每行数据后的返回按钮
    btnBack(){
        this.props.prdAction.buttonEdit([])
    }

    //点击树节点触发的方法
    treeSelectFn(selectedKeys,obj){
        if(selectedKeys.length){
            this.props.prdAction.listTreeChange(selectedKeys[0])
        }
    }
   
    //点击一个节点数的编辑操作
    treeSelectEditFn(rowKey){
        this.setState({isEdit:true});
        let rowData = {};
        let page = this.props.prdState.get("listData").toJS();
        for(let i=0,len=page.length;i<len;i++) {
            if(rowKey == page[i].id) {
                rowData = page[i];
                break;
            }
        }
        this.props.prdAction.showForm(true,rowData);
    }
    //点击一个节点数的增加操作
    treeSelectAddFn(item){
        this.setState({isEdit:false});
        let rowData = {fatherorgId:item.id,fatherorgName:item.name}
        this.props.prdAction.showForm(true,rowData);
    }

    //点击一个节点数的删除操作
    treeSelectDeleteFn(item){//这里的record和item不用传参，点击的时候是ant design插件自动传递的么    
        const record = [];
        record.push(item)
        this.props.prdAction.listdel(record,item.id)
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
    //可能有问题
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

    //组件渲染完毕获取数据
    componentDidMount(){
        this.props.prdAction.getlist();
        this.props.prdAction.getTreeList();
        this.setState({
            minH:document.documentElement.clientHeight- 70
        })
        window.onreset=()=>{
           this.reSizeFn()
        }
    }

    render() {
        //这获取总的状态  //拿到想要的之后再toJS
        let {prdState} = this.props;
        let tabelLoading = prdState.get('tabelLoading');
        let formVisitable = prdState.get('formVisitable')
        let treeLoading = prdState.get('treeLoading')
        let treeSelect = prdState.get('treeSelect');
        let searchFilter = prdState.get('searchFilter');

        let listData = prdState.get('listData').toJS();
        let treeData = prdState.get('treeData').toJS();
        let tableListCheckbox = prdState.get('tableListCheckbox').toJS();
        
        const WrapCard = Form.create()(card);
        let editData = prdState.get("editData").toJS();
        return (
            <div className='list-warpper'>
                <div className='list-main'>
                    <div className='list-table-tree' style={{minHeight:this.state.minH?this.state.minH+'px':'auto'}}>
                        <div className='org-tree-top'>
                            <Search placeholder="请输入关键字段" onSearch={this.searchList.bind(this)}/>
                        </div>
                        <Spin spinning={treeLoading} tip='正在加载'/>
                        <ListTree 
                            data={treeData} 
                            onSelect={this.treeSelectFn.bind(this)} 
                            edit={this.treeSelectEditFn.bind(this)}
                            add={this.treeSelectAddFn.bind(this)}
                            delete={this.treeSelectDeleteFn.bind(this)}
                        />
                    </div>
                    <div className='list-table' ref="listTablePanel">
                        <div className='table-header'>
                            { tableListCheckbox.length? <EditButton data={tableListCheckbox} setEnablestate={this.btnSetEnablestate.bind(this,treeSelect,searchFilter)} deleteList={this.btnDelete.bind(this,treeSelect,searchFilter)} returnFn={this.btnBack.bind(this)} changeForm={this.changeForm.bind(this)}/>:'' }
                            <div className='list-add'>
                                <ButtonGroup className='list-add-group'>
                                    <Button><i className='iconfont icon-daochu'></i>导入</Button>
                                    <Button><i className='iconfont icon-daoru'></i>导出</Button>
                                </ButtonGroup>
                                <Button type='primary' onClick={this.addFormBtn.bind(this)}><Icon type="plus" />新建</Button>
                            </div>
                        </div>
                        <div className='org-tabel'>
                            <Table columns={this.columns} rowKey ='id' dataSource={listData} loading={tabelLoading}  rowSelection={this.rowSelectionFn} size='middle' 
                            pagination={{size:"large",showSizeChanger:true,showQuickJumper:true,total:listData.total,showTotal:this.showTotal,onChange:this.onPageChange.bind(this),onShowSizeChange:this.onPageSizeChange.bind(this)}}/>
                        </div>
                        <Modal
                            title="新增"
                            visible={formVisitable}
                            onOk={this.formHandelOk.bind(this)}
                            onCancel={this.handleCancel.bind(this)}
                        >
                            <div className='model-height'>
                                <WrapCard wrappedComponentRef={(inst) => this.formRef = inst} data={editData}/> 
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
