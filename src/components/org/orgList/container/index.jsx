import React, { Component } from "react";
import {Table, Icon,Button,Form,Input,Checkbox,Col,Modal,Spin} from "antd";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as Actions from "../action/index.js";

import Immutable from "immutable";
import WrapCard from "./ListForm.jsx";
import ListTree from "./ListTree.jsx";
import EditButton from "./EditButtons.jsx";
const ButtonGroup = Button.Group;
const Search = Input.Search;
import "./index.less";
import "assets/stylesheet/all/iconfont.css";

class List extends Component {
    constructor() {
        super();
        this.columns = [
            {
                title: "编码",
                dataIndex: "code"
            },
            {
                title: "名称",
                dataIndex: "name"
            },
            {
                title: "简称",
                dataIndex: "simpleName"
            },
            {
                title: "助记码",
                dataIndex: "simpleCode"
            },
            {
                title: "上级组织名称",
                dataIndex: "fatherorgName"
            },
            {
                title: "组织类型",
                dataIndex: "orgTypeName"
            },
            {
                title: "状态",
                dataIndex: "enablestateName"
            }
        ];
        this.state = {
            minH: "",
            isEdit: false
        };
        //点击每行table触发的onchange方法
        let that = this;

        this.onSelectChange = (selectedRowKeys, selectedRows) => {
            this.props.action.selectData({ selectedRows, selectedRowKeys });
        };
    }

    //修改一条数据方法
    changeForm(record) {
        this.setState({ isEdit: true });
        this.props.action.showForm(true, record);
    }

    //删除一条数据方法
    btnDelete(treeSelect, searchFilter, record) {
        this.props.action.listdel(record, treeSelect, searchFilter);
    }

    //启停用按钮
    btnSetEnablestate(treeSelect, searchFilter, data, state) {
        this.props.action.setEnablestate(treeSelect, searchFilter, data, state);
    }

    //修改页面取消按钮
    handleCancel() {
        this.props.action.showForm(false, {});
    }

    //表单页面确定方法
    formHandelOk() {
        this.formRef.props.form.validateFields((err, values) => {
            if (!err) {
                if (this.state.isEdit) {
                    this.props.action.listchange(values);
                } else {
                    this.props.action.listadd(values);
                }
            }
        });
    }

    //点击增加组织
    addFormBtn() {
        this.setState({ isEdit: false });
        this.props.action.showForm(true, {});
        // this.props.action.changeAdd()
    }

    //显示每行数据后的返回按钮
    btnBack() {
        this.props.action.selectData({ selectedRows: [], selectedRowKeys: [] });
    }

    //点击一个节点数的编辑操作
    treeSelectEditFn(rowKey) {
        this.setState({ isEdit: true });
        let rowData = {};
        let data = this.props.$$state.get("listData").toJS().data;
        for (let i = 0, len = data.length; i < len; i++) {
            if (rowKey == data[i].id) {
                rowData = data[i];
                break;
            }
        }
        this.props.action.showForm(true, rowData);
    }
    //点击一个节点数的增加操作
    treeSelectAddFn(item) {
        this.setState({ isEdit: false });
        let rowData = { fatherorgId: item.id, fatherorgName: item.name };
        this.props.action.showForm(true, rowData);
    }

    //点击一个节点数的删除操作
    treeSelectDeleteFn(item) {
        const record = [];
        record.push(item);
        this.props.action.listdel(record, item.id);
    }
    //点击查询按钮
    searchList(item) {
        this.props.action.getlistByClickSearch({ searchKey: item });
    }
    reSizeFn() {
        let h = document.documentElement.clientHeight;
        this.setState({
            minH: h - 70
        });
    }

    //组件渲染完毕获取数据
    componentDidMount() {
        this.props.action.getlist();
        this.props.action.getTreeList();
        this.setState({
            minH: document.documentElement.clientHeight - 70
        });
        window.onreset = () => {
            this.reSizeFn();
        };
    }
    showTotal(total) {
        return `共 ${total} 条`;
    }

    render() {
        //这获取总的状态  //拿到想要的之后再toJS
        let { $$state } = this.props;
        let tabelLoading = $$state.get("tabelLoading");
        let formVisitable = $$state.get("formVisitable");
        let treeLoading = $$state.get("treeLoading");
        let treeSelect = $$state.get("treeSelect");
        let searchFilter = $$state.get("searchFilter");
        let page = $$state.get("listData").toJS();
        let selectedRows = $$state.get("selectedRows").toJS();
        let selectedRowKeys = $$state.get("selectedRowKeys").toJS();
        let rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange
        };
       // const WrapCard = Form.create()(card);
        let editData = $$state.get("editData").toJS();
        return (
            <div className="list-warpper">
                <div className="list-main">
                    <div
                        className="list-table-tree"
                        id="tree-icon"
                        style={{
                            minHeight: this.state.minH
                                ? this.state.minH + "px"
                                : "auto"
                        }}
                    >
                        <div className="org-tree-top">
                            <Search
                                placeholder="请输入关键字段"
                                onSearch={this.searchList.bind(this)}
                            />
                        </div>
                        <Spin spinning={treeLoading} tip="正在加载" />
                        <ListTree
                            edit={this.treeSelectEditFn.bind(this)}
                            add={this.treeSelectAddFn.bind(this)}
                            delete={this.treeSelectDeleteFn.bind(this)}
                        />
                    </div>
                    <div className="list-table" ref="listTablePanel">
                        
                            {selectedRows.length ? (<div className="table-header">
                                <EditButton
                                    data={selectedRows}
                                    setEnablestate={this.btnSetEnablestate.bind(
                                        this,
                                        treeSelect,
                                        searchFilter
                                    )}
                                    deleteList={this.btnDelete.bind(
                                        this,
                                        treeSelect,
                                        searchFilter
                                    )}
                                    returnFn={this.btnBack.bind(this)}
                                    changeForm={this.changeForm.bind(this)}
                                />
                                </div>) : (
                                ""
                            )}
                            
                        
                        <div className="org-tabel tabel-recoverd">
                            <Table
                                columns={this.columns}
                                rowKey="id"
                                dataSource={page.data}
                                loading={tabelLoading}
                                rowSelection={rowSelection}
                                size="middle"
                                pagination={{
                                    size: "large",
                                    showSizeChanger: true,
                                    showQuickJumper: true,
                                    total: page.total,
                                    showTotal: this.showTotal
                                }}
                            />
                        </div>
                        <Modal
                            title={this.state.isEdit?"修改组织":"新增组织"}
                            visible={formVisitable}
                            onOk={this.formHandelOk.bind(this)}
                            onCancel={this.handleCancel.bind(this)}
                        >
                            <div className="modal-height">
                                <WrapCard
                                    wrappedComponentRef={inst =>
                                        (this.formRef = inst)}
                                    data={editData}
                                />
                            </div>
                        </Modal>
                    </div>
                </div>
            </div>
        );
    }
}

export default connect(
    state => {
        return {
            $$state: state.orgReducers
        };
    },
    dispatch => {
        return {
            action: bindActionCreators(Actions, dispatch)
        };
    }
)(List);
