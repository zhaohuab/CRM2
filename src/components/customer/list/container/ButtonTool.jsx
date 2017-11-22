import { Modal, Cascader, Select, Form, Row, Col, Input, Button, Icon } from "antd";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Enum from 'utils/components/enums'
const FormItem = Form.Item;
const Option = Select.Option;
const ButtonGroup = Button.Group;
const confirm = Modal.confirm;
import "assets/stylesheet/all/iconfont.css";
//导入action方法
import * as Actions from "../action";

import HeaderButton from "../../../common/headerButtons/headerButtons.jsx";

class SimForm extends React.Component {
    constructor(props) {
        super(props);
    }
    handleSearch(e) {
        e.preventDefault();
        this.props.handleSearch(this.props.form.getFieldsValue());
    }
    componentDidMount() {
        this.props.form.setFieldsValue(this.props.searchMap);
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: { span: 2 },
            wrapperCol: { span: 22 }
        };
        return (
            <div className="form-top" id="recover-btn">
                <Form layout="inline" onSubmit={this.handleSearch.bind(this)}>
                    <Row>
                        <Col span={8}>
                            <FormItem  {...formItemLayout} >
                                {getFieldDecorator('name', {
                                })(
                                    <Input type='text' placeholder="客户名称" />
                                    )}
                            </FormItem>
                        </Col>
                        <Col span={8}>
                            <FormItem   {...formItemLayout} >
                                {getFieldDecorator('level', {
                                })(
                                    <Enum
                                        addOptionAll={"客户等级"}
                                        dataSource={
                                            this.props.refData.level
                                        }
                                    />
                                    )}
                            </FormItem>
                        </Col>
                        {/* <FormItem style={{ width: 200 }}  {...formItemLayout} >
                            {getFieldDecorator('saleArea', {
                                rules: [{ required: true, message: '请输入营销区域!' }],
                            })(
                                <Enum
                                    initValue={this.props.searchMap.saleArea}
                                    addOptionAll={'营销区域'}
                                    dataSource={this.props.enumData.saleAreaEnum}
                                />
                                )}
                        </FormItem> */}
                        <Col span={8}>
                            <div className="more-btn">
                                <Button htmlType="submit">查询</Button>
                                <span
                                    onClick={this.props.btnMore.bind(this, {
                                        simForm: false,
                                        milForm: true
                                    })}
                                >
                                    更多 <Icon type="down" />
                                </span>
                            </div>
                        </Col>
                    </Row>
                </Form>
            </div>
        );
    }
}

class MilForm extends React.Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        this.props.form.setFieldsValue(this.props.searchMap);
    }

    handleSearch(e) {
        e.preventDefault();
        this.props.handleSearch(this.props.form.getFieldsValue());
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: { span: 2 },
            wrapperCol: { span: 22 }
        };
        return (
            <div className="form-bottom" id="recover-btn">
                <Form layout="inline" onSubmit={this.handleSearch.bind(this)}>
                    <Row>
                        <Col span={6}>
                            <FormItem {...formItemLayout} >
                                {getFieldDecorator('name', {
                                })(
                                    <Input type='text' placeholder="客户名称" />
                                    )}
                            </FormItem>
                        </Col>
                        <Col span={6}>
                            <FormItem  {...formItemLayout} >
                                {getFieldDecorator('level', {
                                })(
                                    <Enum
                                      //  initValue={this.props.searchMap.level}
                                        addOptionAll={"客户等级"}
                                        dataSource={
                                            this.props.refData.level
                                        }
                                    />
                                    )}
                            </FormItem>
                        </Col>
                        <Col span={6}>
                            <FormItem  {...formItemLayout} >
                                {getFieldDecorator('saleArea', {
                                })(
                                    <Enum
                                    //    initValue={this.props.searchMap.saleArea}
                                        addOptionAll={"营销区域"}
                                        dataSource={
                                            this.props.enumData.saleAreaEnum
                                        }
                                    />
                                    )}
                            </FormItem>
                        </Col>
                        <Col span={6}>
                            <FormItem {...formItemLayout} >
                                {getFieldDecorator('province_city_district', {
                                })(
                                    <Cascader
                                        options={this.props.cityData}
                                        placeholder="省/市/区/县"
                                    />
                                    )}
                            </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={6}>
                            <FormItem {...formItemLayout} >
                                {getFieldDecorator('parentId', {
                                })(
                                    <Input type='text' placeholder="上级客户" />
                                    )}
                            </FormItem>
                        </Col>
                        <Col span={6}>
                            <FormItem {...formItemLayout} >
                                {getFieldDecorator('industry', {
                                })(
                                    <Enum
                                        //initValue={ this.props.searchMap.industry}
                                        addOptionAll={"行业"}
                                        dataSource={
                                            this.props.enumData.industryEnum
                                        }
                                    />
                                    )}
                            </FormItem>
                        </Col>
                        <Col span={6}>
                            <FormItem  {...formItemLayout} >
                                {getFieldDecorator('cannelType', {
                                })(
                                    <Enum
                                        //initValue={this.props.searchMap.cannelType}
                                        addOptionAll={"渠道类型"}
                                        dataSource={
                                            this.props.refData.cannelType
                                        }
                                    />
                                    )}
                            </FormItem>
                        </Col>
                        <Col span={6}>
                            <FormItem  {...formItemLayout} >
                                {getFieldDecorator('lifecycle', {
                                })(
                                    <Enum
                                        //initValue={this.props.searchMap.lifecycle}
                                        addOptionAll={"生命周期"}
                                        dataSource={
                                            this.props.enumData.lifecycleEnum
                                        }
                                    />
                                    )}
                            </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={6}>
                            <FormItem  {...formItemLayout} >
                                {getFieldDecorator('enableState', {
                                })(
                                    <Enum
                                     //   initValue={this.props.searchMap.enableState}
                                        addOptionAll={'启用状态'}
                                        dataSource={this.props.enumData.enableStateEnum}
                                    />
                                    )}
                            </FormItem>
                        </Col>
                        <Col span={6}>
                            <div className="more-btn">
                                <Button htmlType="submit">查询</Button>
                                <span
                                    onClick={this.props.btnLess.bind(this, {
                                        simForm: true,
                                        milForm: false
                                    })}
                                >
                                    收起 <Icon type="up" />
                                </span>
                            </div>
                        </Col>
                    </Row>
                </Form>
            </div>
        );
    }
}

