import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
    Select,
    Input,
    Form,
    Table,
    Modal,
    Button,
    Icon,
    Row,
    Col
} from "antd";
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
            pagination: {
                pageSize: 20,
                page: 1
            },
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
                title: "地址",
                dataIndex: "address"
            }
        ];
        const that = this;
        this.rowSelectionFn = {
            onChange(selected, selectedRows) {
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
                that.props.action.selectRow(selectedRows, nowVisible);
            }
        };
    }

    changeVisible(visible) {
        const nowVisible = this.props.$$state.get("toolVisible").toJS();
        if (visible.simForm != undefined) {
            nowVisible.simForm = visible.simForm;
            if (nowVisible.btnPanel == true) {
                nowVisible.simForm = false;
            }
        }
        if (visible.milForm != undefined) {
            nowVisible.milForm = visible.milForm;
        }

        this.props.action.changeVisible(nowVisible);
    }

    btnBack() {
        const nowVisible = this.props.$$state.get("toolVisible").toJS();
        nowVisible.btnPanel = false;
        if (nowVisible.milForm == true) {
            nowVisible.simForm = false;
        } else {
            nowVisible.simForm = true;
        }
        this.props.action.changeVisible(nowVisible);
    }

    componentDidMount() {
        this.props.action.getListData(this.state.pagination);
    }
    formHandleOk() {
        this.formRef.props.form.validateFields((err, values) => {
            if (!err) {
                if (this.state.isEdit) {
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

    handleSearch(searchMap) {
        this.props.action.getListData(this.state.pagination, searchMap);
    }

    btnSetEnableList(enableState) {
        const searchMap = this.props.$$state.get("searchMap").toJS();
        const selectRow = this.props.$$state.get("selectedRows").toJS();
        const ids = [];
        for (let i = 0; i < selectRow.length; i++) {
            ids.push(selectRow[i].id);
        }
        this.props.action.setEnableState(
            ids,
            enableState,
            this.state.pagination,
            searchMap
        );
    }

    btnSetEnableView(enableState) {
        const searchMap = this.props.$$state.get("searchMap").toJS();
        const viewData = this.props.$$state.get("viewData").toJS();
        const ids = [];
        ids.push(viewData.id);
        debugger;
        this.props.action.setEnableState(
            ids,
            enableState,
            this.state.pagination,
            searchMap
        );
    }
    btnNew() {
        this.setState({ isEdit: false });
        this.props.action.showForm(true);
    }
    btnView(record) {
        if (!this.state.hasPanel) {
            this.setState({
                hasPanel: true
            });
        }
        this.props.action.showViewForm(true, record);
    }
    btnEdit(data) {
        this.setState({ isEdit: true });
        this.props.action.showFormEdit(true);
    }
    btnDeleteList() {
        const searchMap = this.props.$$state.get("searchMap").toJS();
        const selectRow = this.props.$$state.get("selectedRows").toJS();
        const ids = [];
        for (let i = 0; i < selectRow.length; i++) {
            ids.push(selectRow[i].id);
        }
        this.props.action.deleteData(ids, searchMap, this.state.pagination);
    }
    btnDeleteView() {
        const searchMap = this.props.$$state.get("searchMap").toJS();
        const viewData = this.props.$$state.get("viewData").toJS();
        const ids = [];
        ids.push(viewData.id);
        this.props.action.deleteData(ids, searchMap, this.state.pagination);
    }

    btnClosePanel() {
        this.props.action.closePanel();
    }
    render() {
        const { $$state } = this.props;
        const page = $$state.get("data").toJS();
        const selectedRows = $$state.get("selectedRows").toJS();
        const searchMap = $$state.get("searchMap").toJS();
        const toolVisible = $$state.get("toolVisible").toJS();
        const formVisitable = $$state.get("formVisitable");
        const CardForm = Form.create()(Card);
        const editData = $$state.get("editData").toJS();
        const viewData = $$state.get("viewData").toJS();
        const viewFormVisible = $$state.get("viewFormVisible");
        const h = this.props.$$stateCommon.toJS().height - 90;
        console.log(h, "hhhhhhhhhhhhhhh");
        return (
            <div className="custom-warpper" style={{ height: h + "px" }}>
                <ToolForm
                    visible={toolVisible}
                    btnBack={this.btnBack.bind(this)}
                    btnLess={this.changeVisible.bind(this)}
                    btnMore={this.changeVisible.bind(this)}
                    btnSetEnable={this.btnSetEnableList.bind(this)}
                    handleSearch={this.handleSearch.bind(this)}
                    btnNew={this.btnNew.bind(this)}
                    enumData={enumData}
                    cityData={cityData}
                    searchMap={searchMap}
                    btnDelete={this.btnDeleteList.bind(this)}
                />
                <div className="custom-tabel">
                    <Table
                        columns={this.columns}
                        dataSource={page.data}
                        rowKey="id"
                        rowSelection={this.rowSelectionFn}
                        size="middle"
                    />
                </div>
                <Modal
                    title="增加客户"
                    visible={formVisitable}
                    onOk={this.formHandleOk.bind(this)}
                    onCancel={this.formHandleCancel.bind(this)}
                    width="90%"
                >
                    <div className="model-height">
                        <CardForm
                            wrappedComponentRef={inst => (this.formRef = inst)}
                            data={viewData}
                            isEdit={this.state.isEdit}
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
                        <ViewPanel
                            data={viewData}
                            btnNew={this.btnNew.bind(this)}
                            btnEdit={this.btnEdit.bind(this)}
                            btnClosePanel={this.btnClosePanel.bind(this)}
                            btnSetEnable={this.btnSetEnableView.bind(this)}
                            btnDelete={this.btnDeleteView.bind(this)}
                            ref="panelHeight"
                        />
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
