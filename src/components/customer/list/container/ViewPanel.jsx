import {
    Modal,
    Popover,
    Collapse,
    Tabs,
    Row,
    Col,
    Layout,
    Menu,
    Breadcrumb,
    Icon,
    Button,
    Dropdown,
    Timeline
} from "antd";
import { browserHistory } from "react-router";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
//导入action方法
import * as Actions from "../action";
const TabPane = Tabs.TabPane;
const { Header, Content, Sider } = Layout;
const Panel = Collapse.Panel;
const confirm = Modal.confirm;

class ViewPanel extends React.Component {
    constructor(props) {
        super(props);
        // this.state = {
        //     enableState: 2
        // };
    }

    // componentDidMount() {
    //     const viewData = this.props.$$state.get("viewData").toJS();
    //     // this.setState({
    //     //     enableState: viewData.enableState
    //     // });
    // }
    // btnEnable() {
    //     let enableState = this.state.enableState;
    //     if (this.state.enableState == 1) {
    //         this.setState({
    //             enableState: 2
    //         });
    //         enableState = 2;
    //     } else {
    //         this.setState({
    //             enableState: 1
    //         });
    //         enableState = 1;
    //     }
    //     const searchMap = this.props.$$state.get("searchMap").toJS();
    //     const viewData = this.props.$$state.get("viewData").toJS();
    //     const pagination = this.props.$$state.get("pagination").toJS();
    //     const ids = [];
    //     ids.push(viewData.id);
    //     this.props.action.setEnableState(
    //         ids,
    //         enableState,
    //         pagination,
    //         searchMap
    //     );
    // }

    // btnDelete() {
    //     let that = this;
    //     confirm({
    //         title: "确定要删除吗?",
    //         content: "此操作不可逆",
    //         okText: "是",
    //         okType: "danger",
    //         cancelText: "否",
    //         onOk() {
    //             const searchMap = that.props.$$state.get("searchMap").toJS();
    //             const viewData = that.props.$$state.get("viewData").toJS();
    //             const ids = [];
    //             ids.push(viewData.id);
    //             that.props.action.deleteData(
    //                 ids,
    //                 searchMap,
    //                 that.props.$$state.get("pagination").toJS()
    //             );
    //         },
    //         onCancel() {}
    //     });
    // }

    //打开编辑按钮
    btnEdit() {
        this.props.action.showForm(true);
    }

