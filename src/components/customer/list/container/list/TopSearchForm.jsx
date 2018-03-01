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
        let { searchMap, selectedRowKeys, pagination } = this.props.$$state.toJS()
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
    //点击新增按钮先请求查询条件 再弹出modal-card,并且保存客户类型在redux中
    btnNew() {
        debugger
        this.props.clearForm()
        this.props.action.addNewType();
    }

    //点击新增的获取的业务类型
    newCumMenuClick(item, key) {
        debugger
        this.props.action.addCustomer(true, {key:item.key,name:item.item.props.children});
    }

    //上下表单控制显隐
    changeVisible() {
        this.props.action.changeVisible();
    }

    //查询条件查询
    handleSearch() {   
        let {searchMap,pagination} = this.props.$$state.toJS()
        debugger
        this.props.action.getListData(
            pagination,
            searchMap,
            'searchMap'
        );
    }

    //查询方案查询
    searchPlanSelect(data,id,option){//defClass\id
        debugger
        data = data.find((item)=>{
            return item.id == id
        })
        let {serachMapData,witchSeach,pagination} = this.props.$$state.toJS()
        this.props.action.getListData(
            pagination,
            {defClass:data.defClass,id:data.id},
            'searchPlanMap'
        );
    }

    //存储建议查询条件
    searchMapFn(searchMap) {
        debugger
        this.props.action.saveSearchMap(searchMap);
    }
    // 2.6 余春梅 查询条件导出转化
    changeSearchData(data){
        for (let key in data) {
            if (key == 'isGroup'|| key == 'cannelType'|| key == 'enableState'|| key == 'level'|| key == 'state'|| key == 'type') {
                if(data[key] && data[key].key){
                    data[key] = data[key].key
                }
            }
            if (key == 'province_city_district' && data[key]) {
                data.province = data[key][0];
                data.city = data[key][1];
                data.district = data[key][2];
                delete data.province_city_district;
            }

            if (key == 'industry' && data[key]) {
                data[key] = data[key].id; //这会直接影响searchMap里industry的值，所以要先在不改变原先对象的基础上 改变原对象的id  进行原对象inmutable拷贝对象
            }
        }
        return data
    }

     // 导入导出 余春梅  1.30
     onMenu(e) {
        debugger
        let { searchMap, pagination } = this.props.$$state.toJS();
        let page = pagination.page;
        let pageSize = pagination.pageSize
        let tranSearch=this.changeSearchData.call(this,searchMap);
        let search = JSON.stringify(tranSearch)
        debugger
        if (e.key == "1") {
            debugger
            this.props.action.viewLeadShow(true);
        } else if (e.key == "2") {
            location.href = baseDir + "tpub/excels/1/export?param=" + "{\"page\":" + `${page}` + ",\"pageSize\":" + `${pageSize}` + ",\"searchMap\":" + `${search}` + ",\"mode\":" + 2 + "}"

        }
    }


    render() {
        let { enumData, moreShow, selectedRowKeys, newCumMenu,searchPlan } = this.props.$$state.toJS();
        const loop = data => {
            return(
                data.map((item, index) => {
                    return <Menu.Item key={item.key} >{item.title}</Menu.Item>
                })
            )
        }

        const newBtnMenu = (
            <Menu onClick={this.newCumMenuClick.bind(this)}>
                {newCumMenu && newCumMenu.length<1?loop(newCumMenu):''}
            </Menu>
        );

        const moreMenu = (
            <Menu onClick={this.onMenu.bind(this)}>
                <Menu.Item key="1" className="customer_list_import_customer">
                    <span>导入</span>
                </Menu.Item>
                <Menu.Item key="2" className="customer_list_export_customer">
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
                            className="returnbtn-class customer_list_delete_customer"
                            onClick={this.btnDelete.bind(this)}
                        >
                            <i className="iconfont icon-shanchu" />删除
                        </Button>

                        <ButtonGroup className="returnbtn-class">
                            <Button onClick={this.btnSetEnable.bind(this, 1)} className="customer_list_start_customer">
                                <i className="iconfont icon-qiyong" />启用
                            </Button>
                            <Button onClick={this.btnSetEnable.bind(this, 2)} className="customer_list_stop_customer">
                                <i className="iconfont icon-tingyong" />停用
                            </Button>
                        </ButtonGroup><ButtonGroup className="returnbtn-class">
                            <Button onClick={this.btnSetEnable.bind(this, 1)} className="customer_list_start_customer">
                                <i className="iconfont icon-qiyong" />启用
                            </Button>
                            <Button onClick={this.btnSetEnable.bind(this, 2)} className="customer_list_stop_customer">
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
                                            <Select defaultValue="全部" onSelect = {this.searchPlanSelect.bind(this,searchPlan)}>
                                                {
                                                    searchPlan && searchPlan.length?
                                                    searchPlan.map((item,index)=>{
                                                        return (
                                                            <Option value={item.id}>{item.name}</Option>
                                                        )
                                                    }):<Option value="disabled" disabled>暂无数据</Option>
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
                                        <Dropdown overlay={newBtnMenu} trigger={['click']} placement="bottomCenter"> 
                                            <Button className="customer_list_add_customer" type="primary" onClick = {this.btnNew.bind(this)}>
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
        $$state: state.customerList
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
