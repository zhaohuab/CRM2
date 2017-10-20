
import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Table, Modal, Button, Icon, Input, Radio, Popconfirm, Form } from 'antd';
import * as Actions from "../action"
import Card from './Card'
const ButtonGroup = Button.Group;
const confirm = Modal.confirm;


class List extends React.Component {
    constructor(props) {
        super(props)

        this.columns = [
            {
                title: "商机名称",
                dataIndex: "name"
            },
            {
                title: "客户名称",
                dataIndex: "customerName"
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
            },
        ]

        this.state = {
            headLabel: false,
            selectedRows: [],
            isEdit: false,
        }
        let that = this
        this.rowSelectionFn = {

            onChange(selected, selectedRows) {
                that.setState({ selectedRows: selectedRows, headLabel: true })
            }
        }
    }
    componentDidMount() {
        // let { pagination,searchMap } = this.state;
        this.props.action.getListData();
    }

    onAdd() {
        this.setState({ isEdit: false })
        this.props.action.showForm(true, {})
    }
    onEdit(record) {
        this.setState({ isEdit: true })
        this.props.action.showForm(true, record)
    }

    onDelete(rows) {

        let that = this
        confirm({
            title: '确定要删除吗?',
            content: '此操作不可逆',
            okText: '是',
            okType: 'danger',
            cancelText: '否',
            onOk() {

                const ids = [];
                for (let i = 0; i < rows.length; i++) {
                    ids.push(rows[i].id)
                }
                that.props.action.onDelete(ids)
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

    onBack() {
        this.setState({ headLabel: false })
    }
    //form表单关闭按钮事件
    onClose() {
        this.props.action.showForm(false, {});
    }

    onSetState(rows,state){
        const ids = [];
        for (let i = 0; i < rows.length; i++) {
            ids.push(rows[i].id)
        }
        this.props.action.onSetState(ids,state);
    }

    render() {
        const page = this.props.$$state.get("data").toJS();
        const editData = this.props.$$state.get("editData").toJS();
        const visible = this.props.$$state.get("visible")
        const WrapCard = Form.create()(Card)
        const selectedRows = this.state.selectedRows
        const rowNum = selectedRows.length
        return (
            <div className='user-warpper'>
                <div className='head_panel'>
                    {
                        this.state.headLabel ?
                            <div className='head_edit'>
                                <div className='edit-inner-left'>已选中<span>{selectedRows.length}</span>条</div>
                                <div className='edit-inner-right'>
                                    <Button className="default_button" onClick={this.onBack.bind(this)}><i className='iconfont icon-fanhui'></i>返回</Button>
                                    {this.props.children}
                                </div>
                                {rowNum == 1 ? <Button className="default_button" onClick={this.onEdit.bind(this, selectedRows[0])}><i className='iconfont icon-bianji'></i>编辑</Button>
                                    : <Button className="default_button" disabled><i className='iconfont icon-bianji'></i>编辑</Button>}

                                {/* <Popconfirm placement="bottom" title="确认删除吗" onConfirm={} okText="是" cancelText="否"> */}
                                <Button className="default_button" onClick={this.onDelete.bind(this, selectedRows)}><i className='iconfont icon-shanchu'></i>删除</Button>
                                {/* </Popconfirm> */}
                                <ButtonGroup className='returnbtn-class'>
                                    <Button className="default_button" onClick={this.onSetState.bind(this,selectedRows,1)}><i className='iconfont icon-qiyong'></i>启用</Button>
                                    <Button className="default_button" onClick={this.onSetState.bind(this,selectedRows,2)}><i className='iconfont icon-tingyong'></i>停用</Button>
                                </ButtonGroup>
                            </div> : ""}

                    <div className='head_panel-right'>
                        <Button><i className='iconfont icon-daochu'></i>导入</Button>
                        <Button><i className='iconfont icon-daoru'></i>导出</Button>
                        <Button type="primary" className="button_add" onClick={this.onAdd.bind(this)}><Icon type="plus" />新增</Button>
                    </div>
                </div>

                <div className="list-box">
                    <Table
                        size="middle"
                        rowSelection={this.rowSelectionFn}
                        columns={this.columns}
                        dataSource={page.data}
                        rowKey="id"
                        pagination={false}
                    />
                </div>
                <Modal
                    title={this.state.isEdit?"修改商机":"新增商机"}
                    visible={visible}
                    width={500}
                    onOk={this.onSave.bind(this)}
                    onCancel={this.onClose.bind(this)}
                >
                    <div className='model-height'>
                        <WrapCard dataSource={editData} wrappedComponentRef={(inst) => this.formRef = inst} />
                    </div>
                </Modal>
            </div>
        )
    }
}

//绑定状态到组件props
function mapStateToProps(state, ownProps) {
    return {
        $$state: state.opportunityList
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