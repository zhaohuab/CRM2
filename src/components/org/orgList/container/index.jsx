import  React, { Component } from 'react';
import { Table, Icon,Button ,Form,  Input,  Checkbox,Col,Modal,Spin} from 'antd';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux';
import * as Actions from '../action/index.js'

import Immutable from 'immutable'
import NormalLoginForm from './listFrom.jsx'
import NormaladdForm from './listAddForm.jsx'
import ListTree from './listTree.jsx'
import EditButton from './EditButtons.jsx'
import columns from './columns.js'
const ButtonGroup = Button.Group;
import './index.less'

//修改表格
const WrappedNormalLoginForm = Form.create()(NormalLoginForm);
//新增表格
const WrappedNormaladdForm = Form.create()(NormaladdForm);

class List extends Component {
    constructor(){
        super();
        this.state={
            index:0,//？？？不确定保留
            value:'',//修改时，获取一条数据的值
            changeFormVisitable:false,//修改组织时控制显隐
            addFormVisitable:false,//增加组织时控制显隐
            tabelLoading:false,//table加载,
            listTablePanel:0,//获取滑出模块的宽度,
            tableListCheckbox:null,//点击一个table的checkbox时，保存选中数量
            treeLoading:false,
            selectedRowKeys:[],

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
        this.columns = columns
    }

    //修改一条数据方法
    changeForm(record){ 
        if(record){
            this.props.orgAction.getDetailSingle(record.id,(data)=>{
                this.setState({
                   changeFormVisitable:true,
                   value:data
                },()=>{
                   this.formRef.changeValueFn(this.state.value)
                })
           })
        } 
    }

    //删除一条数据方法
    itemDelete(record,index){
       this.props.orgAction.listdel(record)
    }

    //修改页面取消按钮 
    handleCancel(){
        this.setState({
            changeFormVisitable:false,
         })
    }

   //修改页面确定方法
   changeFormHandelOk(){
    this.formRef.props.form.validateFields((err, values) => {
        if (!err) {
                let closeFn=()=>{
                    this.setState({
                        changeFormVisitable:false
                    })
                }
                this.props.orgAction.listchange(values);
                closeFn()
            }
        });
    }

    //增加页面确定按钮方法
    addFormHandleOk(){
        //let values=this.addformRef.props.form.getFieldsValue()
        this.addformRef.props.form.validateFields((err, values) => {
            let fn=()=>{
                    for(var key in values){
                        this.addformRef.props.form.setFieldsValue({
                            [key]: '',
                        });
                    }
            }
            this.props.orgAction.listadd(values);  
            fn()
        })
    }
 
    //增加组织页面取消按钮方法
    addFormHandleCancel(){
        this.props.orgAction.listaddclose()
    }

    //点击增加组织
    addFormBtn(){
        this.props.orgAction.changeAdd()
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
    treeSelectEditFn(item){
            console.log(item)
    }
    //点击一个节点数的增加操作
    treeSelectAddFn(item){

    }

    //点击一个节点数的删除操作
    treeSelectDeleteFn(item){
        
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
        let addFormVisitable = orgState.get('addFormVisitable')
        let treeLoading = orgState.get('treeLoading')

        let listData = orgState.get('listData').toJS();
        let treeData = orgState.get('treeData').toJS();
        let tableListCheckbox = orgState.get('tableListCheckbox').toJS();
       
        
        return (
            <div className='list-warpper'>
                <Modal
                    title="增加组织"
                    visible={addFormVisitable}
                    onOk={this.addFormHandleOk.bind(this)}
                    onCancel={this.addFormHandleCancel.bind(this)}
                >
                    <WrappedNormaladdForm wrappedComponentRef={(inst) => this.addformRef = inst}/>
                </Modal>
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
                            { tableListCheckbox.length? <EditButton data={tableListCheckbox} returnFn={this.btnBack.bind(this)} changeForm={this.changeForm.bind(this)}/>:'' }
                            <div className='list-add'>
                                <Button onClick={this.addFormBtn.bind(this)}>增加组织</Button>
                            </div>
                        </div>
                        <div className='org-tabel'>
                            <Table columns={this.columns} rowKey ='id' dataSource={listData} loading={tabelLoading}  rowSelection={this.rowSelectionFn} size='middle'/>
                        </div>
                        <Modal
                            title="修改组织"
                            visible={this.state.changeFormVisitable}
                            onOk={this.changeFormHandelOk.bind(this)}
                            onCancel={this.handleCancel.bind(this)}
                        >
                            <WrappedNormalLoginForm wrappedComponentRef={(inst) => this.formRef = inst} data={this.state.value}/> 
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

//onRowClick


//   {
//     title: '操作',
//     key: 'action',
//     // render: (text, record,index) => (
//     //   <div>
//     //     <Button type="default" htmlType="button" onClick={()=>{this.changeFrom(record)}}>修改</Button>
//     //     <Button type="danger" htmlType="button" onClick={()=>{this.itemDelete(record,index)}}>删除</Button>
//     //   </div>
//     // ),
//   }


