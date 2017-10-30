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

import Enum from "utils/components/enum";
const FormItem = Form.Item;
const Option = Select.Option;
const ButtonGroup = Button.Group;
const confirm = Modal.confirm;
import "assets/stylesheet/all/iconfont.css";

class BtnPanel extends React.Component {
    constructor(props) {
        super(props);
    }
    btnBack() {
        this.props.btnBack();
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
                that.props.btnDelete();
            },
            onCancel() {
                console.log("Cancel");
            }
        });
    }

    render() {
        return (
            <div className="hide-label">
                <div className="hide-label-left">
                    <Button
                        className="returnbtn-class"
                        onClick={this.btnBack.bind(this)}
                    >
                        <i className="iconfont icon-fanhui" />返回
                    </Button>
                    <Button
                        className="returnbtn-class"
                        onClick={this.btnDelete.bind(this)}
                    >
                        <i className="iconfont icon-shanchu" />删除
                    </Button>

                    <ButtonGroup className="returnbtn-class">
                        <Button onClick={this.props.btnSetEnable.bind(this, 1)}>
                            <i className="iconfont icon-qiyong" />启用
                        </Button>
                        <Button onClick={this.props.btnSetEnable.bind(this, 2)}>
                            <i className="iconfont icon-tingyong" />停用
                        </Button>
                    </ButtonGroup>
                    <Button className="returnbtn-class">
                        <i className="iconfont icon-daochu" />导出
                    </Button>
                </div>
                <div className="hide-label-right">
                    <Icon type="close" />
                </div>
            </div>
        );
    }
}

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
        const children = [];
        return (
            <div className="form-top" id="recover-btn">
                <Form layout="inline" onSubmit={this.handleSearch.bind(this)}>
                    <Row>
                        <Col span={8}>
                            <FormItem {...formItemLayout}>
                                {getFieldDecorator("name", {
                                    rules: [
                                        { required: true, message: "请输入客户名称!" }
                                    ]
                                })(<Input type="text" placeholder="客户名称" />)}
                            </FormItem>
                        </Col>
                        <Col span={8}>
                            <FormItem {...formItemLayout}>
                                {getFieldDecorator("level", {
                                    rules: [
                                        { required: true, message: "请输入客户等级!" }
                                    ]
                                })(
                                    <Enum
                                        initValue={this.props.searchMap.level}
                                        addOptionAll={"客户等级"}
                                        dataSource={
                                            this.props.enumData.levelEnum
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
        const children = [];
        return (
            <div className="form-bottom" id="recover-btn">
                <Form layout="inline" onSubmit={this.handleSearch.bind(this)}>
                    <Row>
                        <Col span={6}>
                            <FormItem {...formItemLayout}>
                                {getFieldDecorator("name", {
                                    rules: [
                                        { required: true, message: "请输入客户名称!" }
                                    ]
                                })(<Input type="text" placeholder="客户名称" />)}
                            </FormItem>
                        </Col>
                        <Col span={6}>
                            <FormItem {...formItemLayout}>
                                {getFieldDecorator("level", {
                                    rules: [
                                        { required: true, message: "请输入客户等级!" }
                                    ]
                                })(
                                    <Enum
                                        initValue={this.props.searchMap.level}
                                        addOptionAll={"客户等级"}
                                        dataSource={
                                            this.props.enumData.levelEnum
                                        }
                                    />
                                )}
                            </FormItem>
                        </Col>
                        <Col span={6}>
                            <FormItem {...formItemLayout}>
                                {getFieldDecorator("saleArea", {
                                    rules: [
                                        { required: true, message: "请输入营销区域!" }
                                    ]
                                })(
                                    <Enum
                                        initValue={
                                            this.props.searchMap.saleArea
                                        }
                                        addOptionAll={"营销区域"}
                                        dataSource={
                                            this.props.enumData.saleAreaEnum
                                        }
                                    />
                                )}
                            </FormItem>
                        </Col>
                        <Col span={6}>
                            <FormItem {...formItemLayout}>
                                {getFieldDecorator("province_city_district", {
                                    rules: [
                                        {
                                            required: true,
                                            message: "请输入省/市/区/县!"
                                        }
                                    ]
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
                            <FormItem {...formItemLayout}>
                                {getFieldDecorator("parentId", {
                                    rules: [
                                        { required: true, message: "请输入上级客户!" }
                                    ]
                                })(<Input type="text" placeholder="上级客户" />)}
                            </FormItem>
                        </Col>
                        <Col span={6}>
                            <FormItem {...formItemLayout}>
                                {getFieldDecorator("industry", {
                                    rules: [
                                        { required: true, message: "请输入行业!" }
                                    ]
                                })(
                                    <Enum
                                        initValue={
                                            this.props.searchMap.industry
                                        }
                                        addOptionAll={"行业"}
                                        dataSource={
                                            this.props.enumData.industryEnum
                                        }
                                    />
                                )}
                            </FormItem>
                        </Col>
                        <Col span={6}>
                            <FormItem {...formItemLayout}>
                                {getFieldDecorator("cannelType", {
                                    rules: [
                                        { required: true, message: "请输入渠道类型!" }
                                    ]
                                })(
                                    <Enum
                                        initValue={
                                            this.props.searchMap.cannelType
                                        }
                                        addOptionAll={"渠道类型"}
                                        dataSource={
                                            this.props.enumData.cannelTypeEnum
                                        }
                                    />
                                )}
                            </FormItem>
                        </Col>
                        <Col span={6}>
                            <FormItem {...formItemLayout}>
                                {getFieldDecorator("lifecycle", {
                                    rules: [
                                        { required: true, message: "请输入生命周期!" }
                                    ]
                                })(
                                    <Enum
                                        initValue={
                                            this.props.searchMap.lifecycle
                                        }
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
                            <FormItem {...formItemLayout}>
                                {getFieldDecorator("enableState", {
                                    rules: [
                                        { required: true, message: "请输入启用状态!" }
                                    ]
                                })(
                                    <Enum
                                        initValue={
                                            this.props.searchMap.enableState
                                        }
                                        addOptionAll={"启用状态"}
                                        dataSource={
                                            this.props.enumData.enableStateEnum
                                        }
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

    render() {
        const WarpSimForm = Form.create()(SimForm);
        const WarpMilForm = Form.create()(MilForm);

        return (
            <div className="label-form-more">
                {this.props.visible.btnPanel ? (
                    <div>
                        <BtnPanel
                            btnBack={this.props.btnBack}
                            btnSetEnable={this.props.btnSetEnable}
                            btnDelete={this.props.btnDelete}
                        />
                    </div>
                ) : (
                    <div>
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
                                        enumData={this.props.enumData}
                                        handleSearch={this.props.handleSearch}
                                        btnMore={this.props.btnMore}
                                        searchMap={this.props.searchMap}
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
                                    onClick={this.props.btnNew}
                                >
                                    <i className="iconfont icon-xinjian" />新建
                                </Button>
                            </div>
                        </div>
                        <div
                            className={
                                this.props.visible.milForm
                                    ? "label-form-bottom"
                                    : "form-hide"
                            }
                        >
                            <WarpMilForm
                                enumData={this.props.enumData}
                                cityData={this.props.cityData}
                                handleSearch={this.props.handleSearch}
                                btnLess={this.props.btnLess}
                                searchMap={this.props.searchMap}
                            />
                        </div>
                    </div>
                )}
            </div>
        );
    }
}

export default ToolForm;
