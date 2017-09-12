
import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Icon, Button } from 'antd'

import './index.less'

class Header extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { $$state } = this.props;
        const user = $$state.get("user") || "";
        return <div className="app-header">
                <span className="menu-style-control" onClick={this.props.toggleCollapsed}>
                  <Icon type={this.props.collapsed ? 'menu-unfold' : 'menu-fold'} />
                </span>
                <div className="logger">{user}</div>
            </div>
    }
}

function mapStateToProps(state, ownProps) {
  return {
    $$state: state.login
  }
}

module.exports = connect(mapStateToProps, {})(Header);