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
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as Actions from "../../action";

import { baseDir } from "api";
import reqwest from "utils/reqwest";
const Search = Input.Search;
const confirm = Modal.confirm;

import DropDownModal from '../../../../common/DrowdownModal'

class IcbcDetailInfo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            icbcList: [],
            select: "",
            index: -1,
            value:props.viewDataProps.name,//下拉面板中input的参数
        };
    }

    //遍历更改客户数据
    changeCustomer(viewData) {
        //industry  ownerUserId  province_city_district
        debugger
        for (let key in viewData) {
            if (key == 'industry' || key == 'ownerUserId') {
                if (viewData[key].id) {
                    viewData[key] = viewData[key].id
                } else {
                    viewData[key] = 'undefined'
                }
            }
            if (key == 'province_city_district') {
                if (viewData[key]) {
                    viewData[key] = viewData[key].result.join('_')
                }
            }
        }
        debugger
        return viewData
    }


    //覆盖表单信息二次确认modal
    icbcConfirm = () => {
        let that = this;

        confirm({
            title: '确认覆盖客户信息?',
            content: '此操作会覆盖现有信息',
            onOk() {
                debugger
                let { viewData, icbcInfo1 } = that.props.$$state.toJS();
                let name
                name = icbcInfo1.find((item) => {
                    return item.key == 'verifyFullname'
                })
                viewData.verifyFullname = name.value
                viewData.fullname = name.value
                debugger
                icbcInfo1.forEach(item => {
                    if (item.key == "street") {
                        viewData["street"] = item.value;
                    } else if (item.key == "bizRegno") {
                        viewData["bizRegno"] = item.value;
                    } else if (item.key == "orgCode") {
                        viewData["orgCode"] = item.value;
                    } else if (item.key == "regCapital") {
                        viewData["regCapital"] = item.value;
                    } else if (item.key == "legalRepresent") {
                        viewData["legalRepresent"] = item.value;
                    } else if (item.key == "industry") {
                        viewData["industry"] = { name: item.value };
                    } else if (item.key == "email") {
                        viewData["email"] = item.value;
                    } else if (item.key == "tel") {
                        viewData["tel"] = item.value;
                    } else if (item.key == "taxpayerNo") {
                        viewData["taxpayerNo"] = item.value;
                    } else if (item.key == "remark") {
                        viewData["remark"] = item.value;
                    }
                });
                viewData = that.changeCustomer(viewData)
                //点击覆盖值    获取客户时并没有保存上！！！！！！！！！！！！！！！！！！！！！！！！
                that.props.action.checkedFn(viewData, that.state.select, viewData.id, false);
            },
            onCancel() {
                that.onIcbcCancel.bind(this)
            },
        });
    }

    //取消核实
    cancelIdenti() {
        let { viewData } = this.props.$$state.toJS();
        let id = viewData.id;
        let visiable = false;
        debugger
        this.props.action.checkedCancelFn(id, visiable);
    }

    //modal底部显示按钮
    footerContent() {
        let { viewData } = this.props.$$state.toJS();
        return (
            <div>
                <Button onClick={this.onIcbcCancel.bind(this)}>关闭</Button>
                { viewData.verifyId? (
                    <Button onClick={this.cancelIdenti.bind(this)}>
                        取消核实
                    </Button>
                ) : (
                    <Button onClick={this.icbcConfirm.bind(this)}>
                        核实
                    </Button>
                )}
            </div>
        );
    }

    //点击已核实按钮
    checked() {
        let { viewData } = this.props.$$state.toJS();
        let verifyId = viewData.verifyId;
        this.props.action.modalDetalVisiable(true, verifyId);
    }

    //工商核实modal层点击取消按钮触发方法
    onIcbcCancel() {
        this.props.action.modalDetalVisiableFalse(false);
    }

    //选择列表获取工商信息详情,获取的详情，已选择的公司名称，显示modal
    customerListInfo(data, visiable) {
        debugger
        this.props.action.icbcDetailInfo(data, visiable);
    }

    //根据客户名称，获取搜索工商核实列表
    getIcbcList(name, callback) {
        debugger
        reqwest(
            {
                url: baseDir + "cum/customers/identifications/",
                method: "GET",
                data: {
                    param: {
                        name,
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
    getIcbcDetal(select, visiable) {
        let id = select.companyid
        debugger
        reqwest(
            {
                url: baseDir + "cum/customers/identifications/" + id,
                method: "GET"
            },
            result => {
                debugger
                this.customerListInfo(result.data, visiable);
            }
        );
    }



    //点击获取工商核实按钮
    getIcbc(flag) {
        debugger
        let { viewData, icbcInfo1 } = this.props.$$state.toJS()
        let icbcName = viewData.name;
        let verifyId = viewData.verifyId
        debugger
        if (flag) {
            debugger
            //如果面板是显示状态
            if (icbcName) {
                debugger;
                if (viewData.verifyId) {//如果已核实
                    debugger
                    //再次点击工商核实并没有把值返回给我！！！！！！！！！！！！！！！！！！！1
                    this.props.action.hasIcbc(viewData.verifyFullname, viewData.verifyId,true)
                } else {
                    debugger
                    this.getIcbcList(icbcName, result => {
                        debugger
                        if (result.data && result.data.length) {
                            debugger
                            this.setState({
                                visible: flag,
                                icbcList: result.data
                            });
                        }
                    });
                }
            }
        } else {
            debugger
            //如果面板是关闭状态
            this.setState({
                visible: flag
            });
        }
    }

    //下拉面板获取一条公司数据
    onSelect(item, n) {
        this.setState({
            select: item,
            index: n
        });
    }

    //下拉面板点击确定
    onOk() {
        debugger
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
                this.getIcbcDetal(this.state.select, modalVisiable);
            }
        );
    }

    //下拉面板点击取消
    onCancel() {
        this.setState({
            visible: false,
            index: -1
        });
    }

    //下拉面板中搜索
    onSearch() {
        debugger
        let value = this.state.value;
        let {viewData} = this.props.$$state.toJS();
        if(!value){
            value = viewData.name
        }
        this.getIcbcList(value, result => {
            if (result.data && result.data.length) {
                this.setState({
                    icbcList: result.data
                });
            }
        });
    }

    //下拉面板中input触发onchange
    onChange(value) {
        debugger
        this.setState({
            value
        })
    } 

    createList() {
        debugger;
        let index = this.state.index;
        let { viewData } = this.props.$$state.toJS()
        return (
            <DropDownModal
                title='工商列表'
                onCancel={this.onCancel.bind(this)}
                onOk={this.onOk.bind(this)}
                onSearch={this.onSearch.bind(this)}
                value={this.state.value}
                onChange={this.onChange.bind(this)}
                width={400}
                height={380}
            >
                <div className='' style={{ width: '100%' }}>
                    {this.state.icbcList &&
                        this.state.icbcList.length ? (
                            this.state.icbcList.map((item, n) => {
                                return (
                                    <div
                                        className={index == n ? "icbc-item-choice" : "icbc-item"}
                                        onClick={this.onSelect.bind(this, item, n)}
                                    >
                                        {item.companyname}
                                    </div>
                                );
                            })
                        ) : (
                            <div className="icbc-item">暂无数据</div>
                        )}
                </div>
            </DropDownModal>
        );
    }

    render() {
        let { viewData, icbcVisible2, icbcInfo1 } = this.props.$$state.toJS()
        debugger;
        let cssCode = this.props.$$menuState.get("cssCode");
        debugger
        return (
            <div className="icbc-detail-container">

                {/* {cssCode.indexOf("customer_view_verify_customer") ?
                    <Dropdown
                        overlay={this.createList()} //生成下拉结构样式
                        trigger={["click"]}
                        onVisibleChange={this.getIcbc.bind(this)} //聚焦、和点击外侧时显示关闭下拉面板
                        visible={this.state.visible} //受控面板显示
                    >
                        <div>
                            {
                                viewData.verifyFullname ?
                                    <Row type='flex' justify='center'>
                                        <img src={require("assets/images/cum/icbc-true.png")} className='icbc-icon' />已核实
                            </Row> :
                                    ""
                            }
                        </div>
                    </Dropdown>
                    :
                    viewData.verifyFullname ?
                        <Row type='flex' justify='center'>
                            <img src={require("assets/images/cum/icbc-true.png")} className='icbc-icon' />已核实
                            </Row> :
                        ""
                } */}
               
               <Dropdown
                    overlay={this.createList()} //生成下拉结构样式
                    trigger={["click"]}
                    onVisibleChange={this.getIcbc.bind(this)} //聚焦、和点击外侧时显示关闭下拉面板
                    visible={this.state.visible} //受控面板显示
                >
                    <div>
                        {
                            viewData.verifyId?
                            <Row type = 'flex' justify='center'>
                                <img src={require("assets/images/cum/icbc-true.png")} className='icbc-icon'/>已核实
                            </Row>:
                            <Row type = 'flex' justify='center'>
                                 <img src={require("assets/images/cum/icbc-false.png")}  className='icbc-icon'/>未核实
                            </Row>
                        }
                    </div>
                </Dropdown>
               
                <Modal
                    title="工商详情"
                    visible={icbcVisible2}
                    onCancel={this.onIcbcCancel.bind(this)}
                    footer={this.footerContent.call(this)}
                    width={500}
                    maskClosable={false}
                >
                    <div className="modal-height">
                        {icbcInfo1 && icbcInfo1.length
                            ? icbcInfo1.map(item => {
                                return (
                                    <div className="icbc-detail-item">
                                        <span>{item.name}</span>:<span>
                                            {item.value}
                                        </span>
                                    </div>
                                );
                            })
                            : ""}
                    </div>
                </Modal>
            </div>
        );
    }
}

//绑定状态到组件props
function mapStateToProps(state, ownProps) {
    return {
        $$state: state.customerGroupList,
        $$menuState: state.commonMenu
    };
}
//绑定action到组件props
function mapDispatchToProps(dispatch) {
    return {
        action: bindActionCreators(Actions, dispatch)
    };
}
//输出绑定state和action后组件
export default connect(mapStateToProps, mapDispatchToProps)(IcbcDetailInfo);
