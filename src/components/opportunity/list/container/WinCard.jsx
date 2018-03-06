import { Form, Input, Select,Radio,DatePicker } from 'antd';
import Department from 'components/refs/departments'
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as Actions from "../action";
const { TextArea } = Input;
const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const Option = Select.Option;
import Enum from 'utils/components/enums'
class WinCard extends React.Component {
    constructor(props) {
        super(props)
    }
    
    componentDidMount() {
    
    }
   
    render() {
        const { getFieldDecorator } = this.props.form;
        const winReason = this.props.$$state.toJS().winReason;
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
                <FormItem
                    label="实际签单金额"
                    {...formItemLayout}
                >
                    {getFieldDecorator('actualSignMoney', {
                        rules: [{
                            required: true, message: '请输入实际签单金额',
                        }],
                    })(
                        <Input placeholder='请输入...' />
                        )}
                </FormItem>

                <FormItem
                    label="实际签单日期"
                    {...formItemLayout}
                >
                    {getFieldDecorator('actualSignTime', {
                         rules: [{
                            required: true, message: '请输入实际签单日期',
                        }],
                    })(
                        <DatePicker format='YYYY/MM/DD' />
                        )}
                </FormItem>
               
                <FormItem
                    label="赢单原因"
                    {...formItemLayout}
                >
                    {getFieldDecorator('winReason', {
                         rules: [{
                            required: true, message: '请输入赢单原因',
                        }],
                    })(
                        <Enum dataSource={winReason} placeholder='请输入...' />

                        )}
                </FormItem>
              
                <FormItem
                    label="备注"
                    {...formItemLayout}
                >
                    {getFieldDecorator('description', {
                        rules: [],
                    })(
                        <TextArea rows='4' placeholder='请输入...' />
                        )}
                </FormItem>
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
//输出绑定state和action后组件
export default connect(mapStateToProps, mapDispatchToProps)(WinCard);
