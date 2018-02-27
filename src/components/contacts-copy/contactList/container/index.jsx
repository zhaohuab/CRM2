import React, { Component, PropTypes } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { browserHistory } from "react-router";
import {
    Icon,
    Button,
    Dropdown,
    Menu,
    Collapse,
    Input,
    Row,
    Col,
    Table,
    Modal,
    Form,
    Select,
    Tabs,
    Timeline
} from "antd";
const Panel = Collapse.Panel;
const ButtonGroup = Button.Group;
const Option = Select.Option;
const TabPane = Tabs.TabPane;
const confirm = Modal.confirm;
import * as Actions from "../action/index.js";
import HeaderButton from "../../../common/headerButtons/headerButtons.jsx";
import Card from "./card.jsx";
import LessCard from "./lessCard.jsx";
import MoreCard from "./moreCard.jsx";
import SlidePanel from "../../../common/slidePanel/index.jsx";
import PanelView from "./panel.jsx";

import "./index.less";
import "assets/stylesheet/all/iconfont.css";
import data from "../../../role/list/container/data";

class Contacts extends React.Component {
    constructor(props) {
        super(props);
        this.columns = [
            {
                title: "姓名",
                dataIndex: "name",
                render: text=> {
                    return (
                        <div
                            onClick={this.slideShow.bind(this)}
                            className="crm-pointer"
                        >
                            {text}
                        </div>
                    );
                }
            },
            {
                title: "客户",
                dataIndex: "customerName"
            },
            {
                title: "部门",
                dataIndex: "deptName"
            },
            {
                title: "角色",
                dataIndex: "role"
            },
            {
                title: "态度",
                dataIndex: "attitude"
            }
        ];
        let that = this;

        this.state = {
            pagination: {
                pageSize: 10,
                page: 1
            },
            searchMap: {
                enableState: 1
            },
            //上方条件选择保存更多状态
            more: false,
            viewState: false
        };

        this.onSelectChange = (selectedRowKeys, selectedRows) => {
            debugger;
            this.setState({
                more: false
            });
            this.props.action.selectData({ selectedRows, selectedRowKeys });
        };
        this.menu = (
            <Menu>
                <Menu.Item key="1">导入</Menu.Item>
                <Menu.Item key="2">导出</Menu.Item>
            </Menu>
        );
    }

    //点击姓名出侧滑面板
    slideShow() {
        this.setState({
            viewState: true
        });
    }
    slideHide() {
        this.setState({
            viewState: false
        });
    }
    //头部按钮层返回按钮方法
    headerBack() {
        this.props.action.selectData([]);
    }

    //modal点击确定按钮
    handleOk() {
        let { pagination, searchMap } = this.state; //获取分页信息
        debugger;
        this.formRef.props.form.validateFieldsAndScroll((err, values) => {
            debugger;
            if (!err) {
                if (values.id) {
                    debugger;
                    this.props.action.onEdit(values, pagination, searchMap);
                } else {
                    debugger;
                    this.props.action.cardSaved(values, pagination, searchMap);
                }
            }
        });
    }

    //modal点击取消按钮
    handleCancel() {
        this.props.action.showForm(false);
    }

    //新增按钮
    addContacts() {
        this.props.action.edit({}, true);
    }

    //删除按钮
    onDelete() {
        let that = this;
        confirm({
            title: "确定要删除吗?",
            content: "此操作不可逆",
            okText: "是",
            cancelText: "否",
            onOk() {
                let selectedRowKeys = that.props.$$state.toJS().rowKeys[
                    "selectedRowKeys"
                ];
                let { pagination, searchMap } = that.state; //获取分页信息
                that.props.action.onDelete(selectedRowKeys, pagination, searchMap);
            },
            onCancel() {
                console.log("Cancel");
            }
        });
    }

    //分页器显示条数
    showTotal(total) {
        return `共 ${total} 条`;
    }

    //点击分页器页数
    onPageChange(page, pageSize) {
        let { pagination, searchMap } = this.state; //获取分页信息
        pagination = {
            pageSize,
            page
        };
        this.setState({ pagination });
        this.props.action.getContactList(pagination, searchMap);
    }
    //点击分页器跳转
    onPageSizeChange(current, size) {
        let { pagination, searchMap } = this.state; //获取分页信息
        pagination = {
            pageSize: size,
            page: current
        };
        this.setState({ pagination });
        this.props.action.getContactList(pagination, searchMap);
    }

    //点击编辑按钮
    onEdit() {
        let selectedRowKeys = this.props.$$state.toJS().rowKeys[
            "selectedRowKeys"
        ];
        let resultNew = this.props.$$state.toJS().data.data;
        resultNew = resultNew.filter(item => {
            return item.id == selectedRowKeys[0];
        });

        let newObj = {};
        for (var key in resultNew[0]) {
            newObj[key] = resultNew[0][key];
        }
        this.props.action.edit(newObj, true);
    }

