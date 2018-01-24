import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as Actions from "../../action";
import reqwest from "utils/reqwest";
import './index.less';
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



import echarts from "echarts";
import ReactEcharts from 'echarts-for-react';
import "echarts/lib/chart/scatter";
import "echarts/lib/chart/effectScatter";
import "echarts/lib/chart/custom";
import "echarts/extension/bmap/bmap.js";
import 'echarts/map/js/china.js';
import customerEcharts from "../data/customerEchart.js";

class PanelMap extends React.Component {
    constructor(props) {
        super(props);
        this.customerOption = customerEcharts;
    }
   
    getOption = () => {
        debugger;
    let  data = [
    { name: "海门", value: 9 },
    { name: "鄂尔多斯", value: 12 },
    { name: "招远", value: 12 },
    { name: "舟山", value: 12 }
   
];

let  geoCoordMap = {
    海门: [121.15, 31.89],
    鄂尔多斯: [109.781327, 39.608266],
    招远: [120.38, 37.35],
    舟山: [122.207216, 29.985295],
    齐齐哈尔: [123.97, 47.33],
    盐城: [120.13, 33.38],
    赤峰: [118.87, 42.28],
    青岛: [120.33, 36.07],
    乳山: [121.52, 36.89],
    金昌: [102.188043, 38.520089],
    泉州: [118.58, 24.93],
    莱西: [120.53, 36.86],
    日照: [119.46, 35.42],
    胶南: [119.97, 35.88],
    南通: [121.05, 32.08],
    拉萨: [91.11, 29.97],
    云浮: [112.02, 22.93],
    梅州: [116.1, 24.55],
    文登: [122.05, 37.2],
    上海: [121.48, 31.22],
    攀枝花: [101.718637, 26.582347],
    威海: [122.1, 37.5],
    承德: [117.93, 40.97],
    厦门: [118.1, 24.46],
    汕尾: [115.375279, 22.786211],
    潮州: [116.63, 23.68],
    丹东: [124.37, 40.13],
    太仓: [121.1, 31.45],
    曲靖: [103.79, 25.51],
    烟台: [121.39, 37.52],
    福州: [119.3, 26.08],
    瓦房店: [121.979603, 39.627114],
    即墨: [120.45, 36.38],
    抚顺: [123.97, 41.97],
    玉溪: [102.52, 24.35],
    张家口: [114.87, 40.82],
    阳泉: [113.57, 37.85],
    莱州: [119.942327, 37.177017],
    湖州: [120.1, 30.86],
    汕头: [116.69, 23.39],
    昆山: [120.95, 31.39],
    宁波: [121.56, 29.86],
    湛江: [110.359377, 21.270708],
    揭阳: [116.35, 23.55],
    荣成: [122.41, 37.16],
    连云港: [119.16, 34.59],
    葫芦岛: [120.836932, 40.711052],
    常熟: [120.74, 31.64],
    东莞: [113.75, 23.04],
    河源: [114.68, 23.73],
    淮安: [119.15, 33.5],
    泰州: [119.9, 32.49],
    南宁: [108.33, 22.84],
    营口: [122.18, 40.65],
    惠州: [114.4, 23.09],
    江阴: [120.26, 31.91],
    蓬莱: [120.75, 37.8],
    韶关: [113.62, 24.84],
    嘉峪关: [98.289152, 39.77313],
    广州: [113.23, 23.16],
    延安: [109.47, 36.6],
    太原: [112.53, 37.87],
    清远: [113.01, 23.7],
    中山: [113.38, 22.52],
    昆明: [102.73, 25.04],
    寿光: [118.73, 36.86],
    盘锦: [122.070714, 41.119997],
    长治: [113.08, 36.18],
    深圳: [114.07, 22.62],
    珠海: [113.52, 22.3],
    宿迁: [118.3, 33.96],
    咸阳: [108.72, 34.36],
    铜川: [109.11, 35.09],
    平度: [119.97, 36.77],
    佛山: [113.11, 23.05],
    海口: [110.35, 20.02],
    江门: [113.06, 22.61],
    章丘: [117.53, 36.72],
    肇庆: [112.44, 23.05],
    大连: [121.62, 38.92],
    临汾: [111.5, 36.08],
    吴江: [120.63, 31.16],
    石嘴山: [106.39, 39.04],
    沈阳: [123.38, 41.8],
    苏州: [120.62, 31.32],
    茂名: [110.88, 21.68],
    嘉兴: [120.76, 30.77],
    长春: [125.35, 43.88],
    胶州: [120.03336, 36.264622],
    银川: [106.27, 38.47],
    张家港: [120.555821, 31.875428],
    三门峡: [111.19, 34.76],
    锦州: [121.15, 41.13],
    南昌: [115.89, 28.68],
    柳州: [109.4, 24.33],
    三亚: [109.511909, 18.252847],
    自贡: [104.778442, 29.33903],
    吉林: [126.57, 43.87],
    阳江: [111.95, 21.85],
    泸州: [105.39, 28.91],
    西宁: [101.74, 36.56],
    宜宾: [104.56, 29.77],
    呼和浩特: [111.65, 40.82],
    成都: [104.06, 30.67],
    大同: [113.3, 40.12],
    镇江: [119.44, 32.2],
    桂林: [110.28, 25.29],
    张家界: [110.479191, 29.117096],
    宜兴: [119.82, 31.36],
    北海: [109.12, 21.49],
    西安: [108.95, 34.27],
    金坛: [119.56, 31.74],
    东营: [118.49, 37.46],
    牡丹江: [129.58, 44.6],
    遵义: [106.9, 27.7],
    绍兴: [120.58, 30.01],
    扬州: [119.42, 32.39],
    常州: [119.95, 31.79],
    潍坊: [119.1, 36.62],
    重庆: [106.54, 29.59],
    台州: [121.420757, 28.656386],
    南京: [118.78, 32.04],
    滨州: [118.03, 37.36],
    贵阳: [106.71, 26.57],
    无锡: [120.29, 31.59],
    本溪: [123.73, 41.3],
    克拉玛依: [84.77, 45.59],
    渭南: [109.5, 34.52],
    马鞍山: [118.48, 31.56],
    宝鸡: [107.15, 34.38],
    焦作: [113.21, 35.24],
    句容: [119.16, 31.95],
    北京: [116.46, 39.92],
    徐州: [117.2, 34.26],
    衡水: [115.72, 37.72],
    包头: [110, 40.58],
    绵阳: [104.73, 31.48],
    乌鲁木齐: [87.68, 43.77],
    枣庄: [117.57, 34.86],
    杭州: [120.19, 30.26],
    淄博: [118.05, 36.78],
    鞍山: [122.85, 41.12],
    溧阳: [119.48, 31.43],
    库尔勒: [86.06, 41.68],
    安阳: [114.35, 36.1],
    开封: [114.35, 34.79],
    济南: [117, 36.65],
    德阳: [104.37, 31.13],
    温州: [120.65, 28.01],
    九江: [115.97, 29.71],
    邯郸: [114.47, 36.6],
    临安: [119.72, 30.23],
    兰州: [103.73, 36.03],
    沧州: [116.83, 38.33],
    临沂: [118.35, 35.05],
    南充: [106.110698, 30.837793],
    天津: [117.2, 39.13],
    富阳: [119.95, 30.07],
    泰安: [117.13, 36.18],
    诸暨: [120.23, 29.71],
    郑州: [113.65, 34.76],
    哈尔滨: [126.63, 45.75],
    聊城: [115.97, 36.45],
    芜湖: [118.38, 31.33],
    唐山: [118.02, 39.63],
    平顶山: [113.29, 33.75],
    邢台: [114.48, 37.05],
    德州: [116.29, 37.45],
    济宁: [116.59, 35.38],
    荆州: [112.239741, 30.335165],
    宜昌: [111.3, 30.7],
    义乌: [120.06, 29.32],
    丽水: [119.92, 28.45],
    洛阳: [112.44, 34.7],
    秦皇岛: [119.57, 39.95],
    株洲: [113.16, 27.83],
    石家庄: [114.48, 38.03],
    莱芜: [117.67, 36.19],
    常德: [111.69, 29.05],
    保定: [115.48, 38.85],
    湘潭: [112.91, 27.87],
    金华: [119.64, 29.12],
    岳阳: [113.09, 29.37],
    长沙: [113, 28.21],
    衢州: [118.88, 28.97],
    廊坊: [116.7, 39.53],
    菏泽: [115.480656, 35.23375],
    合肥: [117.27, 31.86],
    武汉: [114.31, 30.52],
    大庆: [125.03, 46.58]
};

let  convertData = function(data) {
    var res = [];
    for (var i = 0; i < data.length; i++) {
        var geoCoord = geoCoordMap[data[i].name];
        if (geoCoord) {
            res.push({
                name: data[i].name,
                value: geoCoord.concat(data[i].value)
            });
        }
    }
    return res;
};
let option = {
    title:{
        text: '客户分布示意图',
        subtext: '张婷',
        left: 'center'
        },
    backgroundColor: "#404a59",
    tooltip: {
        trigger: "none"
    },
    bmap: {
        center: [104.114129, 37.550339],
        zoom: 4,
        roam: true, 
        mapStyle: {}
    },
    visualMap: [
        {
            show: false,
            calculable: true,
            dimension: 2,
            seriesIndex: [0, 2],
            inRange: {
                symbolSize: [20, 30]
            },
            outRange: {
                symbolSize: [20, 30]
            }
        },
        {
            show: false,
            calculable: true,
            dimension: 2,
            seriesIndex: [1],
            inRange: {
                symbolSize: [40, 60]
            },
            outRange: {
                symbolSize: [40, 60]
            }
        }
    ],
    series: [
        {
            name: "pm2.5",
            type: "scatter",
            coordinateSystem: "bmap",
            data: convertData(data),
            label: {
                normal: {
                    formatter: "{b}",
                    position: "right",
                    show: true
                }
            },
            itemStyle: {
                normal: {
                    color: "#ead53c"
                }
            }
        },
       
    ]
};

return  option;
}

