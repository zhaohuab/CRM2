import { Form, Input, Row, Col, Upload, Icon} from 'antd';

import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import * as Actions from '../action'
import './index.less';

import PrdClassRef from './PrdClassRef'
import BrandRef from './BrandRef'
import MeaUnitRef from './MeaUnitRef'
import AttrsGrpRef from './AttrsGrpRef'

const FormItem = Form.Item;

class ProductCard extends React.Component {
    constructor(props) {
        super(props)
    }

    // onPrdCodeDelete() {
    //     let code = {code:""};
    //     let data = this.props.dataSource
    //     Object.assign(data, code);
    //     this.props.action.setFormData(data);
    // }

    // onPrdNameDelete() {
    //     let name = {name:""};
    //     let data = this.props.dataSource
    //     Object.assign(data, name);
    //     this.props.action.setFormData(data);
    // }

    // onPrdMemDelete() {
    //     let memCode = {memCode:""};
    //     let data = this.props.dataSource
    //     Object.assign(data, memCode);
    //     this.props.action.setFormData(data);
    // }

    // onSpecDelete() {
    //     let spec = {spec:""};
    //     let data = this.props.dataSource
    //     Object.assign(data, spec);
    //     this.props.action.setFormData(data);
    // }

    // onPriceDelete() {
    //     let price = {price:""};
    //     let data = this.props.dataSource
    //     Object.assign(data, price);
    //     this.props.action.setFormData(data);
    // }

    render() {
        const { getFieldDecorator } = this.props.form;
    
        return (
            <div>                          
                <Form >
                    <Row gutter={0}>
                        <Col span={12} >
                            <FormItem
                            label="编码"
                            labelCol={{ span: 6 }}
                            wrapperCol={{ span:13 }}                        
                            >
                                {getFieldDecorator('code', {
                                    rules: [{
                                        required: true, message: '请输出编码',
                                    }],
                                })(
                                    // this.props.dataSource.code?
                                    // <Input type="text"  
                                    //     suffix={<Icon type="close" onClick={this.onPrdCodeDelete.bind(this)}/>}/>:
                                    // <Input type="text" />
                                    <Input/>
                                )}
                            </FormItem>
                        </Col>
                        <Col span={12}>
                            <FormItem
                            label="名称"
                            labelCol={{ span: 6 }}
                            wrapperCol={{ span:13 }}                       
                            >
                                {getFieldDecorator('name', {
                                    rules: [{
                                        required: true, message: '请输出名称',
                                    }],
                                })(
                                    // this.props.dataSource.name?
                                    // <Input type="text" 
                                    //     suffix={<Icon type="close" onClick={this.onPrdNameDelete.bind(this)}/>}/>:
                                    // <Input type="text" />
                                    <Input/>
                                )}
                            </FormItem>
                        </Col>         
                        <Col span={12}>
                            <FormItem
                            label="助记码"
                            labelCol={{ span: 6 }}
                            wrapperCol={{ span:13 }}                    
                            >
                                {getFieldDecorator('memCode', {
                                    rules: [{
                                        required: false, message: '请输入助记码',
                                    }],
                                })(
                                    // this.props.dataSource.memCode?
                                    // <Input type="text"
                                    //     suffix={<Icon type="close" onClick={this.onPrdMemDelete.bind(this)}/>}/>
                                    // :<Input type="text" />
                                    <Input/>
                                )}
                            </FormItem>
                        </Col>
                        <Col span={12}>
                            <FormItem
                            label="规格"
                            labelCol={{ span: 6 }}
                            wrapperCol={{ span:13 }}                           
                            >
                                {getFieldDecorator('spec', {
                                    rules: [{
                                        required: false, message: '',
                                    }],
                                })(
                                    // this.props.dataSource.spec?
                                    // <Input type="text"
                                    //     suffix={<Icon type="close" onClick={this.onSpecDelete.bind(this)}/>}/>
                                    // :<Input type="text" />
                                    <Input/>
                                )}
                            </FormItem>
                        </Col>          
                        <Col span={12}>
                            <FormItem
                            label="产品分类"
                            labelCol={{ span: 6 }}
                            wrapperCol={{ span:13 }}
                            >
                                {getFieldDecorator('prdtypeId', {
                                    rules: [{
                                        required: true
                                    }],
                                })(
                                    <PrdClassRef/>
                                )}
                            </FormItem>
                        </Col>
                        <Col span={12}>
                            <FormItem
                            label="主单位"
                            labelCol={{ span: 6 }}
                            wrapperCol={{ span:13 }}
                            >
                                {getFieldDecorator('measureId', {
                                    rules: [{
                                        required: true
                                    }],
                                })(
                                    <MeaUnitRef/>
                                )}
                            </FormItem>
                        </Col>           
                        <Col span={12}>
                            <FormItem
                            label="品牌"
                            labelCol={{ span: 6 }}
                            wrapperCol={{ span:13 }}               
                            >
                                {getFieldDecorator('brandId', {        
                                })(
                                    <BrandRef />
                                )}
                            </FormItem>
                        </Col>        
                        <Col span={12}>
                            <FormItem
                            label="参考售价"
                            labelCol={{ span: 6 }}
                            wrapperCol={{ span:13 }}
                            >
                                {getFieldDecorator('price', {
                                    rules: [{
                                        required: true
                                    }],
                                })(
                                    // this.props.dataSource.price?
                                    // <Input type="text"
                                    //     suffix={<Icon type="close" onClick={this.onPriceDelete.bind(this)}/>}/>
                                    // :<Input type="text" />
                                    <Input/>
                                )}
                            </FormItem>
                        </Col>
                        <Col span={12}>
                            <FormItem
                            label="适用组织"
                            labelCol={{ span: 6 }}
                            wrapperCol={{ span:13 }}
                            >
                                {getFieldDecorator('orgId', {

                                })(
                                    <Input  disabled = {true}/>
                                )}
                            </FormItem>
                        </Col>       
                        <Col span={12}>
                            <FormItem
                            label="属性组"
                            labelCol={{ span: 6 }}
                            wrapperCol={{ span:13 }}
                            >
                                {getFieldDecorator('attrGroupId', {
                                    rules: [{
                                        required: true
                                    }],
                                })(
                                    <AttrsGrpRef/>
                                )}
                            </FormItem>
                         </Col>          
                        <Col span={12}>
                            <FormItem
                            label="产品图片"
                            labelCol={{ span: 6 }}
                            wrapperCol={{ span:13 }}
                            >
                                {getFieldDecorator('photo', {

                                })(
                                    <Upload
                                    className="avatar-uploader"
                                    name="avatar"
                                    showUploadList={false}
                                    >                                     
                                        <Icon type="plus" className="avatar-uploader-trigger" />                                       
                                    </Upload>
                                )}
                            </FormItem>
                        </Col>       
                        <Col span={12}>
                            <FormItem
                            label="产品描述"
                            labelCol={{ span: 6 }}
                            wrapperCol={{ span:13 }}                    
                            >
                                {getFieldDecorator('description', {

                                })(
                                    <Input  type="textarea" placeholder='请输入...'/>
                                )}
                            </FormItem>
                        </Col>                    
                    </Row>  
                </Form>
            </div>
        )  
    }
}

