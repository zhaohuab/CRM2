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
    Timeline,
    Spin 
} from "antd";
const Panel = Collapse.Panel;
const ButtonGroup = Button.Group;
const Option = Select.Option;
const TabPane = Tabs.TabPane;
const confirm = Modal.confirm;
import * as Actions from "../action/index.js";
import HeaderButton from "../../../common/headerButtons/headerButtons.jsx";
import Card from "./card.jsx";
import LessCard from "./lessCard.jsx";
import SlidePanel from "../../../common/slidePanel/index.jsx";
import PanelView from "./panel.jsx";
import getCookie from 'utils/cookie'

import "./index.less";
import "assets/stylesheet/all/iconfont.css";
import data from "../../../role/list/container/data";

class Contacts extends React.Component {
    constructor(props) {
        super(props);
        this.columns = [
            {
                title: "姓名",
                dataIndex: "name",
                render: (text, record)=> {
                    return (
                        <div
                            onClick={this.slideShow.bind(this, record)}
                            className="crm-pointer"
                        >
                            {text}
                        </div>
                    );
                }
            },
            {
                title: "职务",
                dataIndex: "postName"
            },
            {
                title: "客户",
                dataIndex: "customerName"
            },
            {
                title: "部门",
                dataIndex: "deptName"
            },
             {
                title: "电话",
                dataIndex: "mobile"
            },
             {
                title: "邮箱",
                dataIndex: "email"
            },
        ];
        let that = this;

        this.state = {
            //上方条件选择保存更多状态
            more: false,
            viewState: false
        };

        this.onSelectChange = (selectedRowKeys, selectedRows) => {
            this.setState({
                more: false
            });
            this.props.action.selectData({ selectedRows, selectedRowKeys });
        };
    }

