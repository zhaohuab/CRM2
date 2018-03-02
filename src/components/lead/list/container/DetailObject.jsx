import {
    Select,
    Input,
    Form,
    Table,
    Modal,
    Button,
    Icon,
    Row,
    Col,
    Tabs,
    Collapse
} from "antd";

const TabPane = Tabs.TabPane;
const Panel = Collapse.Panel;

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as Actions from "../action";

class DetailObject extends React.Component {
    render() {
        debugger
        let { editData } = this.props.$$state.toJS();
        let viewData = editData;
        return (
            <Collapse
                defaultActiveKey={["1", "2"]}
            >
                <Panel key="1" header="&nbsp;基本信息">
                    <Row className="custom-info">
                        <Col span={12}>
                            <Row
                                type="flex"
                                gutter={10}
                                align="middle"
                            >
                                <Col
                                    span={8}
                                    className="custom-info-title"
                                >
                                    <span>
                                        主题:
                                        </span>
                                </Col>
                                <Col
                                    span={16}
                                    className="custom-info-content"
                                >
                                    <span>
                                        {
                                            viewData.title
                                        }
                                    </span>
                                </Col>
                            </Row>
                        </Col>
                        <Col span={12}>
                            <Row
                                type="flex"
                                gutter={10}
                                align="middle"
                            >
                                <Col
                                    span={8}
                                    className="custom-info-title"
                                >
                                    <span>
                                        联系人:
                                        </span>
                                </Col>
                                <Col
                                    span={16}
                                    className="custom-info-content"
                                >
                                    <span>
                                        {
                                            viewData.name
                                        }
                                    </span>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                    <Row className="custom-info">
                        <Col span={12}>
                            <Row
                                type="flex"
                                gutter={10}
                                align="middle"
                            >
                                <Col
                                    span={8}
                                    className="custom-info-title"
                                >
                                    <span>
                                        职务:
                                        </span>
                                </Col>
                                <Col
                                    span={16}
                                    className="custom-info-content"
                                >
                                    <span>
                                        {
                                            viewData.postName
                                        }
                                    </span>
                                </Col>
                            </Row>
                        </Col>
                        <Col span={12}>
                            <Row
                                type="flex"
                                gutter={10}
                                align="middle"
                            >
                                <Col
                                    span={8}
                                    className="custom-info-title"
                                >
                                    <span>
                                        手机:
                                        </span>
                                </Col>
                                <Col
                                    span={16}
                                    className="custom-info-content"
                                >
                                    <span>
                                        {
                                            viewData.mobile
                                        }
                                    </span>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                    {/* <Row className="custom-info">
                            <Col span={12}>
                                <Row
                                    type="flex"
                                    gutter={10}
                                    align="middle"
                                >
                                    <Col
                                        span={8}
                                        className="custom-info-title"
                                    >
                                        <span>
                                           行业:
                                        </span>
                                    </Col>
                                    <Col
                                        span={16}
                                        className="custom-info-content"
                                    >
                                        <span>
                                            {
                                                viewData.industryName
                                            }
                                        </span>
                                    </Col>
                                </Row>
                            </Col>
                            <Col span={12}>
                                <Row
                                    type="flex"
                                    gutter={10}
                                    align="middle"
                                >
                                    <Col
                                        span={8}
                                        className="custom-info-title"
                                    >
                                        <span>
                                           线索等级:
                                        </span>
                                    </Col>
                                    <Col
                                        span={16}
                                        className="custom-info-content"
                                    >
                                        <span>
                                            {
                                                viewData.levelName
                                            }
                                        </span>
                                    </Col>
                                </Row>
                            </Col>
                        </Row> */}
                </Panel>
                <Panel key="2" header="&nbsp;详细信息">
                    <Row className="custom-info">
                        <Col span={12}>
                            <Row
                                type="flex"
                                gutter={10}
                                align="middle"
                            >
                                <Col
                                    span={8}
                                    className="custom-info-title"
                                >
                                    <span>
                                        公司名称:
                                        </span>
                                </Col>
                                <Col
                                    span={16}
                                    className="custom-info-content"
                                >
                                    <span>
                                        {
                                            viewData.companyName
                                        }
                                    </span>
                                </Col>
                            </Row>
                        </Col>
                        <Col span={12}>
                            <Row
                                type="flex"
                                gutter={10}
                                align="middle"
                            >
                                <Col
                                    span={8}
                                    className="custom-info-title"
                                >
                                    <span>
                                        客户规模:
                                        </span>
                                </Col>
                                <Col
                                    span={16}
                                    className="custom-info-content"
                                >
                                    <span>
                                        {
                                            viewData.cumSizeNum
                                        }
                                    </span>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                    <Row className="custom-info">
                        <Col span={12}>
                            <Row
                                type="flex"
                                gutter={10}
                                align="middle"
                            >
                                <Col
                                    span={8}
                                    className="custom-info-title"
                                >
                                    <span>
                                        线索来源:
                                        </span>
                                </Col>
                                <Col
                                    span={16}
                                    className="custom-info-content"
                                >
                                    <span>
                                        {
                                            viewData.sourceName
                                        }
                                    </span>
                                </Col>
                            </Row>
                        </Col>
                        <Col span={12}>
                            <Row
                                type="flex"
                                gutter={10}
                                align="middle"
                            >
                                <Col
                                    span={8}
                                    className="custom-info-title"
                                >
                                    <span>
                                        行业:
                                        </span>
                                </Col>
                                <Col
                                    span={16}
                                    className="custom-info-content"
                                >
                                    <span>
                                        {
                                            viewData.industryName
                                        }
                                    </span>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                    <Row className="custom-info">
                        <Col span={12}>
                            <Row
                                type="flex"
                                gutter={10}
                                align="middle"
                            >
                                <Col
                                    span={8}
                                    className="custom-info-title"
                                >
                                    <span>
                                        QQ:
                                        </span>
                                </Col>
                                <Col
                                    span={16}
                                    className="custom-info-content"
                                >
                                    <span>
                                        {
                                            viewData.qq
                                        }
                                    </span>
                                </Col>
                            </Row>
                        </Col>
                        <Col span={12}>
                            <Row
                                type="flex"
                                gutter={10}
                                align="middle"
                            >
                                <Col
                                    span={8}
                                    className="custom-info-title"
                                >
                                    <span>
                                        微信:
                                        </span>
                                </Col>
                                <Col
                                    span={16}
                                    className="custom-info-content"
                                >
                                    <span>
                                        {
                                            viewData.wechat
                                        }
                                    </span>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                    <Row className="custom-info">
                        <Col span={12}>
                            <Row
                                type="flex"
                                gutter={10}
                                align="middle"
                            >
                                <Col
                                    span={8}
                                    className="custom-info-title"
                                >
                                    <span>
                                        固定电话:
                                        </span>
                                </Col>
                                <Col
                                    span={16}
                                    className="custom-info-content"
                                >
                                    <span>
                                        {
                                            viewData.tel
                                        }
                                    </span>
                                </Col>
                            </Row>
                        </Col>
                        <Col span={12}>
                            <Row
                                type="flex"
                                gutter={10}
                                align="middle"
                            >
                                <Col
                                    span={8}
                                    className="custom-info-title"
                                >
                                    <span>
                                        电子邮件:
                                        </span>
                                </Col>
                                <Col
                                    span={16}
                                    className="custom-info-content"
                                >
                                    <span>
                                        {
                                            viewData.email
                                        }
                                    </span>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                    <Row className="custom-info">
                        <Col span={12}>
                            <Row
                                type="flex"
                                gutter={10}
                                align="middle"
                            >
                                <Col
                                    span={8}
                                    className="custom-info-title"
                                >
                                    <span>
                                        网址：
                                        </span>
                                </Col>
                                <Col
                                    span={16}
                                    className="custom-info-content"
                                >
                                    <span>
                                        {
                                            viewData.website
                                        }
                                    </span>
                                </Col>
                            </Row>
                        </Col>
                        <Col span={12}>
                            <Row
                                type="flex"
                                gutter={10}
                                align="middle"
                            >
                                <Col
                                    span={8}
                                    className="custom-info-title"
                                >
                                    <span>
                                        职务:
                                        </span>
                                </Col>
                                <Col
                                    span={16}
                                    className="custom-info-content"
                                >
                                    <span>
                                        {
                                            viewData.postName
                                        }
                                    </span>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                    <Row className="custom-info">
                        <Col span={12}>
                            <Row
                                type="flex"
                                gutter={10}
                                align="middle"
                            >
                                <Col
                                    span={8}
                                    className="custom-info-title"
                                >
                                    <span>
                                        负责人:
                                        </span>
                                </Col>
                                <Col
                                    span={16}
                                    className="custom-info-content"
                                >
                                    <span>
                                        {
                                            viewData.ownerUserName ? viewData.ownerUserName: ''
                                        }
                                    </span>
                                </Col>
                            </Row>
                        </Col>
                        <Col span={12}>
                            <Row
                                type="flex"
                                gutter={10}
                                align="middle"
                            >
                                <Col
                                    span={8}
                                    className="custom-info-title"
                                >
                                    <span>
                                        部门:
                                        </span>
                                </Col>
                                <Col
                                    span={16}
                                    className="custom-info-content"
                                >
                                    <span>
                                        {
                                            viewData.ownerDeptName ? viewData.ownerDeptName : ''
                                        }
                                    </span>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                    <Row className="custom-info">
                        <Col span={12}>
                            <Row
                                type="flex"
                                gutter={10}
                                align="middle"
                            >
                                <Col
                                    span={8}
                                    className="custom-info-title"
                                >
                                    <span>
                                        创建人:
                                    </span>
                                </Col>
                                <Col
                                    span={16}
                                    className="custom-info-content"
                                >
                                    <span>
                                        {
                                          viewData.ownerUserName ? viewData.ownerUserName: ''
                                        }
                                    </span>
                                </Col>
                            </Row>
                        </Col>
                        <Col span={12}>
                            <Row
                                type="flex"
                                gutter={10}
                                align="middle"
                            >
                                <Col
                                    span={8}
                                    className="custom-info-title"
                                >
                                    <span>
                                        创建时间:
                                    </span>
                                </Col>
                                <Col
                                    span={16}
                                    className="custom-info-content"
                                >
                                    <span>
                                        {
                                           viewData.createdTime ? viewData.createdTime : ''
                                        }
                                    </span>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                    <Row className="custom-info">
                        <Col span={12}>
                            <Row
                                type="flex"
                                gutter={10}
                                align="middle"
                            >
                                <Col
                                    span={8}
                                    className="custom-info-title"
                                >
                                    <span>
                                        分派时间:
                                        </span>
                                </Col>
                                <Col
                                    span={16}
                                    className="custom-info-content"
                                >
                                    <span>
                                        {
                                          viewData. assignTime? viewData. assignTime : ''
                                        }
                                    </span>
                                </Col>
                            </Row>
                        </Col>
                        <Col span={12}>
                            <Row
                                type="flex"
                                gutter={10}
                                align="middle"
                            >
                                <Col
                                    span={8}
                                    className="custom-info-title"
                                >
                                    <span>
                                        修改时间:
                                        </span>
                                </Col>
                                <Col
                                    span={16}
                                    className="custom-info-content"
                                >
                                    <span>
                                        {
                                            viewData.modifiedTime ? viewData.modifiedTime : ''
                                        }
                                    </span>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                    <Row className="custom-info">
                        <Col span={12}>
                            <Row
                                type="flex"
                                gutter={10}
                                align="middle"
                            >
                                <Col
                                    span={8}
                                    className="custom-info-title"
                                >
                                    <span>
                                        反馈结果:
                                        </span>
                                </Col>
                                <Col
                                    span={16}
                                    className="custom-info-content"
                                >
                                    <span>
                                        {
                                            viewData.feedback ? viewData.feedback : ''
                                        }
                                    </span>
                                </Col>
                            </Row>
                        </Col>
                        <Col span={12}>
                            <Row
                                type="flex"
                                gutter={10}
                                align="middle"
                            >
                                <Col
                                    span={8}
                                    className="custom-info-title"
                                >
                                    <span>
                                        描述:
                                        </span>
                                </Col>
                                <Col
                                    span={16}
                                    className="custom-info-content"
                                >
                                    <span>
                                        {
                                            viewData.remarks? viewData.remarks: ''
                                        }
                                    </span>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Panel>

            </Collapse>
        )
    }
}

function mapStateToProps(state, ownProps) {
    return {
        $$state: state.lead,
    };
}
//绑定action到组件props
function mapDispatchToProps(dispatch) {
    return {
        action: bindActionCreators(Actions, dispatch)
    };
}
//输出绑定state和action后组件
export default connect(mapStateToProps, mapDispatchToProps)(DetailObject);