//绑定状态到组件props
function mapStateToProps(state, ownProps) {
    return {
      $$state: state.product
    }
}
  
  //绑定action到组件props
function mapDispatchToProps(dispatch) {
    return {
      action: bindActionCreators(Actions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(
    Form.create({
        onFieldsChange(props, fields){
            let fieldsChangeData = {};
            let dataSource = props.dataSource;
            for(let item in fields){
                if(item == "prdtypeId"){                   
                    if("isDelete" in fields[item].value){
                        delete props.dataSource.prdtypeId;
                        delete props.dataSource.prdtypeName;
                    }else{
                        if(dataSource.attrGroupId !== undefined && dataSource.attrGroupId !== null
                            &&JSON.stringify(dataSource.attrGroupId) !== "{}" &&dataSource.attrGroupId !== ""){
                                fieldsChangeData = {[item]:parseInt(fields[item].value.prdtypeId),prdtypeName:fields[item].value.prdtypeName};
                        }else{
                            fieldsChangeData = {[item]:parseInt(fields[item].value.prdtypeId),prdtypeName:fields[item].value.prdtypeName,
                                attrGroupId:fields[item].value.attrGroupId,attrGroupName:fields[item].value.attrGroupName};                           
                        }                       
                    } 
                }else if(item == "brandId"){
                    if("isDelete" in fields[item].value){
                        delete props.dataSource.brandId;
                        delete props.dataSource.brandName;
                    }else{
                        fieldsChangeData = {[item]:parseInt(fields[item].value.brandId),brandName:fields[item].value.brandName};
                    }                
                }else if(item == "measureId"){
                    if("isDelete" in fields[item].value){
                        delete props.dataSource.measureId;
                        delete props.dataSource.measureName;
                    }else{
                        fieldsChangeData = {[item]:parseInt(fields[item].value.measureId),measureName:fields[item].value.measureName};
                    }                 
                }else if(item == "attrGroupId"){
                    if("isDelete" in fields[item].value){
                        delete props.dataSource.attrGroupId;
                        delete props.dataSource.attrGroupName;
                    }else{
                        fieldsChangeData = {[item]:parseInt(fields[item].value.attrGroupId),attrGroupName:fields[item].value.attrGroupName};
                    }              
                }else{           
                    fieldsChangeData = {[item]:fields[item].value};
                }
            }
            Object.assign(props.dataSource, fieldsChangeData);
            props.action.setFormData(props.dataSource);
        },
        mapPropsToFields(props){
            let data = props.dataSource;
            return{
                code:{
                    ...data.code,
                    value:data.code
                },
                name:{
                    ...data.name,
                    value:data.name
                }, 
                memCode:{
                    ...data.memCode,
                    value:data.memCode
                },  
                spec:{
                    ...data.spec,
                    value:data.spec
                },  
                price:{
                    ...data.price,
                    value:data.price
                },  
                orgId:{
                    ...data.orgId,
                    value:data.orgId
                },  
                description:{
                    ...data.description,
                    value:data.description
                },  
                prdtypeId:{
                    ...data.prdtypeName,
                    value:data.prdtypeName
                },  
                brandId:{
                    ...data.brandId,
                    value:data.brandName
                },  
                measureId:{
                    ...data.measureId,
                    value:data.measureName
                },  
                attrGroupId:{
                    ...data.attrGroupId,
                    value:data.attrGroupName
                },  
                
            };
        }
    })(ProductCard));


