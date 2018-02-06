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
    Radio
} from "antd";
const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const { TextArea } = Input;

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as Actions from "../action";
import Enum from "utils/components/enums";

class EditForm extends React.Component {
    componentDidMount() {

    }

    render() {
        const { getFieldDecorator } = this.props.form;
         let formItemLayout = {
            labelCol: { span: 3 },
            wrapperCol: { span: 17 }
        };
        let {  
            enumData,
        } = this.props.$$state.toJS();
        return (
            <div>
                <Row className="leadForm-input-recover">
                    <Row>
                        <Form>
                            <Row type="flex" justify="center">
                                <Col span={20}>
                                    <FormItem style={{ display: "none" }}>
                                        {getFieldDecorator("id", {})(<Input />)}
                                    </FormItem>
                                    <FormItem
                                        label="职位"
                                        {...formItemLayout}
                                    >
                                        {getFieldDecorator("jobName", {
                        
                                        })(
                                        
                                            <Enum
                                            addOptionAll={
                                                "职位"
                                            }
                                            dataSource={
                                                enumData
                                            }
                                        />              
                                        )}
                                    </FormItem>
                                </Col>
                            </Row>
                            <Row  type="flex" justify="center">
                            <Col span={20}>
                                    {" "}
                                    <FormItem label="痛点" {...formItemLayout}>
                                        {getFieldDecorator("saleTalk", {

                                        })(<TextArea rows={4}
                                         placeholder="请输入" />)}
                                    </FormItem>
                                </Col>
                            </Row>
                        </Form>
                    </Row>
                </Row>
            </div>
        );
    }
}

const CardForm = Form.create({
    mapPropsToFields: (props) => {
        // //把redux中的值取出来赋给表单
        // //debugger
        let viewData = props.$$state.toJS().editData;

        let value = {};
        //debugger
        for (let key in viewData) {

            value[key] = { value: viewData[key] };

        }
        //  把字段合成对象
        return {
            ...value
        };

    },

    onFieldsChange: (props, onChangeFild) => {
        debugger
        //往redux中写值
        let viewData = props.$$state.toJS().editData;

        //往redux中写值//把值进行更新改变
        for (let key in onChangeFild) {
            if (onChangeFild[key].value && onChangeFild[key].value.key) {
                viewData[key] = onChangeFild[key].value.key;
            } else {
               
                    viewData[key] = onChangeFild[key].value;
                //把对像拆成字段  
            }
        }
        props.action.editCardFn(viewData);
    }
})(EditForm);

//绑定状态到组件props
function mapStateToProps(state, ownProps) {
    return {
        $$state: state.speech
    };
}
//绑定action到组件props
function mapDispatchToProps(dispatch) {
    return {
        action: bindActionCreators(Actions, dispatch)
    };
}
//输出绑定state和action后组件
export default connect(mapStateToProps, mapDispatchToProps)(CardForm);
