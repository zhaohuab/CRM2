import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as Actions from "../action";
import {
    Select,
    Input,
    Form,
    Table,
    Modal,
    Button,
    Icon,
    Row,
    Col,
    Tabs,
    message,
    Spin
} from "antd";

let Search = Input.Search;
const FormItem = Form.Item;
const ButtonGroup = Button.Group;
const TabPane = Tabs.TabPane;

import Card from "./list/Card";
import ViewPanel from "./panel/ViewPanel";
import TopSearchForm from "./list/TopSearchForm.jsx";
import SlidePanel from "../../../common/slidePanel/index.jsx";
import LeadStart from "./lead/LeadStart"
import reqwest from "reqwest";
import { baseDir } from "api";
import "./index.less";
import "assets/stylesheet/all/iconfont.css";
import LeadExport from './lead/LeadExport.jsx'; //导入导出
class List extends React.Component {
    constructor(props) {
        super(props);

        this.columns = [
            {
                title: "客户名称",
                dataIndex: "name",
                render: (text, record) => {//isGroup
                    return (
                        <div
                            onClick={this.slideShow.bind(this, record)}
                            className="crm-pointer"
                        >
                            {
                                record.enableState == 1 ?
                                    <span className='cum-color-blue'>{record.name}</span> :
                                    <span className='cum-color-red'>{record.name}</span>
                            }
                        </div>
                    )
                }
            },
            {
                title: "客户类型",
                dataIndex: "typeName"
            },

            {
                title: "客户等级",
                dataIndex: "levelName"
            },
            {
                title: "客户状态",
                dataIndex: "stateName"
            },
            {
                title: "行业",
                dataIndex: "industryName"
            },
            {
                title: "渠道类型",
                dataIndex: "cannelTypeName"
            },
            {
                title: "地址",
                dataIndex: "street"
            }
        ];
        const that = this;

        this.onSelectChange = (selectedRowKeys) => {
            debugger
            this.props.action.selectedRowKeys(selectedRowKeys);
        };
        this.state={
            importVisible:false
        }
    }

    //改变编辑状态
    changeState(visiable) {
        this.props.action.changeStateFn(visiable);
    }

    //显示面板
    slideShow(record) {
        //显示侧滑面板，获取选中客户信息
        this.props.action.showViewForm(true, record.id);
        //获取动态
        this.props.action.getDynamic(record.id)
    }

    //清除表单数据
    clearForm(){
        if(this.formRef){
            this.formRef.props.form.resetFields()
        }
    }

    //隐藏面版
    slideHide() {
        //关闭面板清空数据
        this.props.action.hideViewForm(false);
    }

    //form新增、或者修改
    formHandleOk() {
        let { viewData,newType } = this.props.$$state.toJS();
        for(let key in viewData){
            if(key=='ownerUserId'){
                viewData[key]=viewData[key].id
            }
        }
        console.log('viewData============',viewData)
        this.formRef.props.form.validateFields((err, value) => {
            debugger
            if (!err) {
                if (viewData.id) {//修改
                    this.props.action.listFormSave(viewData);
                } else {//新增
                    this.props.action.listFormSave(viewData,newType.key);
                }
            }
        });
    }

    //form取消
    formHandleCancel() {
        this.props.action.showForm(false);
    }

    //保存修改、编辑等动作后，把修改的值保存在redux中
    editCardFn(changeData) {
        this.props.action.editCardFn(changeData);
    }

    //分页方法
    showTotal(total) {
        return `共 ${total} 条`;
    }

    //点击分页
    onPageChange(page, pageSize) {
        let pagination = { page: page, pageSize: pageSize };
        this.props.action.getListData(
            pagination,
            this.props.$$state.get("searchMap").toJS()
        );
    }

    //点击分页跳转
    onPageSizeChange(current, pageSize) {
        let pagination = { page: current, pageSize: pageSize };
        this.props.action.getListData(
            pagination,
            this.props.$$state.get("searchMap").toJS()
        );
    }

    componentDidMount() {
        let {pagination} =  this.props.$$state.toJS()
        //获取列表数据
        this.props.action.getListData( pagination );
        //获取查询条件、查询方案预置信息
        this.props.action.getEnumData();
    }

    render() {
        const { $$state } = this.props;
        const page = $$state.get("data").toJS();
        let {
            selectedRowKeys,
            formVisitable,
            viewState,
            viewData,
            tableLoading,
            leadVisible,
            leadEndVisible,
            leadingVisible,
            viewLeadVisible,
            pagination,
            searchMap

        } = this.props.$$state.toJS();
        let rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange
        };
        return (
            <div className="custom-warpper ">
                <TopSearchForm 
                pagination={pagination}
                searchMap={searchMap}

                clearForm = {this.clearForm.bind(this)}/>
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
                            onShowSizeChange: this.onPageSizeChange.bind(
                                this
                            )
                        }}
                        loading={tableLoading}
                    />
                </div>
                <Modal
                    title={viewData.id ? "编辑客户" : "新增客户"}
                    visible={formVisitable}
                    onOk={this.formHandleOk.bind(this)}
                    onCancel={this.formHandleCancel.bind(this)}
                    width={900}
                    maskClosable={false}
                    className='crm-list-card-modal'
                >
                    <div className="modal-height">
                        <Card
                            wrappedComponentRef={inst => (this.formRef = inst)}
                            editCardFn={this.editCardFn.bind(this)}
                            changeState={this.changeState.bind(this)}
                        />
                    </div>
                </Modal>
                <SlidePanel
                    viewState={viewState}
                    onClose={this.slideHide.bind(this)}
                    className='tab-viewPanel-recoverd'
                >
                    <ViewPanel ref="panelHeight" />
                </SlidePanel>
                <LeadExport/>
            </div>

        );
    }
}
//绑定状态到组件props
function mapStateToProps(state, ownProps) {
    return {
        $$state: state.customerList,
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
