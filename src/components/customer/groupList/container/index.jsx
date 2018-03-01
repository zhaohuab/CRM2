import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as Actions from "../action";
import baseDir from "api";

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
    Tabs
} from "antd";

let Search = Input.Search;
const FormItem = Form.Item;
const ButtonGroup = Button.Group;
const TabPane = Tabs.TabPane;

import Card from "./list/Card";
import ViewPanel from "./panel/ViewPanel";
import TopSearchForm from "./list/TopSearchForm.jsx";
import SlidePanel from "../../../common/slidePanel/index.jsx";
import LeadExport from './lead/LeadExport'; //导入导出


import "./index.less";
import "assets/stylesheet/all/iconfont.css";

class List extends React.Component {
    constructor(props) {
        super(props);        
        this.columns = [
            {
                title: "客户名称",
                dataIndex: "name",
                render: (text, record) => {//isGroup
                    return(
                        <div
                            onClick={this.slideShow.bind(this, record)}
                            className="crm-pointer"
                        >
                            {
                                record.enableState == 1?
                                <span  className='cum-color-blue'>{record.name}</span>:
                                <span  className='cum-color-red'>{record.name}</span>
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
            this.props.action.selectedRowKeys(selectedRowKeys);
        };

         this.state={//-------公司客户中新增控制状态  2-8
            importVisible:false
        }
    }
    //改变编辑状态
    changeState(visiable) {
        this.props.action.changeStateFn(visiable);
    }

    //显示面板
    slideShow(record) {
        this.props.action.showViewForm(true, record.id);
        //获取动态
        this.props.action.getDynamic(record.id)
    }
    
    //隐藏面版
    slideHide() {
        //关闭面板清空数据
        this.props.action.hideViewForm(false);
    }


        //form新增、或者修改
    formHandleOk() {//-----------公司客户中修改过的form表单操作，拷过来
        let { viewData ,icbcSele} = this.props.$$state.toJS();
        for(let key in viewData){
            if(key=='ownerUserId'){
                viewData[key]=viewData[key].id
            }
        }
      //debugger;
        this.formRef.props.form.validateFields((err, value) => {
            //debugger
            if (!err) {
                if (viewData.id) {//修改
                //debugger
                    if(viewData.isIdentified == 1){
                        this.props.action.listFormSave(viewData);
                    }else{
                        if(viewData.verifyFullname){
                            //把verifyId发送给后台进行工商认证标识
                            viewData.verifyId = icbcSele.companyid;
                            //把已认证信息发动给后台
                            viewData.isIdentified = 1
                        }
                        this.props.action.listFormSave(viewData);
                    }
                } else {
                    //debugger
                    //新增如果有获取过公司信息就把公司id和认证发送给后台
                    if(viewData.verifyFullname){
                        //把verifyId发送给后台进行工商认证标识
                        viewData.verifyId = icbcSele.companyid;
                        //把已认证信息发动给后台
                        viewData.isIdentified = 1
                    }
                    //debugger;
                    this.props.action.listFormSave(viewData);
                }
            }
        });
    }



    //清除表单数据
    clearForm(){
        if(this.formRef){
            this.formRef.props.form.resetFields()
        }
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

    onPageChange(page, pageSize) {
        let pagination = { page: page, pageSize: pageSize };
        let searchPlan=this.props.$$state.get("searchPlan").toJS();
        this.props.action.getListData(
            pagination,
            this.props.$$state.get("searchMap").toJS(),
            this.props.$$state.get("searchPlan").toJS()
        );
    }
    onPageSizeChange(current, pageSize) {
        let pagination = { page: current, pageSize: pageSize };
        let {searchPlan}=this.props.$$state.toJS();
        this.props.action.getListData(
            pagination,
            this.props.$$state.get("searchMap").toJS(),
            this.props.$$state.get("searchPlan").toJS()
        );
    }

    componentDidMount() {  
        this.props.action.getInitInquire()
        this.props.action.getEnumData();
       /*  this.props.action.getListData(
            this.props.$$state.get("pagination").toJS()
        )  */
    }

    render() {
        const { $$state } = this.props;
        const page = $$state.get("data").toJS();
        let {
            selectedRows,
            selectedRowKeys,
            formVisitable,
            viewState,
            viewData,
            tableLoading,
            leadVisible,
            leadEndVisible,
            leadingVisible,
            //-----以下三项为公司客户中新增的 2-8
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
                <TopSearchForm clearForm = {this.clearForm.bind(this)}/>
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
        $$state: state.customerGroupList,
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


/* //form新增、或者修改   //-------旧的form表单操作，暂时注掉  2-8
    formHandleOk() {
        let { viewData } = this.props.$$state.toJS();

        this.formRef.props.form.validateFields((err, value) => {
            //debugger
            if (!err) {
                let id = viewData.id
                //debugger
                if (id) {//修改
                    this.props.action.listFormSave(viewData,id);
                } else {//新增
                    this.props.action.listFormSave(viewData);
                }
            }
        });
    } */