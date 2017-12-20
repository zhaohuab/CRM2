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
    btnEdit() {
        this.props.btnEdit(this.props.data);
    }

    render() {
        let dataSource = []
        if (this.props.data && this.props.data.childList) {
            dataSource = this.props.data.childList;
        }

        const editData = this.props.$$state.get("editData").toJS();
        debugger
        const childList = editData.childList;
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
                                onClick={this.btnEdit.bind(this)}
                            >
                                <i className="iconfont icon-bianji" />编辑
                            </Button>
                            <Button
                                onClick={this.btnEdit.bind(this)}
                            >
                                <i className="iconfont icon-bianji" />变更负责人
                            </Button>
                            <Button
                                onClick={this.btnEdit.bind(this)}
                            >
                                <i className="iconfont icon-bianji" />丢单
                            </Button>
                            <Button
                                onClick={this.btnEdit.bind(this)}
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
                        <Col span={6}>商机状态</Col>
                        <Col span={6}>预计签单金额</Col>
                        <Col span={6}>预计签单时间</Col>
                        <Col span={6}>负责人</Col>
                        <Col span={6}>{editData.state}</Col>
                        <Col span={6}>{editData.expectSignMoney}</Col>
                        <Col span={6}>{editData.expectSignTime}</Col>
                        <Col span={6}>{editData.ownerUserId}</Col>
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
                                <Row>
                                    <Tabs defaultActiveKey="1">
                                        <TabPane tab="资料" key="1">
                                            <Card title="基本信息">

                                                <Row>
                                                    <Col span={12}>
                                                        <Row>
                                                            <Col span={12}>商机名称：</Col><Col span={12}>{editData.name}</Col>
                                                        </Row>
                                                        <Row>
                                                            <Col span={12}>商机类型：</Col><Col span={12}>{editData.type}</Col>
                                                        </Row>
                                                        <Row>
                                                            <Col span={12}>预计签单金额：</Col><Col span={12}>{editData.expectSignMoney}</Col>
                                                        </Row>
                                                        <Row>
                                                            <Col span={12}>商机阶段：</Col><Col span={12}>{editData.saleStage}</Col>
                                                        </Row>
                                                    </Col>
                                                    <Col span={12}>
                                                        <Row>
                                                            <Col span={12}>客户名称：</Col><Col span={12}>{editData.customerId}</Col>
                                                        </Row>
                                                        <Row>
                                                            <Col span={12}>商机状态：</Col><Col span={12}>{editData.state}</Col>
                                                        </Row>
                                                        <Row>
                                                            <Col span={12}>预计签单时间：</Col><Col span={12}>{editData.expectSignTime}</Col>
                                                        </Row>
                                                        <Row>
                                                            <Col span={12}>赢单概率：</Col><Col span={12}>{editData.winProbability}</Col>
                                                        </Row>
                                                    </Col>
                                                </Row>                                        </Card>


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
