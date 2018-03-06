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
    Collapse
} from "antd";

const TabPane = Tabs.TabPane;
const Panel = Collapse.Panel;
import { browserHistory } from "react-router";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as Actions from "../action";
import reqwest from "utils/reqwest";
//import { cum as url, doc, baseDir,oppstage ,opportunity,contacts} from "api";



class RelevantObject extends React.Component {
    constructor(props) {
        super(props);

    }

    transDate = (date) => {
        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        var day = date.getDate();
        var hour = date.getHours();
        var minute = date.getMinutes();
        var second = date.getSeconds();
        return year + "-" + month + "-" + day + "   " + hour + ":" + minute + ":" + second;
    }

    transTime = (data) => {
        debugger
        if (data && data.expectSignTime) {
            data.expectSignTime = this.transDate(new Date(data.expectSignTime.time))
        }
        return data
    }

    render() {
        debugger
        let { editData } = this.props.$$state.toJS();
        let relData = editData.related;
        if (relData && relData.bizopps) {
            debugger
            let bizopps = relData.bizopps;
            let bizoppsData = this.transTime(bizopps);
        }
        // if(relData&&relData.contacts){
        //     let { contacts} = relData;
        // }
        // if(relData&&relData.customers){
        //     let customers = relData.customers;
        //     console.log(345,customers)
        //     if (customers && customers.salesVOs) {
        //         debugger
        //         console.log(678,customers.salesVOs)
        //         let ownerUserName = customers.salesVOs;
        //     } else {
        //         let ownerUserName = []
        //     }
        // }else{
        //     let customers ={};
        // }

        return (
            <div className='clue-relative'>

                <Row className="clue-customer">
                    <Row style={{ marginBottom: '5px' }}>
                        <Col span={24}>
                            <i className="iconfont icon-zhuanhuadekehu" />
                            <span sytle={{ color: '#333333' }}>转化的客户</span>
                        </Col>
                    </Row>

                    {editData && editData.related && editData.related.customers ?
                        <Row>
                            <Row style={{ marginLeft: '21px', marginBottom: '5px' }}>

                                <Col span={12} >
                                    <div>{editData.related.customers.name ? editData.related.customers.name : ''}</div>
                                </Col>

                                <Col span={12} style={{ textAlign: 'right', color: '#F1B941' }}>
                                    {/* <div>3天未跟进</div> */}
                                </Col>

                            </Row>
                            <Row style={{ marginLeft: '21px', color: '#999999', marginBottom: '5px' }}>
                                <Col span={12}>
                                    <div>{editData.related.customers.address ? editData.related.customers.address : ''}</div>
                                </Col>
                                <Col span={12} style={{ textAlign: 'right', color: '#999999' }}>
                                    <div>{editData.related.customers && editData.related.customers.ownerUserName && editData.related.customers.ownerUserName.length && editData.related.customers.ownerUserName[0].ownerUserName ? editData.related.customers.ownerUserName[0].ownerUserName : ''}</div>
                                </Col>
                            </Row>
                            <Row style={{ marginLeft: '21px', color: '#999999', marginBottom: '5px' }}>
                                <Col span={10}>
                                    <div>{editData.related.customers.levelName ? editData.related.customers.levelName : ''}</div>
                                </Col>

                            </Row>
                        </Row> : <div style={{ marginLeft: '21px' }}>暂无数据</div>}

                </Row>



                {/* --------------------------- */}
                <Row className="clue-opportunity">
                    <Row style={{ marginBottom: '5px' }}>
                        <Col span={24}>
                            <i className="iconfont icon-shangji" />
                            <span sytle={{ color: '#333333' }}>转化的商机</span>
                        </Col>
                    </Row>

                    {relData && relData.bizopps ?
                        <Row>
                            {relData.bizopps && relData.bizopps.customerName ?
                                <Row style={{ marginLeft: '21px', marginBottom: '5px' }}>

                                    <Col span={12} >
                                        <div>{relData.bizopps.customerName}</div>
                                    </Col>
                                </Row> : ''}
                            <Row style={{ marginLeft: '21px', color: '#999999', marginBottom: '5px' }}>
                                <Col span={12}>
                                    <div>{relData.bizopps && relData.bizopps.saleStageName ? relData.bizopps.saleStageName : ''}</div>
                                </Col>
                                <Col span={12} style={{ textAlign: 'right', color: '#999999' }}>
                                    <div>赢单概率:{relData.bizopps && relData.bizopps.winProbability ? relData.bizopps.winProbability : ''}%</div>
                                </Col>
                            </Row>
                            <Row type='flex' justify='center' align='middle' style={{ marginLeft: '21px', marginBottom: '5px' }}>
                                <Col span={12}>
                                    <div>{relData.bizopps && relData.bizopps.deptName ? relData.bizopps.deptName : ''}</div>
                                </Col>
                                <Col span={12} style={{ textAlign: 'right', color: '#999999' }}>
                                    <div>{relData.bizopps && relData.bizopps.ownerUserName ? relData.bizopps.ownerUserName : ''}</div>
                                </Col>
                            </Row>
                            <Row style={{ marginLeft: '21px', color: '#CCCCCC', marginBottom: '5px' }}>
                                <Col span={12}>
                                    <div>{relData.bizopps && relData.bizopps.expectSignMoney ? relData.bizopps.expectSignMoney : ''}</div>
                                </Col>
                                <Col span={12} style={{ textAlign: 'right', color: '#999999' }}>
                                    <div>{relData.bizopps && relData.bizopps.expectSignTime ? relData.bizopps.expectSignTime : ''}</div>
                                </Col>

                            </Row>
                        </Row> : <div style={{ marginLeft: '21px' }}>暂无数据</div>}
                </Row>

                <Row className="clue-contast">
                    <Row style={{ marginBottom: '5px' }}>
                        <Col span={24}>
                            <i className="iconfont icon-lianxiren-daixuan" />
                            <span sytle={{ color: '#333333' }}>转化的联系人</span>
                        </Col>
                    </Row>
                    {editData.related && editData.related.contacts ?
                        <Row>
                            {editData.related.contacts && editData.related.contacts.ownerUserInfo.name ?
                                <Row style={{ marginLeft: '21px', marginBottom: '5px' }}>

                                    <Col span={12} >
                                        <div>{editData.related.contacts.ownerUserInfo.name}</div>
                                    </Col>
                                </Row> : ''}
                            {editData.related.contacts && editData.related.contacts.orgName ?
                                <Row style={{ marginLeft: '21px', color: '#999999', marginBottom: '5px' }}>
                                    <Col span={12}>
                                        <div>{relData.contacts.orgName}</div>
                                    </Col>

                                </Row> : ''}
                            <Row style={{ marginLeft: '21px', color: '#999999', marginBottom: '5px' }}>
                                <Col span={10}>
                                    <div>{relData.contacts && relData.contacts.postName ? relData.contacts.postName : ''}</div>
                                </Col>

                            </Row>
                        </Row> : <div style={{ marginLeft: '21px' }}>暂无数据</div>}
                </Row>

            </div>
        )
    }
}

//绑定状态到组件props
function mapStateToProps(state, ownProps) {
    return {
        $$state: state.lead,

    };
}
//绑定action到组件props
function mapDispatchToProps(dispatch) {
    return {
        action: bindActionCreators(Actions, dispatch)
    };
}
//输出绑定state和action后组件
export default connect(mapStateToProps, mapDispatchToProps)(RelevantObject);