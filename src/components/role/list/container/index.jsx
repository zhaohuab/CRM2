
import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Tabs, Table, Icon, Button, Form, Input, Checkbox, Row, Col, Modal, Spin,message } from 'antd';
import HeaderButton from "../../../common/headerButtons/headerButtons.jsx";
import * as roleActions from "../action"
import RoleCard from "./RoleCard"
import FuncTree from "./FuncTree"
import UserTable from "./UserTable"
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
                return <a onClick={this.onNameClick.bind(this, row)}>
                    {text}
                </a>

            },
        }, {
            title: '角色描述',
            dataIndex: 'description',
        }, {
            title: '所属组织',
            dataIndex: 'orgName',
        }, {
            title: '角色类型',
            dataIndex: 'typeName',
        }]

        this.state = {
            isEdit: false
        }
    }

    componentDidMount() {
        this.props.action.getRoleListData();
        this.props.action.getEnumData();
    }

    //点击角色名称
    onNameClick = (row) => {
        const tabIndex = this.props.$$state.get("tabIndex");
        const selectedRoleId = this.props.$$state.get("selectedRoleId");
        if(tabIndex == 1){
            this.props.action.getFuncTreeData(row.id,row.isPreseted);
        }else if(tabIndex == 2){
            
        }else if(tabIndex == 3){
            const userPagination = this.props.$$state.get("userPagination").toJS();
            this.props.action.getUserListData(selectedRoleId,userPagination);
        }
    }
    //点击新增按钮事件
    onAdd() {
        this.setState({ isEdit: false });
        this.props.action.showRoleForm(true, {},false);
    }
    //点击删除按钮事件
    onDelete = (row) => {
        if(row.isPreseted ==1){
            message.error("预制角色不允许删除");
            return;
        }
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
        this.props.action.showRoleForm(true, row,true);
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
        const selectedRoleId = this.props.$$state.get("selectedRoleId");
        const selectedRoleIsPreseted = this.props.$$state.get("selectedRoleIsPreseted");
        if(tabIndex == 1){
            this.props.action.getFuncTreeData(selectedRoleId,selectedRoleIsPreseted);
        }else if(tabIndex == 2){
            
        }else if(tabIndex == 3){
            const userPagination = this.props.$$state.get("userPagination").toJS();
            this.props.action.getUserListData(selectedRoleId,userPagination);
        }
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
        //页面初始化查询第一条数据。
        if (page != null && page.data != null && page.data.length > 0 && funcData.length == 0) {
            this.props.action.getFuncTreeData(page.data[0].id,page.data[0].isPreseted);
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
        
        return (
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
                    : <div className='org-tree-top'>
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
                            <Tabs tabPosition={tabIndex} onTabClick={this.onTabClick}>
                                <TabPane tab="功能" key="1">
                                    <FuncTree data={funcData} />
                                </TabPane>
                                <TabPane tab="数据" key="2">Content of Tab 2</TabPane>
                                <TabPane tab="人员" key="3">
                                    {/* <Row type="flex" justify="end">
                                        <Col span={4}>
                                        <Button className="returnbtn-class"> <i className="iconfont icon-xinjian" />添加</Button>
                                        </Col>
                                        <Col span={4}>
                                            <Button className="returnbtn-class"><i className="iconfont icon-shanchu" />移除</Button>
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
                                            />
                                        </div>
                                    </Row> */}
                                    <UserTable />
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
