import React from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {Table, Button, Popconfirm, Input, Radio, Icon, Form, Modal} from 'antd'
import Card from './ProductForm.jsx';
import HeadLabel from './HeadLabel.jsx';
import Department from 'components/refs/departments'
import './index.less';

import * as Actions from '../action'

let Search = Input.Search;
let RadioGroup = Radio.Group;
const ButtonGroup = Button.Group;
import 'assets/stylesheet/all/iconfont.css'

class List extends React.Component{
    constructor(props){
        super(props)
        this.state = {   
            headLabel : false,
            selectedRowKeys : [],
            isEdit : false,
            enable : 1,
            pagination : {
              pageSize:10,
              page:1,
            },
            searchMap : {
              enableState:1,
            },
            originCode:{},//产品修改前的code,用于编辑功能
        },      
        

    this.columns = [
        {
            title: '编码',
            dataIndex: 'code',
            key: 'code'           
        },{
            title: '名称',
            dataIndex: 'name',
            key: 'name'           
        },
        {
            title: '助记码',
            dataIndex: 'memCode',
            key: 'memCode'           
        },
        {
            title: '规格',
            dataIndex: 'spec',
            key: 'spec'           
        },{
            title: '产品分类',
            dataIndex: 'prdtypeName',
            key: 'prdtypeName'  
        },{
            title: '主单位',
            dataIndex:'measureName',
            key: 'measureName',             
        },{
            title: '品牌',
            dataIndex: 'brandId',
            key: 'brandId'  
        },{
            title: '参考售价',
            dataIndex: 'price',
            key: 'price'  
        },{
            title: '适用组织',
            dataIndex: 'orgName',
            key: 'orgName'  
        },{
            title: '属性组',
            dataIndex: 'attrGroupName',
            key: 'attrGroupName'  
        },{
            title: '启用状态',
            dataIndex: 'enableStateName',
            key: 'enableStateName'  
        },{
            title: '产品描述',
            dataIndex: 'description',
            key: 'description'  
        }]
    }
    componentDidMount() {
        let { pagination,searchMap } = this.state;
        this.props.action.getListData({ pagination,searchMap });
    }

    onAdd() {
        this.setState({isEdit:false});
        this.props.action.showForm(true,{});
    }
    onBack = ()=>{
        this.setState({headLabel:false});
    }

    onClose(){
        this.props.action.showForm(false,{});
    }

    onDelete = () => {
        let { pagination,searchMap } = this.state;
        
        this.props.action.onDelete(this.state.selectedRowKeys,{ pagination,searchMap });
        this.setState({headLabel:false,selectedRowKeys:[]});
    }

    onEdit = () => {
        this.setState({isEdit:true});
        console.info(this.state.selectedRowKeys);
        let rowKey = this.state.selectedRowKeys[0];
        let rowData = {};
        let page = this.props.$$state.get("data").toJS();
        for(let i=0,len=page.data.length;i<len;i++) {
          if(rowKey == page.data[i].id) {
            rowData = page.data[i];
            break;
          }
        }      
        this.props.action.showForm(true,rowData);
    }

    onEnable(enable) {
        return (enable) => {
          let { pagination,searchMap } = this.state;
          this.setState({headLabel:false});
          this.props.action.onEnable(this.state.selectedRowKeys,enable,{ pagination,searchMap });
        }
    }

    onEableRadioChange = (e) => {
        let enable = e.target.value;
        let { pagination,searchMap } = this.state;
        searchMap.enableState = enable;
        this.props.action.getListData({ pagination,searchMap });
        this.setState({enable,selectedRowKeys:[],searchMap});
    }

    onPageChange(page,pageSize) {
        let { pagination,searchMap } = this.state;
        pagination = {page:page,pageSize:pageSize};
        this.setState({pagination})
        this.props.action.getListData({ pagination,searchMap });
    }

