import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { DropTarget } from 'react-dnd';
import TargetBox from './TargetBox';
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
export default class Dustbin extends Component {
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
    };

    //已拖拽块-排序
    let nodeTargetList = this.props.targetList.map((item, index) => {
      const className = (item.apiName == "group") ? "drag-fields-list-item list-group" : "drag-fields-list-item";
      return <TargetBox
        index={index}
        id={item.id}
        key={item.id}
        moveCard={this.props.moveCard}
        delete={this.props.delete.bind(this, index)}
        item={item}
        classNames={className}
      />
    })


    return connectDropTarget(
      <div className="drap-fields-target-box" style={{ border }}>
        <div className="drag-fields-list-box" style={{ width: this.props.targetList.length*110 }}>
          {nodeTargetList}
        </div>
      </div>
    );
  }
}
