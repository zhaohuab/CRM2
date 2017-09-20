
import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Icon, Button ,Dropdown,Menu} from 'antd'
import cookie from 'utils/cookie'
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
        const userName = cookie("name");
        let title = this.props.$$state.get("title");
        return (
            <div className="app-header">
                <div className="app-header-title">{title}</div>
                <div className="app-header-right">
                   <img src={require('assets/images/header/cat.png')} alt=""/>
                   <div style={{ marginLeft: 10 }}>{userName}</div>
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
    $$state: state.header,
  }
}

module.exports = connect(mapStateToProps, {})(Header);