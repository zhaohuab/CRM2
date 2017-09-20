import { Form ,Input , Radio } from 'antd';

const FormItem = Form.Item;
const RadioGroup = Radio.Group;
class Card extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
      this.props.form.setFieldsValue(this.props.dataSource);
  }
  render() {
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
      return (<Form >
          
          <FormItem
              label="姓名"
              {...formItemLayout}
          >
              {getFieldDecorator('name', {
                  rules: [{
                      required: true, message: 'Please input your Name',
                  }],
              })(
                  <Input />
                  )}
          </FormItem>
          <FormItem
              label="手机"
              {...formItemLayout}
          >
              {getFieldDecorator('phone', {
                  rules: [{
                      required: true, message: 'Please input your Phone!',
                  }],
              })(
                  <Input />
                  )}
          </FormItem>
          <FormItem
              label="邮箱"
              {...formItemLayout}
          >
              {getFieldDecorator('email', {
                  rules: [{
                      type: 'email', message: 'The input is not valid E-mail!',
                  }, {
                      required: true, message: 'Please input your E-mail!',
                  }],
              })(
                  <Input />
                  )}
          </FormItem>
          <FormItem
              label="性别"
              {...formItemLayout}
          >
              {getFieldDecorator('gender', {
                  rules: [{
                      type: 'integer', message: 'The input is not valid E-mail!',
                  }, {
                      required: true, message: 'Please input your E-mail!',
                  }],
              })(
                  <RadioGroup>
                      <Radio value={1}>男</Radio>
                      <Radio value={2}>女</Radio>
                  </RadioGroup>
                  )}
          </FormItem>
          <FormItem
              label="所属公司"
              {...formItemLayout}
          >
              {getFieldDecorator('orgId', {
                  rules: [{
                      required: true, message: 'Please input your Org!',
                  }],
              })(
                  <Input />
                  )}
          </FormItem>
          <FormItem
              label="所属部门"
              {...formItemLayout}
          >
              {getFieldDecorator('deptId', {
                
              })(
                  <Input />
                  )}
          </FormItem>
          <FormItem
              label="职位"
              {...formItemLayout}
          >
              {getFieldDecorator('job', {
                
              })(
                  <Input />
                  )}
          </FormItem>

      </Form>)
  }
}

export default Card;