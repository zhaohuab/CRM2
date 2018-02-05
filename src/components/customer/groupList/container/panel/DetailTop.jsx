import {
    Modal,
    Row,
    Col,
    Menu,
    Icon,
    Button,
    Dropdown,
} from "antd";
import { browserHistory } from "react-router";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as Actions from "../../action";

import IcbcDetailInfo from "./IcbcDetailInfo";
//import AssignPerson from './AssignPerson'
import PersonChoiceModal from './PersonChoiceModal'
import ChangePerson from './ChangePerson'

class DetailTop extends React.Component {

    //打开编辑按钮
    btnEdit(){
        debugger
        this.props.action.showFormEdit(true);
    }

    //点击关注触发的方法
    attentionFn(state) {
        
        let { viewData } = this.props.$$state.toJS();
        let id = viewData.id;
        this.props.action.attentionFn(id, state);
    }

    //点击分配后改变viewData中saveOvs的值
    changeViewData(viewData){
        this.props.action.assignChangeViewData(viewData)
    }

    render(){
        let {viewData,icbcSelect2,icbcVisible2,icbcInfo1} = this.props.$$state.toJS();

        return(
        <Row className="view-warrper-header">
            <Row className="header-customer">
                <Col span={9}>
                    <Row type="flex" align="middle" gutter={15}>
                        <Row type="flex" align="middle">
                            <img
                                src={require("assets/images/header/photo.png")}
                                className="customer-image"
                            />
                        </Row>
                        <Col span={19}>
                            <Row>
                                <Row
                                    type="flex"
                                    align="middle"
                                    gutter={25}
                                >
                                    <div className="customer-name">
                                        {viewData.name}
                                    </div>

                                    <Row
                                        type="flex"
                                        align="middle"
                                        gutter={15}
                                        className="pointer"
                                    >
                                        <div className="checked-iconfont">
                                            <IcbcDetailInfo width={450}/>
                                        </div>
                                        <div>
                                            {viewData.followState ==0 ? (
                                                <span className="red" onClick={this.attentionFn.bind(this,0)}>
                                                    <i className="iconfont icon-guanzhu1" />未关注
                                                </span>
                                            ) : (
                                                <span className="blue" onClick={this.attentionFn.bind(this,1)}>
                                                    <i className="iconfont icon-yiguanzhu" />已关注
                                                </span>
                                            )}
                                        </div>
                                    </Row>
                                </Row>
                                <Row className="address pointer">
                                    {
                                        viewData.street?
                                        <span>
                                            { viewData.street }  <i className="iconfont icon-shouye-dingwei" />
                                        </span>:
                                        <span>{ viewData.street }</span>
                                    }
                                </Row>
                                <Row type='flex' align='middle' className="tags">
                                
                                        {
                                            viewData.typeName ?
                                            <span className='tags-item'><span>{viewData.typeName}</span></span>: ''
                                        }
                                        {
                                            viewData.levelName ? 
                                            <span className='tags-item'><span>{viewData.levelName}</span></span>:''
                                        }
                                        {
                                            viewData.stateName ?
                                            <span className='tags-item'><span>{viewData.stateName}</span> </span>:''
                                        }
                                                                      
                                </Row>
                                {/* <Row type='flex' align='middle' className='company'>
                                    {
                                        viewData.salesVOs?viewData.salesVOs.length?
                                        viewData.map((item)=>{
                                            return (
                                                <Col>{item.}</Col>
                                            )
                                        })
                                    }
                                </Row> */}
                            </Row>
                        </Col>
                    </Row>
                </Col>
                <Col span={15}>
                    <Row type="flex" align="middle" justify="end" gutter={15} >
                        {/* <div>
                            <PersonChoiceModal viewData={viewData} changeViewData = {this.changeViewData.bind(this)}/>
                        </div> */}
                        {/* <div>
                            <Button>
                                <i className="iconfont icon-qiyong" />分配
                            </Button>
                        </div>
                        <div>
                            <Button>
                                <i className="iconfont icon-shengji" />收回
                            </Button>
                        </div> */}
                        <div>
                            <Button onClick={this.btnEdit.bind(this)}>
                                <i className="iconfont icon-bianji" />编辑
                            </Button>
                        </div>
                    </Row>
                </Col>
            </Row>
            <Row>
                <Row>
                    <Col span={6}>
                        <Row
                            type="flex"
                            justify="center"
                            className="info-title"
                        >
                            <i className="iconfont icon-dianhua" />客户状态:
                        </Row>
                    </Col>
                    <Col span={6}>
                        <Row
                            type="flex"
                            justify="center"
                            className="info-title"
                        >
                            <i className="iconfont icon-dingwei" />首次跟进时间:
                        </Row>
                    </Col>
                    <Col span={6}>
                        <Row
                            type="flex"
                            justify="center"
                            className="info-title"
                        >
                            <i className="iconfont icon-fuzeren" />最近跟进时间:
                        </Row>
                    </Col>
                    <Col span={6}>
                        <Row
                            type="flex"
                            justify="center"
                            className="info-title"
                        >
                            <i className="iconfont icon-fuzeren" />负责人:
                        </Row>
                    </Col>
                </Row>
                <Row>
                    <Col span={6}>
                        <Row
                            type="flex"
                            justify="center"
                            className="info-content"
                        >
                            {viewData.stateName}
                        </Row>
                    </Col>
                    <Col span={6}>
                        <Row
                            type="flex"
                            justify="center"
                            className="info-content"
                        >
                            2017-8-8
                        </Row>
                    </Col>
                    <Col span={6}>
                        <Row
                            type="flex"
                            justify="center"
                            className="info-content"
                        >
                            2017-8-8
                        </Row>
                    </Col>
                    <Col span={6}>
                        <Row
                            type="flex"
                            justify="center"
                            className="info-content"
                        >
                            {viewData.salesVOs && viewData.salesVOs.length?viewData.salesVOs[0].ownerUserName:'无'}
                        </Row>
                    </Col>
                </Row>
            </Row>
        </Row>           
        )
    }
}

//绑定状态到组件props
function mapStateToProps(state, ownProps) {
    return {
        $$state: state.customerGroupList,
    };
}
//绑定action到组件props
function mapDispatchToProps(dispatch) {
    return {
        action: bindActionCreators(Actions, dispatch)
    };
}
//输出绑定state和action后组件
export default connect(mapStateToProps, mapDispatchToProps)(DetailTop);