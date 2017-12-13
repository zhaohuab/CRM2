import { Form, Modal, Popover, Collapse, Tabs, Row, Col, Layout, Menu, Breadcrumb, Icon, Button, Dropdown, Timeline, Table } from "antd";
import { browserHistory } from "react-router";
const TabPane = Tabs.TabPane;
const { Header, Content, Sider } = Layout;
const Panel = Collapse.Panel;
const confirm = Modal.confirm;
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as Actions from "../action";
import Card from "./card";
import ViewCard from "./ViewCard";
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
        const WarpCacd = Form.create()(Card)
        const WarpViewCacd = Form.create()(ViewCard)
        const editData = this.props.$$state.get("editData").toJS();
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
                        <Col span={9} className="customer-btn">
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
                                    <Collapse defaultActiveKey={["1"]}>
                                        <Panel
                                            header={this.panelHeader({
                                                title: "商机产品明细"
                                            })}
                                            key="1"
                                        >
                                            <Table
                                                columns={this.columns}
                                                dataSource={dataSource}
                                                rowKey="id"
                                                rowSelection={false}
                                                size="middle"
                                            />
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
