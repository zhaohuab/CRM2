
import React, { Component, PropTypes } from 'react'
import ReactEcharts from 'echarts-for-react';
import echarts from 'echarts'
import './index.less'
import EcharsLeft from './EcharsLeft.jsx'
import EcharsRight from './EcharsRight.jsx'
import HomeHeader from './HomeHeader.jsx'




class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }
        this.option = {
            title: {
                text: 'ECharts 入门示例'
            },
            tooltip: {},
            legend: {
                data:['销量']
            },
            xAxis: {
                data: ["衬衫","羊毛衫","雪纺衫","裤子","高跟鞋","袜子"]
            },
            yAxis: {},
            series: [{
                name: '销量',
                type: 'bar',
                data: [5, 20, 36, 10, 10, 20]
            }]
        };
    }

    componentDidMount(){
       var myChart = echarts.init(this.refs.ee);
        myChart.setOption(this.option);
    }
    render() {
        return <div>
            <div className="home-warrper">
                <HomeHeader/>
                <EcharsLeft/>
                <EcharsRight/>
                <div id="main" style={{width: "600px",height:"400px"}} ref='ee'></div>
            </div>
        </div>
    }
}

export default  Home