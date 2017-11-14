import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as Actions from "../action";
import {
    Table,
    Modal,
    Button,
    Icon,
    Row,
    Col,
    Input,
    Dropdown,
    Select,
    Menu,
    Form
} from "antd";
const ButtonGroup = Button.Group;
const Option = Select.Option;

import Card from "./card.jsx";
import HeaderButton from "../../../common/headerButtons/headerButtons.jsx";

import "./index.less";
import "assets/stylesheet/all/iconfont.css";

class VisitRoute extends React.Component {
    constructor(props) {
        super(props);
        let that = this;
        this.columns = [
            {
                title: "序号",
                dataIndex: "orderNum"
            },
            {
                title: "拜访路线名称",
                dataIndex: "name"
            },
            {
                title: "负责人",
                dataIndex: "ownerUserId"
            },
            {
                title: "所属部门",
                dataIndex: "deptId"
            },
            {
                title: "覆盖网点数",
                dataIndex: "coverNodeNum"
            }
        ];

        this.onSelectChange = (selectedRowKeys, selectedRows) => {
            this.props.action.selectData({ selectedRowKeys, selectedRows });
        };
        this.state = {
            pagination: {
                pageSize: 10,
                page: 1
            },
            searchMap: {
                enableState: 1
            },
            //上方条件选择保存更多状态
            more: false
        };
        this.menu = (
            <Menu>
                <Menu.Item key="1">导入</Menu.Item>
                <Menu.Item key="2">导出</Menu.Item>
            </Menu>
        );
    }
    //点击分页器页数
    onPageChange(page, pageSize) {
        let { pagination, searchMap } = this.state; //获取分页信息
        pagination = {
            page,
            pageSize
        };
        this.setState({ pagination });
        this.props.action.getVisitrouteList(pagination, searchMap);
    }

    //点击切换显示数据条数
    onPageSizeChange(current, size) {
        let { pagination, searchMap } = this.state; //获取分页信息
        pagination = {
            pageSize: size,
            page: current
        };
        this.setState({ pagination });
        this.props.action.getVisitrouteList(pagination, searchMap);
    }

    //分页器显示条数
    showTotal(total) {
        return `共 ${total} 条`;
    }

    //点击确定按钮
    handleOk() {
        this.formRef.props.form.validateFieldsAndScroll((err, values) => {
            let { pagination, searchMap } = this.state; //获取分页信息

            if (!err) {
                if (values.id) {
                    this.props.action.onEdit(values, pagination, searchMap);
                } else {
                    this.props.action.cardSaved(values, pagination, searchMap);
                }
            }
        });
    }

    //点击取消按钮
    handleCancel() {
        this.props.action.showForm(false);
    }

    //头部编辑层点击返回
    headerBack() {
        this.props.action.selectData({ selectedRowKeys: [], selectedRows: [] });
    }
    //新建路线
    addVisitRoute() {
        this.formRef.props.form.resetFields();
        this.props.action.showForm(true);
    }
    //删除路线
    onDelete() {
        let selectedRowKeys = this.props.$$state.toJS().rowKeys[
            "selectedRowKeys"
        ];
        let { pagination, searchMap } = this.state; //获取分页信息
        this.props.action.onDelete(selectedRowKeys, pagination, searchMap);
    }
    //编辑路线
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
                    obj[key] = item[key];
                } else if (key == "orderNum") {
                    obj[key] = item[key];
                } else if (key == "name") {
                    obj[key] = item[key];
                } else if (key == "ownerUserId") {
                    obj[key] = item[key];
                } else if (key == "deptId") {
                    obj[key] = item[key];
                } else if (key == "coverNodeNum") {
                    obj[key] = item[key];
                }
            }
            newDate.push(obj);
        });
        return newDate;
    }
    //页面刚挂在组件方法
    componentDidMount() {
        let { pagination, searchMap } = this.state; //获取分页信息
        this.props.action.getVisitrouteList(pagination, searchMap);
    }

    render() {
        const { loading, data, visible, editData } = this.props.$$state.toJS();

        let tableData;
        if (data.data) {
            tableData = this.changeValue(data.data);
        }

        //获取已选择的keys,获取已选择的数据data
        let {
            selectedRowKeys,
            selectedRows
        } = this.props.$$state.toJS().rowKeys;

        let rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange
        };
        //创建新增表单
        let VisitCard = Form.create({})(Card);

        return (
            <div className="crm-container">
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
                        <Row type="flex" align="middle">
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

                                    <Col span={6}>
                                        <Input
                                            type="text"
                                            placeholder="查询拜访路线"
                                        />
                                    </Col>
                                </Row>
                            </Col>
                            <Col span={6}>
                                <Row type="flex" justify="end" gutter={15}>
                                    <div>
                                        <Button
                                            type="primary"
                                            onClick={this.addVisitRoute.bind(
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
                    </div>
                )}

                <div style={{ background: "white" }} className="tabel-recoverd">
                    <Table
                        size="middle"
                        columns={this.columns}
                        dataSource={tableData}
                        rowKey="id"
                        loading={loading}
                        rowSelection={rowSelection}
                        pagination={{
                            size: "large",
                            showSizeChanger: true,
                            showQuickJumper: true,
                            total: data.total,
                            showTotal: this.showTotal,
                            onChange: this.onPageChange.bind(this),
                            onShowSizeChange: this.onPageSizeChange.bind(this)
                        }}
                    />
                </div>
                <Modal
                    title={editData.id ? "修改拜访路线" : "新增拜访路线"}
                    visible={visible}
                    onOk={this.handleOk.bind(this)}
                    onCancel={this.handleCancel.bind(this)}
                    width={500}
                >
                    <div className="modal-height">
                        <VisitCard
                            dataSource={editData}
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
            $$state: state.visitroute
        };
    },
    dispatch => {
        return {
            action: bindActionCreators(Actions, dispatch)
        };
    }
)(VisitRoute);
