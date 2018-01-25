
import React, { Component, PropTypes } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Icon, Tabs, Row, Col, Table, Radio } from "antd";

import "./index.less";
import * as Actions from "../../action/approval.js";

class ApproveForm extends React.Component {
    constructor(props) {
        super(props);

        this.columnsTodo = [
            {
                "title": "序号",
                "dataIndex": "id"
            },
            {
                "title": "任务主题",
                "dataIndex": "name",
                render: (text, record) => (
                    <div className="table-color"
                        onClick={this.slideShow.bind(this, record)}
                    >
                        {record.name}
                    </div>
                )
            },
            {
                "title": "接收时间",
                "dataIndex": "createTime",
                render: (text, record) => (
                    <div
                    >
                        {record.createTime ? record.createTime : ''
                        }
                    </div>
                )
            },
            {
                "title": "停留时长",
                "dataIndex": "stayTimeLength"
            },
        ]

        this.columnsDone = [
            {
                "title": "序号",
                "dataIndex": "id"
            },
            {
                "title": "任务主题",
                "dataIndex": "name",
                render: (text, record) => (
                    <div className="table-color"
                        onClick={this.slideShow.bind(this, record)}
                    >
                        {record.name}
                    </div>
                )
            },
            {
                "title": "接收时间",
                "dataIndex": "createTime",
                render: (text, record) => (
                    <div
                    >
                        {record.createTime ? record.createTime : ''
                        }
                    </div>
                )
            },
            {
                "title": "停留时长",
                "dataIndex": "stayTimeLength"
            },
            {
                "title": "审批时间",
                "dataIndex": "completeTime",
                render: (text, record) => (
                    <div
                    >
                        {record.completeTime ? record.completeTime : ''
                        }
                    </div>
                )
            }
        ]
    }

    slideShow = (record) => {
        this.props.action.showViewForm(true, record.djId, record.djType, record.instanceId, record.taskId, record);
    }
    //分页方法
    showTotal1(total) {
        return `共 ${total} 条`;
    }
    onPageChange1(page, pageSize) {

        let pagination = { page: page, pageSize: pageSize };
        this.props.action.getTodo(
            pagination,
            this.props.$$state.get("searchMapApproval").toJS()
        );
    }
    onPageSizeChange1(current, pageSize) {

        let pagination = { page: current, pageSize: pageSize };
        this.props.action.getTodo(
            pagination,
            this.props.$$state.get("searchMapApproval").toJS()
        );
    }

    // -----------
    showTotal2(total) {
        return `共 ${total} 条`;
    }
    onPageChange2(page, pageSize) {
        let pagination = { page: page, pageSize: pageSize };
        this.props.action.getDone(
            pagination,
            this.props.$$state.get("searchMapApproval").toJS()
        );
    }
    onPageSizeChange2(current, pageSize) {
        let pagination = { page: current, pageSize: pageSize };
        this.props.action.getDone(
            pagination,
            this.props.$$state.get("searchMapApproval").toJS()
        );
    }
    render() {

        let { finishState, searchMapApproval, approveData } = this.props.$$state.toJS();
        let { $$state, action } = this.props;
        let searchState = $$state.get('searchState');
        return (
            <div className="approveForm">
                {searchMapApproval.status && searchMapApproval.status == 'done' ?
                    <Table
                        size="middle"
                        columns={this.columnsDone}
                        dataSource={approveData.data}
                        rowKey="id"
                        pagination={{
                            size: "large",
                            showSizeChanger: true,
                            showQuickJumper: true,
                            total: approveData.total,
                            showTotal: this.showTotal1,
                            onChange: this.onPageChange2.bind(this),
                            onShowSizeChange: this.onPageSizeChange2.bind(
                                this
                            )
                        }}
                    /> :
                    <Table
                        size="middle"
                        columns={this.columnsTodo}
                        dataSource={approveData.data}
                        rowKey="id"
                        pagination={{
                            size: "large",
                            showSizeChanger: true,
                            showQuickJumper: true,
                            total: approveData.total,
                            showTotal: this.showTotal1,
                            onChange: this.onPageChange1.bind(this),
                            onShowSizeChange: this.onPageSizeChange1.bind(
                                this
                            )
                        }}
                    />}
            </div>
        );
    }
}


function mapStateToProps(state, ownProps) {
    return {
        $$state: state.approval
    }
}

function mapDispatchToProps(dispatch) {
    return {
        action: bindActionCreators(Actions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ApproveForm);


