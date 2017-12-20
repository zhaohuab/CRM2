import {Modal, Cascader,Select,Form,Row,Col,Input,Button,Icon} from "antd";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Enum from "utils/components/enums";
const FormItem = Form.Item;
const Option = Select.Option;
const ButtonGroup = Button.Group;
const confirm = Modal.confirm;
import * as enumDataFake from "./enumdata";
import "assets/stylesheet/all/iconfont.css";
//导入action方法
import * as Actions from "../action";

class LessForm extends React.Component {
    constructor(props) {
        super(props);
    }
    handleSearch(e) {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.props.action.getListData(this.props.$$state.get("pagination").toJS(), values);
            }
        });
    }

    componentDidMount() {
        //装箱过程
        this.props.form.setFieldsValue(this.props.$$state.get("searchMap").toJS());
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
            <div className="less-form">
                <Form layout="inline" onSubmit={this.handleSearch.bind(this)}>
                    <Row type="flex" align="middle" style={{ height: "54px" }}>
                        <Col span={8}>
                            <FormItem {...formItemLayout}>
                                {getFieldDecorator("searchKey", {})(
                                    <Input type="text" placeholder="商机名称" />
                                )}
                            </FormItem>
                        </Col>
                        <Col span={8}>
                            <FormItem {...formItemLayout}>
                                {getFieldDecorator("type22", {})(
                                    <Enum
                                        addOptionAll={"商机阶段"}
                                        dataSource={enumDataFake.levelEnum}
                                    />
                                )}
                            </FormItem>
                        </Col>

                        <Col span={8}>
                            <div className="more-btn">
                                <Button htmlType="submit">查询</Button>
                                <span
                                    onClick={this.moreFn.bind(this)}
                                    className="more-up"
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

const WarpMilForm = Form.create({
    // mapPropsToFields: props => {
    //     //把redux中的值取出来赋给表单
    //     let searchMap = props.$$state.toJS().searchMap;
    //     let value = {};
    //     for (let key in searchMap) {
    //         value[key] = { value: searchMap[key] };
    //     }
    //     return {
    //         ...value
    //     };
    // },
    // onFieldsChange: (props, onChangeFild) => {
    //     //往redux中写值//把值进行更新改变
    //     let searchMap = props.$$state.toJS().searchMap;
    //     for (let key in onChangeFild) {
    //         if (onChangeFild[key].value.key) {
    //             searchMap[key] = onChangeFild[key].value.key;
    //         } else {
    //             searchMap[key] = onChangeFild[key].value;
    //         }
    //     }
    //     props.searchMapFn(searchMap);
    // }
})(LessForm);

//绑定状态到组件props
function mapStateToProps(state, ownProps) {
    return {
        $$state: state.opportunityList
    };
}
//绑定action到组件props
function mapDispatchToProps(dispatch) {
    return {
        action: bindActionCreators(Actions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(WarpMilForm);
