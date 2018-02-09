
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Form, Input, Table, Row, Col, Radio,Tooltip} from 'antd';
import './index.less';
import 'assets/stylesheet/all/iconfont.css';
import * as Actions from "../../action/approval.js";
import { queryDataIndex } from 'echarts/lib/util/model';

const FormItem = Form.Item;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
const { TextArea } = Input;
class Unfinish extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        let { detailData } = this.props.$$state.toJS();
        return (
            <div >
                <Row className="detailApproval-info">
                    <Col span={8}>
                        <Row
                            type="flex"
                            gutter={10}
                            align="middle"
                        >
                            <Col
                                span={8}
                                className="detailApproval-info-title"
                            >
                                <span>
                                    申请时间:
                                 </span>
                            </Col>
                            <Col
                                span={16}
                                className="detailApproval-info-content"
                            >
                                <span>
                                    {
                                        detailData.commitTime
                                    }
                                </span>
                            </Col>
                        </Row>
                    </Col>
                    <Col span={8}>
                        <Row
                            type="flex"
                            gutter={10}
                            align="middle"
                        >
                            <Col
                                span={8}
                                className="detailApproval-info-title"
                            >
                                <span>
                                    申请人:
                               </span>
                            </Col>
                            <Col
                                span={16}
                                className="detailApproval-info-content"
                            >
                                <span>
                                    {
                                        detailData.applyUserName
                                    }
                                </span>
                            </Col>
                        </Row>
                    </Col>
                    <Col span={8}>
                        <Row
                            type="flex"
                            gutter={10}
                            align="middle"
                        >
                            <Col
                                span={8}
                                className="detailApproval-info-title"
                            >
                                <span>
                                    申请公司:
                               </span>
                            </Col>
                            <Col
                                span={16}
                                className="detailApproval-info-content"
                            >
                                <span>
                                    {
                                        detailData.orgName
                                    }
                                </span>
                            </Col>
                        </Row>
                    </Col>
                </Row>
                <Row className="detailApproval-info">
                    <Col span={8}>
                        <Row
                            type="flex"
                            gutter={10}
                            align="middle"
                        >
                            <Col
                                span={8}
                                className="detailApproval-info-title"
                            >
                                <span>
                                    申请部门:
                                 </span>
                            </Col>
                            <Col
                                span={16}
                                className="detailApproval-info-content"
                            >
                                <span>
                                    {
                                        detailData.deptName
                                    }
                                </span>
                            </Col>
                        </Row>
                    </Col>
                    <Col span={8}>
                        <Row
                            type="flex"
                            gutter={10}
                            align="middle"
                        >
                            <Col
                                span={8}
                                className="detailApproval-info-title"
                            >
                                <span>
                                    客户名称:
                               </span>
                            </Col>
                            <Col
                                span={16}
                                className="detailApproval-info-content"
                            >

                                <Tooltip placement="bottomLeft" title={ detailData.cumName}>
                                    <span>
                                        {
                                            detailData.cumName
                                        }
                                    </span>
                                </Tooltip>
                            </Col>
                        </Row>
                    </Col>
                    <Col span={8}>
                        <Row
                            type="flex"
                            gutter={10}
                            align="middle"
                        >
                            <Col
                                span={8}
                                className="detailApproval-info-title"
                            >
                                <span>
                                    客户全称:
                               </span>
                            </Col>
                            <Col
                                span={16}
                                className="detailApproval-info-content"
                            >

                                <span>
                                    {
                                        detailData.cumFullname
                                    }
                                </span>
                            </Col>
                        </Row>
                    </Col>
                </Row>
                <Row className="detailApproval-info">
                    <Col span={8}>
                        <Row
                            type="flex"
                            gutter={10}
                            align="middle"
                        >
                            <Col
                                span={8}
                                className="detailApproval-info-title"
                            >
                                <span>
                                    审批状态:
                                 </span>
                            </Col>
                            <Col
                                span={16}
                                className="detailApproval-info-content"
                            >
                                <span>
                                    {
                                        detailData.approvalStateName
                                    }
                                </span>
                            </Col>
                        </Row>
                    </Col>
                    <Col span={8}>
                        <Row
                            type="flex"
                            gutter={10}
                            align="middle"
                        >
                            <Col
                                span={8}
                                className="detailApproval-info-title"
                            >
                                <span>
                                    最后审批人:
                               </span>
                            </Col>
                            <Col
                                span={16}
                                className="detailApproval-info-content"
                            >
                                <span>
                                    {
                                        detailData.approvalUserName
                                    }
                                </span>
                            </Col>
                        </Row>
                    </Col>
                    <Col span={8}>
                        <Row
                            type="flex"
                            gutter={10}
                            align="middle"
                        >
                            <Col
                                span={8}
                                className="detailApproval-info-title"
                            >
                                <span>
                                    最后审批时间:
                               </span>
                            </Col>
                            <Col
                                span={16}
                                className="detailApproval-info-content"
                            >
                                <span>
                                    {
                                        detailData.approvalTime
                                    }
                                </span>
                            </Col>
                        </Row>
                    </Col>
                </Row>

                <Row className="detailApproval-info">
                    <Col span={8}>
                        <Row
                            type="flex"
                            gutter={10}
                            align="middle"
                        >
                            <Col
                                span={8}
                                className="detailApproval-info-title"
                            >
                                <span>
                                    备注:
                                 </span>
                            </Col>
                            <Col
                                span={16}
                                className="detailApproval-info-content"
                            >
                                <span>
                                    {
                                        detailData.description
                                    }
                                </span>
                            </Col>
                        </Row>
                    </Col>

                </Row>
                <Row className="detailApproval-info">
                    <Col span={8}>
                        <Row
                            type="flex"
                            gutter={10}
                            align="middle"
                        >
                            <Col
                                span={8}
                                className="detailApproval-info-title"
                            >
                                <span>
                                    审批意见:
                                 </span>
                            </Col>
                            <Col
                                span={16}
                                className="detailApproval-info-content"
                            >
                                <span>
                                    {
                                        detailData.approvalComment
                                    }
                                </span>
                            </Col>
                        </Row>
                    </Col>

                </Row>


                {/* <Row>
                    <Form className="detailForm">
                        <Row type="flex" justify="center" gutter={5}>
                            <Col span={8}>
                                <FormItem label="申请时间"  {...formItemLayout}>
                                    {getFieldDecorator('commitTime'
                                    )(
                                        <Input disabled />
                                        )}
                                </FormItem>

                            </Col>
                            <Col span={8}>
                                <FormItem label="申请人"  {...formItemLayout}>
                                    {getFieldDecorator('applyUserName'
                                    )(
                                        <Input disabled />
                                        )}
                                </FormItem>
                            </Col>
                            <Col span={8}>
                                <FormItem label="申请公司"  {...formItemLayout}>
                                    {getFieldDecorator('orgName'
                                    )(
                                        <Input disabled />
                                        )}
                                </FormItem>
                            </Col>
                        </Row>
                        <Row type="flex" justify="center" gutter={5} >
                            <Col span={8}>
                                <FormItem label="申请部门" {...formItemLayout}>
                                    {getFieldDecorator('deptName'
                                    )(
                                        <Input disabled />
                                        )}
                                </FormItem>
                            </Col>
                            <Col span={8}>
                                <FormItem label="客户名称" {...formItemLayout}>
                                    {getFieldDecorator('cumName'
                                    )(
                                        <Input disabled />
                                        )}
                                </FormItem>
                            </Col>
                            <Col span={8}>
                                <FormItem label="客户全称" {...formItemLayout}>
                                    {getFieldDecorator('cumFullname'
                                    )(
                                        <Input disabled />
                                        )}
                                </FormItem>
                            </Col>
                        </Row>
                        <Row type="flex" justify="center" gutter={5}>
                            <Col span={8}>
                                <FormItem label="审批状态" {...formItemLayout}>
                                    {getFieldDecorator('approvalStateName'
                                    )(
                                        <Input disabled />
                                        )}
                                </FormItem>
                            </Col>
                            <Col span={8} >
                                <FormItem label="最后审批人" {...formItemLayout}>
                                    {getFieldDecorator('approvalUserName'
                                    )(
                                        <Input disabled />
                                        )}
                                </FormItem>
                            </Col>
                            <Col span={8} className="lastPreson" >
                                <FormItem label="最后审批时间" {...formItemLayout}>
                                    {getFieldDecorator('approvalTime'
                                    )(

                                        <Input disabled />
                                        )}
                                </FormItem>
                            </Col>
                        </Row>
                        <Row type="flex" justify="center" gutter={5}>
                            <Col span={24}>
                                <FormItem label="备注" {...formItemLayout1}>
                                    {getFieldDecorator('description'
                                    )(
                                        <Input disabled />
                                        )}
                                </FormItem>
                            </Col>

                        </Row>
                        <Row type="flex" justify="center" gutter={5}>
                            <Col span={24}>
                                <FormItem label="审批意见" {...formItemLayout1}>
                                    {getFieldDecorator('approvalComment',
                                        // {initialValue:comment}
                                    )(
                                        <Input disabled />
                                        )}
                                </FormItem>
                            </Col>

                        </Row>
                    </Form>
                </Row> */}
            </div>
        )
    }
}

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

export default connect(mapStateToProps, mapDispatchToProps)(Unfinish);













































