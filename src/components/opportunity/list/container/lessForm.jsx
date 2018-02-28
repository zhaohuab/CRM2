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
        let that = this;
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.props.action.getListData(this.props.$$state.get("pagination").toJS(), values);
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
        let { enumData } = this.props.$$state.toJS();
        enumData.stageList = enumData.biztypeList.length>0?enumData.biztypeList[0].stageList:[]
        return (
            <div className="less-form">
                <Form layout="inline" onSubmit={this.handleSearch.bind(this)}>
                    <Row type="flex" align="middle" style={{ height: "54px" }}>
                    {/* 项目第一版移除  */}
                        {/* <Col span={8}>

                            <FormItem {...formItemLayout}>
                                {getFieldDecorator("type", {})(
                                    <Enum
                                        addOptionAll={"商机类型"}
                                        dataSource={enumData.biztypeList}
                                    />
                                )}
                            </FormItem>
                        </Col> */}
                        <Col span={8}>
                            <FormItem {...formItemLayout}>
                                {getFieldDecorator("saleStage", {})(
                                    <Enum
                                        addOptionAll={"商机阶段"}
                                        dataSource={enumData.stageList}
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

    onFieldsChange: (props, onChangeFild) => {
        //往redux中写值//把值进行更新改变
        // let { enumData } = props.$$state.toJS();
        // for (let key in onChangeFild) {
        //     if (key == 'type' ) {
        //         for(let i=0;i<enumData.biztypeList.length;i++){
        //             if(onChangeFild[key].value.key == enumData.biztypeList[i].key){
        //                 enumData.stageList = enumData.biztypeList[i].stageList;
        //             }
                    
        //         }
        //     }
        // }
        // props.action.saveEnum(enumData);
    }
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
