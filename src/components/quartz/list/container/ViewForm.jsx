import React, { Component, PropTypes } from 'react'
import { Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete } from 'antd';
import { connect } from 'react-redux'
import * as Actions from "../action"
import { bindActionCreators } from 'redux'
const FormItem = Form.Item;
const Option = Select.Option;
const AutoCompleteOption = AutoComplete.Option;

class ViewForm extends React.Component {

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
      <Form>
        <FormItem style={{ display: "none" }}>
          {getFieldDecorator("id", {})(<Input />)}
        </FormItem>
        <FormItem style={{ display: "none" }}>
          {getFieldDecorator("groupid", {})(<Input />)}
        </FormItem>
        <FormItem style={{ display: "none" }}>
          {getFieldDecorator("tenantid", {})(<Input />)}
        </FormItem>
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
          {getFieldDecorator('groupName', {})(
            <Input disabled/>
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
    );
  }
}



const View = Form.create({
  mapPropsToFields: (props) => {
    //把redux中的值取出来赋给表单
     debugger
    let viewData = props.$$state.toJS().viewData;

    let value = {};
    // debugger
    for (let key in viewData) {
      value[key] = { value: viewData[key] };
    }
    //address  把字段合成对象
    return {
      ...value
    };
  },

  onFieldsChange: (props, onChangeFild) => {
     debugger
    //往redux中写值
    let viewData = props.$$state.toJS().viewData;
    //往redux中写值//把值进行更新改变
    for (let key in onChangeFild) {
      if (onChangeFild[key].value && onChangeFild[key].value.key) {
        viewData[key] = onChangeFild[key].value.key;
      } else {
        viewData[key] = onChangeFild[key].value;
        //把对像拆成字段  
      }
    }
    props.action.editCardFn(viewData);
  }
})(ViewForm);

//绑定状态到组件props
function mapStateToProps(state, ownProps) {
  return {
    $$state: state.quartz
  };
}
//绑定action到组件props
function mapDispatchToProps(dispatch) {
  return {
    action: bindActionCreators(Actions, dispatch)
  };
}
//输出绑定state和action后组件
export default connect(mapStateToProps, mapDispatchToProps)(View);




