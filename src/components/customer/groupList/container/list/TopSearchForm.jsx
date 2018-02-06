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
import { baseDir } from 'api';
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
    btnDelete() {//-------------这里与公司客户不一致
        let that = this;
        confirm({
            title: "确定要删除吗?",
            content: "此操作不可逆",
            okText: "是",
            okType: "danger",
            cancelText: "否",
            onOk() {
                let {searchMap,selectedRowKeys,pagination} = that.props.$$state.toJS();
                const ids = selectedRowKeys.join(',');
                that.props.action.deleteData(
                    ids,
                    searchMap,
                    pagination
                );
            },
            onCancel() {
                console.log("Cancel");
            }
        });
    }
    //点击新建按钮
    btnNew() {
        this.props.clearForm()
        this.props.action.addCustomer(true);
    }
    //上下表单控制显隐
    changeVisible() {
        this.props.action.changeVisible();
    }
    //扩展条件、基础条件查询
    handleSearch(searchMap) {
        //还差城市条件过滤
        this.props.action.getListData(
            this.props.$$state.get("pagination").toJS(),
            searchMap
        );
    }

    //存储建议查询条件
    searchMapFn(searchMap) {
        this.props.action.saveSearchMap(searchMap);
    }

    getList=(value)=>{//-----点击查询方案获取列表   赵华冰 2-2
        debugger
        let { enumData, searchMap} = this.props.$$state.toJS();
        let pagination={page:1,pageSize:10}
        let obj={};
        enumData.forEach(item=>{
            if(item.id==value){
                obj.id=value;
                obj.defClass=item.defClass;
            }
        })
        this.props.action.getListData(pagination, searchMap,obj)
    }

    onMenu(e) {//-----导入导出 赵华冰2-2
        let { searchMap, pagination, enumData } = this.props.$$state.toJS();
        let page = pagination.page;
        let pageSize = pagination.pageSize;
        let search = JSON.stringify(searchMap);
        if (e.key == "1") {
            this.props.action.viewLeadShow(true);
        } else if (e.key == "2") {
            location.href = baseDir + "tpub/excels/2/export?param=" + "{\"page\":" + `${page}` + ",\"pageSize\":" + `${pageSize}` + ",\"searchMap\":" + `${search}` + ",\"mode\":" + 2 + "}"

        }
    }

    render() {
        let { enumData, moreShow, selectedRowKeys } = this.props.$$state.toJS();
        const moreMenu = (
            <Menu onClick={this.onMenu.bind(this)}>
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
                                        <Select defaultValue={3} onChange={this.getList.bind(this)}>
                                        {/*// ------循环绑定查询条件  赵华冰 2-2 */}
                                            {
                                                enumData.map(item=>{
                                                    return (
                                                        <Option value={item.id}>{item.name}</Option>
                                                    )
                                                })
                                            }
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
                                        <Button
                                            type="primary"
                                            onClick={this.btnNew.bind(this)}
                                        >
                                            <i className="iconfont icon-xinjian" />新建
                                        </Button>
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
        $$state: state.customerGroupList
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
