import {
    Modal,
    Cascader,
    Select,
    Form,
    Row,
    Col,
    Input,
    Button,
    Icon
} from "antd";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Enum from "utils/components/enums";
const FormItem = Form.Item;
const Option = Select.Option;
const ButtonGroup = Button.Group;
const confirm = Modal.confirm;
import "assets/stylesheet/all/iconfont.css";
//导入action方法
import * as Actions from "../action";

import HeaderButton from "../../../common/headerButtons/headerButtons.jsx";
import LessForm from "./lessForm.jsx";
import MoreForm from "./moreForm.jsx";

class ToolForm extends React.Component {
    constructor(props) {
        super(props);
    }

    //点击返回按钮
    btnBack() {
        this.props.action.selectRow([], []);
    }

    //点击停用启用?
    btnSetEnable(enableState) {
        const searchMap = this.props.$$state.get("searchMap").toJS(); //点击的时候保存的查询条件
        const selectRow = this.props.$$state.get("selectedRows").toJS();
        const ids = [];
        for (let i = 0; i < selectRow.length; i++) {
            ids.push(selectRow[i].id);
        }
        this.props.action.setEnableState(
            ids,
            enableState, //获取起停用数字
            this.props.$$state.get("pagination").toJS(), //获取分页
            searchMap //查询条件
        );
    }

    //点击删除按钮?
    btnDelete() {
        let that = this;
        confirm({
            title: "确定要删除吗?",
            content: "此操作不可逆",
            okText: "是",
            okType: "danger",
            cancelText: "否",
            onOk() {
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
    //点击新建按钮
    btnNew() {
        this.props.action.showForm({}, true);
        this.props.action.saveOppBList([]);
    }
    //上下表单控制显隐
    changeVisible() {
        this.props.action.changeVisible();
    }
    //扩展条件、基础条件查询
    handleSearch(searchMap) {
        this.props.action.getListData(
            this.props.$$state.get("pagination").toJS(),
            searchMap
        );
    }

    //存储建议查询条件
    searchMapFn(searchMap) {
        this.props.action.saveSearchMap(searchMap);
    }

    //点击编辑按钮打开编辑页面
    btnEdit(data) {
      
        this.props.action.showForm(data,true);
    }

    render() {
        let { enumData, moreShow, selectedRows } = this.props.$$state.toJS();
        return (
            <Row className="header-warpper">
                {selectedRows && selectedRows.length >= 1 ? (
                    <HeaderButton
                        goBack={this.btnBack.bind(this)}
                        length={selectedRows.length}
                    >

                    {selectedRows.length == 1 ? <Button className="default_button" onClick={this.btnEdit.bind(this, selectedRows[0])}><i className='iconfont icon-bianji'></i>编辑</Button>
                                : <Button className="default_button" disabled><i className='iconfont icon-bianji'></i>编辑</Button>}

                        <Button
                            className="returnbtn-class"
                            onClick={this.btnDelete.bind(this)}
                        >
                            <i className="iconfont icon-shanchu" />删除
                        </Button>

                        <ButtonGroup className="returnbtn-class">
                            <Button onClick={this.btnSetEnable.bind(this, 1)}>
                                <i className="iconfont icon-qiyong" />启用
                            </Button>
                            <Button onClick={this.btnSetEnable.bind(this, 2)}>
                                <i className="iconfont icon-tingyong" />停用
                            </Button>
                        </ButtonGroup>
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
                                        <Select defaultValue="3">
                                            <Option value="0">全部</Option>
                                            <Option value="1">我关注的</Option>
                                            <Option value="2">最近新建</Option>
                                            <Option value="3">最近查看</Option>
                                        </Select>
                                    </Col>
                                    <Col
                                        span={18}
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
                                            onClick={this.btnNew.bind(this)}
                                        >
                                            <i className="iconfont icon-xinjian" />新建
                                        </Button>
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
        );
    }
}
//绑定状态到组件props
function mapStateToProps(state, ownProps) {
    return {
        $$state: state.opportunityList
    };
}
//绑定action到组件props
function mapDispatchToProps(dispatch) {
    return {
        action: bindActionCreators(Actions, dispatch)
    };
}
//输出绑定state和action后组件
export default connect(mapStateToProps, mapDispatchToProps)(ToolForm);
