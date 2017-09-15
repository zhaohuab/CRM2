
import React, { Component, PropTypes } from 'react';
import { Input,Badge,Icon,Row, Col} from 'antd';
const Search = Input.Search;
import './index.less'

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }
        
    }

    componentDidMount(){
      
    }
    render() {
        return (
            <div>
                <div className="home-warrper">
                    <header className='client-header'>
                        <h3 className='client-header-title'>首页</h3>
                        <main className='client-header-main'>
                            <Search className='clinet-search'
                                placeholder="搜索"
                                style={{ width: 200 }}
                                onSearch={value => console.log(value)}
                            />
                            <div className='clinet-alert'>
                                <Icon type="bell" />
                                <Badge count={0} showZero>
                                    <a href="#" className="head-example" />
                                </Badge>
                            </div>
                        </main>
                    </header>
                    
                    <Row className='clinet-main'>
                        <Col span={16}  className='clinet-main-left'> 
                            <Row className='clinet-main-left-top'> 

                                <Col span={12} className='left-top-target'> 
                                    <div className='left-top-target-inner'>
                                        <h3 className='target-title'>
                                            本月指标
                                        </h3>
                                    </div>
                                </Col>

                                <Col span={12} className='leaderboard'> 
                                    <div className='left-top-leaderboard-inner'>
                                       <h3 className='target-title'>
                                            汇款排行榜
                                        </h3>
                                    </div>
                                </Col>
                            </Row>
                            <Row className='clinet-main-left-middle'>   
                                <Col span={12} className='left-top-area'> 
                                    <div className='left-top-area-inner'>
                                        <h3 className='target-title'>
                                            销售区域
                                        </h3>
                                    </div>
                                </Col>
                                <Col span={12} className='left-top-funnel'> 
                                    <div className='left-top-funnel-inner'>
                                        <h3 className='target-title'>
                                            销售漏斗
                                        </h3>
                                    </div>
                                </Col>
                            </Row>
                            <Row className='clinet-main-left-bottom'>
                                <Col span={24} className='main-left-bottom-inner'> 
                                     <h3 className='target-title'>
                                            轨迹
                                     </h3>
                                </Col>
                            </Row>
                        </Col>
                        <Col span={8} className='clinet-main-right'>
                            <div className='main-right-notice'>
                                <h3 className='target-title'>
                                    公告
                                </h3>
                            </div>
                            <div className='main-right-calendar'>
                                <h3 className='target-title'>
                                    日程
                                </h3>
                            </div>
                        </Col>
                    </Row>
                </div>
            </div>
        )
    }
}

export default  Home