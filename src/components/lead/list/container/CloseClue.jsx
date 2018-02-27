import React, { Component, PropTypes } from "react";
import {
    Icon,
    Button,
    Dropdown,
    Menu,
    Collapse,
    Input,
    Row,
    Col,
    Table,
    Modal,
    Form,
} from "antd";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as Actions from "../action";
import CloseLeadCard from './CloseLeadCard';

//const FormItem = Form.Item;
class CloseClue extends React.Component{
   
    handleCancel=()=>{
        this.props.action.closeLeadShow(false);
    }
    handleOk=()=>{
        debugger
        let card = this.formRef.props.form;
        let value = card.getFieldsValue();
        // this.setState({
        //   taskGroupVisible: false,
        // }, () => {
        //   this.props.action.onAddTaskGroup(value);
        // });
    }
    render() {
        debugger
        let {colseVisible}=this.props.$$state.toJS();
        const CloseLeadForm = Form.create({})(CloseLeadCard);
        return (
          <div>
            <Modal title="线索关闭"
              visible={colseVisible}
              onOk={this.handleOk}
              onCancel={this.handleCancel}
            >
           <CloseLeadForm
            wrappedComponentRef={inst =>
                                (this.formRef = inst)}
           />
        
            </Modal>
          </div>
        );
      }


}
//绑定状态到组件props
function mapStateToProps(state, ownProps) {
    return {
        $$state: state.lead
    };
}
//绑定action到组件props
function mapDispatchToProps(dispatch) {
    return {
        action: bindActionCreators(Actions, dispatch)
    };
}
//输出绑定state和action后组件
export default connect(mapStateToProps, mapDispatchToProps)(CloseClue);