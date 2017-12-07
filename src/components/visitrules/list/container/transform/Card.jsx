import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import PropTypes from 'prop-types';
import { DragSource, DropTarget } from 'react-dnd';
import ItemTypes from './ItemTypes';
import { Card } from 'antd';
import * as Actions from "../../action"

const style = {
  cursor: 'pointer'
};

const cardSource = {
  beginDrag(props) {
    return {
      text: props.text,
      id: props.id,
      originalIndex: props.findCard(props.id).index,
    };
  },

  endDrag(props, monitor) {
    const { id: droppedId, originalIndex, text } = monitor.getItem();
    const didDrop = monitor.didDrop(); 
    if (!didDrop) {
      props.moveCard(text.taskcardId, droppedId, originalIndex, props.flag);
    }
  },
};

const cardTarget = {
  canDrop() {
    return false;
  },

  hover(props, monitor) {
    const { id: draggedId, text } = monitor.getItem();
    const { id: overId } = props;
    if (draggedId !== overId) { 
      const { index: overIndex } = props.findCard(overId);
      props.moveCard(text.taskcardId, draggedId, overIndex, props.flag);
    }
  },
};


@DropTarget(ItemTypes.CARD, cardTarget, connect => ({
  connectDropTarget: connect.dropTarget(),
}))
@DragSource(ItemTypes.CARD, cardSource, (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging(),
}))
 class Cards extends Component {

  constructor(props){
    super(props);
    this.state={required:1}
  }
  
  requiredChange = (text,editData) => {//必输和非必输转换
    if (editData){
      for(let i=0,len=editData.taskcardList.length;i<len;i++){
        let cur = editData.taskcardList[i];
        if (cur.taskcardId==text.taskcardId){
          cur.required = cur.required==1 ? 2 :1;
          break;
        }
      }
      this.props.action.requiredChange(editData.taskcardList)  
      this.setState({required:!this.state.required})
    }  
  }

  static propTypes = {
    connectDragSource: PropTypes.func.isRequired,
    connectDropTarget: PropTypes.func.isRequired,
    isDragging: PropTypes.bool.isRequired,
    id: PropTypes.any.isRequired,
    text: PropTypes.string.isRequired,
    moveCard: PropTypes.func.isRequired,
    findCard: PropTypes.func.isRequired,
  };
  componentDidMount(){
    let item = this.props.text;
    this.setState({required:item.required})
  }
  render() {
    let editData = this.props.$$state.get('editData').toJS();
    const { id, text, isDragging, connectDragSource, connectDropTarget, flag, select } = this.props;
    const opacity = isDragging ? 0 : 1;
    return connectDragSource(connectDropTarget(
      <div 
       style={{ ...style, opacity }}
       data-index = { id }
       data-select = { select }
      >
       {
         <Card 
          title={text.taskcardName}             
          extra={<div onClick={this.requiredChange.bind(this,text,editData)} style={{cursor:'pointer'}}>
          { this.state.required==1?'必输':'非必输'}
          </div>} 
          style={{marginTop:'10px',minHeight:'120px'}} 
        >
        <p>简介：{text.remark}</p>
        </Card>}
      </div>,
    ));
  }
}


function mapStateToProps(state, ownProps) {
  return {
    $$state: state.visitrules
  }
}
function mapDispatchToProps(dispatch) {
  return {
    action: bindActionCreators(Actions, dispatch)
  }
}
export default  connect( mapStateToProps, mapDispatchToProps)(Cards);