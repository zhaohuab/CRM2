
import React, { Component, PropTypes } from 'react';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux';
import { Map, Markers ,Polyline} from 'react-amap';
import { Input,Badge,Icon,Row, Col,Button,Menu, Dropdown,Select,Table} from 'antd';

const Search = Input.Search;
const Option = Select.Option;

var echarts = require('../../../../node_modules/echarts/lib/echarts');
require('../../../../node_modules/echarts/lib/chart/pie');
require('../../../../node_modules/echarts/lib/chart/bar');
require('../../../../node_modules/echarts/lib/chart/funnel');
require('../../../../node_modules/echarts/lib/component/timeline');
import target from './targetEcharts.js'
import moneyEcharts from './moneyEcharts.js'
import funnelEcharts from './funnelEcharts.js'

import * as Actions from '../action/index.js'
import './index.less'
import 'assets/stylesheet/all/iconfont.css'

const randomMarker = (len) => (
    Array(len).fill(true).map((e, idx) => ({
      position: {
        longitude: 100 + Math.random() * 30,
        latitude: 30 + Math.random() * 20,
      },
    }))
  );

//假数据  
const targetChange=[{data:[1000,2000,3000]},{data:[100,20,700]},{data:[60,26,3033]},{data:[105,200,3000]}]  
const funnelChange=[{data:[60,40,20,80,90,100],data2:[30,10,5,50,70,80]},{data:[80,40,60,30,15,10],data2:[60,30,55,25,13,5]},{data:[100,20,80,10,45,60],data2:[90,10,65,5,33,40]},{data:[10,20,40,60,90,75],data2:[7,10,21,25,63,40]}] 
const targetTabelData = [[{
    key: '1',
    name: '周杰',
    target: '￥3000',
    money: '￥2000',
    down:'15%'
  }, {
    key: '2',
    name: '王晶',
    target: '￥3000',
    money: '￥2000',
    down:'20%'
  }],
  [{
    key: '1',
    name: '周杰1',
    target: '￥1000',
    money: '￥400',
    down:'15%'
  }, {
    key: '2',
    name: '王晶1',
    target: '￥6000',
    money: '￥5000',
    down:'20%'
  }],
  [{
    key: '1',
    name: '周杰2',
    target: '￥4000',
    money: '￥500',
    down:'15%'
  }, {
    key: '2',
    name: '王晶2',
    target: '￥1000',
    money: '￥700',
    down:'20%'
  }]
,[{
    key: '1',
    name: '周杰3',
    target: '￥100',
    money: '￥50',
    down:'15%'
  }, {
    key: '2',
    name: '王晶3',
    target: '￥3000',
    money: '￥2000',
    down:'20%'
  }]];

class Home extends React.Component {
    constructor(props) {
        super(props);
       
        this.targetOption=target;
        this.moneyOption=moneyEcharts;
        this.funnelOption=funnelEcharts;
        this.markers = randomMarker(1000);
        this.center = {longitude: 115, latitude: 40};
        this.state={
            targetTabelData:targetTabelData[0]
        }
        this.changeTargetData=(key)=>{
            this.targetOption.series[0].data.forEach((item,index)=>{
                item.value=targetChange[key].data[index]
            })
            
            this.setState({
                targetTabelData:targetTabelData[key]
            },()=>{
                this.targetEchar.setOption(this.targetOption);
            })
        }

        this.changeFunnelData=(key)=>{
            this.funnelOption.series[0].data.forEach((item,index)=>{
                item.value=funnelChange[key].data[index]
            })

            this.funnelOption.series[1].data.forEach((item,index)=>{
                item.value=funnelChange[key].data2[index]
            })
            this.funnelEchar.setOption(this.funnelOption);
        }
        this.columns = [{
            title: '姓名',
            dataIndex: 'name',
            
          }, {
            title: '目标',
            dataIndex: 'target',
          }, {
            title: '回款',
            dataIndex: 'money',
          }, {
            title: '完成率',
            dataIndex: 'down',
          }];    
    }
    
    onWindowResize(){
        setTimeout(()=>{
            if(this.refs.target){
                let resizeSize=this.refs.target.offsetWidth
                this.targetEchar.resize({
                    width:resizeSize+'px'
                })
    
                this.moneyEchar.resize({
                    width:resizeSize+'px'
                })
    
                this.funnelEchar.resize({
                    width:resizeSize+'px'
                })
            }
        },500)
    }

