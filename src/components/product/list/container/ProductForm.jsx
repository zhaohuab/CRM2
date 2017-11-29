import { Form, Input, Select, Row, Col, Button, Popover,AutoComplete,Card,Table,Tree,Dropdown ,Checkbox, Upload,Icon} from 'antd';

import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import * as Actions from '../action'
import './index.less';

import Department from 'components/refs/departments'
import RadioGroup from 'utils/components/radios'
const TreeNode = Tree.TreeNode;
const FormItem = Form.Item;
const Option = Select.Option;
const Search = Input.Search;
const AutoOption = AutoComplete.Option;
const OptGroup = AutoComplete.OptGroup;
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
            selectedKeys:[],
            info:[],           
            selectedValue:"",           
            meaVisible:false,
            selectedMeaValue:"", 
            brandVisible:false,
            selectedBrandValue:"",
            suVisible:false,
            selectedSuValue:"", 
           // visible: false,
            icbcList: [],
            select: "",
            index: -1
        }
    }

    dataSource = [{title:'品牌',list:[{id:1, name:'pinpai1',enName:'brand1',description:'wu'},
                    {id:2, name:'pinpai2',enName:'brand2',description:'wu'}]}];

    columns = [ {
        title: '名称',
        dataIndex: 'name',
        key: 'name'                      
        }            
    ];

    saleunitRefList = (
        <div> 
            <Table columns = {this.columns} 
                dataSource = {this.props.$$state.get("meaunitRefList").toJS().data} 
                style = {{background:"lightblue"}}
                showHeader={false}
                onRowClick={this.onSuRowClick}
                pagination={false}
                scroll={{ y: 150 }}
               // rowSelection={rowSelection}
               />
        </div>
    );

    salesunitcolumns = [{
        title: '销售单位',
        dataIndex: 'name',
        key: 'name',
        render: (text,record,index) => (
            <Dropdown overlay={this.saleunitRefList} 
            trigger="click"
            onVisibleChange={this.handleSuVisibleChange}
            visible={this.state.suVisible}
        >                        
            <Input value = {this.state.selectedSuValue} onClick = {this.handleSalesUnitVisibleChange(true)}/>
        </Dropdown>
        )                        
        },
        {

            title: '换算率',
            dataIndex: 'convertRate',
            key: 'convertRate' ,
                    
              },
            
             {
                title: '固定换算',
                dataIndex: 'fixedConvert',
                key: 'fixedConvert' ,  
                render: (text,record,index) => (
                    <Checkbox defaultChecked = {true} onChange={this.onCheckChange}></Checkbox>
                )
            }                
            ] ;          

    componentWillMount() {
        
    }

    componentDidMount() {        
        //let { code,name, memCode,specific,prdtypeId,measureId,price,brandId,attrGroupId,orgId,description,photo,saleUnits } = this.props.dataSource;
       // this.props.form.setFieldsValue(this.props.dataSource);
    }
    
    getProductClass() {
       // this.props.action.getProdClass();
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
       // this.props.action.getMeaUnit(pagination);
    }

    onCheckChange = (e) => {

    }

    handleVisibleChange = (flag) => {
        this.setState({ visible: flag });
    }

    handleMeaVisibleChange = (flag) => {
        this.setState({ meaVisible: flag });
    }

    handleSuVisibleChange = (flag) => {
        this.setState({ suVisible: flag });
    }

    handleSalesUnitVisibleChange = (flag) => {
        this.props.action.showSalesUnit(flag);
    }

    handleBrandVisibleChange = (flag) => {
        this.setState({ brandVisible: flag });
    }

    onSelectChange = (selectedRowkeys) => {

    }

    onMeaRowClick = (record, index) => {
      
        this.setState({selectedMeaValue:record.name});
        this.handleMeaVisibleChange(false);
    }

    onSuRowClick = (record, index) => {
       
        this.setState({selectedSuValue:record.name});
        this.handleSuVisibleChange(false);
        this.handleSalesUnitVisibleChange(true);
    }
   

    onBrandRowClick = (record, index) => {
        this.setState({selectedBrandValue:record.name});
        this.handleBrandVisibleChange(false);
    }

    onSelect = (selectedKeys, info)=> {
        if(info.node.props.children == undefined){
            this.setState({selectedKeys:selectedKeys});
            this.setState({selectedValue:info.node.props.title});
            this.handleVisibleChange(false);
        }        
    }

    onAdd = () => {
        const item = {convertRate:"r",fixedConvert:true};
        this.props.action.addRow(item);
        //this.handleSUVisibleChange(true);
    }

    onOk() {
        this.setState(
            {
                visible: false,
                index: -1
            },
            () => {
                //根据id进行action查询工商详情查询，改变modal1的显示，modal1获取工商详情查询数据
                this.props.customerListInfo({ id: this.state.select });
            }
        );
    }

    onCancel() {
        this.setState({
            visible: false,
            index: -1
        });
    }
    render() {
        
        const { getFieldDecorator } = this.props.form;
        const classRefTree = this.props.$$state.get("classRefTree").toJS().voList;
        const meaRefData = this.props.$$state.get("meaunitRefList").toJS().data;
        const brandRefData = this.props.$$state.get("brandRefList").toJS().data;
        const salesunitTable = this.props.$$state.get("salesunitTable").toJS();

        const salesUnitVisible = this.props.$$state.get("salesUnitVisible");
        let {visible, title, selectedRowkeys,checkedKeys} = this.state;

        const rowSelection = {
            selectedRowkeys,
            onChange: this.onSelectChange,
        };

       
        //const reflist= ()=>{return <div><Table columns = {this.columns} dataSource = {this.dataSource}/></div>};
        const meaRefList = (
            <div> 
                <Table columns = {this.columns} 
                    dataSource = {meaRefData} 
                    style = {{background:"white",height:100}}
                    showHeader={false}
                    onRowClick={this.onMeaRowClick}
                    pagination={false}
                    scroll={{ y: 150 }}
                   // rowSelection={rowSelection}
                   />
            </div>
        );

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
        
        const brandRefList = (
            <div  className = "industry-main"> 
                <Row
                    type="flex"
                    justify="space-between"
                    className="industry-main-header"
                >
                    <div className="title">品牌</div>
                </Row>
                <Row className="industry-main-choice" type="flex">
                <Table columns = {this.columns} 
                    dataSource = {brandRefData} 
                    bordered="true" 
                    style = {{background:"white"}}
                   // showHeader={false}
                    onRowClick={this.onBrandRowClick}
                    //pagination={false}
                    scroll={{ y: 150 }}
                    className="inner"
                   />
                     </Row>
                <Row
                    type="flex"
                    justify="end"
                    align="middle"
                    className="industry-main-footer"
                >
                    <Row type="flex" justify="end" align="middle" gutter={15}>
                        <div>
                            <Button onClick={this.onCancel}>
                                取消
                            </Button>
                        </div>
                        <div>
                            <Button
                                type="primary"
                                onClick={this.onOk}
                            >
                                确定
                            </Button>
                        </div>
                    </Row>
                </Row>
            </div>
        );

        const loop = data => data.map((item) => {
            if (item.children && item.children.length>0) {
              return (
                <TreeNode  key={item.id} title={item.name} disableCheckbox >
                  {loop(item.children)}
                </TreeNode>
              );
            }
            return <TreeNode key={item.id} title={item.name}/>;
        });

        const refTree = (
            <div style={{background : "white"}}>
            <div>
                <Search/>
                </div>
                <div>
                <Tree 
                    onClick = {this.handleTreeClick}
                    //checkable
                    checkStrictly={true}
                    onSelect={this.onSelect}
                    //onCheck={this.onCheck}
                    selectedKeys={this.state.selectedKeys}
                    //checkedKeys={this.state.preCheckedKeys}
                    >
                    {loop(classRefTree)}
                </Tree>
                </div>
            </div>
        );


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
                {getFieldDecorator('specific', {
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
                    <Dropdown overlay={refTree} 
                    trigger="click"
                    onVisibleChange={this.handleVisibleChange}
                    visible={this.state.visible}
                >                        
                    <Search value = {this.state.selectedValue}/>
                </Dropdown>
                
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

                })(<Dropdown overlay={meaRefList} 
                    trigger="click"
                    onVisibleChange={this.handleMeaVisibleChange}
                    visible={this.state.meaVisible}
                >                        
                    <Search value = {this.state.selectedMeaValue}/>
                </Dropdown>
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
                    <Dropdown overlay={brandRefList} 
                    trigger="click"
                    onVisibleChange={this.handleBrandVisibleChange}
                    visible={this.state.brandVisible}
                   
                >                        
                    <Search value = {this.state.selectedBrandValue}/>
                </Dropdown>
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

                })(
                    <Input placeholder='请输入...'/>
                    )}
            </FormItem>
            </Col>
           
            <Col span={12}>
            <FormItem
                label="启用状态"
                labelCol={{ span: 6 }}
                wrapperCol={{ span:13 }}
             //   {...formItemLayout}
            >
                {getFieldDecorator('description', {

                })(
                    <Input placeholder='请输入...'/>
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
                   // action="//jsonplaceholder.typicode.com/posts/"
                   // beforeUpload={beforeUpload}
                   // onChange={this.handleChange}
                  >
                    {
                   //   imageUrl ?
                    //    <img src={imageUrl} alt="" className="avatar" /> :
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

function mapStateToProps(state, ownProps) {
    return{
        $$state: state.product
    }
}

function mapDispatchToProps(dispatch) {
    return {
       action: bindActionCreators(Actions,dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(
    Form.create({
        onFieldsChange(props, fields){           
           // let data = props.$$state.get("formData").toJS();
          
        },
        mapPropsToFields(props){
         
        },
        onValuesChange(_, values){
            //console.log(values);
        },
    })(ProductCard));


