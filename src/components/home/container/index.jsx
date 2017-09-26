
import React, { Component, PropTypes } from 'react';
import { Input,Badge,Icon,Row, Col,Button} from 'antd';
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
        this.state = {
            useCluster: true,
        }
        this.targetOption = target;
        this.moneyOption = moneyEcharts
        this.funnelEcharts = funnelEcharts
        this.markers = randomMarker(1000);
        this.center = {longitude: 115, latitude: 40};
    }

    toggleCluster(){
        this.setState({
          useCluster: !this.state.useCluster,
        });
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
        return (
            <div>
                <div className="home-warrper">
                    <Row className='clinet-main'>
                        <Col span={16}  className='clinet-main-left'> 
                            <Row className='clinet-main-left-top'> 

                                <Col span={12} className='left-top-target'> 
                                    <div className='left-top-target-inner'>
                                        <h3 className='target-title'>
                                            <span>本月指标</span>
                                        </h3>
                                        <div ref='target' style={{width:"100%",minHeight:"300px"}}></div>
                                    </div>
                                </Col>

                                <Col span={12} className='leaderboard'> 
                                    <div className='left-top-leaderboard-inner'>
                                       <h3 className='target-title'>
                                         <span>汇款排行榜</span>
                                        </h3>
                                        <div ref='money' style={{width:"100%",minHeight:"300px"}}></div>
                                    </div>
                                </Col>
                            </Row>
                            <Row className='clinet-main-left-middle'>   
                                <Col span={12} className='left-top-area'> 
                                    <div className='left-top-area-inner'>
                                        <h3 className='target-title'>
                                            <span>销售区域</span>
                                            <div className='edit-area'>
                                                <Button onClick={ () => this.toggleCluster()  }> 切换显示方式</Button>
                                            </div>
                                        </h3>
                                        <div>
                                            <div style={{width: '100%', height: 300}}>
                                            <Map plugins={['ToolBar']} center={this.center} zoom={5}>
                                                <Markers 
                                                    markers={this.markers}
                                                    useCluster={this.state.useCluster}
                                                />
                                            </Map>
                                            </div>
                                        </div>
                                    </div>
                                </Col>
                                <Col span={12} className='left-top-funnel'> 
                                    <div className='left-top-funnel-inner'>
                                        <h3 className='target-title'>
                                            <span>销售漏斗</span>
                                        </h3>
                                        <div ref='funnel' style={{width:"100%",minHeight:"300px"}}></div>
                                    </div>
                                </Col>
                            </Row>
                        </Col>
                        <Col span={8} className='clinet-main-right'>
                            <div className='main-right-notice'>
                                <h3 className='target-title'>
                                    <span>公告</span>
                                </h3>
                                <div className='notice-mian'>
                                    <ul className='notice-mian-ul'>
                                        <li>中国曾向日本大量出口木制品 如今角色互换</li>
                                        <li>这艘中国船干了件事勾起美加矛盾 国内没啥人知道</li>
                                        <li>各地省委高层为何同步学习毛泽东这两部作品？</li>
                                        <li>内蒙古这2个省管干部同日被双开 均因做这2件事</li>
                                    </ul>
                                </div>
                            </div>
                            <div className='main-right-calendar'>
                                <h3 className='target-title'>
                                    <span>日程</span>
                                </h3>
                                <div className='calendar-main'>
                                    
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