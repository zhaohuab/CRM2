
import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Icon, Button ,Dropdown,Menu,Input,Badge} from 'antd'
import cookie from 'utils/cookie'

const Search = Input.Search;
import './index.less'


const menu = (
  <Menu>
    <Menu.Item key="1"><p className='menu-more'><Icon type="question-circle-o"/><span>个人信息</span></p></Menu.Item>
    <Menu.Item key="2"><p className='menu-more'><Icon type="question-circle-o"/><span>通讯录</span></p></Menu.Item>
    <Menu.Item key="3"><p className='menu-more'><Icon type="question-circle-o"/><span>修改密码</span></p></Menu.Item>
    <Menu.Item key="4"><p className='menu-more'><Icon type="setting"/><span>退出</span></p></Menu.Item>
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
                    <main className='client-header-left'>
                        <Input 
                            className='clinet-search del-border'
                            placeholder="搜索"
                            style={{ width: 200 }}
                            onSearch={value => console.log(value)}
                        />
                        <div className='clinet-alert'>
                            <Icon type="bell" />
                            <Badge count={0} showZero>
                                <a href="#" className="head-example" />
                            </Badge>
                        </div>
                    </main>
                    <main className='client-header-right'>
                        <img src={require('assets/images/header/cat.png')} alt=""/>
                        <div style={{ marginLeft: 10 }}>{userName}</div>
                        <Dropdown overlay={menu}>
                            <a style={{ marginLeft: 10 }}>
                              <Icon type="down" />
                            </a>
                        </Dropdown>
                    </main>
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