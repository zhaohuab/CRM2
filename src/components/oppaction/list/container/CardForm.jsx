import { Form, Input, Select,InputNumber } from 'antd';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as Actions from "../action"
import Email from 'utils/components/emails'
import Department from 'components/refs/departments'
import Enum from 'utils/components/enums'
import RadioGroup from 'utils/components/radios'
const FormItem = Form.Item;
const Option = Select.Option;

class Card extends React.Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        let data = this.props.$$state.get("editData").toJS();
        if(data.dimension){
            data.dimension = {key:data.dimension,title:""};
        }
        this.props.form.setFieldsValue(data);
    }
  
    render() {
        const { getFieldDecorator } = this.props.form;
        const enumData=this.props.$$state.get("enumData").toJS();
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
                label="关键动作名称"
                {...formItemLayout}
            >
                {getFieldDecorator('name', {
                    rules: [{
                        required: true, message: '请输入关键动作名称',
                    }],
                })(
                    <Input placeholder='请输入关键动作名称'/>
                    )}
            </FormItem>
            <FormItem
                label="动作维度"
                {...formItemLayout}
            >
                {getFieldDecorator('dimension', {
                    rules: [{
                        required: true, message: '请输入动作维度',
                    }],
                })(
                    <Enum
                        dataSource={enumData.dimension}
                    />
                    )}
            </FormItem>
            <FormItem
                label="动作分值"
                {...formItemLayout}
            >
                {getFieldDecorator('score', {
                    rules: [{
                        required: true, message: '请输入关键动作分值',
                    }],
                })(
                    <InputNumber class="InputNumber" max={10} placeholder='请输入关键动作分值'/>
                    )}
            </FormItem>
            <FormItem
                label="关键动作描述"
                {...formItemLayout}
            >
                {getFieldDecorator('description', {
                
                })(
                    <Input type="textarea" placeholder='请输入关键动作描述'/>
                    )}
            </FormItem>

        </Form>)
    }
}

//绑定状态到组件props
function mapStateToProps(state, ownProps) {
    return {
      $$state: state.oppactionlist
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