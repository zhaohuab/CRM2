
import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Table, Modal, Button, Icon, Input, Radio, Popconfirm, Form, Select, Row, Col } from 'antd';
import * as Actions from "../action"
import Card from './Card'
import ViewCard from './ViewCard'
import SearchForm from './SearchForm'
import HeaderButton from "../../../common/headerButtons/headerButtons.jsx";
import LessForm from "./lessForm.jsx";
const Option = Select.Option;
const ButtonGroup = Button.Group;
const confirm = Modal.confirm;

class List extends React.Component {
    constructor(props) {
        super(props)

        this.columns = [
            {
                title: "品牌",
                dataIndex: "name",
            },
            {
                title: "英文",
                dataIndex: "enName"
            },
            {
                title: "备注",
                dataIndex: "description"
            },
            {
                title: "启用状态",
                dataIndex: "enableStateName"
            }

        ]

        this.state = {

            selectedRows: [],
            isEdit: false,
            pagination: {
                pageSize: 10,
                page: 1
            },
            searchMap: {}
        }
        let that = this
        // this.rowSelectionFn = {
        //     onChange(selected, selectedRows) {
        //         if (selectedRows && selectedRows.length > 0) {
        //             that.setState({ selectedRows: selectedRows, headLabel: true })
        //         } else {
        //             that.setState({ selectedRows: selectedRows, headLabel: false })
        //         }
        //     }
        // }

        this.onSelectChange = (selectedRowKeys, selectedRows) => {
            this.props.action.selectData({ selectedRows, selectedRowKeys });
        };
    }
    componentDidMount() {
        let { pagination, searchMap } = this.state;
        this.props.action.getListData({ pagination, searchMap });
    }

    onAdd() {
        this.setState({ isEdit: false })
        this.props.action.showForm(true, {})
    }
    onEdit(record) {
        this.setState({ isEdit: true })
        this.props.action.showForm(true, record)
    }

    onView(record) {
        this.props.action.showViewForm(true, record);
    }

