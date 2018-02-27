import React, { Component } from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Table, Icon, Button, Form, Input, Checkbox, Row, Col, DatePicker, message, Modal, Spin, Tree, Card, Collapse, Radio } from 'antd';
const Panel = Collapse.Panel;
import * as Actions from "../action"
const TreeNode = Tree.TreeNode;
const Search = Input.Search;
const confirm = Modal.confirm;
import './index.less';



class UserTable extends Component {
    constructor(props) {
        super(props)
        this.columns = [
            {
                title: "人员",
                dataIndex: "name",

            },
            {
                title: "部门",
                dataIndex: "deptName"
            },
            {
                title: "组织",
                dataIndex: "orgName"
            },

        ]

        const that = this;
        this.onSelectChange = (selectedRowKeys, selectedRows) => {
            debugger
            this.props.action.selectUserRow(selectedRows, selectedRowKeys);
        };
    }

    //存储添加用户页面的查询条件
    saveUserCardName(e) {
        debugger
        this.props.action.saveUserCardName(e.target.value)
    }

    //点击查询按钮
    onSearchUser(userCardName) {
        // debugger
        let {
            assignPagination
          } = this.props.$$state.toJS();
        this.props.action.assignListData(
            assignPagination,
            userCardName);
    }

    //点击保存按钮
    onSaveUser() {
        debugger
        const ids = this.props.$$state.get("selectedRowKeys").toJS();
        let selectedUserRows = this.props.$$state.get("selectedUserRows").toJS();
        if (selectedUserRowKeys.length == 0) {
            message.error('至少选择一条数据')
            return
        }
        // const userPagination = this.props.$$state.get("userPagination").toJS();
         this.props.action.assignPeople(ids, selectedUserRows);
        // this.props.action.closeUserCard();
    }

    onCloseUserCard() {
        this.props.action.closeUserCard();
    }

    render() {
        debugger
        const { $$state } = this.props;
        const page = $$state.get("assignData").toJS();

        let {
          userCardName, selectedUserRowKeys, selectedUserRows, assginCardVisible
        } = this.props.$$state.toJS();
        let rowSelection = {
            type: 'radio',
            selectedRowKeys: selectedUserRowKeys,
            onChange: this.onSelectChange
        };

        return (
            <div>
                <Modal
                    title={
                        <Row>
                            <Col span={12}>
                                线索分配
                            </Col>
                            <Col span={12}>
                                <Input
                                    placeholder="请输入关键字"
                                    enterButton
                                    value={userCardName}
                                    onChange={this.saveUserCardName.bind(this)}
                                    style={{ width: 260 }}
                                    addonAfter={<Icon type="search" onClick={this.onSearchUser.bind(this, userCardName)} />}
                                />
                            </Col>
                        </Row>
                    }
                    visible={assginCardVisible}
                    onOk={this.onSaveUser.bind(this)}
                    onCancel={this.onCloseUserCard.bind(this)}
                    width={500}
                >

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
                </Modal>
            </div>
        )
    }
}

//绑定状态到组件props
function mapStateToProps(state, ownProps) {
    return {
        $$state: state.lead
    }
}

//绑定action到组件props
function mapDispatchToProps(dispatch) {
    return {
        action: bindActionCreators(Actions, dispatch)
    }
}

//输出绑定state和action后组件
export default connect(mapStateToProps, mapDispatchToProps)(UserTable);
