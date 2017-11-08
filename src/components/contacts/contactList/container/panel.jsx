import React, { Component, PropTypes } from "react";
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
export default class PanelView extends React.Component {
    render() {
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
                                            李梅
                                        </span>
                                    </Row>
                                </Col>
                                <Col span={4}>
                                    <Row type="flex" gutter={5} align="middle">
                                        <i className="iconfont icon-guanzhu icon-blue" />关注
                                    </Row>
                                </Col>
                                <Col span={5}>
                                    <Row type="flex" gutter={5} align="middle">
                                        <i className="iconfont icon-shenfenrenzheng icon-blue" />主联系人
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
                            <div className="contact-single-info">产品经理</div>
                        </div>
                        <div>
                            <div className="contact-single-title">
                                <i className="iconfont icon-bianji" />客户
                            </div>
                            <div className="contact-single-info">A客户</div>
                        </div>
                        <div>
                            <div className="contact-single-title">
                                <i className="iconfont icon-bianji" />
                                手机号
                            </div>
                            <div className="contact-single-info">
                                134454345455
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
                                <span>A客户</span>
                            </Row>
                        </div>
                        <div>
                            <div className="contact-single-title">
                                <i className="iconfont icon-bianji" />
                                负责部门
                            </div>
                            <div className="contact-single-info">开发部</div>
                        </div>
                    </Row>
                </Row>

                <Row
                    className="panel-main"
                    type="flex"
                    style={{ minHeight: "600px" }}
                >
                    <Col span={18} className="panel-main-left">
                        <div className="inner" id="tab-recoverd">
                            <Tabs defaultActiveKey="1">
                                <TabPane tab="相关" key="1">
                                    <div id="collapse-recover">
                                        <Collapse defaultActiveKey={["1", "2"]}>
                                            <Panel header="联系人信息" key="1">
                                                <ul className="contacts-info-ul">
                                                    <li>
                                                        <span>部门:</span>
                                                        <span>产品管理部</span>
                                                    </li>
                                                    <li>
                                                        <span>职务:</span>
                                                        <span>产品经理</span>
                                                    </li>
                                                    <li>
                                                        <span>手机:</span>
                                                        <span>12332434343</span>
                                                    </li>
                                                    <li>
                                                        <span>办公室电话:</span>
                                                        <span>010-4343244</span>
                                                    </li>
                                                    <li>
                                                        <span>邮箱:</span>
                                                        <span>
                                                            12344@qq.com
                                                        </span>
                                                    </li>
                                                    <li>
                                                        <span>备注:</span>
                                                        <span>无</span>
                                                    </li>
                                                </ul>
                                            </Panel>
                                            <Panel header="标签" key="2">
                                                <div className="tab-warpper">
                                                    <div>
                                                        <span>角色:</span>
                                                        <p>决策人</p>
                                                        <p>商务决策人</p>
                                                        <p>技术决策人</p>
                                                    </div>
                                                    <div>
                                                        <span>态度:</span>
                                                        <p>支持</p>
                                                    </div>
                                                    <div>
                                                        <span>兴趣爱好:</span>
                                                        <p>唱歌</p>
                                                        <p>跳舞</p>
                                                    </div>
                                                </div>
                                            </Panel>
                                        </Collapse>
                                    </div>
                                </TabPane>
                                <TabPane tab="资料" key="2">
                                    2
                                </TabPane>
                            </Tabs>
                        </div>
                    </Col>
                    <Col span={6} className="panel-main-right">
                        <div id="timeline-recoverd">
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