    onDelete(rows) {
        let { pagination,searchMap } = this.state;     
        let that = this
        confirm({
            title: '确定要删除吗?',
            content: '此操作不可逆',
            okText: '是',
            okType: 'danger',
            cancelText: '否',
            onOk() {

                const ids = rows.join();
                
                that.props.action.onDelete(ids,pagination,searchMap);
            },
            onCancel() {
                console.log('Cancel');
            },
        });

    }
    //保存事件
    onSave() {
        let form = this.formRef.props.form;
        form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
            }
        });
        if (this.state.isEdit) {
            this.props.action.onSave4Edit(form.getFieldsValue());
        }
        else {
            this.props.action.onSave4Add(form.getFieldsValue());
        }
    }
    onEableRadioChange = (enableState) => {
        // let enable = enableState;
        const selectedRowKeys = this.props.$$state.get("selectedRowKeys").toJS();
         let { pagination,searchMap} = this.state;
        // searchMap.enableState = enableState;
         let ids = selectedRowKeys.join();
         
         this.props.action.changeEnableState( enableState,ids,pagination,searchMap );
        // this.setState({searchMap});
       }

    onSearch() {
        //let searchMap = this.searchformRef.props.form.getFieldsValue();
        this.setState({ searchMap });
        let { pagination } = this.state;
        this.props.action.getListData({ pagination, searchMap });
    }

    onBack() {
        this.props.action.selectData({ selectedRows: [], selectedRowKeys: [] });
    }
    //form表单关闭按钮事件
    onClose() {
        this.props.action.showForm(false, {});
    }

    onSetState(rows, state) {
        const ids = [];
        for (let i = 0; i < rows.length; i++) {
            ids.push(rows[i].id)
        }
        this.props.action.onSetState(ids, state);
    }

    showTotal(total) {
        return `共 ${total} 条`;
    }
    onPageChange(page, pageSize) {
        let { pagination, searchMap } = this.state;
        //可能有问题
        pagination = { page: page, pageSize: pageSize };
        this.setState({ pagination });
        this.props.action.getListData({ pagination, searchMap });
    }
    onPageSizeChange(current, pageSize) {
        let { pagination, searchMap } = this.state;
        pagination = { page: pagination.page, pageSize: pageSize };
        this.setState({ pagination });
        this.props.action.getListData({ pagination, searchMap });
    }

    render() {
        let { pagination, searchMap } = this.state;
        const page = this.props.$$state.get("data").toJS();
        const editData = this.props.$$state.get("editData").toJS();
        const visible = this.props.$$state.get("visible");
        const viewVisible = this.props.$$state.get("viewVisible");
        const WrapCard = Form.create()(Card);
        const WrapViewCard = Form.create()(ViewCard);
        const WrapSearchForm = Form.create()(SearchForm);
        let lessFormData = this.props.$$state.get("lessFormData").toJS();
        const selectedRows = this.props.$$state.get("selectedRows").toJS();
        const selectedRowKeys = this.props.$$state.get("selectedRowKeys").toJS();
        let rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange
        };
        return (
            <div className='brand-warpper'>
                {
                    selectedRows.length > 0 ?
                    <div className = "head_edit">
                        <HeaderButton
                            length={selectedRows.length}
                            goBack={this.onBack.bind(this)}>
                            {selectedRows.length == 1 ? <Button className="default_button" onClick={this.onEdit.bind(this, selectedRows[0])}><i className='iconfont icon-bianji'></i>编辑</Button>
                                : <Button className="default_button" disabled><i className='iconfont icon-bianji'></i>编辑</Button>}

                            <Button className="default_button" onClick={this.onDelete.bind(this, selectedRowKeys)}><i className='iconfont icon-shanchu'></i>删除</Button>
                            <ButtonGroup className='returnbtn-class'>
                                <Button className="default_button" onClick={this.onEableRadioChange.bind(this, 1)}><i className='iconfont icon-qiyong'></i>启用</Button>
                                <Button className="default_button" onClick={this.onEableRadioChange.bind(this, 2)}><i className='iconfont icon-tingyong'></i>停用</Button>
                            </ButtonGroup>
                        </HeaderButton>
                        </div> :
                       <Row 
                         type="flex"
                         align="middle"
                         justify="space-between"
                         className="header-top">
                           <Col span={18}>
                             <Row type="flex" align="middle">
                               <Col className="select-recover">
                                 <Select defaultValue="0">
                                   <Option value="0">全部</Option>                                       
                                   <Option value="1">最近查看</Option>                                       
                                 </Select>
                               </Col>
                               <Col
                               span={18}
                               className={"less-show-height"}
                               >
                                 <LessForm
                                 dataSource={lessFormData}
                                 handleSearch={this.onSearch.bind(this)} //点击查询方法
                                 />
                               </Col>
                             </Row>
                           </Col>
                           <Col span={6}>
                             <Row type="flex" gutter={15} justify="end">
                               <Col>
                                 <ButtonGroup>
                                   <Button>
                                     <i className="iconfont icon-daoru" />导入
                                   </Button>
                                   <Button>
                                     <i className="iconfont icon-daochu" />导出
                                   </Button>
                                 </ButtonGroup>
                               </Col>
                               <Col>
                                 <Button
                                 type="primary"
                                 onClick={this.onAdd.bind(this)}
                                 >
                                   <i className="iconfont icon-xinjian" />新建
                                 </Button>
                               </Col>
                             </Row>
                           </Col>
                         </Row>                                
                    }
                <div className="list-box">
                    <Table
                        size="middle"
                        rowSelection={rowSelection}
                        columns={this.columns}
                        dataSource={page.data}
                        rowKey="id"
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
                    title={this.state.isEdit ? "修改品牌" : "新增品牌"}
                    visible={visible}
                    width={500}
                    onOk={this.onSave.bind(this)}
                    onCancel={this.onClose.bind(this)}
                    maskClosable={false}
                >
                    <div className='model-height'>
                        <WrapCard dataSource={editData} wrappedComponentRef={(inst) => this.formRef = inst} />
                    </div>
                </Modal>

                <Modal
                    title={"查看品牌"}
                    visible={viewVisible}
                    width={500}
                    onOk={this.onEdit.bind(this, editData)}
                    okText={"编辑"}
                    onCancel={this.onClose.bind(this)}
                >
                    <div className='model-height'>
                        <WrapViewCard dataSource={editData} wrappedComponentRef={(inst) => this.viewformRef = inst} />
                    </div>
                </Modal>
            </div>
        )
    }
}

//绑定状态到组件props
function mapStateToProps(state, ownProps) {
    return {
        $$state: state.brandList
    }
}

//绑定action到组件props
function mapDispatchToProps(dispatch) {
    return {
        action: bindActionCreators(Actions, dispatch)
    }
}

//输出绑定state和action后组件
export default connect(mapStateToProps, mapDispatchToProps)(List);