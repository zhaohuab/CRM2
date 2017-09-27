
import React, { Component, PropTypes } from 'react';
import { Input,Badge,Icon,Row, Col,Button,Menu, Dropdown} from 'antd';
const Search = Input.Search;
import './index.less'
import echarts from 'echarts'
import target from './targetEcharts.js'
import moneyEcharts from './moneyEcharts.js'
import funnelEcharts from './funnelEcharts.js'
import { Map, Markers ,Polyline} from 'react-amap';

const randomMarker = (len) => (
    Array(len).fill(true).map((e, idx) => ({
      position: {
        longitude: 100 + Math.random() * 30,
        latitude: 30 + Math.random() * 20,
      },
    }))
  );

const randomPath = () => ({
    longitude: 60 + Math.random() * 50,
    latitude: 10 + Math.random() * 40,
})

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.targetOption = target;
        this.moneyOption = moneyEcharts
        this.funnelEcharts = funnelEcharts
        this.markers = randomMarker(1000);
        this.center = {longitude: 115, latitude: 40};
        
        this.menuCell = (
            <Menu>
                <Menu.Item>
                    本年
                </Menu.Item>
                <Menu.Item>
                    本季
                </Menu.Item>
                <Menu.Item>
                    本月
                </Menu.Item>
                <Menu.Item>
                    本周
                </Menu.Item>
            </Menu>
        );
        this.menuArea = (
            <Menu>
                <Menu.Item>
                    重点客户
                </Menu.Item>
                <Menu.Item>
                    B类客户
                </Menu.Item>
                <Menu.Item>
                    C类客户
                </Menu.Item>
                <Menu.Item>
                    D类客户
                </Menu.Item>
            </Menu>
        );
        this.menuMoney = (
            <Menu>
                <Menu.Item>
                    本年
                </Menu.Item>
                <Menu.Item>
                    本季
                </Menu.Item>
                <Menu.Item>
                    本月
                </Menu.Item>
                <Menu.Item>
                    本周
                </Menu.Item>
            </Menu>
        ); 
        this.menuFunnel = (
            <Menu>
                <Menu.Item>
                    本年
                </Menu.Item>
                <Menu.Item>
                    本季
                </Menu.Item>
                <Menu.Item>
                    本月
                </Menu.Item>
                <Menu.Item>
                    本周
                </Menu.Item>
            </Menu>
        );
    }
 
    onWindowResize(){
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
    }

    componentDidMount(){
        this.targetEchar = echarts.init(this.refs.target);
        this.targetEchar.setOption(this.targetOption);

        this.moneyEchar = echarts.init(this.refs.money);
        this.moneyEchar.setOption(this.moneyOption);

        this.funnelEchar = echarts.init(this.refs.funnel);
        this.funnelEchar.setOption(this.funnelEcharts);
        window.addEventListener('resize', this.onWindowResize.bind(this))

       
    }
    render() {
        const events = {
            created: (ins) => {console.log(ins)},
            click: () => {console.log('You Clicked The Map')}
        }
        return (
            <div>
                <div className="home-warrper">
                    <Row className='clinet-main'>
                        <Col span={9} className='clinet-main-left'> 
                            <div className='main-left-top'>
                                <h3 className='chart-title'>
                                    <span>销售回款</span>
                                    <div>
                                        <Dropdown overlay={this.menuCell} trigger={['click']}>
                                            <span className="ant-dropdown-link">
                                               <span>本年</span> <Icon type="down" />
                                            </span>
                                        </Dropdown>
                                    </div>
                                </h3>
                                <div>
                                    <table className='charts-cell-tabel' cellpadding={0}>
                                        <tr>
                                            <th>姓名</th>
                                            <th>目标</th>
                                            <th>回款</th>
                                            <th>完成率</th>
                                        </tr>
                                        <tr>
                                            <td>Month</td>
                                            <td>￥3000</td>
                                            <td>￥2000</td>
                                            <td>15%</td>
                                        </tr>
                                        <tr>
                                            <td>Month</td>
                                            <td>￥3000</td>
                                            <td>￥2000</td>
                                            <td>15%</td>
                                        </tr>
                                    </table>
                                    <div ref='target' style={{width:"100%",minHeight:"300px"}}></div>
                                </div>
                            </div>
                        
                            <div className='main-left-bottom'>
                                <h3 className='chart-title'>
                                    <span>回款排行榜</span>
                                    <div>
                                        <Dropdown overlay={this.menuMoney} trigger={['click']}>
                                            <span className="ant-dropdown-link">
                                               <span>本月</span> <Icon type="down" />
                                            </span>
                                        </Dropdown>
                                    </div>
                                </h3>
                                <div ref='money' style={{width:"100%",minHeight:"300px"}}></div>
                            </div>
                        </Col>
                        <Col span={9} className='clinet-main-middle'> 
                            <div className='main-middle-top'>
                                <h3 className='chart-title'>
                                    <span>销售区域</span>
                                    <div>
                                        <Dropdown overlay={this.menuArea} trigger={['click']}>
                                            <span className="ant-dropdown-link">
                                               <span>D类客户</span> <Icon type="down" />
                                            </span>
                                        </Dropdown>
                                    </div>
                                </h3>
                                <div  className='main-inner'>
                                    <div style={{width: '100%', height: 300}}>
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
                                        <Dropdown overlay={this.menuFunnel} trigger={['click']}>
                                            <span className="ant-dropdown-link">
                                               <span>本周</span> <Icon type="down" />
                                            </span>
                                        </Dropdown>
                                    </div>
                                </h3>
                                <div ref='funnel' style={{width:"100%",minHeight:"375px"}}></div>
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
                                        <p>北京市</p>
                                        <p>多云 29/19</p>
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
                                            <p>今日拜访:0</p>
                                            <p>已完成：0</p>
                                            <p>未完成：0</p>
                                        </div>
                                        <div className='mission-main'>
                                            今日没有拜访
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

export default  Home