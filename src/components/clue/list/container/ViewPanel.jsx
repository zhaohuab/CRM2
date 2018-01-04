import {
    Modal,
    Popover,
    Collapse,
    Tabs,
    Row,
    Col,
    Layout,
    Menu,
    Breadcrumb,
    Icon,
    Button,
    Dropdown,
    Timeline
} from "antd";
import { browserHistory } from "react-router";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
//导入action方法
import * as Actions from "../action";

import DetailObject from './DetailObject'
const TabPane = Tabs.TabPane;
const Panel = Collapse.Panel;
const confirm = Modal.confirm;




class ViewPanel extends React.Component {
    constructor(props) {
        super(props);
        this.state={
           
        }
        this.menu = (
            <Menu>
                <Menu.Item key="1">关闭</Menu.Item>
                <Menu.Item key="2">激活</Menu.Item>
            </Menu>
        );
    }

    
    // //打开编辑按钮
    // btnEdit() {
    //     debugger
    //     this.props.action.showForm(true);
    // }

    // //选择列表获取工商信息详情
    // customerListInfo(data, id, visiable) {
    //     debugger;
    //     this.props.action.icbcDetailInfo(data, id, visiable);
    // }

    // //认证
    // trueIdenti() {
    //     //获取已选择的公司id
    //     let { viewData, icbcSelect2 } = this.props.$$state.toJS();
    //     //modal点击认证的时候，把icbcSelect2清空，往viewData中存储verifyId的值
    //     let visiable = false;
    //     let id = viewData.id;
    //     debugger;
    //     this.props.action.checkedFn(id, visiable, icbcSelect2);
    // }

    // //取消认证
    // cancelIdenti() {
    //     let { viewData } = this.props.$$state.toJS();
    //     let id = viewData.id;
    //     let visiable = false;
    //     this.props.action.checkedCancelFn(id, visiable);
    // }

    // //modal底部显示按钮
    // footerContent() {
    //     let { viewData } = this.props.$$state.toJS();
    //     return (
    //         <div>
    //             <Button onClick={this.onCancel.bind(this)}>关闭</Button>
    //             {viewData.verifyId ? (
    //                 <Button onClick={this.cancelIdenti.bind(this)}>
    //                     取消认证
    //                 </Button>
    //             ) : (
    //                 <Button onClick={this.trueIdenti.bind(this)}>
    //                     确定认证
    //                 </Button>
    //             )}
    //         </div>
    //     );
    // }
    // //点击已核实按钮
    // checked() {
    //     let { viewData } = this.props.$$state.toJS();
    //     let verifyId = viewData.verifyId;
    //     debugger;
    //     this.props.action.modalDetalVisiable(true, verifyId);
    // }

    // //工商核实modal层点击取消按钮触发方法
    // onCancel() {
    //     this.props.action.modalDetalVisiableFalse(false);
    // }

    // //点击关注触发的方法
    // attentionFn(state) {
    //     let { viewData } = this.props.$$state.toJS();
    //     let id = viewData.id;
    //     this.props.action.attentionFn(id, state);
    // }

    // //点击分配后改变viewData中saveOvs的值
    // changeViewData(viewData){
    //     this.props.action.assignChangeViewData(editData)
    // }