    componentDidMount(){
        debugger
        this.targetEchar = echarts.init(this.refs.target);
        this.targetEchar.setOption(this.targetOption);

        this.moneyEchar = echarts.init(this.refs.money);
        this.moneyEchar.setOption(this.moneyOption);

        this.funnelEchar = echarts.init(this.refs.funnel);
        this.funnelEchar.setOption(this.funnelOption);
       
        window.addEventListener('resize', this.onWindowResize.bind(this))
    }
    render() {
        const events = {
            created: (ins) => {},
            click: () => {}
        }
        this.onWindowResize()

        return (
            <div>
                <div className="home-warrper">
                    <Row className='clinet-main' id='recover-select'>
                        <Col span={9} className='clinet-main-left'> 
                            <div className='main-left-top'>
                                <h3 className='chart-title'>
                                    <span>销售回款</span>
                                    <div>
                                        <Select defaultValue="本年"  onChange={this.changeTargetData}>
                                            <Option value="0">本年</Option>
                                            <Option value="1">本季</Option>
                                            <Option value="2">本月</Option>
                                            <Option value="3">本周</Option>
                                        </Select>
                                    </div>
                                </h3>
                                <div  className='main-inner' id='change-style'>
                                    <Table  columns={this.columns} dataSource={this.state.targetTabelData} pagination={false} />
                                    <div ref='target' className='target-charts' ></div>
                                </div>
                            </div>
                        
                            <div className='main-left-bottom'>
                                <h3 className='chart-title'>
                                    <span>回款排行榜</span>
                                </h3>
                                <div  className='main-inner'>
                                    <div ref='money' className='money-charts'></div>
                                </div>
                            </div>
                        </Col>
                        <Col span={9} className='clinet-main-middle'> 
                            <div className='main-middle-top'>
                                <h3 className='chart-title'>
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
                                <div  className='main-inner'>
                                    <div style={{ width: '100%', height: 300}}>
                                        <Map events={events}>
                                            <Markers 
                                                markers={this.markers}
                                            />
                                        </Map>
                                    </div>
                                </div>
                            </div>
                        
                            <div className='main-middle-bottom'>
                                <h3 className='chart-title'>
                                    <span>销售漏斗</span>
                                    <div>
                                        <Select defaultValue="本年" onChange={this.changeFunnelData}>
                                            <Option value="0">本年</Option>
                                            <Option value="1">本季</Option>
                                            <Option value="2">本月</Option>
                                            <Option value="3">本周</Option>
                                        </Select>
                                    </div>
                                </h3>
                                <div>
                                    <div ref='funnel' className='funnel-chrats'></div>
                                </div>
                                
                            </div>
                        </Col>
                        <Col span={6} className='clinet-main-right'>
                            <div className='main-right-top'>
                                <h3 className='chart-title'>
                                    <span>公告</span>
                                    <span className='chart-title-more'>更多</span>
                                </h3>
                                <div className='notice-right-padding'>
                                    <ul>
                                        <li>营销云U会员帮助西山美滋每客实现线上线下</li>
                                        <li>营销云U会员帮助西山美滋每客实现线上线下</li>
                                        <li>营销云U会员帮助西山美滋每客实现线上线下</li>
                                        <li>营销云U会员帮助西山美滋每客实现线上线下</li>
                                    </ul>
                                </div>
                            </div>
                            <div className='main-right-bottom'>
                                <h3 className='chart-title'>
                                    <span>日程</span>
                                    <span className='chart-title-more'>更多</span>
                                </h3>
                                <div className='notice-right-padding'>
                                    <div className='schedule-weather'>
                                        <p>2017-7-7</p>
                                        <p><i className='iconfont icon-dingwei'></i>北京市</p>
                                        <p><i className='iconfont icon-duoyun'></i>多云 29/19</p>
                                    </div>
                                    <div className=' schedule-date'>
                                        <div>
                                            <ul className='schedule-fix'>
                                                <li>一</li>
                                                <li>二</li>
                                                <li className='day-active'>三</li>
                                                <li>四</li>
                                                <li>五</li>
                                                <li>六</li>
                                                <li>七</li>
                                            </ul>
                                            
                                            <ul className='schedule-active'>
                                                <li>11</li>
                                                <li>12</li>
                                                <li><span className='date-active'>13</span></li>
                                                <li>14</li>
                                                <li>15</li>
                                                <li>16</li>
                                                <li>17</li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div className=' schedule-mission'>
                                        <div className='mission-list'>
                                            <p>今日拜访：<span className='mission-blue'>0</span></p>
                                            <p>已完成：<span className='mission-green'>0</span></p>
                                            <p>未完成：<span className='mission-red'>0</span></p>
                                        </div>
                                        <div className='mission-main'>
                                            <ul className='mission-main-list'>
                                                <li>
                                                    <div className='list-main'>
                                                        <p>百度科技有限公司</p>
                                                        <p><Icon type="environment-o" />北京市海淀区西北旺后场村108号</p>
                                                        <p><span>销售一部</span>><span>周杰</span></p>
                                                    </div>
                                                    <div className='list-bg red'>
                                                        <i className='iconfont icon-daibaifang'></i>
                                                    </div>
                                                </li>
                                                <li>
                                                    <div className='list-main'>
                                                        <p>百度科技有限公司</p>
                                                        <p><Icon type="environment-o" />北京市海淀区西北旺后场村108号</p>
                                                        <p><span>销售一部</span>><span>周杰</span></p>
                                                    </div>
                                                    <div className='list-bg green'>
                                                        <i className='iconfont icon-yiwancheng'></i>
                                                    </div>
                                                </li>
                                                <li>
                                                    <div className='list-main'>
                                                        <p>百度科技有限公司</p>
                                                        <p><Icon type="environment-o" />北京市海淀区西北旺后场村108号</p>
                                                        <p><span>销售一部</span>><span>周杰</span></p>
                                                    </div>
                                                    <div className='list-bg blue'>
                                                        <i className='iconfont icon-jinribaifang'></i>
                                                    </div>
                                                </li>
                                                <li>
                                                    <div className='list-main'>
                                                        <p>百度科技有限公司</p>
                                                        <p><Icon type="environment-o" />北京市海淀区西北旺后场村108号</p>
                                                        <p><span>销售一部</span>><span>周杰</span></p>
                                                    </div>
                                                    <div className='list-bg red'>
                                                        <i className='iconfont icon-daibaifang'></i>
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
            </div>
        )
    }
}


export default connect(
    state=>{
        return{
            componentState:state.componentReducer
        }
    },
    dispatch=>{
        return{
            componentAction:bindActionCreators(Actions,dispatch)
        }
    }
)(Home)