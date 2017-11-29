
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import Container from './Container.jsx';
import * as Actions from "../../action"

 class SortableCancelOnDropOutside extends Component {
  constructor(props){
    super(props)
    this.moveCard = this.moveCard.bind(this);
    this.findCard = this.findCard.bind(this);
    this.dropLast = this.dropLast.bind(this);
   
  }

  moveCard(taskcardId,id, atIndex, flag) {//拖动交换位置
    const { card, index } = this.findCard(id);
    let initalState = this.props.$$state.get('initalState').toJS();
    if (card.isUse == flag) {//单侧上下交换  
        initalState.cards.splice(index, 1);
        initalState.cards.splice(atIndex, 0, card);
      this.props.action.changeState(initalState)
    }else if(taskcardId!=1){
      initalState.cards = initalState.cards.map((item) => {      
          if (item.id == card.id) {
            item.isUse = !item.isUse;
            item.isChoosed = item.isUse;
          }       
          return item
        })     
       this.props.action.changeState(initalState)//左右两侧交换
    }
    let arrRight = initalState.cards.filter((item) => item.isUse);
    let arr = [];
    for(let i=0,len=arrRight.length;i<len;i++){
      arr.push(arrRight[i].text)
    }
    this.props.action.checkedData(arr)
  }

  findCard(id) {//获取托动源
   let initalState = this.props.$$state.get('initalState').toJS();
    const { cards } = initalState;
    const card = cards.filter(c => c.id === id)[0];
    return {
      card,
      index: cards.indexOf(card),
    };
  }

  dropLast(id, data, flag){//异侧放在最后一个
  if(id==1){return}
  let initalState = this.props.$$state.get('initalState').toJS();
      initalState.cards=initalState.cards.map((item) => { 
        if (item.id == data && item.isUse != flag){
          item.isUse = !item.isUse;
          item.isChoosed = item.isUse
        }      
        return item
      })
    let arrRight = initalState.cards.filter((item) => item.isUse);
    let arr = [];
    for(let i=0,len=arrRight.length;i<len;i++){
      arr.push(arrRight[i].text)
    }
    this.props.action.changeState(initalState)
    this.props.action.checkedData(arr)
  }

  render() {
    let initalState = this.props.$$state.get('initalState').toJS(); 
    const moveCard = this.moveCard
    const findCard = this.findCard
    const left = initalState.left
    const right = initalState.right
    const dropLast = this.dropLast  
    let arrRight = initalState.cards.filter((item) => item.isUse)
    let arrLeft = initalState.cards.filter((item) => item.isUse == false)
    return (
      <div>
        <div style={{padding:'10px'}}>
          <p>已选</p>
          <Container 
            select = 'left'
            flag = { right } 
            arr = { arrRight }
            dropLast = { dropLast }             
            moveCard = { moveCard }
            findCard = { findCard }
          /> 

        </div>
        <div style={{padding:'10px', borderTop:'1px dashed #999'}}>
          <p>待选</p>
            <Container                
              select = 'right' 
              flag = { left }
              arr = { arrLeft }
              dropLast = { dropLast }   
              moveCard = { moveCard }
              findCard = { findCard }
            />     
        </div>             
      </div>
    );
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
export default  connect( mapStateToProps, mapDispatchToProps)(SortableCancelOnDropOutside);
