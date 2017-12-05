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
const FormItem = Form.Item;
const Option = Select.Option;
const ButtonGroup = Button.Group;
const confirm = Modal.confirm;
import "assets/stylesheet/all/iconfont.css";
import * as Actions from "../action";
import PrdClassRef from './PrdClassRef'
import BrandRef from './BrandRef'
import MeaUnitRef from './MeaUnitRef'
import AttrsGrpRef from './AttrsGrpRef'

class MoreForm extends React.Component {
    constructor(props) {
        super(props);
    }

    handleSearch(e) {
        e.preventDefault();
      //  this.props.handleSearch(this.props.$$state.toJS().searchMap);
    }

    moreForm() {
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
                    <Row type="flex" align="middle" style={{ height: "54px" }}>
                    <Col span={6}>
                    <FormItem {...formItemLayout}>
                        {getFieldDecorator("name")(
                            <Input type="text" placeholder="适用组织" />
                        )}
                    </FormItem>
                </Col>
                <Col span={6}>
                    <FormItem {...formItemLayout}>
                        {getFieldDecorator("type")(
                             <PrdClassRef  placeholder="产品分类" />
                        )}
                    </FormItem>
                </Col>
                        <Col span={6}>
                            <FormItem {...formItemLayout}>
                                {getFieldDecorator("level", {})(
                                    <Input type="text" placeholder="产品编码" />
                                )}
                            </FormItem>
                        </Col>
                        <Col span={6}>
                            <FormItem {...formItemLayout}>
                                {getFieldDecorator(
                                    "province_city_district",
                                    {}
                                )(
                                    <Input type="text" placeholder="产品名称"/>
                                )}
                            </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={6}>
                            <FormItem {...formItemLayout}>
                                {getFieldDecorator("isGroup", {})(
                                     <Input type="text" placeholder="助记码"/>
                                )}
                            </FormItem>
                        </Col>
                        <Col span={6}>
                            <FormItem {...formItemLayout}>
                                {getFieldDecorator("industry", {})(
                                     <BrandRef/>
                                )}
                            </FormItem>
                        </Col>
                        <Col span={6}>
                            <FormItem {...formItemLayout}>
                                {getFieldDecorator("cannelType", {})(
                                     <AttrsGrpRef/>
                                )}
                            </FormItem>
                        </Col>
                        <Col span={6}>
                            <FormItem {...formItemLayout}>
                                {getFieldDecorator("state", {})(
                                    <Input type="text" placeholder="停启用"/>
                                )}
                            </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={6}>
                            <div className="more-btn">
                                <Button htmlType="submit">查询</Button>
                                <span
                                    className="more-up"
                                    onClick={this.moreForm.bind(this)}
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
                // if (key == "industry") {
                //     debugger;
                //     searchMap[key] = onChangeFild[key].value.id;
                // } else {
                searchMap[key] = onChangeFild[key].value;
                //}
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