    onPageSizeChange(current,pageSize) {
        let { pagination,searchMap } = this.state;
        pagination = {page:pagination.page,pageSize:pageSize};
        this.setState({pagination})
        this.props.action.getListData({ pagination,searchMap });
        console.info(`pageSize:${pageSize}`)
    }
    onSave(){
        let form = this.formRef.props.form;
        form.validateFieldsAndScroll((err, values) => {
          if (!err) {
            console.log('Received values of form: ', values);
          }
        });
        if(this.state.isEdit) {         
          this.props.action.onSave4Edit(form.getFieldsValue());
        } else {
          this.props.action.onSave4Add(form.getFieldsValue());
        }
    }
    onSelectChange(selectedRowKeys){
        let state = {
            selectedRowKeys:selectedRowKeys
        }
        state.headLabel = selectedRowKeys.length ? true:false;
        this.setState( state );
    }
    showTotal(total) {
        return `共 ${total} 条`;
    }
    
    render(){
        let page = this.props.$$state.get("data").toJS();
        let visible = this.props.$$state.get("visible");
        let {headLabel,selectedRowKeys} = this.state;
        
        let rowSelection = {
          selectedRowKeys,
          onChange: this.onSelectChange.bind(this),
        };
        let editData = this.props.$$state.get("editData").toJS();
        const WrapCard = Form.create()(Card);
        return(
            <div className='user-warpper'>  
                {
                    headLabel ? 
                    <div className='head_edit'>
                        <HeadLabel selectedRowKeys={selectedRowKeys} onBack={this.onBack}>
                            <Button className="default_button" onClick={this.onEdit}><i className='iconfont icon-bianji'></i>编辑</Button>
                            <Popconfirm placement="bottom"  title="确认删除吗" onConfirm={this.onDelete} okText="是" cancelText="否">
                                <Button className="default_button" ><i className='iconfont icon-shanchu'></i>删除</Button>
                            </Popconfirm>
              
                            {this.state.enable==1 ? <Button className="default_button" onClick={this.onEnable(2).bind(this,2)}><i className='iconfont icon-tingyong'></i>停用</Button>:
                            <Button className="default_button" onClick={this.onEnable(1).bind(this,1)}><i className='iconfont icon-qiyong-lanse'></i>启用</Button>}
                            <Button className="default_button"><i className='iconfont icon-fenpeijiaose'></i>分配角色</Button>
                        </HeadLabel> 
                    </div>: 
                    <div className='head_panel'>
                        <div className='head_panel-left'>
                            <div>
                                <span className='deep-title-color'>适用组织：</span>
                                <Input
                                    placeholder="请选择..."
                                    className="search"
                                    onSearch={value => console.log(value)}
                                />
                            </div>
                            <div>
                                <span className='deep-title-color'>商品分类：</span>
                                <Input
                                    placeholder="请选择..."
                                    className="search"
                                    onSearch={value => console.log(value)}
                                 />
                            </div>
                            <div>
                                <span className='deep-title-color'>关键字：</span>
                                <Input
                                    placeholder="请选择..."
                                    className="search"
                                    onSearch={value => console.log(value)}
                                />
                            </div>
                            <div className='head_panel-state'>
                                <span className='simple-title-color'>状态：</span>
                                <RadioGroup  onChange={this.onEableRadioChange} value={this.state.enable} className='simple-title-color'>
                                    <Radio value={1}>启用</Radio>
                                    <Radio value={2}>停用</Radio>
                                </RadioGroup>
                            </div>
                        </div>
                        <div className='head_panel-right'>
                            <ButtonGroup className='add-more'>
                                <Button><i className='iconfont icon-daochu'></i>导入</Button>
                                <Button><i className='iconfont icon-daoru'></i>导出</Button>
                            </ButtonGroup>
                            <Button  type="primary" className="button_add" onClick={this.onAdd.bind(this)}> <Icon type="plus" />新增</Button>
                        </div>
                    </div>   
                }       
                <div className = 'list-box'>
                    <Table  size="middle" rowSelection={rowSelection} dataSource={page.data} rowKey="id" columns = {this.columns}
                    pagination={{size:"large",showSizeChanger:true,showQuickJumper:true,total:page.total,showTotal:this.showTotal,onChange:this.onPageChange.bind(this),onShowSizeChange:this.onPageSizeChange.bind(this)}}/>
                </div>
                <Modal title="新增/编辑 产品" visible={visible} onOk={this.onSave.bind(this)} onCancel={this.onClose.bind(this)} width={800}>
                    <div className='model-height'>
                        <WrapCard dataSource={editData} wrappedComponentRef={(inst) => this.formRef = inst}/>
                    </div>
                </Modal>
            </div>
        )
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

export default connect( mapStateToProps, mapDispatchToProps)(List);