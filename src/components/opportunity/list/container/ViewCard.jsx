import { DatePicker, Form, Input, Select, InputNumber, Row, Col } from 'antd';
import Department from 'components/refs/departments'

import moment from "moment";
// import Email from 'utils/components/email'
// import Department from 'components/refs/departments'
// import Enum from 'utils/components/enum'
// import RadioGroup from 'utils/components/radio'
const FormItem = Form.Item;
const Option = Select.Option;
class Card extends React.Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
   
    }
    componentWillMount() {

    }
    render() {
        this.props.data
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
                            label="商机类型"
                            {...formItemLayout}
                        >
                            {getFieldDecorator('type', {
                            
                            })(
                                <div>{this.props.data.saleStage}</div>
                                )}
                        </FormItem>
                    </Col>
                    <Col span={12}>
                        <FormItem
                            label="商机名称"
                            {...formItemLayout}
                        >
                            {getFieldDecorator('opportunitId', {
                              
                            })(
                                <div>{this.props.data.name}</div>
                                )}
                        </FormItem>
                    </Col>
                </Row>
                <Row type="flex"  >
                    <Col span={12}>
                        <FormItem
                            label="客户名称"
                            {...formItemLayout}
                        >
                            {getFieldDecorator('customerId', {
                              
                            })(
                                <div>{this.props.data.customerId}</div>
                                )}
                        </FormItem>
                    </Col>
                    <Col span={12}>
                        <FormItem
                            label="商机阶段"
                            {...formItemLayout}
                        >
                            {getFieldDecorator('saleStage', {
                              
                            })(
                                <div>{this.props.data.saleStage}</div>
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
                              
                            })(
                                <div>{this.props.data.winProbability}</div>
                                )}
                        </FormItem>
                    </Col>
                    <Col span={12}>
                        <FormItem
                            label="商机日期"
                            {...formItemLayout}
                        >
                            {getFieldDecorator('createdTime', {
                              
                            })(
                                <div>{this.props.data.createdTime}</div>
                                )}
                        </FormItem>
                    </Col>
                </Row>
                <Row type="flex"  >
                    <Col span={12}>
                        <FormItem
                            label="预计签单时间"
                            {...formItemLayout}
                        >
                            {getFieldDecorator('expectSignTime', {
                                rules: [],
                            })(
                                <div>{this.props.data.expectSignTime}</div>
                                )}
                        </FormItem>
                    </Col>
                    <Col span={12}>
                        <FormItem
                            label="预计签单金额"
                            {...formItemLayout}
                        >
                            {getFieldDecorator('expectSignMoney', {
                                
                            })(
                                <div>{this.props.data.expectSignMoney}</div>
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
                                <div>{this.props.data.description}</div>
                                )}
                        </FormItem>
                    </Col>
                </Row>

            </Form>)
    }
}

export default Card;