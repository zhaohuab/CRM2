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
import SlidePanel from "../../../common/slidePanel/index.jsx";

class List extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            classStyle: [],
            viewState: false
        };
        this.columns = [
            {
                title: "客户名称",
                dataIndex: "name",
                render: (text, record) => (
                    <div
                        onClick={this.slideShow.bind(this, record)}
                        className="crm-pointer"
                    >
                        {record.name}
                    </div>
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
            debugger;
            this.props.action.selectRow(selectedRows, selectedRowKeys);
        };
    }

    //显示面板
    slideShow(record) {
        debugger;
        this.props.action.showViewForm(true, record);
    }
    //隐藏面版
    slideHide() {
        debugger;
        this.props.action.showViewForm(false, {});
    }

    //form新增、或者修改
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

    //form取消
    formHandleCancel() {
        this.props.action.showForm(false);
    }

    showTotal(total) {
        return `共 ${total} 条`;
    }
    onPageChange(page, pageSize) {
        let pagination = { page: page, pageSize: pageSize };
        this.props.action.getListData(
            pagination,
            this.props.$$state.get("searchMap").toJS()
        );
    }
    onPageSizeChange(current, pageSize) {
        let pagination = { page: current, pageSize: pageSize };
        this.props.action.getListData(
            pagination,
            this.props.$$state.get("searchMap").toJS()
        );
    }

    componentDidMount() {
        this.props.action.getListData(
            this.props.$$state.get("pagination").toJS()
        );
        this.props.action.getEnumData();
    }

    render() {
        const { $$state } = this.props;
        const page = $$state.get("data").toJS();
        debugger;
        const {
            selectedRows,
            selectedRowKeys,
            formVisitable,
            isEdit,
            viewState
        } = this.props.$$state.toJS();

        let rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange
        };

        const CardForm = Form.create()(Card);

        return (
            <div className="custom-warpper">
                <ToolForm
                    visible={selectedRowKeys}
                    enumData={enumData}
                    cityData={cityData}
                />
                <div className="table-bg tabel-recoverd">
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
                    width={900}
                >
                    <div className="modal-height">
                        <CardForm
                            wrappedComponentRef={inst => (this.formRef = inst)}
                            enumData={enumData}
                            cityData={cityData}
                        />
                    </div>
                </Modal>
                <SlidePanel
                    viewState={viewState}
                    onClose={this.slideHide.bind(this)}
                >
                    <ViewPanel ref="panelHeight" />
                </SlidePanel>
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