    //获取列表所需展示字段
    changeValue(data) {
        let newDate = [];
        data.forEach(item => {
            let obj = {};
            for (var key in item) {
                if (key == "id") {
                    obj.id = item[key];
                } else if (key == "name") {
                    obj.name = item[key];
                } else if (key == "customerInfo") {
                    if(item["customerInfo"]!=null)
                        obj.customerName = item["customerInfo"].name;
                    else
                        obj.customerName = "";
                } else if (key == "deptName") {
                    obj.deptName = item[key];
                } else if (key == "role") {
                    obj.role = item[key];
                } else if (key == "attitude") {
                    obj.attitude = item[key];
                }
            }
            newDate.push(obj);
        });
        return newDate;
    }
    //展开收起搜索条件
    showFn() {
        this.setState({
            more: !this.state.more
        });
    }
    //页面刚挂在组件方法
    componentDidMount() {
        let { pagination, searchMap } = this.state; //获取分页信息
        this.props.action.getContactList(pagination, searchMap);
    }

    render() {
        let {
            data,
            visible,
            loading,
            tags,
            editData
        } = this.props.$$state.toJS();

        //获取列表所需字段
        let newData;
        if (data.data) {
            newData = this.changeValue.call(this, data.data);
        }
        //新建表单
        const ContactsForm = Form.create({})(Card);
        //查询列表头部简单搜索表单
        const ContactLessForm = Form.create({})(LessCard);
        //查询列表头部负载搜索表单
        const ContactMoreFrom = Form.create({})(MoreCard);

        let {
            selectedRowKeys,
            selectedRows
        } = this.props.$$state.toJS().rowKeys;

        let rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange
        };

        return (
            <div className="crm-container">
                <div className="contacts-warpper">
                    {selectedRowKeys && selectedRowKeys.length ? (
                        <HeaderButton
                            length={selectedRowKeys.length}
                            goBack={this.headerBack.bind(this)}
                        >
                            <Button onClick={this.onDelete.bind(this)}>
                                <i className="iconfont icon-shanchu" />删除
                            </Button>
                            {selectedRowKeys.length == 1 ? (
                                <Button onClick={this.onEdit.bind(this)}>
                                    <i className="iconfont icon-bianji" />编辑
                                </Button>
                            ) : (
                                ""
                            )}
                        </HeaderButton>
                    ) : (
                        <div className="crm-container-header">
                            <Row>
                                <Col span={18}>
                                    <Row type="flex" gutter={15} align="middle">
                                        {   /*  <div>
                                            <Select defaultValue="全部">
                                                <Option value="1">我关注</Option>
                                                <Option value="2">最近创建</Option>
                                                <Option value="3">最近查看</Option>
                                                <Option value="4">一周末跟进</Option>
                                            </Select>
                                        </div> */}
                                        <Col span="21">
                                            <div
                                                className={
                                                    this.state.more
                                                        ? "less-hide-height"
                                                        : "less-show-height"
                                                }
                                            >
                                                <ContactLessForm
                                                    showFn={this.showFn.bind(
                                                        this
                                                    )}
                                                />
                                            </div>
                                        </Col>
                                    </Row>
                                </Col>

                                <Col span={6}>
                                    <Row type="flex" justify="end">
                                        <Col span={24}>
                                            <Row
                                                type="flex"
                                                justify="end"
                                                gutter={15}
                                            >
                                                <div>
                                                    <Button
                                                        type="primary"
                                                        onClick={this.addContacts.bind(
                                                            this
                                                        )}
                                                    >
                                                        <i className="iconfont icon-xinjian" />新建
                                                    </Button>
                                                </div>
                                            { /*    <div>
                                                    <Dropdown
                                                        overlay={this.menu}
                                                        trigger={["click"]}
                                                    >
                                                        <Button>
                                                            更多
                                                            <Icon type="down" />
                                                        </Button>
                                                    </Dropdown>
                                                </div> */}
                                            </Row>
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                            <Row
                                className={
                                    this.state.more
                                        ? "more-show-height"
                                        : "less-hide-height"
                                }
                            >
                                <ContactMoreFrom
                                    showFn={this.showFn.bind(this)}
                                />
                            </Row>
                        </div>
                    )}
                    <div className="tabel-bg tabel-recoverd">
                        <Table
                            size="middle"
                            columns={this.columns}
                            dataSource={newData}
                            rowKey="id"
                            rowSelection={rowSelection}
                            loading={loading}
                            pagination={{
                                size: "large",
                                showSizeChanger: true,
                                showQuickJumper: true,
                                total: data.total,
                                showTotal: this.showTotal,
                                onChange: this.onPageChange.bind(this),
                                onShowSizeChange: this.onPageSizeChange.bind(
                                    this
                                )
                            }}
                        />
                    </div>

                    <Modal
                        title={editData.id ? "修改联系人" : "增加联系人"}
                        visible={visible}
                        onOk={this.handleOk.bind(this)}
                        onCancel={this.handleCancel.bind(this)}
                        width={900}
                        maskClosable={false}
                    >
                        <div className="modal-height">
                            <ContactsForm
                                dataSource={editData}
                                wrappedComponentRef={inst =>
                                    (this.formRef = inst)}
                            />
                        </div>
                    </Modal>

                    <SlidePanel
                        viewState={this.state.viewState}
                        onClose={this.slideHide.bind(this)}
                    >
                        <PanelView />
                    </SlidePanel>
                </div>
            </div>
        );
    }
}
export default connect(
    state => {
        return {
            $$stateComponent: state.componentReducer,
            $$state: state.contacts
        };
    },
    dispatch => {
        return {
            action: bindActionCreators(Actions, dispatch)
        };
    }
)(Contacts);


