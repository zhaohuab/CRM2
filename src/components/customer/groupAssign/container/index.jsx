import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as Actions from "../action";

import "./index.less";
import "assets/stylesheet/all/iconfont.css";

import LessForm from './LessForm'
import MoreForm from './MoreForm'
import HeaderButton from "../../../common/headerButtons/headerButtons.jsx";
import GroupAssign from './GroupAssign'
import GroupTakeBack from './GroupTakeBack'

import {
    Select,
    Input,
    Form,
    Table,
    Modal,
    Button,
    Icon,
    Row,
    Col,
    Tabs,
    Menu,
    Dropdown
} from "antd";
const Option = Select.Option;

class GroupAssignList extends React.Component {
    constructor(props){
        super(props);
        this.state={
            searchVisiable:false
        }
        
       this.moreMenu = (
        <Menu>
          <Menu.Item key="1">导入</Menu.Item>
          <Menu.Item key="2">导出</Menu.Item>
        </Menu>
      );
      this.columns = [
        {
            title: "客户名称",
            dataIndex: "name",
        },
        {
            title: "销售公司",
            dataIndex: "org",
            render: (text, record, index) =>{
                let company=[]
                record.salesVOs.forEach((item)=>{
                    company.push(item.def1)
                })
                return(
                    <span>{company.join(',')}</span>
                )
            },
        },   
        {
            title: "客户类型",
            dataIndex: "typeName"
        },
        {
            title: "客户等级",
            dataIndex: "levelName"
        },
        {
            title: "客户状态",
            dataIndex: "stateName"
        },
        {
            title: "行业",
            dataIndex: "industryName",
        },
        {
            title: "渠道类型",
            dataIndex: "cannelTypeName"
        },
        {
            title: "地址",
            dataIndex: "address"
        }
    ];
    }
    //过滤查询条件中的值
    mapFilter(searchMap){
        
        for(let key in searchMap){
            if(key=='cannelType' && searchMap[key] || key=='level' && searchMap[key]|| key=='type'&& searchMap[key]){
                searchMap[key] = searchMap[key].key
            }
            if(key == 'industry'&& searchMap[key] || key=='org' && searchMap[key]){
                searchMap[key] = searchMap[key].id
            }
            if(key == 'province_city_district'&& searchMap[key]){
                searchMap[key] = searchMap[key].result.join('_')
            }
        }
        
        return searchMap
    }

    //两个查询表单输入存值
    formRedux(value){
        this.props.action.saveSearchMap(value)
    }

    //头部表单查询，每次查询时都把whitchSearch变为当前查询方案
    searchMapForm(){
        
        let { searchMap,pagination} = this.props.$$state.toJS();
        searchMap = this.mapFilter(searchMap)
        this.props.action.searchMapSearch(pagination,searchMap)
    }

    //查询方案查询，每次查询时都把whitchSearch变为当前查询方案
    searchPlan(value){
        
        //找出查询方案中选中的那一项数据
        let { preSearchPlan,pagination} = this.props.$$state.toJS();
        let searchPlan = {}
        searchPlan = preSearchPlan.find((item)=>{
            
            if(item.id == value){
                return item
            }
        })
        
        this.props.action.saveSearchPlan(pagination,{planId:searchPlan.id,planClass:searchPlan.defClass})
    }

    //改变头部查询显隐
    changeSearchVisiable(){
        this.setState({
            searchVisiable:!this.state.searchVisiable
        })
    }

    //选择table每一项存储当前项客户信息，及key值
    onSelectChange(selectedRowKeys, selectedRows){
        console.log(selectedRowKeys, selectedRows)
        this.props.action.saveTableKeys(selectedRowKeys)
    }

    //头部按钮区关闭
    headerBtnsClose(){
        this.props.action.saveTableKeys([])
    }

    //进入页面请求列表、查询方案数据
    componentDidMount(){
        
        let {pagination} = this.props.$$state.toJS()
        //获取列表数据
        this.props.action.getList(pagination)
        //获取查询条件初始条件
        this.props.action.getSearchList()
    }

