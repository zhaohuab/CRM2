import React from 'react';
import Immutable from 'immutable'

import {Button,Modal} from 'antd';
import './index.less'
import reqwest from 'reqwest';
import DpartTree from './DpartTree'
import DpartChoice from './DpartChoice'
import PropTypes from 'prop-types';

export default class Department extends React.Component {
    //设置所有数据类型验证性
    //设置默认值
    constructor(props){
        super(props);
        this.state={
            data:[],//存放获取所有数据
            dipartMent:[],//存放点击部门
            multi:props.multi,
            async:props.async,
            options:props.options,
            keys:[]
        }
    }
    //组件渲染后获取数据
    componentDidMount(){
        //每次重新渲染的时候都会执行此方法
        this.getDepartment()
    }
    //获取数据方法
    getDepartment() {
        reqwest({
            url: this.state.options.url,
            type: this.props.options.type,
            method: this.props.options.method,
        }).then((data)=>{
            let keys=[],k=[]
            if(this.props.selectKeys){
                keys = this.props.selectKeys.data;
                keys.forEach((item,index)=>{
                    k.push(item.key)
                })
            }
           this.setState({
               data:Immutable.fromJS(data),
               dipartMent:keys,
               keys:k
           })
        })
    }
    //选择后删除单个元素
    onDelete(key){
        this.state.dipartMent=this.state.dipartMent.filter((item)=>{
            return item.key !== key
        })
        let ary=[]
        for(var i=0;i<this.state.dipartMent.length;i++){
            ary.push(this.state.dipartMent[i].key)
        }

        this.setState({
            dipartMent:this.state.dipartMent,
            keys:ary
        })
    }

    //确定按钮
    trueFn(){
        let newObj=[]
        this.state.dipartMent.forEach((item,index)=>{
            newObj.push({key:item.key,title:item.title})
        })
    
        this.props.onOk(newObj)
    }

    //取消按钮
    cancelFn(){
        this.props.onCancel()
    }

    //点击部门展示
    onCheckChange(selectKeys,selectObj){
        //单选
        let selectArray=selectObj.checkedNodes;
        if(this.props.multi){
            let singleArray=[]
            for(var i=0;i<selectArray.length;i++){
                if(selectArray[i].key === selectObj.node.props.eventKey){
                    singleArray.push(selectArray[i])
                }
            }
            selectObj.checkedNodes=singleArray
        }
        //多选
        let doubleArray=[];
        let node=[]
        for(var i=0;i<selectObj.checkedNodes.length;i++){
            doubleArray.push(selectObj.checkedNodes[i].key);
            node.push({key:selectObj.checkedNodes[i].key,title:selectObj.checkedNodes[i].props.title})
        }
        
        this.setState({
            dipartMent:node,
            keys:doubleArray
        })
    }

    //异步加载事件.
    onLoadData(treeNode){
        return new Promise((resolve)=>{
            setTimeout(() => {
                resolve();
            }, 1000);
        })
    }

    render() {
        const { data } = this.state;
        let departmentData=[];
        if(data && data.size){
            departmentData = data.toJS();
        }
        return (
            <Modal 
                title={this.props.title}
                visible={this.props.visible}
                onOk={this.trueFn.bind(this)}
                onCancel={()=>this.cancelFn()}
            >
                <div className="app-out">
                    <p>已选择部门：</p>
                    <DpartChoice
                        dataSource={this.state.dipartMent}
                        onDelete={this.onDelete.bind(this)}
                    />
                    <DpartTree
                        dataSource={departmentData}
                        loadData={this.props.async ? this.onLoadData.bind(this) : null}
                        onCheckChange={this.onCheckChange.bind(this)}
                        keys={this.state.keys}
                    />
                    {/* <div className="app-button">
                        <Button type="primary" onClick={this.trueFn.bind(this)}>确定</Button>
                        <Button onClick={()=>this.cancelFn()}>取消</Button>
                    </div> */}
                </div>
            </Modal>
        )
    }
}
Department.defaultProps={
    multi:false,
    async:false,
    options:{
        type:'json',
        method:'get'
    },
    onOk:(data)=>{console.log(data)},
    onCancel:()=>{}
}

DpartTree.PropTypes={
    multi:PropTypes.bool.isRequired,
    async:PropTypes.bool.isRequired,
    options:PropTypes.object.isRequired,
    ok:PropTypes.func.isRequired,
    cancel:PropTypes.func.isRequired
}





