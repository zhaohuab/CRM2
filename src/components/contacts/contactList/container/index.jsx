import React, { Component, PropTypes } from "react";
import {
    Icon,
    Button,
    Dropdown,
    Menu,
    Collapse,
    Input,
    Row,
    Col,
    Table,
    Modal
} from "antd";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
const Panel = Collapse.Panel;
const ButtonGroup = Button.Group;
import "./index.less";
import { browserHistory } from "react-router";
import ContactsView from "./view";
import * as Actions from "../action/index.js";
import HeaderButton from "../../../common/headerButtons/headerButtons.jsx";

import "assets/stylesheet/all/iconfont.css";

class Contacts extends React.Component {
    constructor(props) {
        super(props);
        this.columns = [
            {
                title: "姓名",
                dataIndex: "name"
            },
            {
                title: "性别",
                dataIndex: "gender"
            },
            {
                title: "手机",
                dataIndex: "mobile"
            },
            {
                title: "地址",
                dataIndex: "address"
            },
            {
                title: "微信",
                dataIndex: "wechat"
            },
            {
                title: "QQ",
                dataIndex: "qq"
            },
            {
                title: "上级联系人",
                dataIndex: "supContactId"
            },
            {
                title: "停启用",
                dataIndex: "enableState"
            },
            {
                title: "停启用时间",
                dataIndex: "enableTime"
            }
        ];
        let that = this;

        this.state = {
            pagination: {
                pageSize: 10,
                page: 1
            },
            searchMap: {
                enableState: 1
            },
            //存放点击table时获取的行数据
            tableSelet: []
        };

        this.onSelectChange = (selectedRowKeys, selectedRows) => {
            that.setState({
                tableSelet: selectedRows
            });
        };
    }

    headerBack() {
        this.setState({
            tableSelet: []
        });
    }

    componentDidMount() {
        let { pagination, searchMap } = this.state;
        this.props.action.getContactList(pagination, searchMap);
    }

    render() {
        const param = this.props.params.father;
        const collapse = this.props.$$stateComponent.get("collapsed");
        const loading = this.props.$$state.get("loading");
        const data = this.props.$$state.get("data").toJS();
        let rowSelection = {
            onChange: this.onSelectChange
        };
        return (
            <div className="crm-container">
                {param ? (
                    <ContactsView param={param} collapse={collapse} />
                ) : (
                    <div className="contacts-warpper">
                        {this.state.tableSelet.length ? (
                            <div className="crm-header-buttons">
                                <HeaderButton
                                    length={this.state.tableSelet.length}
                                    goBack={this.headerBack.bind(this)}
                                >
                                    <Button
                                        onClick={this.headerBack.bind(this)}
                                    >
                                        <i className="iconfont icon-fanhui" />返回
                                    </Button>
                                    <Button>
                                        <i className="iconfont icon-shanchu" />删除
                                    </Button>
                                    <Button>
                                        <i className="iconfont icon-bianji" />编辑
                                    </Button>
                                    <ButtonGroup>
                                        <Button>
                                            <i className="iconfont icon-tingyong" />停用
                                        </Button>
                                        <Button>
                                            <i className="iconfont icon-qiyong" />启用
                                        </Button>
                                    </ButtonGroup>
                                </HeaderButton>
                            </div>
                        ) : (
                            <div className="crm-container-header">
                                <Row>
                                    <Col span={12}>
                                        <Row>
                                            <Col span={3}>所有联系人:</Col>
                                            <Col span={8}>
                                                <Input
                                                    placeholder="搜索联系人"
                                                    className="contacts-search"
                                                />
                                            </Col>
                                        </Row>
                                    </Col>

                                    <Col span={12}>
                                        <Row type="flex" justify="end">
                                            <Col span={24}>
                                                <Row
                                                    type="flex"
                                                    justify="end"
                                                    gutter={15}
                                                >
                                                    <ButtonGroup className="add-btn">
                                                        <Button>
                                                            <i className="iconfont icon-daochu" />导入
                                                        </Button>
                                                        <Button>
                                                            <i className="iconfont icon-daoru" />导出
                                                        </Button>
                                                    </ButtonGroup>
                                                    <div>
                                                        <Button type="primary">
                                                            <Icon type="plus" />新增
                                                        </Button>
                                                    </div>
                                                </Row>
                                            </Col>
                                        </Row>
                                    </Col>
                                </Row>
                            </div>
                        )}

                        <Table
                            size="middle"
                            columns={this.columns}
                            dataSource={data}
                            rowKey="id"
                            rowSelection={rowSelection}
                            loading={loading}
                        />
                    </div>
                )}
            </div>
        );
    }
}
export default connect(
    state => {
        return {
            $$stateComponent: state.componentReducer,
            $$state: state.contacts
        };
    },
    dispatch => {
        return {
            action: bindActionCreators(Actions, dispatch)
        };
    }
)(Contacts);
