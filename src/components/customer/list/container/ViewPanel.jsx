import {Modal,Popover, Collapse,Tabs, Row,Col,Layout,Menu, Breadcrumb,Icon,Button,Dropdown, Timeline} from "antd";
import { browserHistory } from "react-router";
const TabPane = Tabs.TabPane;
const { Header, Content, Sider } = Layout;
const Panel = Collapse.Panel;
const confirm = Modal.confirm;

export default class ViewPanel extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            enableState: this.props.data.enableState
        };
    }

    componentDidMount() {}
    showContact() {
        let path = browserHistory.getCurrentLocation().pathname;
        browserHistory.push(
            "/crm_web/page/contacts/" + encodeURIComponent(path)
        );
    }
    btnEnable() {
        debugger;
        this.setState({
            enableState: 2
        });
        if (this.state.enableState == 1) {
            this.setState({
                enableState: 2
            });
            this.props.btnSetEnable(2);
        } else {
            this.setState({
                enableState: 1
            });
            this.props.btnSetEnable(1);
        }
    }
    btnDelete() {
        let that = this;
        confirm({
            title: "确定要删除吗?",
            content: "此操作不可逆",
            okText: "是",
            okType: "danger",
            cancelText: "否",
            onOk() {
                that.props.btnDelete();
            },
            onCancel() {
                console.log("Cancel");
            }
        });
    }

    panelHeader(obj) {
        console.log(obj.title, "33333333");
        return (
            <div className="panel-header">
                <p>{obj.title}</p>
                <p>
                    <i className="iconfont icon-kehuxiangqing-xinzeng" />
                    <i className="iconfont icon-gengduo" />
                </p>
            </div>
        );
    }
    render() {
        // const content = (
        //     <div>
        //         <div>
        //             <Button>调整负责人</Button>
        //         </div>
        //         <div>
        //             <Button>查重</Button>
        //         </div>
        //         <div>
        //             <Button onClick={this.btnEnable.bind(this)}>
        //                 {this.state.enableState == 1 ? "停用" : "启用"}
        //             </Button>
        //         </div>
        //         <div>
        //             <Button onClick={this.btnDelete.bind(this)}>删除</Button>
        //         </div>
        //     </div>
        // );
        const menu = (
            <Menu>
                <Menu.Item key="1">调整负责人</Menu.Item>
                <Menu.Item key="2">查重</Menu.Item>
                <Menu.Item key="3" onClick={this.btnEnable.bind(this)}>
                    {this.state.enableState == 1 ? "停用" : "启用"}
                </Menu.Item>
                <Menu.Item key="4" onClick={this.btnDelete.bind(this)}>
                    删除
                </Menu.Item>
            </Menu>
        );

        return (
            <div className="view-warrper">
                <Row className="view-warrper-header">
                    <Row>
                        <Col span={15} className="customer-info">
                            <img
                                src={require("assets/images/header/photo.png")}
                                className="customer-image"
                            />
                            <div className="customer-main">
                                <div className="customer-main-top">
                                    <span>{this.props.data.name}</span>
                                    <span>
                                        <img
                                            src={require("assets/images/header/VIP.png")}
                                        />
                                        <i>5</i>
                                    </span>
                                    <span>
                                        <i className="iconfont icon-guanzhu" />
                                        <span>关注</span>
                                    </span>
                                    <span>
                                        <i className="iconfont icon-shenfenrenzheng" />
                                        <span>身份验证</span>
                                    </span>
                                </div>
                                <div className="tag-group">
                                    <span>经销商</span>
                                    <span>重点客户</span>
                                    <span>海口</span>
                                    <span>饲料</span>
                                </div>
                            </div>
                        </Col>
                        <Col span={9} className="customer-btn">
                            <Button
                                onClick={this.props.btnEdit.bind(
                                    this,
                                    this.props.data
                                )}
                            >
                                <i className="iconfont icon-bianji" />编辑
                            </Button>
                            <Button onClick={this.props.btnNew}>
                                <i className="iconfont icon-xinzeng-huise" />新增
                            </Button>
                            <Dropdown.Button overlay={menu}>更多</Dropdown.Button>
                        </Col>
                    </Row>
                    <Row className="cumtomer-detail">
                        <Row className="">
                            <Col span={6}>
                                <div className="info-tabel">
                                    <i className="iconfont icon-dianhua" />电话：
                                </div>
                            </Col>
                            <Col span={6}>
                                <div className="info-tabel">
                                    <i className="iconfont icon-dingwei" />详细地址：
                                </div>
                            </Col>
                            <Col span={6}>
                                <div className="info-tabel">
                                    <i className="iconfont icon-fuzeren" />负责人
                                </div>
                            </Col>
                            <Col span={6}>
                                <div className="info-tabel">
                                    <i className="iconfont icon-fuzebumen" />负责部门
                                </div>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={6}>
                                <div className="info-tabel">
                                    {this.props.data.tel}1
                                </div>
                            </Col>
                            <Col span={6}>
                                <div className="info-tabel">
                                    {this.props.data.address}1
                                </div>
                            </Col>
                            <Col span={6}>
                                <div className="info-tabel">负责人1</div>
                            </Col>
                            <Col span={6}>
                                <div className="info-tabel">负责人1</div>
                            </Col>
                        </Row>
                    </Row>
                    <div
                        className="warrper-header-close"
                        onClick={this.props.btnClosePanel}
                    >
                        <i className="iconfont icon-guanbi" />
                    </div>
                </Row>

                <Row className="view-warrper-main">
                    <div>
                        <Col span={18} className="warrper-main-left">
                            <div
                                className="main-left-inner"
                                id="collapse-recover"
                            >
                                <Tabs defaultActiveKey="1">
                                    <TabPane tab="相关" key="1">
                                        <Collapse defaultActiveKey={["1"]}>
                                            <Panel
                                                header={this.panelHeader({
                                                    title: "联系人"
                                                })}
                                                key="1"
                                            >
                                                <Row className="main-left-customer">
                                                    <Col
                                                        onClick={this.showContact.bind(
                                                            this
                                                        )}
                                                        span={8}
                                                    >
                                                        <div className="inner">
                                                            <div>李丽</div>
                                                            <div>
                                                                公司名称：丽美诗有限公司
                                                            </div>
                                                            <div>职务：销售</div>
                                                            <div>
                                                                电话：18372674832
                                                            </div>
                                                        </div>
                                                    </Col>
                                                    <Col span={8}>
                                                        <div className="inner">
                                                            <div>李丽</div>
                                                            <div>
                                                                公司名称：丽美诗有限公司
                                                            </div>
                                                            <div>职务：销售</div>
                                                            <div>
                                                                电话：18372674832
                                                            </div>
                                                        </div>
                                                    </Col>
                                                    <Col span={8}>
                                                        <div className="inner">
                                                            <div>李丽</div>
                                                            <div>
                                                                公司名称：丽美诗有限公司
                                                            </div>
                                                            <div>职务：销售</div>
                                                            <div>
                                                                电话：18372674832
                                                            </div>
                                                        </div>
                                                    </Col>

                                                    <Col span={8}>
                                                        <div className="inner">
                                                            <div>李丽</div>
                                                            <div>
                                                                公司名称：丽美诗有限公司
                                                            </div>
                                                            <div>职务：销售</div>
                                                            <div>
                                                                电话：18372674832
                                                            </div>
                                                        </div>
                                                    </Col>
                                                    <Col span={8}>
                                                        <div className="inner">
                                                            <div>李丽</div>
                                                            <div>
                                                                公司名称：丽美诗有限公司
                                                            </div>
                                                            <div>职务：销售</div>
                                                            <div>
                                                                电话：18372674832
                                                            </div>
                                                        </div>
                                                    </Col>
                                                    <Col span={8}>
                                                        <div className="inner">
                                                            <div>李丽</div>
                                                            <div>
                                                                公司名称：丽美诗有限公司
                                                            </div>
                                                            <div>职务：销售</div>
                                                            <div>
                                                                电话：18372674832
                                                            </div>
                                                        </div>
                                                    </Col>
                                                </Row>
                                            </Panel>
                                            <Panel
                                                header={this.panelHeader({
                                                    title: "商机"
                                                })}
                                                key="2"
                                            >
                                                <p>wert</p>
                                            </Panel>
                                            <Panel
                                                header={this.panelHeader({
                                                    title: "行动"
                                                })}
                                                key="3"
                                            >
                                                <p>asdfg</p>
                                            </Panel>
                                        </Collapse>
                                    </TabPane>
                                    <TabPane tab="资料" key="2">
                                        Content of Tab Pane 2
                                    </TabPane>
                                </Tabs>
                            </div>
                        </Col>
                        <Col span={6} className="warrper-main-right">
                            <div className="main-right-state">动态</div>
                            <div className="main-right-timeline">
                                <Timeline>
                                    <Timeline.Item>
                                        <p>
                                            <span className="timeline-import">
                                                winni
                                            </span>创建了任务<span className="timeline-import">AAA</span>
                                        </p>
                                        <p className="timeline-time">
                                            2017-08-18 14:30
                                        </p>
                                    </Timeline.Item>
                                    <Timeline.Item>
                                        <p>
                                            <span className="timeline-import">
                                                winni
                                            </span>创建了任务<span className="timeline-import">AAA</span>
                                        </p>
                                        <p className="timeline-time">
                                            2017-08-18 14:30
                                        </p>
                                    </Timeline.Item>
                                    <Timeline.Item>
                                        <p>
                                            <span className="timeline-import">
                                                winni
                                            </span>创建了任务<span className="timeline-import">AAA</span>
                                        </p>
                                        <p className="timeline-time">
                                            2017-08-18 14:30
                                        </p>
                                    </Timeline.Item>
                                    <Timeline.Item>
                                        <p>
                                            <span className="timeline-import">
                                                winni
                                            </span>创建了任务<span className="timeline-import">AAA</span>
                                        </p>
                                        <p className="timeline-time">
                                            2017-08-18 14:30
                                        </p>
                                    </Timeline.Item>
                                </Timeline>
                            </div>
                        </Col>
                    </div>
                </Row>
            </div>
        );
    }
}
