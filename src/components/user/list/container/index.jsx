/**
 * Created by litcb on 2017-08-30
 */

import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Table, Modal, Button, Icon, Row, Col,message,Spin } from "antd";
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

const confirm = Modal.confirm;
//导入action方法
import * as Actions from "../action";

class List extends React.Component {
    constructor(props) {
        super(props);
    }

    componentWillMount () {
        //页面初始化前重置数据
        this.props.action.resetState();
    }

    componentDidMount() {
        let pagination = this.props.$$state.get("pagination").toJS();
        let searchMap = this.props.$$state.get("searchMap").toJS()
        this.props.action.getListTpl({ pagination, searchMap });
    }


    onDelete = () => {
        let that = this
        confirm({
            title: '确定要删除吗?',
            content: '此操作不可逆',
            okText: '确定',
            // okType: 'danger',
            cancelText: '取消',
            onOk() {
                let selectedRowKeys = that.props.$$state.get("selectedRowKeys").toJS();
                let pagination = that.props.$$state.get("pagination").toJS();
                let searchMap = that.props.$$state.get("searchMap").toJS();
                that.props.action.onDelete(selectedRowKeys, {
                    pagination,
                    searchMap
                });
                that.props.action.selectRow([], []);
            },
            onCancel() {
                console.log('Cancel');
            },
        });
       
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
        let form = this.formRef.props.form;
        this.props.action.showForm(false, {}, false);
        form.resetFields();
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
        let cardLoading = this.props.$$state.get("cardLoading");  
        if(cardLoading){
            return
        }
        let form = this.formRef.props.form;
        e.preventDefault();
        form.validateFields((err, values) => {
            console.info(err);
            if (!err) {
                let isEdit = this.props.$$state.get("isEdit");
                if (isEdit) {
                    this.props.action.onSave4Edit(form.getFieldsValue());
                    form.resetFields();
                }
                else {
                    this.props.action.onSave4Add(form.getFieldsValue());
                    form.resetFields();
                }
            }
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
        let pagination = this.props.$$state.get("pagination").toJS();
        let searchMap = this.props.$$state.get("searchMap").toJS();
        if(selectedRole){
            this.props.action.AssignRole(selectedRole, selectedRowKeys,pagination,searchMap)
        }else{
            message.error("请选择一个角色")
        }
    }

    getDateRender = (text, row, index) => {
        let date = new Date(text.time);
        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        var day = date.getDate();
        var hour = date.getHours();
        var minute = date.getMinutes();
        var second = date.getSeconds();
        return year + "-" + month + "-" + day + "   " + hour + ":" + minute + ":" + second;
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
        this.props.action.getListData({ pagination, searchMap });
    }
    onPageSizeChange(current, pageSize) {
        let pagination = this.props.$$state.get("pagination").toJS();
        let searchMap = this.props.$$state.get("searchMap").toJS();
        pagination = { page: 1, pageSize: pageSize };
        this.props.action.getListData({ pagination, searchMap });
    }
    render() {
        let page = this.props.$$state.get("data").toJS();
        debugger
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
        let pagination = this.props.$$state.get("pagination").toJS();
        let template = this.props.$$state.get("template").toJS();
        let isEdit = this.props.$$state.get("isEdit");
        let enableState = this.props.$$state.get("searchMap").toJS().enableState;
        let tpl;
        let tableLoading = this.props.$$state.get("tableLoading");  
        if (isEdit) {
            tpl = template.edit;
        }
        else {
            tpl = template.add;
        }
        
        let listTpl = template.list;
        if(listTpl){
            for(let i=0;i<listTpl.length;i++){
                if(listTpl[i].render=="Date"){
                    listTpl[i].render = this.getDateRender
                }
            } 
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

                   
                            <Button className="default_button" onClick={this.onDelete}>
                                <i className="iconfont icon-shanchu" />删除
                    </Button>
                     

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
                        loading={tableLoading}
                        size="middle"
                        columns={listTpl}
                        dataSource={page.data}
                        rowSelection={rowSelection}
                        rowKey="id"
                        pagination={{
                            current: pagination.page,
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
