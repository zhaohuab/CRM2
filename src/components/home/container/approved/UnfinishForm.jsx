
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Form, Input, Table, Row, Col, Radio} from 'antd';
import './index.less';
import 'assets/stylesheet/all/iconfont.css';
import * as Actions from "../../action/approval.js";
import { queryDataIndex } from 'echarts/lib/util/model';

const FormItem = Form.Item;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

class Child extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        // ;
        let { $$state } = this.props;
        let myState = $$state.get('myState');
        let { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: { span: 7},
            wrapperCol: { span: 11 }
        };
        const formItemLayout1 = {
            labelCol: { span: 2},
            wrapperCol: { span: 22 }
        };
        return (
            <div >
                <Row>
                    <Form className="detailForm">
                        <Row type="flex" justify="center" gutter={5}>
                            <Col span={8}>
                                <FormItem label="申请时间"  {...formItemLayout}>
                                    {getFieldDecorator('approvalTime'
                                    )(
                                        <Input placeholder="请输入"   disabled/>
                                        )}
                                </FormItem>

                            </Col>
                            <Col span={8}>
                                <FormItem label="申请人"  {...formItemLayout}>
                                    {getFieldDecorator('applyUserName'
                                    )(
                                        <Input placeholder="请输入"  disabled />
                                        )}
                                </FormItem>
                            </Col>
                            <Col span={8}>
                                <FormItem label="申请公司"  {...formItemLayout}>
                                    {getFieldDecorator('orgName'
                                    )(
                                        <Input placeholder="请输入" disabled />
                                        )}
                                </FormItem>
                            </Col>
                        </Row>
                        <Row type="flex" justify="center" gutter={5}>
                            <Col span={8}>
                                <FormItem label="申请部门" {...formItemLayout}>
                                    {getFieldDecorator('deptName'
                                    )(
                                        <Input placeholder="请输入" disabled />
                                        )}
                                </FormItem>
                            </Col>
                            <Col span={8}>
                                <FormItem label="客户名称" {...formItemLayout}>
                                    {getFieldDecorator('cumName'
                                    )(
                                        <Input placeholder="请输入" disabled />
                                        )}
                                </FormItem>
                            </Col>
                            <Col span={8}>
                                <FormItem label="客户全称" {...formItemLayout}>
                                    {getFieldDecorator('cumFullname'
                                    )(
                                        <Input placeholder="请输入" disabled />
                                        )}
                                </FormItem>
                            </Col>
                        </Row>
                        <Row type="flex" justify="center" gutter={5}>
                            <Col span={8}>
                                <FormItem label="审批状态" {...formItemLayout}>
                                    {getFieldDecorator('approvalStateName'
                                    )(
                                        <Input placeholder="请输入" disabled />
                                        )}
                                </FormItem>
                            </Col>
                            <Col span={8} >
                                <FormItem label="最后审批人" {...formItemLayout}>
                                    {getFieldDecorator('approvalUserName'
                                    )(
                                        <Input placeholder="请输入" disabled />
                                        )}
                                </FormItem>
                            </Col>
                            <Col span={8} className="lastPreson" >
                                <FormItem label="最后审批时间" {...formItemLayout}>
                                    {getFieldDecorator('approvalTime'
                                    )(
                                        <Input placeholder="请输入" disabled />
                                        )}
                                </FormItem>
                            </Col>
                        </Row>
                        <Row type="flex" justify="center" gutter={5}>
                            <Col span={24}>
                                <FormItem label="备注" {...formItemLayout1}>
                                    {getFieldDecorator('time'
                                    )(
                                        <Input disabled/>
                                        )}
                                </FormItem>
                            </Col>
                           
                        </Row>
                        <Row type="flex" justify="center" gutter={5}>
                            <Col span={24}>
                                <FormItem label="审批意见" {...formItemLayout1}>
                                    {getFieldDecorator('time'
                                    )(
                                        <Input  disabled />
                                        )}
                                </FormItem>
                            </Col>
                           
                        </Row>
                    </Form>
                </Row>
            </div>
        )
    }
}

const WrapedCard = Form.create({

    mapPropsToFields: (props) => {
        //把redux中的值取出来赋给表单
        // 
        let viewData = props.$$state.toJS().detailData;
        let value = {};
        // 
        for (let key in viewData) {
            value[key] = { value: viewData[key] };
        }
        // 把字段合成对象
        return {
            ...value
        };

    },
    onFieldsChange: (props, onChangeFild) => {
        // 
        //往redux中写值
        let viewData = props.$$state.toJS().detailData;

        //往redux中写值//把值进行更新改变
        for (let key in onChangeFild) {
            if (onChangeFild[key].value && onChangeFild[key].value.key) {
                viewData[key] = onChangeFild[key].value.key;
            } else {
                viewData[key] = onChangeFild[key].value;
            }
        }
        props.action.saveDetailData(detailData);
    }
})(Child)

function mapStateToProps(state, ownProps) {
    return {
        $$state: state.approval
    }
}

function mapDispatchToProps(dispatch) {
    return {
        action: bindActionCreators(Actions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(WrapedCard);













































