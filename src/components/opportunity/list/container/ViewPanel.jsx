import { Form, Modal, Card, Popover, Collapse, Tabs, Row, Col, Layout, Menu, Breadcrumb, Icon, Button, Dropdown, Timeline, Table } from "antd";
import { browserHistory } from "react-router";
const TabPane = Tabs.TabPane;
const { Header, Content, Sider } = Layout;
const Panel = Collapse.Panel;
const confirm = Modal.confirm;
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as Actions from "../action";
import SaleStage from './SaleStage';
import WinCard from './WinCard';
import LostCard from './LostCard';

class ViewPanel extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            enableState: this.props.data.enableState
        };

        this.columns = [
            {
                title: "产品名称",
                dataIndex: "productId",

            },
            {
                title: "产品分类",
                dataIndex: "productTypeId"
            },
            {
                title: "品牌",
                dataIndex: "brandId"
            },
            {
                title: "销售单位",
                dataIndex: "measureId"
            },
            {
                title: "销售单价",
                dataIndex: "price"
            },
            {
                title: "数量",
                dataIndex: "number"
            },
            {
                title: "合计金额",
                dataIndex: "sumMoney"
            }
        ]
    }

    componentDidMount() {

    }

    panelHeader(obj) {
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
   
    //点击编辑按钮打开编辑页面
    btnEdit(id) {
        this.props.action.showFormEdit(true,id);
    }

    winOk() {
        const editData = this.props.$$state.get("editData").toJS();
        let form = this.winRef.props.form;
        form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                this.props.action.winOpp(editData.id, values);
            }
        });
    }

    winCancel() {
        this.props.action.showWinCard(false)
    }

    lostOk() {
        const editData = this.props.$$state.get("editData").toJS();
        let form = this.lostRef.props.form;
        form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                this.props.action.lostOpp(editData.id, values);
            }
        });
    }

    lostCancel() {
        this.props.action.showLostCard(false)
    }

    render() {
        let dataSource = []
        if (this.props.data && this.props.data.childList) {
            dataSource = this.props.data.childList;
        }

        const editData = this.props.$$state.get("editData").toJS();
        const childList = editData.childList;
        debugger
        const WrapWinCard = Form.create()(WinCard);
        const WrapLostCard = Form.create()(LostCard);
        const winCardVisible = this.props.$$state.get("winCardVisible");
        const lostCardVisible = this.props.$$state.get("lostCardVisible");
        const viewFormVisible = this.props.$$state.get("viewFormVisible");

        return (
            <div className="view-warrper">
                <Row className="view-warrper-header">
                    <Row>
                        <Col span={14} className="customer-info">
                            <img
                                src={require("assets/images/header/photo.png")}
                                className="customer-image"
                            />
                            <div className="customer-main">
                                <div className="customer-main-top">
                                    <span>{this.props.data.name}</span>
                                    <span>
                                    </span>
                                    <span>
                                        <i className="iconfont icon-guanzhu" />
                                        <span>关注</span>
                                    </span>

                                </div>
                                <div className="project-label-group">
                                    <span>经销商</span>
                                    <span>重点客户</span>
                                    <span>海口</span>
                                    <span>饲料</span>
                                </div>
                            </div>
                        </Col>
                        <Col span={10} className="customer-btn">
                            <Button
                                onClick={this.btnEdit.bind(this,editData.id)}
                            >
                                <i className="iconfont icon-bianji" />编辑
                            </Button>
                            <Button
                                onClick={this.btnEdit.bind(this)}
                            >
                                <i className="iconfont icon-bianji" />变更负责人
                            </Button>
                            <Button
                                onClick={this.props.action.showLostCard.bind(true)}
                            >
                                <i className="iconfont icon-bianji" />丢单
                            </Button>
                            <Button
                                onClick={this.props.action.showWinCard.bind(true)}
                            >
                                <i className="iconfont icon-bianji" />赢单
                            </Button>
                            <Button
                                onClick={this.props.btnClosePanel.bind(this)}
                            >
                                X
                            </Button>
                        </Col>
                    </Row>
                    <Row className="cumtomer-detail">
                        <Col className="view-main-cell" span={6}>商机状态</Col>
                        <Col className="view-main-cell" span={6}>预计签单金额</Col>
                        <Col className="view-main-cell" span={6}>预计签单时间</Col>
                        <Col className="view-main-cell" span={6}>负责人</Col>
                        <Col className="view-main-cell" span={6}>{editData.state}</Col>
                        <Col className="view-main-cell" span={6}>{editData.expectSignMoney}</Col>
                        <Col className="view-main-cell" span={6}>{editData.expectSignTime}</Col>
                        <Col className="view-main-cell" span={6}>{editData.ownerUserId}</Col>
                    </Row>
                </Row>

                <Row className="view-warrper-main">
                    <div>
                        <Col span={18} className="warrper-main-left">
                            <div
                                className="main-left-inner"
                                id="collapse-recover"
                            >
                                <Row><SaleStage /></Row>
                                <Row className="view-tab">
                                    <Tabs defaultActiveKey="1">
                                        <TabPane tab="资料" key="1">
                                            <Card title="基本信息">

                                                <Row>
                                                    <Col span={12}>
                                                        <Row className="detail-msg-line">
                                                            <Col className="detail-msg-line-left" span={12}>商机名称：</Col><Col span={12}>{editData.name}</Col>
                                                        </Row>
                                                        <Row className="detail-msg-line">
                                                            <Col className="detail-msg-line-left" span={12}>商机类型：</Col><Col span={12}>{editData.type}</Col>
                                                        </Row>
                                                        <Row className="detail-msg-line">
                                                            <Col className="detail-msg-line-left" span={12}>预计签单金额：</Col><Col span={12}>{editData.expectSignMoney}</Col>
                                                        </Row>
                                                        <Row className="detail-msg-line">
                                                            <Col className="detail-msg-line-left" span={12}>商机阶段：</Col><Col span={12}>{editData.saleStage ? editData.saleStage.title : ""}</Col>
                                                        </Row>
                                                    </Col>
                                                    <Col span={12}>
                                                        <Row className="detail-msg-line">
                                                            <Col className="detail-msg-line-left" span={12}>客户名称：</Col><Col span={12}>{editData.customerId ? editData.customerId.name : ''}</Col>
                                                        </Row>
                                                        <Row className="detail-msg-line">
                                                            <Col className="detail-msg-line-left" span={12}>商机状态：</Col><Col span={12}>{editData.state}</Col>
                                                        </Row>
                                                        <Row className="detail-msg-line">
                                                            <Col className="detail-msg-line-left" span={12}>预计签单时间：</Col><Col span={12}>{editData.expectSignTime}</Col>
                                                        </Row>
                                                        <Row className="detail-msg-line">
                                                            <Col className="detail-msg-line-left" span={12}>赢单概率：</Col><Col span={12}>{editData.winProbability}</Col>
                                                        </Row>
                                                    </Col>
                                                </Row>
                                            </Card>
                                        </TabPane>
                                        <TabPane tab="相关" key="2">Content of Tab Pane 2</TabPane>
                                        <TabPane tab="产品" key="3">
                                            <Table
                                                size="middle"
                                                columns={this.columns}
                                                dataSource={childList}
                                                rowSelection={false}
                                                pagination={false}
                                            />

                                        </TabPane>
                                        <TabPane tab="新闻" key="4">Content of Tab Pane 3</TabPane>
                                    </Tabs>
                                </Row>
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
                <Modal
                    title="商机赢单"
                    visible={winCardVisible && viewFormVisible}
                    onOk={this.winOk.bind(this)}
                    onCancel={this.winCancel.bind(this)}
                    width="30%"
                    maskClosable={false}>
                    <WrapWinCard wrappedComponentRef={(inst) => this.winRef = inst} />
                </Modal>
                <Modal
                    title="商机丢单"
                    visible={lostCardVisible && viewFormVisible}
                    onOk={this.lostOk.bind(this)}
                    onCancel={this.lostCancel.bind(this)}
                    width="30%"
                    maskClosable={false}>
                    <WrapLostCard wrappedComponentRef={(inst) => this.lostRef = inst} />
                </Modal>

            </div>
        );
    }
}


//绑定状态到组件props
function mapStateToProps(state, ownProps) {
    return {
        $$state: state.opportunityList,
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
