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
import cityData from "./citydata";
import * as enumDataFake from "./enumdata";
import Industry from "./industry";

class MoreForm extends React.Component {
    constructor(props) {
        super(props);
    }

    handleSearch(e) {
        e.preventDefault();
        this.props.handleSearch(this.props.$$state.toJS().searchMap);
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
        let { enumData } = this.props.$$state.toJS();

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
                                {getFieldDecorator("type", {})(
                                    <Enum
                                        addOptionAll={"客户类型"}
                                        dataSource={enumData.type}
                                    />
                                )}
                            </FormItem>
                        </Col>
                        <Col span={6}>
                            <FormItem {...formItemLayout}>
                                {getFieldDecorator("level", {})(
                                    <Enum
                                        addOptionAll={"客户等级"}
                                        dataSource={enumData.level}
                                    />
                                )}
                            </FormItem>
                        </Col>
                        <Col span={6}>
                            <FormItem {...formItemLayout}>
                                {getFieldDecorator("province_city_district")(
                                    <Cascader
                                        options={cityData}
                                        placeholder="请选择城市"
                                    />
                                )}
                            </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={6}>
                            <FormItem {...formItemLayout}>
                                {getFieldDecorator("isGroup", {})(
                                    <Enum
                                        addOptionAll={"集团客户"}
                                        dataSource={enumDataFake.isGroupEnum}
                                    />
                                )}
                            </FormItem>
                        </Col>
                        <Col span={6}>
                            <FormItem {...formItemLayout}>
                                {getFieldDecorator("industry", {})(
                                    <Industry />
                                )}
                            </FormItem>
                        </Col>
                        <Col span={6}>
                            <FormItem {...formItemLayout}>
                                {getFieldDecorator("cannelType", {})(
                                    <Enum
                                        addOptionAll={"渠道类型"}
                                        dataSource={enumData.cannelType}
                                    />
                                )}
                            </FormItem>
                        </Col>
                        <Col span={6}>
                            <FormItem {...formItemLayout}>
                                {getFieldDecorator("state", {})(
                                    <Enum
                                        addOptionAll={"客户状态"}
                                        dataSource={enumData.state}
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
                                            enumDataFake.enableStateEnum
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
        let searchMap = props.$$state.toJS().searchMap;

        let value = {};
        for (let key in searchMap) {
            value[key] = { value: searchMap[key] };
        }
        return {
            ...value
        };
    },
    onFieldsChange: (props, onChangeFild) => {
        //往redux中写值//把值进行更新改变

        let searchMap = props.$$state.toJS().searchMap;
        for (let key in onChangeFild) {
            if (onChangeFild[key].value.key) {
                searchMap[key] = onChangeFild[key].value.key;
            } else {
                searchMap[key] = onChangeFild[key].value;
            }
        }
        props.searchMapFn(searchMap);
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
