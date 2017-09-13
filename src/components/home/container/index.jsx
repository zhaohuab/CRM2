
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
    }

   
    render() {
        return <div>
            <div className="home-warrper">
                <HomeHeader/>
                <EcharsLeft/>
                <EcharsRight/>
            </div>
        </div>
    }
}

export default  Home