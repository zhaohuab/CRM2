
import React, { Component, PropTypes } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Icon, Tabs, Row, Col } from "antd";
import { phonebooks as url } from "api";
import Tab from './table.jsx';
import Forms from './form.jsx'
import "./index.less";
import * as Actions from "../../action/approved.js";
const TabPane = Tabs.TabPane;

class Appropved extends React.Component {
    constructor(props) {
        super(props);
    }

   
   /*  onClosed = () => {
        this.props.action.approvedClosed();
    } */
    approvedChange = (key) => {
        let flag = key == 1 ? false : true;
        this.props.action.approvedChange(key, flag)
    }
    render() {
       // debugger;
        let { $$state, action } = this.props
        let searchState = $$state.get('searchState');
        let dataSource = $$state.get('dataSource').toJS();
         
        return (
            <div id='approved-wrapper'>    
                <Icon type="close-square" className='closed' onClick={action.approvedClosed}/>
                <Tabs defaultActiveKey="1" onChange={key=>{this.approvedChange(key)}} animated={ false }>
                    <TabPane tab="我提交" key="1" > 
                        <div className="">
                            <Forms />
                            <Tab />
                        </div>
                    </TabPane> 
                    <TabPane tab="我审批" key="2">
                        <div>
                         <Forms />
                            <Tab />
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

export default  connect( mapStateToProps, mapDispatchToProps)(Appropved);
