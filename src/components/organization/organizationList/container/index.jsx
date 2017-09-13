import  React, { Component } from 'react';
import { Table, Icon,Button ,Form,  Input,  Checkbox,Col,DatePicker,message,Modal,Spin ,Tree} from 'antd';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux';
import * as Actions from '../action/index.js'

import Immutable from 'immutable'
import NormalLoginForm from './listFrom.jsx'
import NormaladdForm from './listAddForm.jsx'
import ListTree from './listTree.jsx'
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
            treeLoading:false
        }
        
        
        this.columns = [
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
            dataIndex: 'pkFatherorg',
            key: 'pkFatherorg',
          },
          {
            title: '负责人',
            dataIndex: 'respMan',
            key: 'respMan',
          }, 
           {
            title: '其他负责人',
            dataIndex: 'otherRespMan',
            key: 'otherRespMan',
          },
           {
            title: '组织类型',
            dataIndex: 'orgType',
            key: 'orgType',
          },
           {
            title: '状态',
            dataIndex: 'enablestate',
            key: 'enablestate',
          },
          {
            title: '操作',
            key: 'action',
            render: (text, record,index) => (
              <div>
                <Button type="default" htmlType="button" onClick={()=>{this.changeFrom(record,index)}}>修改</Button>
                <Button type="danger" htmlType="button" onClick={()=>{this.itemDelete(record,index)}}>删除</Button>
              </div>
            ),
          }];  
    }

    //修改一条数据方法
    changeFrom(record,index){        
        this.props.orgAction.getDetailSingle(record.pkOrg,(data)=>{
            this.setState({
                changeFormVisitable:true,
                index,
                value:[data],
                spinning:true
            },()=>{
                this.formRef.changeValueFn(this.state.value)
                this.setState({
                    spinning:false
                })
            })
        });
    }

    //删除一条数据方法
    itemDelete(record,index){
            let delFn=()=>{
            message.success('删除成功');
            }
            this.props.orgAction.listdel(record,index,delFn)
    }

    //修改页面取消按钮 
    handleCancel(){
        this.setState({
            changeFormVisitable:false,
        });
    }

   //修改页面确定方法
   changeFormHandelOk(){
    this.formRef.props.form.validateFields((err, values) => {
        if (!err) {
                let closeFn=()=>{
                    this.setState({
                        changeFormVisitable:false
                    },()=>{
                        message.success('修改成功');
                    })
                }
                this.props.orgAction.listchange(values,this.props.index,closeFn);
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
                    message.success('增加项目成功');
            }
            this.props.orgAction.listadd(values,fn);  
            this.setState({
                addFormVisitable:false,
            });
        })
    }
 
    //增加组织页面取消按钮方法
    addFormHandleCancel(){
        this.setState({
            addFormVisitable:false,
        });
    }
    //点击增加组织
    addFormBtn(){
        this.setState({
            addFormVisitable:true
        });
    }
    //显示每行数据后的返回按钮
    tableListCheckboxFn(){
        this.setState({
            tableListCheckbox:null
        })
    }

    //点击树节点触发的方法
    treeSelectFn(selectedKeys,obj){
        console.log(selectedKeys)
        // let id=selectedKeys[0]
        // let treeFn=()=>{
        //     this.setState({
        //         treeLoading:false,
        //     })
        // }

        // this.props.orgAction.getClickList(treeFn,id);
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
        this.setState({
            tabelLoading:true,
            treeLoading:true
        },()=>{
            let tabelFn=()=>{
                this.setState({
                    tabelLoading:false,
                })
            }
            let treeFn=()=>{
                this.setState({
                    treeLoading:false,
                })
            }

            this.props.orgAction.getlist(tabelFn);
            this.props.orgAction.getTreeList(treeFn);
        })
    }

    render() {
        //获取数据
        let {total,voList} = this.props.orgState.toJS().listData;
        let {treeData} = this.props.orgState.toJS()
        if(voList){
            voList=voList.filter((item,index)=>{
                     if(item.orgType === 0){
                        item.orgType='部门'
                     }else if(item.orgType === 1){
                        item.orgType='公司'
                     }
                     return item
             })
        }

        let that=this;
        //点击每行table触发的onchange方法
        let rowSelectionFn={
            onChange(selectedRowKeys, selectedRows){
                if(selectedRows.length){
                    that.setState({
                        tableListCheckbox:selectedRows.length
                    })
                }else{
                    that.setState({
                        tableListCheckbox:null
                    })
                }
            }
        }

        return (
            <div className='list-warpper'>
                <h2>
                    <div className='list-title'>项目列表</div>
                </h2>

                <Modal
                    title="增加组织"
                    visible={this.state.addFormVisitable}
                    onOk={this.addFormHandleOk.bind(this)}
                    onCancel={this.addFormHandleCancel.bind(this)}
                >
                    <WrappedNormaladdForm wrappedComponentRef={(inst) => this.addformRef = inst}/>
                </Modal>
                <div className='list-main'>
                    <div className='list-table-tree'>
                        <Spin spinning={this.state.treeLoading} tip='正在加载'/>
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
                        {
                            this.state.tableListCheckbox?
                            <div className='actionButtons-waprper'>
                                <div className='actionButtons-chioce'>
                                    已选择：{this.state.tableListCheckbox}
                                </div> 
                                <div className='actionButtons'>
                                    <Button onClick={this.tableListCheckboxFn.bind(this)}>返回</Button>
                                    <Button>删除</Button>
                                    <Button>编辑</Button>
                                    <ButtonGroup>
                                        <Button>启用</Button>
                                        <Button>停用</Button>
                                    </ButtonGroup>
                                    <Button>导出</Button>
                                </div>    
                            </div>:'' 
                        }
                            <div className='list-add'>
                                <Button type="primary" onClick={this.addFormBtn.bind(this)}>增加组织</Button>
                            </div>
                        </div>
                        <div className='org-tabel'>
                            <Table columns={this.columns} dataSource={voList} loading={this.state.tabelLoading} rowSelection={rowSelectionFn}/>
                        </div>
                        <Modal
                            title="修改组织"
                            visible={this.state.changeFormVisitable}
                            onOk={this.changeFormHandelOk.bind(this)}
                            onCancel={this.handleCancel.bind(this)}
                        >
                            <WrappedNormalLoginForm wrappedComponentRef={(inst) => this.formRef = inst}
                                data={this.state.value} 
                                index={this.state.index}  
                            /> 
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


