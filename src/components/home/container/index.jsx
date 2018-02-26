import React, { Component, PropTypes } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as Actions from "../action/approval.js";
import { Map, Markers, Polyline } from "react-amap";
import {
    Input,
    Badge,
    Icon,
    Row,
    Col,
    Button,
    Menu,
    Dropdown,
    Select,
    Table,
    Tooltip
} from "antd";

const Search = Input.Search;
const Option = Select.Option;

import echarts from "echarts/lib/echarts";
import "echarts/lib/chart/scatter";
import "echarts/lib/chart/effectScatter";
import "echarts/lib/chart/custom";
import "echarts/extension/bmap/bmap.js";
import "echarts/lib/chart/pie";
import "echarts/lib/chart/bar";
import "echarts/lib/chart/funnel";
import "echarts/lib/component/timeline";

import target from "./targetEcharts.js";
import moneyEcharts from "./moneyEcharts.js";
import funnelEcharts from "./funnelEcharts.js";
import customerEcharts from "./customerEcharts";
import Approved from "./approved/index.jsx"
//import * as Actions from "../action/index.js";

import SlidePanel from "./approvalSlider/slidePanel/index.jsx";
import ViewPanel from './approvalSlider/ViewPanel'
import "./index.less";
import "assets/stylesheet/all/iconfont.css";

const randomMarker = len =>
    Array(len)
        .fill(true)
        .map((e, idx) => ({
            position: {
                longitude: 100 + Math.random() * 30,
                latitude: 30 + Math.random() * 20
            }
        }));

//假数据
const targetChange = [
    { data: [1000, 2000, 3000] },
    { data: [100, 20, 700] },
    { data: [60, 26, 3033] },
    { data: [105, 200, 3000] }
];
const funnelChange = [
    { data: [60, 40, 20, 80, 90, 100], data2: [30, 10, 5, 50, 70, 80] },
    { data: [80, 40, 60, 30, 15, 10], data2: [60, 30, 55, 25, 13, 5] },
    { data: [100, 20, 80, 10, 45, 60], data2: [90, 10, 65, 5, 33, 40] },
    { data: [10, 20, 40, 60, 90, 75], data2: [7, 10, 21, 25, 63, 40] }
];
const targetTabelData = [
    [
        {
            key: "1",
            name: "周杰",
            target: "￥3000",
            money: "￥2000",
            down: "15%"
        },
        {
            key: "2",
            name: "王晶",
            target: "￥3000",
            money: "￥2000",
            down: "20%"
        }
    ],
    [
        {
            key: "1",
            name: "周杰1",
            target: "￥1000",
            money: "￥400",
            down: "15%"
        },
        {
            key: "2",
            name: "王晶1",
            target: "￥6000",
            money: "￥5000",
            down: "20%"
        }
    ],
    [
        {
            key: "1",
            name: "周杰2",
            target: "￥4000",
            money: "￥500",
            down: "15%"
        },
        {
            key: "2",
            name: "王晶2",
            target: "￥1000",
            money: "￥700",
            down: "20%"
        }
    ],
    [
        {
            key: "1",
            name: "周杰3",
            target: "￥100",
            money: "￥50",
            down: "15%"
        },
        {
            key: "2",
            name: "王晶3",
            target: "￥3000",
            money: "￥2000",
            down: "20%"
        }
    ]
];

