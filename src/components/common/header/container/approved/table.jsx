
import React, { Component, PropTypes } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Icon, Tabs, Row, Col, Table, Radio } from "antd";
import { phonebooks as url } from "api";
import "./index.less";
import * as Actions from "../../action/approved.js";

class Department extends React.Component {
    constructor(props) {
        super(props);
    }
 
    showTotal(total) {
        return `共 ${total} 条`;
    }
    onPageChange(page, pageSize) {
        let { $$state, action } = this.props;
        let pagination = $$state.get('pagination').toJS();
        pagination = { page: page, pageSize: pageSize };
        let tableState = $$state.get('tableState');
        action.setPagination(pagination);
        switch(tableState) {
            case 1 :
            action.getUnfinished(pagination);
            break;
            case 2 :
            action.getFinished(pagination);
            break;
            case 3 :
            action.getTodo(pagination);
            break;
            case 4 :
            action.getDone(pagination);
            break;
            default:
            action.getUnfinished(pagination);            
        }
    }
    onPageSizeChange(current, pageSize) {
        let { $$state, action } = this.props;
        let pagination = $$state.get('pagination').toJS();
        pagination = { page: pagination.page, pageSize: pageSize };
        let tableState = $$state.get('tableState');
        action.setPagination(pagination);
        switch(tableState) {
            case 1 :
            action.getUnfinished(pagination);
            break;
            case 2 :
            action.getFinished(pagination);
            break;
            case 3 :
            action.getTodo(pagination);
            break;
            case 4 :
            action.getDone(pagination);
            break;
            default:
            action.getUnfinished(pagination);            
        }
    }

    getUnfinishedData = () => {//未完成列表
    //debugger;
        let unfinishedData = this.props.$$state.get('unfinishedData').toJS();
        let operate = {
            title:'操作',
            dataIndex:'operate',
            render:(text,record,index)=>{ <span style={{cursor:'pointer'}}>提醒</span> }
        }  
        if (unfinishedData&&unfinishedData.length) {
            unfinishedData.titlelist.unshift(operate);
            return  unfinishedData;
        }  
    }

    getFinishedData = () => {//完成列表
         return this.props.$$state.get('finishedData').toJS();        
    }
    
    getTodoData = () => {//待办列表
    //debugger;
        let todoData = this.props.$$state.get('todoData').toJS();
          let operate = {
            title:'操作',
            dataIndex:'operate',
            render:(text,record,index)=>{ <span style={{cursor:'pointer'}}>同意</span> }
        }
        if (todoData&&todoData.length){
            todoData.titlelist.unshift(operate);
            return todoData;
        }  
        
    }

    getDoneData = () => {//已办列表
         return this.props.$$state.get('doneData').toJS();        
    }

    getTable = () => {//获取对应列表
    //debugger;
        let tableState = this.props.$$state.get('tableState');
        switch(tableState){
            case 1:
                return this.getUnfinishedData();
            case 2:
                return this.getFinishedData();
            case 3:
                return this.getTodoData();
            case 4:
                return this.getDoneData();
            default:
                return this.getUnfinishedData(); 
        }
    } 

    render() {
        //debugger;
        let { $$state, action } = this.props;
        let searchState = $$state.get('searchState');
        let dataSource = $$state.get('dataSource').toJS();
        let myState = $$state.get("myState"); 
        
        return (
            <div>
                <Table
                  size="middle"
                  columns={this.getTable.call(this)?this.getTable.call(this).titlelist:[]}
                  dataSource={this.getTable.call(this)?this.getTable.call(this).datalist:[]}
                  rowKey="id"
                  pagination={{
                    size: "large",
                    showSizeChanger: true,
                    showQuickJumper: true,
                    total: 20,
                    showTotal: this.showTotal,
                    onChange: this.onPageChange.bind(this),
                    onShowSizeChange: this.onPageSizeChange.bind(this)
                  }}
                />
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


/* 
rowSelection={rowSelection}
 */