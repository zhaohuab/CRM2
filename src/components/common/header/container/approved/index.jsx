
import React, { Component, PropTypes } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Icon, Tabs, Row, Col } from "antd";
import { phonebooks as url } from "api";
import Tab from './table.jsx'
import "./index.less";
import * as Actions from "../../action/approved.js";
const TabPane = Tabs.TabPane;

class Department extends React.Component {
    constructor(props) {
        super(props);
    }

    pClosed = () => {//关闭通讯录
        this.props.action.phoneBookClosed();
        this.props.action.searchStateChange(false);
    }
   /*  onClosed = () => {
        this.props.action.approvedClosed();
    } */
 
    render() {
        let { $$state, action } = this.props
        let searchState = $$state.get('searchState');
        let dataSource = $$state.get('dataSource').toJS();
        return (
            <div id='approved-wrapper'>    
                <Icon type="close-square" className='closed' onClick={action.approvedClosed}/>
                <Tabs defaultActiveKey="1" onChange={()=>console.log('Tabs')} animated={ false }>
                    <TabPane tab="我提交" key="1"> 
                        <div className="">
                           <Tab/>
                        </div>
                    </TabPane> 
                    <TabPane tab="我审批" key="2">
                        <div>
                         <Tab/>
                        </div>
                    </TabPane>
                </Tabs>         
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
