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
const FormItem = Form.Item;
class CloseClue extends React.Component{
    handleOk=()=>{

    }
    handleCancel=()=>{
    
    }

    render() {
        let {colseVisible}=this.props.$$state.toJS();
        return (
          <div>
            <Modal title="线索关闭"
              visible={colseVisible}
              onOk={this.handleOk}
              onCancel={this.handleCancel}
            >
        
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