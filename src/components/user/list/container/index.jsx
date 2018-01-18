/**
 * Created by litcb on 2017-08-30
 */

import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Table, Modal, Button, Icon, Row, Col } from "antd";
import HeaderButton from "../../../common/headerButtons/headerButtons.jsx";
import SearchForm from "./SearchForm.jsx";
import { Input, Radio, Popconfirm, Form } from "antd";
import Card from "./UserForm.jsx";
import AssignCard from "./AssignCard.jsx";
import Department from "components/refs/departments";
import "./index.less";
let Search = Input.Search;
let RadioGroup = Radio.Group;
const ButtonGroup = Button.Group;
import "assets/stylesheet/all/iconfont.css";

//导入action方法
import * as Actions from "../action";

class List extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        let pagination = this.props.$$state.get("pagination").toJS();
        let searchMap = this.props.$$state.get("searchMap").toJS();
        this.props.action.getListTpl(searchMap.enableState);
        this.props.action.getListData({ pagination, searchMap });
        this.props.action.getEnumData();
    }


    onDelete = () => {
        let selectedRowKeys = this.props.$$state.get("selectedRowKeys").toJS();
        let pagination = this.props.$$state.get("pagination").toJS();
        let searchMap = this.props.$$state.get("searchMap").toJS();
        this.props.action.onDelete(selectedRowKeys, {
            pagination,
            searchMap
        });
        this.props.action.selectRow([], []);
    };
    onEdit = () => {
        let rowKey = this.props.$$state.get("selectedRowKeys").toJS()[0];
        let rowData = {};
        let page = this.props.$$state.get("data").toJS();
        for (let i = 0, len = page.data.length; i < len; i++) {
            if (rowKey == page.data[i].id) {
                rowData = page.data[i];
                break;
            }
        }
        this.props.action.showForm(true, rowData, true);
        this.props.action.getEditTpl();
    };
    onClose() {
        this.props.action.showForm(false, {}, false);
    }
    onEnable(enable) {
        return enable => {
            let pagination = this.props.$$state.get("pagination").toJS();
            let searchMap = this.props.$$state.get("searchMap").toJS();
            let selectedRowKeys = this.props.$$state.get("selectedRowKeys").toJS();
            this.props.action.onEnable(selectedRowKeys, enable, {
                pagination,
                searchMap
            });
        };
    }
    onSave(e) {
        let form = this.formRef.props.form;
        e.preventDefault();
        form.validateFieldsAndScroll((err, values) => {
            // if (!err) {
                let isEdit = this.props.$$state.get("isEdit");
                if (isEdit) {
                    this.props.action.onSave4Edit(form.getFieldsValue());
                }
                else {
                    this.props.action.onSave4Add(form.getFieldsValue());
                }
            // }
        });
    }

    onSelectChange = (selectedRowKeys, selectedRows) => {
        this.props.action.selectRow(selectedRows, selectedRowKeys);
    }
    onBack = () => {
        this.props.action.selectRow([], []);
    };

    onAssign = () => {
        this.props.action.showAssign()
    }
    onAssignOk = () => {
        const selectedRole = this.props.$$state.get("selectedRole");
        const selectedRowKeys = this.props.$$state.get("selectedRowKeys").toJS();
        this.props.action.AssignRole(selectedRole, selectedRowKeys)
    }
    onAssignClose = () => {
        this.props.action.closeAssign()
    }

    showTotal(total) {
        return `共 ${total} 条`;
    }
    onPageChange(page, pageSize) {
        let pagination = this.props.$$state.get("pagination").toJS();
        let searchMap = this.props.$$state.get("searchMap").toJS();
        //可能有问题
        pagination = { page: page, pageSize: pageSize };
        this.setState({ pagination });
        this.props.action.getListData({ pagination, searchMap });
    }
    onPageSizeChange(current, pageSize) {
        let pagination = this.props.$$state.get("pagination").toJS();
        let searchMap = this.props.$$state.get("searchMap").toJS();
        pagination = { page: pagination.page, pageSize: pageSize };
        this.setState({ pagination });
        this.props.action.getListData({ pagination, searchMap });
        console.info(`pageSize:${pageSize}`);
    }
    render() {
        let page = this.props.$$state.get("data").toJS();
        let visible = this.props.$$state.get("visible");
        let assignVisible = this.props.$$state.get("assignVisible");
        let selectedRowKeys = this.props.$$state.get("selectedRowKeys").toJS();
        let selectedRows = this.props.$$state.get("selectedRows").toJS();
        let rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange
        };
        let editData = this.props.$$state.get("formData").toJS();
        let formFields = this.props.$$state.get("formFields").toJS();

        let template = this.props.$$state.get("template").toJS();
        let isEdit = this.props.$$state.get("isEdit");
        let enableState = this.props.$$state.get("searchMap").toJS().enableState;
        let tpl;
        if (isEdit) {
            tpl = template.edit;
        }
        else {
            tpl = template.add;
        }
        return (
            <div className="user-warpper">

                {selectedRowKeys && selectedRowKeys.length >= 1 ?
                    <HeaderButton
                        goBack={this.onBack.bind(this)}
                        length={selectedRowKeys.length}
                    >
                     

                        {selectedRowKeys.length == 1&&enableState ==1 ? <Button
                            className="default_button"
                            onClick={this.onEdit}
                        >
                            <i className="iconfont icon-bianji" />编辑
                </Button> : ""}

                {selectedRowKeys.length > 1&&enableState ==1 ? <Button
                           disabled
                        >
                            <i className="iconfont icon-bianji" />编辑
                </Button> : ""}

                        <Popconfirm
                            placement="bottom"
                            title="确认删除吗"
                            onConfirm={this.onDelete}
                            okText="是"
                            cancelText="否"
                        >
                            <Button className="default_button">
                                <i className="iconfont icon-shanchu" />删除
                    </Button>
                        </Popconfirm>

                        {enableState == 1 ? (
                            <Button
                                className="default_button"
                                onClick={this.onEnable(2).bind(this, 2)}
                            >
                                <i className="iconfont icon-tingyong" />停用
                    </Button>
                        ) : (
                                <Button
                                    className="default_button"
                                    onClick={this.onEnable(1).bind(this, 1)}
                                >
                                    <i className="iconfont icon-qiyong" />启用
                    </Button>
                            )}
                            {enableState ==1  ?<Button className="default_button"
                            onClick={this.onAssign.bind(this)}
                        >
                            <i className="iconfont icon-fenpeijiaose" />分配角色
                </Button>:""}
                        
                    </HeaderButton>
                    :
                    <div>
                        <SearchForm />
                    </div>
                }
                <div className="list-box tabel-recoverd">
                    <Table
                        size="middle"
                        columns={template.list}
                        dataSource={page.data}
                        rowSelection={rowSelection}
                        rowKey="id"
                        pagination={{
                            size: "large",
                            showSizeChanger: true,
                            showQuickJumper: true,
                            total: page.total,
                            showTotal: this.showTotal,
                            onChange: this.onPageChange.bind(this),
                            onShowSizeChange: this.onPageSizeChange.bind(this)
                        }}
                    />
                </div>
                <Modal
                    title={isEdit ? "编辑人员" : "新增人员"}
                    visible={visible}
                    onOk={this.onSave.bind(this)}
                    onCancel={this.onClose.bind(this)}
                    width={500}
                    maskClosable={false}
                >
                    <div className="modal-height">
                        <Card
                            dataSource={formFields}
                            tpl={tpl}
                            onChange={this.props.action.onUserChange}
                            wrappedComponentRef={inst => (this.formRef = inst)}
                        />
                    </div>
                </Modal>

                <Modal
                    title="分配角色和职能"
                    visible={assignVisible}
                    onOk={this.onAssignOk.bind(this)}
                    onCancel={this.onAssignClose.bind(this)}
                    width={500}
                >
                    <AssignCard />
                </Modal>
            </div>
        );
    }
}

//绑定状态到组件props
function mapStateToProps(state, ownProps) {
    return {
        $$state: state.userlist
    };
}

//绑定action到组件props
function mapDispatchToProps(dispatch) {
    return {
        action: bindActionCreators(Actions, dispatch)
    };
}

//输出绑定state和action后组件
export default connect(mapStateToProps, mapDispatchToProps)(List);
