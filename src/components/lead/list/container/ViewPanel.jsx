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

import DetailObject from './DetailObject';
import CloseClue from './CloseClue';
import RelativeObject from "./RelativeObject";
import DynamicState from './DynamicState';
const TabPane = Tabs.TabPane;
const Panel = Collapse.Panel;
const confirm = Modal.confirm;


class ViewPanel extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
        this.menu = (
            <Menu onClick={this.handleMenuClick.bind(this)}>
                <Menu.Item key="1">关闭</Menu.Item>
                <Menu.Item key="2">激活</Menu.Item>
            </Menu>
        );
    }
    handleMenuClick(e) {
        debugger
        if (e.key == '1') {
            this.props.action.closeLeadShow(true);
        }
        else if (e.key == '2') {
            this.btnDelete()
        }
    }

    btnDelete = () => {
        let that = this;
        confirm({
            title: "确定启用此线索?",
            content: "请谨慎操作",
            okText: "确定",
            okType: "danger",
            cancelText: "取消",
            onOk() {
                alert('ok')
                // debugger
                // const searchMap = that.props.$$state.get("searchMap").toJS();
                // const ids = that.props.$$state.get("selectedRowKeys").toJS();

                // that.props.action.deleteData(
                //     ids,
                //     searchMap,
                //     that.props.$$state.get("pagination").toJS()
                // );
            },
            onCancel() {
                console.log("Cancel");
            }
        });
    }
    //打开编辑按钮
    btnEdit = () => {
        debugger
        //let { viewData } = this.props.$$state.toJS();

        this.props.action.showFormEdit(true);
    }


    render() {
        debugger;
        let { editData } = this.props.$$state.toJS();
        let viewData = editData;
        return (
            <div className="view-warrper">
                <Row className="view-warrper-header">
                    <Row className="header-customer">
                        <Col span={13}>
                            <Row type="flex" align="middle" gutter={15}>
                                <Row type="flex">
                                    <i className="iconfont icon-xiansuo clue-icon" />
                                </Row>
                                {/* <Row type="flex" align="middle">
                                    <img
                                        src={require("assets/images/header/photo.png")}
                                        className="customer-image"
                                    />
                                </Row> */}
                                <Col span={21}>
                                    <Row>
                                        <Row
                                            type="flex"
                                            align="middle"
                                            gutter={25}
                                        >
                                            <div className="customer-name">
                                                {viewData.name}
                                            </div>

                                            <Row
                                                type="flex"
                                                align="middle"
                                                gutter={15}
                                                className="pointer"
                                            >

                                                {/* <div className="checked-iconfont">
                                                    {viewData.followFlag ==
                                                        0 ? (
                                                            <span
                                                                className="red"
                                                            // onClick={this.attentionFn.bind(
                                                            //     this,
                                                            //     0
                                                            // )}
                                                            >
                                                                <i className="iconfont icon-guanzhu1" />未关注
                                                        </span>
                                                        ) : (
                                                            <span
                                                                className="blue"
                                                            // onClick={this.attentionFn.bind(
                                                            //     this,
                                                            //     1
                                                            // )}
                                                            >
                                                                <i className="iconfont icon-yiguanzhu" />已关注
                                                        </span>
                                                        )}
                                                </div>
                                                <div className="checked-iconfont">
                                                    <span className="blue">
                                                        <i className="iconfont icon-taolun1">讨论</i>
                                                    </span>
                                                </div> */}
                                            </Row>
                                        </Row>

                                        <Row className="tags" type='flex' align='middle'>
                                            {/* {
                                                viewData.sourceName ?
                                                    <span className='tags-item'><span>{viewData.sourceName}</span></span> : ''
                                            }
                                            {
                                                viewData.sourceName?
                                                    <span className='tags-item'><span>{viewData.sourceName}</span></span> : ''
                                            } */}

                                            {/* <div className="tag-group">
                                                {viewData.sourceName ? (
                                                    <span className='tags-item'>
                                                        {viewData.sourceName}
                                                    </span>
                                                ) : (
                                                        <div />
                                                    )}
                                                {viewData.stateName ? (
                                                    <span className='tags-item'>
                                                        {viewData.stateName}
                                                    </span>
                                                ) : (
                                                        <div />
                                                    )}
                                            </div> */}
                                        </Row>
                                    </Row>
                                </Col>
                            </Row>
                        </Col>
                        <Col span={11}>
                            <Row
                                type="flex"
                                align="middle"
                                justify="end"
                                gutter={15}
                            >
                                <div>
                                    <Button onClick={this.btnEdit} className='lead_view_edit_lead'>
                                        <i className="iconfont icon-bianji" />编辑
                                    </Button>
                                </div>
                                {/* <div>
                                    <Button >
                                        <i className="iconfont icon-bianji" />线索转化
                                    </Button>
                                </div>
                                <div>
                                    <Dropdown.Button
                                        overlay={this.menu}
                                        trigger={["click"]}
                                    >
                                        更多
                            </Dropdown.Button>
                                </div> */}
                            </Row>
                        </Col>
                    </Row>
                    <Row>
                        <Row>
                            <Col span={6}>
                                <Row
                                    type="flex"
                                    justify="center"
                                    className="info-title"
                                >
                                    <i className="iconfont icon-zuzhijiegougongsi" />线索来源:
                                </Row>
                            </Col>
                            <Col span={6}>
                                <Row
                                    type="flex"
                                    justify="center"
                                    className="info-title"
                                >
                                    <i className="iconfont icon-xiansuozhuangtai" />线索状态:
                                </Row>
                            </Col>
                            <Col span={6}>
                                <Row
                                    type="flex"
                                    justify="center"
                                    className="info-title"
                                >
                                    <i className="iconfont icon-chuangjianshijian" />分派时间:
                                </Row>
                            </Col>
                            <Col span={6}>
                                <Row
                                    type="flex"
                                    justify="center"
                                    className="info-title"
                                >
                                    <i className="iconfont icon-fuzeren" />反馈结果:
                                </Row>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={6}>
                                <Row
                                    type="flex"
                                    justify="center"
                                    className="info-content"
                                >
                                    {viewData.sourceName}
                                </Row>
                            </Col>
                            <Col span={6}>
                                <Row
                                    type="flex"
                                    justify="center"
                                    className="info-content"
                                >
                                    {viewData.stateName}
                                </Row>
                            </Col>
                            <Col span={6}>
                                <Row
                                    type="flex"
                                    justify="center"
                                    className="info-content"
                                >
                                    {viewData.assignTime}
                                </Row>
                            </Col>
                            <Col span={6}>
                                <Row
                                    type="flex"
                                    justify="center"
                                    className="info-content"
                                >
                                    {viewData.feedback}

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
                                    <TabPane tab="资料" key="1">
                                        <DetailObject />
                                    </TabPane>
                                    <TabPane tab="相关" key="2">
                                        <RelativeObject />
                                    </TabPane>
                                </Tabs>
                            </div>
                        </Col>
                        <Col span={6} className="warrper-main-right">
                            <div className="clue-right-state">动态</div>

                            <DynamicState />

                            {/* <Timeline>
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
                                </Timeline> */}

                        </Col>
                    </div>
                </Row>



                <CloseClue />
            </div>
        );
    }
}

//绑定状态到组件props
function mapStateToProps(state, ownProps) {
    return {
        $$state: state.lead
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
