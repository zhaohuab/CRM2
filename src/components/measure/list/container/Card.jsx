import { Form ,Input } from 'antd';
const FormItem = Form.Item;
class Card extends React.Component {
  constructor(props) {
    super(props)
  }
  componentDidMount() {
    
    //装箱过程
    
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
              label="代号"
              {...formItemLayout}
          >
              {getFieldDecorator('code', {
                  rules: [{
                      required: true, message: '必输',
                  }],
              })(
                  <Input />
                  )}
          </FormItem>
          <FormItem
              label="名称"
              {...formItemLayout}
          >
              {getFieldDecorator('name', {
                  rules: [{
                      required: true, message: '必输',
                  }],
              })(
                  <Input />
                  )}
          </FormItem>
          <FormItem
              label="精度"
              {...formItemLayout}
          >
              {getFieldDecorator('precision', {
                  rules: [{
                      required: true, message: '必输',
                  }],
              })(
                  <Input />
                  )}
          </FormItem>
          <FormItem
              label="对应ERP"
              {...formItemLayout}
          >
              {getFieldDecorator('erpCode', {
                //   rules: [{
                //       required: true, message: '必输',
                //   }],
              })(
                  <Input />
                  )}
          </FormItem>
      </Form>)
  }
}
export default Card;