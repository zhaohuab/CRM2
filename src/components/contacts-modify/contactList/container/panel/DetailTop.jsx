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
    btnEdit() {
        debugger
        let { viewData } = this.props.$$state.toJS();
        this.props.action.showFormEdit(true);
    }

    //点击升级按钮
    upgrade(){
        let { viewData } = this.props.$$state.toJS();
        let id = viewData.id;
        this.props.action.cumUpgrade(id)

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

    //停启用功能
    canUse(enableState){
        //点击停用启用
        
        let {searchMap,viewData,pagination} = this.props.$$state.toJS()
        const ids = viewData.id;
        searchMap={}
        this.props.action.setDetailEnableState(
            ids,
            enableState, //获取起停用数字
            pagination,
            searchMap //查询条件
        );
    }

    //生成地址方法
    createAddress(viewData){
        debugger
        if(viewData.street && viewData.street.address){
             return(
                <span>
                    { viewData.street.address }  <i className="iconfont icon-shouye-dingwei" />
                </span>
             )
        }else if(viewData.street && typeof viewData.street == 'string'){
            return(
                <span>{ viewData.street }  <i className="iconfont icon-shouye-dingwei" /></span>
            )
        }else{
            return(
                <span></span>
            )
        }
    }

    render(){
        let {viewData,icbcSelect2,icbcVisible2,icbcInfo1} = this.props.$$state.toJS();
        
        let name = viewData.name
debugger
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
                                        {viewData.name && viewData.name.value?viewData.name.value:viewData.name}
                                    </div>
                                   {/*  <Row
                                        type="flex"
                                        align="middle"
                                        gutter={15}
                                        className="pointer"
                                    >
                                        <div className="checked-iconfont">
                                            <IcbcDetailInfo viewDataProps = {viewData}/>
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
                                     */}
                                </Row>
                            {  /*   <Row className="address pointer">
                                   {
                                       this.createAddress(viewData)
                                   }
                                </Row> 
                                <Row type='flex' align='middle'className="tags">
                                    {
                                        viewData.biztypeName ?
                                        <span className='tags-item'><span>{viewData.biztypeName}</span></span>: ''
                                    }
                                    {
                                        viewData.levelName ? 
                                        <span className='tags-item'><span>{viewData.levelName}</span></span>:''
                                    }
                                    {
                                        viewData.stateName ?
                                        <span className='tags-item'><span>{viewData.stateName}</span> </span>:''
                                    }
                                    {
                                        viewData.industryName ?
                                        <span className='tags-item'><span>{viewData.industryName}</span> </span>:''
                                    }
                                    {
                                        viewData.cannelTypeName ?
                                        <span className='tags-item'><span>{viewData.cannelTypeName}</span> </span>:''
                                    }
                                    {
                                        viewData.isGroup == 2?
                                            viewData.isGroupName ?
                                            <span className='tags-item'><span>{viewData.isGroupName}</span> </span>:''
                                        :''
                                    }
                                </Row>
                                */}
                            </Row>
                        </Col>
                    </Row>
                </Col>
                <Col span={15}>
                   <Row type="flex" align="middle" justify="end" gutter={15} >
                   { /* 
                        {
                            viewData.enableState == 1?
                                <div>
                                    <PersonChoiceModal viewData={viewData} changeViewData = {this.changeViewData.bind(this)}/>
                                </div>:''
                        }                     
                        {
                            viewData.enableState == 1?
                                <div>
                                    <Button onClick={this.canUse.bind(this,2)} className="customer_view_stop_customer" >
                                        <i className="iconfont icon-tingyong" />停用
                                    </Button>
                                </div>
                            :
                            <div>
                                <Button onClick={this.canUse.bind(this,1)} className="customer_view_start_customer">
                                    <i className="iconfont icon-qiyong" />启用
                                </Button>
                            </div>
                        }
                        <div>
                            <Button onClick={this.upgrade.bind(this)} className="customer_view_upgrade_customer">
                                <i className="iconfont icon-shengji" />升级
                            </Button>
                        </div>
                        */}
                        <div>
                            <Button onClick={this.btnEdit.bind(this)} className="customer_view_edit_customer">
                                <i className="iconfont icon-bianji" />编辑
                            </Button>
                        </div>
                    </Row> 
                </Col>
            </Row>
            <Row>
                <Row>
                    <Col span={4}>
                        <Row
                            type="flex"
                            justify="center"
                            className="info-title"
                        >
                            <i className="iconfont icon-zhiwu" />职务:
                        </Row>
                    </Col>
                    <Col span={5}>
                        <Row
                            type="flex"
                            justify="center"
                            className="info-title"
                        >
                            <i className="iconfont icon-kehu" />客户:
                        </Row>
                    </Col>
                    <Col span={5}>
                        <Row
                            type="flex"
                            justify="center"
                            className="info-title"
                        >
                            <i className="iconfont icon-shoujihao" />手机号:
                        </Row>
                    </Col>
                    <Col span={5}>
                        <Row
                            type="flex"
                            justify="center"
                            className="info-title"
                        >
                            <i className="iconfont icon-fuzeren" />负责人:
                        </Row>
                    </Col>
                       <Col span={5}>
                        <Row
                            type="flex"
                            justify="center"
                            className="info-title"
                        >
                            <i className="iconfont icon-fuzebumen" />负责部门:
                        </Row>
                    </Col>
                </Row>
                <Row>
                    <Col span={4}>
                        <Row
                            type="flex"
                            justify="center"
                            className="info-content"
                        >
                            {viewData.stateName}
                        </Row>
                    </Col>
                    <Col span={5}>
                        <Row
                            type="flex"
                            justify="center"
                            className="info-content"
                        >
                            2017-8-8
                        </Row>
                    </Col>
                    <Col span={5}>
                        <Row
                            type="flex"
                            justify="center"
                            className="info-content"
                        >
                            2017-8-8
                        </Row>
                    </Col>
                    <Col span={5}>
                        <Row
                            type="flex"
                            justify="center"
                            className="info-content"
                        >
                            {viewData.salesVOs && viewData.salesVOs.length?viewData.salesVOs[0].ownerUserName:'无'}
                        </Row>
                    </Col>
                    <Col span={5}>
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
        $$state: state.contacts,
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