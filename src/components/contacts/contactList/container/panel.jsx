import React, { Component, PropTypes } from "react";
import * as Actions from "../action";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import moment from 'moment';
import "assets/stylesheet/all/iconfont.css";
import {
    Icon,
    Button,
    Dropdown,
    Collapse,
    Row,
    Col,
    Tabs,
    Timeline,
    Select
} from "antd";
const Panel = Collapse.Panel;
const ButtonGroup = Button.Group;
const Option = Select.Option;
const TabPane = Tabs.TabPane;
class PanelView extends React.Component {

translate=(data,arr)=>{
   if(arr.length==0){
       data=data
   }else if(arr&&arr.length){
        arr.forEach(item=>{
            for(let key2 in data){             
                if(item==key2&&item!='ownerUserId'&&item!='deptid'){
                    if(item=='post'){
                        data.postName=data[item].value?data[item].value.name:data.postName;
                    }else{
                        data[item]=data[item].value?data[item].value:data[item];
                    }
                }
            }
        })      
    } 
    return data
}
    render() {
        let{ modalData, dynamicData, nameArr } = this.props.$$state.toJS();
        modalData=this.translate(modalData,nameArr)
        return (      
            <div>
            {modalData.name?
                <div>            
                 <Row className="panel-header">
                    <Row
                        type="flex"
                        justify="space-between"
                        align="middle"
                        className="panel-header-top"
                    >
                        <Col span={22}>
                            <Row type="flex" gutter={15} align="middle">
                                <Col span={6}>
                                    <Row type="flex" gutter={10} align="middle">
                                        <div className='contacts-icon'><i className="iconfont icon-lianxiren-daixuan" /></div>
                                        <span className="contacts-name">
                                            {modalData.name?modalData.name:''}
                                        </span>
                                    </Row>
                                </Col>
                                <Col span={14}></Col>
                                <Col span={4}>
                                    <Row type="flex" gutter={10} align="middle">
                                       <span className="contacts-name">                                           
                                            <Button onClick={this.props.onEdit.bind(this,true,modalData)} className='contact_view_edit_contact'>
                                                <i className="iconfont icon-bianji" />编辑
                                            </Button>
                                        </span>
                                    </Row>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                    <Row className="panel-header-bottom">
                        <div>
                            <div className="contact-single-title">
                                <i className="iconfont icon-bianji" />职务
                            </div>
                            <div className="contact-single-info">
                                {modalData.postName?modalData.postName:'暂无'}
                            </div>
                        </div>
                        <div>
                            <div className="contact-single-title">
                                <i className="iconfont icon-bianji" />客户
                            </div>
                            <div className="contact-single-info">
                                {modalData.customerInfo.name?modalData.customerInfo.name:'暂无'}
                            </div>
                        </div>
                        <div>
                            <div className="contact-single-title">
                                <i className="iconfont icon-bianji" />负责人
                            </div>
                            <Row
                                className="contact-single-info"
                                type="flex"
                                align="middle"
                            >
                                <img
                                    src={require("assets/images/header/photo.png")}
                                />
                                <span>{modalData.ownerUserInfo.name?modalData.ownerUserInfo.name:'暂无'}</span>
                            </Row>
                        </div>
                        <div>
                            <div className="contact-single-title">
                                <i className="iconfont icon-bianji" />
                                负责部门
                            </div>
                            <div className="contact-single-info">{modalData.ownerUserInfo.deptName?modalData.ownerUserInfo.deptName:'暂无'}</div>
                        </div>
                    </Row>
                </Row>

                <Row
                    className="panel-main"
                    type="flex"
                    style={{ minHeight: "600px" }}
                >
                    <Col span={18} className="panel-main-left">
                        <div className="inner tab-recoverd">
                            <Tabs defaultActiveKey="1">
                                <TabPane tab="资料" key="1">
                                    <div className="collapse-recover">
                                        <Collapse defaultActiveKey={["1", "2"]}>
                                            <Panel header="联系人信息" key="1">
                                                <ul className="contacts-info-ul">
                                                    <li>
                                                        <span>部门:</span>
                                                        <span>{modalData.ownerUserInfo.deptName?modalData.ownerUserInfo.deptName:'暂无'}</span>
                                                    </li>
                                                    <li>
                                                        <span>手机:</span>
                                                        <span>{modalData.mobile?modalData.mobile:'暂无'}</span>
                                                    </li>
                                                    <li>
                                                        <span>办公电话:</span>
                                                        <span>{modalData.officePhone?modalData.officePhone:'暂无'}</span>
                                                    </li>
                                                    <li>
                                                        <span>邮箱:</span>
                                                        <span>
                                                            {modalData.email?modalData.email:'暂无'}
                                                        </span>
                                                    </li>
                                                    <li>
                                                        <span>爱好:</span>
                                                        <span>{modalData.hobby?modalData.hobby:'暂无'}</span>
                                                    </li>
                                                    <li>
                                                        <span>备注:</span>
                                                        <span>{modalData.remarks?modalData.remarks:'暂无'}</span>
                                                    </li>
                                                </ul>
                                            </Panel>
                                        </Collapse>
                                    </div>
                                </TabPane>
                            </Tabs>
                        </div>
                    </Col>
                    <Col span={6} className="panel-main-right">
                        <div className="timeline-recoverd">
                            <div className="contacts-timeline-title">动态</div>
                            <div className="contacts-timeline">
                            {
                                dynamicData && dynamicData.length?
                                <Timeline>
                                    {
                                        dynamicData && dynamicData.length?
                                        dynamicData.map((item)=>{
                                            return(
                                                <Timeline.Item>
                                                    <p>
                                                        {
                                                            item.content && item.content.length?
                                                            item.content.map((itemDetail)=>{
                                                                return (
                                                                    <span>
                                                                        {
                                                                            itemDetail.link?
                                                                            <span className="timeline-import">
                                                                                {itemDetail.title + itemDetail.link.title}
                                                                            </span>:
                                                                            <span>{itemDetail.title}</span>
                                                                        }
                                                                    </span>
                                                                )
                                                            }):''
                                                        }
                                                    </p>
                                                    <p className="timeline-time">
                                                        {item.time?item.time:'暂无创建时间'}
                                                    </p>
                                                </Timeline.Item>
                                            )
                                        }):''
                                    }
                                </Timeline>:<div>暂无动态</div>
                            }
                            </div>
                        </div>
                    </Col>
                </Row>
                </div>:''}
            </div>
        );
    }
}

export default connect(
    state => {
        return {
            $$stateComponent: state.componentReducer,
            $$state: state.contacts
        };
    },
    dispatch => {
        return {
            action: bindActionCreators(Actions, dispatch)
        };
    }
)(PanelView);