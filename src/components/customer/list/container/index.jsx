import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Select, Input, Form, Table, Modal, Button, Icon, Row, Col } from "antd";
import ToolForm from "./ButtonTool.jsx";
let Search = Input.Search;
const FormItem = Form.Item;
const ButtonGroup = Button.Group;
import Card from "./card";
//导入action方法
import * as Actions from "../action";
import * as enumData from "./enumdata";
import cityData from "./citydata";
import ViewPanel from "./ViewPanel";
import "./index.less";
import "assets/stylesheet/all/iconfont.css";

class List extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

            classStyle: [],
            hasPanel: false
        };
        this.columns = [
            {
                title: "客户名称",
                dataIndex: "name",
                render: (text, record) => (
                    <a onClick={this.btnView.bind(this, record)}>
                        {" "}
                        {record.name}
                    </a>
                )
            },
            {
                title: "渠道类型",
                dataIndex: "cannelTypeName"
            },
            {
                title: "客户等级",
                dataIndex: "levelName"
            },
            {
                title: "营销区域",
                dataIndex: "saleAreaName"
            },
            {
                title: "行业",
                dataIndex: "industryName"
            },
            {
                title: "状态",
                dataIndex: "enableState"
            },
            {
                title: "地址",
                dataIndex: "address"
            }
        ];
        const that = this;

        this.onSelectChange = (selectedRowKeys, selectedRows) => {
            const nowVisible = that.props.$$state.get("toolVisible").toJS();
            if (selectedRows.length > 0) {
                nowVisible.simForm = false;
                nowVisible.btnPanel = true;
            } else {
                nowVisible.btnPanel = false;
                if (nowVisible.milForm == true) {
                    nowVisible.simForm = false;
                } else {
                    nowVisible.simForm = true;
                }
            }
            this.props.action.selectRow( selectedRows, selectedRowKeys,nowVisible );
        };
    }

    componentDidMount() {
        this.props.action.getListData(this.props.$$state.get("pagination").toJS());
        this.props.action.getEnumData();
    }
    formHandleOk() {
        const isEdit = this.props.$$state.get("isEdit");
        this.formRef.props.form.validateFields((err, values) => {
            if (!err) {
                if (isEdit) {
                    this.props.action.listEditSave(values);
                } else {
                    this.props.action.listAddSave(values);
                }
            }
        });
    }
    formHandleCancel() {
        this.props.action.showForm(false);
    }

    btnView(record) {
        if (!this.state.hasPanel) {
            this.setState({
                hasPanel: true
            });
        }
        this.props.action.showViewForm(true, record);
    }

    showTotal(total) {
        return `共 ${total} 条`;
    }
    onPageChange(page, pageSize) {
        let pagination = { page: page, pageSize: pageSize };
        this.props.action.getListData( pagination, this.props.$$state.get("searchMap").toJS()  );
    }
    onPageSizeChange(current, pageSize) {
        let pagination = { page: current, pageSize: pageSize };
        this.props.action.getListData( pagination, this.props.$$state.get("searchMap").toJS() );
    }
    render() {
        const { $$state } = this.props;
        const page = $$state.get("data").toJS();
        const selectedRows = this.props.$$state.get("selectedRows").toJS();
        const selectedRowKeys = this.props.$$state.get("selectedRowKeys").toJS();
        let rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange
        };
        const searchMap = $$state.get("searchMap").toJS();
        const toolVisible = $$state.get("toolVisible").toJS();
        const formVisitable = $$state.get("formVisitable");
        const CardForm = Form.create()(Card);
        const viewData = $$state.get("viewData").toJS();
        const viewFormVisible = $$state.get("viewFormVisible");
        const isEdit = $$state.get("isEdit");
        const h = this.props.$$stateCommon.toJS().height - 90;
        return (
            <div className="custom-warpper" style={{ height: h + "px" }}>
                <ToolForm
                    visible={toolVisible}
                    enumData={enumData}
                    cityData={cityData}
                />
                <div className="custom-tabel tabel-recoverd">
                    <Table
                        columns={this.columns}
                        dataSource={page.data}
                        rowKey="id"
                        rowSelection={rowSelection}
                        size="middle"
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
                    title={isEdit ? "编辑客户" : "新增客户"}
                    visible={formVisitable}
                    onOk={this.formHandleOk.bind(this)}
                    onCancel={this.formHandleCancel.bind(this)}
                    width="90%"
                >
                    <div className="model-height">
                        <CardForm
                            wrappedComponentRef={inst => (this.formRef = inst)}
                            enumData={enumData}
                            cityData={cityData}
                        />
                    </div>
                </Modal>
                {this.state.hasPanel ? (
                    <div
                        className={
                            viewFormVisible
                                ? "viewPanel viewShow"
                                : "viewPanelFalse viewHide"
                        }
                    >
                        <ViewPanel ref="panelHeight" />
                    </div>
                ) : null}
            </div>
        );
    }
}
//绑定状态到组件props
function mapStateToProps(state, ownProps) {
    return {
        $$state: state.customerList,
        $$stateCommon: state.componentReducer
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
