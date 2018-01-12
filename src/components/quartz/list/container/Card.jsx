import { Form, Input, Icon, Select,AutoComplete } from 'antd';
import { connect } from 'react-redux'
import * as Actions from "../action"
import { bindActionCreators } from 'redux'
const FormItem = Form.Item;
const Option = Select.Option;
const AutoCompleteOption = AutoComplete.Option;
import TaskRef from './TaskRef'

class RegistrationForm extends React.Component {

  render() {
    const { getFieldDecorator } = this.props.form;
    const { $$state } = this.props;
    debugger
    const data = $$state.get("data").toJS();
    const formItemLayout = {
      labelCol: {
        xs: { span: 12 },
        sm: { span: 6 },
      },
      wrapperCol: {
        xs: { span: 12 },
        sm: { span: 14 },
      },
    };
    return (
      <div>
       <Form>
        <FormItem {...formItemLayout} label="任务编码">
          {getFieldDecorator('code', {})(
            <Input />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="任务名称">
          {getFieldDecorator('name', {})(
            <Input />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="任务分组">
          {getFieldDecorator('taskName', {})(
            <TaskRef/>
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="调用规则">
          {getFieldDecorator('url', {})(
            <Input />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="描述信息">
          {getFieldDecorator('description', {})(
            <Input />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="定时规则">
          {getFieldDecorator('cronexpression', {})(
            <Input />
          )}
        </FormItem>
       </Form>
      </div>
    );
  }
}

const Registration = Form.create({
  mapPropsToFields: props => {
      //把redux中的值取出来赋给表单
      debugger
      let viewData = props.$$state.toJS().viewData;
      let value = {};
      debugger
      for (let key in viewData) {
        value[key] = { value: viewData[key] 
        };
       }
      //把字段合成对象
      return {
          ...value
      };
  },
  onFieldsChange: (props, onChangeFild) => {
      //往redux中写值//把值进行更新改变
      debugger
      let viewData = props.$$state.toJS().viewData;
      debugger
      for (let key in onChangeFild) {
          if (onChangeFild[key].value && onChangeFild[key].value.key) {
              viewData[key] = onChangeFild[key].value.key;
          } else if(key==="taskName") {
           viewData[key]=onChangeFild[key].value
          }else{
            viewData[key] = onChangeFild[key].value;
          }
      }
      props.action.editCardFn(viewData);
  }
})(RegistrationForm);


function mapStateToProps(state, ownProps) {
  return {
    $$state: state.quartz
  }
}
function mapDispatchToProps(dispatch) {
  return {
    action: bindActionCreators(Actions, dispatch)
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Registration);