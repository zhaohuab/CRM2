import { Form, Row, Col, Input, Button,Modal, Table, message,Card, Icon, Select} from 'antd';
import {DragDropContext} from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import './index.less';
import React from 'react'
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as Actions from '../action';
import CardDragSource from './CardDragSource'
import CardTargetBox from './CardTargetBox'

Option = Select.Option;

const style = {
	border: '1px solid gray',
	padding: '2rem',
}

class TaskCardList extends React.Component {

    constructor(props) {
        super(props)
    
        this.state={
            visible:false,
        }
    }
  
    componentDidMount() {
                
    }

    componentWillMount() {

    }

    //选择卡片时触发，已选增加一条  待选减少一条
    onSelectedAdd(item){
        let leftData = this.props.$$state.get('leftData').toJS();
        let selectedData = this.props.$$state.get('selectedData').toJS();
        leftData = leftData.filter(x => x.taskcardId != item.taskcardId);    
        selectedData.push(item);
        this.props.action.changeSelectedCard(leftData,selectedData);        
    }

    handleChange(e) {    
        const value = e.target.value;
        this.setState({ value });
    }

    showTable(){
        this.setState({visible:true});
    }

    render() {             
        let leftData = this.props.$$state.get('leftData').toJS();
        let selectedData = this.props.$$state.get('selectedData').toJS();
        let dragSourceList = leftData.map((item,index) =>{
          return(
            <CardDragSource  item = {item} 
                addSelectedCard = {this.onSelectedAdd.bind(this,item)}
               />);        
        });

        let cardTargetBoxList = selectedData.map((item,index) =>{
          return(
            <CardTargetBox  item = {item} 
                index = {index}
               />);        
        });
        
        return ( 
            <div >				
				<div style = {style}>
                    <Row>
                        {cardTargetBoxList}
                    </Row>
				</div>
                <div style = {style}>
                    <Row>
                        {dragSourceList}
                    </Row>
				</div>
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

export default DragDropContext(HTML5Backend)(connect( mapStateToProps, mapDispatchToProps)(TaskCardList));
