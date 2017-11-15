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
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Enum from "utils/components/enums";
const FormItem = Form.Item;
const Option = Select.Option;
const ButtonGroup = Button.Group;
const confirm = Modal.confirm;
import "assets/stylesheet/all/iconfont.css";
import * as Actions from "../action";

class MoreForm extends React.Component {
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

    moreFn() {
        this.props.formMore();
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: { span: 2 },
            wrapperCol: { span: 22 }
        };

        return (
            <div className="header-bottom-inner">
                <Form layout="inline" onSubmit={this.handleSearch.bind(this)}>
                    <Row>
                        <Col span={6}>
                            <FormItem {...formItemLayout}>
                                {getFieldDecorator("name", {})(
                                    <Input type="text" placeholder="客户名称" />
                                )}
                            </FormItem>
                        </Col>
                        <Col span={6}>
                            <FormItem {...formItemLayout}>
                                {getFieldDecorator("level", {})(
                                    <Enum
                                        addOptionAll={"客户等级"}
                                        dataSource={this.props.refData.level}
                                    />
                                )}
                            </FormItem>
                        </Col>
                        <Col span={6}>
                            <FormItem {...formItemLayout}>
                                {getFieldDecorator("saleArea", {})(
                                    <Enum
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
                                {getFieldDecorator(
                                    "province_city_district",
                                    {}
                                )(
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
                                {getFieldDecorator("parentId", {})(
                                    <Input type="text" placeholder="上级客户" />
                                )}
                            </FormItem>
                        </Col>
                        <Col span={6}>
                            <FormItem {...formItemLayout}>
                                {getFieldDecorator("industry", {})(
                                    <Enum
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
                                {getFieldDecorator("cannelType", {})(
                                    <Enum
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
                                {getFieldDecorator("lifecycle", {})(
                                    <Enum
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
                                {getFieldDecorator("enableState", {})(
                                    <Enum
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
                                    className="more-up"
                                    onClick={this.moreFn.bind(this)}
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

const WarpMilForm = Form.create({
    mapPropsToFields: (props, onChangeFild) => {
        //从redux中读值
        return {
            //...obj
        };
    },
    onFieldsChange: (props, onChangeFild) => {
        //往redux中写值
        //把值进行更新改变
        //this.props.action.hhh(props);
    }
})(MoreForm);

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

export default connect(mapStateToProps, mapDispatchToProps)(WarpMilForm);
