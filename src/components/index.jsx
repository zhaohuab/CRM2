
import React, { Component, PropTypes } from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux';
import Menu from 'components/common/menu/container'
import Header from 'components/common/header/container'
import ViewStyle from 'components/common/viewstyle/container'
import * as Actions from './action.js'
import {Icon} from 'antd';
import './index.less'

class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            collapsed: false,
            viewBoxstyle: false
        }
    }

    toggleCollapsed = () => {
        this.props.componentAction.getCollaps()
    }
    
    toggleViewBox = (checked) => {
        this.props.componentAction.getToggle(checked)
    }

    render() {
        let {collapsed,toggle}=this.props.componentState.toJS()
        let viewBoxstyle = toggle ? "app-container full-height boxed-layout" : "app-container full-height";
        return <div className = "full-height">
            <div className={viewBoxstyle}>
                <Menu 
                    collapsed = {collapsed} 
                    toggleCollapsed = {this.toggleCollapsed} 
                />
                <div className="app-body">
                    <Header  
                        collapsed = {collapsed} 
                    />
                    <div className="app-content">{ this.props.children }</div>
                </div>
            </div>
            <ViewStyle toggleViewBox = {this.toggleViewBox} />
            <div className='app-talk'>
                <Icon type="message" />
            </div>
        </div>
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
)(Main) 