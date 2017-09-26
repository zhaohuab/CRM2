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
                <div className='actionButtons-chioce'>
                    已选择：{this.props.data.length}
                </div> 
                <div className='actionButtons'>
                    <Button onClick={this.returnBack.bind(this)}>返回</Button>
                    <Button onClick={this.deleteList.bind(this,this.props.data)}>删除</Button>
                    {this.props.data.length===1?
                       <Button onClick={this.changeForm.bind(this,this.props.data[0])}>编辑</Button>
                    :''}
                    <ButtonGroup>
                        <Button onClick={this.setEnablestate.bind(this,this.props.data,1)}>启用</Button>
                        <Button onClick={this.setEnablestate.bind(this,this.props.data,2)}>停用</Button>
                    </ButtonGroup>
                    <Button>导出</Button>
                </div>    
            </div>
        )
    }
}