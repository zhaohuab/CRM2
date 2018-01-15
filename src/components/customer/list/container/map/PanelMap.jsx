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
import customerEcharts from "../data/customerEchart";

class PanelMap extends React.Component {
    constructor(props) {
        super(props);
        this.customerOption = customerEcharts;
    }
    onWindowResize() {
        setTimeout(() => {
            if (this.refs.target) {
                let resizeHeight = this.refs.target.offsetHeight;
                let resizeWidth = this.refs.target.offsetWidth;
                this.areaMap.resize({
                    width: resizeWidth + "px",
                    height: resizeHeight + "px"
                });
            }
        }, 500);
    }

    componentDidMount() {
        this.areaMap = echarts.init(this.refs.areaMap);
        this.areaMap.setOption(this.customerOption);
        window.addEventListener("resize", this.onWindowResize.bind(this));
    }

    render() {
        return (
            <Row type="flex" className="customer-panelMap-content">
                <Col span={8} className="customer-panelMap-left">
                    <Row
                        type="flex"
                        justify="center"
                        align="middle"
                        className="top-select"
                    >
                        <col span={3}>负责人:</col>
                        <col span={10}>
                            <Select
                                defaultValue="lucy"
                                className="select"
                                // onChange={handleChange}
                            >
                                <Option value="jack">Jack</Option>
                                <Option value="lucy">Lucy</Option>
                                <Option value="Yiminghe">yiminghe</Option>
                            </Select>
                        </col>
                    </Row>
                    <Row type="flex" align="middle" className="top-title">
                        <span>
                            共<span className="import">300</span>家网店
                        </span>
                    </Row>
                    <Row className="top-tags">
                        <span className="tags">
                            四川省<span className="tags-num">(9)</span>
                        </span>
                        <span className="tags">
                            河北省<span className="tags-num">(19)</span>
                        </span>
                        <span className="tags">
                            广西自治区<span className="tags-num">(109)</span>
                        </span>
                        <span className="tags">
                            河南省<span className="tags-num">(29)</span>
                        </span>
                        <span className="tags">
                            维吾尔自治区<span className="tags-num">(39)</span>
                        </span>
                        <span className="tags">
                            湖南<span className="tags-num">(59)</span>
                        </span>
                    </Row>
                    <Row className="list">
                        <Row type="flex" className="list-item">
                            <Col span={3}>
                                <Checkbox />
                            </Col>
                            <Col span={15} className="customer">
                                <p className="customer-name">
                                    大家啊使得件爱上了绝大多数拉大锯劳动竞赛当点击
                                </p>
                                <p className="customer-address">
                                    <i className="iconfont icon-ditu1" />大家啊使得件爱上了绝大多数拉大锯劳动竞赛当点击
                                </p>
                            </Col>
                            <Col span={6} className="customer-info">
                                <p className="customer-type">经销商大客</p>
                                <p className="customer-level">二等级</p>
                            </Col>
                        </Row>
                        <Row type="flex" className="list-item">
                            <Col span={3}>
                                <Checkbox />
                            </Col>
                            <Col span={15} className="customer">
                                <p className="customer-name">
                                    大家啊使得件爱上了绝大多数拉大锯劳动竞赛当点击
                                </p>
                                <p className="customer-address">
                                    <i className="iconfont icon-ditu1" />大家啊使得件爱上了绝大多数拉大锯劳动竞赛当点击
                                </p>
                            </Col>
                            <Col span={6} className="customer-info">
                                <p className="customer-type">经销商大客</p>
                                <p className="customer-level">二等级</p>
                            </Col>
                        </Row>
                    </Row>
                    <Row type="flex" justify="end">
                        <Pagination size="small" total={50} showSizeChanger />
                    </Row>
                </Col>
                <Col span={16} className="customer-panelMap-right">
                    <div className="map-title">中国</div>
                    <div ref="taget" className="echartsSize">
                        <div ref="areaMap" className="echartsSize" />
                    </div>
                </Col>
            </Row>
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
export default connect(mapStateToProps, mapDispatchToProps)(PanelMap);
