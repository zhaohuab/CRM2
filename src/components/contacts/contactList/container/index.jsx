import React, { Component, PropTypes } from 'react';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux';
import * as Actions from '../action/index.js'
import './index.less'
class Contacts extends React.Component {
    render(){
        console.log(this.props.componentState.get('collapsed'))
        //this.props.componentAction.getCollaps()
        return(
            <div className='contacts-wrapper'>
1111111
            </div>
        )
    }
}
export default connect(
    state=>{
        return{
            componentState:state.componentReducer
        }
    },
    dispatch=>{
        return{
            componentAction:bindActionCreators(Actions,dispatch)
        }
    }
)(Contacts)