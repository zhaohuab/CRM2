import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as Actions from "../action";
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
import bmap from 'echarts/extension/bmap/bmap';
import ReactEcharts from 'echarts-for-react';
import "echarts/lib/chart/scatter";
import "echarts/lib/chart/effectScatter";
import "echarts/lib/chart/custom";
import "echarts/extension/bmap/bmap.js";
import 'echarts/map/js/china.js';
//import customerEcharts from "./data/customerEchart.js";
import customerEcharts from "./data/echartsData.js";
import area from "./data/areaData.jsx";

class PanelMap extends React.Component {
    constructor(props) {
        super(props);
        this.customerOption = customerEcharts;
    }
   
    convertData = (data) => {//转换series里的data
        var res = [];
        for (var i = 0; i < data.length; i++) {
            var geoCoord = geoCoordMap[data[i].name];
            if (geoCoord) {
                res.push({
                    name: data[i].name+':'+data[i].value,
                    value: geoCoord.concat(data[i].value),
                });
            }
        }
        return res;
    };

   getOption = () => {//得到新的option
        /* let convertData = this.convertData;
        let{ geoCoordMap,provinceData } = area;
        let center=provinceData[];//获取到相应的省区经纬度
        let zoom = 8
        let name = 'xx'
        let data=provinceData;
        let option = {
            title: {
                text: '客户分布',
                subtext: name,
                left: 'center'
            },
            backgroundColor: "#404a59",
            tooltip: {
                trigger: "item"
        },
        bmap: {
            center:center,
            zoom: zoom,
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
                name: "客户分布",
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
            {
                name: "客户分布",
                type: "scatter",
                symbol: "pin",
                coordinateSystem: "bmap",
                data: convertData(data),
                label: {
                    normal: {
                        show: true,
                        textStyle: {
                            color: "#fff",
                            fontSize: 9
                        }
                    }
                },
                zlevel: 6,
                itemStyle: {
                    normal: {
                        color: "#4384de" //标志颜色
                    }
                }
            },
            {
                name: "客户分布",
                type: "effectScatter",
                coordinateSystem: "bmap",
                data: convertData(
                    data
                        .sort(function(a, b) {
                            //debugger;
                            return b.value - a.value;
                        })
                        .slice(0, 6)
                ),
                rippleEffect: {
                    brushType: "stroke"
                },
                hoverAnimation: true,
                label: {
                    normal: {
                        formatter: "{b}",
                        position: "right",
                        show: true
                    }
                },
                itemStyle: {
                    normal: {
                        color: "#f4e925",
                        shadowBlur: 10,
                        shadowColor: "#b3aa0e"
                    }
                },
                zlevel: 1
            }
        ]
    };
    return option */

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

    onChange = () => {//点击每一个部门获取相应的客户信息
        debugger;
        //this.areaMap.setOption(this.getOption())
    }

    getCustomerItem = () => {//点击部门获取到相应的业务员信息，及其客户分布情况
        let { data, customerItem } = this.props.$$state.toJS();
        this.props.action.getCustomerItem()
        //this.areaMap.setOption(this.getOption())
    }


    componentDidMount() {
        let data = this.props.$$state.get('data').toJS().list[0].
        this.props.action.getCustomerList();//获取部门及业务员
        this.props.action.getCustomerItem(1);//获取具体客户信息
        this.areaMap = echarts.init(this.refs.areaMap);//初始化echarts
        this.areaMap.setOption(this.customerOption);
        this.areaMap.on("mouseover", function (params){  //给地图添加鼠标划过事件
            if(params.data.value == undefined){  
                this.areaMap.dispatchAction({  
                type: 'downplay'  
                });  
            }  
        });  
        window.addEventListener("resize", this.onWindowResize.bind(this));
    }

    render() {
        let pageChange = this.pageChange;
        let {  $$state, action} = this.props;
        let { data, customerItem } =  $$state.toJS();
        let itemFlag = $$state.get('itemFlag');
        let id = $$state.get('id');
       console.log('data-------',data, 'customerItem-------------',customerItem)
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
                                data.list.map(item=>{
                                    return (
                                        <Col span={24} className='customer-principal-item' onClick={this.getCustomerItem.bind(this)}>
                                            {item[2].name}<span className='customer-num'>({item.num})</span>
                                        </Col>
                                    )
                                })
                                :
                                data.list.map(item=>{debugger
                                    return (
                                        <Col span={6} className='customer-principal-item' onClick={this.onChange.bind(this,item[2].id)}>{item[2].name}<span className='customer-num'>({item[2].num})</span></Col>
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
                            <Pagination size="small" total={50} showSizeChanger onChange={action.getCustomerItem.bind(this,id)}/>
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



function mapStateToProps(state, ownProps) {
  return {
    $$state: state.cusDistributed
  }
}

function mapDispatchToProps(dispatch) {
  return {
      action: bindActionCreators(Actions, dispatch)
  }
}
export default  connect( mapStateToProps, mapDispatchToProps)(PanelMap);



/* 


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


 




 */