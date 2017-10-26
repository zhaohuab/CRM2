import { Form, Input, Row, Col,DatePicker } from 'antd';
import Radio from 'utils/components/radios'
const FormItem = Form.Item;
class Card extends React.Component {
    constructor(props) {
        super(props)
    }
    typeEnum = [{
        key : 1,
        title : "集团型企业"
    },{
        key : 2,
        title : "公司型企业"
    }]
    componentDidMount() {
        if(this.props.dataSource) {
            this.props.form.setFieldsValue(this.props.dataSource);
        }
    }
    tranCol(formitem) {
        return <Col span={8}>
                    {formitem}
                </Col>
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: { span: 5 },
            wrapperCol: { span: 19 },
        };
        const formElements = [
            <FormItem
                label="企业名称"
                {...formItemLayout}
            >
                {getFieldDecorator('name', {
                    rules: [{
                        required: true, message: '必输',
                    }],
                })(
                    <Input />
                    )}
            </FormItem>, 
            <FormItem
                label="企业类型"
                {...formItemLayout}
            >
                {getFieldDecorator('orgType', {
                    rules: [{
                        required: true, message: '必输',
                    }],
                })(
                    <Radio dataSource={this.typeEnum}/>
                    )}
            </FormItem>,
            <FormItem
                label="简称"
                {...formItemLayout}
            >
                {getFieldDecorator('simpleName', {
                    rules: [{
                        required: true, message: '必输',
                    }],
                })(
                    <Input />
                    )}
            </FormItem>,
            <FormItem
                label="所属行业"
                {...formItemLayout}
            >
                {getFieldDecorator('industry', {
                    rules: [{
                        required: true, message: '必输',
                    }],
                })(
                    <Input />
                    )}
            </FormItem>,
            <FormItem
                label="创立时间"
                {...formItemLayout}
            >
                {getFieldDecorator('createTime', {
                    rules: [{
                        required: true, message: '必输',
                    }],
                })(
                    <DatePicker style={{width:'100%'}} />
                    )}
            </FormItem>,
            <FormItem
                label="总部地址"
                {...formItemLayout}
            >
                {getFieldDecorator('address', {
                    rules: [{
                        required: true, message: '必输',
                    }],
                })(
                    <Input />
                    )}
            </FormItem>];
        return (<div>
        <Form >
            <Row >
                {formElements.map((formitem) => {
                    return this.tranCol(formitem)
                })}  
            </Row>
        </Form>
        </div>)
    }
}
export default Card;