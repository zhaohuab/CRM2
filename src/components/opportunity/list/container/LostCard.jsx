import { Form, Input, Select, Radio, DatePicker } from 'antd';
import Department from 'components/refs/departments'
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as Actions from "../action";
const { TextArea } = Input;
const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const Option = Select.Option;
import Enum from 'utils/components/enums'
class LostCard extends React.Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {

    }

    render() {
        const { getFieldDecorator } = this.props.form;
        const lostReason = this.props.$$state.toJS().lostReason;
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
                    label="丢单原因"
                    {...formItemLayout}
                >
                    {getFieldDecorator('failReason', {
                        rules: [{
                            required: true, message: '请输入丢单原因',
                        }],
                    })(
                        <Enum dataSource={lostReason} placeholder='请输入...' />
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
export default connect(mapStateToProps, mapDispatchToProps)(LostCard);