    getCustomer = (id) => {//点击业务员是获取对应的客户信息
        let getOption = this.getOption;
        reqwest({
            url:'',
            method:'get',
            data:{
                param:{
                    id:1
                }
            }
        },data=>{
            getOption(data)
        })
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

    onChange = () => {
        debugger;
        this.areaMap.setOption(this.getOption())
    }

    getCustomerItem = () => {//点击部门获取到相应的业务员信息，及其客户分布情况
        this.props.action.
    }

    componentDidMount() {
        this.areaMap = echarts.init(this.refs.areaMap);
        this.areaMap.setOption(this.customerOption);
        window.addEventListener("resize", this.onWindowResize.bind(this));
    }

    render() {
        let {  $$state, action} = this.props;
        let data = $$state.get('data').toJS();
        let itemFlag = $$state.get('itemFlag');
        let dataSource = [
            {'name':'张婷1',num:11},
            {'name':'张婷2',num:11},
            {'name':'张婷3',num:11},
            {'name':'张婷4',num:11},
            {'name':'张婷5',num:11},
            {'name':'张婷6',num:11},
            {'name':'张婷7',num:11},
            {'name':'张婷8',num:11},
            {'name':'张婷9',num:11},
        ];
        let addressSource=[
            {name:'北京用友集团1',address:'海淀区北清路68号用友软件园'},
            {name:'北京用友集团2',address:'海淀区北清路68号用友软件园'},
            {name:'北京用友集团3',address:'海淀区北清路68号用友软件园'},
            {name:'北京用友集团4',address:'海淀区北清路68号用友软件园'},
            {name:'北京用友集团5',address:'海淀区北清路68号用友软件园'},
            {name:'北京用友集团6',address:'海淀区北清路68号用友软件园'},
            {name:'北京用友集团7',address:'海淀区北清路68号用友软件园'},
            {name:'北京用友集团8',address:'海淀区北清路68号用友软件园'},
            {name:'北京用友集团9',address:'海淀区北清路68号用友软件园'},
            {name:'北京用友集团10',address:'海淀区北清路68号用友软件园'}, 
        ];
 
        return (
            <Row type="flex" className="customer-panelMap-wraper">
                <Col span={7} className="customer-panelMap-left">
                   <Row type="flex" align='middle' className='customer-detail-title'>
                            <Col span={20} className='customer-detail-total'>|当前客户总数：100</Col>
                            <Col span={4} className='goBack'><Button size="small">返回</Button></Col>                   
                        </Row>
                        <Row type="flex" justify="around" align='middle' gutter={10} className='customer-principal'>
                            { 
                                itemFlag?
                                dataSource.map(item=>{
                                    return (
                                        <Col span={6} className='customer-principal-item' onClick={this.onChange.bind(this)}>{item.name}<span className='customer-num'>({item.num})</span></Col>
                                    )
                                }) :
                                data.map(item=>{
                                    return (
                                        <Col span={24} className='customer-principal-item' onClick={this.getCustomerItem.bind(this)}>
                                            {item.name}<span className='customer-num'>({item.num})</span>
                                        </Col>
                                    )
                                })

                            }                 
                        </Row>
                        <div className='customer-address'>
                            {
                                addressSource.map((item,index)=>{
                                    return (
                                        <Row type="flex" align='middle' className='customer-address-item'>
                                            <Col span={2}>{index+1}</Col>
                                            <Col span={16} className='item-content'>
                                                <div className='item-content-name'>{item.name}</div>
                                                <div className='item-content-adress'>{item.address}</div>
                                            </Col>
                                        </Row>
                                    )
                                })
                            }
                        </div>
                        <Row type="flex" justify="end">
                            <Pagination size="small" total={50} showSizeChanger />
                        </Row>
                </Col>
                <Col span={17} className="customer-panelMap-right">
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
        $$state: state.cusDistributed
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


/* 
   <div ref="taget" className="echartsSize" style={{width:'650px',height:'550px'}}>
                        <ReactEcharts 
                          style={{width:'600px',height:'500px'}} 
                          ref={e => this.echarts_react = e } 
                          option={this.getOption()}
                        />
                    </div> 
 */