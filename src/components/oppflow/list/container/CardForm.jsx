import { Form, Input, Select, Row, Col, Card as AntdCard } from 'antd';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as Actions from "../action"
import Email from 'utils/components/emails'
import Department from 'components/refs/departments'
import Enum from 'utils/components/enums'
import RadioGroup from 'utils/components/radios'

import BatchSelect from './BatchSelect.jsx'
const FormItem = Form.Item;
const Option = Select.Option;
class Card extends React.Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        if(this.props.$$state.get("isEdit")){
            let data = this.props.$$state.get("editData").toJS();
            let result = this.props.$$state.get("result").toJS();
            data.oppstage = result
            
            if(result[0]&&result[0].children){
                data.oppdimension = result[0].children
            }else{
                data.oppdimension = []
            }
            this.props.form.setFieldsValue(data);
        }else{
            const data ={}
            data.oppstage=[]
            data.oppdimension=[]
            this.props.form.setFieldsValue(data);
        }
        
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        const enumData = this.props.$$state.get("enumData").toJS();
        const allStage = this.props.$$state.get("allStage").toJS();
        const allDimension = this.props.$$state.get("allDimension").toJS();
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
  
        return (
            
             <Form >
                     
                <Row>
                    <Col span={12}>
                        <FormItem
                            label="销售流程名称"
                            {...formItemLayout}
                        >
                            {getFieldDecorator('name', {
                                rules: [{
                                    required: true, message: '请输入销售流程名称',
                                }],
                            })(
                                <Input placeholder='请输入销售流程名称' />
                                )}
                        </FormItem>
                    </Col>
                    <Col span={12}>
                        <FormItem
                            label="流程状态"
                            {...formItemLayout}
                        >
                            {getFieldDecorator('flowState', {
                                rules: [{
                                    required: true, message: '请输入流程状态',
                                }],
                            })(
                                <Enum
                                    dataSource={enumData.flowState}
                                />
                                )}
                        </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span={12}>
                        <FormItem
                            label="适用业务类型"
                            {...formItemLayout}
                        >
                            {getFieldDecorator('biztype', {
                                rules: [{
                                    required: true, message: '请输入销售流程名称',
                                }],
                            })(
                                <Input placeholder='请输入销售流程名称' />
                                )}
                        </FormItem>
                    </Col>

                </Row>
                <Row>
                    <Col span={24}>
                        <FormItem
                            label="销售流程描述"
                            {...formItemLayout}
                        >
                            {getFieldDecorator('description', {

                            })(
                                <Input type="textarea" placeholder='请输入销售流程描述' />
                                )}
                        </FormItem>
                    </Col>
                </Row>
                <Row>
                    <AntdCard title="销售阶段" bordered={false} >
                        {getFieldDecorator('oppstage', {
                        
                        })(
                            <BatchSelect dataSource={allStage} />
                            )}
                    </AntdCard>
                </Row>
                <Row>
                    <AntdCard title="商机维度" bordered={false} >
                        {getFieldDecorator('oppdimension', {
                          
                        })(
                            <BatchSelect dataSource={allDimension} />
                            )}
                    </AntdCard>
                </Row>
            </Form>
        )
    }
}

//绑定状态到组件props
function mapStateToProps(state, ownProps) {
    return {
        $$state: state.oppflowList
    }
}

//绑定action到组件props
function mapDispatchToProps(dispatch) {
    return {
        action: bindActionCreators(Actions, dispatch)
    }
}

//输出绑定state和action后组件
export default connect(mapStateToProps, mapDispatchToProps)(Card);