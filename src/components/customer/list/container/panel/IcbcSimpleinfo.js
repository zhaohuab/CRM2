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

export default class IcbcSimpleinfo extends React.Component {
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
                        size: 30
                    }
                }
            },
            result => {
                callback(result);
            }
        );
    }

    //根据客户id获取详细客户工商信息
    getIcbcDetal(id, visiable) {
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
                this.props.customerListInfo(result.data, id, visiable);
            }
        );
    }

    getIcbc(flag) {
        let icbcName = this.props.viewData.name;

        if (flag) {
            //如果面板是显示状态
            if (icbcName) {
<<<<<<< HEAD
                //debugger;
=======
                ;
>>>>>>> 312d46699d979d9b7f362833e04a0fd802dbca3c
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
                let modalVisiable = true;
<<<<<<< HEAD
                //debugger;
=======
                ;
>>>>>>> 312d46699d979d9b7f362833e04a0fd802dbca3c
                this.getIcbcDetal(this.state.select, modalVisiable);
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

        return (
            <div className="reference">
                <div
                    className="reference-main"
                    style={{
                        width: this.props.width
                            ? this.props.width + "px"
                            : "300px"
                    }}
                >
                    <Row
                        type="flex"
                        justify="space-between"
                        className="reference-main-header"
                    >
                        <div className="title">企业核实</div>
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
                    <Button>
                        <i className="iconfont icon-gongshangheshi" />企业核实
                    </Button>
                </Dropdown>
            </div>
        );
    }
}
