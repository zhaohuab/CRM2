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
                dataIndex: "genderName"
            },
            {
                title: "所属公司",
                dataIndex: "orgName"
            },
            {
                title: "所属部门",
                dataIndex: "deptName"
            },
            {
                title: "手机",
                dataIndex: "phone"
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
    onAddUser(name) {
        const selectedRoleId = this.props.$$state.get("selectedRoleId");
        this.props.action.showUserCard(selectedRoleId, name);
    }




    //点击人员删除按钮
    onDeleteUser() {
        const selectedRoleId = this.props.$$state.get("selectedRoleId");
        const selectedUserRowKeys = this.props.$$state.get("selectedUserRowKeys").toJS();
        const userPagination = this.props.$$state.get("userPagination").toJS();
        this.props.action.deleteUser(selectedRoleId, selectedUserRowKeys, userPagination);
    }

    //存储添加用户页面的查询条件
    saveUserCardName(e) {
        this.props.action.saveUserCardName(e.target.value)
    }

    //点击查询按钮
    onSearchUser(name) {
        //  const name = this.props.$$state.get("userCardName");
        const selectedRoleId = this.props.$$state.get("selectedRoleId");
        this.props.action.showUserCard(selectedRoleId, name);
    }

    //点击保存按钮
    onSaveUser() {
        const selectedRoleId = this.props.$$state.get("selectedRoleId");
        const selectedUserCardRowKeys = this.props.$$state.get("selectedUserCardRowKeys").toJS();
        if (selectedUserCardRowKeys.length == 0) {
            message.error('至少选择一条数据')
            return
        }
        const userPagination = this.props.$$state.get("userPagination").toJS();
        this.props.action.saveUser(selectedRoleId, selectedUserCardRowKeys, userPagination);
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
        let selectedRoleIsPreseted = this.props.$$state.get("selectedRoleIsPreseted")
        let pagination = this.props.$$state.get("userPagination").toJS()
        //可能有问题
        pagination = { page: page, pageSize: pageSize };
        this.props.action.getUserListData(selectedRoleId, pagination, selectedRoleIsPreseted);
    }
    onPageSizeChange(current, pageSize) {
        let selectedRoleId = this.props.$$state.get("selectedRoleId")
        let selectedRoleIsPreseted = this.props.$$state.get("selectedRoleIsPreseted")
        let pagination = this.props.$$state.get("userPagination").toJS()
        pagination = { page: pagination.page, pageSize: pageSize };
        this.props.action.getUserListData(selectedRoleId, pagination, selectedRoleIsPreseted);
    }
    render() {
        const { $$state } = this.props;
        const page = $$state.get("userList").toJS();
        let name = $$state.get("userCardName");
        let selectedUserRowKeys = $$state.get("selectedUserRowKeys").toJS();
        let selectedUserRows = $$state.get("selectedUserRows").toJS();
        let userCardVisible = $$state.get("userCardVisible");
        let rowSelection = {
            selectedRowKeys:selectedUserRowKeys,
            onChange: this.onSelectChange
        };
        let userLoading = this.props.$$state.get("userLoading");
        return (
            <div>
                <Row type="flex" align="center" justify="end" className="userpanel-buttonline">
                    <Col span={4}>
                        <Button onClick={this.onAddUser.bind(this, "")} className="returnbtn-class"><i className="iconfont icon-xinjian" />添加</Button>
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
                        loading={userLoading}
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
                    title={
                        <Row>
                            <Col span={12}>
                                人员
                            </Col>
                            <Col span={12}>
                                <Search
                                    placeholder="请输入关键字"
                                    value={name}
                                    onChange={this.saveUserCardName.bind(this)}
                                    onSearch={this.onSearchUser.bind(this)}
                                    style={{ width: 250 }}
                                />
                            </Col>
                        </Row>
                    }
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
