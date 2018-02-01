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
        let salesVOs = viewData.salesVOs||[];//-----详情下的公司部分
        debugger;
        return(
                <Collapse
                    defaultActiveKey={["1", "2", "3"]}
                >
                    <Panel key="1" header ='客户信息' >
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
                                            客户类型:
                                        </span>
                                    </Col>
                                    <Col
                                        span={16}
                                        className="custom-info-content"
                                    >
                                        <span>
                                            {
                                                viewData.typeName
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
                                            渠道类型:
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
                    </Panel>
                    <Panel key="2" header="&nbsp;" header='联系方式'>
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
                                            电话:
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
                                            邮箱:
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
                                            营业额(万元):
                                        </span>
                                    </Col>
                                    <Col
                                        span={16}
                                        className="custom-info-content"
                                    >
                                        <span>
                                            {
                                                viewData.turnover
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
                                            员工数:
                                        </span>
                                    </Col>
                                    <Col
                                        span={16}
                                        className="custom-info-content"
                                    >
                                        <span>
                                            {
                                                viewData.employeeNum
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
                                                viewData.remark
                                            }
                                        </span>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </Panel>
                    <Panel key="3" header="&nbsp;" header='客户身份'>
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
                                            客户全称:
                                        </span>
                                    </Col>
                                    <Col
                                        span={16}
                                        className="custom-info-content"
                                    >
                                        <span>
                                            {
                                                viewData.fullname
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
                                            注册资本:
                                        </span>
                                    </Col>
                                    <Col
                                        span={16}
                                        className="custom-info-content"
                                    >
                                        <span>
                                            {
                                                viewData.regCapital
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
                                    style={{
                                        height: "55px"
                                    }}
                                >
                                    <Col
                                        span={8}
                                        className="custom-info-title"
                                    >
                                        <span>
                                            法定代表人:
                                        </span>
                                    </Col>
                                    <Col
                                        span={16}
                                        className="custom-info-content"
                                    >
                                        <span>
                                            {
                                                viewData.legalRepresent
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
                                            纳税人识别号:
                                        </span>
                                    </Col>
                                    <Col
                                        span={12}
                                        className="custom-info-content"
                                    >
                                        <span>
                                            {
                                                viewData.taxpayerNo
                                            }
                                        </span>
                                    </Col>
                                    <Col span={4}>
                                        <UploadImg/>
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
                                            工商注册号:
                                        </span>
                                    </Col>
                                    <Col
                                        span={12}
                                        className="custom-info-content"
                                    >
                                        <span>
                                            {
                                                viewData.bizRegno
                                            }
                                        </span>
                                    </Col>
                                    <Col span={4}>
                                        <UploadImg/>
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
                                            组织机构代码:
                                        </span>
                                    </Col>
                                    <Col
                                        span={12}
                                        className="custom-info-content"
                                    >
                                        <span>
                                            {
                                                viewData.orgCode
                                            }
                                        </span>
                                    </Col>
                                    <Col span={4}>
                                        <UploadImg/>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </Panel>
                    <Panel key="4" header ='公司' >
                        {
                            salesVOs && salesVOs.length?
                            salesVOs.map(item=>{//-----循环生成各个公司详情
                                return (
                                    <Row className="custom-info">
                                        <Col span={12}>
                                            <Row type="flex" gutter={10} align="middle">
                                                <Col span={8} className="custom-info-title">
                                                    <span>公司:</span>
                                                </Col>
                                                <Col span={16} className="custom-info-content">
                                                    <span>{item.orgName} </span>
                                                </Col>
                                            </Row>
                                        </Col>
                                        <Col span={12}>
                                            <Row type="flex" gutter={10} align="middle">
                                                <Col span={8} className="custom-info-title">
                                                    <span>客户等级:</span>
                                                </Col>
                                                <Col span={16} className="custom-info-content">
                                                    <span>{item.levelName}</span>
                                                </Col>
                                            </Row>
                                        </Col>
                                        <Col span={12}>
                                            <Row type="flex" gutter={10} align="middle">
                                                <Col span={8} className="custom-info-title">
                                                    <span>客户状态:</span>
                                                </Col>
                                                <Col span={16} className="custom-info-content">
                                                    <span>{item.stateName}</span>
                                                </Col>
                                            </Row>
                                        </Col>
                                        <Col span={12}>
                                            <Row type="flex" gutter={10} align="middle">
                                                <Col span={8} className="custom-info-title">
                                                    <span>负责人:</span>
                                                </Col>
                                                <Col span={16} className="custom-info-content">
                                                    <span>{item.ownerUserName}</span>
                                                </Col>
                                            </Row>
                                        </Col>
                                        <Col span={12}>
                                            <Row type="flex" gutter={10} align="middle">
                                                <Col span={8} className="custom-info-title">
                                                    <span>负责部门:</span>
                                                </Col>
                                                <Col span={16} className="custom-info-content">
                                                    <span>{item.ownerDeptName}</span>
                                                </Col>
                                            </Row>
                                        </Col>
                                        <Col span={12}>
                                            <Row type="flex" gutter={10} align="middle">
                                                <Col span={8} className="custom-info-title">
                                                    <span>首次跟进:</span>
                                                </Col>
                                                <Col span={16} className="custom-info-content">
                                                    <span>{item.firstFollowTime}</span>
                                                </Col>
                                            </Row>
                                        </Col>
                                        <Col span={12}>
                                            <Row type="flex" gutter={10} align="middle">
                                                <Col span={8} className="custom-info-title">
                                                    <span>最近跟进:</span>
                                                </Col>
                                                <Col span={16} className="custom-info-content">
                                                    <span>{item.followTime}</span>
                                                </Col>
                                            </Row>
                                        </Col>
                                    </Row>  
                                )
                            }):''
                        }                      
                    </Panel>
            </Collapse>
        )
    }
}

function mapStateToProps(state, ownProps) {
    return {
        $$state: state.customerGroupList,
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

