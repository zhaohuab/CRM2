import { Form, Input, Select, Row, Col, Button, Popover,AutoComplete,Card,
        Table,Tree,Dropdown ,Checkbox, Upload,Icon,Radio} from 'antd';

import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import * as Actions from '../action'
import './index.less';

import PrdClassRef from './PrdClassRef'
import BrandRef from './BrandRef'
import MeaUnitRef from './MeaUnitRef'
import AttrsGrpRef from './AttrsGrpRef'

const TreeNode = Tree.TreeNode;
const FormItem = Form.Item;
const Option = Select.Option;
const Search = Input.Search;
const AutoOption = AutoComplete.Option;
const OptGroup = AutoComplete.OptGroup;
const RadioGroup = Radio.Group;

class ProductCardDetail extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            pagination : {
                pageSize:10,
                page:1,
            },
            visible:false,
            title:{},
            data:[],
            column:[],
            selectedKeys:0,
            info:[],           
            selectedValue:"",           
            meaVisible:false,
            selectedMeaValue:"", 
            brandVisible:false,
            selectedBrandValue:"",
            suVisible:false,
            selectedSuValue:"", 
            brandRefData:"",
            prdClassRefData:""
        }
    }


    columns = [ {
        title: '名称',
        dataIndex: 'name',
        key: 'name'                      
        }            
    ];


    componentWillMount() {
        
    }

    componentDidMount() {        
       
    }
    
    getMeasurementUnit() {

        let {pagination, visible, title} = this.state;
        //const unitRefList = this.props.$$state.get("unitRefList").toJS();
        let state = {
            visible: true,
            title: "计量单位",
            data: unitRefList
        } 
        this.setState(state);
    }

    onCheckChange = (e) => {

    }   

    handleSuVisibleChange = (flag) => {
        this.setState({ suVisible: flag });
    }

    handleSalesUnitVisibleChange = (flag) => {
        this.props.action.showSalesUnit(flag);
    }
  

    onSuRowClick = (record, index) => {
       
        this.setState({selectedSuValue:record.name});
        this.handleSuVisibleChange(false);
        this.handleSalesUnitVisibleChange(true);
    }
   

    onAdd = () => {
        const item = {convertRate:"r",fixedConvert:true};
        this.props.action.addRow(item);
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        const salesunitTable = this.props.$$state.get("salesunitTable").toJS();

        const salesUnitVisible = this.props.$$state.get("salesUnitVisible");
        let {visible, title, selectedRowkeys,checkedKeys} = this.state;

        const rowSelection = {
            selectedRowkeys,
            onChange: this.onSelectChange,
        };

        {
            getFieldDecorator('id', {
            })(
                <Input />
                )
        }
        return (
            <div>                          
        <Form >
             <Row gutter={0}>
        <Col span={12} >
            <FormItem
                label="编码"
                labelCol={{ span: 6 }}
                wrapperCol={{ span:13 }}
               // {...formItemLayout}
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
               // {...formItemLayout}
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
              //  {...formItemLayout}
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
               // {...formItemLayout}
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

                })(  <span> {this.props.dataSource.orgName}</span>
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
            //    {...formItemLayout}
            >
                {getFieldDecorator('photo', {

                })(
                    <Upload
                    className="avatar-uploader"
                    name="avatar"
                    showUploadList={false}
                  >
                    {
                        <Icon type="plus" className="avatar-uploader-trigger" />
                    }
                  </Upload>
                    )}
            </FormItem>
            </Col>
        
            <Col span={12}>
            <FormItem
                label="产品描述"
                labelCol={{ span: 6 }}
                wrapperCol={{ span:13 }}
             //   {...formItemLayout}
            >
                {getFieldDecorator('description', {

                })(
                    <span> {this.props.dataSource.description}</span>
                    )}
            </FormItem>
            </Col>           
          
            </Row>  
        </Form>
     </div>)
  
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
                    fieldsChangeData = {[item]:parseInt(fields[item].value[0])};
                }else if(item == "brandId"){
                    fieldsChangeData = {[item]:parseInt(fields[item].value)};
                }else if(item == "measureId"){
                    fieldsChangeData = {[item]:parseInt(fields[item].value)};
                }else if(item == "attrGroupId"){
                    fieldsChangeData = {[item]:parseInt(fields[item].value)};
                }else{           
                    fieldsChangeData = {[item]:fields[item].value};
                }
            }
            Object.assign(props.dataSource, fieldsChangeData);
            props.action.setFieldsChangeData(fieldsChangeData);
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
    })(ProductCardDetail));


