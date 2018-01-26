import React, { Component } from "react";
import {Table, Icon,Button,Form,Input,Checkbox,Col,Modal,Spin,message} from "antd";
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
        };
        //点击每行table触发的onchange方法
        let that = this;

        this.onSelectChange = (selectedRowKeys, selectedRows) => {
            let rowKeys = this.props.$$state.get("selectedRowKeys").toJS();
            let rows = this.props.$$state.get("selectedRows").toJS();
            if(selectedRowKeys.length>2||selectedRows.length>2){
                message.error("最多选择一条组织")
                return 
            }
            for(let i=0;i<selectedRowKeys.length;i++){
                if(rowKeys[0] == selectedRowKeys[i]){
                    selectedRowKeys.splice(i,1);
                    break;
                }
            }
            for(let i=0;i<selectedRows.length;i++){
                if(rows&&rows[0]&&rows[0].id == selectedRows[i].id){
                    selectedRows.splice(i,1);
                    break;
                }
            }
         
            this.props.action.selectData({ selectedRows, selectedRowKeys });
        };
    }


    //修改页面取消按钮
    handleCancel() {
        this.props.action.showForm(false, {},false);
    }

    //表单页面确定方法
    formHandelOk() {
        this.formRef.props.form.validateFields((err, values) => {
            if (!err) {
                debugger
                let isEdit = this.props.$$state.get("isEdit");
                if (isEdit) {
                    this.props.action.listchange(values);
                } else {
                    this.props.action.listadd(values);
                }
            }
        });
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
        this.props.action.showForm(true, rowData,true);
    }
    //点击一个节点数的增加操作
    treeSelectAddFn(item) {
        this.setState({ isEdit: false });
        let rowData = { fatherorgId: item.id, fatherorgName: item.name };
        this.props.action.showForm(true, rowData,false);
    }

    //点击一个节点数的删除操作
    treeSelectDeleteFn(item) {
        const record = [];
        record.push(item);
        this.props.action.listdel(record, item.id);
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
        let page = $$state.get("listData").toJS();
        let selectedRows = $$state.get("selectedRows").toJS();
        let selectedRowKeys = $$state.get("selectedRowKeys").toJS();
        let isEdit = $$state.get("isEdit");
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
                 
                        <ListTree
                            edit={this.treeSelectEditFn.bind(this)}
                            add={this.treeSelectAddFn.bind(this)}
                            delete={this.treeSelectDeleteFn.bind(this)}
                        />
                    </div>
                    <div className="list-table" ref="listTablePanel">
                        
                            {selectedRows.length ? (<div className="table-header">
                                <EditButton
                                    returnFn={this.btnBack.bind(this)}
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
                            title={isEdit?"修改组织":"新增组织"}
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
