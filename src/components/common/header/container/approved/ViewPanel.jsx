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
    Timeline,
    Form,
    Divider
} from "antd";
import { browserHistory } from "react-router";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
//导入action方法
import * as Actions from "../../action/approved.js";
import UnfinishForm from './UnfinishForm';
import MentionModal from './MentionModal'
import "assets/stylesheet/all/iconfont.css";
const TabPane = Tabs.TabPane;
const Panel = Collapse.Panel;
const confirm = Modal.confirm;
const FormItem = Form.Item;

class ViewPanel extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            flag: false,
            show: false,
            // showAction:''，
          
        }

    }
    // handleMenuClick(e) {
    //    this.props.action.mentionVisible(true)
    // }

    mention = () => {
        const that=this
        Modal.success({
            title: '提醒审批成功',
            okText: '确定'
        });
    }

    onClick = (item) => {
        // debugger
        // if (item.action == 'agree') {
        //     debugger
        //     this.setState({
        //         show: true
        //     }, () => {
        //         this.props.action.mentionVisible(true, 'agree')
        //     })
        // }
        // if (item.action == 'reject') {
        //     debugger
        //     this.props.action.mentionVisible(true, 'reject')
        // }
        // if (item.action == 'rejectall') {
        //     debugger
        //     this.props.action.mentionVisible(true, 'rejectall')
        // }
    }

    onReturnOk=()=>{
        // let current = this.props.$$state.get('currentRecord').toJS();
        // let {pagination} = this.props.$$state.toJS()
        // this.props.action.allButtons(current.djId, current.djType, current.taskId, current.instanceId, '', 'cancel');
        // this.props.action.getUnfinished(pagination);
        // this.props.action.hideViewForm(false);
    }
    returnApproval = () => {
    const that=this
        Modal.confirm({
            // title: '你是否确认撤回？',
            // okText: '确定',
            // cancelText: '取消',
            // onCancel() {
            // },
            // onOk() {
            //    that.onReturnOk()
            // }
        });
    }
    onValChange = (val) => {
        // console.log(2222222, val)
    }
    onArrow = () => {
        this.setState({ flag: !this.state.flag })
    }
    goBack = () => {
        this.props.action.hideViewForm(false);
    }
    getContent = () => {
        let done = this.props.$$state.get("done").toJS();
        return (
            <div className="stepApproval">
                {done && done.length ? done.map((item, index) => {
                    return (
                        <div className="stepApprovalOne">
                            <div className="ApprovalOne">{index + 1}</div>
                            <div className="ApprovalPerson">
                                <div>
                                    {item.personlist[0].name}
                                    <span>
                                        {item ? item.time : ''}
                                    </span>
                                </div>
                                <div>{item.status}
                                    <span>
                                        {item ? item.comment : ''}
                                    </span>
                                </div>
                            </div>
                        </div>
                    )
                }) : null}
            </div>)
    }
    mapButtons = () => {
        debugger
        let buttons = this.props.$$state.get("approvalButtons").toJS().reverse();
        return (
            <div className="approval-buttons">
                {buttons && buttons.length ? buttons.map((item, index) => {
                    return (
                        <div>
                            <Button onClick={this.onClick.bind(this, item, index)}>
                                {item.name}
                            </Button>
                        </div>
                    )
                }) : null
                }
            </div>
        )
    }
    render() {
        let { mentionVisible, detailData, detailapproval, commit, done, todo, tableState, approvalButtons } = this.props.$$state.toJS();
        return (
            <div className="view-warrper">
                <Row className="view-warrper-detail">
                    <Row className="header-detail" >
                        <Col span={10}>
                            <Row type="flex" align="middle">
                                <Row type="flex" align="middle">
                                    单据详情
                                   </Row>
                            </Row>
                        </Col>
                        <Col span={14}>
                            <Row
                                type="flex"
                                align="middle"
                                justify="end"
                                gutter={15}
                            >
                                {tableState && tableState == '1' ? (
                                    <div className="head-buttom">
                                        {approvalButtons && approvalButtons.length ? (<div className="btnReturn" onClick={this.returnApproval}>
                                            <Button>
                                                撤回
</Button>
                                        </div>) : null}
                                        <div>
                                            <Button onClick={this.mention}>
                                                提醒
</Button>
                                        </div>
                                    </div>) : (
                                        <div className="head-buttom">
                                            {this.mapButtons()}

                                            {/* <div>
                                                <Button onClick={this.rejectLast}>
                                                   驳回上一级
                                       </Button>
                                           </div> */}
                                            {/* <div>
                                               <Button onClick={this.rejectPerson}>
                                                   驳回制单人
                                        </Button>
                                            </div> */}
                                            {/* <div>
                                               <Button onClick={this.agree}>
                                                    同意
 </Button>
                                             </div> */}
                                        </div>)}
                                <div onClick={this.goBack}>
                                    <Button >
                                        返回
                                 </Button>
                                </div>
                            </Row>
                        </Col>
                    </Row>
                    {/* 进度 */}
                    <Row className="view-state">
                        <Row>
                            <Col span={8}>
                                <Row
                                    type="flex"
                                    justify="center"
                                    className="info-title"
                                >
                                    <div className="detailList">
                                        <div className="detailStatus">
                                            提交
                                         </div>
                                        <div className="detailName">
                                            {commit && commit.personlist ? commit.personlist[0].name : ''}
                                        </div>
                                        <div className="detailName">
                                            {commit ? commit.time : ''}
                                        </div>
                                    </div>

                                </Row>
                            </Col>

                            {done.length ? <Col span={8}>
                                <Row
                                    type="flex"
                                    justify="center"
                                    className="info-title"
                                >

                                    <Popover placement="bottomLeft" content={this.getContent()} trigger="click">
                                        <div className="detailList">
                                            <div className="detailStatus">
                                                已审
                                              </div>
                                            <div className="detailName">
                                                {done.length && done[done.length - 1].personlist[0] ? done[done.length - 1].personlist[0].name : ''}
                                            </div>
                                            <div className="detailName">
                                                {done.length ? done[done.length - 1].time : ''}
                                            </div>
                                            {/* <div className="detailIcon"
                                            onClick={this.onArrow}
                                            >
                                            <i className="iconfont icon-touxiang-jiantou"></i>
                                            </div> */}
                                            <div className="detailIcon"
                                                onClick={this.onArrow}
                                            >
                                                <i className={this.state.flag ? "iconfont icon-touxiang-jiantou rouge" : "iconfont icon-touxiang-jiantou rouge1"}></i>
                                            </div>
                                            {/* <div onClick={this.onArrow}

                                                className={this.state.flag ? "arrow" : "arrow-top"}>
                                            </div> */}
                                            {/* <div> <i className="iconfont .icon-touxiang-jiantou"></i></div> */}
                                        </div>
                                    </Popover>
                                </Row>
                            </Col> : null}

                            <Col span={8}>
                                <Row
                                    type="flex"
                                    justify="center"
                                    className="info-title"
                                >
                                    <div className="detailList">
                                        <div className="detailStatus">
                                            待审
                                     </div>
                                        <div className="detailName">
                                            {todo.length ? todo[0].personlist[0].name : ''}
                                        </div>
                                        <div className="detailName">
                                            {todo.length ? todo[0].time : ''}
                                        </div>
                                    </div>
                                </Row>
                            </Col>
                        </Row>
                    </Row>
                    {/* --------------- */}
                    {/* 表单 */}
                    <Row className="form-input-recover">
                        <UnfinishForm />
                    </Row>
                    {/* ---------- */}
                </Row>
                <MentionModal
                    show={this.state.show}
                    onValChange={this.onValChange}
                />
            </div>
        );
    }
}

//绑定状态到组件props
function mapStateToProps(state, ownProps) {
    return {
        $$state: state.header
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
