import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as Actions from "../action";
import reqwest from "utils/reqwest";
import './index.less';
import "assets/stylesheet/all/iconfont.css";

import moment from 'moment';
import {
    Input,
    Modal,
    Button,
    Icon,
    Row,
    Col,
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
import getStateOptions from './GetStateOption.jsx';

class PanelMap extends React.Component {
    constructor(props) {
        super(props);
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

    getDetailAdress = (item) => {//点击地址定位到具体部位
        if(item.longitude&&item.latitude) {
            this.areaMap.setOption(getItemOption(item))
        }else{
            Modal.info({
                content: '您查看的客户暂无详细地址',
            });
        }     
    }

    reload = () => {//返回按钮，重新加载页面
        window.location.reload();
    }

    pageChange = (num) => {//页码更改
        let str='',id='';
        this.props.action.getCustomerItem(str,id,num)
    }

    getCustomerList = (str, id, name) => {
        this.props.action.getCustomerList(str, id, name);
        this.props.action.getCustomerItem(str, id, 1)
    }

    componentDidMount() {  
        this.props.action.getCustomerList();//获取部门及业务员
        this.props.action.getCustomerItem('','',1);//获取具体客户信息
        this.props.action.getStatusData();
        this.areaMap = echarts.init(this.refs.areaMap);//初始化echarts   
        window.addEventListener("resize", this.onWindowResize.bind(this));
    }
    componentDidUpdate() {
        let statusData = this.props.$$state.get('statusData').toJS();
        if(statusData.data[0]){
            this.areaMap.setOption(getStateOptions(statusData));  
        } 
    }
    render() {     
        let reload = this.reload;
        let pageChange = this.pageChange;
        let getDetailAdress = this.getDetailAdress;
        let getCustomerList = this.getCustomerList;
        let {  $$state, action} = this.props;
        let { data, customerItem, statusData } =  $$state.toJS();
        let itemFlag = $$state.get('itemFlag');
        let departmentName = $$state.get('departmentName');    
        console.log('customerItem=========',customerItem)  
        return (
            <Row type="flex" className="customer-status-wraper">
                <Col span={8} className="customer-panelMap-left">
                   <Row type="flex" align='middle' className='customer-detail-title'>
                            <Col span={20} className='customer-detail-total'>{departmentName}当前客户总数：<span className='customer-detail-num'>{data.total}</span></Col>
                            <Col span={4} className='goBack'><Button size="small" onClick={reload.bind(this)}>返回</Button></Col>                   
                        </Row>
                        <Row type="flex" justify="around" align='top' className='customer-principal'>
                            { 
                                itemFlag?
                                data.list.map(item=>{
                                    return (
                                        <Col span={24} className='customer-principal-item' onClick={getCustomerList.bind(this,'deptId',item.id,item.name)}>
                                            <Row type='flex' align='middle'>
                                                <Col span={18} style={{textAlign:'left'}}>{item.name}</Col>
                                                <Col span={6}><span className='customer-num'>{item.num}</span>个客户</Col>
                                            </Row>                                           
                                        </Col>
                                    )
                                })
                                :
                                data.list.map(item=>{                               
                                    return (
                                        <Col span={6} className='customer-principal-item' onClick={getCustomerList.bind(this,'userId',item.id,item.name)}>{item.name}<span className='customer-num'>({item.num})</span></Col>
                                    )                               
                                }) 
                            }                 
                        </Row>
                        <div className='customer-address'>
                            {
                                customerItem.data.map((item,index)=>{
                                    return (
                                        <Row type="flex" align='middle' className='customer-address-item'>
                                            <Col span={4}>
                                                <div className='customer-address-item-order'>
                                                    <p className='customer-address-item-num'>{index+1}</p>
                                                </div>                                          
                                            </Col>
                                            <Col span={20} className='item-content' onClick={getDetailAdress.bind(this,item)}>
                                                <div className='item-content-name'>{item.name}
                                                   
                                                </div>
                                                <div className='item-content-adress'>
                                                    <Row type='flex' align='middle' gutter={10}>
                                                        <Col span={8}>
                                                            <Row type='flex' align='top' >
                                                                <Col span={4}><i className="iconfont icon-chuangjianshijian icon-time" /></Col>
                                                                <Col span={20} className='item-time'>
                                                                    <div className='time-name'>创建时间</div>
                                                                    <div className='time-value'>
                                                                        {moment(item.createdTime.time).format('YYYY-MM-DD')}
                                                                    </div>                                                               
                                                                </Col>
                                                            </Row>
                                                        </Col>
                                                        <Col span={8}>
                                                            <Row type='flex' align='top' gutter={8} >
                                                                <Col span={4}><i className="iconfont icon-shoucigenjin icon-time" /></Col>
                                                                <Col span={20} className='item-time'>
                                                                    <div className='time-name'>首次跟进</div>
                                                                    <div className='time-value'>
                                                                        {
                                                                            item.firstFollowTime?
                                                                            moment(item.firstFollowTime).format('YYYY-MM-DD')
                                                                            :
                                                                            '暂无'
                                                                        }
                                                                    </div>                                                               
                                                                </Col>
                                                            </Row>
                                                        </Col>
                                                        <Col span={8}>
                                                            <Row type='flex' align='top' >
                                                                <Col span={4}><i className="iconfont icon-zuijingenjin icon-time" /></Col>
                                                                <Col span={20} className='item-time'>
                                                                    <div className='time-name'>最近跟进</div>
                                                                    <div className='time-value'>
                                                                        {
                                                                            item.followTime ?
                                                                            moment(item.followTime).format('YYYY-MM-DD')
                                                                            :
                                                                            '暂无'
                                                                        }
                                                                    </div>                                                               
                                                                </Col>
                                                            </Row>
                                                        </Col>
                                                    </Row>
                                                </div>
                                            </Col>
                                        </Row>
                                    )
                                })
                            }
                        </div>
                        <Row type="flex" justify="end" className='page-list'>
                            <Pagination total={customerItem.total} onChange={pageChange.bind(this)} pageSize={5}/>
                        </Row>
                </Col>
                <Col span={16} className="customer-panelMap-right">
                    <div className="map-title">客户动态</div>
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
    $$state: state.cusStatus
  }
}

function mapDispatchToProps(dispatch) {
  return {
      action: bindActionCreators(Actions, dispatch)
  }
}
export default  connect( mapStateToProps, mapDispatchToProps)(PanelMap);



/* 
item.createdTime?item.createdTime.time.moment.format('YYYY-MM-DD'):''
 */