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
    Select
} from "antd";
const Panel = Collapse.Panel;
const ButtonGroup = Button.Group;
const Option = Select.Option;

import * as Actions from "../action/index.js";
import HeaderButton from "../../../common/headerButtons/headerButtons.jsx";
import Card from "./card.jsx";
import LessCard from "./lessCard.jsx";
import MoreCard from "./moreCard.jsx";

import "./index.less";
import "assets/stylesheet/all/iconfont.css";

class Contacts extends React.Component {
    constructor(props) {
        super(props);
        this.columns = [
            {
                title: "姓名",
                dataIndex: "name"
            },
            {
                title: "客户",
                dataIndex: "customer"
            },
            {
                title: "部门",
                dataIndex: "deptId"
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
            //存放编辑数据
            editData: [],
            //上方条件选择保存更多状态
            more: false
        };

        this.onSelectChange = (selectedRowKeys, selectedRows) => {
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

    //头部按钮层返回按钮方法
    headerBack() {
        this.props.action.selectData([]);
    }

    //modal点击确定按钮
    handleOk() {
        let { pagination, searchMap } = this.state; //获取分页信息
        this.formRef.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                if (values.id) {
                    this.props.action.onEdit(values, pagination, searchMap);
                } else {
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
        this.setState({
            editData: {}
        });
        this.props.action.showForm(true);
    }

    //删除按钮
    onDelete() {
        let selectedRowKeys = this.props.$$state.toJS().editData[
            "selectedRowKeys"
        ];
        let { pagination, searchMap } = this.state; //获取分页信息
        this.props.action.onDelete(selectedRowKeys, pagination, searchMap);
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
        let selectedRowKeys = this.props.$$state.toJS().editData[
            "selectedRowKeys"
        ];
        let resultNew = this.props.$$state.toJS().data.data;
        resultNew = resultNew.filter(item => {
            return item.id == selectedRowKeys[0];
        });

        let newObj = {};
        for (var key in resultNew[0]) {
            if (key == "id") {
                newObj[key] = resultNew[0][key];
            } else if (key == "name") {
                newObj[key] = resultNew[0][key];
            } else if (key == "customer") {
                newObj[key] = resultNew[0][key];
            } else if (key == "ownerUserId") {
                newObj[key] = resultNew[0][key];
            } else if (key == "mainContact") {
                newObj[key] = resultNew[0][key];
            } else if (key == "deptId") {
                newObj[key] = resultNew[0][key];
            } else if (key == "post") {
                newObj[key] = resultNew[0][key];
            } else if (key == "mobile") {
                newObj[key] = resultNew[0][key];
            } else if (key == "officePhone") {
                newObj[key] = resultNew[0][key];
            } else if (key == "email") {
                newObj[key] = resultNew[0][key];
            } else if (key == "remarks") {
                newObj[key] = resultNew[0][key];
            }
        }
        this.setState(
            {
                editData: newObj
            },
            () => {
                this.props.action.showForm(true);
            }
        );
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
                } else if (key == "customer") {
                    obj.customer = item[key];
                } else if (key == "deptId") {
                    obj.deptId = item[key];
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
        //获取页面是否折叠
        const collapse = this.props.$$stateComponent.get("collapsed");
        //列表loading
        const loading = this.props.$$state.get("loading");
        //modal显示
        const visible = this.props.$$state.get("visible");
        //获取列表信息
        let result = this.props.$$state.toJS();
        //获取列表所需字段
        let data;
        if (result.data.data) {
            data = this.changeValue.call(this, result.data.data);
        }
        //新建表单
        const ContactsForm = Form.create({})(Card);
        //查询列表头部简单搜索表单
        const ContactLessForm = Form.create({})(LessCard);
        //查询列表头部负载搜索表单
        const ContactMoreFrom = Form.create({})(MoreCard);
        //获取已列表选择keys
        let selectedRowKeys = this.props.$$state.toJS().editData[
            "selectedRowKeys"
        ];
        //获取已选择列表数据
        let selectData = this.props.$$state.toJS().editData["selectedRows"];
        //选择每行列表数据时的方法
        let rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange
        };

        return (
            <div className="crm-container">
                <div className="contacts-warpper">
                    {selectData && selectData.length ? (
                        <HeaderButton
                            length={selectData.length}
                            goBack={this.headerBack.bind(this)}
                        >
                            <Button onClick={this.onDelete.bind(this)}>
                                <i className="iconfont icon-shanchu" />删除
                            </Button>
                            {selectData.length == 1 ? (
                                <Button onClick={this.onEdit.bind(this)}>
                                    <i className="iconfont icon-bianji" />编辑
                                </Button>
                            ) : (
                                ""
                            )}
                            <Button>刷新</Button>
                        </HeaderButton>
                    ) : (
                        <div className="crm-container-header">
                            <Row>
                                <Col span={18}>
                                    <Row type="flex" gutter={15} align="middle">
                                        <div>
                                            <Select defaultValue="全部">
                                                <Option value="1">我关注</Option>
                                                <Option value="2">最近创建</Option>
                                                <Option value="3">最近查看</Option>
                                                <Option value="4">一周末跟进</Option>
                                            </Select>
                                        </div>
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
                                                <div>
                                                    <Dropdown
                                                        overlay={this.menu}
                                                        trigger={["click"]}
                                                    >
                                                        <Button>
                                                            更多
                                                            <Icon type="down" />
                                                        </Button>
                                                    </Dropdown>
                                                </div>
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
                    <div style={{ background: "white" }}>
                        <Table
                            size="middle"
                            columns={this.columns}
                            dataSource={data}
                            rowKey="id"
                            rowSelection={rowSelection}
                            loading={loading}
                            pagination={{
                                size: "large",
                                showSizeChanger: true,
                                showQuickJumper: true,
                                total: result.data.total,
                                showTotal: this.showTotal,
                                onChange: this.onPageChange.bind(this),
                                onShowSizeChange: this.onPageSizeChange.bind(
                                    this
                                )
                            }}
                        />
                    </div>
                </div>
                <Modal
                    title={this.state.editData.id ? "修改联系人" : "新增联系人"}
                    visible={visible}
                    onOk={this.handleOk.bind(this)}
                    onCancel={this.handleCancel.bind(this)}
                    width={815}
                >
                    <div className="modal-height">
                        <ContactsForm
                            dataSource={this.state.editData}
                            wrappedComponentRef={inst => (this.formRef = inst)}
                        />
                    </div>
                </Modal>
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
