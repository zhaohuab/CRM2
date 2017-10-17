
import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Tabs, Table, Icon, Button, Form, Input, Checkbox, Col, Modal, Spin } from 'antd';
import * as roleActions from "../action"
import RoleCard from "./RoleCard"
import FuncTree from "./FuncTree"

const confirm = Modal.confirm;
const TabPane = Tabs.TabPane;
class List extends React.Component {

    constructor(props) {
        super(props)

        this.columns = [{
            title: '姓名',
            dataIndex: 'name',
            render: (text, row, index) => {
                return <span>
                    {text}
                    <span><Icon type="minus-circle-o" onClick={this.onDelete.bind(this, row)} /></span>
                    <span><Icon type="edit" onClick={this.onEdit.bind(this, row)} /></span>
                </span>

            },
        }]

        this.state = {
            isEdit: false
        }
    }

    componentDidMount() {
        this.props.action.getRoleListData();
        this.props.action.getFuncTreeData();
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

    render() {
        const { $$state } = this.props;
        const roleCardVisible = $$state.get("roleCardVisible");
        const WarpRoleCard = Form.create()(RoleCard)
        const page = $$state.get("data").toJS();
        const funcData = $$state.get("funcData").toJS();
        const editData = $$state.get("editData").toJS();
        return (
            <div className='list-warpper'>
                <div className='list-main'>
                    <div className='list-table-tree' style={{ minHeight: 'auto' }}>
                        <div className='org-tree-top'>
                            <Button onClick={this.onAdd.bind(this)}>新增角色</Button>
                        </div>
                        <Table
                            showHeader={false}
                            size="middle"
                            columns={this.columns}
                            rowKey="id"
                            pagination={false}
                            dataSource={page.data}
                        />
                    </div>
                    <div className='list-table' ref="listTablePanel">

                        <div className='org-tabel'>
                            <Tabs tabPosition={this.state.tabPosition}>
                                <TabPane tab="功能" key="1">
                                    <FuncTree data={funcData} />
                                </TabPane>
                                <TabPane tab="数据" key="2">Content of Tab 2</TabPane>
                                <TabPane tab="分配用户" key="3">Content of Tab 3</TabPane>
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
                    </div>
                </div>
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
