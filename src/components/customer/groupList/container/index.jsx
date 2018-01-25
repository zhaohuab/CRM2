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
                            <div className='cum-color'>
                                <span>{record.name}</span>
                                {
                                    record.isGroup =='2'?
                                    <i className="iconfont icon-jituan-icon-" />
                                    :''
                                }
                            </div>
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
                dataIndex: "address"
            }
        ];
        const that = this;

        this.onSelectChange = (selectedRowKeys) => {
            this.props.action.selectedRowKeys(selectedRowKeys);
        };
    }
    //改变编辑状态
    changeState(visiable) {
        this.props.action.changeStateFn(visiable);
    }

    //显示面板
    slideShow(record) {
        this.props.action.showViewForm(true, record.id);
    }
    //隐藏面版
    slideHide() {
        //关闭面板清空数据
        this.props.action.hideViewForm(false);
    }

    //上传数据时，各种参照的数据转换
    trancFn(data) {
        debugger
        //行业
        if (data.industry && data.industry.id) {
            data.industry = data.industry.id;
        } else {
            data.industry = "";
        }
        //上级客户
        if (data.parentId) {
            data.parentId = data.parentId.id;
        }
        //城市
        if (data.province_city_district) {
            let change = data.province_city_district.result;
            data.province = change[0];
            data.city = change[1];
            data.district = change[2];
            data.province_city_district = "";
        }
        //详细地址
        if (data.address) {
            let value = data.address;
            data["address"] = value.address;
            data["latlng"] = value.latlng;
        }

        if(data.ownerUserId){
            let ownerUserId = data.ownerUserId.id;
            delete data.ownerUserId
            data.salesVOs = [{ownerUserId}]
        }

        if(data.level){
            data.level=data.level.key
        }

        if(data.type){
            data.type=data.type.key
        }

        if(data.cannelType){
            data.cannelType=data.cannelType.key
        }
        debugger
        return data;
    }

    //form新增、或者修改
    formHandleOk() {
        let { viewData } = this.props.$$state.toJS();
        this.formRef.props.form.validateFields((err, value) => {
            debugger
            if (!err) {
                let values = this.trancFn(viewData);
                debugger
                if (values.id) {//修改
                    this.props.action.listEditSave(values);
                } else {//新增
                    this.props.action.listAddSave(values);
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

    //切换面板中tab标题替换
    tabTitle(index) {
        let str = ["icon-liebiao", "icon-ditu1", "icon-zhuangtai1"];
        let className = [
            "tab-change-item grey",
            "tab-change-item green",
            "tab-change-item tab-blue"
        ];
        return (
            <div className={className[index]}>
                <i className={"iconfont " + str[index]} />
            </div>
        );
    }
    btnNew(){
        this.props.action.addCustomer(true);
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
        let {
            selectedRows,
            selectedRowKeys,
            formVisitable,
            viewState,
            viewData,

            tableLoading
        } = this.props.$$state.toJS();

        let rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange
        };
        return (
            <div className="custom-warpper ">
                <TopSearchForm btnNew={this.btnNew.bind(this)}/>
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
