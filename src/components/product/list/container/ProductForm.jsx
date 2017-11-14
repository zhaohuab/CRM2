import { Form, Input, Select, Row, Col } from 'antd';

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

        {
            getFieldDecorator('id', {
            })(
                <Input />
                )
        }
        return (
           
               
        <Form >
             <Row gutter={32}>
        <Col span={10} >
            <FormItem
                label="编码"
               // {...formItemLayout}
            >
                {getFieldDecorator('code', {
                    rules: [{
                        required: true, message: '请输出编码',
                    }],
                })(
                    <Input placeholder='请输入...'/>
                    )}
            </FormItem>
        </Col>
        <Col span={10}>
            <FormItem
                label="名称"
               // {...formItemLayout}
            >
                {getFieldDecorator('name', {
                    rules: [{
                        required: true, message: '请输出名称',
                    }],
                })(
                    <Input placeholder='请输入...'/>
                    )}
            </FormItem>
            </Col>
            </Row>  
            <Row gutter={32}>
            <Col span={10}>
            <FormItem
                label="助记码"
              //  {...formItemLayout}
            >
                {getFieldDecorator('memCode', {
                    rules: [{
                        required: false, message: '请输入助记码',
                    }],
                })(
                    <Input placeholder='请输入...'/>
                    )}
            </FormItem>
            </Col>
            <Col span={10}>
            <FormItem
                label="规格"
               // {...formItemLayout}
            >
                {getFieldDecorator('specific', {
                    rules: [{
                        required: false, message: '',
                    }],
                })(
                    <Input placeholder='请输入...'/>
                    )}
            </FormItem>
            </Col>
            </Row>  
            <Row gutter={32}>
            <Col span={10}>
            <FormItem
                label="产品分类"
               // {...formItemLayout}
            >
                {getFieldDecorator('prdtypeId', {
                    rules: [{
                        required: false, message: '请输入公司',
                    }],
                })(
                    <Input placeholder='请输入...'/>
                    )}
            </FormItem>
            </Col>
            <Col span={10}>
            <FormItem
                label="主单位"
               // {...formItemLayout}
            >
                {getFieldDecorator('measureId', {

                })(
                    <Input placeholder='请输入...'/>
                    )}
            </FormItem>
            </Col>
            </Row>  
            <Row gutter={32}>
            <Col span={10}>
            <FormItem
                label="销售单位"
               // {...formItemLayout}
            >
                {getFieldDecorator('saleUnitName', {

                })(
                    <Input placeholder='请输入...'/>
                    )}
            </FormItem>
            </Col>
           
            <Col span={10}>
            <FormItem
                label="品牌"
              //  {...formItemLayout}
            >
                {getFieldDecorator('brandId', {

                })(
                    <Input placeholder='请输入...'/>
                    )}
            </FormItem>
            </Col>
            </Row>  
            <Row gutter={32}>
            <Col span={10}>
            <FormItem
                label="参考售价"
               // {...formItemLayout}
            >
                {getFieldDecorator('price', {

                })(
                    <Input placeholder='请输入...'/>
                    )}
            </FormItem>
            </Col>
            <Col span={10}>
            <FormItem
                label="适用组织"
              //  {...formItemLayout}
            >
                {getFieldDecorator('orgId', {

                })(
                    <Input placeholder='请输入...'/>
                    )}
            </FormItem>
            </Col>
            </Row>  
            <Row gutter={32}>
            <Col span={10}>
            <FormItem
                label="属性组"
              //  {...formItemLayout}
            >
                {getFieldDecorator('attrGroupId', {

                })(
                    <Input placeholder='请输入...'/>
                    )}
            </FormItem>
            </Col>
            <Col span={10}>
            <FormItem
                label="产品图片"
            //    {...formItemLayout}
            >
                {getFieldDecorator('photo', {

                })(
                    <Input placeholder='请输入...'/>
                    )}
            </FormItem>
            </Col>
            </Row>  
            <Row gutter={32}>
            <Col span={10}>
            <FormItem
                label="启用状态"
             //   {...formItemLayout}
            >
                {getFieldDecorator('description', {

                })(
                    <Input placeholder='请输入...'/>
                    )}
            </FormItem>
            </Col>
            <Col span={10}>
            <FormItem
                label="产品描述"
             //   {...formItemLayout}
            >
                {getFieldDecorator('description', {

                })(
                    <Input placeholder='请输入...'/>
                    )}
            </FormItem>
            </Col>           
          
            </Row>  
        </Form>)
  
    }
}

export default Card;