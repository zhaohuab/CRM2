
import React, { Component, PropTypes } from "react";
import { connect } from "react-redux";
import { Modal, Button, Input, Form } from 'antd';
import { bindActionCreators } from "redux";
import * as Actions from "../../action/approved.js";
const { TextArea } = Input;
const FormItem = Form.Item;
class MentionModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            val: '' //输入框的值 
        }
    }
    change = (e) => {
        e.preventDefault();
        let val = e.target.value;
        this.setState({ val }, () => {
            console.log(111, val)
        });
    }
    onCancel = () => {
        this.props.action.mentionVisibleClose(false)
        this.setState({val:''})
     
    }


    //确定根据动作类型发请求
    onOk = () => {
    //     debugger
    //     let {showAction,pagination}=this.props.$$state.toJS();
    //     let current = this.props.$$state.get('currentRecord').toJS();
    //     let val=this.state.val
    //     this.props.onValChange(val)
    //     this.props.action.mentionVisibleClose(false);
    //     this.props.action.allButtons(current.djId, current.djType, current.taskId, current.instanceId, val, showAction);
    //     this.props.action.getTodo(pagination);
    //    this.props.action.hideViewForm(false);
    //     this.setState({val:''})
    }

    render() {
        let { mentionVisible } = this.props.$$state.toJS();
        return (
            <div>
                {/* <Button type="primary" onClick={this.showModal}>Modal</Button> */}
                <Modal
                    title={this.props.show?'同意':'驳回'}
                    visible={mentionVisible}
                    onOk={this.onOk}
                    onCancel={this.onCancel}
                    okText="确认"
                    cancelText="取消"
                >
                    <div>请输入{this.props.show?'同意':'驳回'}的理由(非必填项)：</div>

                    <TextArea
                        value={this.state.val}
                        onChange={this.change}
                        rows={4} />
                </Modal>
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

export default connect(mapStateToProps, mapDispatchToProps)(MentionModal);
