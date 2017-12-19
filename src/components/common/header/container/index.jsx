import React, { Component, PropTypes } from "react";
import { connect } from "react-redux";
import { Icon, Button, Dropdown, Menu, Input, Badge, Col, Row, Modal} from "antd";
import cookie from "utils/cookie";
import { bindActionCreators } from "redux";
import { phonebooks as url } from "api";
import PhoneBooks from './phonebooks/index.jsx';
import Approved from './approved/index.jsx';
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
                    <p className="menu-more" onClick={this.getApprovalData}>
                        <span>审批</span>
                    </p>
                </Menu.Item>
                <Menu.Item key="2">
                    <p className="menu-more" onClick={this.getData} style={{cursor:'pointer'}}>
                        通讯录
                    </p>
                </Menu.Item>
            </Menu>
        );
    }

    loginOut() {
        this.props.action.loginOut();
    }

    getData = () => {//获取通讯录
        this.props.action.phoneBookChange()
        this.props.action.getData(url.mydept,url.organizations)
    }

    getApprovalData = () => {//获取审批流列表
        this.props.action.approvedShow();
        //this.props.action.getApprovalData();
    }

    render() {
        //debugger;
        const userName = cookie("name");
        let { $$state, action } = this.props;
        let title = $$state.get("title");    
        let phoneBook = $$state.get("phoneBook");  
        let approval = $$state.get("approval");   
                  
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
                            <Col span={1} >
                                <Dropdown
                                    overlay={this.menuMore}
                                    trigger={["click"]}
                                    style={{position:'relative'}}
                                >
                                    <a className="more-icon-warpper">
                                        <i className="iconfont icon-gengduo1 more-icon" />
                                    </a>                                   
                                </Dropdown>
                                 { phoneBook ? <PhoneBooks /> : '' }
                                 { approval ?  <Approved /> : ''}
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
        action: bindActionCreators(Actions, dispatch)
    };
})(Header);

