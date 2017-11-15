import React from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {Table, Button, Popconfirm, Input, Icon, Form, Modal, Row, Col, Card} from 'antd';
import TaskCard from './TaskCardList.jsx';
import HeadLabel from './HeadLabel.jsx';
import './index.less';
import * as Actions from '../action'
import 'assets/stylesheet/all/iconfont.css'

let Search = Input.Search;
const ButtonGroup = Button.Group;

class List extends React.Component{
    constructor(props){
        super(props)
        this.state = {   
            headLabel : false,
            selectedRowKeys : [],
            isEdit : false,
            keys:[],
            listLen:{},
            hasFinished:false,
            index:{}
        }                     
    }

    componentDidMount() {
        this.props.action.getListData();
    }

    handleVisitCardChange(visitCardData) {
       this.props.action.handleCardDataChange(visitCardData);
    }
    
    onClose(){
        this.props.action.showCard(false,{});
    }

    onEdit = () => {
        this.setState({isEdit:true});
        let rowKey = this.state.selectedRowKeys[0];//只能编辑第一条选中数据
        let rowData = {};
        let data = this.props.$$state.get("data").toJS();
        for(let i=0,len=data.length;i<len;i++) {
            if(rowKey == data[i].id) {
                rowData = data[i];
                break;
            }
        }        
        let cardLen = rowData.taskcardList.length; 
        let {keys} = this.state;
        for(let i =0; i<cardLen+1; i++){
           keys[i] = i+1;
        }   
        this.props.action.showCard(true,rowData);      
    }

    onSave(){
        let {index} = this.state;
        let data = this.props.$$state.get('data').toJS();  
        let selectedData = this.props.$$state.get('selectedData').toJS();
        let leftData = this.props.$$state.get('leftData').toJS();
        data.voList[index].taskcardList = selectedData;
        data.voList[index].uncheckedList = leftData;
        let id = data.voList[index].id;
        this.props.action.onSave4Edit(id,selectedData,data);
    }

    onSelectChange(selectedRowKeys){
        let state = {
            selectedRowKeys:selectedRowKeys
        }
        state.headLabel = selectedRowKeys.length ? true:false;
        this.setState( state );
    }

    showDetail(rowData,index){
        this.props.action.showCard(true,rowData);
        this.props.action.changeSelectedCard(rowData.uncheckedList,rowData.taskcardList);
        this.setState({index:index});
    }   
    
    onFresh(){
        this.props.action.getListData();
    }
    render(){
        let data = this.props.$$state.get('data').toJS().voList;
        let visible = this.props.$$state.get('visible');
        let {headLabel,selectedRowKeys} = this.state;
        let rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange.bind(this),
        };
        let editData = this.props.$$state.get('editData').toJS();
        let visitRulesList = data.map((item, index) =>{
          return(
            <Col span={8}>
                <Card id={item.id}
                    title={'图标'} 
                    extra={<a onClick={this.showDetail.bind(this,item,index)}>任务卡</a>}
                    style={{ width:400 }}>
                        <span>客户等级：{item.cumEnumValueName}</span><br/>
                        <span>适用范围：全公司</span>
                </Card>
            </Col>);        
        });

        return(
            <div className='user-warpper'>                
          
                <div className='head_panel'> 
                    <div className='head_panel-right'>
                        <Button  type="primary"  onClick={this.onFresh.bind(this)}> 刷新</Button>
                    </div>
                </div> 
                <div> 
                    <Row>
                        {visitRulesList}
                    </Row>
                </div>
                <Modal title="任务卡" visible={visible} onOk={this.onSave.bind(this)} onCancel={this.onClose.bind(this)} width={800}>
                    <div height={1600}>
                        <TaskCard dataSource={editData} height ={1600}/>
                    </div>                 
                </Modal>        
                
            </div>
        )
    }
}

function mapStateToProps(state, ownProps) {
    return{
        $$state: state.visitRules
    }
}

function mapDispatchToProps(dispatch) {
    return {
       action: bindActionCreators(Actions,dispatch)
    }
}

export default connect( mapStateToProps, mapDispatchToProps)(List);