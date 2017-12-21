import { DatePicker, Form, Input, Select, InputNumber, Row, Col } from 'antd';
import Department from 'components/refs/departments'
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import moment from "moment";
import * as Actions from "../action";

const FormItem = Form.Item;
const Option = Select.Option;
class Card extends React.Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        // let data = this.props.$$state.get("editData").toJS();
        // data.createdTime=moment(data.createdTime);
        // data.expectSignTime=moment(data.expectSignTime);
        // this.props.form.setFieldsValue(data);
    }
    componentWillMount() {

    }
    render() {
        const { getFieldDecorator } = this.props.form;

        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 6 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 14 },
            },
        };
        {
            getFieldDecorator('id', {
            })(
                <Input />
                )
        }
        {
            getFieldDecorator('enableState', {
            })(
                <Input value="1" />
                )
        }
        return (
            <Form >
                <Row type="flex"  >

                <Col span={12}>
                        <FormItem
                            label="商机名称"
                            {...formItemLayout}
                        >
                            {getFieldDecorator('name', {
                                rules: [{
                                    required: true, message: '请输出商机名称',
                                }],
                            })(
                                <Input />
                                )}
                        </FormItem>
                    </Col>
                    <Col span={12}>
                        <FormItem
                            label="客户名称"
                            {...formItemLayout}
                        >
                            {getFieldDecorator('customerId', {
                                rules: [{
                                    required: true, message: '请选择客户',
                                }],
                            })(
                                <Input  />
                                )}
                        </FormItem>
                    </Col>
                   
                    
                </Row>
                <Row type="flex"  >
                <Col span={12}>
                        <FormItem
                            label="商机类型"
                            {...formItemLayout}
                        >
                            {getFieldDecorator('type', {
                                rules: [{
                                    required: true, message: '请选择商机类型',
                                }],
                            })(
                                <Input disabled={true}/>
                                )}
                        </FormItem>
                    </Col>
                    <Col span={12}>
                        <FormItem
                            label="商机阶段"
                            {...formItemLayout}
                        >
                            {getFieldDecorator('saleStage', {
                                rules: [{
                                    required: true, message: '请选择商机阶段',
                                }],
                            })(
                                <Input />
                                )}
                        </FormItem>
                    </Col>
                </Row>
                <Row type="flex"  >
                    <Col span={12}>
                        <FormItem
                            label="赢单概率"
                            {...formItemLayout}
                        >
                            {getFieldDecorator('winProbability', {
                                rules: [{
                                    required: true, message: '请输入赢单概率',
                                }],
                            })(
                                <InputNumber min={0} max={100} formatter={value => `${value}%`} parser={value => value.replace("%", "")} />
                                )}
                        </FormItem>
                    </Col>
                    <Col span={12}>
                        <FormItem
                            label="预计签单时间"
                            {...formItemLayout}
                        >
                            {getFieldDecorator('expectSignTime', {
                                rules: [],
                            })(
                                <DatePicker format='YYYY/MM/DD' />
                                )}
                        </FormItem>
                    </Col>
                </Row>
                <Row type="flex"  >
                    
                    <Col span={12}>
                        <FormItem
                            label="预计签单金额"
                            {...formItemLayout}
                        >
                            {getFieldDecorator('expectSignMoney', {
                                rules: [{
                                    required: true, message: '请输入预计签单金额',
                                }],
                            })(
                                <InputNumber min={0} formatter={value => `¥${value}`} parser={value => value.replace("¥", "")} />
                                )}
                        </FormItem>
                    </Col>
                    <Col span={12}>
                        <FormItem
                            label="商机日期"
                            {...formItemLayout}
                        >
                            {getFieldDecorator('createdTime', {
                                rules: [{
                                    required: true, message: '请选择商机时间',
                                }],
                            })(
                                <DatePicker format='YYYY/MM/DD' />
                                )}
                        </FormItem>
                    </Col>
                </Row>
                <Row type="flex"  >
                    <Col span={12}>
                        <FormItem
                            label="备注"
                            {...formItemLayout}
                        >
                            {getFieldDecorator('description', {
                                rules: [],
                            })(
                                <Input />
                                )}
                        </FormItem>
                    </Col>
                </Row>

            </Form>)
    }
}

//绑定状态到组件props
function mapStateToProps(state, ownProps) {
    return {
        $$state: state.opportunityList,
        $$stateCommon: state.componentReducer
    };
}
//绑定action到组件props
function mapDispatchToProps(dispatch) {
    return {
        action: bindActionCreators(Actions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(
    Form.create({
        onFieldsChange(props, fields){ 
            let fieldsChangeData = {};
            let data = props.$$state.get("editData").toJS();
            for(let item in fields){              
                fieldsChangeData = {[item]:fields[item].value};
            }
            Object.assign(data, fieldsChangeData);
            props.action.setFormData(data);
        },
        mapPropsToFields(props){
            let data = props.$$state.get("editData").toJS();
            if(data.createdTime == null){
                data.createdTime = undefined;
            }
            if(data.expectSignTime == null){
                data.expectSignTime = undefined;
            }
            return{
                id:{
                    value:data.id
                },  
                enableState:{
                    value:data.enableState
                },  
                name:{
                    value:data.name
                }, 
                type:{
                    value:data.type
                }, 
                customerId:{
                    value:data.customerId
                }, 
               
                saleStage:{
                    value:data.saleStage
                }, 
                winProbability:{
                    value:data.winProbability
                }, 
                createdTime:{
                    value:moment(data.createdTime)
                },

                expectSignTime:{
                    value:moment(data.expectSignTime)
                },
                expectSignMoney:{
                    value:data.expectSignMoney
                },
                description:{
                    value:data.description
                },
            };
        }
    })(Card));
