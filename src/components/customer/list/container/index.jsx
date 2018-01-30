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
import LeadStart from "./lead/LeadStart"
import reqwest from "reqwest";
import { baseDir } from "api";
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
                    return (
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
        if (data.street && data.street.location) {
            data.longitude = data.street.location.lng
            data.latitude = data.street.location.lat
            data.street = data.street.address
        }

        if (data.ownerUserId) {
            let ownerUserId = data.ownerUserId.id;
            delete data.ownerUserId
            data.salesVOs = [{ ownerUserId }]
        }

        if (data.level) {
            data.level = data.level.key
        }

        if (data.type) {
            data.type = data.type.key
        }

        if (data.cannelType) {
            data.cannelType = data.cannelType.key
        }
         
        return data;
    }

    //form新增、或者修改
    formHandleOk() {
        let { viewData,newTypeId } = this.props.$$state.toJS();
        this.formRef.props.form.validateFields((err, value) => {
             
            if (!err) {
                let values = this.trancFn(viewData);
                 
                if (values.id) {//修改
                    this.props.action.listEditSave(values);
                } else {//新增
                    this.props.action.listAddSave(values,newTypeId);
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

    componentDidMount() {
         
        this.props.action.getListData(
            this.props.$$state.get("pagination").toJS()
        );
        this.props.action.getEnumData();
    }


    leadStart() {
        debugger
        // this.props.action.leadShow(false);
        //this.props.action.leadEndShow(true);
        //this.props.action.leadEndShow(true);
        this.uploadFiles.call(this);
         this.props.action.leadEndView(true, 2);
        // let { filesSuccess } = this.props.$$state.toJS();
        // if (filesSuccess) {
        //      
        //     setTimeout(() => {
        //         this.props.action.leadEndView(true, 2);
        //     }, 1000)
        // }
    }
    leadStartCancel() {
        this.props.action.viewLeadShow(false);
        this.props.action.leadEndShow(false);
        this.props.action.leadEndView(false, 1);
        this.props.action.fileSuccess(false, {})
    }
    leadEnd() {
         
        this.props.action.viewLeadShow(false);
        this.props.action.leadEndShow(false);
        this.props.action.leadEndView(false, 1);
        this.props.action.fileSuccess(false, {})
    }
    leadEndCancel() {
        this.props.action.leadEndShow(false)
    }
    leadIng() {
        this.props.action.leadEndShow(true)
    }
    //上传之前的验证
    beforeUpload(file, index, items) {
         debugger
        let type = ['.bmp', '.gif', '.jpeg', '.html', '.txt', '.vsd', '.ppt', '.doc', '.xml', '.jpg', '.png', '.xlsx','.xls']
        let pos = file.name.lastIndexOf('.')
        let end = file.name.slice(pos)
        if (type.indexOf(end)>=0) {
            return true
        } else {
            //保存信息写不符合上传类型
            console.log('文件类型错误')
            return false
        }
    }
    uploadFiles() {
         debugger
        let { leadFiles } = this.props.$$state.toJS();
        let files = Array.prototype.slice.call(leadFiles)
        let proAry = []
         
        // files.forEach((file, index, items) => {
        //     proAry.push(this.upLoad(file));
        // })
        files.forEach((file, index, items) => {
             
            let before = this.beforeUpload(file, index, items);
            if (typeof before == 'boolean' && before) {
                proAry.push(this.upLoad(file))
            }
        })

        Promise.all(proAry).then((result) => {
            
            console.log(12, result)
            if (result.length&&result[0].code == '0') { this.props.action.fileSuccess(true, result,true)}

        }, (error) => {
            console.log(34, error)
            this.props.action.fileFail(false)
        })

    }

    upLoad(file) {
        let formdata = new FormData();
        formdata.append('file', file)
        //formdata.get("filedata")
        return reqwest(
            {
                url: baseDir + "/tpub/excels/1/import",
                method: "POST",
                processData: false,
                contentType: false,
                data: formdata
            }
        );
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
            viewLeadVisible,
            pagination,
            searchMap

        } = this.props.$$state.toJS();
         ;
        let rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange
        };
        return (
            <div className="custom-warpper ">
                <TopSearchForm 
                pagination={pagination}
                searchMap={searchMap}
                 />
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


              
               <Modal title="导入"
               className="lead-cur-import"
                    // destroyOnClose={true}
                    visible={viewLeadVisible}
                    // onOk={this.leadStart.bind(this)}
                    onCancel={this.leadStartCancel.bind(this)}
                    footer={leadEndVisible ? [
                        <Button key="submit" type="primary" onClick={this.leadEnd.bind(this)}>
                            关闭
                        </Button>
                    ] :
                        [
                            <Button key="back" onClick={this.leadStartCancel.bind(this)}>取消</Button>,
                            <Button key="submit" type="primary" onClick={this.leadStart.bind(this)}>
                                开始导入
                        </Button>
                        ]}

                // footer={leadEndVisible?[
                //     <Button key="submit" type="primary" onClick={this.leadEnd.bind(this)}>
                //      关闭
                //     </Button>
                //   ]:leadingVisible?[
                //     <Button key="submit" type="primary" onClick={this.leadIng.bind(this)}>
                //      导入中
                //     </Button>
                //   ]:
                //   [
                //     <Button key="back" onClick={this.leadStartCancel.bind(this)}>取消</Button>,
                //     <Button key="submit" type="primary" onClick={this.leadStart.bind(this)}>
                //       开始导入
                //     </Button>
                //   ]}
                >
                    <div className="cur-lead" ref="leadContent">
                        {viewLeadVisible ? <LeadStart /> : null}
                    </div>
                </Modal>
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
