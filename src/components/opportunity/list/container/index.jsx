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
import ViewPanel from "./ViewPanel";
import DetailTable from "./DetailTable";
import Funnel from "./Funnel.jsx"
import "./index.less";
import "assets/stylesheet/all/iconfont.css";

class List extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isEdit: false
        };

        this.columns = [
            {
                title: "商机名称",
                dataIndex: "name",
                render: (text, record) => (
                    <a onClick={this.btnView.bind(this, record)}>
                        {" "}
                        {record.name}
                    </a>
                )
            },
            {
                title: "客户名称",
                dataIndex: "customerId"
            },
            {
                title: "商机类型",
                dataIndex: "type"
            },
            {
                title: "销售阶段",
                dataIndex: "saleStage"
            },
            {
                title: "停留时间",
                dataIndex: "stageResidenceTime"
            },
            {
                title: "赢单概率",
                dataIndex: "winProbability"
            },
            {
                title: "预计成交金额",
                dataIndex: "expectSignMoney"
            },
            {
                title: "预计成交时间",
                dataIndex: "expectSignTime"
            },
            {
                title: "负责人",
                dataIndex: "ownerUserId"
            }
        ]

        const that = this;
        this.onSelectChange = (selectedRowKeys, selectedRows) => {
            this.props.action.selectRow(selectedRows, selectedRowKeys);
        };
    }

    componentDidMount() {
        this.props.action.getListData(this.props.$$state.get("pagination").toJS());
        this.props.action.getbiztype();
    }

    //保存按钮事件
    formHandleOk() {
        const isEdit = this.props.$$state.get("isEdit");
        const editData = this.props.$$state.get("editData").toJS();
        const oppBList = this.props.$$state.get("oppBList").toJS();
        editData.childList = oppBList;
        if (isEdit) {
            this.props.action.listEditSave(data);
        } else {
            this.props.action.listAddSave(editData);
        }

    }

    //编辑页面关闭事件
    formHandleCancel() {
        this.props.action.showFormNew(false,{});
    }

    //点击查看按钮打开查看页面
    btnView(record) {
        this.props.action.showViewForm(true, record);
    }

    //批量删除
    btnDeleteList() {
        const searchMap = this.props.$$state.get("searchMap").toJS();
        const selectedRowKeys = this.props.$$state.get("selectedRowKeys").toJS();
        const pagination = this.props.$$state.get("pagination").toJS()
        this.props.action.deleteData(selectedRowKeys, searchMap, pagination);
    }

    btnClosePanel() {
        this.props.action.closePanel();
    }

    showTotal(total) {
        return `共 ${total} 条`;
    }

    onPageChange(page, pageSize) {
        let searchMap = this.props.$$state.get("searchMap").toJS()
        let pagination = this.props.$$state.get("pagination").toJS()
        //可能有问题
        pagination = { page: page, pageSize: pageSize };
        this.props.action.getListData(pagination, searchMap);
    }
    onPageSizeChange(current, pageSize) {
        let searchMap = this.props.$$state.get("searchMap").toJS()
        let pagination = this.props.$$state.get("pagination").toJS()
        pagination = { page: pagination.page, pageSize: pageSize };
        this.props.action.getListData(pagination, searchMap);
    }
    render() {
        const { $$state } = this.props;
        const page = $$state.get("data").toJS();
        const editData = $$state.get("editData").toJS();
        const selectedRows = $$state.get("selectedRows").toJS();
        const selectedRowKeys = $$state.get("selectedRowKeys").toJS();
        const searchMap = $$state.get("searchMap").toJS();
        const formVisible = $$state.get("formVisitable");
        const viewFormVisible = $$state.get("viewFormVisible");
        const h = this.props.$$stateCommon.toJS().height - 90;
        const isEdit = this.props.$$state.get('isEdit');
        let rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange
        };
        return (
            <div className="custom-warpper" style={{ height: h + "px" }}>
                <ToolForm />
                <div className="custom-tabel">

                    <Row>
                        <Col span={16}>
                            <Table
                                columns={this.columns}
                                dataSource={page.data}
                                rowKey="id"
                                rowSelection={rowSelection}
                                size="middle"
                                pagination={{ size: "large", showSizeChanger: true, showQuickJumper: true, total: page.total, showTotal: this.showTotal, onChange: this.onPageChange.bind(this), onShowSizeChange: this.onPageSizeChange.bind(this) }}

                            />
                        </Col>
                        <Col span={8}>
                            <Funnel />
                        </Col>
                    </Row>
                </div>

                <Modal
                    title={isEdit ? "编辑商机" : "新增商机"}
                    visible={formVisible}
                    onOk={this.formHandleOk.bind(this)}
                    onCancel={this.formHandleCancel.bind(this)}
                    width="50%"
                    maskClosable={false}
                >
                    <div className="model-height">
                        <Card
                            wrappedComponentRef={inst => (this.formRef = inst)}
                            enumData={enumData}
                        />
                        <DetailTable />
                    </div>
                </Modal>

                <div
                    className={
                        viewFormVisible
                            ? "viewPanel viewShow"
                            : "viewPanelFalse viewHide"
                    }
                >
                    <ViewPanel
                        data={editData}
                        btnClosePanel={this.btnClosePanel.bind(this)}
                        ref="panelHeight"
                    />
                </div>


            </div>
        );
    }
}
//绑定状态到组件props
function mapStateToProps(state, ownProps) {
    return {
        $$state: state.opportunityList,
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
