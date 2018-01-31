import {
    Modal,
    Cascader,
    Select,
    Form,
    Row,
    Col,
    Input,
    Button,
    Icon,
    Dropdown,
    Menu
} from "antd";

import { baseDir } from "api";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Enum from "utils/components/enums";
const FormItem = Form.Item;
const Option = Select.Option;
const ButtonGroup = Button.Group;
const confirm = Modal.confirm;
import "assets/stylesheet/all/iconfont.css";
//导入action方法
import * as Actions from "../../action";

import HeaderButton from "../../../../common/headerButtons/headerButtons.jsx";
import LessForm from "./LessForm.jsx";
import MoreForm from "./MoreForm.jsx";
import cookie from "utils/cookie";

class ToolForm extends React.Component {
    constructor(props) {
        super(props);
    }

    //点击返回按钮
    btnBack() {
        this.props.action.selectedRowKeys([]);
    }

    //点击停用启用
    btnSetEnable(enableState) {
        debugger
        let {searchMap,selectedRowKeys,pagination} = this.props.$$state.toJS()
        const ids = selectedRowKeys.join(',');
       
        this.props.action.setEnableState(
            ids,
            enableState, //获取起停用数字
            pagination,
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
                debugger
                const searchMap = that.props.$$state.get("searchMap").toJS();
                const ids = that.props.$$state.get("selectedRowKeys").toJS();
                
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
    //点击新增按钮先请求查询条件 再弹出modal-card
    btnNew() {
        this.props.action.addNewType();
    }

    //点击新增的获取的业务类型
    newCumMenuClick(item, key){
        debugger
        let typeId = item.key;
        this.props.action.addCustomer(true,typeId);
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

     onMenu(e) {
         debugger
         let {searchMap,pagination}=this.props.$$state.toJS();
         let page=pagination.page;
         let pageSize=pagination.pageSize
         let search=JSON.stringify(searchMap)
         debugger
        if (e.key == "1") {
            debugger
            this.props.action.viewLeadShow(true);
        } else if (e.key == "2") {
          location.href = baseDir + "tpub/excels/1/export?param="+"{\"page\":"+`${page}`+",\"pageSize\":"+`${pageSize}`+",\"searchMap\":"+`${search}`+",\"mode\":"+2+"}"

        }
    }



    render() {
        let { enumData, moreShow, selectedRowKeys,newCumMenu} = this.props.$$state.toJS();
        
        const loop = data => data.map((item,index) => {
            return <Menu.Item key={item.key} >{item.title}</Menu.Item>
        });

        const newBtnMenu = (
            <Menu onClick={this.newCumMenuClick.bind(this)}>
                {loop(newCumMenu)}
            </Menu>
        );

        const moreMenu = (
            <Menu  onClick={this.onMenu.bind(this)}>
                <Menu.Item key="1">
                    <span>导入</span>
                </Menu.Item>
                <Menu.Item key="2">
                    <span>导出</span>
                </Menu.Item>
            </Menu>
        );
        
        
        return (
            <Row className="header-warpper">
                {selectedRowKeys && selectedRowKeys.length >= 1 ? (
                    <HeaderButton
                        goBack={this.btnBack.bind(this)}
                        length={selectedRowKeys.length}
                    >
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
                            <Col span={17}>
                                <Row type="flex" align="middle">
                                    <Col className="select-recover">
                                        <Select defaultValue="3">
                                            <Option value="0">全部</Option>
                                            <Option value="1">我关注</Option>
                                            <Option value="2">最近创建</Option>
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

                            <Col span={7}>
                                <Row type="flex" gutter={15} justify="end">
                                    <Col>
                                        <Dropdown overlay={newBtnMenu} trigger={['click']} placement="bottomCenter"> 
                                            <Button type="primary" onClick = {this.btnNew.bind(this)}>
                                                <i className="iconfont icon-xinjian" />新建
                                            </Button>
                                        </Dropdown>
                                    </Col>
                                    {/* <Col>
                                        <Button>
                                            <i className="iconfont icon-shuaxin" />刷新
                                        </Button>
                                    </Col> */}
                                    <Col>
                                        <Dropdown.Button
                                            overlay={moreMenu}
                                            trigger={["click"]}
                                        >
                                            更多
                                        </Dropdown.Button>
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
        $$state:state.customerList
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
