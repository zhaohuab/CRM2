import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as Actions from "../../action";
var moment = require("moment");
import {
    Select,
    Input,
    Form,
    Table,
    Modal,
    Button,
    Icon,
    Row,
    Col,
    Tabs,
    Checkbox,
    Pagination
} from "antd";

let Search = Input.Search;
const FormItem = Form.Item;
const ButtonGroup = Button.Group;
const TabPane = Tabs.TabPane;
const Option = Select.Option;

import echarts from "echarts/lib/echarts";
import "echarts/lib/chart/scatter";
import "echarts/lib/chart/effectScatter";
import "echarts/lib/chart/custom";
import "echarts/extension/bmap/bmap.js";
import "echarts/lib/chart/pie";

import stateEcharts from "../data/stateEcharts.js";

class PanelState extends React.Component {
    constructor(props) {
        super(props);
        this.stateOption = stateEcharts;
    }

    onWindowResize() {
        setTimeout(() => {
            if (this.refs.target) {
                let resizeHeight = this.refs.target.offsetHeight;
                let resizeWidth = this.refs.target.offsetWidth;
                this.stateEchar.resize({
                    width: resizeWidth + "px",
                    height: resizeHeight + "px"
                });
            }
        }, 500);
    }

    componentDidMount() {
        this.stateEchar = echarts.init(this.refs.stateMap);
        this.stateEchar.setOption(this.stateOption);
        window.addEventListener("resize", this.onWindowResize.bind(this));
    }

    render() {
        return (
            <div className="customer-panel">
                <Row type="flex" className="customer-panelState-content">
                    <Col span={8} className="customer-panelState-left">
                        <Row
                            type="flex"
                            align="middle"
                            justify="space-between"
                            className="top-title"
                        >
                            <Col>
                                <span>
                                    共<span className="import">300</span>家网店
                                </span>
                            </Col>
                            <Col>
                                <Button size="small">返回</Button>
                            </Col>
                        </Row>

                        <Row className="customer-list-warpper">
                            <Row
                                type="flex"
                                justify="space-between"
                                align="middle"
                                className="customer-list"
                            >
                                <Col className="left">
                                    <i className="iconfont icon-qianzaikehu" />潜在客户
                                </Col>
                                <Col className="right">
                                    <span>280个客户</span>
                                    <Icon type="right" />
                                </Col>
                            </Row>
                            <Row
                                type="flex"
                                justify="space-between"
                                align="middle"
                                className="customer-list"
                            >
                                <Col className="left">
                                    <i className="iconfont icon-jiaoyikehu" />交易客户
                                </Col>
                                <Col className="right">
                                    <span>280个客户</span>
                                    <Icon type="right" />
                                </Col>
                            </Row>
                            <Row
                                type="flex"
                                justify="space-between"
                                align="middle"
                                className="customer-list"
                            >
                                <Col className="left">
                                    <i className="iconfont icon-jihuikehu" />机会客户
                                </Col>
                                <Col className="right">
                                    <span>280个客户</span>
                                    <Icon type="right" />
                                </Col>
                            </Row>
                            <Row
                                type="flex"
                                justify="space-between"
                                align="middle"
                                className="customer-list"
                            >
                                <Col className="left">
                                    <i className="iconfont icon-chenmokehu" />沉默客户
                                </Col>
                                <Col className="right">
                                    <span>280个客户</span>
                                    <Icon type="right" />
                                </Col>
                            </Row>
                        </Row>

                        <Row className="list">
                            <Row type="flex" className="list-item">
                                <Col span={5} className="item-checkbox">
                                    <Row
                                        type="flex"
                                        align="middle"
                                        justify="center"
                                        className="height"
                                    >
                                        <div>
                                            <Checkbox />
                                        </div>
                                    </Row>
                                </Col>
                                <Col span={19}>
                                    <Row className="list-main">
                                        <p className="list-name">
                                            用友网络河北分公司用友网络河北分公司用友网络河北分公司
                                        </p>
                                        <p className="list-time">
                                            首次订单:2017-9-9
                                        </p>
                                        <p className="list-time">
                                            最近商机:2017-9-9
                                        </p>
                                    </Row>
                                    <Row
                                        type="flex"
                                        align="middle"
                                        justify="space-between"
                                        className="list-bottom"
                                    >
                                        <Col>创建时间：2017-9-9</Col>
                                        <Col>负责人：黄小林</Col>
                                    </Row>
                                </Col>
                            </Row>
                        </Row>
                        <Row type="flex" justify="end">
                            <Pagination
                                size="small"
                                total={50}
                                showSizeChanger
                            />
                        </Row>
                    </Col>
                    <Col span={16} className="customer-panelState-right">
                        <div ref="target" className="echartsSize">
                            <div ref="stateMap" className="echartsSize" />
                        </div>
                    </Col>
                </Row>
            </div>
        );
    }
}

//绑定状态到组件props
function mapStateToProps(state, ownProps) {
    return {
        $$state: state.customerList
    };
}
//绑定action到组件props
function mapDispatchToProps(dispatch) {
    return {
        action: bindActionCreators(Actions, dispatch)
    };
}
//输出绑定state和action后组件
export default connect(mapStateToProps, mapDispatchToProps)(PanelState);
