
import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Icon, Button, Switch } from 'antd'

import './index.less'

class ViewStyle extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
           open: false
        }
    }

    toggleViewOpen = () => {
        this.setState({
          open: !this.state.open
        })
    }

    toggleViewBox = (checked) => {
      this.props.toggleViewBox(checked);
    }

    render() {
        let viewClassName = this.state.open ? "app-view-style app-view-style-open" : "app-view-style";
        return <div id="app-view-style" className={viewClassName}>
               <div  className="layout-option">
                  <div className="layout-option-item">
                  宽屏/居中屏
                  <Switch defaultChecked={false} onChange={this.toggleViewBox} />
                  </div>
               </div>
               <div 
                   className="app-view-toggle" 
                   onClick = {this.toggleViewOpen}
               >
                   <Icon type="setting" />
               </div>
        </div>
    }
}

function mapStateToProps(state, ownProps) {
  return {
    $$state: state.login
  }
}

module.exports = connect(mapStateToProps, {})(ViewStyle);