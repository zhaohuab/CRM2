import  React, { Component } from 'react';
import { Table, Icon,Button ,Form,  Input,  Checkbox,Col,Modal,Spin} from 'antd';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
const ButtonGroup = Button.Group;
const confirm = Modal.confirm;
import './index.less'
import * as Actions from "../action/index.js";
class EditButtons extends Component {
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

    //启停用按钮
    setEnablestate(state) {
        let treeSelect = this.props.$$state.get("treeSelect");
        let selectedRows = this.props.$$state.get("selectedRows").toJS();
        this.props.action.setEnablestate(treeSelect,selectedRows, state);
    }

    render(){
        let selectedRows = this.props.$$state.get("selectedRows").toJS();
        return(
            <div className='actionButtons-waprper'>
                <div className='actionButtons-left'>
                    <div className='actionButtons-chioce'>
                        已选择{selectedRows.length}条
                    </div> 
                    <div className='actionButtons'>
                        <Button onClick={this.returnBack.bind(this)} className='returnbtn-class'> <i className='iconfont icon-fanhui'></i> 返回</Button>
                        <ButtonGroup className='returnbtn-class'>
                            <Button  onClick={this.setEnablestate.bind(this,1)}><i className='iconfont icon-qiyong'></i>启用</Button>
                            <Button onClick={this.setEnablestate.bind(this,2)}><i className='iconfont icon-tingyong'></i>停用</Button>
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


export default connect(
    state => {
        return {
            $$state: state.orgReducers
        };
    },
    dispatch => {
        return {
            action: bindActionCreators(Actions, dispatch)
        };
    }
)(EditButtons);
