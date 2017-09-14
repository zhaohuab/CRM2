import Department from '../../selectPerson/index.jsx'
import  React, { Component } from 'react';
import { Table, Icon,Button ,Form,  Input,  Checkbox,Col,DatePicker,message } from 'antd';
export default class Myself extends Component{
    constructor(props){
        super(props);
        const value=this.props.value || {}
        this.state={
            data:'',
            visible:false,
        }
    }
    fo(){
        this.setState({
            visible:true
        })
    }
    ok(data){
        if(!data.length){
            this.setState({
                data:'',
                visible:false
            },()=>{
                this.props.onChange(this.state.data)
            })
            return 
        }
        this.setState({
            data:data,
            visible:false
        },()=>{
            this.props.onChange(Object.assign({},{data:this.state.data}))
        })
    }
    cancel(){
        this.setState({
            visible:false
        })
    }
    render(){
        //自定义验证组件，必须触发默认父级传过来的this.props.onChange方法，通过这个方法把获取到的值通过state保存
        let data;
        if(this.props.value){
            data= this.props.value.data;
        }            
        return(
            <div>    
                <Department
                    async = {true}
                    multi={false}
                    options={{url:'http://localhost:5000/list'}}
                    onOk={this.ok.bind(this)}
                    onCancel={this.cancel.bind(this)}
                    selectKeys={this.props.value}
                    visible={this.state.visible}
                    title="修改"
                />   
                <input value={data?data:''} ></input>
                <div onClick={this.fo.bind(this)} className="department-chioce">
                    {data?
                    data.map((item,inde)=>{
                        return (
                            <span>{item.title}</span>
                        )
                    }):'请选择部门人员'}
                    
                </div>
            </div>
        )
    }
}