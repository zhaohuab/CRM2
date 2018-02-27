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
import Email from "utils/components/emails";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as Actions from "../action";
import Enum from "utils/components/enums";
import * as enumDataFake from "./enumdata.jsx";
//省市县
import CityChioce from "./CityChioce";
class EditForm extends React.Component {
    componentDidMount() {
       
    }


    render() {
        let formItemLayout = {
            labelCol: { span: 7 },
            wrapperCol: { span: 14 }
        };
        let formItemLayout1 = {
            labelCol: { span: 5 },
            wrapperCol: { span:24 }
        };
        
        const { getFieldDecorator } = this.props.form;
      
        return (
            <div>
              <Form>
              <Row type="flex" justify="center">
                  <Col span={11}>
                      <FormItem label="关闭原因" {...formItemLayout}>
                          {getFieldDecorator("mobile")(
                              <Input placeholder="请输入..." />
                          )}
                      </FormItem>
                  </Col>
               
              </Row>
              <Row type="flex" justify="center">
                  <Col span={11}>
                      <FormItem
                          label="备注说明"
                          {...formItemLayout}
                          //hasFeedback={true}
                      >
                          {getFieldDecorator(
                              "remarks"
                          )(
                              <Input
                                  placeholder="请输入..."
                                  type="textarea"
                                  rows={3}
                              />
                          )}
                      </FormItem>
                  </Col>  
              </Row>
          </Form>
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
export default connect(mapStateToProps, mapDispatchToProps)(EditForm);
