import { Form, Row, Col,Table,Button,Dropdown} from 'antd';

import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import * as Actions from '../action'
import './index.less';

const FormItem = Form.Item;

class ProductCardDetail extends React.Component {
    constructor(props) {
        super(props)
    }

    columns = [{
        title: '名称',
        dataIndex: 'name',
        key: 'name'                      
    }];

    render() {
        const { getFieldDecorator } = this.props.form;
        let orgName = this.props.dataSource.orgName;
        let names = [];
        //debugger
        if(orgName !== undefined && orgName !== null && orgName !== ""){
            names = orgName.split(",");
        }
        //let 
        let dataSource = [];
        for(let name of names){
            name = {name: name};
            dataSource.push(name);
        }
        //debugger
        //let name = names[0];
       //debugger
        let moreOrg = (
            <div className = "reference">
            <div  className = "reference-main"> 
                <Row
                type="flex"
                justify="space-between"
                className="reference-main-header"
                >
                    <div className="title">组织</div>
                </Row>
                <Row className="reference-main-choice" type="flex">
                    <Table columns = {this.columns} 
                    dataSource = {dataSource} 
                    style = {{background:"white"}}
                    showHeader={false}
                   // onRowClick={this.onBrandRowClick}
                    pagination={false}                 
                    className="inner"
                    />
                </Row>
                {/* <Row
                type="flex"
                justify="end"
                align="middle"
                className="reference-main-footer"
                >
                    <Row type="flex" justify="end" align="middle" gutter={15}>
                        <div>
                            <Button 
                           // onClick={this.onBrandCancel.bind(this)}
                            >
                                取消
                            </Button>
                        </div>
                        <div>
                            <Button
                            type="primary"
                            //onClick={this.onBrandOk.bind(this)}
                            >
                                确定
                            </Button>
                        </div>
                    </Row>
                </Row> */}
            </div>
        </div>
        );
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
                    
                                })(
                                    <span> {this.props.dataSource.code}</span>
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
                   
                                })(
                                    <span> {this.props.dataSource.name}</span>
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
                  
                                })(
                                    <span> {this.props.dataSource.memCode}</span>
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
                   
                                })(
                                    <span> {this.props.dataSource.spec}</span>
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
                   
                                })(
                                    <span> {this.props.dataSource.prdtypeName}</span>
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
                  

                                })(  <span> {this.props.dataSource.measureName}</span>
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
                                    <span> {this.props.dataSource.brandName}</span>
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
                  
                                })(
                                    <span> {this.props.dataSource.price}</span>
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

                                })(  <Dropdown overlay={moreOrg} 
                                        trigger="click"
                                       // onVisibleChange={this.handleBrandVisibleChange}
                                       // visible={this.state.visible}                   
                                    >                                       
                                       <a>{names[0]}</a>
                                    </Dropdown>
                                )}
                            </FormItem>
                        </Col>       
                        <Col span={12}>
                            <FormItem
                            label="属性组"
                            labelCol={{ span: 6 }}
                            wrapperCol={{ span:13 }}
                            >
                                {getFieldDecorator('attrGroupName', {
                     
                                })(
                                    <span> {this.props.dataSource.code}</span>
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
                                    <div/>
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
                                    <span> {this.props.dataSource.description}</span>
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
            // let fieldsChangeData = {};
            // let dataSource = props.dataSource;
            // for(let item in fields){
            //     if(item == "prdtypeId"){                   
            //         fieldsChangeData = {[item]:parseInt(fields[item].value[0])};
            //     }else if(item == "brandId"){
            //         fieldsChangeData = {[item]:parseInt(fields[item].value)};
            //     }else if(item == "measureId"){
            //         fieldsChangeData = {[item]:parseInt(fields[item].value)};
            //     }else if(item == "attrGroupId"){
            //         fieldsChangeData = {[item]:parseInt(fields[item].value)};
            //     }else{           
            //         fieldsChangeData = {[item]:fields[item].value};
            //     }
            // }
            // Object.assign(props.dataSource, fieldsChangeData);
            // props.action.setFieldsChangeData(fieldsChangeData);
            // props.action.setFormData(props.dataSource);
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
    })(ProductCardDetail));


