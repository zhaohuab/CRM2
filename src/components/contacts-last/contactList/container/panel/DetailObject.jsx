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
import * as Actions from "../../action";

import UploadImg from "../list/UploadImg";

class DetailObject extends React.Component {
    render(){
        let {viewData} = this.props.$$state.toJS();
        return(
                <Collapse
                    defaultActiveKey={["1"]}
                >
                    <Panel key="1" header ='联系人信息' >
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
                                            部门:
                                        </span>
                                    </Col>
                                    <Col
                                        span={16}
                                        className="custom-info-content"
                                    >
                                        <span>
                                            {
                                                viewData.biztypeName
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
                                            手机:
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
                                            办公电话:
                                        </span>
                                    </Col>
                                    <Col
                                        span={16}
                                        className="custom-info-content"
                                    >
                                        <span>
                                            {
                                                viewData.cannelTypeName
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
                                            邮箱:
                                        </span>
                                    </Col>
                                    <Col
                                        span={16}
                                        className="custom-info-content"
                                    >
                                        <span>
                                            {
                                                viewData.stateName
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
                                            爱好:
                                        </span>
                                    </Col>
                                    <Col
                                        span={16}
                                        className="custom-info-content"
                                    >
                                        <span>
                                            {
                                                viewData.stateName
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
                                            备注:
                                        </span>
                                    </Col>
                                    <Col
                                        span={16}
                                        className="custom-info-content"
                                    >
                                        <span>
                                            {
                                                viewData.stateName
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
        $$state: state.contacts,
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


