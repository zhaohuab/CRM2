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
import './index.less'

class List extends Component {
    constructor(){
        super();
        this.columns= [
          {
            title: '编码',
            dataIndex: 'code',
            key: 'code',
          },
          {
            title: '名称',
            dataIndex: 'name',
            key: 'name'
          }, 
          {
            title: '简称',
            dataIndex: 'simpleName',
            key: 'simpleName'
          }, 
          {
            title: '助记码',
            dataIndex: 'simpleCode',
            key: 'simpleCode',
          },
          {
            title: '上级组织',
            dataIndex: 'fatherorgId',
            key: 'fatherorgId',
          },
          {
            title: '上级组织名称',
            dataIndex: 'fatherorgName',
            key: 'fatherorgName',
          },
          {
            title: '负责人',
            dataIndex: 'respoPerson',
            key: 'respoPerson',
          }, 
           {
            title: '其他负责人',
            dataIndex: 'otherRespoPerson',
            key: 'otherRespoPerson',
          },
           {
            title: '组织类型',
            dataIndex: 'orgType',
            key: 'orgType',
            render:(text, record,index) => {
                if(text === 0 ){
                    return text='公司'
                }else if(text === 1){
                    return text='部门'
                }
            }
          },
           {
            title: '状态',
            dataIndex: 'enablestate',
            key: 'enablestate',
          }
        ]; 
        this.state={
            index:0,//？？？不确定保留
            value:'',//修改时，获取一条数据的值
            tabelLoading:false,//table加载,
            tableListCheckbox:null,//点击一个table的checkbox时，保存选中数量
            treeLoading:false,
            selectedRowKeys:[],
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
    btnDelete(treeSelect,record){
        this.props.orgAction.listdel(record,treeSelect)
    }

    btnSetEnablestate(treeSelect,data,state){
        this.props.orgAction.setEnablestate(treeSelect,data,state)
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
        this.props.orgAction.showForm(true,{});
    }

    //点击一个节点数的删除操作
    treeSelectDeleteFn(item){
        const record = [];
        record.push(item)
        this.props.orgAction.listdel(record,item.id)
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

        let listData = orgState.get('listData').toJS();
        let treeData = orgState.get('treeData').toJS();
        let tableListCheckbox = orgState.get('tableListCheckbox').toJS();
        const WrapCard = Form.create()(card);
        let editData = orgState.get("editData").toJS();
        return (
            <div className='list-warpper'>
                <div className='list-main'>
                    <div className='list-table-tree'>
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
                            { tableListCheckbox.length? <EditButton data={tableListCheckbox} setEnablestate={this.btnSetEnablestate.bind(this,treeSelect)} deleteList={this.btnDelete.bind(this,treeSelect)} returnFn={this.btnBack.bind(this)} changeForm={this.changeForm.bind(this)}/>:'' }
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