    //展现table总数量
    showTotal(total) {
        return `共 ${total} 条`;
    }

    //点击分页时触发的方法，点击时要把当前查询条件带过去
    onPageChange(page, pageSize){
        
        let {pagination,searchMap,searchPlan,whitchSearch} = this.props.$$state.toJS();

        pagination.page = page;
        pagination.pageSize = pageSize;

        if(whitchSearch == 'searchPlan'){
            
            this.props.action.getList(pagination,{searchPlan})
        }else if(whitchSearch == 'searchMap'){
            
            this.props.action.getList(pagination,{searchMap})
        }else{
            
            this.props.action.getList(pagination,{})
        }
    }
    
    //分页跳页面查询
    onPageJump(current, pageSize){
        
    }

    render(){
        let {selectedRowKeys,data,preSearchPlan} = this.props.$$state.toJS()
        this.rowSelection={
            selectedRowKeys,
            onChange: this.onSelectChange.bind(this)
        }
    
        return(
            <div className='assignment-container'>
                {
                    selectedRowKeys && selectedRowKeys.length?
                    <HeaderButton
                        goBack={this.headerBtnsClose.bind(this)}
                        length={selectedRowKeys.length}
                    >
                        <GroupAssign headerBtnsClose = {this.headerBtnsClose.bind(this)}/> 
                        <GroupTakeBack headerBtnsClose = {this.headerBtnsClose.bind(this)}/>
                    </HeaderButton>:
                    <div className='container-header'>
                        <Row className='container-header-show' type='flex' justify='space-between'>
                            <Col span={20}>
                            <Row type='flex' align='middle' gutter={15} style={{height:'54px'}}>
                                <Col className="select-recover">
                                    <Select defaultValue="全部" onChange={this.searchPlan.bind(this)}>
                                        {
                                            preSearchPlan && preSearchPlan.length?preSearchPlan.map((item,index)=>{
                                                return(
                                                    <Option value={item.id}>
                                                        {item.name}
                                                    </Option>
                                                )
                                            }):''
                                        }
                                    </Select>
                                </Col>
                                {
                                    this.state.searchVisiable?"":
                                    <Col span={20} >
                                       <LessForm formRedux={this.formRedux.bind(this)} visiable={this.changeSearchVisiable.bind(this)} searchForm={this.searchMapForm.bind(this)}/>
                                    </Col>
                                }
                            </Row>
                            </Col>
                            <Col span={4}>
                                <Row type='flex' align='middle' justify='end' className='top-more'>
                                    <Dropdown.Button overlay={this.moreMenu}>
                                        更多
                                    </Dropdown.Button>
                                </Row>
                            </Col> 
                        </Row>
                        {
                            this.state.searchVisiable?
                            <div className='container-header-hide'>
                                <div className='inner'>
                                    <MoreForm  formRedux={this.formRedux.bind(this)} visiable={this.changeSearchVisiable.bind(this)} searchForm={this.searchMapForm.bind(this)}/>
                                </div>
                            </div>:''
                        }
                    </div>
                }
                <Row className='tabel-recoverd'>
                    <Table
                        columns={this.columns}
                        dataSource={data.data}
                        rowKey="id"
                        rowSelection={this.rowSelection}
                        size="middle"
                        pagination={{
                            size: "large",
                            showSizeChanger: true,
                            showQuickJumper: true,
                            total: data.total,
                            showTotal: this.showTotal,
                            onChange: this.onPageChange.bind(this),
                            onShowSizeChange: this.onPageJump.bind(
                                this
                            )
                        }}
                    />
                </Row>
            </div>
        )
    }
}

function mapStateToProps(state, ownProps) {
    return {
        $$state: state.cusGroupAssignReducers
    };
}
//绑定action到组件props
function mapDispatchToProps(dispatch) {
    return {
        action: bindActionCreators(Actions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(GroupAssignList);