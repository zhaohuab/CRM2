import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { DropTarget } from 'react-dnd';

const boxTarget = {
  drop() {
    return { name: 'Dustbin' };
  },
};

@DropTarget("box", boxTarget, (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  isOver: monitor.isOver(),
  canDrop: monitor.canDrop(),
}))
export default  class Dustbin extends Component {
  static propTypes = {
    connectDropTarget: PropTypes.func.isRequired,
    isOver: PropTypes.bool.isRequired,
    canDrop: PropTypes.bool.isRequired,
  };

  render() {
    const { canDrop, isOver, connectDropTarget } = this.props;
    const isActive = canDrop && isOver;

    let border = null;
    if (isActive) {
      border = "1px dashed #8bbbff"
    } else if (canDrop) {
      border = "1px dashed #1671D5"
    }

    return connectDropTarget(
      <div className="drag-fields-add" style={{ border }}>
        +
      </div>
    );
  }
}
