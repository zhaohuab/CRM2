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


import UploadImg from "../list/UploadImg";//-------
import DetailObject from './DetailObject';//-------详情
import RelevantObject from './RelevantObject';//---相关
import DealObject from './DealObject';//-----------交易
import DynamicState from './DynamicState';//-------动态
import JoinList from './JoinList';//---------------参与人
import DetailTop from './DetailTop';//-------------详情页面抬头

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

    //详情面板左侧rab列表数据
    panelTabLeftFn(index){
        
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
export default connect(mapStateToProps, mapDispatchToProps)(ViewPanel);
