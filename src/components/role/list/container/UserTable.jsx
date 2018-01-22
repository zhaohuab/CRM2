import React, { Component } from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Table, Icon, Button, Form, Input, Checkbox, Row, Col, DatePicker, message, Modal, Spin, Tree, Card, Collapse, Radio } from 'antd';
const Panel = Collapse.Panel;
import * as roleActions from "../action"
const TreeNode = Tree.TreeNode;
const Search = Input.Search;
const confirm = Modal.confirm;
import './index.less';
import UserCardTable from "./UserCardTable"


class UserTable extends Component {
    constructor(props) {
        super(props)
        this.columns = [
            {
                title: "用户",
                dataIndex: "name",

            },
            {
                title: "性别",
                dataIndex: "customerName"
            },
            {
                title: "所属公司",
                dataIndex: "orgName"
            },
            {
                title: "所属部门",
                dataIndex: "saleStageName"
            },
            {
                title: "手机",
                dataIndex: "mobile"
            },
            {
                title: "邮箱",
                dataIndex: "email"
            }
        ]

        const that = this;
        this.onSelectChange = (selectedRowKeys, selectedRows) => {
            this.props.action.selectUserRow(selectedRows, selectedRowKeys);
        };
    }

    //点击添加按钮
    onAddUser() {
        const selectedRoleId = this.props.$$state.get("selectedRoleId");
        const userCardPagination = this.props.$$state.get("userCardPagination").toJS();
        this.props.action.showUserCard(selectedRoleId, userCardPagination);
    }


    //点击人员删除按钮
    onDeleteUser() {
        const selectedRoleId = this.props.$$state.get("selectedRoleId");
        const selectedUserRowKeys = this.props.$$state.get("selectedUserRowKeys").toJS();
        const userPagination = this.props.$$state.get("userPagination").toJS();
        this.props.action.deleteUser(selectedRoleId, selectedUserRowKeys, userPagination);
    }

    //点击保存按钮
    onSaveUser() {
        const selectedRoleId = this.props.$$state.get("selectedRoleId");
        const selectedUserCardRowKeys = this.props.$$state.get("selectedUserCardRowKeys").toJS();
        const userCardPagination = this.props.$$state.get("userCardPagination").toJS();
        this.props.action.saveUser(selectedRoleId, selectedUserCardRowKeys, userCardPagination);
        this.props.action.closeUserCard();
    }

    onCloseUserCard() {
        this.props.action.closeUserCard();
    }

    showTotal(total) {
        return `共 ${total} 条`;
    }

    onPageChange(page, pageSize) {
        let selectedRoleId = this.props.$$state.get("selectedRoleId")
        let pagination = this.props.$$state.get("userPagination").toJS()
        //可能有问题
        pagination = { page: page, pageSize: pageSize };
        this.props.action.getUserListData(selectedRoleId, pagination);
    }
    onPageSizeChange(current, pageSize) {
        let selectedRoleId = this.props.$$state.get("selectedRoleId")
        let pagination = this.props.$$state.get("userPagination").toJS()
        pagination = { page: pagination.page, pageSize: pageSize };
        this.props.action.getUserListData(selectedRoleId, pagination);
    }
    render() {
        const { $$state } = this.props;
        const page = $$state.get("userList").toJS();

        let selectedUserRowKeys = $$state.get("selectedUserRowKeys").toJS();
        let selectedUserRows = $$state.get("selectedUserRows").toJS();
        let userCardVisible = $$state.get("userCardVisible");
        let rowSelection = {
            selectedUserRowKeys,
            onChange: this.onSelectChange
        };
        debugger
        return (
            <div>
                <Row type="flex" align="center" justify="end" className="userpanel-buttonline">
                    <Col span={4}>
                        <Button onClick={this.onAddUser.bind(this)} className="returnbtn-class"><i className="iconfont icon-xinjian" />添加</Button>
                    </Col>
                    <Col span={4}>
                        {selectedUserRows.length > 0 ?
                            <Button onClick={this.onDeleteUser.bind(this)} className="returnbtn-class"><i className="iconfont icon-shanchu" />移除</Button>
                            :
                            <Button disabled className="returnbtn-class"><i className="iconfont icon-shanchu" />移除</Button>
                        }
                    </Col>
                </Row>
                <Row>
                    <div className="tabel-recoverd">
                        <Table
                            size="middle"
                            columns={this.columns}
                            rowKey="id"
                            pagination={false}
                            dataSource={page.data}
                            rowSelection={rowSelection}
                            pagination={{ size: "large", showSizeChanger: true, showQuickJumper: true, total: page.total, showTotal: this.showTotal, onChange: this.onPageChange.bind(this), onShowSizeChange: this.onPageSizeChange.bind(this) }}

                        />
                    </div>
                </Row>
                <Modal
                    title="添加人员"
                    visible={userCardVisible}
                    onOk={this.onSaveUser.bind(this)}
                    onCancel={this.onCloseUserCard.bind(this)}
                    width={500}
                >
                    <div className="tabel-recoverd">

                        <UserCardTable />
                    </div>
                </Modal>
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
export default connect(mapStateToProps, mapDispatchToProps)(UserTable);
