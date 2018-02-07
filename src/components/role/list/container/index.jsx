
import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Tabs, Table, Icon, Button, Form, Input, Checkbox, Row, Col, Modal, Spin, message, Popover } from 'antd';
import HeaderButton from "../../../common/headerButtons/headerButtons.jsx";
import * as roleActions from "../action"
import RoleCard from "./RoleCard"
import FuncTree from "./FuncTree"
import UserTable from "./UserTable"
import RightPanel from "./RightPanel"
import SearchForm from './SearchForm'
import "./index.less";
import "assets/stylesheet/all/iconfont.css";


const confirm = Modal.confirm;
const TabPane = Tabs.TabPane;
class List extends React.Component {

    constructor(props) {
        super(props)
        this.columns = [{
            title: '角色名称',
            dataIndex: 'name',
            width: '20%',
            render: (text, row, index) => {
                return <a onClick={this.onNameClick.bind(this, row)}>
                    {text}
                </a>

            },
        }, {
            title: '角色描述',
            dataIndex: 'description',
            width: '40%',
            render: (text, row, index) => {
                return <Popover content={text} trigger="hover">
                    <div className="role-table-description">{text} </div>
                </Popover>
            },
        }, {
            title: '所属组织',
            dataIndex: 'orgName',
            width: '20%'
        }, {
            title: '角色类型',
            dataIndex: 'typeName',
            width: '20%'
        }]

    }


    componentWillMount() {
      //页面初始化前重置数据
      this.props.action.resetState();
    }

    componentDidMount() {
        this.props.action.getRoleListData({});
        this.props.action.getEnumData();
    }

