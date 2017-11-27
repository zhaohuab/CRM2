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

const list = [{ id: 1, value: "用友1" }, { id: 2, value: "用友2" }];

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
    getIcbc(flag) {
        if (!this.props.viewData.name) {
            message.error("请输入客户名称", 5);
        } else {
            //使用客户名称 获取模糊匹配列表保存在redux中，
            let icbcName = this.props.viewData.name;
            //如果有认证信息显示出列表，没有分别显示message报错或者修改用户名按钮
            //使用request,把请求完的数据放在state中进行条目遍历
            if (flag) {
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
                        //
                        this.setState({
                            visible: flag,
                            icbcList: result.data
                        });
                    }
                );
            } else {
                this.setState({
                    visible: flag
                });
            }
        }
    }
    onSelect(item, n) {
        debugger;
        this.setState({
            select: item.companyid,
            index: n
        });
    }

    onOk() {
        this.setState(
            {
                visible: false,
                index: -1
            },
            () => {
                //根据id进行action查询工商详情查询，改变modal1的显示，modal1获取工商详情查询数据
                reqwest(
                    {
                        url:
                            baseDir +
                            "cum/customers/identifications/" +
                            this.state.select,
                        method: "GET"
                    },
                    result => {
                        debugger;
                        this.setState({
                            visible: false
                        });
                    }
                );
                // this.props.customerListInfo({ id: this.state.select });
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
            <div className="industry-main">
                <Row
                    type="flex"
                    justify="space-between"
                    className="industry-main-header"
                >
                    <div className="title">行业</div>
                </Row>
                <Row className="industry-main-choice" type="flex">
                    <div className="inner">
                        {this.state.icbcList && this.state.icbcList.length
                            ? this.state.icbcList.map((item, n) => {
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
                            : "暂无数据"}
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
                        <i className="iconfont icon-gongshangheshi" />工商核实
                    </Button>
                </Dropdown>
            </div>
        );
    }
}
