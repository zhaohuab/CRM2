/**
 * Created by litcb on 2017-08-30
 */

import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Table, Modal, Button, Icon } from "antd";

import { Input, Radio, Popconfirm, Form } from "antd";
import Card from "./UserForm.jsx";
import HeadLabel from "./HeadLabel.jsx";
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

        this.state = {
            headLabel: false,
            selectedRowKeys: [],
            enable: 1,
            pagination: {
                pageSize: 10,
                page: 1
            },
            searchMap: {
                enableState: 1
            }
        };
    }

    componentDidMount() {
        let { pagination, searchMap } = this.state;
        this.props.action.getListTpl();
        this.props.action.getListData({ pagination, searchMap });
    }

    onAdd() {
        this.props.action.showForm(true, {},"ADD");
        this.props.action.getAddTpl();
    }
    onDelete = () => {
        let { pagination, searchMap } = this.state;
        this.props.action.onDelete(this.state.selectedRowKeys, {
            pagination,
            searchMap
        });
        this.setState({ headLabel: false, selectedRowKeys: [] });
    };
    onEdit = () => {
        let rowKey = this.state.selectedRowKeys[0];
        let rowData = {};
        let page = this.props.$$state.get("data").toJS();
        for (let i = 0, len = page.data.length; i < len; i++) {
            if (rowKey == page.data[i].id) {
                rowData = page.data[i];
                break;
            }
        }
        this.props.action.showForm(true, rowData,"EDIT");
        this.props.action.getEditTpl();
    };
    onClose() {
        this.props.action.showForm(false, {});
    }
    onEnable(enable) {
        return enable => {
            let { pagination, searchMap } = this.state;
            this.setState({ headLabel: false });
            this.props.action.onEnable(this.state.selectedRowKeys, enable, {
                pagination,
                searchMap
            });
        };
    }
    onSave() {
        let form = this.formRef.props.form;
        form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                let isEdit = this.props.$$state.get("isEdit");
                if(isEdit) {
                    this.props.action.onSave4Edit(form.getFieldsValue());
                }
                else {
                    this.props.action.onSave4Add(form.getFieldsValue());
                }
            }
        });
    }
    onSelectChange = selectedRowKeys => {
        let state = {
            selectedRowKeys: selectedRowKeys
        };
        state.headLabel = selectedRowKeys.length ? true : false;
        this.setState(state);
    };
    onBack = () => {
        this.setState({ headLabel: false });
    };
    onEableRadioChange = e => {
        let enable = e.target.value;
        let { pagination, searchMap } = this.state;
        //可能有问题
        searchMap.enableState = enable;
        this.props.action.getListData({ pagination, searchMap });
        this.setState({ enable, selectedRowKeys: [], searchMap });
    };
    showTotal(total) {
        return `共 ${total} 条`;
    }
    onPageChange(page, pageSize) {
        let { pagination, searchMap } = this.state;
        //可能有问题
        pagination = { page: page, pageSize: pageSize };
        this.setState({ pagination });
        this.props.action.getListData({ pagination, searchMap });
    }
    onPageSizeChange(current, pageSize) {
        let { pagination, searchMap } = this.state;
        pagination = { page: pagination.page, pageSize: pageSize };
        this.setState({ pagination });
        this.props.action.getListData({ pagination, searchMap });
        console.info(`pageSize:${pageSize}`);
    }
    render() {
        let page = this.props.$$state.get("data").toJS();
        let visible = this.props.$$state.get("visible");
        let assignVisible = this.props.$$state.get("assignVisible");
        let { headLabel, selectedRowKeys } = this.state;

        let rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange
        };
        let editData = this.props.$$state.get("formData").toJS();
        let formFields = this.props.$$state.get("formFields").toJS();
        
        let template = this.props.$$state.get("template").toJS();
        let isEdit = this.props.$$state.get("isEdit");
        let tpl;
        if(isEdit) {
            tpl = template.edit;
        }
        else {
            tpl = template.add
        }
        return (
            <div className="user-warpper">
                {headLabel ? (
                    <div className="head_edit">
                        <HeadLabel
                            selectedRowKeys={selectedRowKeys}
                            onBack={this.onBack}
                        >
                            <Button
                                className="default_button"
                                onClick={this.onEdit}
                            >
                                <i className="iconfont icon-bianji" />编辑
                            </Button>
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

                            {this.state.enable == 1 ? (
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
                                    <i className="iconfont icon-qiyong-lanse" />启用
                                </Button>
                            )}
                            <Button className="default_button">
                                <i className="iconfont icon-fenpeijiaose" />分配角色
                            </Button>
                        </HeadLabel>
                    </div>
                ) : (
                    <div className="head_panel">
                        <div className="head_panel-left">
                            <div>
                                <span className="deep-title-color">所属部门：</span>
                                <Input
                                    placeholder="请选择..."
                                    className="search"
                                    onSearch={value => console.log(value)}
                                />
                            </div>
                            <div className="head_panel-state">
                                <span className="simple-title-color">状态：</span>
                                <RadioGroup
                                    onChange={this.onEableRadioChange}
                                    value={this.state.enable}
                                    className="simple-title-color"
                                >
                                    <Radio value={1}>启用</Radio>
                                    <Radio value={2}>停用</Radio>
                                </RadioGroup>
                            </div>
                        </div>
                        <div className="head_panel-right">
                            <ButtonGroup className="add-more">
                                <Button>
                                    <i className="iconfont icon-daochu" />导入
                                </Button>
                                <Button>
                                    <i className="iconfont icon-daoru" />导出
                                </Button>
                            </ButtonGroup>
                            <Button
                                type="primary"
                                className="button_add"
                                onClick={this.onAdd.bind(this)}
                            >
                                <Icon type="plus" />新增
                            </Button>
                        </div>
                    </div>
                )}

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
                    title="新增人员"
                    visible={visible}
                    onOk={this.onSave.bind(this)}
                    onCancel={this.onClose.bind(this)}
                    width={500}
                >
                    <div className="modal-height">
                        <Card
                            dataSource={formFields}
                            tpl={tpl}
                            onChange = {this.props.action.onUserChange}
                            wrappedComponentRef={inst => (this.formRef = inst)}
                        />
                    </div>
                </Modal>

                <Modal
                    title="分配角色和职能"
                    visible={assignVisible}
                    //onOk={this.onSave.bind(this)}
                    //onCancel={this.onClose.bind(this)}
                    width={500}
                >
                    <div className="modal-height">
                        <Card
                            dataSource={formFields}
                            tpl={tpl}
                            onChange = {this.props.action.onUserChange}
                            wrappedComponentRef={inst => (this.formRef = inst)}
                        />
                    </div>
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
