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
    Table
} from "antd";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
const Panel = Collapse.Panel;
const ButtonGroup = Button.Group;
import * as Actions from "../action/index.js";
import "./index.less";
import { browserHistory } from "react-router";
import ContactsView from "./view";
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
                title: "所属公司",
                dataIndex: "company"
            },
            {
                title: "上级联系人",
                dataIndex: "supContactId"
            },
            {
                title: "停启用人",
                dataIndex: "enableUserId"
            },
            {
                title: "停启用时间",
                dataIndex: "enableTime"
            }
        ];

        this.dataSource = [
            {
                id: 1,
                name: "ss",
                gender: 0,
                mobile: "43",
                address: "ss",
                wechat: 22222,
                qq: 2314144132,
                company: "sdasdasaddas",
                supContactId: "sddada",
                enableUserId: "dasda",
                enableTime: "2016-12-12"
            },
            {
                id: 2,
                name: "ss",
                gender: 0,
                mobile: "43",
                address: "ss",
                wechat: 22222,
                qq: 2314144132,
                company: "sdasdasaddas",
                supContactId: "sddada",
                enableUserId: "dasda",
                enableTime: "2016-12-12"
            }
        ];
        this.rowSelection = {
            onChange: this.onSelectChange
        };
    }

    render() {
        const param = this.props.params.father;
        const collapse = this.props.componentState.get("collapsed");
        return (
            <div className="container-warpper">
                {param ? (
                    <ContactsView param={param} collapse={collapse} />
                ) : (
                    <div className="contacts-wapper">
                        <div className="container-warpper-header">
                            <Row>
                                <Col span={16} className="warpper-header-left">
                                    <span>所有联系人:</span>
                                    <Input
                                        placeholder="搜索联系人"
                                        className="contacts-search"
                                    />
                                </Col>
                                <Col span={8} className="warpper-header-right">
                                    <ButtonGroup>
                                        <Button>
                                            <i className="iconfont icon-daochu" />导入
                                        </Button>
                                        <Button>
                                            <i className="iconfont icon-daoru" />导出
                                        </Button>
                                    </ButtonGroup>
                                    {/* <Button type="primary" className="add-btn">
                                        <Icon type="plus" />新增
                                    </Button> */}
                                </Col>
                            </Row>
                        </div>

                        <Table
                            size="middle"
                            columns={this.columns}
                            dataSource={this.dataSource}
                            rowKey="id"
                            rowSelection={this.rowSelection}
                        />
                    </div>
                )}
            </div>
        );
    }
}
export default connect(state => {
    return {
        componentState: state.componentReducer
    };
})(Contacts);
