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
const TabPane = Tabs.TabPane;
const Panel = Collapse.Panel;
const confirm = Modal.confirm;

import IcbcSimpleinfo from "./icbcSimpleinfo";
import UploadImg from "./uploadImg";

import AssignPerson from './assignPerson'
import ChangePerson from './changePerson'
import DetailObject from './detailObject'
import RelevantObject from './relevantObject'
import DealObject from './dealObject'

//分配table头部
const columns = [{
    title: '姓名',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: '部门名称',
    dataIndex: 'deptName',
    key: 'deptName',
  }];

class ViewPanel extends React.Component {
    constructor(props) {
        super(props);
        this.state={
           
        }
    }

    //打开编辑按钮
    btnEdit() {
        debugger
        this.props.action.showForm(true);
    }

    //选择列表获取工商信息详情
    customerListInfo(data, id, visiable) {
        debugger;
        this.props.action.icbcDetailInfo(data, id, visiable);
    }

    //认证
    trueIdenti() {
        //获取已选择的公司id
        let { viewData, icbcSelect2 } = this.props.$$state.toJS();
        //modal点击认证的时候，把icbcSelect2清空，往viewData中存储verifyId的值
        let visiable = false;
        let id = viewData.id;
        debugger;
        this.props.action.checkedFn(id, visiable, icbcSelect2);
    }

    //取消认证
    cancelIdenti() {
        let { viewData } = this.props.$$state.toJS();
        let id = viewData.id;
        let visiable = false;
        this.props.action.checkedCancelFn(id, visiable);
    }

    //modal底部显示按钮
    footerContent() {
        let { viewData } = this.props.$$state.toJS();
        return (
            <div>
                <Button onClick={this.onCancel.bind(this)}>关闭</Button>
                {viewData.verifyId ? (
                    <Button onClick={this.cancelIdenti.bind(this)}>
                        取消认证
                    </Button>
                ) : (
                    <Button onClick={this.trueIdenti.bind(this)}>
                        确定认证
                    </Button>
                )}
            </div>
        );
    }
    //点击已核实按钮
    checked() {
        let { viewData } = this.props.$$state.toJS();
        let verifyId = viewData.verifyId;
        debugger;
        this.props.action.modalDetalVisiable(true, verifyId);
    }

    //工商核实modal层点击取消按钮触发方法
    onCancel() {
        this.props.action.modalDetalVisiableFalse(false);
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

    render() {
        let {viewData,icbcSelect2,icbcVisible2,icbcInfo1,assignList,assignVisiable,assignPersonList} = this.props.$$state.toJS();
        let defaultList = [
            {
                uid: -1,
                name: "xxx.png",
                status: "done",
                url:
                    "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
            }
        ];
       
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
                                                {viewData.name}
                                            </div>

                                            <Row
                                                type="flex"
                                                align="middle"
                                                gutter={15}
                                                className="pointer"
                                            >
                                                <div className="checked-iconfont">
                                                    {viewData.verifyId ? (
                                                        <span
                                                            onClick={this.checked.bind(
                                                                this
                                                            )}
                                                            className="blue"
                                                        >
                                                            <i className="iconfont icon-yiheshi-" />已核实
                                                        </span>
                                                    ) : (
                                                        <span className="red">
                                                            <i className="iconfont icon-weiheshi-" />未核实
                                                        </span>
                                                    )}
                                                </div>
                                                <div>
                                                    {viewData.followState ==
                                                    0 ? (
                                                        <span
                                                            className="red"
                                                            onClick={this.attentionFn.bind(
                                                                this,
                                                                0
                                                            )}
                                                        >
                                                            <i className="iconfont icon-guanzhu1" />未关注
                                                        </span>
                                                    ) : (
                                                        <span
                                                            className="blue"
                                                            onClick={this.attentionFn.bind(
                                                                this,
                                                                1
                                                            )}
                                                        >
                                                            <i className="iconfont icon-yiguanzhu" />已关注
                                                        </span>
                                                    )}
                                                </div>
                                            </Row>
                                        </Row>
                                        <Row className="address pointer">
                                            {viewData.address}
                                            <i className="iconfont icon-shouye-dingwei" />
                                        </Row>
                                        <Row className="tags">
                                            <div className="tag-group">
                                                {viewData.typeName ? (
                                                    <span>
                                                        {viewData.typeName}
                                                    </span>
                                                ) : (
                                                    <div />
                                                )}
                                                {viewData.levelName ? (
                                                    <span>
                                                        {viewData.levelName}
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
                                    {viewData.verifyId ? (
                                        ""
                                    ) : (
                                        <IcbcSimpleinfo
                                            viewData={viewData}
                                            icbcSelect={icbcSelect2} //显隐
                                            customerListInfo={this.customerListInfo.bind(
                                                this
                                            )} //点确定触发的条件
                                            width={450}
                                        />
                                    )}
                                </div>

                                <div>
                                    <AssignPerson viewData={viewData} changeViewData = {this.changeViewData.bind(this)}/>
                                </div>
                                <div>
                                    <ChangePerson viewData={viewData} changeViewData = {this.changeViewData.bind(this)}/>
                                </div>
                                <div>
                                    <Button>
                                        <i className="iconfont icon-bianji" />升级
                                    </Button>
                                </div>
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
                                    {viewData.salesVOs[0].ownerUserName}
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
                                    <TabPane tab="详情" key="1">
                                        <DetailObject viewData={viewData}/>
                                    </TabPane>
                                    <TabPane tab="相关" key="2">
                                        <RelevantObject/>
                                    </TabPane>
                                    <TabPane tab="交易" key="3">
                                        <DealObject/>
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
                <Modal
                    title="工商核实"
                    visible={icbcVisible2}
                    onCancel={this.onCancel.bind(this)}
                    footer={this.footerContent.call(this)}
                    width={500}
                    maskClosable={false}
                >
                    <div className="modal-height">
                        {icbcInfo1 && icbcInfo1.length
                            ? icbcInfo1.map(item => {
                                  return (
                                      <div className="icbc-detail-item">
                                          <span>{item.name}</span>:<span>
                                              {item.value}
                                          </span>
                                      </div>
                                  );
                              })
                            : ""}
                    </div>
                </Modal>

            </div>
        );
    }
}

//绑定状态到组件props
function mapStateToProps(state, ownProps) {
    return {
        $$state: state.customerList,
        $$stateCommon: state.componentReducer
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
