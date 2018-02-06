import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { Popover, Select, Dropdown, Menu, Table, Button, Icon, Row, Col, Modal, Form, Tabs, Collapse } from "antd";
import './index.less';
const Panel = Collapse.Panel;
const ButtonGroup = Button.Group;
const Option = Select.Option;
const TabPane = Tabs.TabPane;
const confirm = Modal.confirm;
import Immutable from "immutable";


// //编辑，修改信息
import Card from "./Card.jsx";
import "assets/stylesheet/all/iconfont.css";
import * as Actions from '../action';

class SpeechList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            modalVisible: false
        }
        this.columns = [
            // {
            //     title: "序号",
            //     dataIndex: "id"
            // },
            {
                title: "职位",
                dataIndex: "jobName",
                width: '20%'
            },
            {
                title: "销售话术",
                dataIndex: "saleTalk",
                width: '80%',
                render: (text, record) => (
                    <div onClick={this.getTalk} >

                        {/* <div>{record.saleTalk.substr(0,20)}
                        {record.saleTalk.length&&record.saleTalk.length>20?'...':null}
                
                        </div> */}

                        <Popover content={this.getTalk.call(this, record)} trigger="hover" placement="bottomLeft">
                            <div style={{ width: '800px', cursor: 'pointer', whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>{record.saleTalk}

                            </div>
                        </Popover>
                    </div>
                )
            },
        ]

        this.onSelectChange = (selectedRowKeys, selectedRows) => {
            debugger;
            this.props.action.selectSpeech(selectedRows, selectedRowKeys);
        };

    }
    getTalk = (record) => {
        return (
            <div>{record.saleTalk}</div>
        )
    }
    newSpeech = () => {
        this.props.action.speechVisible(true)
    }
    trancFn = (data) => {
        for (let key in data) {
            //枚举
            debugger
            if (key == 'jobName') {
                data['job'] = data['jobName']
                // if (data[key] && data[key].key) {
                //     data[key] = data[key].key
                // }
            }

        }
        return data
    }
    deleteSpeech = () => {
        //点击删除按钮，删除数据
        let that = this;
        confirm({
            title: "确定要删除吗?",
            content: "此操作不可逆",
            okText: "是",
            okType: "danger",
            cancelText: "否",
            onOk() {
                debugger;
                // const searchMap = that.props.$$state.get("searchMap").toJS();
                const selectRow = that.props.$$state.get("selectedRows").toJS();
                const ids = [];
                for (let i = 0; i < selectRow.length; i++) {
                    ids.push(selectRow[i].id);
                }
                that.props.action.deleteData(
                    ids,
                    // searchMap,
                    that.props.$$state.get("pagination").toJS()
                );
            },
            onCancel() {
                console.log("Cancel");
            }
        });
    }

    //modal点击确定按钮
    onOk = () => {
        debugger;
        this.formRef.props.form.validateFieldsAndScroll((err, values) => {//取值
            debugger;
            if (!err) {
                values = this.trancFn(values);
                if (values.id) {
                    // debugger;
                    this.props.action.onEdit(values);
                } else {
                    debugger;
                    this.props.action.onSave(values);
                }
            }
        });

    }
    onCancel = () => {
        this.props.action.speechVisible(false)
    }

    //选中一条数据 点击编辑按钮
    editSpeech = () => {
        debugger
        let selectedRowKeys = this.props.$$state.get('selectedRowKeys').toJS();
        let resultNew = this.props.$$state.get('data').toJS().data;
        debugger
        resultNew = resultNew.filter(item => {
            return item.id == selectedRowKeys[0];
        });

        this.props.action.edit(resultNew[0], true);
    }


    componentDidMount() {
        let { pagination } = this.props.$$state.toJS();
        this.props.action.getListData(
            pagination
        );
        this.props.action.getEnumData();
    }
    //分页方法
    showTotal(total) {
        return `共 ${total} 条`;
    }

    //点击分页
    onPageChange(page, pageSize) {
        debugger
        let pagination = { page: page, pageSize: pageSize };
        this.props.action.getListData(
            pagination,
            // this.props.$$state.get("searchMap").toJS()
        );
    }

    //点击分页跳转
    onPageSizeChange(current, pageSize) {
        debugger
        let pagination = { page: current, pageSize: pageSize };
        this.props.action.getListData(
            pagination,
            // this.props.$$state.get("searchMap").toJS()
        );
    }


    render() {
        debugger
        let {
            data,
            selectedRowKeys,
            selectedRows,
            modalVisible,
            editData
         } = this.props.$$state.toJS();
        let rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange
        };


        return (
            <div className="speech-wrapper">
                <div className="speech-header">销售话术</div>
                <Row type="flex" justify="end">
                    <Col span={24}>
                        <Row
                            type="flex"
                            justify="end" gutter={10}
                        >
                            <div>
                                <Button
                                    type="primary"
                                    onClick={this.newSpeech}
                                >
                                    新建
                                  </Button>
                            </div>
                            {selectedRowKeys.length == 1 ?
                                <div>
                                    <Button
                                        type="primary"
                                        onClick={this.editSpeech}
                                    >
                                        修改
                                                    </Button>
                                </div> : null}
                            <div>
                                <Button
                                    type="primary"
                                    onClick={this.deleteSpeech}
                                >
                                    删除
                                 </Button>
                            </div>
                        </Row>
                    </Col>
                </Row>
                <div className="tabel-bg speech-tabel-recoverd">
                    <Table
                        size="middle"
                        columns={this.columns}
                        dataSource={data.data}
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
                    className="speech-modal"
                    title={editData.id ? "修改话术" : "新建话术"}
                    visible={modalVisible}
                    onOk={this.onOk}
                    onCancel={this.onCancel}
                >
                    <div className="speech-card-height">
                        <Card
                            wrappedComponentRef={inst =>
                                (this.formRef = inst)}
                        />
                    </div>
                </Modal>
            </div>

        )
    }
}

//绑定状态到组件props
function mapStateToProps(state, ownProps) {
    return { $$state: state.speech };
}
//绑定action到组件props
function mapDispatchToProps(dispatch) {
    return {
        action: bindActionCreators(Actions, dispatch)
    };
}
//输出绑定state和action后组件
export default connect(mapStateToProps, mapDispatchToProps)(SpeechList);