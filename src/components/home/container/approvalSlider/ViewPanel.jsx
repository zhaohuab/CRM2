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
    Divider,
    Tooltip
} from "antd";
import { browserHistory } from "react-router";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
//导入action方法
import * as Actions from "../../action/approval.js";

import DetailForm from './DetailForm';
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
        }
    }
    mention = () => {
        const that = this
        Modal.success({
            title: '提醒审批成功',
            okText: '确定',
            onOk() {
                that.onMention()
            }
        });
    }
    onMention = () => {
        let current = this.props.$$state.get('currentRecord').toJS();
        this.props.action.onRemind(current.approvalUserList, current.djId, current.djType)
    }
    onClick = (item) => {
        debugger
        if (item.action == 'agree') {
            // this.setState({
            //     show: true
            // }, () => {
            //     this.props.action.mentionVisible(true, 'agree')
            // })
            this.props.action.mentionVisible(true, 'agree')
            this.props.action.titleFlag(true)
        }
        if (item.action == 'reject') {
            this.props.action.mentionVisible(true, 'reject')
        }
        if (item.action == 'rejectall') {
            this.props.action.mentionVisible(true, 'rejectall')
        }
    }
    //撤回按钮
    onReturnOk = () => {
        let current = this.props.$$state.get('currentRecord').toJS();
        this.props.action.allButtons(current.djId, current.djType, current.taskId, current.instanceId, '', 'cancel');
        setTimeout(() => {
            this.props.action.getUnfinished(this.props.$$state.get("pagination").toJS());
        }, 1000)
        this.props.action.hideViewForm(false);
    }
    returnApproval = () => {
        const that = this
        Modal.confirm({
            title: '你是否确认撤回？',
            okText: '确定',
            cancelText: '取消',
            onCancel() {
            },
            onOk() {
                that.onReturnOk()
            }
        });
    }
    onValChange = (val) => {
        // console.log(2222222, val)
    }
    onArrow = () => {
        this.setState({ flag: !this.state.flag })
    }
    goBack = () => {
        this.props.action.hideHomeViewForm(false);
    }
    getContent = () => {
        let done = this.props.$$state.get("done").toJS();
        return (
            <div className="stepApproval">
                {done && done.length ? done.map((item, index) => {
                    return (
                        <div className="stepApprovalOne">
                            <div className="approvalOne">{index + 1}</div>
                            <div className="approvalPerson">
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
        let buttons = this.props.$$state.get("approvalHomeButtons").toJS().reverse();
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

        let { approvalHomeVisible, mentionVisible, detailData, detailapproval, commit, done, todo, tableState, approvalHomeButtons } = this.props.$$state.toJS();

        const text =
            todo.length && todo[0].personlist && todo[0].personlist.length ?
                todo[0].personlist.map((item, index) => {
                    return (
                        <span style={{ marginRight: "5px" }}>
                            {item.name}
                        </span>
                    )
                }) : null

        return (
            <div className="view-warrper-homeApproval" >
                <Row className="view-warrper-detail-homeApproval">
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
                                {approvalHomeVisible ? (
                                    <div className="head-buttom">
                                        {approvalHomeButtons && approvalHomeButtons.length ? (<div className="btnReturn" onClick={this.returnApproval}>
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
                                    <Popover
                                        className="approval-bubble"
                                        placement="bottomLeft" content={this.getContent()} trigger="click">
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

                                            <div className="arrows"
                                                onClick={this.onArrow}>
                                                {this.state.flag ? <div className="arrow"></div> :
                                                    <div className="arrow-top"></div>}
                                            </div>
                                        </div>
                                    </Popover>
                                </Row>
                            </Col> : null}
                            {todo.length ?
                                <Col span={8}>
                                    <Row
                                        type="flex"
                                        justify="center"
                                        className="info-title"
                                    >


                                        <Tooltip placement="bottom" title={text}>
                                            <div className="detailList">
                                                <div className="detailStatus">
                                                    待审
                                        </div>
                                                {/* <div className="detailName">
                                            {todo.length ? todo[0].personlist[0].name : ''}
                                        </div>
                                        <div className="detailName">
                                            {todo.length ? todo[0].time : ''}
                                        </div> */}

                                                {todo.length && todo[0].personlist && todo[0].personlist.length > 3 ?
                                                    todo[0].personlist.slice(0, 3).map((item, index) => {
                                                        return (
                                                            <div className="detailName">
                                                                {item.name}
                                                            </div>
                                                        )

                                                    })
                                                    :
                                                    todo.length && todo[0].personlist && todo[0].personlist.length <= 3 ?
                                                        todo[0].personlist.map((item, index) => {
                                                            return (
                                                                <div className="detailName">
                                                                    {item.name}
                                                                </div>
                                                            )
                                                        }) : null}

                                                {todo.length && todo[0].personlist && todo[0].personlist.length > 3 ? '...' : null}

                                            </div>
                                        </Tooltip>
                                    </Row>
                                </Col> : null}
                        </Row>
                    </Row>
                    {/* --------------- */}
                    {/* 表单 */}
                    <Row className="form-input-recover">
                        <DetailForm />
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
        $$state: state.approval
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
