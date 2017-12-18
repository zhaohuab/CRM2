
import React, { Component, PropTypes } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Icon, Tabs, Row, Col, Table, Radio } from "antd";
import { phonebooks as url } from "api";
import "./index.less";
import * as Actions from "../../action/approved.js";

const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

class Department extends React.Component {
    constructor(props) {
        super(props);
    }
 
    render() {
        let { $$state, action } = this.props;
        let searchState = $$state.get('searchState');
        let dataSource = $$state.get('dataSource').toJS();
        return (
            <div>
                <span>时间范围：</span>                                  
                <RadioGroup defaultValue="a" size="large">
                    <RadioButton value="a">Hangzhou</RadioButton>
                    <RadioButton value="b">Shanghai</RadioButton>
                    <RadioButton value="c">Beijing</RadioButton>
                    <RadioButton value="d">Chengdu</RadioButton>
                </RadioGroup>
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
