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
                width: '33%',

            },
            {
                title: "部门",
                dataIndex: "deptName",
                width: '33%',
            },
            {
                title: "组织",
                dataIndex: "orgName",
                width: '33%',
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
        let searchMap={}
        if(userCardName&&userCardName!==""){
            searchMap.name=userCardName;
        }
        let {
            assignPagination
          } = this.props.$$state.toJS();
        this.props.action.assignListData(
            // assignPagination,
            searchMap);
    }


    //分页方法
    showTotal(total) {
        return `共 ${total} 条`;
    }
    onPageChange(page, pageSize) {
        debugger
        let  assignPagination = { page: page, pageSize: pageSize };
        this.props.action.assignListData(
            assignPagination
            //this.props.$$state.get("searchMap").toJS()
        );
    }
    onPageSizeChange(current, pageSize) {
        debugger
        let  assignPagination = { page: current, pageSize: pageSize };
        this.props.action.assignListData(
            assignPagination,
           // this.props.$$state.get("searchMap").toJS()
        );
    }

    //点击保存按钮
    onSaveUser() {
       debugger
        const ids = this.props.$$state.get("selectedRowKeys").toJS();
        let selected = this.props.$$state.get("selectedUserRows").toJS();

        if (selected.length == 0) {
            message.error('至少选择一条数据')
            return
        }
        
        // const userPagination = this.props.$$state.get("userPagination").toJS();
         this.props.action.assignPeople(this.props.$$state.get("pagination").toJS(),ids, selected);
         this.props.action.closeUserCard();
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

                    <div className="tabel-recoverd assign-table">
                        <Table
                            size="middle"
                            columns={this.columns}
                            rowKey="id"
                            dataSource={page.data}
                            rowSelection={rowSelection}
                            pagination={{
                                size: "small",
                                total: page.total,
                                showTotal: this.showTotal,
                                onChange: this.onPageChange.bind(this),
                                pageSize: 5,
                                current: page.page
                            }}
                            //  scroll={{ y: 400 }}
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
