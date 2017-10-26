import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Select, Input,Form,Table,Modal,Button,Icon,Row,Col} from "antd";
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
import EditPanel from "./EditPanel";
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
            hasPanel: false,
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
    
    formHandleOk(data,isEdit) {
        
        if (isEdit) {
            this.props.action.listEditSave(data);
        } else {
            this.props.action.listAddSave(data);
        }
        
    }
    formHandleCancel() {
        this.props.action.closeForm();
    }

    handleSearch(searchMap) {
        
        this.props.action.getListData(this.state.pagination, searchMap);
    }

   
    btnNew() {
        if (!this.state.hasPanel) {
            this.setState({
                hasPanel: true
            });
        }
        this.setState({ isEdit: false });
        //点击新增时，清除editpanel的列表
        if(this.refs.editPanel){
            this.refs.editPanel.refs.table.setTableData([])
        }
        this.props.action.showNewForm(true);
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
        if (!this.state.hasPanel) {
            this.setState({
                hasPanel: true
            });
        }
        this.setState({ isEdit: true });
        this.refs.editPanel.refs.table.setTableData(this.props.$$state.get("viewData").toJS().childList)
        this.props.action.showEditForm(true);
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


    btnClosePanel() {
        this.props.action.closePanel();
    }

    showTotal(total) {
        return `共 ${total} 条`;
      }
      onPageChange(page,pageSize) {
        let { pagination,searchMap } = this.state;
        //可能有问题
        pagination = {page:page,pageSize:pageSize};
        this.setState({pagination})
        this.props.action.getListData( pagination,searchMap );
      }
      onPageSizeChange(current,pageSize) {
        let { pagination,searchMap } = this.state;
        pagination = {page:pagination.page,pageSize:pageSize};
        this.setState({pagination})
        this.props.action.getListData( pagination,searchMap );
        console.info(`pageSize:${pageSize}`)
      }
    render() {
        const { $$state } = this.props;
        const page = $$state.get("data").toJS();
        const selectedRows = $$state.get("selectedRows").toJS();
        const searchMap = $$state.get("searchMap").toJS();
        const toolVisible = $$state.get("toolVisible").toJS();
        const editFormVisible = $$state.get("formVisitable");
        const CardForm = Form.create()(Card);
        const viewData = $$state.get("viewData").toJS();
        const viewFormVisible = $$state.get("viewFormVisible");
        const h = this.props.$$stateCommon.toJS().height - 90;
        return (
            <div className="custom-warpper" style={{ height: h + "px" }}>
                <ToolForm
                    visible={toolVisible}
                    btnBack={this.btnBack.bind(this)}
                    btnLess={this.changeVisible.bind(this)}
                    btnMore={this.changeVisible.bind(this)}
                   
                    handleSearch={this.handleSearch.bind(this)}
                    btnNew={this.btnNew.bind(this)}
                    enumData={enumData}
                    cityData={cityData}
                    searchMap={searchMap}
                    btnDelete={this.btnDeleteList.bind(this)}
                    selectedData={selectedRows}
                />
                <div className="custom-tabel">
                    <Table
                        columns={this.columns}
                        dataSource={page.data}
                        rowKey="id"
                        rowSelection={this.rowSelectionFn}
                        size="middle"
                        pagination={{size:"large",showSizeChanger:true,showQuickJumper:true,total:page.total,showTotal:this.showTotal,onChange:this.onPageChange.bind(this),onShowSizeChange:this.onPageSizeChange.bind(this)}}
          
                    />
                </div>
               
                {this.state.hasPanel ? (
                    <div>
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
                            
                            ref="panelHeight"
                        />
                    </div>
                    <div
                        className={
                            editFormVisible
                                ? "viewPanel viewShow"
                                : "viewPanelFalse viewHide"
                        }
                    >
                        <EditPanel
                            ref="editPanel"
                            isEdit={this.state.isEdit}
                            data={viewData}
                            btnNew={this.btnNew.bind(this)}
                            btnEdit={this.btnEdit.bind(this)}
                            btnClosePanel={this.btnClosePanel.bind(this)}
                            btnSave={this.formHandleOk.bind(this)}
                        />
                    </div>
                    </div>
                ) : null}
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
