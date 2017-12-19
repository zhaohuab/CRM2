import {
    Modal,
    Cascader,
    Select,
    Form,
    Row,
    Col,
    Input,
    Button,
    Icon
} from "antd";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
const FormItem = Form.Item;
const Option = Select.Option;
const ButtonGroup = Button.Group;
const confirm = Modal.confirm;
import Enum from "utils/components/enums";
import "assets/stylesheet/all/iconfont.css";
import * as Actions from "../action";
import PrdClassRef from './PrdClassRef'
import BrandRef from './BrandRef'
import MeaUnitRef from './MeaUnitRef'
import AttrsGrpRef from './AttrsGrpRef'

class MoreForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            enumData:{enableState:[
                        {key:1,title:"启用"},
                        {key:2,title:"停用"}]},
        }
    }

    handleSearch(e) {
        e.preventDefault();
        let  fo = this.props.$$state.get("moreFormData").toJS();
        debugger
        this.props.handleSearch(this.props.$$state.get("moreFormData").toJS());
    }

    moreForm() {
        this.props.formMore();
    }

    onPrdCodeDelete() {
        let code = {code:""};
        let data = this.props.dataSource
        Object.assign(data, code);
        this.props.action.setMoreFormData(data);
    }

    onPrdNameDelete() {
        let name = {name:""};
        let data = this.props.dataSource
        Object.assign(data, name);
        this.props.action.setMoreFormData(data);
    }

    onPrdMemDelete() {
        let memCode = {memCode:""};
        let data = this.props.dataSource
        Object.assign(data, memCode);
        this.props.action.setMoreFormData(data);
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: { span: 2 },
            wrapperCol: { span: 22 }
        };

        return (
            <div className="header-bottom-inner">
                <Form layout="inline" onSubmit={this.handleSearch.bind(this)}>
                    <Row type="flex" align="middle" style={{ height: "54px" }}>
                        <Col span={6}>
                            <FormItem {...formItemLayout}>
                                {getFieldDecorator("orgId")(
                                    <Input type="text" placeholder="适用组织" />
                                )}
                            </FormItem>
                        </Col>
                        <Col span={6}>
                            <FormItem {...formItemLayout}>
                                {getFieldDecorator("prdtypeId")(
                                    <PrdClassRef  placeholder="产品分类" />
                                )}
                            </FormItem>
                        </Col>
                        <Col span={6}>
                            <FormItem {...formItemLayout}>
                                {getFieldDecorator("code", {})(
                                    this.props.dataSource.code?
                                        <Input type="text"  
                                            suffix={<Icon type="close" onClick={this.onPrdCodeDelete.bind(this)}/>}/>:
                                        <Input type="text" placeholder="产品编码" />                                                          
                                )}
                            </FormItem>
                        </Col>
                        <Col span={6}>
                            <FormItem {...formItemLayout}>
                                {getFieldDecorator(
                                    "name",{}
                                )(
                                    this.props.dataSource.name?
                                    <Input type="text" 
                                        suffix={<Icon type="close" onClick={this.onPrdNameDelete.bind(this)}/>}/>:
                                    <Input type="text" placeholder="产品名称"/>
                                )}
                            </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={6}>
                            <FormItem {...formItemLayout}>
                                {getFieldDecorator("memCode", {})(
                                    this.props.dataSource.memCode?
                                    <Input type="text"
                                        suffix={<Icon type="close" onClick={this.onPrdMemDelete.bind(this)}/>}/>
                                    :<Input type="text" placeholder="助记码"/>
                                )}
                            </FormItem>
                        </Col>
                        <Col span={6}>
                            <FormItem {...formItemLayout}>
                                {getFieldDecorator("brandId", {})(
                                     <BrandRef/>
                                )}
                            </FormItem>
                        </Col>
                        <Col span={6}>
                            <FormItem {...formItemLayout}>
                                {getFieldDecorator("attrGroupId", {})(
                                     <AttrsGrpRef/>
                                )}
                            </FormItem>
                        </Col>
                        <Col span={6}>
                            <FormItem {...formItemLayout}>
                                {getFieldDecorator("enableState", {})(
                                    <Enum
                                    addOptionAll={""}
                                    dataSource={this.state.enumData.enableState}
                                />
                                )}
                            </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={6}>
                            <div className="more-btn">
                                <Button htmlType="submit" onClick={this.handleSearch.bind(this)} >查询</Button>
                                <span
                                    className="more-up"
                                    onClick={this.moreForm.bind(this)}
                                >
                                    收起 <Icon type="up" />
                                </span>
                            </div>
                        </Col>
                    </Row>
                </Form>
            </div>
        );
    }
}

const WarpMoreForm = Form.create({
    onFieldsChange(props, fields){ 
        let fieldsChangeData = {};
        let dataSource = props.dataSource;
        for(let item in fields){
            if(item == "prdtypeId"){                   
                if("isDelete" in fields[item].value){
                    delete props.dataSource.prdtypeId;
                    delete props.dataSource.prdtypeName;
                }else{
                    fieldsChangeData = {[item]:parseInt(fields[item].value.prdtypeId[0]),prdtypeName:fields[item].value.prdtypeName};
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
                    fieldsChangeData = {[item]:parseInt(fields[item].value.measureId[0]),measureName:fields[item].value.measureName};
                }                 
            }else if(item == "attrGroupId"){
                if("isDelete" in fields[item].value){
                    delete props.dataSource.attrGroupId;
                    delete props.dataSource.attrGroupName;
                }else{
                    fieldsChangeData = {[item]:parseInt(fields[item].value.attrGroupId),attrGroupName:fields[item].value.attrGroupName};
                }              
            }else if(item == "enableState"){
                if(parseInt(fields[item].value.key) == 0){
                    delete props.dataSource.enableState;
                    fieldsChangeData = {enableStateName:fields[item].value.title};
                }else{
                    fieldsChangeData = {[item]:parseInt(fields[item].value.key),enableStateName:fields[item].value.title};
                }               
            }else{           
                fieldsChangeData = {[item]:fields[item].value};
            }
        }
        Object.assign(props.dataSource, fieldsChangeData);
        props.action.setMoreFormData(props.dataSource);
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
            enableState:{
                ...data.enableState,
                value:data.enableStateName
            } 
            
        };
    }
})(MoreForm);

//绑定状态到组件props
function mapStateToProps(state, ownProps) {
    return {
        $$state: state.product
    };
}
//绑定action到组件props
function mapDispatchToProps(dispatch) {
    return {
        action: bindActionCreators(Actions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(WarpMoreForm);
