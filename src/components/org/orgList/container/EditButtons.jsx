import  React, { Component } from 'react';
import { Table, Icon,Button ,Form,  Input,  Checkbox,Col,Modal,Spin} from 'antd';
const ButtonGroup = Button.Group;
import './index.less'
export default class EditButtons extends Component {
   returnBack(){
     this.props.returnFn()
   }

    render(){
        return(
            <div className='actionButtons-waprper'>
                <div className='actionButtons-chioce'>
                    已选择：{this.props.data.length}
                </div> 
                <div className='actionButtons'>
                    <Button onClick={this.returnBack.bind(this)}>返回</Button>
                    <Button>删除</Button>
                    {this.props.data.length===1? <Button>编辑</Button>:''}
                    <ButtonGroup>
                        <Button>启用</Button>
                        <Button>停用</Button>
                    </ButtonGroup>
                    <Button>导出</Button>
                </div>    
            </div>
           
        )
    }
}