import React, { Component, PropTypes } from "react";
import { Icon, Button, Dropdown, Menu, Collapse } from "antd";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
const Panel = Collapse.Panel;
import * as Actions from "../action/index.js";
import "./index.less";
import { browserHistory } from "react-router";

class Contacts extends React.Component {
    btnBack() {
        debugger;
        browserHistory.push(this.props.params.father);
    }

    render() {
        let collapse = this.props.componentState.get("collapsed");
        const menu = (
            <Menu>
                <Menu.Item key="1">转移给他人</Menu.Item>
                <Menu.Item key="2">删除</Menu.Item>
                <Menu.Item key="3">操作记录</Menu.Item>
            </Menu>
        );
        return (
            <section
                className={
                    collapse
                        ? "contacts-wrapper thin "
                        : "contacts-wrapper wide"
                }
            >
                <header className="contacts-wrapper-header">
                    <div
                        className="wrapper-header-title"
                        onClick={this.btnBack.bind(this)}
                    >
                        <i className="iconfont icon-fanhui" />
                        <h3>联系人</h3>
                    </div>
                </header>
                <main className="contacts-wrapper-main">
                    <div className="wrapper-main-inner">
                        <div className="inner-person-info">
                            <figure>
                                <img
                                    src={require("assets/images/header/photo.png")}
                                    alt=""
                                />
                            </figure>
                            <div className="person-info-main">
                                <span className="person-info-name">李丽</span>
                                <table
                                    cellpadding={0}
                                    className="person-info-tabel"
                                >
                                    <tr className="info-tabel-title">
                                        <td>
                                            <i className="iconfont icon-dianhua" />职务
                                        </td>
                                        <td>
                                            <i className="iconfont icon-dingwei" />部门
                                        </td>
                                        <td>
                                            <i className="iconfont icon-zhuangtai" />状态
                                        </td>
                                        <td>
                                            <i className="iconfont icon-fuzeren" />负责人
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>产品经理</td>
                                        <td>营销云</td>
                                        <td>正常</td>
                                        <td className="tabel-td-flex">
                                            <img
                                                src={require("assets/images/header/photo.png")}
                                                alt=""
                                                className="tabel-info-img"
                                            />
                                            <span>老王</span>
                                        </td>
                                    </tr>
                                </table>
                            </div>
                            <div className="person-info-btn">
                                <Button className="btn-right">
                                    <i className="iconfont icon-bianji" />编辑
                                </Button>
                                <Dropdown.Button
                                    overlay={menu}
                                    trigger={["click"]}
                                >
                                    更多
                                </Dropdown.Button>
                            </div>
                        </div>
                        <div className="info-warpper">
                            <div className="inner-info">
                                <Collapse
                                    bordered={false}
                                    defaultActiveKey={["1"]}
                                >
                                    <Panel header="基本信息" key="1">
                                        <ul className="inside-info">
                                            <li>
                                                <span className="import-bold">申请人:</span>小王
                                            </li>
                                            <li>
                                                <span className="import-bold">申请类型:</span>自助申请角色
                                            </li>
                                            <li>
                                                <span className="import-bold">申请时间:</span>2017-9-9
                                            </li>
                                            <li>
                                                <span className="import-bold">申请人部门详情:</span>金融云-体验技术产品-2组
                                            </li>
                                            <li>
                                                <span className="import-bold">申请理由:</span>大户续签
                                            </li>
                                        </ul>
                                    </Panel>
                                </Collapse>
                            </div>
                            <div className="inner-info">
                                <Collapse
                                    bordered={false}
                                    defaultActiveKey={["1"]}
                                >
                                    <Panel header="联系方式" key="1">
                                        <ul className="inside-info">
                                            <li>
                                                <span className="import-bold">角色名称:</span>管理员
                                            </li>
                                            <li>
                                                <span className="import-bold">角色码:</span>343242443
                                            </li>
                                            <li>
                                                <span className="import-bold">所属部门:</span>营销云
                                            </li>
                                            <li>
                                                <span className="import-bold">过期时间:</span>2014-0-4
                                            </li>
                                            <li>
                                                <span className="import-bold">描述:</span>djasjdlsjdldj
                                            </li>
                                        </ul>
                                    </Panel>
                                </Collapse>
                            </div>
                            <div className="inner-info">
                                <Collapse
                                    bordered={false}
                                    defaultActiveKey={["1"]}
                                >
                                    <Panel header="附加信息" key="1">
                                        <div className="none-data">
                                            <i
                                                className="iconfont icon-wubaifangwushuju"
                                                style={{ marginRight: 0 }}
                                            />
                                            无数据
                                        </div>
                                    </Panel>
                                </Collapse>
                            </div>
                        </div>
                    </div>
                </main>
            </section>
        );
    }
}
export default connect(state => {
    return {
        componentState: state.componentReducer
    };
})(Contacts);
