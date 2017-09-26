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
            title: '简称',
            dataIndex: 'simpleName',
          }, 
          {
            title: '助记码',
            dataIndex: 'simpleCode',
          },
          {
            title: '上级组织名称',
            dataIndex: 'fatherorgName',
          },
          {
            title: '负责人',
            dataIndex: 'respoPerson',
          }, 
           {
            title: '其他负责人',
            dataIndex: 'otherRespoPerson',
          },
           {
            title: '组织类型',
            dataIndex: 'orgTypeName'
          },
           {
            title: '状态',
            dataIndex: 'enablestateName'
          }
        ]; 
        this.state={
            isEdit : false,
        }

        //点击每行table触发的onchange方法
        let that = this
        this.rowSelectionFn={
            onChange(selected, selectedRows){
                if(selectedRows.length){
                    that.props.orgAction.buttonEdit(selectedRows)
                }else{
                    that.props.orgAction.buttonEdit(selectedRows)
                }
            }
         }
       
    }

    //修改一条数据方法
    changeForm(record){ 
        this.setState({isEdit:true});
        this.props.orgAction.showForm(true,record);

    }

    //删除一条数据方法
    btnDelete(treeSelect,searchFilter,record){
        this.props.orgAction.listdel(record,treeSelect,searchFilter)
    }

    //启停用按钮
    btnSetEnablestate(treeSelect,searchFilter,data,state){
        this.props.orgAction.setEnablestate(treeSelect,searchFilter,data,state)
    }

    //修改页面取消按钮 
    handleCancel(){
        this.props.orgAction.showForm(false,{})
    }

   //表单页面确定方法
    formHandelOk(){
        this.formRef.props.form.validateFields((err, values) => {
            if (!err) {
                    
                if(this.state.isEdit){
                    this.props.orgAction.listchange(values);
                }else{
                    this.props.orgAction.listadd(values);  
                   
                }
            }
        });
    }

    //点击增加组织
    addFormBtn(){
        this.setState({isEdit:false});
        this.props.orgAction.showForm(true,{});
        // this.props.orgAction.changeAdd()
    }

    //显示每行数据后的返回按钮
    btnBack(){
        this.props.orgAction.buttonEdit([])
    }

    //点击树节点触发的方法
    treeSelectFn(selectedKeys,obj){
        if(selectedKeys.length){
            this.props.orgAction.listTreeChange(selectedKeys[0])
        }
    }
   
    //点击一个节点数的编辑操作
    treeSelectEditFn(rowKey){
        this.setState({isEdit:true});
        let rowData = {};
        let page = this.props.orgState.get("listData").toJS();
        for(let i=0,len=page.length;i<len;i++) {
            if(rowKey == page[i].id) {
                rowData = page[i];
                break;
            }
        }
        this.props.orgAction.showForm(true,rowData);
    }
    //点击一个节点数的增加操作
    treeSelectAddFn(item){
        this.setState({isEdit:false});
        let rowData = {fatherorgId:item.id,fatherorgName:item.name}
        this.props.orgAction.showForm(true,rowData);
    }

    //点击一个节点数的删除操作
    treeSelectDeleteFn(item){
        const record = [];
        record.push(item)
        this.props.orgAction.listdel(record,item.id)
    }
    //点击查询按钮
    searchList(item){
        this.props.orgAction.getlistByClickSearch({searchKey:item});
    }

    //组件渲染完毕获取数据
    componentDidMount(){
        this.props.orgAction.getlist();
        this.props.orgAction.getTreeList();
    }

    render() {
        //这获取总的状态  //拿到想要的之后再toJS
        let {orgState} = this.props;
        let tabelLoading = orgState.get('tabelLoading');
        let formVisitable = orgState.get('formVisitable')
        let treeLoading = orgState.get('treeLoading')
        let treeSelect = orgState.get('treeSelect');
        let searchFilter = orgState.get('searchFilter');

        let listData = orgState.get('listData').toJS();
        let treeData = orgState.get('treeData').toJS();
        let tableListCheckbox = orgState.get('tableListCheckbox').toJS();
        const WrapCard = Form.create()(card);
        let editData = orgState.get("editData").toJS();
        return (
            <div className='list-warpper'>
                <div className='list-main'>
                    <div className='list-table-tree'>
                        <Search placeholder="Search" onSearch={this.searchList.bind(this)}/>
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
                                <Button onClick={this.addFormBtn.bind(this)}>增加组织</Button>
                            </div>
                        </div>
                        <div className='org-tabel'>
                            <Table columns={this.columns} rowKey ='id' dataSource={listData} loading={tabelLoading}  rowSelection={this.rowSelectionFn} size='middle'/>
                        </div>
                        <Modal
                            title="修改组织"
                            visible={formVisitable}
                            onOk={this.formHandelOk.bind(this)}
                            onCancel={this.handleCancel.bind(this)}
                        >
                            <WrapCard wrappedComponentRef={(inst) => this.formRef = inst} data={editData}/> 
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
            orgState:state.orgReducers
        }
    },
    dispatch=>{
        return{
            orgAction:bindActionCreators(Actions,dispatch)
        }
    }
)(List)
