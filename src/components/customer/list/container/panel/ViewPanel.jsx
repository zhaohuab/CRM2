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
import * as Actions from "../../action";
const TabPane = Tabs.TabPane;
const Panel = Collapse.Panel;
const confirm = Modal.confirm;


import UploadImg from "../list/UploadImg";
import DetailObject from './DetailObject'
import RelevantObject from './RelevantObject'
import DealObject from './DealObject'
import DynamicState from './DynamicState'
import JoinList from './JoinList'
import DetailTop from './DetailTop'

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
            JoinPagination: {
                pageSize: 50,
                page: 1,
            }
        }
    }

<<<<<<< HEAD
    //打开编辑按钮
    btnEdit() {
        //debugger
        this.props.action.showForm(true);
    }

    //选择列表获取工商信息详情
    customerListInfo(data, id, visiable) {
        //debugger;
        this.props.action.icbcDetailInfo(data, id, visiable);
    }

    //认证
    trueIdenti() {
        //获取已选择的公司id
        let { viewData, icbcSelect2 } = this.props.$$state.toJS();
        //modal点击认证的时候，把icbcSelect2清空，往viewData中存储verifyId的值
        let visiable = false;
        let id = viewData.id;
        //debugger;
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
        //debugger;
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

=======
>>>>>>> 312d46699d979d9b7f362833e04a0fd802dbca3c
    //详情面板左侧rab列表数据
    panelTabLeftFn(index){
        debugger
        let { viewData } = this.props.$$state.toJS();
        let id = viewData.id
        if(index == 2){
            this.props.action.getLeftPaneltList(id,this.state.JoinPagination,index);
            return
        }
        this.props.action.changeLeftPanel(index)
    }

    //详情面板右侧tab列表获取数据
    panelTabRightFn(index){
<<<<<<< HEAD
        //debugger
=======
>>>>>>> 312d46699d979d9b7f362833e04a0fd802dbca3c
        let { viewData } = this.props.$$state.toJS();
        //if(index == 2){
            let id = viewData.id
            this.props.action.getRightPaneltList(id,this.state.JoinPagination,index)
       // }
    }

    render() {
        let {viewData,icbcSelect2,icbcVisible2,icbcInfo1,viewDataRelevant,leftJoinPanelKeys,RightJoinPanelKeys} = this.props.$$state.toJS();
        let defaultList = [
            {
                uid: -1,
                name: "xxx.png",
                status: "done",
                url:
                    "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
            }
        ];
<<<<<<< HEAD
        //debugger
=======
        
>>>>>>> 312d46699d979d9b7f362833e04a0fd802dbca3c
        return (
            <div className="view-warrper">
                <DetailTop/>
                <Row className="view-warrper-main">
                    <div>
                        <Col span={18} className="warrper-main-left">
                            <div className="main-left-inner collapse-recover tab-recoverd">
                                <Tabs defaultActiveKey="1" activeKey = {leftJoinPanelKeys} onTabClick={this.panelTabLeftFn.bind(this)} >
                                    <TabPane tab="详情" key="1">
                                        <DetailObject/>
                                    </TabPane>
                                    <TabPane tab="相关" key="2">
                                        <RelevantObject JoinPagination={this.state.JoinPagination}/>
                                    </TabPane>
                                    <TabPane tab="交易" key="3">
                                        <DealObject/>
                                    </TabPane>
                                </Tabs>
                            </div>
                        </Col>
                        <Col span={6} className="warrper-main-right tab-recoverd">
                            <Tabs defaultActiveKey="1" activeKey = {RightJoinPanelKeys} onTabClick={this.panelTabRightFn.bind(this)}>
                                <TabPane tab="动态" key="1">
                                    <DynamicState/>
                                </TabPane>
                                <TabPane tab="参与人" key="2">
                                    <JoinList/>
                                </TabPane>
                            </Tabs>
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
        $$state: state.customerList,
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
