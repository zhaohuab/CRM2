import { Modal, Cascader, Select, Form, Row, Col, Input, Button, Icon, DatePicker } from "antd";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Enum from "utils/components/enums";
const FormItem = Form.Item;
const Option = Select.Option;
const ButtonGroup = Button.Group;
const confirm = Modal.confirm;
import "assets/stylesheet/all/iconfont.css";
import * as Actions from "../action";
import * as enumDataFake from "./enumdata";
const { RangePicker } = DatePicker;
import Department from 'components/refs/departments'
import OwnerUser from "../../../common/ownerUser";
import getInfo from 'utils/cookie'


class MoreForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            deptId:""
        }
    }

    handleSearch(e) {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.props.action.getListData(this.props.$$state.get('pagination').toJS(), values);
                this.props.action.getFunnelData(values)
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
        let { enumData,selectedDept } = this.props.$$state.toJS();
        enumData.stageList = enumData.biztypeList.length > 0 ? enumData.biztypeList[0].stageList : []
        let deptid = getInfo("deptid")
        return (
            <div className="header-bottom-inner">
                <Form layout="inline" onSubmit={this.handleSearch.bind(this)}>
                    <Row>
                        {/* <Col span={6}>
                            <FormItem {...formItemLayout}>
                                {getFieldDecorator("type", {})(
                                    <Enum
                                        addOptionAll={"商机类型"}
                                        dataSource={enumData.biztypeList ? enumData.biztypeList : []}
                                    />
                                )}
                            </FormItem>
                        </Col> */}
                        <Col span={6}>
                            <FormItem {...formItemLayout}>
                                {getFieldDecorator("saleStage", {})(
                                    <Enum
                                        addOptionAll={"商机阶段"}
                                        dataSource={enumData.stageList}
                                    />
                                )}
                            </FormItem>
                        </Col>
                        <Col span={6}>
                            <FormItem {...formItemLayout}>
                                {getFieldDecorator("signTime", {})(
                                    <RangePicker placeholder={['预计开始时间', '预计结束日期']}/>
                                )}
                            </FormItem>
                        </Col>
                        <Col span={6}>
                            <FormItem {...formItemLayout}>
                                {getFieldDecorator(
                                    "source",
                                    {}
                                )(
                                    <Enum
                                        addOptionAll={"商机来源"}
                                        dataSource={enumData.oppSourceList ? enumData.oppSourceList : []}
                                    />
                                )}
                            </FormItem>
                        </Col>
                    </Row>

                    <Row>
                        <Col span={6}>
                            <FormItem
                                {...formItemLayout}
                            >
                                {getFieldDecorator('deptId', {
                                })(
                                    <Department orgType = {3}  fatherorgId={deptid} />
                                )}
                            </FormItem>
                        </Col>
                        <Col span={6}>
                            <FormItem {...formItemLayout}>
                                {getFieldDecorator(
                                    "ownerUserId",
                                    {}
                                )(
                                    <OwnerUser deptId={selectedDept} />
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

    onFieldsChange: (props, onChangeFild) => {
        //往redux中写值//把值进行更新改变
        // let { enumData } = props.$$state.toJS();
        // for (let key in onChangeFild) {
        //     if (key == 'type') {
        //         for (let i = 0; i < enumData.biztypeList.length; i++) {
        //             if (onChangeFild[key].value.key == enumData.biztypeList[i].key) {
        //                 enumData.stageList = enumData.biztypeList[i].stageList;
        //             }

        //         }
        //     }
        // }
        // props.action.saveEnum(enumData);
         for (let key in onChangeFild) {
            if (key == 'deptId') {
                let deptId = onChangeFild.deptId.value.key;
                // this.setState({deptId})
                props.action.saveSelectedDept(deptId);
            }
        }
    }
})(MoreForm);

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
