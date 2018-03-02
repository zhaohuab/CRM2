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
    Collapse
} from "antd";

const TabPane = Tabs.TabPane;
const Panel = Collapse.Panel;
import { browserHistory } from "react-router";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as Actions from "../action";
import reqwest from "utils/reqwest";
import { cum as url, doc, baseDir, oppstage, opportunity, contacts } from "api";

import JoinList from './JoinList'
// import Opportunity from './Opportunity'
import * as objTypeConst from 'utils/const/ObjTypeConst'
// import ContactsModal from './ContactsDetailModal'
// import OppModal from './OppDetailModal'
import Upload from './Upload'
import RelFile from './RelFile'


class RelObject extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            visiable: false,
            contactsData: {},
        }
        this.columns = [
            {
                title: "姓名",
                dataIndex: "name",
            },
            {
                title: "客户",
                dataIndex: "customerName"
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
                title: "邮箱",
                dataIndex: "email"
            }
        ];
    }

    componentDidMount() {
        let editData = this.props.$$state.get("editData").toJS();
        this.props.action.getContactListData(editData.id);
        this.props.action.getAttachFile(editData.id,objTypeConst.OPPORTUNITY);
    }

    //上传图片之前的操作
    beforeUpload(file, index, items) {
        let type = ['.bmp', '.gif', '.jpeg', '.html', '.txt', '.vsd', '.ppt', '.doc', '.xml', '.jpg', '.png', '.xlsx']
        let pos = file.name.lastIndexOf('.')
        let end = file.name.slice(pos)
        if (type.indexOf(end)) {
            return true
        } else {
            //保存信息写不符合上传类型
            return false
        }
    }

    //打开添加联系人列表
    showContactView(e) {
        e.stopPropagation();
        let editData = this.props.$$state.get("editData").toJS();
        this.props.action.showContactView(editData.id, editData.customerId.id);
    }

    //删除联系人
    delContact(e) {
        e.stopPropagation();
        let editData = this.props.$$state.get("editData").toJS();
        let contactIds = this.props.$$state.get("contactSelectedRowKeys").toJS();
        this.props.action.delContact(editData.id, contactIds);
    }

    //上传图片成功
    fileSuccess(file) {
        //把拿到的数据放在已有图片数据中
        //点击某一个文件能下载，是图片类型才能预览
        //IE iframe chorm/firefox a downlond下载文件
        //safiri // window.open('http://image.baidu.com/search/down?tn=download&ipn=dwnl&word=download&ie=utf8&fr=result&url=http%3A%2F%2Fwww.th7.cn%2Fd%2Ffile%2Fp%2F2014%2F07%2F04%2Feb26cd61a6c822839b70e7784fe90685.jpg&thumburl=http%3A%2F%2Fimg3.imgtn.bdimg.com%2Fit%2Fu%3D925173830%2C3059306923%26fm%3D27%26gp%3D0.jpg', '_self');
        this.props.action.filesSuccess(file);
    }

    //删除上传图片
    onDeleteFile(file) {
        this.props.action.onDeleteFiles(file);
    }

    onContactSelectChange = (selectedRowKeys, selectedRows) => {
        this.props.action.selectContactRow(selectedRows, selectedRowKeys);
    }
    onContactCardSelectChange = (selectedRowKeys, selectedRows) => {
        this.props.action.selectContactCardRow(selectedRows, selectedRowKeys);
    }

    onSave = () => {
        let editData = this.props.$$state.get("editData").toJS();
        let contactIds = this.props.$$state.get("contactCardSelectedRowKeys").toJS();
        this.props.action.saveContact(editData.id, contactIds)
    }

    onClose = () => {
        this.props.action.closeContactView()
    }

    render() {
        let editData = this.props.$$state.get("editData").toJS();
        let contactData = this.props.$$state.get("contactData").toJS();
        let contactCardData = this.props.$$state.get("contactCardData").toJS();
        let contactCardVisible = this.props.$$state.get("contactCardVisible");

        let contactSelectedRowKeys = this.props.$$state.get("contactSelectedRowKeys").toJS();
        let contactSelectedRows = this.props.$$state.get("contactSelectedRows").toJS();
        let rowSelection = {
            selectedRowKeys: contactSelectedRowKeys,
            onChange: this.onContactSelectChange
        };

        let contactCardSelectedRowKeys = this.props.$$state.get("contactCardSelectedRowKeys").toJS();
        let contactCardSelectedRows = this.props.$$state.get("contactCardSelectedRows").toJS();
        let cardRowSelection = {
            selectedRowKeys: contactCardSelectedRowKeys,
            onChange: this.onContactCardSelectChange
        };
        let attachFile = this.props.$$state.get("attachFile").toJS();
        let contactHeader = () => {
            return (
                <div>
                    <Row
                    >
                        <Col span="15">1111</Col>
                        <Col span="7">
                            <Row type="flex" justify="end">
                                <Col span="2">
                                    <div onClick={this.showContactView.bind(this)}><i className={'iconfont icon-tianjia'} /></div>
                                </Col>
                            </Row>
                            <Row type="flex" justify="end">
                                <Col span="2">
                                    <div onClick={this.delContact.bind(this)}><i className={'iconfont icon-shanchu'} /></div>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </div>
            )
        }

        let attachHeader = (editData) => {

            return (
                <Row className='relevant-title' type='flex' justify='space-between' align='middle'>
                    <Col className='left'>
                        <span>附件</span>
                    </Col>
                    <Col className='right'>
                        <Upload
                            disabled={false}
                            multiple={true}
                            objType={objTypeConst.OPPORTUNITY}
                            objId={editData.id}
                            beforeUpload={this.beforeUpload.bind(this)}
                            success={this.fileSuccess.bind(this)}
                        >
                            <i className='iconfont icon-shangchuan' />
                        </Upload>
                    </Col>
                </Row>
            )
        }

        return (
            <div className='relevant-wapper' id='relevant-wapper-item'>
                <Collapse defaultActiveKey={['1', '2']}>
                    <Panel header={contactHeader()} key="1">
                        <Table
                            columns={this.columns}
                            dataSource={contactData}
                            rowKey="id"
                            rowSelection={rowSelection}
                            size="middle"
                            pagination={false}

                        />
                    </Panel>

                    {/* <Panel header='参与人' key="2" >
                        <JoinList />
                    </Panel> */}
                    <Panel header={attachHeader(editData)} key="2" >
                        <RelFile files={attachFile} onDeleteFile={this.onDeleteFile.bind(this)} />
                    </Panel>

                </Collapse>
                <Modal
                    title="选择联系人"
                    visible={contactCardVisible}
                    onOk={this.onSave.bind(this)}
                    onCancel={this.onClose.bind(this)}
                    width={500}
                    maskClosable={false}
                >
                    <Table
                        columns={this.columns}
                        dataSource={contactCardData}
                        rowKey="id"
                        rowSelection={cardRowSelection}
                        size="middle"
                        pagination={false}

                    />
                </Modal>
            </div>
        )
    }
}

//绑定状态到组件props
function mapStateToProps(state, ownProps) {
    return {
        $$state: state.opportunityList,
    };
}
//绑定action到组件props
function mapDispatchToProps(dispatch) {
    return {
        action: bindActionCreators(Actions, dispatch)
    };
}
//输出绑定state和action后组件
export default connect(mapStateToProps, mapDispatchToProps)(RelObject);