import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { DragSource } from 'react-dnd'
import ItemTypes from './ItemTypes'
import {Row, Col, Card, Select, Button} from 'antd' 
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as Actions from '../action';
import TaskCard from './TaskCard' 

const style = {
	border: '1px solid gray',	
	padding: '2rem',
}

const boxSource = {

	beginDrag(props) {
		return {}
    },
    
    endDrag(props, monitor){   
        if(monitor.getDropResult()){
            props.addSelectedCard(props.item);
        };
    }
}

function collect(connect, monitor) {
    return {
      connectDragSource: connect.dragSource(),
      isDragging: monitor.isDragging()
    }
}

class SourceBox extends Component {
	static propTypes = {
		isDragging: PropTypes.bool.isRequired,
		connectDragSource: PropTypes.func.isRequired,
		showCopyIcon: PropTypes.bool,
    }   
    
	render() {
		const { isDragging, connectDragSource, showCopyIcon } = this.props
		const opacity = isDragging ? 0.4 : 1
        const item = this.props.item;
 
		return connectDragSource(
            <div >
                <Col span={8}>
                  <Card id={item.taskcardId}
                    title={item.taskcardName} 
                    extra={<div>
                            {/* <Select defaultValue='1'>
                                <Option value = '1'>是</Option>
                                <Option value = '2'>否</Option>
                            </Select>  */}
                        </div>}
                    style={{ width: 200 }}>
                        <span>这张任务卡干嘛的</span>
                  </Card>
                </Col>
            </div>,
		);
	}
}

SourceBox.propTypes = {
    connectDragSource: PropTypes.func.isRequired,
    isDragging:PropTypes.bool.isRequired
};

export default DragSource(ItemTypes.CARD, boxSource, collect)(SourceBox);