    render() {
        const viewData = this.props.$$state.get("viewData").toJS();
        return (
            <div className="view-warrper">
                <Row className="view-warrper-header">
                    <Row>
                        <Col span={15}>
                            <Row type="flex" align="middle" gutter={5}>
                                <Row type="flex" align="middle">
                                    <img
                                        src={require("assets/images/header/photo.png")}
                                        className="customer-image"
                                    />
                                </Row>
                                <Col span={21}>
                                    <Row type="flex" align="middle" gutter={25}>
                                        <div className="customer-name">
                                            {viewData.name}
                                        </div>
                                        <Row
                                            type="flex"
                                            align="middle"
                                            gutter={15}
                                        >
                                            <div>
                                                <i className="iconfont icon-bianji" />未核实
                                            </div>
                                            <div>
                                                <i className="iconfont icon-bianji" />已关注
                                            </div>
                                        </Row>
                                    </Row>
                                </Col>
                            </Row>
                        </Col>
                        <Col span={9}>
                            <Row
                                type="flex"
                                align="middle"
                                justify="end"
                                gutter={15}
                            >
                                <div>
                                    <Button onClick={this.btnEdit.bind(this)}>
                                        <i className="iconfont icon-gongshangheshi" />工商核实
                                    </Button>
                                </div>
                                <div>
                                    <Button onClick={this.btnEdit.bind(this)}>
                                        <i className="iconfont icon-bianji" />编辑
                                    </Button>
                                </div>
                            </Row>
                        </Col>
                    </Row>
                    <Row>
                        <Row>
                            <Col span={8}>
                                <Row
                                    type="flex"
                                    justify="center"
                                    className="info-title"
                                >
                                    <i className="iconfont icon-dianhua" />客户状态:
                                </Row>
                            </Col>
                            <Col span={8}>
                                <Row
                                    type="flex"
                                    justify="center"
                                    className="info-title"
                                >
                                    <i className="iconfont icon-dingwei" />首次跟进时间:
                                </Row>
                            </Col>
                            <Col span={8}>
                                <Row
                                    type="flex"
                                    justify="center"
                                    className="info-title"
                                >
                                    <i className="iconfont icon-fuzeren" />最近跟进时间:
                                </Row>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={8}>
                                <Row
                                    type="flex"
                                    justify="center"
                                    className="info-content"
                                >
                                    潜在
                                </Row>
                            </Col>
                            <Col span={8}>
                                <Row
                                    type="flex"
                                    justify="center"
                                    className="info-content"
                                >
                                    2017-8-8
                                </Row>
                            </Col>
                            <Col span={8}>
                                <Row
                                    type="flex"
                                    justify="center"
                                    className="info-content"
                                >
                                    2017-8-8
                                </Row>
                            </Col>
                        </Row>
                    </Row>
                </Row>

                <Row className="view-warrper-main">
                    <div>
                        <Col span={18} className="warrper-main-left">
                            <div className="main-left-inner collapse-recover tab-recoverd">
                                <Tabs defaultActiveKey="1">
                                    <TabPane tab="详情" key="1">
                                        <Collapse
                                            defaultActiveKey={["1", "2", "3"]}
                                        >
                                            <Panel header="标签" key="1">
                                                <div className="tag-group">
                                                    <span>客户类型</span>
                                                    <span>客户类型</span>
                                                    <span>客户类型</span>
                                                    <span>客户类型</span>
                                                    <span>客户类型</span>
                                                </div>
                                            </Panel>
                                            <Panel header="客户身份" key="2">
                                                <Row className="custom-info">
                                                    <Col span={12}>
                                                        <Row
                                                            type="flex"
                                                            gutter={10}
                                                        >
                                                            <Col
                                                                span={8}
                                                                className="custom-info-title"
                                                            >
                                                                <span>
                                                                    电话:
                                                                </span>
                                                            </Col>
                                                            <Col
                                                                span={16}
                                                                className="custom-info-content"
                                                            >
                                                                <span>
                                                                    1434343432443
                                                                </span>
                                                            </Col>
                                                        </Row>
                                                    </Col>
                                                    <Col span={12}>
                                                        <Row
                                                            type="flex"
                                                            gutter={10}
                                                        >
                                                            <Col
                                                                span={8}
                                                                className="custom-info-title"
                                                            >
                                                                <span>
                                                                    邮箱:
                                                                </span>
                                                            </Col>
                                                            <Col
                                                                span={16}
                                                                className="custom-info-content"
                                                            >
                                                                <span>
                                                                    21412434@qq.com
                                                                </span>
                                                            </Col>
                                                        </Row>
                                                    </Col>
                                                </Row>
                                                <Row className="custom-info">
                                                    <Col span={12}>
                                                        <Row
                                                            type="flex"
                                                            gutter={10}
                                                        >
                                                            <Col
                                                                span={8}
                                                                className="custom-info-title"
                                                            >
                                                                <span>
                                                                    营业额:
                                                                </span>
                                                            </Col>
                                                            <Col
                                                                span={16}
                                                                className="custom-info-content"
                                                            >
                                                                <span>
                                                                    12222
                                                                </span>
                                                            </Col>
                                                        </Row>
                                                    </Col>
                                                    <Col span={12}>
                                                        <Row
                                                            type="flex"
                                                            gutter={10}
                                                        >
                                                            <Col
                                                                span={8}
                                                                className="custom-info-title"
                                                            >
                                                                <span>
                                                                    员工数:
                                                                </span>
                                                            </Col>
                                                            <Col
                                                                span={16}
                                                                className="custom-info-content"
                                                            >
                                                                <span>133</span>
                                                            </Col>
                                                        </Row>
                                                    </Col>
                                                </Row>
                                                <Row className="custom-info">
                                                    <Col span={12}>
                                                        <Row
                                                            type="flex"
                                                            gutter={10}
                                                        >
                                                            <Col
                                                                span={8}
                                                                className="custom-info-title"
                                                            >
                                                                <span>
                                                                    备注:
                                                                </span>
                                                            </Col>
                                                            <Col
                                                                span={16}
                                                                className="custom-info-content"
                                                            >
                                                                <span>
                                                                    收到货了恢复拉风了
                                                                </span>
                                                            </Col>
                                                        </Row>
                                                    </Col>
                                                </Row>
                                            </Panel>
                                            <Panel header="客户身份" key="3">
                                                <Row className="custom-info">
                                                    <Col span={12}>
                                                        <Row
                                                            type="flex"
                                                            gutter={10}
                                                        >
                                                            <Col
                                                                span={8}
                                                                className="custom-info-title"
                                                            >
                                                                <span>
                                                                    客户全称:
                                                                </span>
                                                            </Col>
                                                            <Col
                                                                span={16}
                                                                className="custom-info-content"
                                                            >
                                                                <span>
                                                                    aaaa
                                                                </span>
                                                            </Col>
                                                        </Row>
                                                    </Col>
                                                    <Col span={12}>
                                                        <Row
                                                            type="flex"
                                                            gutter={10}
                                                        >
                                                            <Col
                                                                span={8}
                                                                className="custom-info-title"
                                                            >
                                                                <span>
                                                                    注册资本:
                                                                </span>
                                                            </Col>
                                                            <Col
                                                                span={16}
                                                                className="custom-info-content"
                                                            >
                                                                <span>
                                                                    1000万
                                                                </span>
                                                            </Col>
                                                        </Row>
                                                    </Col>
                                                </Row>
                                                <Row className="custom-info">
                                                    <Col span={12}>
                                                        <Row
                                                            type="flex"
                                                            gutter={10}
                                                        >
                                                            <Col
                                                                span={8}
                                                                className="custom-info-title"
                                                            >
                                                                <span>
                                                                    法定代表人:
                                                                </span>
                                                            </Col>
                                                            <Col
                                                                span={16}
                                                                className="custom-info-content"
                                                            >
                                                                <span>
                                                                    到的
                                                                </span>
                                                            </Col>
                                                        </Row>
                                                    </Col>
                                                    <Col span={12}>
                                                        <Row
                                                            type="flex"
                                                            gutter={10}
                                                        >
                                                            <Col
                                                                span={8}
                                                                className="custom-info-title"
                                                            >
                                                                <span>
                                                                    纳税人识别号:
                                                                </span>
                                                            </Col>
                                                            <Col
                                                                span={16}
                                                                className="custom-info-content"
                                                            >
                                                                <span>
                                                                    134234244234
                                                                </span>
                                                            </Col>
                                                        </Row>
                                                    </Col>
                                                </Row>
                                                <Row className="custom-info">
                                                    <Col span={12}>
                                                        <Row
                                                            type="flex"
                                                            gutter={10}
                                                        >
                                                            <Col
                                                                span={8}
                                                                className="custom-info-title"
                                                            >
                                                                <span>
                                                                    工商注册号
                                                                </span>
                                                            </Col>
                                                            <Col
                                                                span={16}
                                                                className="custom-info-content"
                                                            >
                                                                <span>
                                                                    dsdfddfsfsfsd
                                                                </span>
                                                            </Col>
                                                        </Row>
                                                    </Col>
                                                    <Col span={12}>
                                                        <Row
                                                            type="flex"
                                                            gutter={10}
                                                        >
                                                            <Col
                                                                span={8}
                                                                className="custom-info-title"
                                                            >
                                                                <span>
                                                                    组织机构代码:
                                                                </span>
                                                            </Col>
                                                            <Col
                                                                span={16}
                                                                className="custom-info-content"
                                                            >
                                                                <span>
                                                                    1eeqweweweweqwe
                                                                </span>
                                                            </Col>
                                                        </Row>
                                                    </Col>
                                                </Row>
                                            </Panel>
                                        </Collapse>
                                    </TabPane>
                                    <TabPane tab="相关" key="2">
                                        <div className="related-object-outer">
                                            <Row
                                                className="related-object"
                                                type="flex"
                                                align="middle"
                                                gutter={15}
                                            >
                                                <Icon type="folder" />
                                                <p>参与人(0)</p>
                                            </Row>
                                            <Row
                                                className="related-object"
                                                type="flex"
                                                align="middle"
                                                gutter={15}
                                            >
                                                <Icon type="folder" />
                                                <p>联系人(0)</p>
                                            </Row>
                                            <Row
                                                className="related-object"
                                                type="flex"
                                                align="middle"
                                                gutter={15}
                                            >
                                                <Icon type="folder" />
                                                <p>客户结构(0)</p>
                                            </Row>
                                            <Row
                                                className="related-object"
                                                type="flex"
                                                align="middle"
                                                gutter={15}
                                            >
                                                <Icon type="folder" />
                                                <p>商机(0)</p>
                                            </Row>
                                            <Row
                                                className="related-object"
                                                type="flex"
                                                align="middle"
                                                gutter={15}
                                            >
                                                <Icon type="folder" />
                                                <p>拜访(0)</p>
                                            </Row>
                                            <Row
                                                className="related-object"
                                                type="flex"
                                                align="middle"
                                                gutter={15}
                                            >
                                                <Icon type="folder" />
                                                <p>行动(0)</p>
                                            </Row>
                                            <Row
                                                className="related-object"
                                                type="flex"
                                                align="middle"
                                                gutter={15}
                                            >
                                                <Icon type="folder" />
                                                <p>竞品(0)</p>
                                            </Row>
                                            <Row
                                                className="related-object"
                                                type="flex"
                                                align="middle"
                                                gutter={15}
                                            >
                                                <Icon type="folder" />
                                                <p>文件(0)</p>
                                            </Row>
                                        </div>
                                    </TabPane>
                                    <TabPane tab="交易" key="3">
                                        <Row
                                            className="related-object"
                                            type="flex"
                                            align="middle"
                                            gutter={15}
                                        >
                                            <Icon type="folder" />
                                            <p>信用(0)</p>
                                        </Row>
                                        <Row
                                            className="related-object"
                                            type="flex"
                                            align="middle"
                                            gutter={15}
                                        >
                                            <Icon type="folder" />
                                            <p>收款(0)</p>
                                        </Row>
                                        <Row
                                            className="related-object"
                                            type="flex"
                                            align="middle"
                                            gutter={15}
                                        >
                                            <Icon type="folder" />
                                            <p>付款(0)</p>
                                        </Row>
                                        <Row
                                            className="related-object"
                                            type="flex"
                                            align="middle"
                                            gutter={15}
                                        >
                                            <Icon type="folder" />
                                            <p>预订单(0)</p>
                                        </Row>
                                        <Row
                                            className="related-object"
                                            type="flex"
                                            align="middle"
                                            gutter={15}
                                        >
                                            <Icon type="folder" />
                                            <p>订单(0)</p>
                                        </Row>
                                        <Row
                                            className="related-object"
                                            type="flex"
                                            align="middle"
                                            gutter={15}
                                        >
                                            <Icon type="folder" />
                                            <p>发货单(0)</p>
                                        </Row>
                                        <Row
                                            className="related-object"
                                            type="flex"
                                            align="middle"
                                            gutter={15}
                                        >
                                            <Icon type="folder" />
                                            <p>发票(0)</p>
                                        </Row>
                                    </TabPane>
                                </Tabs>
                            </div>
                        </Col>
                        <Col span={6} className="warrper-main-right">
                            <div className="main-right-state">动态</div>
                            <div className="main-right-timeline timeline-recoverd">
                                <Timeline>
                                    <Timeline.Item>
                                        <p>
                                            <span className="timeline-import">
                                                winni
                                            </span>创建了任务<span className="timeline-import">
                                                AAA
                                            </span>
                                        </p>
                                        <p className="timeline-time">
                                            2017-08-18 14:30
                                        </p>
                                    </Timeline.Item>
                                    <Timeline.Item>
                                        <p>
                                            <span className="timeline-import">
                                                winni
                                            </span>创建了任务<span className="timeline-import">
                                                AAA
                                            </span>
                                        </p>
                                        <p className="timeline-time">
                                            2017-08-18 14:30
                                        </p>
                                    </Timeline.Item>
                                    <Timeline.Item>
                                        <p>
                                            <span className="timeline-import">
                                                winni
                                            </span>创建了任务<span className="timeline-import">
                                                AAA
                                            </span>
                                        </p>
                                        <p className="timeline-time">
                                            2017-08-18 14:30
                                        </p>
                                    </Timeline.Item>
                                    <Timeline.Item>
                                        <p>
                                            <span className="timeline-import">
                                                winni
                                            </span>创建了任务<span className="timeline-import">
                                                AAA
                                            </span>
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

//绑定状态到组件props
function mapStateToProps(state, ownProps) {
    return {
        $$state: state.customerList,
        $$stateCommon: state.componentReducer
    };
}
//绑定action到组件props
function mapDispatchToProps(dispatch) {
    return {
        action: bindActionCreators(Actions, dispatch)
    };
}
//输出绑定state和action后组件
export default connect(mapStateToProps, mapDispatchToProps)(ViewPanel);
