import  React, { Component } from 'react';
import { Table, Icon,Button ,Form,  Input,  Checkbox,Col,Modal,Spin} from 'antd';
const ButtonGroup = Button.Group;
const confirm = Modal.confirm;
import './index.less'

export default class EditButtons extends Component {
   returnBack(){
     this.props.returnFn()
   }
   changeForm(id){
       this.props.changeForm(id)
   }
   deleteList(data){
        let that =this
        confirm({
        title: '确定要删除吗?',
        content: '此操作不可逆',
        okText: '是',
        okType: 'danger',
        cancelText: '否',
        onOk() {
            that.props.deleteList(data);
        },
        onCancel() {
        console.log('Cancel');
        },
     });
   }
 
   setEnablestate(data,state){
        this.props.setEnablestate(data,state);
   }
    render(){
        return(
            <div className='actionButtons-waprper'>
                <div className='actionButtons-left'>
                    <div className='actionButtons-chioce'>
                        已选择{this.props.data.length}条
                    </div> 
                    <div className='actionButtons'>
                        <Button onClick={this.returnBack.bind(this)} className='returnbtn-class'> <i className='iconfont icon-fanhui'></i> 返回</Button>
                        <Button className='returnbtn-class' onClick={this.deleteList.bind(this,this.props.data)}><i className='iconfont icon-shanchu'></i>删除</Button>
                        {this.props.data.length===1?
                        <Button onClick={this.changeForm.bind(this,this.props.data[0])} className='returnbtn-class'> <i className='iconfont icon-bianji'></i>编辑</Button>
                        :''}
                        <ButtonGroup className='returnbtn-class'>
                            <Button  onClick={this.setEnablestate.bind(this,this.props.data,1)}><i className='iconfont icon-qiyong'></i>启用</Button>
                            <Button onClick={this.setEnablestate.bind(this,this.props.data,2)}><i className='iconfont icon-tingyong'></i>停用</Button>
                        </ButtonGroup>
                        
                    </div> 
                </div>
                <div  className='actionButtons-right'>
                    <Icon type="close" onClick={this.returnBack.bind(this)}/>
                </div>   
            </div>
        )
    }
}