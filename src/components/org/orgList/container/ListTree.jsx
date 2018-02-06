import React, { Component } from "react";
import {Table,Icon,
    Button,
    Form,
    Input,
    Checkbox,
    Col,
    DatePicker,
    message,
    Modal,
    Spin,
    Tree
} from "antd";
const TreeNode = Tree.TreeNode;
const Search = Input.Search;
const confirm = Modal.confirm;
import "./index.less";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as Actions from "../action/index.js";

class ListTree extends Component {
    constructor(props) {
        super(props);
        this.state = {
            edit: ""
        };
    }

    onSelect(selectedKeys, obj) {
        if (selectedKeys.length) {
            this.props.action.listTreeChange(selectedKeys[0]);
        }
    }

    edit(item, e) {
        e.stopPropagation();
        // this.props.edit(item.id);

        let rowData = {};
        let data = this.props.$$state.get("listData").toJS().data;
        for (let i = 0, len = data.length; i < len; i++) {
            if (item.id == data[i].id) {
                rowData = data[i];
                break;
            }
        }
        this.props.action.showForm(true, rowData,true);
    }

    add(item, e) {
        e.stopPropagation();
        let rowData = { fatherorgId: item.id, fatherorgName: item.name,path:item.path,orgType:3 };
        this.props.action.showForm(true, rowData,false);
    }

    delete(item, e) {
        e.stopPropagation();

        let that = this;
        confirm({
            title: "确定要删除吗?",
            content: "此操作不可逆",
            okText: "是",
            // okType: "danger",
            cancelText: "否",
            onOk() {
                const record = [];
                record.push(item);
                that.props.action.listdel(record, item.id);
            },
            onCancel() {
                console.log("Cancel");
            }
        });
    }
    showEdit(item) {
        this.setState({
            edit: item.id
        });
    }

    getCustomTitle(item) {
        return (
            <span className="show-edit-warpper">
                <span
                    title={item.name}
                    className="show-edit-title"
                    onClick={this.showEdit.bind(this, item)}
                >
                    {item.name}
                </span>
                <span
                    className={
                        this.state.edit == item.id
                            ? "show-edit-inner"
                            : "show-edit-inner-hide"
                    }
                >
                    <span>
                        <Icon
                            type="plus-circle-o"
                            onClick={this.add.bind(this, item)}
                        />
                    </span>
                    <span>
                        <Icon
                            type="minus-circle-o"
                            onClick={this.delete.bind(this, item)}
                        />
                    </span>
                    <span>
                        <Icon
                            type="edit"
                            onClick={this.edit.bind(this, item)}
                        />
                    </span>
                </span>
            </span>
        );
    }
    render() {
        const loop = data =>
            data.map(item => {
                if (item.children && item.children.length) {
                    return (
                        <TreeNode
                            key={item.id}
                            title={this.getCustomTitle(item)}
                        >
                            {loop(item.children)}
                        </TreeNode>
                    );
                }
                return (
                    <TreeNode key={item.id} title={this.getCustomTitle(item)} />
                );
            });
        let data = this.props.$$state.get("treeData").toJS();
        let treeLoading = this.props.$$state.get("treeLoading");
        
        return (
            <div>
                {data.length ? (
                    <div>
                        <div className="org-tree-main">
                        <Spin spinning={treeLoading}>
                            <Tree
                                showLine
                                defaultExpandedKeys={[String(data[0].id)]}
                                onSelect={this.onSelect.bind(this)}
                            >
                                {loop(data)}
                            </Tree>
                            </Spin>
                        </div>
                    </div>
                ) : (
                    ""
                )}
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
)(ListTree);
