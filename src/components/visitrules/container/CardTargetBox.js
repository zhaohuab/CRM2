import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { DropTarget } from 'react-dnd'
import ItemTypes from './ItemTypes'
import {Row, Col, Card, Select} from 'antd'
import TaskCard from './TaskCard' 
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as Actions from '../action';

const style = {
	border: '1px solid gray',
	height: '15rem',
	width: '15rem',
	padding: '2rem',
	textAlign: 'center',
}

const boxTarget = {
	drop(props, monitor, component) {
       
        if(monitor.didDrop()){
        }
        const item = monitor.getItem();      
    },
}

function collect(connect, monitor){
    return{
        connectDropTarget: connect.dropTarget(),
        isOver:monitor.isOver(),
        canDrop:monitor.canDrop()
    };
}

class TargetBox extends Component {
	static propTypes = {
		connectDropTarget: PropTypes.func.isRequired,
		isOver: PropTypes.bool.isRequired,
		canDrop: PropTypes.bool.isRequired,
    }
    constructor(props) {
		super(props)
		this.sortCard = this.sortCard.bind(this)
        this.findCard = this.findCard.bind(this)
        this.deleteCard = this.deleteCard.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }
    
    sortCard(id, atIndex) {
        let items = this.props.$$state.get('selectedData').toJS();
		const { item, index } = this.findCard(id);
        items.splice(index,1);
        items.splice(atIndex, 0 ,item);
        this.props.action.handleSelectedCard(items);
	}

	findCard(id) {
        let items = this.props.$$state.get('selectedData').toJS();
		const item = items.filter(c => c.taskcardId === id)[0]
		return {
			item,
			index: items.indexOf(item),
		}
    }
    
    deleteCard(item){
        let leftData = this.props.$$state.get('leftData').toJS();
        let selectedData = this.props.$$state.get('selectedData').toJS();
        selectedData = selectedData.filter(x => x.taskcardId != item.taskcardId); 
        leftData.push(item);
        this.props.action.changeSelectedCard(leftData,selectedData);   
    }   

    handleChange(item,value,index){
        let selectedData = this.props.$$state.get('selectedData').toJS();       
        selectedData[index].required = value;
        this.props.action.handleSelectedCard(selectedData);          
    }

	render() {
        const { canDrop, isOver, connectDropTarget, item, index} = this.props;
		return connectDropTarget(
            <div >
                <TaskCard 
                    item = {item} 
                    index = {index}
                    sortCard = {this.sortCard}
                    findCard = {this.findCard}
                    deleteCard = {this.deleteCard}
                    handleChange = {this.handleChange}
                />
            </div>
		)
	}
}

TargetBox.propTypes = {
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
    connectDropTarget: PropTypes.func.isRequired,
    isOver: PropTypes.bool.isRequired
};

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

export default DropTarget(ItemTypes.CARD, boxTarget, collect)(connect( mapStateToProps, mapDispatchToProps)(TargetBox));