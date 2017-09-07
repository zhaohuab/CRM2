
import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'

import { Menu, Icon } from 'antd';
const SubMenu = Menu.SubMenu;

import './index.less'

export default class LeftMenu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedKeys:[1]
        }
    }

    componentDidMount() {
    }

    onSelect = ( item ) => {
        // debugger
        // console.log(item)
        this.setState({
            selectedKeys:item.keyPath
        })
    }

    renderMenu = () => {
        return (
            <Menu
                defaultSelectedKeys = {["1"]}
                selectedKeys = {this.state.selectedKeys}
                mode="inline"
                inlineCollapsed={this.props.collapsed}
                onSelect = {this.onSelect}
            >
                <Menu.Item key="1">
                    <Link to="/crmweb">
                        <Icon type="home" />
                        <span>主页</span>
                    </Link>
                </Menu.Item>
                <SubMenu key="sub1" title={<span><Icon type="pie-chart" /><span>项目</span></span>}>
                    <Menu.Item key="2">
                        <Link to="/crmweb/project">
                            <span>项目管理</span>
                        </Link>
                    </Menu.Item>
                </SubMenu>
                <SubMenu key="sub2" title={<span><Icon type="user" /><span>用户</span></span>}>
                    <Menu.Item key="3">
                        <Link to="/crmweb/user">
                            <span>用户管理</span>
                        </Link>
                    </Menu.Item>
                </SubMenu>
            </Menu>
            );
    }
    
    render() {
        let menuClassName = this.props.collapsed ? "app-menu-con" : "app-menu-con menu-con-open";
        return <div  className={menuClassName}>
            {this.renderMenu()}
        </div>
    }
}
