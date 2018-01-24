
import React, { Component, PropTypes } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Icon, Tabs, Row, Col, Table, Radio } from "antd";
import { phonebooks as url } from "api";
import "./index.less";
import * as Actions from "../../action/approved.js";

import StatusLine from './StatusLine.jsx'
import { linearMap } from "echarts/lib/util/number";
class Department extends React.Component {
    constructor(props) {
        super(props);
       
        this.columnsUnfinished = [
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
                "title": "待审人",
                "dataIndex": "approvalUserList",
                render: (text, record) => (
                    <div
                    >
                        {record.approvalUserList.length ? record.approvalUserList[0].name : ''
                        }
                    </div>
                )
            },
            {
                "title": "停留时长",
                "dataIndex": "stayTimeLength"
            },
            {
                "title": "审核状态",
                "dataIndex": "statusName",
                render: (text, record) => (
                    <div className="table-color"
                        onClick={this.statusShow.bind(this, record)}
                    >
                        {record.statusName}
                    </div>
                )
            },
            {
                "title": "操作",
                "dataIndex": "operate",
                render: (text, record) => (
                    <div className="crm-pointer">{record.operate}</div>
                )
            },
        ]

        this.columnsFinished = [
            {
                "title": "序号",
                "dataIndex": "id",
                render: (text, record) => (
                    <div
                    >
                        {record.id ? record.id : ''
                        }
                    </div>
                )
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
                "title": "最后审批人",
                "dataIndex": "approvalUserList",
                render: (text, record) => (
                    <div
                    >
                        {record.approvalUserList.length ? record.approvalUserList[0].name : ''
                        }
                    </div>
                )
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
            },
            {
                "title": "审核历史",
                "dataIndex": "statusName",
                render: (text, record) => (
                    <div className="table-color"
                        onClick={this.statusShow.bind(this, record)}
                    >
                        {record.statusName}
                    </div>
                )
            }
        ]
    }

    slideShow = (record) => {
        this.props.action.showViewForm(true, record.djId, record.djType,record.instanceId,record.taskId,record);
    }

    statusShow = (record) => {
        this.props.action.statusShow(true,record.djId, record.djType)
    }
    //分页方法
    showTotal1(total) {
        return `共 ${total} 条`;
    }
    onPageChange1(page, pageSize) {
        debugger
        let pagination = { page: page, pageSize: pageSize };
        this.props.action.getFinished(
            pagination,
            this.props.$$state.get("searchMap").toJS()
        );
    }
    onPageSizeChange1(current, pageSize) {
        debugger
        let pagination = { page: current, pageSize: pageSize };
        this.props.action.getFinished(
            pagination,
            this.props.$$state.get("searchMap").toJS()
        );
    }

   // -----------
    showTotal2(total) {
        return `共 ${total} 条`;
    }
    onPageChange2(page, pageSize) {
        let pagination = { page: page, pageSize: pageSize };
        this.props.action.getUnfinished(
            pagination,
            this.props.$$state.get("searchMap").toJS()
        );
    }
    onPageSizeChange2(current, pageSize) {
        let pagination = { page: current, pageSize: pageSize };
        this.props.action.getUnfinished(
            pagination,
            this.props.$$state.get("searchMap").toJS()
        );
    }
    render() {
        debugger
        let { finishState, searchMap, unfinishedData, finishedData, data } = this.props.$$state.toJS();
        let page = data.data;

        // let finish = finishedData.data;
        // let unfinishe = unfinishedData.data;
        let { $$state, action } = this.props;
        let searchState = $$state.get('searchState');
        // let dataSource = $$state.get('dataSource').toJS();
        // let myState = $$state.get("myState");
        return (
            <div>
                {searchMap.status && searchMap.status == 'finish' ?
                    <Table
                        size="middle"
                        //columns={searchMap.status && searchMap.status == 'i' ? this.columnsFinished : this.columnsUnfinished}
                        columns={this.columnsFinished}
                        // dataSource={page}
                        dataSource={ finishedData.data}
                        rowKey="id"
                        pagination={{
                            size: "large",
                            showSizeChanger: true,
                            showQuickJumper: true,
                            total: finishedData.total,
                            showTotal: this.showTotal1,
                            onChange: this.onPageChange1.bind(this),
                            onShowSizeChange: this.onPageSizeChange1.bind(
                                this
                            )
                        }}
                    /> :

                    <Table
                        size="middle"
                        //columns={searchMap.status && searchMap.status == 'i' ? this.columnsFinished : this.columnsUnfinished}
                        columns={this.columnsUnfinished}
                        //dataSource={page}
                        dataSource={unfinishedData.data}
                        rowKey="id"
                        pagination={{
                            size: "large",
                            showSizeChanger: true,
                            showQuickJumper: true,
                            total: unfinishedData.total,
                            showTotal: this.showTotal2,
                            onChange: this.onPageChange2.bind(this),
                            onShowSizeChange: this.onPageSizeChange2.bind(
                                this
                            )
                        }}
                    />
                }
            </div>
        );
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

export default connect(mapStateToProps, mapDispatchToProps)(Department);


