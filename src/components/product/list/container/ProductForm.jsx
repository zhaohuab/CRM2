import { Form, Input, Select } from 'antd';

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
    jobEnum = [{
      key : 1,
        title : "编码"
   
     }]
     genderEnum = [{
         key : 4,
         title : "规格",
    }]
    componentDidMount() {
        
        //装箱过程
        let { code,name, memCode,specific,prdtypeId,measureId,price,brandId,attrGroupId,orgId,description,photo,saleUnits } = this.props.dataSource;
        this.props.form.setFieldsValue(this.props.dataSource);
    }
    componentWillMount() {

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
        return (
        <Form >
            <FormItem
                label="编码"
                {...formItemLayout}
            >
                {getFieldDecorator('code', {
                    rules: [{
                        required: true, message: '请输出编码',
                    }],
                })(
                    <Input placeholder='请输入...'/>
                    )}
            </FormItem>
            <FormItem
                label="名称"
                {...formItemLayout}
            >
                {getFieldDecorator('name', {
                    rules: [{
                        required: true, message: '请输出名称',
                    }],
                })(
                    <Input placeholder='请输入...'/>
                    )}
            </FormItem>
            <FormItem
                label="助记码"
                {...formItemLayout}
            >
                {getFieldDecorator('memCode', {
                    rules: [{
                        required: false, message: '请输入助记码',
                    }],
                })(
                    <Email/>
                    )}
            </FormItem>
            <FormItem
                label="规格"
                {...formItemLayout}
            >
                {getFieldDecorator('specific', {
                    rules: [{
                        required: false, message: '',
                    }],
                })(
                    <RadioGroup type="button" dataSource={this.genderEnum}/>
                    )}
            </FormItem>
            <FormItem
                label="产品分类"
                {...formItemLayout}
            >
                {getFieldDecorator('prdtypeId', {
                    rules: [{
                        required: false, message: '请输入公司',
                    }],
                })(
                    <Input placeholder='请输入...'/>
                    )}
            </FormItem>
            <FormItem
                label="主单位"
                {...formItemLayout}
            >
                {getFieldDecorator('measureId', {

                })(
                    <Input placeholder='请输入...'/>
                    )}
            </FormItem>
            <FormItem
                label="参考售价"
                {...formItemLayout}
            >
                {getFieldDecorator('price', {

                })(
                    <Input placeholder='请输入...'/>
                    )}
            </FormItem>
            <FormItem
                label="品牌"
                {...formItemLayout}
            >
                {getFieldDecorator('brandId', {

                })(
                    <Enum dataSource={this.jobEnum}/>
                    )}
            </FormItem>
            <FormItem
                label="属性组"
                {...formItemLayout}
            >
                {getFieldDecorator('attrGroupId', {

                })(
                    <Input placeholder='请输入...'/>
                    )}
            </FormItem>
            <FormItem
                label="适用组织"
                {...formItemLayout}
            >
                {getFieldDecorator('orgId', {

                })(
                    <Enum dataSource={this.jobEnum}/>
                    )}
            </FormItem>
            <FormItem
                label="产品描述"
                {...formItemLayout}
            >
                {getFieldDecorator('description', {

                })(
                    <Enum dataSource={this.jobEnum}/>
                    )}
            </FormItem>
            <FormItem
                label="产品图片"
                {...formItemLayout}
            >
                {getFieldDecorator('photo', {

                })(
                    <Enum dataSource={this.jobEnum}/>
                    )}
            </FormItem>
        </Form>)
    }
}

export default Card;