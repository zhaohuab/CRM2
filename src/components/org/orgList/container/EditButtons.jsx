import  React, { Component } from 'react';
import { Table, Icon,Button ,Form,  Input,  Checkbox,Col,Modal,Spin} from 'antd';
const ButtonGroup = Button.Group;
import './index.less'
export default class EditButtons extends Component {
   returnBack(){
     this.props.returnFn()
   }
   changeForm(id){
       this.props.changeForm(id)
   }

    render(){
        return(
            <div className='actionButtons-waprper'>
                <div className='actionButtons-left'>
                    <div className='actionButtons-chioce'>
                        已选择：{this.props.data.length}
                    </div> 
                    <div className='actionButtons'>
                        <Button onClick={this.returnBack.bind(this)} className='returnbtn-class' icon='swap-left'>返回</Button>
                        <Button className='returnbtn-class' icon='delete'>删除</Button>
                        {this.props.data.length===1?
                        <Button onClick={this.changeForm.bind(this,this.props.data[0])} className='returnbtn-class' icon='edit'>编辑</Button>
                        :''}
                        <ButtonGroup className='returnbtn-class'>
                            <Button icon='play-circle-o'>启用</Button>
                            <Button icon='pause-circle-o'>停用</Button>
                        </ButtonGroup>
                        <Button className='returnbtn-class' icon='download'>导出</Button>
                    </div> 
                </div>
                <div  className='actionButtons-right'>
                    <Icon type="close" onClick={this.returnBack.bind(this)}/>
                </div>   
            </div>
        )
    }
}