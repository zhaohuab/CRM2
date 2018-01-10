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

import "assets/stylesheet/all/iconfont.css";

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
        debugger;
        reqwest(
            {
                url: baseDir + "cum/customers/identifications/",
                method: "GET",
                data: {
                    param: {
                        name: this.props.attr.viewData.name,
                        size: 30
                    }
                }
            },
            result => {
               // debugger;
                callback(result);
            }
        );
    }

    //根据客户id获取详细客户工商信息 id为公司id
    getIcbcDetal(id, visiable) {
        debugger;
        reqwest(
            {
                url: baseDir + "cum/customers/identifications/" + id,
                method: "GET"
            },
            result => {
<<<<<<< HEAD
                //debugger;
=======
                ;
>>>>>>> 312d46699d979d9b7f362833e04a0fd802dbca3c
                //把获取到的工商信息放在redux中
                //或获取到的id客户详细信息，id号保存在redux中
                this.props.attr.customerListInfo(result.data, visiable, id);
            }
        );
    }

    //点击核实按钮，判断有工商id与否
    getIcbc(flag) {
        let icbcName = this.props.attr.viewData.name;
        let verifyId = this.props.attr.viewData.verifyId;
        let icbcSelect = this.props.attr.icbcSelect;
        let isClose = this.props.attr.isClose;
        if (flag) {
            //如果面板是显示状态
            if (icbcName) {
                // if (verifyId) {//获取认证特有属性不是verifyId
                //     let visiable = true;
                //     //getIcbcDetal(verifyId, visiable)
                // } else {
                this.getIcbcList(icbcName, result => {
                    if (result.data && result.data.length) {
                        this.setState({
                            visible: flag,
                            icbcList: result.data
                        });
                    }
                });
                //}
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
<<<<<<< HEAD
=======
                ;
>>>>>>> 312d46699d979d9b7f362833e04a0fd802dbca3c
                let visiable = true;
                this.getIcbcDetal(this.state.select, visiable);
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
        console.log(this.props.attr.viewData.name);
        return (
            <div className="reference">
                <div
                    className="reference-main"
                    style={{
                        width: this.props.attr.width
                            ? this.props.attr.width + "px"
                            : "300px"
                    }}
                >
                    <Row
                        type="flex"
                        justify="space-between"
                        className="reference-main-header"
                    >
                        <div className="title">工商核实</div>
                        <div>
                            <Search
                                placeholder="客户名称搜索"
                                style={{ width: 200 }}
                                onSearch={value => console.log(value)}
                                value={
                                    this.props.attr.viewData.name
                                        ? this.props.attr.viewData.name
                                        : ""
                                }
                            />
                        </div>
                    </Row>
                    <Row className="reference-main-choice" type="flex">
                        <div className="inner">
                            {this.state.icbcList &&
                            this.state.icbcList.length ? (
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
                        className="reference-main-footer"
                    >
                        <Row
                            type="flex"
                            justify="end"
                            align="middle"
                            gutter={15}
                        >
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
            </div>
        );
    }

    render() {
<<<<<<< HEAD
        let attr = this.props.attr;
=======
>>>>>>> 312d46699d979d9b7f362833e04a0fd802dbca3c
        return (
            <div className="">
                <Dropdown
                    overlay={this.choiceIndustry()} //生成下拉结构样式
                    trigger={["click"]}
                    onVisibleChange={this.getIcbc.bind(this)} //聚焦、和点击外侧时显示关闭下拉面板
                    visible={this.state.visible} //受控面板显示
                >
                    <Button size="small" className="icbc-btn">
                        <i className="iconfont icon-gongshangheshi" />企业核实
                    </Button>
                </Dropdown>
            </div>
        );
    }
}
