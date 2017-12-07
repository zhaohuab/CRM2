import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { DropTarget, DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import Card from './Card.jsx';
import ItemTypes from './ItemTypes';
import { Row, Col } from 'antd';

const cardTarget = {
  drop(props, monitor) {
    let flag = props.flag;
    let { id, text} = monitor.getItem();
    const isOver = monitor.isOver({ shallow:true });
    if (isOver){
      props.dropLast(text.taskcardId, id, flag);
    }
   },
};

@DragDropContext(HTML5Backend)
@DropTarget(ItemTypes.CARD, cardTarget, connect => ({
  connectDropTarget: connect.dropTarget(),
}))
export default class Container extends Component {
  static propTypes = {
    connectDropTarget: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
  }
 
  choose = (e) => {
    e = e || window.event;
    const target = e.target || e.srcElement;
    let index = target.getAttribute('data-index');
    this.props.choosed(index)  
  } 
 
  render() {
    const { moveCard, findCard, connectDropTarget, flag, select, dropLast, text } = this.props;
    const  cards  = this.props.arr;

    return connectDropTarget(
      <div style={{minHeight:'180px'}}>
      <Row gutter={16}>
        { cards.map(card => (
          <Col key={card.id} span = { 8 }>
            <Card
              id = { card.id }          
              flag = { flag }
              key = { card.id } 
              select = { select }          
              text = { card.text }
              moveCard = { moveCard }
              findCard = { findCard }
            />
          </Col>
        ))}
        </Row>
      </div>
    );
  }
}
