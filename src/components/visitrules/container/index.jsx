import React from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {Table, Button, Popconfirm, Input, Icon, Form, Modal} from 'antd'
import Card from './VisitRulesForm.jsx';
import HeadLabel from './HeadLabel.jsx';

import './index.less';
import * as Actions from '../action'
import 'assets/stylesheet/all/iconfont.css'

let Search = Input.Search;
const ButtonGroup = Button.Group;

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
            keys:[],
            listLen:{},
        },      
        
        this.columns = [
            {
                title: '',
                dataIndex: 'code',
                key: 'code',
                render:(text, record, index) =>{
                    return <span>{index+1}</span>
                }         
            },{
                title: '拜访规则名称',
                dataIndex: 'name',
                key: 'name'           
            },
            {
                title: '适用公司',
                dataIndex: 'orgName',
                key: 'orgName'  
            },{
                title: '参考指标',
                dataIndex: 'refIndexName',
                key: 'refIndexName'  
            },{
                title: '客户等级',
                dataIndex: 'cumEnumValueName',
                key: 'cumEnumValueName'  
            },{
                title: '启用状态',
                dataIndex: 'enableStateName',
                key: 'enableStateName'  
            }
        ] 
        this.cardColumns = [
            {
                title: '任务卡',
                dataIndex: 'task',
                key: 'code'           
            }, 
            {
                title: '显示顺序',
                dataIndex: 'genderName',
                render: ()=><Input placeholder="01"/>
            },
            {
                title: '是否必输',
                dataIndex: 'orgName',
                render: (text, record, index) => <Input value={text} onChange={(e) => this.handleChange(e, index, 'orgName').bind(this)}></Input>
            },
        ]
    }

    componentDidMount() {
        let { pagination,searchMap } = this.state;
        this.props.action.getListData({ pagination,searchMap });
    }

    handleVisitCardChange(visitCardData) {
       this.props.action.handleCardDataChange(visitCardData);
    }

    onAdd() {
        this.setState({isEdit:false});
        this.props.action.finish(false);
        this.props.action.setKeys([1]);
        this.props.action.showForm(true,{orgId:1087,refIndex:1,orgName:'湛江粤海包装材料有限公司',refIndexName:'客户等级'});
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
        let rowKey = this.state.selectedRowKeys[0];//只能编辑第一条选中数据
        let rowData = {};
        let page = this.props.$$state.get("data").toJS();
        for(let i=0,len=page.data.length;i<len;i++) {
            if(rowKey == page.data[i].id) {
                rowData = page.data[i];
                break;
            }
        }
        let cardLen = rowData.taskcardList.length; 
        let {keys} = this.state;
        for(let i =0; i<cardLen+1; i++){
           keys[i] = i+1;
        }
    
        this.setState({keys:keys});
        this.props.action.showForm(true,rowData);
        this.props.action.finish(false);

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
        let data = form.getFieldsValue();
       
        if(this.state.isEdit) {     
           
          this.props.action.onSave4Edit(data);
        } else {
       
          this.props.action.onSave4Add(data);
        }
        this.props.action.finish(true);
        this.props.action.setKeys(1);
    }

    onSelectChange(selectedRowKeys){
        let state = {
            selectedRowKeys:selectedRowKeys
        }
        state.headLabel = selectedRowKeys.length ? true:false;
        this.setState( state );
    }

    saveSelectedCardData(selectedCardData) {
        this.props.action.onSaveSelectedCard(selectedCardData);
    }
    showTotal(total) {
        return `共 ${total} 条`;
    }
    
    render(){
       
        let page = this.props.$$state.get('data').toJS();
        let visible = this.props.$$state.get('visible');
        let {headLabel,selectedRowKeys} = this.state;
        let rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange.bind(this),
        };

        let editData = this.props.$$state.get('editData').toJS();
        const WrapCard = Form.create()(Card);       
        let selecteddata = this.props.$$state.get('selectedVisitData').toJS();
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
                <Modal title="新建/编辑" visible={visible} onOk={this.onSave.bind(this)} onCancel={this.onClose.bind(this)} width={500}>
                    <div className='model-height'>
                        <WrapCard dataSource={editData} wrappedComponentRef={(inst) => this.formRef = inst} isEdit={this.state.isEdit} keys ={this.state.keys} listLen = {this.state.listLen} />
                    </div>                   
                </Modal>
            </div>
        )
    }
}

function mapStateToProps(state, ownProps) {
    return{
        $$state: state.visitRules
    }
}

function mapDispatchToProps(dispatch) {
    return {
       action: bindActionCreators(Actions,dispatch)
    }
}

export default connect( mapStateToProps, mapDispatchToProps)(List);