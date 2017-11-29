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
    Menu,
    Dropdown,
    Tree,
    message
} from "antd";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import "assets/stylesheet/all/iconfont.css";
import * as Actions from "../action";
import debounce from "lodash.debounce";
import { baseDir } from "api";
import reqwest from "utils/reqwest";
const Search = Input.Search;

export default class IcbcInfo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            icbcList: [],
            select: "",
            index: -1
        };
    }
    //根据客户名称，获取搜索工商核实列表
    getIcbcList(name, callback) {
        reqwest(
            {
                url: baseDir + "cum/customers/identifications/",
                method: "GET",
                data: {
                    param: {
                        name: this.props.viewData.name,
                        size: 10
                    }
                }
            },
            result => {
                callback(result);
            }
        );
    }

    //根据客户id获取详细客户工商信息
    getIcbcDetal(id, name, visiable, editId, changeState, isClose) {
        reqwest(
            {
                url: baseDir + "cum/customers/identifications/" + id,
                method: "GET"
            },
            result => {
                debugger;
                //把获取到的工商信息放在redux中
                //或获取到的id客户详细信息，id号保存在redux中
                this.props.customerListInfo(
                    result.data,
                    id,
                    name,
                    visiable,
                    editId,
                    changeState,
                    isClose
                );
            }
        );
    }

    getIcbc(flag) {
        let icbcName = this.props.viewData.name;
        //如果有认证信息显示出列表，没有分别显示message报错或者修改用户名按钮
        //使用request,把请求完的数据放在state中进行条目遍历
        //如果已经有客户工商id则直接用id获取详细信息
        if (flag) {
            //如果面板是显示状态
            if (icbcName) {
                debugger;
                //编辑
                let editId = this.props.viewData.id;
                let verifyId = this.props.viewData.verifyId;
                let stateChange = this.props.icbcSelect;
                let isClose = this.props.isClose;
                if (editId) {
                    if (verifyId && !isClose) {
                        this.getIcbcDetal(
                            verifyId,
                            icbcName,
                            true,
                            editId,
                            true
                        );
                    } else if (verifyId && stateChange) {
                        //修改，或者查看，如果拿到的数据有verifyId，就直接用verifyId请求详情数据
                        this.getIcbcDetal(verifyId, icbcName, true, editId);
                    } else {
                        this.getIcbcList(icbcName, result => {
                            if (result.data && result.data.length) {
                                this.setState({
                                    visible: flag,
                                    icbcList: result.data
                                });
                            }
                        });
                    }
                } else {
                    //新增
                    if (verifyId && stateChange) {
                        //判断是否验证过，如果验证过不出下拉列表直接展示工商信息
                        this.getIcbcDetal(verifyId, icbcName, true);
                    } else {
                        //如果输入客户名称，请求输入名称商户信息
                        this.getIcbcList(icbcName, result => {
                            if (result.data && result.data.length) {
                                this.setState({
                                    visible: flag,
                                    icbcList: result.data
                                });
                            }
                        });
                    }
                }
            } else {
                //没输入客户名称，搜索没有查询条件，列表没有数据
                this.setState({
                    visible: flag,
                    icbcList: []
                });
            }
        } else {
            //如果面板是关闭状态
            this.setState({
                visible: flag
            });
        }
    }

    onSelect(item, n) {
        this.setState({
            select: item.companyid,
            index: n
        });
    }

    onOk() {
        if (!this.state.select) {
            this.setState({
                visible: false
            });
            return;
        }
        this.setState(
            {
                visible: false,
                index: -1
            },
            () => {
                //根据id进行action查询工商详情查询，改变modal1的显示，modal1获取工商详情查询数据
                let editId = this.props.viewData.id;
                this.getIcbcDetal(
                    this.state.select,
                    this.props.viewData.name,
                    true,
                    editId,
                    true
                );
                console.log(this.props.viewData.verifyId, "--------------");
            }
        );
    }

    onCancel() {
        this.setState({
            visible: false,
            index: -1
        });
    }

    choiceIndustry() {
        let index = this.state.index;
        console.log(this.props.viewData.name);
        return (
            <div
                className="industry-main"
                style={{
                    width: this.props.width ? this.props.width + "px" : "300px"
                }}
            >
                <Row
                    type="flex"
                    justify="space-between"
                    className="industry-main-header"
                >
                    <div className="title">工商核实</div>
                    <div>
                        <Search
                            placeholder="客户名称搜索"
                            style={{ width: 200 }}
                            onSearch={value => console.log(value)}
                            value={
                                this.props.viewData.name
                                    ? this.props.viewData.name
                                    : ""
                            }
                        />
                    </div>
                </Row>
                <Row className="industry-main-choice" type="flex">
                    <div className="inner">
                        {this.state.icbcList && this.state.icbcList.length ? (
                            this.state.icbcList.map((item, n) => {
                                return (
                                    <div
                                        className={
                                            index == n
                                                ? "icbc-item-choice"
                                                : "icbc-item"
                                        }
                                        onClick={this.onSelect.bind(
                                            this,
                                            item,
                                            n
                                        )}
                                    >
                                        {item.companyname}
                                    </div>
                                );
                            })
                        ) : (
                            <div className="icbc-item">暂无数据</div>
                        )}
                    </div>
                </Row>
                <Row
                    type="flex"
                    justify="end"
                    align="middle"
                    className="industry-main-footer"
                >
                    <Row type="flex" justify="end" align="middle" gutter={15}>
                        <div>
                            <Button onClick={this.onCancel.bind(this)}>
                                取消
                            </Button>
                        </div>
                        <div>
                            <Button
                                type="primary"
                                onClick={this.onOk.bind(this)}
                            >
                                确定
                            </Button>
                        </div>
                    </Row>
                </Row>
            </div>
        );
    }

    render() {
        const suffix =
            this.props.value && this.props.value.name ? (
                <Icon type="close" onClick={this.emitEmpty.bind(this)} />
            ) : null;

        return (
            <div className="">
                <Dropdown
                    overlay={this.choiceIndustry()} //生成下拉结构样式
                    trigger={["click"]}
                    onVisibleChange={this.getIcbc.bind(this)} //聚焦、和点击外侧时显示关闭下拉面板
                    visible={this.state.visible} //受控面板显示
                >
                    <Button size="small" className="icbc-btn">
                        <i className="iconfont icon-gongshangheshi" />核实
                    </Button>
                </Dropdown>
            </div>
        );
    }
}
