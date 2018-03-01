import React, { Component, PropTypes } from "react";
import * as Actions from "../action";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import "assets/stylesheet/all/iconfont.css";
import {
    Icon,
    Button,
    Dropdown,
    Collapse,
    Row,
    Col,
    Tabs,
    Timeline,
    Select
} from "antd";
const Panel = Collapse.Panel;
const ButtonGroup = Button.Group;
const Option = Select.Option;
const TabPane = Tabs.TabPane;
class PanelView extends React.Component {
    render() {
        let slideShowData = this.props.$$state.get('slideShowData').toJS();
        debugger
        return (
            <div>
                <Row className="panel-header">
                    <Row
                        type="flex"
                        justify="space-between"
                        align="middle"
                        className="panel-header-top"
                    >
                        <Col span={12}>
                            <Row type="flex" gutter={15} align="middle">
                                <Col span={6}>
                                    <Row type="flex" gutter={10} align="middle">
                                        <img
                                            src={require("assets/images/header/photo.png")}
                                        />
                                        <span className="contacts-name">
                                            {slideShowData.name}
                                        </span>
                                    </Row>
                                </Col>
                                <Col span={16}>
                                    <Row type="flex" gutter={10} align="middle">
                                       <span className="contacts-name">                                           
                                            <Button onClick={this.props.onEdit.bind(this,true,slideShowData)} >
                                                <i className="iconfont icon-bianji" />编辑
                                            </Button>
                                        </span>
                                    </Row>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                    <Row className="panel-header-bottom">
                        <div>
                            <div className="contact-single-title">
                                <i className="iconfont icon-bianji" />职务
                            </div>
                            <div className="contact-single-info">{slideShowData.postName}</div>
                        </div>
                        <div>
                            <div className="contact-single-title">
                                <i className="iconfont icon-bianji" />客户
                            </div>
                            <div className="contact-single-info">{slideShowData.customerInfo.name}</div>
                        </div>
                        <div>
                            <div className="contact-single-title">
                                <i className="iconfont icon-bianji" />
                                手机号
                            </div>
                            <div className="contact-single-info">
                                {slideShowData.mobile}
                            </div>
                        </div>
                        <div>
                            <div className="contact-single-title">
                                <i className="iconfont icon-bianji" />负责人
                            </div>
                            <Row
                                className="contact-single-info"
                                type="flex"
                                align="middle"
                            >
                                <img
                                    src={require("assets/images/header/photo.png")}
                                />
                                <span>{slideShowData.ownerUserInfo.name}</span>
                            </Row>
                        </div>
                        <div>
                            <div className="contact-single-title">
                                <i className="iconfont icon-bianji" />
                                负责部门
                            </div>
                            <div className="contact-single-info">{slideShowData.ownerUserInfo.deptName}</div>
                        </div>
                    </Row>
                </Row>

                <Row
                    className="panel-main"
                    type="flex"
                    style={{ minHeight: "600px" }}
                >
                    <Col span={18} className="panel-main-left">
                        <div className="inner tab-recoverd">
                            <Tabs defaultActiveKey="1">
                                <TabPane tab="资料" key="1">
                                    <div className="collapse-recover">
                                        <Collapse defaultActiveKey={["1", "2"]}>
                                            <Panel header="联系人信息" key="1">
                                                <ul className="contacts-info-ul">
                                                    <li>
                                                        <span>部门:</span>
                                                        <span>{slideShowData.ownerUserInfo.deptName}</span>
                                                    </li>
                                                    <li>
                                                        <span>职务:</span>
                                                        <span>{slideShowData.postName}</span>
                                                    </li>
                                                    <li>
                                                        <span>手机:</span>
                                                        <span>{slideShowData.mobile}</span>
                                                    </li>
                                                    <li>
                                                        <span>办公室电话:</span>
                                                        <span>{slideShowData.officePhone}</span>
                                                    </li>
                                                    <li>
                                                        <span>邮箱:</span>
                                                        <span>
                                                            {slideShowData.email}
                                                        </span>
                                                    </li>
                                                    <li>
                                                        <span>备注:</span>
                                                        <span>{slideShowData.remarks}</span>
                                                    </li>
                                                </ul>
                                            </Panel>
                                        </Collapse>
                                    </div>
                                </TabPane>
                            </Tabs>
                        </div>
                    </Col>
                    <Col span={6} className="panel-main-right">
                        <div className="timeline-recoverd">
                            <div className="contacts-timeline-title">动态</div>
                            <div className="contacts-timeline">
                                <Timeline>
                                    <Timeline.Item className="timeline-item">
                                        <p>
                                            <span className="timeline-item-import">
                                                winni
                                            </span>
                                            <span className="timeline-item-normal">
                                                创建了任务
                                            </span>
                                            <span className="timeline-item-import">
                                                AAA
                                            </span>
                                        </p>
                                        <p className="timeline-time">
                                            <span>2015-09-01</span>
                                            <span>14：30</span>
                                        </p>
                                    </Timeline.Item>
                                    <Timeline.Item className="timeline-item">
                                        <p>
                                            <span className="timeline-item-import">
                                                winni
                                            </span>
                                            <span className="timeline-item-normal">
                                                创建了任务
                                            </span>
                                            <span className="timeline-item-import">
                                                AAA
                                            </span>
                                        </p>
                                        <p className="timeline-time">
                                            <span>2015-09-01</span>
                                            <span>14：30</span>
                                        </p>
                                    </Timeline.Item>
                                    <Timeline.Item className="timeline-item">
                                        <p>
                                            <span className="timeline-item-import">
                                                winni
                                            </span>
                                            <span className="timeline-item-normal">
                                                创建了任务
                                            </span>
                                            <span className="timeline-item-import">
                                                AAA
                                            </span>
                                        </p>
                                        <p className="timeline-time">
                                            <span>2015-09-01</span>
                                            <span>14：30</span>
                                        </p>
                                    </Timeline.Item>
                                    <Timeline.Item className="timeline-item">
                                        <p>
                                            <span className="timeline-item-import">
                                                winni
                                            </span>
                                            <span className="timeline-item-normal">
                                                创建了任务
                                            </span>
                                            <span className="timeline-item-import">
                                                AAA
                                            </span>
                                        </p>
                                        <p className="timeline-time">
                                            <span>2015-09-01</span>
                                            <span>14：30</span>
                                        </p>
                                    </Timeline.Item>
                                </Timeline>
                            </div>
                        </div>
                    </Col>
                </Row>
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
)(PanelView);