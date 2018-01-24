import React, { Component, PropTypes } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import 'assets/stylesheet/all/iconfont.css';
import * as Actions from "../../action/approved.js";
import { Timeline, Modal } from "antd";

class StatusLine extends React.Component {

    hideModal = () => {
        debugger
        this.props.action.statusHide(false)
    }

    render() {
        let { lineState, historyStatus } = this.props.$$state.toJS();
        debugger
        return (
           
                <Modal title="审批情况"
                    visible={lineState}
                    // onOk={this.hideModal}
                    onCancel={this.hideModal}
                    footer={null}
                >
                 <div className="main-right-timeline timeline-recoverd">
                    <Timeline>
                        {historyStatus && historyStatus.length ? historyStatus.map((item) => {
                            return (
                                <Timeline.Item>
                                    <p>
                                        <span className="timeline-import">
                                            {item.personlist && item.personlist.length ?
                                                item.personlist.map(item => {
                                                    return (<span>
                                                        {item.name}
                                                    </span>)
                                                })
                                                : ''}
                                        </span>

                                        <span className="timeline-import">
                                            {item.status}
                                        </span>
                                        <span>
                                            {item.comment}
                                        </span>
                                    </p>
                                    <p className="timeline-time">
                                        {item.time}
                                    </p>

                                </Timeline.Item>
                            )
                        }) : null
                        }
                    </Timeline>
                    </div>
                </Modal>
           
        )
    }
}

function mapStateToProps(state, ownProps) {
    return {
        $$state: state.header
    }
}

function mapDispatchToProps(dispatch) {
    return {
        action: bindActionCreators(Actions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(StatusLine);