class Home extends React.Component {
    constructor(props) {
        super(props);

        this.targetOption = target;
        this.moneyOption = moneyEcharts;
        this.funnelOption = funnelEcharts;
        this.customerOption = customerEcharts;
        this.markers = randomMarker(1000);
        this.center = { longitude: 115, latitude: 40 };
        this.state = {
            targetTabelData: targetTabelData[0]
        };
        this.changeTargetData = key => {
            this.targetOption.series[0].data.forEach((item, index) => {
                item.value = targetChange[key].data[index];
            });

            this.setState(
                {
                    targetTabelData: targetTabelData[key]
                },
                () => {
                    this.targetEchar.setOption(this.targetOption);
                }
            );
        };

        this.changeFunnelData = key => {
            this.funnelOption.series[0].data.forEach((item, index) => {
                item.value = funnelChange[key].data[index];
            });

            this.funnelOption.series[1].data.forEach((item, index) => {
                item.value = funnelChange[key].data2[index];
            });
            this.funnelEchar.setOption(this.funnelOption);
        };
        this.columns = [
            {
                title: "姓名",
                dataIndex: "name"
            },
            {
                title: "目标",
                dataIndex: "target"
            },
            {
                title: "回款",
                dataIndex: "money"
            },
            {
                title: "完成率",
                dataIndex: "down"
            }
        ];
        this.commitColumns = [
            {
                "title": "任务主题",
                "dataIndex": "name",
                width: '50%',
                render: (text, record) => (
                    <div className="table-color" style={{ width: '120px', cursor: 'pointer', whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}
                        onClick={this.slideShow.bind(this, record)}
                    >
                        <Tooltip placement="bottomLeft" title={record.name}>
                            {record.name}
                        </Tooltip>
                    </div>
                )
            },
            // {
            //     "title": "待审人",
            //     "dataIndex": "approvalUserList",
            //     render: (text, record) => (
            //         <div>
            //             {record.approvalUserList[0].name}
            //         </div>
            //     )
            // },
            {
                "title": "停留时长",
                "dataIndex": "stayTimeLength"
            }
        ]
        this.approvalColumns = [
            {
                "title": "任务主题",
                "dataIndex": "name",
                width: '50%',
                render: (text, record) => (
                    <div className="table-color" style={{ width: '120px', cursor: 'pointer', whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}
                        onClick={this.slideShow.bind(this, record)}
                    >
                        <Tooltip placement="bottomLeft" title={record.name}>
                            {record.name}
                        </Tooltip>
                    </div>

                )
            },
            {
                "title": "停留时长",
                "dataIndex": "stayTimeLength"
            }
        ]
    }

    onWindowResize() {
        setTimeout(() => {
            if (this.refs.target) {
                let resizeSize = this.refs.target.offsetWidth;
                this.targetEchar.resize({
                    width: resizeSize + "px"
                });

                this.moneyEchar.resize({
                    width: resizeSize + "px"
                });

                this.funnelEchar.resize({
                    width: resizeSize + "px"
                });
                this.areaMap.resize({
                    width: resizeSize + "px"
                });
            }
        }, 500);
    }

    componentDidMount() {
        let usertype = this.getCookie('usertype') //根据角色类型发请求 
        if (usertype !== "1") {
            this.targetEchar = echarts.init(this.refs.target);
            this.targetEchar.setOption(this.targetOption);

            this.moneyEchar = echarts.init(this.refs.money);
            this.moneyEchar.setOption(this.moneyOption);

            this.funnelEchar = echarts.init(this.refs.funnel);
            this.funnelEchar.setOption(this.funnelOption);

            this.areaMap = echarts.init(this.refs.areaMap);
            this.areaMap.setOption(this.customerOption);
            //this.props.action.userType();//判断角色类型

            this.props.action.approvalHomeData();//审批数据

        }

        window.addEventListener("resize", this.onWindowResize.bind(this));
    }

    getCookie(name) {
        debugger
        var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)"); //正则匹配
        if (arr = document.cookie.match(reg)) {
            return unescape(arr[2]);//解码
        }
        else {
            return null;
        }
    }

    commit = () => {
        this.props.action.approvalHomeVisible(true);
        this.props.action.approvalFlag(false)
    }
    approval = () => {
        this.props.action.approvalHomeVisible(false)
        this.props.action.approvalFlag(true)
    }
    approvalShow = () => {

        this.props.action.approvedShow();
        this.props.action.getUnfinished(this.props.$$state.get("pagination").toJS());
    }

    //显示面板
    slideShow = (record) => {
        debugger
        this.props.action.showHomeViewForm(true, record.djId, record.djType, record.instanceId, record.taskId, record);
    }

    slideHide = () => {
        //关闭面板清空数据
        this.props.action.hideHomeViewForm(false);
    }
    render() {
        debugger
        const events = {
            created: ins => { },
            click: () => { }
        };
        this.onWindowResize();

        let { viewHomeState, commitData, approvalData, approvalHomeVisible, approvalHomeShow, approvalFlag, viewState } = this.props.$$state.toJS();
        //    {userType=="1"?return(<div className="home-userType">1</div>):
        let userType = this.getCookie('usertype')
        return (
            <div className="home-show-wrapper">
              
                {userType !== '' &&
                    userType == '1' ?
                    <div className="home-userType"></div> :
                    <div className="home-layer">

                        <div className="home-warrper">
                            <Row className="clinet-main" id="recover-select">
                                <Col span={9} className="clinet-main-left">
                                    <div className="main-left-top">
                                        <h3 className="chart-title">
                                            <span>销售回款</span>
                                            <div>
                                                <Select
                                                    defaultValue="本年"
                                                    onChange={this.changeTargetData}
                                                >
                                                    <Option value="0">本年</Option>
                                                    <Option value="1">本季</Option>
                                                    <Option value="2">本月</Option>
                                                    <Option value="3">本周</Option>
                                                </Select>
                                            </div>
                                        </h3>
                                        <div className="main-inner" id="change-style">
                                            <Table
                                                columns={this.columns}
                                                dataSource={this.state.targetTabelData}
                                                pagination={false}
                                            />
                                            <div
                                                ref="target"
                                                className="target-charts"
                                            />
                                        </div>
                                    </div>

                                    <div className="main-left-bottom">
                                        <h3 className="chart-title">
                                            <span>回款排行榜</span>
                                        </h3>
                                        <div className="main-inner">
                                            <div ref="money" className="money-charts" />
                                        </div>
                                    </div>
                                </Col>
                                <Col span={9} className="clinet-main-middle">
                                    <div className="main-middle-top">
                                        <h3 className="chart-title">
                                            <span>销售区域</span>
                                            <div>
                                                <Select defaultValue="本年">
                                                    <Option value="0">本年</Option>
                                                    <Option value="1">本季</Option>
                                                    <Option value="2">本月</Option>
                                                    <Option value="3">本周</Option>
                                                </Select>
                                            </div>
                                        </h3>
                                        <div className="main-inner">
                                            <div
                                                ref="areaMap"
                                                style={{ width: "100%", height: 300 }}
                                            />
                                        </div>
                                    </div>

                                    <div className="main-middle-bottom">
                                        <h3 className="chart-title">
                                            <span>销售漏斗</span>
                                            <div>
                                                <Select
                                                    defaultValue="本年"
                                                    onChange={this.changeFunnelData}
                                                >
                                                    <Option value="0">本年</Option>
                                                    <Option value="1">本季</Option>
                                                    <Option value="2">本月</Option>
                                                    <Option value="3">本周</Option>
                                                </Select>
                                            </div>
                                        </h3>
                                        <div>
                                            <div
                                                ref="funnel"
                                                className="funnel-chrats"
                                            />
                                        </div>
                                    </div>
                                </Col>
                                <Col span={6} className="clinet-main-right">
                                    <div className="main-right-top">
                                        <h3 className="chart-title">
                                            <span className="chart-title-more"
                                                onClick={this.approvalShow}
                                            >审批</span>
                                        </h3>
                                        <Row type='flex' justify="center" gutter={15}>
                                            <Col span={10}>
                                                <div onClick={this.commit}
                                                    className={approvalFlag ? 'approval-commit' : 'approval-commitColor'}

                                                >
                                                    <div>{commitData.total}</div>
                                                    <p>我提交</p>
                                                </div>

                                            </Col>
                                            <Col span={10} onClick={this.approval}>
                                                <div
                                                    className={approvalFlag ? 'approval-approvedColor' : 'approval-approved'}
                                                >
                                                    <div >{approvalData.total}</div>
                                                    <p>我审批</p>
                                                </div>
                                            </Col>
                                        </Row>
                                        {approvalHomeVisible ?
                                            <Table
                                                size="middle"
                                                columns={this.commitColumns}
                                                dataSource={commitData.data}
                                                rowKey="id"
                                            />

                                            : <Table
                                                size="middle"
                                                columns={this.approvalColumns}
                                                dataSource={approvalData.data}
                                                rowKey="id"
                                            />}

                                        {/*                                 
                                <div className="notice-right-padding">
                                    <ul>
                                        <li>
                                            营销云U会员帮助西山美滋每客实现线上线下
                                        </li>
                                        <li>
                                            营销云U会员帮助西山美滋每客实现线上线下
                                        </li>
                                        <li>
                                            营销云U会员帮助西山美滋每客实现线上线下
                                        </li>
                                        <li>
                                            营销云U会员帮助西山美滋每客实现线上线下
                                        </li>
                                    </ul>
                                </div> */}
                                    </div>






                                    <div className="main-right-bottom">
                                        <h3 className="chart-title">
                                            <span>日程</span>
                                            <span className="chart-title-more">
                                                更多
                                    </span>
                                        </h3>
                                        <div className="notice-right-padding">
                                            <div className="schedule-weather">
                                                <p>2017-7-7</p>
                                                <p>
                                                    <i className="iconfont icon-dingwei" />北京市
                                        </p>
                                                <p>
                                                    <i className="iconfont icon-duoyun" />多云
                                            29/19
                                        </p>
                                            </div>
                                            <div className=" schedule-date">
                                                <div>
                                                    <ul className="schedule-fix">
                                                        <li>一</li>
                                                        <li>二</li>
                                                        <li className="day-active">
                                                            三
                                                </li>
                                                        <li>四</li>
                                                        <li>五</li>
                                                        <li>六</li>
                                                        <li>七</li>
                                                    </ul>

                                                    <ul className="schedule-active">
                                                        <li>11</li>
                                                        <li>12</li>
                                                        <li>
                                                            <span className="date-active">
                                                                13
                                                    </span>
                                                        </li>
                                                        <li>14</li>
                                                        <li>15</li>
                                                        <li>16</li>
                                                        <li>17</li>
                                                    </ul>
                                                </div>
                                            </div>
                                            <div className=" schedule-mission">
                                                <div className="mission-list">
                                                    <p>
                                                        今日拜访：<span className="mission-blue">
                                                            0
                                                </span>
                                                    </p>
                                                    <p>
                                                        已完成：<span className="mission-green">
                                                            0
                                                </span>
                                                    </p>
                                                    <p>
                                                        未完成：<span className="mission-red">
                                                            0
                                                </span>
                                                    </p>
                                                </div>
                                                <div className="mission-main">
                                                    <ul className="mission-main-list">
                                                        <li>
                                                            <div className="list-main">
                                                                <p>百度科技有限公司</p>
                                                                <p>
                                                                    <Icon type="environment-o" />北京市海淀区西北旺后场村108号
                                                        </p>
                                                                <p>
                                                                    <span>
                                                                        销售一部
                                                            </span>><span>
                                                                        周杰
                                                            </span>
                                                                </p>
                                                            </div>
                                                            <div className="list-bg red">
                                                                <i className="iconfont icon-daibaifang" />
                                                            </div>
                                                        </li>
                                                        <li>
                                                            <div className="list-main">
                                                                <p>百度科技有限公司</p>
                                                                <p>
                                                                    <Icon type="environment-o" />北京市海淀区西北旺后场村108号
                                                        </p>
                                                                <p>
                                                                    <span>
                                                                        销售一部
                                                            </span>><span>
                                                                        周杰
                                                            </span>
                                                                </p>
                                                            </div>
                                                            <div className="list-bg green">
                                                                <i className="iconfont icon-yiwancheng" />
                                                            </div>
                                                        </li>
                                                        <li>
                                                            <div className="list-main">
                                                                <p>百度科技有限公司</p>
                                                                <p>
                                                                    <Icon type="environment-o" />北京市海淀区西北旺后场村108号
                                                        </p>
                                                                <p>
                                                                    <span>
                                                                        销售一部
                                                            </span>><span>
                                                                        周杰
                                                            </span>
                                                                </p>
                                                            </div>
                                                            <div className="list-bg blue">
                                                                <i className="iconfont icon-jinribaifang" />
                                                            </div>
                                                        </li>
                                                        <li>
                                                            <div className="list-main">
                                                                <p>百度科技有限公司</p>
                                                                <p>
                                                                    <Icon type="environment-o" />北京市海淀区西北旺后场村108号
                                                        </p>
                                                                <p>
                                                                    <span>
                                                                        销售一部
                                                            </span>><span>
                                                                        周杰
                                                            </span>
                                                                </p>
                                                            </div>
                                                            <div className="list-bg red">
                                                                <i className="iconfont icon-daibaifang" />
                                                            </div>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Col>



                            </Row>

                        </div>



                        {approvalHomeShow ? <Approved /> : null}
                        <SlidePanel
                            viewState={viewHomeState}
                            onClose={this.slideHide}
                            className='tab-viewPanelHome-recoverd'
                        >
                            <ViewPanel
                                ref="panelHeight" />
                        </SlidePanel>
                    </div>}

            </div>
        )
    }
}

export default connect(
    state => {
        return {
            $$state: state.approval
        };
    },
    dispatch => {
        return {
            action: bindActionCreators(Actions, dispatch)
        };
    }
)(Home);
