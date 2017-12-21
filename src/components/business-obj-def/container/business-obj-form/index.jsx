/*
 * @Author: yangtmm 
 * @Date: 2017-11-06 14:01:09 
 * @Last Modified by: yangtmm
 * @Last Modified time: 2017-12-06 13:37:13
 */
import { Modal, Button, Input, Radio, Popconfirm, Form, Row, Col, Checkbox } from 'antd';
import RoleCheckboxGroup from './RoleCheckboxGroup'
const FormItem = Form.Item;
import "./index.less"

export default class FormList extends React.Component {

  constructor(props) {
    super(props);
  }

  onChange = (keyName, e) => {
    debugger;
    let value = e.target.value;
    this.props.onChange(keyName, value)
  }

  onChangeRoles = (checkedList) => {
    debugger;
    this.props.onChange("roles", checkedList)
  }

  render() {
    const { visible, onCancel, onCreate, editData } = this.props;
    return (
      <Modal
        visible={visible}
        title={ this.props.title}
        onCancel={onCancel}
        onOk={onCreate}
      >
       <div className="business-obj-form">
        <Row gutter={16} className="gutter-row">
          <Col className="gutter-row form-lable form-lable-line-height" span={6}>
            *业务类型名称
          </Col>
          <Col className="gutter-row" span={16}>
            <Input value = {editData.name} onChange = {this.onChange.bind(this, "name")} placeholder="输入名称。。。" />
          </Col>
        </Row>
        <Row gutter={16} className="gutter-row">
          <Col className="gutter-row form-lable form-lable-line-height" span={6}>
            业务类型描述
          </Col>
          <Col className="gutter-row " span={16}>
            <Input value = {editData.des}  type="textarea" onChange = {this.onChange.bind(this, "des")}/>
          </Col>
        </Row>
        <Row gutter={16} className="gutter-row">
          <Col className="gutter-row form-lable" span={6}>
            *适用角色
          </Col>
          <Col className="gutter-row" span={16}>
            <RoleCheckboxGroup value = {editData.roles} onChange = {this.onChangeRoles.bind(this)}/>
          </Col>
        </Row>
        </div>
      </Modal>
    );
  }
}



// class FormList extends React.Component {
//   constructor(props) {
//     super(props);
//   }

//   checkRoleLen = (rule, value, callback) => {
//     if (value.length > 0) {
//       callback();
//       return;
//     }
//     callback('必须选角色！');
//   }

//   render() {
//     const { visible, onCancel, onCreate, form } = this.props;
//     const { getFieldDecorator } = form;
//     return (
//       <Modal
//         visible={visible}
//         title="新建业务类型"
//         onCancel={onCancel}
//         onOk={onCreate}
//       >
//         <Form layout="vertical">
//           <FormItem label="业务对象名称">
//             {getFieldDecorator('name', {
//               rules: [{ required: true, message: '业务对象名称必填' }],
//             })(
//               <Input />
//               )}
//           </FormItem>
//           <FormItem label="业务对象描述">
//             {getFieldDecorator('des')(<Input type="textarea" />)}
//           </FormItem>
//           <FormItem label="适用角色" className="collection-create-form_last-form-item">
//             {getFieldDecorator('roles', {
//               initialValue: [],
//               rules: [{ required: true, validator: this.checkRoleLen }],
//             })(
//               <RoleCheckboxGroup />
//               )}
//           </FormItem>
//         </Form>
//       </Modal>
//     );
//   }
// }

// export default Form.create({
//   onFieldsChange(props, changedFields) {
//     debugger
//     props.onChange(changedFields);
//   },
//   mapPropsToFields(props) {
//     debugger
//     return {
//       name: {
//         value: props.editData.name,
//       },
//       des: {
//         value: props.editData.des,
//       },
//       roles: {
//         value: props.editData.roles,
//       }
//     };
//   },
//   onValuesChange(_, values) {
//     console.log(values);
//   }
// })(FormList)