    render() {
        debugger;
        let {editData} = this.props.$$state.toJS();
        let viewData=editData;
        
        debugger
       
        return (
            <div className="view-warrper">
                <Row className="view-warrper-header">
                    <Row className="header-customer">
                        <Col span={13}>
                            <Row type="flex" align="middle" gutter={15}>
                                <Row type="flex" align="middle">
                                    <img
                                        src={require("assets/images/header/photo.png")}
                                        className="customer-image"
                                    />
                                </Row>
                                <Col span={21}>
                                    <Row>
                                        <Row
                                            type="flex"
                                            align="middle"
                                            gutter={25}
                                        >
                                            <div className="customer-name">
                                                {viewData.ownerUserInfo.name}
                                            </div>

                                            <Row
                                                type="flex"
                                                align="middle"
                                                gutter={15}
                                                className="pointer"
                                            >
                                            
                                                <div>
                                                    {viewData.followFlag ==
                                                    0 ? (
                                                        <span
                                                            className="red"
                                                            // onClick={this.attentionFn.bind(
                                                            //     this,
                                                            //     0
                                                            // )}
                                                        >
                                                            <i className="iconfont icon-guanzhu1" />未关注
                                                        </span>
                                                    ) : (
                                                        <span
                                                            className="blue"
                                                            // onClick={this.attentionFn.bind(
                                                            //     this,
                                                            //     1
                                                            // )}
                                                        >
                                                            <i className="iconfont icon-yiguanzhu" />已关注
                                                        </span>
                                                    )}
                                                </div>
                                                <div className="checked-iconfont">
                                                  <span>
                                                      <i className="iconfont icon-taolun">讨论</i>
                                                  </span>
                                                </div>
                                            </Row>
                                        </Row>
        
                                        <Row className="tags">
                                        <div className="tag-group">
                                            {viewData.sourceName ? (
                                                <span>
                                                    {viewData.sourceName}
                                                </span>
                                            ) : (
                                                <div />
                                            )}
                                            {viewData.stateName ? (
                                                <span>
                                                    {viewData.stateName}
                                                </span>
                                            ) : (
                                                <div />
                                            )}
                                        </div>
                                    </Row>
                                    </Row>
                                </Col>
                            </Row>
                        </Col>
                        <Col span={11}>
                            <Row
                                type="flex"
                                align="middle"
                                justify="end"
                                gutter={15}
                            >
                                <div>
                                    <Button>
                                        <i className="iconfont icon-bianji" />编辑
                                    </Button>
                                </div>
                                <div>
                                    <Button >
                                        <i className="iconfont icon-bianji" />线索转化
                                    </Button>
                                </div>
                                <div>
                                <Dropdown
                                overlay={this.menu}
                                trigger={["click"]}
                            >
                                <Button>
                                    更多
                                    <Icon type="down" />
                                </Button>
                            </Dropdown>
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
                                    <i className="iconfont icon-dianhua" />公司名称:
                                </Row>
                            </Col>
                            <Col span={6}>
                                <Row
                                    type="flex"
                                    justify="center"
                                    className="info-title"
                                >
                                    <i className="iconfont icon-dingwei" />最后跟进时间:
                                </Row>
                            </Col>
                            <Col span={6}>
                                <Row
                                    type="flex"
                                    justify="center"
                                    className="info-title"
                                >
                                    <i className="iconfont icon-fuzeren" />线索状态:
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
                                    {viewData.companyName}
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
                                    {viewData.stateName}
                                </Row>
                            </Col>
                            <Col span={6}>
                                <Row
                                    type="flex"
                                    justify="center"
                                    className="info-content"
                                >
                                  {viewData.ownerUserInfo.name}
                                </Row>
                            </Col>
                        </Row>
                    </Row>
                </Row>

                <Row className="view-warrper-main">
                    <div>
                        <Col span={18} className="warrper-main-left">
                            <div className="main-left-inner collapse-recover tab-recoverd">
                                <Tabs defaultActiveKey="1">
                                    <TabPane tab="资料" key="1">
                                        <DetailObject viewData={viewData}/>
                                    </TabPane>
                                    <TabPane tab="相关" key="2">
                                        {/* <RelevantObject/> */}
                                    </TabPane>
            
                                </Tabs>
                            </div>
                        </Col>
                        <Col span={6} className="warrper-main-right">
                            <div className="main-right-state">动态</div>
                            <div className="main-right-timeline timeline-recoverd">
                                <Timeline>
                                    <Timeline.Item>
                                        <p>
                                            <span className="timeline-import">
                                                winni
                                            </span>创建了任务<span className="timeline-import">
                                                AAA
                                            </span>
                                        </p>
                                        <p className="timeline-time">
                                            2017-08-18 14:30
                                        </p>
                                    </Timeline.Item>
                                    <Timeline.Item>
                                        <p>
                                            <span className="timeline-import">
                                                winni
                                            </span>创建了任务<span className="timeline-import">
                                                AAA
                                            </span>
                                        </p>
                                        <p className="timeline-time">
                                            2017-08-18 14:30
                                        </p>
                                    </Timeline.Item>
                                    <Timeline.Item>
                                        <p>
                                            <span className="timeline-import">
                                                winni
                                            </span>创建了任务<span className="timeline-import">
                                                AAA
                                            </span>
                                        </p>
                                        <p className="timeline-time">
                                            2017-08-18 14:30
                                        </p>
                                    </Timeline.Item>
                                    <Timeline.Item>
                                        <p>
                                            <span className="timeline-import">
                                                winni
                                            </span>创建了任务<span className="timeline-import">
                                                AAA
                                            </span>
                                        </p>
                                        <p className="timeline-time">
                                            2017-08-18 14:30
                                        </p>
                                    </Timeline.Item>
                                </Timeline>
                            </div>
                        </Col>
                    </div>
                </Row>   

            </div>
        );
    }
}

//绑定状态到组件props
function mapStateToProps(state, ownProps) {
    return {
        $$state: state.clue
    };
}
//绑定action到组件props
function mapDispatchToProps(dispatch) {
    return {
        action: bindActionCreators(Actions, dispatch)
    };
}
//输出绑定state和action后组件
export default connect(mapStateToProps, mapDispatchToProps)(ViewPanel);
