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

import * as Actions from "../action/index.js";
import HeaderButton from "../../../common/headerButtons/headerButtons.jsx";
import Card from "./card.jsx";
import LessCard from "./lessCard.jsx";
import MoreCard from "./moreCard.jsx";
import SlidePanel from "../../../common/slidePanel/index.jsx";
import PanelView from "./panel.jsx";
import Tags from "./tags.jsx";
import CustomTags from "./custom-tags.jsx";

import "./index.less";
import "assets/stylesheet/all/iconfont.css";

class Contacts extends React.Component {
    constructor(props) {
        super(props);
        this.columns = [
            {
                title: "姓名",
                dataIndex: "name",
                render: text => {
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
            more: false,
            viewState: false,
            hasPanel: false
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

    //点击姓名出侧滑面板
    slideShow() {
        if (!this.state.hasPanel) {
            this.setState({
                hasPanel: true
            });
        }
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
        let hobby = this.refs.hobby.result();
        let role = this.refs.role.result();
        let attitude = this.refs.attitude.result();

        let change = values => {
            values.hobby = hobby;
            values.role = role;
            values.attitude = attitude;
            return values;
        };
        this.formRef.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                if (values.id) {
                    values = change(values);
                    debugger;
                    this.props.action.onEdit(values, pagination, searchMap);
                } else {
                    values = change(values);
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
        this.setState({
            editData: { mainContact: 1 }
        });
        this.props.action.addPerson(true);
        //this.props.action.showForm(true);
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
        debugger;

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
        //获取存在redux中保存的固定值的值 与 点击编辑获取的标签值进行对比，把redux中的值改为编辑中为true的
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
        let { data, visible, loading, tags } = this.props.$$state.toJS();

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
        } = this.props.$$state.toJS().editData;

        let rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange
        };

        const roleData = tags.role;
        const attitudeData = tags.attitude;
        const hobbyData = tags.hobby;

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
                    <div className="tabel-bg">
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
                        title={this.state.editData.id ? "修改联系人" : "新增联系人"}
                        visible={visible}
                        onOk={this.handleOk.bind(this)}
                        onCancel={this.handleCancel.bind(this)}
                        width={900}
                        maskClosable={false}
                    >
                        <div className="modal-height">
                            <ContactsForm
                                dataSource={this.state.editData}
                                wrappedComponentRef={inst =>
                                    (this.formRef = inst)}
                            />
                            <div className="card-header-title">
                                标签
                                <i className="iconfont icon-xiajiantou-lanse" />
                            </div>
                            <Row>
                                <Col push={2} span={20}>
                                    <Row
                                        type="flex"
                                        className="contact-tag-warrper"
                                        gutter={15}
                                    >
                                        <Col span={3}>角色</Col>
                                        <Col span={21}>
                                            <Tags
                                                dataSource={roleData}
                                                ref="role"
                                            />
                                        </Col>
                                    </Row>
                                    <Row
                                        type="flex"
                                        align="middle"
                                        gutter={15}
                                        className="contact-tag-warrper"
                                    >
                                        <Col span={3}>态度</Col>
                                        <Col span={21}>
                                            <Tags
                                                dataSource={attitudeData}
                                                ref="attitude"
                                            />
                                        </Col>
                                    </Row>
                                    <Row
                                        type="flex"
                                        align="middle"
                                        gutter={15}
                                        className="contact-tag-warrper"
                                    >
                                        <Col span={3}>兴趣爱好</Col>
                                        <Col span={21}>
                                            <CustomTags
                                                dataSource={hobbyData}
                                                flag={this.state.editData.id}
                                                ref="hobby"
                                            />
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
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

//<Tags dataSource={tagData} />
