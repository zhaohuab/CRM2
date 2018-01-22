/*
 * @Author: yangtmm 
 * @Date: 2017-11-06 14:01:09 
 * @Last Modified by: yangtmm
 * @Last Modified time: 2017-12-13 17:14:51
 */
import { Modal, Button, Input, Radio, Popconfirm, Form, Row, Col, Checkbox } from 'antd';
import RoleCheckboxGroup from './RoleCheckboxGroup';
import RolesChoosed from './RolesChoosed'
import SuperiorCustomer from  './SuperiorCustomer'
const FormItem = Form.Item;
import "./index.less"

export default class FormList extends React.Component {

  constructor(props) {
    super(props);
  }

  onChange = (keyName, e) => {
    let value = e.target.value;
    this.props.onChange(keyName, value)
  }

  onChangeRoles = (checkedList) => {
    this.props.onChange("roleIds", checkedList)
  }

  render() {
    const { data, nameFlag, roleFlag } = this.props;
    return (
      <div className="business-obj-form">
        <Row gutter={16} className="gutter-row">
          <Col className="gutter-row form-lable form-lable-line-height" span={6}>
            *业务类型名称
          </Col>
          <Col className="gutter-row" span={14}>
            <Input value={data.name} onChange={this.onChange.bind(this, "name")} placeholder="输入名称。。。" />
          </Col>
          {
            nameFlag?
            <Col span={4} style={{whiteSpace:'nowrap',color:'red',marginLeft:'-10px'}}>
              <p className='prompt'>*名称不能为空</p>
            </Col>:''
          }
          
        </Row>
        <Row gutter={16} className="gutter-row">
          <Col className="gutter-row form-lable" span={6}>
            *适用角色
          </Col>
          <Col className="gutter-row" span={14}>
            <RolesChoosed data={data} onChange = {this.onChangeRoles.bind(this)}/>
          </Col>
         
          {
            roleFlag?
            <Col span={4} style={{whiteSpace:'nowrap',color:'red',marginLeft:'-10px'}}>
              <p className='prompt'>*角色不能为空</p>
            </Col>:''
          }
        </Row>
        <Row gutter={16} className="gutter-row">
          <Col className="gutter-row form-lable form-lable-line-height" span={6}>
            业务类型描述
          </Col>
          <Col className="gutter-row " span={14}>
            <Input value={data.description} type="textarea" onChange={this.onChange.bind(this, "description")} />
          </Col>
        </Row>
  
      </div>
    );
  }
}

/* 
 <Col className="gutter-row" span={14}>
            <RoleCheckboxGroup value={data.roleIds} onChange={this.onChangeRoles.bind(this)} />
          </Col>
 */

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



/* 
        <Row gutter={16} className="gutter-row">
          <Col className="gutter-row form-lable" span={6}>
            *适用角色
          </Col>
          <Col className="gutter-row" span={14}>
            <RolesChoosed />
          </Col>
          <Col className="gutter-row" span={14}>
            <RoleCheckboxGroup value={data.roleIds} onChange={this.onChangeRoles.bind(this)} />
          </Col>
        
        </Row> */
