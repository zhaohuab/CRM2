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
import Industry from "../../../common/industry";
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
            wrapperCol: { span: 24 }
        };
        const { getFieldDecorator } = this.props.form;
        let {
            enumData,
        } = this.props.$$state.toJS();
        return (
            <div>
                <Row className="leadForm-input-recover">
                    <Row>
                        <Form>
                            <Row type="flex" justify="center">
                                <Col span={11}>
                                    <FormItem style={{ display: "none" }}>
                                        {getFieldDecorator("id", {})(<Input />)}
                                    </FormItem>
                                    <FormItem style={{ display: "none" }}>
                                        {getFieldDecorator("state", {})(<Input />)}
                                    </FormItem>
                                    <FormItem
                                        label="主题"
                                        {...formItemLayout}
                                    >
                                        {getFieldDecorator("title", {
                                            rules: [
                                                {
                                                    required: true,
                                                    message: "请输入主题"
                                                }
                                            ]
                                        })(<Input placeholder="请输入" />)}
                                    </FormItem>
                                </Col>
                                <Col span={11}>
                                    {" "}
                                    <FormItem label="联系人" {...formItemLayout}>
                                        {getFieldDecorator("name", {

                                        })(<Input placeholder="请输入" />)}
                                    </FormItem>
                                </Col>
                            </Row>
                            <Row type="flex" justify="center">
                                <Col span={11}>
                                    <FormItem label="职务" {...formItemLayout}>
                                        {getFieldDecorator("post")(
                                            <Enum
                                                addOptionAll={"职务"}
                                                dataSource={enumData.post}

                                            />
                                        )}
                                    </FormItem>
                                </Col>
                                <Col span={11}>
                                    <FormItem label="手机" {...formItemLayout}>
                                        {getFieldDecorator("mobile", {

                                        })(<Input placeholder="请输入" />)}
                                    </FormItem>
                                </Col>
                            </Row>
                            <Row type="flex" justify="center">
                                <Col span={11}>
                                    <FormItem label="公司名称" {...formItemLayout}>
                                        {getFieldDecorator("companyName", {})
                                            (<Input placeholder="请输入..." />)}
                                    </FormItem>
                                </Col>
                                <Col span={11}>
                                    <FormItem label="客户规模" {...formItemLayout}>
                                        {getFieldDecorator("cumSize", {
                                            rules: [
                                                {
                                                    required: true,
                                                    message: "请输入客户规模"
                                                }
                                            ]
                                        })(
                                            <Enum
                                                addOptionAll={"客户规模"}
                                                dataSource={enumData.cumSize}

                                            />
                                            )}
                                    </FormItem>
                                </Col>
                            </Row>
                            <Row type="flex" justify="center">
                                <Col span={11}>
                                    <FormItem label="线索来源" {...formItemLayout}>
                                        {getFieldDecorator("source", {
                                            rules: [
                                                {
                                                    required: true,
                                                    message: "请输入线索来源"
                                                }
                                            ]
                                        })(<Enum
                                            addOptionAll={"线索来源"}
                                            dataSource={enumData.source}
                                        />)}
                                    </FormItem>
                                </Col>
                                <Col span={11}>
                                    <FormItem label="行业" {...formItemLayout}>
                                        {getFieldDecorator("industryId"
                                        , {
                                            rules: [
                                                {
                                                    required: true,
                                                    message: "请输入行业"
                                                }
                                            ]
                                        })(
                                            <Industry />
                                        )}
                                    </FormItem>
                                </Col>

                            </Row>
                            <Row type="flex" justify="center">
                                <Col span={11}>
                                    <FormItem label="QQ" {...formItemLayout}>
                                        {getFieldDecorator("qq")(
                                            <Input placeholder="请输入..." />
                                        )}
                                    </FormItem>
                                </Col>
                                <Col span={11}>
                                    <FormItem label="微信" {...formItemLayout}>
                                        {getFieldDecorator("wechat", {

                                        })(<Input placeholder="请输入..." />)}
                                    </FormItem>
                                </Col>
                            </Row>
                            <Row type="flex" justify="center">
                                <Col span={11}>
                                    <FormItem label="固定电话" {...formItemLayout}>
                                        {getFieldDecorator("tel")(
                                            <Input placeholder="请输入..." />
                                        )}
                                    </FormItem>
                                </Col>
                                <Col span={11}>
                                    <FormItem label="电子邮件" {...formItemLayout}>
                                        {getFieldDecorator("email", {

                                        })(<Input placeholder="请输入..." />)}
                                    </FormItem>
                                </Col>
                            </Row>
                            <Row type="flex" justify="center">
                                <Col span={11} pull={5} style={{ marginRight: "34px" }}>
                                    <FormItem label="网址" {...formItemLayout}>
                                        {getFieldDecorator("website", {

                                        })(<Input placeholder="请输入..." />)}
                                    </FormItem>
                                </Col>
                            </Row>
                            <Row type="flex" justify="center">

                                <Col span={22} >
                                    <Row type="flex">
                                        <Col span={3} style={{ marginLeft: "13px" }}>
                                            <Row
                                                type="flex"
                                                justify="end"
                                            >
                                                <div>备注：</div>
                                            </Row>
                                        </Col>
                                        <Col span={20} className='remarks' style={{ width: '85%' }}>
                                            <FormItem
                                            >
                                                {getFieldDecorator(
                                                    "remarks",
                                                    {}
                                                )(
                                                    <TextArea
                                                        autosize={{
                                                            minRows: 3,
                                                            maxRows: 8
                                                        }}
                                                        placeholder="请输入"
                                                        style={{ width: '100%' }}
                                                    />
                                                    )}
                                            </FormItem>
                                        </Col>
                                    </Row>
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
        //把redux中的值取出来赋给表单
        debugger
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

            }
        }
        props.action.editCardFn(viewData);
    }
})(EditForm);

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
export default connect(mapStateToProps, mapDispatchToProps)(CardForm);
