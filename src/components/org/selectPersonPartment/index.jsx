
import React from 'react';
import Immutable from 'immutable'
import { Button,Modal} from 'antd';
import './index.less'
import reqwest from 'reqwest';
import DpartTree from './DpartTree'
import ListChoose from './ListChoose.js'
import List from './List.jsx'

import PropTypes from 'prop-types';

export default class PersonDepartment extends React.Component {
    constructor(props){
        super(props);
        this.state={
            data:[],//存放获取所有tree数据
            dipartMent:[],//点击树后存放的部门
            keys:[],//点击tree保存点击对象
            list:[],//保存点击左侧后得到的数据
            person:[],//存放获取到的人员名单列表
            ary:[],//保存列表CheckBox点击状态列表
            target:null//点击某一个复选框获取当前点击对象
        }
    }
    //每次点击部门请求的新人员数据的每一项增加item.check=false
    setArray(data){
        let ary=data.map((item)=>{
            item.check=false
            return item
        })
        this.setState({
            ary
        },()=>{
            if(this.state.person.length){
                for(var i=0;i<this.state.person.length;i++){
                    let p=this.state.person;
                    for(var k=0;k<this.state.ary.length;k++){
                        let s=this.state.ary;
                        if(p[i].key===s[k].key){
                            s[k].check=true
                        }
                    }
                }
                this.setState({
                    ary:this.state.ary
                })
            }
        })
    }

    //点击cehckbox的时候获取最新的ary值
    onSelectList(data,target){

        this.setState({
            ary:data,
            target
        },()=>{
            let ary=this.state.ary;
            //放ary里为true的那一项
            let a=[]

            for(var i=0;i<ary.length;i++){
                if(ary[i].check){
                    a.push(ary[i])
                }
            }

            //如果人员不是单选
            if(!this.props.personSingle) {
                this.state.person.push(...a)
                let s = this.state.person
                for (var i = 0; i < s.length; i++) {
                    for (var k = i + 1; k < s.length; k++) {
                        if (s[i].key === s[k].key) {
                            s.splice(k, 1);
                            k--
                        }
                    }
                }

                //如果点击的是全选复选框
                if (!a.length) {
                    if (typeof this.state.target === 'boolean' && this.state.target === false) {

                        for (var i = 0; i < ary.length; i++) {
                            for (var k = 0; k < this.state.person.length; k++) {
                                if (this.state.person[k].key === ary[i].key) {
                                    this.state.person.splice(k, 1);
                                    break
                                }
                            }

                        }
                    }
                }

                //如果点击的是单个复选框
                if (typeof this.state.target === 'object' && this.state.target.check === false) {
                    for (var i = 0; i < this.state.person.length; i++) {
                        if (this.state.person[i].key === this.state.target.key) {
                            this.state.person.splice(i, 1)
                            break
                        }
                    }
                }
            }else{
                //如果人员是单选
                this.state.person=a
            }

            this.setState({
                person:this.state.person
            })
        })

    }
   // 每次点击新的部门 请求数据
    postDepartment(data){
        if(data){
            reqwest({
                url:this.props.options.url+data[0].key,
                type: 'json',
                method: 'get',
            }).then((result)=>{
                this.setState({
                    list:Immutable.fromJS(result),
                },()=>{
                    let listNew = this.state.list.toJS();
                    this.setArray(listNew);
                })
            })
        }else{
            this.setState({
                list:data
            })
        }
    }

    //组件渲染后获取数据
    componentDidMount(){
        this.getDepartment()
    }
    //获取数据方法
    getDepartment() {
        reqwest({
            url: this.props.options.url,
            type: 'json',
            method:'get',
        }).then((data)=>{
            this.setState({
                data:Immutable.fromJS(data),
            })
        })
    }


    //选择后删除单个元素
    listDelete(key){
        this.state.person=this.state.person.filter((item)=>{
            return item.key!==key
        })
        this.state.ary=this.state.ary.map((item)=>{
            if(item.key===key){
                item.check=false
            }
            return item
        })
        this.setState({
            person:this.state.person,
            ary:this.state.ary
        },()=>{
            console.log(this.state.ary)
        })
    }

    //确定按钮
    trueFn(){
        let newObj=[]
        debugger
        this.state.person.forEach((item,index)=>{
            newObj.push({key:item.key,title:item.name})
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
        let selectNode=selectObj.node.props
        if(this.props.departSingle){
            let singleArray=[]
            for(let i=0;i<selectArray.length;i++){
                if(selectArray[i].key === selectNode.eventKey){
                    singleArray.push(selectArray[i])
                }
            }
            selectObj.checkedNodes=singleArray
        }

        //多选
        let doubleArray=[]
        for(let i=0;i<selectObj.checkedNodes.length;i++){
            doubleArray.push(selectObj.checkedNodes[i].key)
        }
        this.setState({
            dipartMent:selectObj.checkedNodes,
            keys:doubleArray
        },()=>{
            let s=this.state.dipartMent;
            let flag=false
            for(var i=0;i<s.length;i++){
                if(s[i].key===selectNode.eventKey){
                    flag=true
                }
            }
            if(flag){
                this.postDepartment(this.state.dipartMent)
            }else {
                this.postDepartment(null)
            }
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
        const { data ,list} = this.state;
        let departmentData=[];
        let listData=[];
        if(data && data.size){
            departmentData = data.toJS();
        }

        if(list && list.size){
            listData = list.toJS()
        }

        return (
            <Modal 
                title={this.props.title}
                visible={this.props.visible}
                onOk={this.trueFn.bind(this)}
                onCancel={()=>this.cancelFn()}
            >
                <div className="person-out">
                    <p>已选择人员：</p>
                    <ListChoose
                        dataSource={this.state.person}
                        onDelete={this.listDelete.bind(this)}
                    />

                    <div className="person-flex">
                        <DpartTree
                            dataSource={departmentData}
                            loadData={this.props.async ? this.onLoadData.bind(this) : null}
                            onCheckChange={this.onCheckChange.bind(this)}
                            keys={this.state.keys}
                        />
                        {
                            listData.length&&this.state.ary.length?
                            <List
                                dataSource={listData}
                                selected={this.state.ary}
                                onSelect={this.onSelectList.bind(this)}
                                personSingle={this.props.personSingle}
                            />:
                            <div className="person-list"></div>
                        }

                    </div>
                </div>
            </Modal>
        )
    }
}

PersonDepartment.defaultProps={
    departSingle:true,
    async:false,
    listMultiple:true,
    options:{
        type:'json',
        method:'get'
    },
    personSingle:false,
    onOk:(data)=>{console.log(data)},
    onCancel:()=>{}
}

PersonDepartment.PropTypes={
    departSingle:PropTypes.bool.isRequired,
    async:PropTypes.bool.isRequired,
    options:PropTypes.object.isRequired,
    onOk:PropTypes.func.isRequired,
    onCancel:PropTypes.func.isRequired,
    listMultiple:PropTypes.bool.isRequired,
    personSingle:PropTypes.bool.isRequired
}




