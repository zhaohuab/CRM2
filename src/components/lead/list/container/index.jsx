import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { Select, Dropdown, Menu, Table, Button, Icon, Row, Col, Modal, Form, Tabs, Collapse } from "antd";
import './index.less';
const Panel = Collapse.Panel;
const ButtonGroup = Button.Group;
const Option = Select.Option;
const TabPane = Tabs.TabPane;
const confirm = Modal.confirm;
import Immutable from "immutable";
import HeaderButton from "../../../common/headerButtons/headerButtons.jsx";

//编辑，修改信息
import Card from "./Card.jsx";
import NewCart from './CardNew.jsx'
import LessForm from "./LessForm.jsx";
import MoreForm from "./MoreForm.jsx";
//点击滑出详情信息
import SlidePanel from "../../../common/slidePanel/index.jsx";
import ViewPanel from "./ViewPanel";
import "assets/stylesheet/all/iconfont.css";
import * as Actions from '../action';
import AssignLead from './AssignLead';
import LeadExport from './lead/LeadExport.jsx'; //导入导出

class Clue extends React.Component {
    constructor(props) {
        super(props);

        this.columns = [
            {
                title: "主题",
                dataIndex: "title",
                render: (text, record) => (
                    <div className="crm-pointer title-color"
                        onClick={this.slideShow.bind(this, record)}
                    >
                        {record.title}
                    </div>
                )
            },
            {
                title: "联系人",
                dataIndex: "name"
            },
            {
                title: "公司名称",
                dataIndex: "companyName"
            },
            {
                title: "线索来源",
                dataIndex: "sourceName"
            },
            {
                title: "职务",
                dataIndex: "postName"
            },
            {
                title: "手机",
                dataIndex: "mobile"
            },
            {
                title: "客户规模",
                dataIndex: "cumSizeSum",
                render: (text, record) => (
                    <div>
                        {record.cumSizeSum ? record.cumSizeSum + '人' : ''}
                    </div>
                )
            },
            {
                title: "线索状态",
                dataIndex: "stateName"
            },
            {
                title: "分派时间",
                dataIndex: "assignTime"
            },
            {
                title: "反馈结果",
                dataIndex: "feedback"
            },
            {
                title: "负责人",
                dataIndex: "ownerUserName",
               
            },
            {
                title: "部门",
                dataIndex: "ownerDeptName",
            }
        ]
        const that = this;
        this.onSelectChange = (selectedRowKeys, selectedRows) => {
            //debugger;
            this.props.action.selectClue(selectedRows, selectedRowKeys);
        };
        this.menu = (
            <Menu>
                <Menu.Item key="1">导入</Menu.Item>
                {/* <Menu.Item key="2">导出</Menu.Item> */}
            </Menu>
        );
        this.state = {
            pagination: {
                pageSize: 10,
                page: 1
            }
        }
    }
    //显示面板
    slideShow(record) {
        debugger
        this.props.action.showViewForm(true, record.id);
       this.props.action.getDynamic(record.id)
    }
    //隐藏面版
    slideHide() {
        //关闭面板清空数据
        this.props.action.hideViewForm(false);
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

    //上下查询表单控制显隐
    formMore() {
        this.props.action.formMore();
    }
    //扩展条件、基础条件查询
    handleSearch(searchMap) {
        debugger;
        // if (searchMap.industry) {
        //     searchMap.industry = searchMap.industry.id;
        // }

        this.props.action.getListData(
            this.props.$$state.get("pagination").toJS(),
            searchMap
        );
    }

    //存储查询条件
    searchMapFn(searchMap) {
        this.props.action.saveSearchMap(searchMap);
    }

    //点击删除按钮，删除数据
    onDelete() {
        let that = this;
        confirm({
            title: "确定要删除吗?",
            content: "此操作不可逆",
            okText: "是",
            okType: "danger",
            cancelText: "否",
            onOk() {
                //debugger;
                const searchMap = that.props.$$state.get("searchMap").toJS();
                const selectRow = that.props.$$state.get("selectedRows").toJS();
                const ids = [];
                for (let i = 0; i < selectRow.length; i++) {
                    ids.push(selectRow[i].id);
                }
                that.props.action.deleteData(
                    ids,
                    searchMap,
                    that.props.$$state.get("pagination").toJS()
                );
            },
            onCancel() {
                console.log("Cancel");
            }
        });
    }

    //上传数据时，各种参照的数据转换
    trancFn(data) {
        //城市
        if (data.province_city_district) {
            let change = data.province_city_district;
            data.province = change[0];
            data.city = change[1];
            data.district = change[2];
            data.province_city_district = '';
        }
        return data
    }

    //modal点击确定按钮
    onOk() {
        debugger;
        this.formRef.props.form.validateFieldsAndScroll((err, values) => {//取值
            debugger;
            if (!err) {
                values = this.trancFn(values);
                this.props.action.listFormSave(values);
                // if (values.id) {
                //     // debugger;
                //     this.props.action.onEdit(values);
                // } else {
                //     debugger;
                //     this.props.action.onSave(values);
                // }
            }
        });

    }

    //modal 点击取消
    onCancel() {
        //debugger
        this.props.action.showForm(false);
    }


    //选中一条数据 点击编辑按钮
    onEdit() {
        //debugger
        let selectedRowKeys = this.props.$$state.toJS().selectedRowKeys;
        let resultNew = this.props.$$state.toJS().data.data;
        //debugger
        resultNew = resultNew.filter(item => {
            return item.id == selectedRowKeys[0];
        });

        this.props.action.edit(resultNew[0], true);
    }
    //新建一条线索
    newClue() {
        debugger
        this.props.action.addClue(true);
    }
    //头部按钮层返回按钮方法
    headerBack() {
        this.props.action.selectClue([]);
    }
    componentDidMount() {
        this.props.action.getListData(
            this.props.$$state.get("pagination").toJS()
        );
        this.props.action.getEnumData();
    }

    //点击停用启用
    btnSetEnable(enableState) {
        debugger
        let { searchMap, selectedRowKeys, pagination } = this.props.$$state.toJS()
        const ids = selectedRowKeys.join(',');

        this.props.action.setEnableState(
            ids,
            enableState, //获取起停用数字
            pagination,
            searchMap //查询条件
        );
    }
    //分配按钮
    assigin() {
        this.props.action.assiginLead(true)
        this.props.action.assignListData(
            this.props.$$state.get("assignPagination").toJS(),
            '');
    }
    // 头部筛选我负责查询
    onHandleChange(value) {
        let {searchMap}=this.props.$$state.toJS();
        searchMap.option=value;
        this.props.action.getListData(
            this.props.$$state.get("pagination").toJS(),searchMap
        );
    }

 // 导入导出 余春梅  1.30
 onMenu(e) {
    
    // let { searchMap, pagination } = this.props.$$state.toJS();
    // let page = pagination.page;
    // let pageSize = pagination.pageSize
    // let tranSearch=this.changeSearchData.call(this,searchMap);
    // let search = JSON.stringify(tranSearch)
    debugger
    if (e.key == "1") {
        debugger
        this.props.action.viewLeadShow(true);
    } else if (e.key == "2") {
      //  location.href = baseDir + "tpub/excels/1/export?param=" + "{\"page\":" + `${page}` + ",\"pageSize\":" + `${pageSize}` + ",\"searchMap\":" + `${search}` + ",\"mode\":" + 2 + "}"

    }
}


    render() {
        debugger;
        const page = this.props.$$state.get("data").toJS();
        let {
            editData,
            visible,
            viewState,
            moreShow
        } = this.props.$$state.toJS();

        //debugger;
        let {
           selectedRowKeys,
            selectedRows
        } = this.props.$$state.toJS();

        let rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange
        };
        const moreMenu = (
            <Menu onClick={this.onMenu.bind(this)}>
                <Menu.Item key="1">
                    <span>导入</span>
                </Menu.Item>
                {/* <Menu.Item key="2">
                    <span>导出</span>
                </Menu.Item> */}
            </Menu>
        );

        return (
            <div className="clue-warpper">

                <Row className="header-warpper">
                    {selectedRowKeys && selectedRowKeys.length ? (
                        <HeaderButton
                            length={selectedRowKeys.length}
                            goBack={this.headerBack.bind(this)}
                        >
                            {selectedRowKeys.length == 1 ? (
                                <Button onClick={this.onEdit.bind(this)}>
                                    <i className="iconfont icon-bianji" />编辑
                                </Button>
                            ) : (
                                    ""
                                )}

                            <Button onClick={this.assigin.bind(this)}>
                                <i className="iconfont icon-xiansuofenpei" />线索分配
                        </Button>
                            <Button onClick={this.onDelete.bind(this)}>
                                <i className="iconfont icon-shanchu" />删除
                        </Button>
                            {/* <ButtonGroup className="returnbtn-class">
                                <Button onClick={this.btnSetEnable.bind(this, 1)} className="customer_list_start_customer">
                                    <i className="iconfont icon-qiyong" />启用
                            </Button>
                                <Button onClick={this.btnSetEnable.bind(this, 2)} className="customer_list_stop_customer">
                                    <i className="iconfont icon-tingyong" />停用
                            </Button>
                            </ButtonGroup> */}
                        </HeaderButton>
                    ) : (
                            <Row>
                                <Row
                                    type="flex"
                                    align="middle"
                                    justify="space-between"
                                    className="header-top"
                                >
                                    <Col span={18}>
                                        <Row type="flex" align="middle">
                                            <Col className="select-recover">
                                                <Select defaultValue="我负责" onChange={this.onHandleChange.bind(this)}>
                                                    <Option value="0">全部</Option>
                                                    <Option value="1">待分配线索</Option>
                                                    <Option value="2">已分配线索</Option>
                                                    <Option value="3">成功转化</Option>
                                                    <Option value="4">我负责</Option>
                                                    <Option value="5">失败关闭</Option>
                                                </Select>
                                            </Col>
                                            <Col span="21">
                                                <div
                                                    className={
                                                        moreShow
                                                            ? "less-hide-height"
                                                            : "less-show-height"
                                                    }
                                                >
                                                    <LessForm
                                                        handleSearch={this.handleSearch.bind(
                                                            this
                                                        )} //点击查询方法
                                                        searchMapFn={this.searchMapFn.bind(
                                                            this
                                                        )} //动态赋值查询条件到redux中
                                                        formMore={this.formMore.bind(
                                                            this
                                                        )} //控制查询显隐
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

                                                >
                                                    <div>
                                                        <Button
                                                            type="primary"
                                                            onClick={this.newClue.bind(
                                                                this
                                                            )}
                                                        >
                                                            <i className="iconfont icon-xinjian" />新建
                                                    </Button>
                                                    </div>
                                                    <div>
                                                        <Dropdown.Button
                                                            overlay={moreMenu}
                                                            trigger={["click"]}
                                                        >
                                                            更多
                                                        </Dropdown.Button>
                                                    </div>
                                                </Row>
                                            </Col>
                                        </Row>
                                    </Col>
                                </Row>
                                <div className="header-bottom">
                                    <Row
                                        className={
                                            moreShow
                                                ? "more-show-height"
                                                : "less-hide-height"
                                        }
                                    >
                                        <MoreForm
                                            handleSearch={this.handleSearch.bind(this)} //点击查询方法
                                            searchMapFn={this.searchMapFn.bind(this)} //动态赋值查询条件到redux中
                                            formMore={this.formMore.bind(this)} //控制查询显隐
                                        />
                                    </Row>
                                </div>
                            </Row>
                        )}
                </Row>
                <div className="tabel-bg tabel-recoverd">
                    <Table
                        size="middle"
                        columns={this.columns}
                        dataSource={page.data}
                        rowKey="id"
                        rowSelection={rowSelection}
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
                    />
                </div>

                <Modal
                    title={editData.id ? "修改线索" : "新建线索"}
                    visible={visible}
                    onOk={this.onOk.bind(this)}
                    onCancel={this.onCancel.bind(this)}
                    width={900}
                    maskClosable={false}
                // footer={[
                //     <Button key="back" onClick={this.onOk.bind(this)}>保存</Button>,
                //     <Button key="submit" onClick={this.onCancel.bind(this)}>取消</Button>,
                //     // <Button key="submit1" onClick={this.handleOk.bind(this)}>保存并新建</Button>
                // ]}
                >
                    <div className="modal-height">
                        <Card
                            wrappedComponentRef={inst =>
                                (this.formRef = inst)}
                        // editCardFn={this.editCardFn.bind(this)}
                        />
                    </div>
                </Modal>

                <SlidePanel
                    viewState={viewState}
                    onClose={this.slideHide.bind(this)}
                    className='tab-viewPanel-recoverd'
                >
                    <ViewPanel />
                </SlidePanel>
                <AssignLead />
                <LeadExport/>
            </div>
        );
    }
}
//绑定状态到组件props
function mapStateToProps(state, ownProps) {
    return { $$state: state.lead };
}
//绑定action到组件props
function mapDispatchToProps(dispatch) {
    return {
        action: bindActionCreators(Actions, dispatch)
    };
}
//输出绑定state和action后组件
export default connect(mapStateToProps, mapDispatchToProps)(Clue);