    //点击角色名称
    onNameClick = (row) => {
        const tabIndex = this.props.$$state.get("tabIndex");
        if (tabIndex == 1) {
            this.props.action.getFuncTreeData(row.id, row.isPreseted);
        } else if (tabIndex == 2) {
            this.props.action.getRightData(row.id, row.isPreseted);
        } else if (tabIndex == 3) {
            const userPagination = this.props.$$state.get("userPagination").toJS();
            this.props.action.getUserListData(row.id, userPagination, row.isPreseted);
        }
    }
    //点击新增按钮事件
    onAdd() {
        this.props.action.showRoleForm(true, {}, false);
    }
    //点击删除按钮事件
    onDelete = (row) => {
        if (row.isPreseted == 1) {
            message.error("预制角色不允许删除");
            return;
        }
        let that = this
        confirm({
            title: '确定要删除吗?',
            content: '此操作不可逆',
            okText: '确定',
            // okType: 'danger',
            cancelText: '取消',
            onOk() {
                that.props.action.onDelete(row.id);
            },
            onCancel() {
                console.log('Cancel');
            },
        });
    }
    //点击编辑按钮事件
    onEdit = (row) => {
        if (row.isPreseted == 1) {
            message.error("预制角色不允许编辑")
            return
        }
        this.props.action.showRoleForm(true, row, true);
    }
    //保存事件
    onSave() {
        let form = this.formRef.props.form;
        form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
                let isEdit = this.props.$$state.get("isEdit");
                if (isEdit) {
                    this.props.action.onSaveRole4Edit(values);
                }
                else {
                    this.props.action.onSaveRole4Add(values);
                }
            }
        });

    }
    //form表单关闭按钮事件
    onClose() {
        this.props.action.showRoleForm(false, {});
    }

    onSelectChange = (selectedRowKeys, selectedRows) => {
        this.props.action.selectRow(selectedRows, selectedRowKeys);
    }
    btnBack = () => {
        this.props.action.selectRow([], []);
    }
    onTabClick = (tabIndex) => {
        this.props.action.onTabClick(tabIndex);
        const selectedRoleId = this.props.$$state.get("selectedRoleId");
        const selectedRoleIsPreseted = this.props.$$state.get("selectedRoleIsPreseted");
        if (tabIndex == 1) {
            this.props.action.getFuncTreeData(selectedRoleId, selectedRoleIsPreseted);
        } else if (tabIndex == 2) {
            this.props.action.getRightData(selectedRoleId, selectedRoleIsPreseted);
        } else if (tabIndex == 3) {
            const userPagination = this.props.$$state.get("userPagination").toJS();
            this.props.action.getUserListData(selectedRoleId, userPagination, selectedRoleIsPreseted);
        }
    }

    getRowClassName = (aaa, record, index) => {
        if (record.id == aaa) {
            return "row_high_light"
        }
        return aaa;
    }

    onDispatch = () => {
        let tabIndex = this.props.$$state.get("tabIndex");
        console.info(tabIndex);
    }
    render() {
        let { $$state } = this.props;
        let roleCardVisible = $$state.get("roleCardVisible");
        let selectedRoleId = $$state.get("selectedRoleId");
        let isEdit = this.props.$$state.get("isEdit");
        let WarpRoleCard = Form.create()(RoleCard)
        let page = $$state.get("data").toJS();
        let funcData = $$state.get("funcData").toJS();
        debugger
        //如果没有选中的条数，则选中第一条
        if (page != null && page.data != null && page.data.length > 0 && selectedRoleId == undefined) {
            this.onNameClick(page.data[0]);
        }
        let editData = $$state.get("editData").toJS();
        let selectedRowKeys = $$state.get("selectedRowKeys").toJS();
        let selectedRows = $$state.get("selectedRows").toJS();
        let rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange
        };
        let operations = <Button onClick={this.onDispatch.bind(this)}>分配</Button>
        const tabIndex = this.props.$$state.get("tabIndex");
        const roleLoading = this.props.$$state.get("roleLoading");
        const roleCardLoading = this.props.$$state.get("roleCardLoading");
        const funcLoading = this.props.$$state.get("funcLoading");
        const rightLoading = this.props.$$state.get("rightLoading");
        const userLoading = this.props.$$state.get("userLoading");
        return (
            <div className="role-container">
                <div className='list-warpper'>
                    {selectedRowKeys && selectedRowKeys.length >= 1 ?
                        <HeaderButton
                            goBack={this.btnBack.bind(this)}
                            length={selectedRowKeys.length}
                        >
                            {selectedRowKeys.length == 1 ?
                                <Button className="default_button" onClick={this.onEdit.bind(this, selectedRows[0])}><i className='iconfont icon-bianji'></i>编辑</Button>

                                : <Button className="default_button" disabled><i className='iconfont icon-bianji'></i>编辑</Button>
                            }

                            {selectedRowKeys.length == 1 ?
                                <Button
                                    className="returnbtn-class"
                                    onClick={this.onDelete.bind(this, selectedRows[0])}
                                >
                                    <i className="iconfont icon-shanchu" />删除
                        </Button>

                                :
                                <Button className="default_button" disabled><i className='iconfont icon-shanchu'></i>删除</Button>}
                        </HeaderButton>
                        :

                        <div >
                            <SearchForm />
                        </div>
                    }
                </div>

                <Row
                    type="flex"
                    gutter={30}
                    className="role-content">
                    <Col span={12} className="role-col">
                        <div className="tabel-recoverd">
                            <Table
                                loading={roleLoading}
                                size="middle"
                                columns={this.columns}
                                rowKey="id"
                                pagination={false}
                                dataSource={page.data}
                                rowClassName={this.getRowClassName.bind(this, selectedRoleId)}
                                rowSelection={rowSelection}
                            />
                        </div>
                    </Col>
                    <Col span={12} className="role-col">

                        <div className='org-tabel'>
                            <Tabs tabPosition={tabIndex} onTabClick={this.onTabClick}>
                                <TabPane tab="功能" key="1">
                                    <Spin spinning={funcLoading}>
                                        <FuncTree data={funcData} />
                                    </Spin>
                                </TabPane>
                                <TabPane tab="数据" key="2">
                                    <Spin spinning={rightLoading}>
                                        <RightPanel />
                                    </Spin>
                                </TabPane>
                                <TabPane tab="人员" key="3">
                                    <UserTable />
                                </TabPane>
                            </Tabs>
                        </div>
                        <Modal
                            title={isEdit ? "编辑角色" : "新增角色"}
                            visible={roleCardVisible}
                            onOk={this.onSave.bind(this)}
                            onCancel={this.onClose.bind(this)}
                            width={500}
                            maskClosable={false}
                        >
                            <Spin spinning={roleCardLoading}>
                                <WarpRoleCard dataSource={editData} wrappedComponentRef={(inst) => this.formRef = inst} />
                            </Spin>
                        </Modal>

                    </Col>
                </Row>

            </div>
        );
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
export default connect(mapStateToProps, mapDispatchToProps)(List);
