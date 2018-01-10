
import React, { Component, PropTypes } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Input, Modal, Tree, Icon, Tabs, Avatar, Row, Col } from "antd";
import { phonebooks as url } from "api/zhb";
import reqwest from "utils/reqwest";
const TreeNode = Tree.TreeNode;
const Search = Input.Search;
const TabPane = Tabs.TabPane;
import "./index.less";
import * as Actions from "../../action"
class Department extends React.Component {
    constructor(props) {
        super(props);
    }

    phoneBookClosed = () => {//关闭通讯录
        this.props.action.phoneBookClosed();
        this.props.action.searchStateChange(false);
    }

    renderTreeNodes = data => {//组织结构
        return data.map(item => {
            if (item.orgChildren && item.orgChildren.length) {
                return (
                    <TreeNode title={item.name} key={item.id} dataRef={item}>
                        {this.renderTreeNodes(item.orgChildren)}
                        {
                            item.userChildren && item.userChildren.length?
                            <TreeNode title={item.name} key={item.id} dataRef={item}>
                                {this.getDepartment(item.userChildren)}
                            </TreeNode>:''
                        }
                    </TreeNode>
                );
            }
            return <TreeNode title={item.name} key={item.id} dataRef={item} />
        });
    };

    onSearch = (e) => {//查询
    //debugger;
        let str=e.target.value;
        if (str){
            let data = {};
            data.searchKey = str;
            this.props.action.searchStateChange(true);
            this.props.action.searchData(url.search, data)
        }else{
            this.props.action.searchStateChange(false);
        }
    }

    searList = (data) => {//查询结果展示
        return (
            <div>
                <div>
                    {data.orgList&&data.orgList.length?
                    this.orgList(data.orgList):''}
                </div>
                <div>
                    {data.userList&&data.userList.length?
                    this.getDepartment(data.userList):''}
                </div>
            </div>
        )
    }

    orgList = (data) => {//部门列表展示
        return (
            data.map(item=>(
                <div style={{marginBottom:'10px'}}><Icon type="down-square" style={{marginRight:'10px'}}/>{item.name}</div>
            ))         
        )
    }

    getDepartment= (data,flag) => {//人员信息平铺列表
        return data.map(item => (
            <Row gutter={16} type='flex' align='middle' style={{marginBottom:'10px', borderBottom:'1px solid rgb(230,230,230)'}}>
                <Col span={4}> <Icon type="usergroup-delete" /></Col>
                <Col span={16}>   
                    <p>{item.name}</p>
                    <p><span style={{marginRight:'10px'}}>电话</span>{item.phone}</p>
                    <p><span style={{marginRight:'10px'}}>email</span>{item.email}</p>
                </Col>
                <Col span={4}><Icon type="aliwangwang-o" /></Col>              
            </Row>
        ))
    }
 
    render() {
        let searchState = this.props.$$state.get('searchState');
        let searchData = this.props.$$state.get('searchData').toJS();
        let department = this.props.$$state.get('department').toJS();
        let dataSource = this.props.$$state.get('dataSource').toJS();
        return (
            <div className='wrapper-phonebooks'>               
                    <div className='phonebooks' style={{margin:0}}>
                        <Row type='flex' align='middle' gutter={16} style={{padding:'10px 0',margin:'-10px -10px 5px ', backgroundColor:'rgb(245,245,245)'}}>
                            <Col span={6} style={{fontSize:'14px'}}>通讯录</Col>  
                            <Col span={16}>
                                <Input addonAfter={<Icon type="search" />} placeholder='请输入关键字' onChange={this.onSearch.bind(this)}/>
                            </Col>
                            <Col span={2}>
                                <Icon type="close"  onClick={this.phoneBookClosed} style={{fontSize:'18px',cursor:'pointer'}} /> 
                            </Col>                           
                        </Row> 
                        {
                            searchState ?
                            <div>
                                {this.searList.call(this,searchData)}
                            </div> 
                            :
                            <Tabs defaultActiveKey="1" onChange={()=>console.log('Tabs')} animated={ false }>
                                <TabPane tab="部门" key="1"> 
                                    <div className="demo-infinite-container">
                                        <Tree onSelect={this.onSelect}  checkable>
                                            {this.renderTreeNodes(department)}
                                        </Tree>
                                    </div>
                                </TabPane> 
                                <TabPane tab="组织结构" key="2">
                                    <div className="add-inset-modal tree-icon" id="tree-icon">
                                        <Tree onSelect={this.onSelect} showLine={true}>
                                            {this.renderTreeNodes(dataSource)}
                                        </Tree>
                                    </div>
                                </TabPane>
                            </Tabs>
                        }
                      
                    </div>           
            </div>
        );
    }
}


function mapStateToProps(state, ownProps) {
  return {
    $$state: state.header
  }
}

function mapDispatchToProps(dispatch) {
  return {
      action: bindActionCreators(Actions, dispatch)
  }
}

export default  connect( mapStateToProps, mapDispatchToProps)(Department);
