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

class ProductCard extends React.Component {
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

        const salesUnitRefTable = (
            <div  className = "industry-main"> 
                <Button onClick={this.onAdd}>新增</Button>
                <Table columns = {this.salesunitcolumns} 
                    dataSource = {salesunitTable} 
                    bordered="true" 
                    style = {{background:"white",width:450}}
                    //onRowClick={this.onSalesUnitRowClick}
                    pagination={false}
                    rowSelection={rowSelection}
                   />
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
        <Col span={12}>
            <FormItem
                label="名称"
                labelCol={{ span: 6 }}
                wrapperCol={{ span:13 }}
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
          
            <Col span={12}>
            <FormItem
                label="助记码"
                labelCol={{ span: 6 }}
                wrapperCol={{ span:13 }}
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
            <Col span={12}>
            <FormItem
                label="规格"
                labelCol={{ span: 6 }}
                wrapperCol={{ span:13 }}
               // {...formItemLayout}
            >
                {getFieldDecorator('spec', {
                    rules: [{
                        required: false, message: '',
                    }],
                })(
                    <Input placeholder='请输入...'/>
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

                })(<MeaUnitRef/>
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
                    <Input placeholder='请输入...'/>
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
           
            {/* <Col span={12}>
            <FormItem
                label="启用状态"
                labelCol={{ span: 6 }}
                wrapperCol={{ span:13 }}
             //   {...formItemLayout}
            >
                {getFieldDecorator('enableState', {

                })(
                    <RadioGroup>
                        <Radio value={1}>启用</Radio>
                        <Radio value={2}>停用</Radio>
                    </RadioGroup>
                    )}
            </FormItem>
            </Col> */}
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
                    <Input  type="textarea" placeholder='请输入...'/>
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
    })(ProductCard));


