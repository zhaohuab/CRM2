import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { DragSource } from 'react-dnd';

const boxSource = {
  beginDrag(props) {
    return {
      name: props.name,
      apiName: props.apiName,
      isReadOnly: props.isReadOnly || 0,
      isRequired: props.isRequired || 0,
    };
  },

  endDrag(props, monitor) {
    const item = monitor.getItem();
    const dropResult = monitor.getDropResult();
    if (dropResult) {
      props.addlist(item);
    }
  },
};

@DragSource("box", boxSource, (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging(),
}))
export default class Box extends Component {
  static propTypes = {
    connectDragSource: PropTypes.func.isRequired,
    isDragging: PropTypes.bool.isRequired,
    name: PropTypes.string.isRequired,
  };

  render() {
    const { isDragging, connectDragSource } = this.props;
    const { name } = this.props;
    let opacity = isDragging ? 0.4 : 1;
    return (
      connectDragSource(
        <div style={{ opacity }} className = "sourceBlock">
          {name}
        </div>,
      )
    );
  }
}
