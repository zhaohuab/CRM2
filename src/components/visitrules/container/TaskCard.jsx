import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { DragSource, DropTarget } from 'react-dnd'
import ItemTypes from './ItemTypes'
import {Row,Col, Card, Select, Button} from 'antd'
import Enum from 'utils/components/enums'

const Option = Select.Option;

const style = {
	border: '1px dashed gray',
	padding: '0.5rem 1rem',
	marginBottom: '.5rem',
	backgroundColor: 'white',
	cursor: 'move',
}

const cardSource = {

	beginDrag(props) {
		return {
			id: props.item.taskcardId,
			originalIndex: props.index,
		}
	},

	endDrag(props, monitor) {
		const didDrop = monitor.didDrop()

		if (!didDrop) {
		}
	},
}

const cardTarget = {
	canDrop() {
		return false
	},

	hover(props, monitor) {
	 	const draggedId = monitor.getItem().id;
	 	const overId = props.item.taskcardId;
	 	if (draggedId !== overId) {
		 	const overIndex = props.findCard(overId).index;
	 	 	props.sortCard(draggedId, overIndex);
	 	}
	 },
}

@DropTarget(ItemTypes.SORT, cardTarget, connect => ({
	connectDropTarget: connect.dropTarget(),
}))
@DragSource(ItemTypes.SORT, cardSource, (connect, monitor) => ({
	connectDragSource: connect.dragSource(),
	isDragging: monitor.isDragging(),
}))
export default class TaskCard extends Component {
	static propTypes = {
		connectDragSource: PropTypes.func.isRequired,
		connectDropTarget: PropTypes.func.isRequired,
		isDragging: PropTypes.bool.isRequired,
		item: PropTypes.any.isRequired,
		index: PropTypes.string.isRequired,
		moveCard: PropTypes.func.isRequired,
		findCard: PropTypes.func.isRequired,
	}

	handleChange (item,value) {
		const index = this.props.index;
		this.props.handleChange(item,value,index);
	}

	deleteCard(item){
		this.props.deleteCard(item);
	}

	render() {
		const {
			isDragging,
			connectDragSource,
      connectDropTarget,
      item,
      index,
      sortCard,
			findCard,
			deleteCard
		} = this.props
		const opacity = isDragging ? 0 : 1

		return connectDragSource(
			connectDropTarget(
				<div>
					<Col span={8}>
              <Card id={item.taskcardId}
                title={item.taskcardName} 
                extra={item.isPreseted.toString()=='1'?
									<div/>:<div>															
										<Button onClick = {this.deleteCard.bind(this,item)} 
														shape="circle" icon="close"/> 
										</div>                                           								
								}								
                style={{ width: 200 }}>
								<div >
									<Row>
									<Col span={20}>
                    <span>这张任务卡干嘛的</span>
										</Col>
										<Col span={4}>
                    <Select defaultValue= {item.required.toString()==0?'1':item.required.toString()} 
														onChange = {this.handleChange.bind(this,item)}>
                      <Option value = '1'>是</Option>
                      <Option value = '2'>否</Option>
                    </Select> 
										</Col>																		
									</Row>
								</div>
              </Card>
            </Col>
        </div>)  ,                 
		)
	}
}