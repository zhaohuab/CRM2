import React, { Component } from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Table, Icon, Button, Form, Input, Checkbox, Row, Col, DatePicker, message, Modal, Spin, Tree, Card, Collapse, Radio } from 'antd';
const Panel = Collapse.Panel;
import * as roleActions from "../action"
const TreeNode = Tree.TreeNode;
const Search = Input.Search;
const confirm = Modal.confirm;
import './index.less'


class UserCardTable extends Component {
    constructor(props) {
        super(props)
        this.columns = [
            {
                title: "名称",
                dataIndex: "name",
            },
            {
                title: "公司",
                dataIndex: "orgName"
            },
            {
                title: "部门",
                dataIndex: "deptName"
            },
        ]
        const that = this;
        this.onSelectChange = (selectedRowKeys, selectedRows) => {
            this.props.action.selectUserCardRow(selectedRows, selectedRowKeys);
        };
    }


    render() {
        const { $$state } = this.props;
        const page = $$state.get("userCardList").toJS();
        let selectedUserCardRowKeys = $$state.get("selectedUserCardRowKeys").toJS();
        let selectedUserCardRows = $$state.get("selectedUserCardRows").toJS();
        debugger
        let userCardVisible = $$state.get("userCardVisible");
        let rowSelection = {
            selectedRowKeys:selectedUserCardRowKeys,
            onChange: this.onSelectChange
        };
        return (

            <div className="tabel-recoverd">
                <Table
                    size="middle"
                    columns={this.columns}
                    rowKey="id"
                    dataSource={page.data}
                    rowSelection={rowSelection}
                    pagination={false}
                    scroll={{ y: 400 }}
                />
            </div>

        )
    }
}

//绑定状态到组件props
function mapStateToProps(state, ownProps) {
    return {
        $$state: state.roleList
    }
}

//绑定action到组件props
function mapDispatchToProps(dispatch) {
    return {
        action: bindActionCreators(roleActions, dispatch)
    }
}

//输出绑定state和action后组件
export default connect(mapStateToProps, mapDispatchToProps)(UserCardTable);
