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
                title: "用户",
                dataIndex: "name",
           
            },
         
            {
                title: "所属公司",
                dataIndex: "orgName"
            },
            {
                title: "所属部门",
                dataIndex: "saleStageName"
            },
      
        ]

        const that = this;
        this.onSelectChange = (selectedRowKeys, selectedRows) => {
            this.props.action.selectUserCardRow(selectedRows, selectedRowKeys);
        };
    }

    showTotal(total) {
        return `共 ${total} 条`;
    }

    onPageChange(page, pageSize) {
        let selectedRoleId = this.props.$$state.get("selectedRoleId")
        let pagination = this.props.$$state.get("userCardPagination").toJS()
        //可能有问题
        pagination = { page: page, pageSize: pageSize };
        this.props.action.showUserCard(selectedRoleId,pagination);
    }
    onPageSizeChange(current, pageSize) {
        let selectedRoleId = this.props.$$state.get("selectedRoleId")
        let pagination = this.props.$$state.get("userCardPagination").toJS()
        pagination = { page: pagination.page, pageSize: pageSize };
        this.props.action.showUserCard(selectedRoleId,pagination);
    }
    render() {
        const { $$state } = this.props;
        const page = $$state.get("userCardList").toJS();
        debugger
        let selectedUserCardRowKeys = $$state.get("selectedUserCardRowKeys").toJS();
        let selectedUserCardRows = $$state.get("selectedUserCardRows").toJS();
        let userCardVisible = $$state.get("userCardVisible");
        let rowSelection = {
            selectedUserCardRowKeys,
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
                        pagination={{ size: "large", showSizeChanger: true, showQuickJumper: true, total: page.total, showTotal: this.showTotal, onChange: this.onPageChange.bind(this), onShowSizeChange: this.onPageSizeChange.bind(this) }}

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
