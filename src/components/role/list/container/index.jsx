
import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Tabs, Table, Icon, Button, Form, Input, Checkbox,Row, Col, Modal, Spin } from 'antd';
import HeaderButton from "../../../common/headerButtons/headerButtons.jsx";
import * as roleActions from "../action"
import RoleCard from "./RoleCard"
import FuncTree from "./FuncTree"
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
            width: 100,
            render: (text, row, index) => {
                return <a onClick={this.onNameClick.bind(this,row)}>
                    {text}
                </a>

            },
        },{
            title: '角色描述',
            dataIndex: 'description',
        },{
            title: '所属组织',
            dataIndex: 'orgName',
        },{
            title: '角色类型',
            dataIndex: 'type',
        }]

        this.state = {
            isEdit: false
        }
    }

    componentDidMount() {
        this.props.action.getRoleListData();
        // this.props.action.getFuncTreeData(1);
    }

    onNameClick = (row) => {
        this.props.action.getFuncTreeData(row.id);
        // this.props.action.selectRowTab(row.id,1);
    }
    //点击新增按钮事件
    onAdd() {
        this.setState({ isEdit: false });
        this.props.action.showRoleForm(true, {});
    }
    //点击删除按钮事件
    onDelete = (row) => {
        let that = this
        confirm({
            title: '确定要删除吗?',
            content: '此操作不可逆',
            okText: '是',
            okType: 'danger',
            cancelText: '否',
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
        this.setState({ isEdit: true });
        this.props.action.showRoleForm(true, row);
    }
    //保存事件
    onSave() {
        let form = this.formRef.props.form;
        form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
            }
        });
        if (this.state.isEdit) {
            this.props.action.onSaveRole4Edit(form.getFieldsValue());
        }
        else {
            this.props.action.onSaveRole4Add(form.getFieldsValue());
        }
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
    }
    onDispatch = () => {
        let tabIndex = this.props.$$state.get("tabIndex");
        console.info(tabIndex);
    }
    render() {
        let { $$state } = this.props;
        let roleCardVisible = $$state.get("roleCardVisible");
        let WarpRoleCard = Form.create()(RoleCard)
        let page = $$state.get("data").toJS();
        let funcData = $$state.get("funcData").toJS();
        let editData = $$state.get("editData").toJS();
        let selectedRowKeys = $$state.get("selectedRowKeys").toJS();
        let rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange
        };
        let operations = <Button onClick={this.onDispatch.bind(this)}>分配</Button>
        return (
            <div className='list-warpper'>
                {selectedRowKeys && selectedRowKeys.length >= 1 ?
                    <HeaderButton
                        goBack={this.btnBack.bind(this)}
                        length={selectedRowKeys.length}
                    >

                        {selectedRowKeys.length == 1 ? <Button className="default_button" onClick={this.onEdit.bind(this, selectedRowKeys[0])}><i className='iconfont icon-bianji'></i>编辑</Button>
                                : <Button className="default_button" disabled><i className='iconfont icon-bianji'></i>编辑</Button>}
                        <Button
                            className="returnbtn-class"
                            onClick={this.onDelete.bind(this)}
                        >
                            <i className="iconfont icon-shanchu" />删除
                        </Button>
                    </HeaderButton> 
                    :<div className='org-tree-top'>
                        <Button onClick={this.onAdd.bind(this)}>新增角色</Button>
                    </div>
                }
              
                    <Row>
                   <Col span={12}>
                   <div className="tabel-recoverd">
                        <Table
                            size="middle"
                            columns={this.columns}
                            rowKey="id"
                            pagination={false}
                            dataSource={page.data}
                            rowSelection={rowSelection}
                        />
                        </div>
                    </Col>
                    <Col span={12}>

                        <div className='org-tabel'>
                            <Tabs tabPosition={this.state.tabPosition} tabBarExtraContent={operations} onTabClick={this.onTabClick}>
                                <TabPane tab="功能" key="1">
                                    <FuncTree data={funcData} />
                                </TabPane>
                                <TabPane tab="数据" key="2">Content of Tab 2</TabPane>
                                <TabPane tab="用户" key="3">
                                <div className="tabel-recoverd">
                                <Table
                                    size="middle"
                                    columns={this.columns}
                                    rowKey="id"
                                    pagination={false}
                                    dataSource={page.data}
                                    rowSelection={rowSelection}
                                />
                                </div>
                                </TabPane>
                            </Tabs>
                        </div>
                        <Modal
                            title={this.state.isEdit ? "编辑角色" : "新增角色"}
                            visible={roleCardVisible}
                            onOk={this.onSave.bind(this)}
                            onCancel={this.onClose.bind(this)}
                            width={500}
                        >
                            <WarpRoleCard dataSource={editData} wrappedComponentRef={(inst) => this.formRef = inst} />
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
