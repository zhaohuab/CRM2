import React, { Component, PropTypes } from "react";
import { connect } from "react-redux";
import { Icon, Button, Dropdown, Menu, Input, Badge, Col, Row, Modal } from "antd";
import cookie from "utils/cookie";
import { bindActionCreators } from "redux";
import PhoneBooks from 'components/refs/phonebooks/index.jsx'
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
                        <span>个人信息</span>
                    </p>
                </Menu.Item>
                <Menu.Item key="3">
                    <p className="menu-more">
                        <span>修改密码</span>
                    </p>
                </Menu.Item>
                <Menu.Item key="4">
                    <p className="menu-more" onClick={this.loginOut.bind(this)}>
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
                    <p className="menu-more" style={{cursor:'pointer'}}>
                        <PhoneBooks/>
                    </p>
                </Menu.Item>
            </Menu>
        );
    }

    loginOut() {
        this.props.loginAction.loginOut();
    }


    render() {
        //debugger;
        const userName = cookie("name");
        let title = this.props.$$state.get("title");      
        return (
            <div className="app-header">
                <Row
                    className="app-header-inner"
                    type="flex"
                    align="middle"
                    justify="end"
                >
                    <Col span={4}>
                        <div>
                            <span className="header-title">{title}</span>
                        </div>
                    </Col>
                    <Col span={20}>
                        <Row
                            type="flex"
                            align="middle"
                            justify="end"
                            gutter={15}
                        >
                            <Col span={7}>
                                <Search
                                    placeholder="客户名称、地址、联系人"
                                    onSearch={value => console.log(value)}
                                />
                            </Col>

                            <Col span={4}>
                                <Row
                                    type="flex"
                                    align="middle"
                                    justify="center"
                                >
                                    <img
                                        src={require("assets/images/header/photo.png")}
                                        alt=""
                                        className="header-img"
                                    />

                                    <Dropdown
                                        overlay={this.menuSys}
                                        trigger={["click"]}
                                    >
                                        <a className="menu-down">
                                            <div className="header-username">
                                                {userName}
                                            </div>
                                            <Icon type="caret-down" />
                                        </a>
                                    </Dropdown>
                                </Row>
                            </Col>
                            <Col span={2}>
                                <Row type="flex" align="middle">
                                    <i className="iconfont icon-xiaoxi" />
                                    <Badge
                                        count={99}
                                        showZero
                                        className="Badge-custom"
                                    >
                                        <a href="#" className="head-example" />
                                    </Badge>
                                </Row>
                            </Col>
                            <Col span={1} style={{position:'relative'}}>
                                <Dropdown
                                    overlay={this.menuMore}
                                    trigger={["click"]}
                                >
                                    <a className="more-icon-warpper">
                                        <i className="iconfont icon-gengduo1 more-icon" />
                                    </a>
                                </Dropdown>
                              
                            </Col>
                        </Row>
                    </Col>
                </Row>
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


/*   { phoneBooks ? <div style={{width:'300px',height:'300px',position:'absolute',top:'10px',right:'10px',zIndex:'99999999999999999999999999999999999999999'}}><PhoneBooks/></div> : '' } */