import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Select, Input, Dropdown, Menu, Table, Button, Icon, Row, Col, Modal, Form, Tabs, Timeline, Collapse } from "antd";
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

//查询头部简单列表

//点击更多的列表

import LessForm from "./LessForm.jsx";
import MoreForm from "./MoreForm.jsx";
//点击滑出详情信息
import SlidePanel from "../../../common/slidePanel/index.jsx";
import ViewPanel from "./ViewPanel";
import "assets/stylesheet/all/iconfont.css";
import * as Actions from '../action';


class Clue extends React.Component {
    constructor(props) {
        super(props);

        this.columns = [
            {
                title: "姓名",
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
                title: "公司名称",
                dataIndex: "companyName"
            },
            {
                title: "线索来源",
                dataIndex: "source"
            },
            {
                title: "职务",
                dataIndex: "postName"
            },
            {
                title: "电话",
                dataIndex: "tel"
            },
            {
                title: "电子邮件",
                dataIndex: "mail"
            },
            {
                title: "线索状态",
                dataIndex: "stateName"
            },
            {
                title: "线索等级",
                dataIndex: "levelName"
            },
            {
                title: "最后跟进时间",
                dataIndex: "followTime"
            },
            {
                title: "负责人",
                dataIndex: "ownerUserInfo"
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
                <Menu.Item key="2">导出</Menu.Item>
            </Menu>
        );


        this.state = {
            pagination: {
                pageSize: 10,
                page: 1
            },
            searchMap: {
                enableState: 1
            },
            //上方条件选择保存更多状态
            viewState: false,


        }

    }


    //显示面板
    slideShow(record) {
        debugger
        //console.log(44,record)
        this.props.action.showViewForm(true, record.id);
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


    //上下表单控制显隐
    changeVisible() {
        this.props.action.changeVisible();
    }
    //扩展条件、基础条件查询
    handleSearch(searchMap) {
        debugger;
        // if (searchMap.industry) {
        //     searchMap.industry = searchMap.industry.id; //这会直接影响searchMap里industry的值，所以要先在不改变原先对象的基础上 改变原对象的id  进行原对象inmutable拷贝对象
        // }

        this.props.action.getListData(
            this.props.$$state.get("pagination").toJS(),
            searchMap
        );
    }

    //存储建议查询条件
    searchMapFn(searchMap) {
        this.props.action.saveSearchMap(searchMap);
    }


    // 删除按钮
    // onDelete() {
    //     let selectedRowKeys = this.props.$$state.toJS().rowKeys[
    //         "selectedRowKeys"
    //     ];

    //     console.log(3, selectedRowKeys)
    //     //let { pagination, searchMap } = this.state; //获取分页信息
    //     this.props.action.onDelete(selectedRowKeys);
    // }

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
        return data;
    }




    //modal点击确定按钮
    handleOk() {
        debugger;
        this.formRef.props.form.validateFieldsAndScroll((err, values) => {//取值
            debugger;
            if (!err) {
                values = this.trancFn(values);
                if (values.id) {
                    //debugger;
                    this.props.action.onEdit(values);
                } else {
                    //debugger;
                    this.props.action.cardSaved(values);
                }
            }
        });

    }
    //modal 点击取消
    handleCancel() {
        //debugger
        this.props.action.showForm(false);
    }


    //编辑按钮
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
    btnNew() {
        /////debugger
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


    render() {
        //debugger;
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

        //新建表单
        //const ClueForm = Form.create({})(Card);
        //查询列表头部简单搜索表单
        // const ClueLessForm = Form.create({})(LessCard);
        //查询列表头部负载搜索表单
        // const ClueMoreFrom = Form.create({})(MoreCard);

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

                            <Button>
                                <i className="iconfont icon-xiansuofenpei" />线索分配
                        </Button>
                            <Button onClick={this.onDelete.bind(this)}>
                                <i className="iconfont icon-shanchu" />删除
                        </Button>
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
                                                <Select defaultValue="我负责" >
                                                    <Option value="1">全部</Option>
                                                    <Option value="2">我负责</Option>
                                                    <Option value="3">我参与</Option>
                                                    <Option value="4">我关注</Option>
                                                    <Option value="5">成功转化</Option>
                                                    <Option value="6">失败关闭</Option>
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
                                                        formMore={this.changeVisible.bind(
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
                                                            onClick={this.btnNew.bind(
                                                                this
                                                            )}
                                                        >
                                                            <i className="iconfont icon-xinjian" />新建
                                                    </Button>
                                                    </div>
                                                    <div>
                                                        <Dropdown.Button
                                                            overlay={this.menu}
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
                                            formMore={this.changeVisible.bind(this)} //控制查询显隐
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
                    onOk={this.handleOk.bind(this)}
                    onCancel={this.handleCancel.bind(this)}
                    width={900}
                    maskClosable={false}
                    footer={[
                        <Button key="back" onClick={this.handleCancel.bind(this)}>取消</Button>,
                        <Button key="submit" onClick={this.handleOk.bind(this)}>保存</Button>,
                        // <Button key="submit1" onClick={this.handleOk.bind(this)}>保存并新建</Button>
                    ]}
                >
                    <div className="modal-height">
                        <Card
                            wrappedComponentRef={inst =>
                                (this.formRef = inst)}
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
    return { $$state: state.clue };
}
//绑定action到组件props
function mapDispatchToProps(dispatch) {
    return {
        action: bindActionCreators(Actions, dispatch)
    };
}
//输出绑定state和action后组件
export default connect(mapStateToProps, mapDispatchToProps)(Clue);