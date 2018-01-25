
import React, { Component, PropTypes } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Icon, Tabs, Row, Col, Table, Radio } from "antd";

import "./index.less";
import * as Actions from "../../action/approved.js";

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
                render:(text, record) => (
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
        debugger
        this.props.action.showViewForm(true, record.djId, record.djType,record.instanceId,record.taskId,record);
    }

    render() {
        debugger
        let { finishState, searchMapApproval, approveData } = this.props.$$state.toJS();
        let page = approveData.data
        let { $$state, action } = this.props;
        let searchState = $$state.get('searchState');
        return (
            <div className="approveForm">
             {searchMapApproval.status && searchMapApproval.status == 'done' ?
                <Table
                    size="middle"
                    columns={this.columnsDone}
                    dataSource={page}
                    rowKey="id"
                // pagination={{
                //     size: "large",
                //     showSizeChanger: true,
                //     showQuickJumper: true,
                //     total: 20,
                //     showTotal: this.showTotal,
                //     onChange: this.onPageChange.bind(this),
                //     onShowSizeChange: this.onPageSizeChange.bind(this)
                // }}
                />:
                <Table
                    size="middle"
                    columns={this.columnsTodo}
                    dataSource={page}
                    rowKey="id"
                // pagination={{
                //     size: "large",
                //     showSizeChanger: true,
                //     showQuickJumper: true,
                //     total: 20,
                //     showTotal: this.showTotal,
                //     onChange: this.onPageChange.bind(this),
                //     onShowSizeChange: this.onPageSizeChange.bind(this)
                // }}
                />}
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

export default connect(mapStateToProps, mapDispatchToProps)(ApproveForm);


