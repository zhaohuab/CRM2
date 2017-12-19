
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
        let { pagination } = this.props.$$state.get('pagination');
        //可能有问题
        /* pagination = { page: page, pageSize: pageSize };
        this.setState({ pagination }); */
        this.props.action.getListData({ pagination });
    }
    onPageSizeChange(current, pageSize) {
        let { pagination, searchMap } = this.state;
        pagination = { page: pagination.page, pageSize: pageSize };
        this.setState({ pagination });
        this.props.action.getListData({ pagination, searchMap });
    }
    
    getData = (key) => {//变换页码时获取对应列表
        let { action } = this.props;
        switch(key){
            case 1:
            action.getUnfinished()
        }
    }

    getTable = () => {//获取对应列表
        debugger;
        let { $$state } = this.props;
        let { unfinishedData, finishedData, todoData, doneData, tableState } = $$state;
        switch(tableState){
            case 1:
                return unfinishedData;
            case 2:
                return finishedData;
            case 3:
                return finishedData;
            case 4:
                return finishedData;
            default:
                return unfinishedData; 
        }
    }

    render() {
        let { $$state, action } = this.props;
        let searchState = $$state.get('searchState');
        let dataSource = $$state.get('dataSource').toJS();
        let myState = $$state.get("myState"); 
        return (
            <div>
                <Table
                  size="middle"
                  columns={this.getTable.call(this).titlelist}
                  dataSource={this.getTable.call(this).datalist}
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