
import React, { Component, PropTypes } from 'react'
import Menu from 'components/common/menu/container'
import Header from 'components/common/header/container'
import ViewStyle from 'components/common/viewstyle/container'

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
        this.setState({
            collapsed: !this.state.collapsed,
        });
    }
    
    toggleViewBox = (checked) => {
        this.setState({
            viewBoxstyle: checked
        });
    }

    render() {
        let viewBoxstyle = this.state.viewBoxstyle ? "app-container full-height boxed-layout" : "app-container full-height";
        return <div className={viewBoxstyle}>
            <Header  
                collapsed = {this.state.collapsed} 
                toggleCollapsed = {this.toggleCollapsed} 
            />
            <div className="app-body">
                <Menu 
                    collapsed = {this.state.collapsed} 
                />
                <div className="app-content">
                    { this.props.children }
                </div>
            </div>
            <ViewStyle toggleViewBox = {this.toggleViewBox} />
        </div>
    }
}

export default  Main