class ToolForm extends React.Component {
    constructor(props) {
        super(props);
    }
    state = {
        expand: false
    };

    handleReset = () => {
        this.props.form.resetFields();
    };

    toggle = () => {
        const { expand } = this.state;
        this.setState({ expand: !expand });
    };

    btnBack() {
        const nowVisible = this.props.$$state.get("toolVisible").toJS();
        nowVisible.btnPanel = false;
        if (nowVisible.milForm == true) {
            nowVisible.simForm = false;
        } else {
            nowVisible.simForm = true;
        }
        this.props.action.selectRow([],[],nowVisible);
    }

    btnSetEnable(enableState) {
        const searchMap = this.props.$$state.get("searchMap").toJS();
        const selectRow = this.props.$$state.get("selectedRows").toJS();
        const ids = [];
        for (let i = 0; i < selectRow.length; i++) {
            ids.push(selectRow[i].id);
        }
        this.props.action.setEnableState(
            ids,
            enableState,
            this.props.$$state.get("pagination").toJS(),
            searchMap
        );
    }

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
                that.props.action.deleteData(ids, searchMap, that.props.$$state.get("pagination").toJS());
            },
            onCancel() {
                console.log("Cancel");
            }
        });
    }
    btnNew() {
        this.props.action.showForm(true, false);
    }
    changeVisible(visible) {
        const nowVisible = this.props.$$state.get("toolVisible").toJS();
        if (visible.simForm != undefined) {
            nowVisible.simForm = visible.simForm;
            if (nowVisible.btnPanel == true) {
                nowVisible.simForm = false;
            }
        }
        if (visible.milForm != undefined) {
            nowVisible.milForm = visible.milForm;
        }

        this.props.action.changeVisible(nowVisible);
    }
    handleSearch(searchMap) {
        this.props.action.getListData(this.props.$$state.get("pagination").toJS(), searchMap);
    }

    render() {
        const WarpSimForm = Form.create()(SimForm);
        const WarpMilForm = Form.create()(MilForm);
        const enumData = this.props.$$state.get("enumData").toJS();
        const selectedRows = this.props.$$state.get("selectedRows").toJS();
        const searchMap = this.props.$$state.get("searchMap").toJS();
        return (
            <div className="label-form-more">
                {this.props.visible.btnPanel ? (

                    <HeaderButton
                        goBack={this.btnBack.bind(this)}
                        length={selectedRows.length}>
                        <Button className='returnbtn-class' onClick={this.btnDelete.bind(this)}><i className='iconfont icon-shanchu'></i>删除</Button>

                        <ButtonGroup className='returnbtn-class'>
                            <Button onClick={this.btnSetEnable.bind(this, 1)}><i className='iconfont icon-qiyong'></i>启用</Button>
                            <Button onClick={this.btnSetEnable.bind(this, 2)}><i className='iconfont icon-tingyong'></i>停用</Button>
                        </ButtonGroup>
                    </HeaderButton>
                ) : ""}
                <div>
                    {this.props.visible.btnPanel ? "" : <div>
                        <div className="label-form-top">

                            <div className="label-form-topleft">

                                <div id="recover-select">
                                    <Select
                                        defaultValue="3"
                                        className="first-select"
                                    >
                                        <Option value="0">全部</Option>
                                        <Option value="1">我关注的</Option>
                                        <Option value="2">最近新建</Option>
                                        <Option value="3">最近查看</Option>
                                    </Select>
                                </div>
                                <div
                                    className={
                                        this.props.visible.simForm
                                            ? "showleft-form"
                                            : "form-hide"
                                    }
                                >
                                    <WarpSimForm
                                    searchMap={searchMap}
                                        refData={enumData}
                                        enumData={this.props.enumData}
                                        handleSearch={this.handleSearch.bind(this)}
                                        btnMore={this.changeVisible.bind(this)}
                                    />
                                </div>
                            </div>
                            <div className="label-form-topright">
                                <ButtonGroup className="list-add-group">
                                    <Button>
                                        <i className="iconfont icon-daoru" />导入
                                    </Button>
                                    <Button>
                                        <i className="iconfont icon-daochu" />导出
                                    </Button>
                                </ButtonGroup>
                                <Button
                                    type="primary"
                                    onClick={this.btnNew.bind(this)}
                                >
                                    <i className="iconfont icon-xinjian" />新建
                                </Button>
                            </div>
                        </div>

                    </div>}
                    <div
                        className={
                            this.props.visible.milForm
                                ? "label-form-bottom"
                                : "form-hide"
                        }
                    >
                        <WarpMilForm
                        searchMap={searchMap}
                            enumData={this.props.enumData}
                            refData={enumData}
                            cityData={this.props.cityData}
                            handleSearch={this.handleSearch.bind(this)}
                            btnLess={this.changeVisible.bind(this)}
                        />
                    </div>
                </div>


            </div>
        );
    }
}
//绑定状态到组件props
function mapStateToProps(state, ownProps) {
    return {
        $$state: state.customerList,
        $$stateCommon: state.componentReducer
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