    //点击姓名出侧滑面板
    slideShow(record) {
        debugger;
        this.setState({
            viewState: true
        });
        this.props.action.slideShow(record)
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
    modalTranslate(obj) {//保存时转换表单数据格式
        for(let key in obj){
            if(key=='post'){
               // debugger;
                if(obj[key]){
                    obj.postName=obj[key].name;
                    obj[key]=obj[key].id; 
                }          
            }
            if(key=='customer'){
               // debugger;
                if(obj[key]){
                    obj.customerName=obj[key].name;
                    obj[key]=obj[key].id;
                }               
            }
        }
        return obj
    }
    //modal点击确定按钮
    handleOk() {
        let { pagination, searchMap, modalData, nameArr } = this.props.$$state.toJS(); //获取分页信息 
        //let data =this.modalTranslate(modalData); 
      /*   for(let key in data){
            if(key=='customer'){
                data[key]=data[key].vaule.id
            }
        }   */
        //debugger; 
        let role = getCookie();
        modalData.ownerUserId=Number(role.id);
        modalData.deptid=Number(role.deptid)
        
      // debugger;
        this.formRef.props.form.validateFieldsAndScroll((err, values) => {
          
            if (!err) {
               
                if (values.id) {
                  //  debugger;
                    this.props.action.onEdit(nameArr, modalData, pagination, searchMap);
                } else {
                   // debugger;
                    this.props.action.cardSaved(modalData, pagination, searchMap);
                }
            }
        });
    }

    //modal点击取消按钮
    handleCancel() {
        this.props.action.showForm(false);
    }
   //清除表单数据
    clearForm(){
        //debugger
        if(this.formRef){
            this.formRef.props.form.resetFields()
        }
    }

    //新增按钮
    addContacts() {
        this.props.action.edit({}, true);
        this.clearForm();
    }

    //删除按钮
    onDelete() {
        let that = this;
        confirm({
            title: "确定要删除吗?",
            content: "此操作不可逆",
            okText: "是",
            cancelText: "否",
            onOk() {
                let selectedRowKeys = that.props.$$state.toJS().rowKeys[
                    "selectedRowKeys"
                ];
                let { pagination, searchMap } = that.props.$$state.toJS(); //获取分页信息
                that.props.action.onDelete(selectedRowKeys, pagination, searchMap);
            },
            onCancel() {
                console.log("Cancel");
            }
        });
    }

    //分页器显示条数
    showTotal(total) {
        return `共 ${total} 条`;
    }

    //点击分页器页数
    onPageChange(page, pageSize) {
       // debugger;
        let { pagination,searchMap } = this.props.$$state.toJS(); //获取分页信息
        pagination = {
            pageSize,
            page
        };
        this.props.action.getContactList(pagination, searchMap);
    }
    //点击分页器跳转
    onPageSizeChange(current, size) {
        let { pagination, searchMap } = this.props.$$state.toJS(); //获取分页信息
        pagination = {
            pageSize: size,
            page: current
        };
       
        this.props.action.getContactList(pagination, searchMap);
    }

    //点击编辑按钮
    onEdit(flag,slideShowData,e) {
        let id=0;
        if(flag){//如果是详情中的编辑
            //this.props.action.edit(slideShowData, true, 'edit');
            id=slideShowData.id;
        }else{//如果是选择中的编辑
            id= this.props.$$state.toJS().rowKeys["selectedRowKeys"][0]
        };
        let resultNew = this.props.$$state.toJS().data.data;
        resultNew = resultNew.filter(item => {
            return item.id == id;
        });
    
        let newObj = {};
        for (var key in resultNew[0]) {
            newObj[key] = resultNew[0][key];
        }
         debugger;
        this.props.action.edit(newObj, true, 'edit');     
    }

    //获取列表所需展示字段
    changeValue(data) {
        let newDate = [];
        debugger;
        data.forEach(item => {
            let obj = {};
            //debugger;
            for (var key in item) {
                if (key == "id") {
                    obj.id = item[key];
                } else if (key == "name") {
                    obj.name = item[key];
                } else if (key == "customerInfo") {
                    if(item["customerInfo"]!=null)
                        obj.customerName = item["customerInfo"].name;
                    else
                        obj.customerName = "";
                } else if (key == "ownerUserInfo") {
                    if(item["ownerUserInfo"]){
                        obj.deptName = item["ownerUserInfo"].deptName;
                    }else{
                        obj.deptName = "";
                    }
                } else if (key == "role") {
                    obj.role = item[key];
                } else if (key == "postName") {
                    obj.postName = item[key];
                }else if(key=='mobile'){
                    obj.mobile=item[key]
                }else if(key=='email'){
                    obj.email=item[key]
                }
            }
            newDate.push(obj);
        });
       // debugger;
        return newDate;
    }
   
    //页面刚挂在组件方法
    componentDidMount() {
        let { pagination, searchMap } = this.props.$$state.toJS(); //获取分页信息
        this.props.action.getContactList(pagination, searchMap);
    }

    render() {
        let {
            data,
            visible,
            loading,
            tags,
            editData,
            slideShowData,
        } = this.props.$$state.toJS();

        //获取列表所需字段
        let newData;
        if (data.data) {
            newData = this.changeValue.call(this, data.data);
        }
        //新建表单
       //debugger;
        //查询列表头部简单搜索表单
 

        let {
            selectedRowKeys,
            selectedRows
        } = this.props.$$state.toJS().rowKeys;

        let rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange
        };

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
                                <Button onClick={this.onEdit.bind(this,false)}>
                                    <i className="iconfont icon-bianji" />编辑
                                </Button>
                            ) : (
                                ""
                            )}
                        </HeaderButton>
                    ) : (
                        <div className="crm-container-header">
                            <Row>
                                <Col span={18}>
                                    <Row type="flex" gutter={15} align="middle">
                                     
                                        <Col span="21">
                                            <div
                                                className={
                                                    this.state.more
                                                        ? "less-hide-height"
                                                        : "less-show-height"
                                                }
                                            >
                                                <LessCard 
                                                saveSearchMap={this.props.action.saveSearchMap.bind(this)}
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
                                            </Row>
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                        </div>
                    )}
                    <div className="tabel-bg tabel-recoverd">
                        <Table
                            size="middle"
                            columns={this.columns}
                            dataSource={newData}
                            loading={loading}
                            rowKey="id"
                            rowSelection={rowSelection}
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
                        title={editData.id ? "编辑" : "新建"}
                        visible={visible}
                        onOk={this.handleOk.bind(this)}
                        onCancel={this.handleCancel.bind(this)}
                        width={750}
                        maskClosable={false}
                        className='crm-list-card-modal'
                    >
                        <div className="modal-height">
                            <Card
                                dataSource={editData}
                                wrappedComponentRef={inst =>this.formRef = inst}
                            />
                        </div>
                    </Modal>

                    <SlidePanel
                        viewState={this.state.viewState}
                        onClose={this.slideHide.bind(this)}
                    >
                        <PanelView slideShowData={slideShowData} onEdit={this.onEdit.bind(this)}/>
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


