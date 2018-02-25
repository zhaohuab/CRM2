import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as Actions from "../action";
import reqwest from "utils/reqwest";
import './index.less';
import "assets/stylesheet/all/iconfont.css";
var moment = require("moment");
import {
    Modal,
    Button,
    Row,
    Col,
    Spin,
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
import getOptions from './GetRoleOption.jsx';
import getItemOption from './GetItemOption.jsx';

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
                content: '您查看的客户暂无经纬度',
            });
        }     
    }

    reload = () => {//返回按钮，返回上级请求页面
        let customerListBack = this.props.$$state.get('customerListBack').toJS();
        let customerItemBack = this.props.$$state.get('customerItemBack').toJS();
        let arr1 = customerListBack[customerListBack.length-2];
        let arr2 = customerItemBack[customerItemBack.length-2]
        debugger;
        if(customerListBack.length>1){
            this.props.action.getCustomerList(...arr1, true);
            this.props.action.getCustomerItem(...arr2, true);
            this.props.action.listPop();
        }     
    }

    pageChange = (num) => {//页码更改
        //debugger;
        let {total}=this.props.$$state.get('data').toJS();
        let str = this.props.$$state.get('userName');
        let id = this.props.$$state.get(str);
        this.props.action.getCustomerItem(str,id,num,true)
    }

    getCustomer = (str, id, name) => {
        debugger;
        let arr = this.props.$$state.get('customerListBack').toJS().pop();
        if(id!=arr[1]){//如果已经是最后一级了，就不在发请求
            this.props.action.getCustomerList(str, id, name);
            this.props.action.getCustomerItem(str, id, 1)
        }
    
    }

    componentDidMount() {  
        this.props.action.getCustomerList('','','');//获取部门及业务员
        this.props.action.getCustomerItem('','',1);//获取具体客户信息
        this.areaMap = echarts.init(this.refs.areaMap);//初始化echarts   
        this.areaMap.on("mouseover", function (params){  //给地图添加鼠标划过事件
            if(params.data.value == undefined){  
                this.areaMap.dispatchAction({  
                type: 'downplay'  
                });  
            }  
        });  
        window.addEventListener("resize", this.onWindowResize.bind(this));
    }
    componentDidUpdate() {
        let data = this.props.$$state.get('data').toJS();
        if(data.list[0]){
            this.areaMap.setOption(getOptions(data));  
        }
    }
    render() {
        let reload = this.reload;
        let pageChange = this.pageChange;
        let getDetailAdress = this.getDetailAdress;
        let getCustomer = this.getCustomer;
        let {  $$state, action} = this.props;
        let { data, customerItem } =  $$state.toJS();
        let itemFlag = $$state.get('itemFlag');
        let departmentName = $$state.get('departmentName'); 
        let loadingFlag = $$state.get('loadingFlag');
        let page = $$state.get('page');  
        return (
            <Row type="flex" className="customer-panelMap-wraper">
                <Col span={8} className="customer-panelMap-left">
                   <Row type="flex" align='middle' className='customer-detail-title'>
                            <Col span={20} className='customer-detail-total'>{departmentName}当前客户总数：<span className='customer-detail-num'>{data.total}</span></Col>
                            <Col span={4} className='goBack'><Button size="small" onClick={reload.bind(this)}>返回</Button></Col>                   
                        </Row>
                        <div className='customer-principal'>
                            { 
                                itemFlag?
                                data.list.map(item=>{
                                    return (
                                        <Row  
                                          className='customer-principal-item customer-principal-role-department' 
                                          onClick={getCustomer.bind(this,'deptId',item.id,item.name)}>                 
                                                <Col span={18} className='customer-name'>{item.name}</Col>
                                                <Col span={6}><span className='customer-num'>{item.num}</span>个客户</Col>                                         
                                        </Row>
                                    )
                                })
                                :
                                data.list.map(item=>{                               
                                    return (
                                        <div  
                                          className='customer-principal-item customer-principal-role-item ' 
                                          onClick={getCustomer.bind(this,'userId',item.id,item.name)}
                                        >
                                            <div className='role-name' title={item.name}>{item.name}</div>
                                            <div className='customer-num'>({item.num})</div>
                                        </div>
                                    )                               
                                }) 
                            }                 
                        </div>
                        <div className='customer-address'>
                            {
                                loadingFlag ?
                                <Spin size="large" className='loading'/>
                                :
                                <div>
                                    {
                                        customerItem.data.map((item,index)=>{
                                            let flag = item.latitude&&item.longitude
                                            return (
                                                <Row type="flex" align='middle' className='customer-address-item'>
                                                    <Col span={3}>
                                                        <div className={flag ? 'customer-address-item-order1':'customer-address-item-order2'}>
                                                            <i className="iconfont icon-dingweilan" />
                                                            <p className='customer-address-item-num'>{index+1}</p>
                                                        </div>                                          
                                                    </Col>
                                                    <Col span={16} className='item-content' onClick={getDetailAdress.bind(this,item)}>
                                                        <div className='item-content-name'>{item.name}
                                                            <div className='item-content-name-title'>{item.name}</div>
                                                        </div>
                                                        <div className='item-content-adress'>
                                                        <i className="iconfont icon-dingwei" />{item.street?item.street:'该客户暂无地址详情'}</div>
                                                    </Col>
                                                </Row>
                                            )
                                        })
                                    } 
                                </div>
                            }
                        </div>
                        <Row type="flex" justify="end" className='page-list'>
                            <Pagination   current={page} total={ data.total } onChange={ pageChange.bind(this) } pageSize={ 5 }/>
                        </Row>
                </Col>
                <Col span={16} className="customer-panelMap-right">
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

