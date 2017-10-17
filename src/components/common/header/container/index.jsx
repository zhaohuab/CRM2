import React, { Component, PropTypes } from "react";
import { connect } from "react-redux";
import { Icon, Button, Dropdown, Menu, Input, Badge } from "antd";
import cookie from "utils/cookie";
import { bindActionCreators } from "redux";
import * as Actions from "../action/index.js";

const Search = Input.Search;
import "./index.less";
import "assets/stylesheet/all/iconfont.css";

class Header extends React.Component {
    constructor(props) {
        super(props);
        this.menuSys = (
            <Menu>
                <Menu.Item key="1">
                    <p className="menu-more">
                        <Icon type="question-circle-o" />
                        <span>个人信息</span>
                    </p>
                </Menu.Item>
                <Menu.Item key="3">
                    <p className="menu-more">
                        <Icon type="question-circle-o" />
                        <span>修改密码</span>
                    </p>
                </Menu.Item>
                <Menu.Item key="4">
                    <p className="menu-more" onClick={this.loginOut.bind(this)}>
                        <Icon type="setting" />
                        <span>退出</span>
                    </p>
                </Menu.Item>
            </Menu>
        );
        this.menuMore = (
            <Menu>
                <Menu.Item key="1">
                    <p className="menu-more">
                        <span>审批</span>
                    </p>
                </Menu.Item>
                <Menu.Item key="2">
                    <p className="menu-more">
                        <span>通讯录</span>
                    </p>
                </Menu.Item>
            </Menu>
        );
    }
    loginOut() {
        this.props.loginAction.loginOut();
    }
    render() {
        const userName = cookie("name");
        let title = this.props.$$state.get("title");
        return (
            <div className="app-header">
                <div className="app-header-title">{title}</div>
                <div className="app-header-right">
                    <main className="client-header-left">
                        <Search
                            className="clinet-search del-border"
                            placeholder="客户名称、地址、联系人"
                            onSearch={value => console.log(value)}
                            className="clinet-search-style"
                        />
                    </main>
                    <main className="client-header-right">
                        <div>
                            <img
                                src={require("assets/images/header/photo.png")}
                                alt=""
                            />

                            <Dropdown
                                overlay={this.menuSys}
                                trigger={["click"]}
                            >
                                <a className="menu-down">
                                    <div className="header-right-title">
                                        {userName}
                                    </div>
                                    <Icon type="caret-down" />
                                </a>
                            </Dropdown>
                        </div>
                        <div>
                            <i className="iconfont icon-xiaoxi clinet-alert-icon" />
                            <Badge count={99} showZero className="Badge-custom">
                                <a href="#" className="head-example" />
                            </Badge>
                        </div>
                        <div>
                            <Dropdown
                                overlay={this.menuMore}
                                trigger={["click"]}
                            >
                                <a className="menu-down">
                                    <i className="iconfont icon-gengduo1" />
                                </a>
                            </Dropdown>
                        </div>
                    </main>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state, ownProps) {
    return {
        $$state: state.header
    };
}

module.exports = connect(mapStateToProps, dispatch => {
    return {
        loginAction: bindActionCreators(Actions, dispatch)
    };
})(Header);
