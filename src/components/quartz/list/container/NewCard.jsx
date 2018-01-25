import { Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete } from 'antd';
import { connect } from 'react-redux'
import * as Actions from "../action"
import { bindActionCreators } from 'redux'
const FormItem = Form.Item;
const Option = Select.Option;
const AutoCompleteOption = AutoComplete.Option;

export default class TaskGroupForm extends React.Component {
    render() {
      const { getFieldDecorator } = this.props.form;
  
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
        <Form onSubmit={this.handleSubmit}>
          <FormItem {...formItemLayout} label="">
            {getFieldDecorator('name', {})(
              <Input />
            )}
          </FormItem>
        </Form>
      );
    }
  }
 