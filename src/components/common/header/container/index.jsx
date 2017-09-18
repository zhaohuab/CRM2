
import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Icon, Button ,Dropdown,Menu} from 'antd'

import './index.less'


const menu = (
  <Menu>
    <Menu.Item key="1"><Icon type="question-circle-o"/>设置</Menu.Item>
    <Menu.Item key="2"><Icon type="setting"/>疑问</Menu.Item>
  </Menu>
);

class Header extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { $$state } = this.props;
        const user = $$state.get("user") || "";
        return (
            <div className="app-header">
                <div className="app-header-title">组织</div>
                <div className="app-header-right">
                   <img src={require('assets/images/header/cat.png')} alt=""/>
                   <div style={{ marginLeft: 10 }}>hello word</div>
                   <Dropdown overlay={menu}>
                      <Button  style={{ marginLeft: 10 }}>
                        <Icon type="down" />
                      </Button>
                  </Dropdown>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state, ownProps) {
  return {
    $$state: state.login
  }
}

module.exports = connect(mapStateToProps, {})(Header);