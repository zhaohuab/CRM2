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
import { browserHistory } from "react-router";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as Actions from "../action";
import reqwest from "utils/reqwest";
//import { cum as url, doc, baseDir,oppstage ,opportunity,contacts} from "api";



class RelevantObject extends React.Component {
    constructor(props) {
        super(props);

    }



    render() {


        return (
            <div className='clue-relative'>
                <Row className="clue-customer">
                    <Row style={{ marginBottom: '5px' }}>
                        <Col span={24}>
                            <i className="iconfont icon-bianji" />
                            <span sytle={{ color: '#333333' }}>转化的客户</span>
                        </Col>
                    </Row>
                    <Row>
                        <Row style={{ marginLeft: '21px', marginBottom: '5px' }}>

                            <Col span={12} >
                                <div>用友网络股份有限公司</div>
                            </Col>

                            <Col span={12} style={{ textAlign: 'right', color: '#F1B941' }}>
                                <div>3天未跟进</div>
                            </Col>

                        </Row>
                        <Row style={{ marginLeft: '21px', color: '#999999', marginBottom: '5px' }}>
                            <Col span={12}>
                                <div>北清路</div>
                            </Col>
                            <Col span={12} style={{ textAlign: 'right', color: '#999999' }}>
                                <div>刘珊珊</div>
                            </Col>
                        </Row>
                        <Row style={{ marginLeft: '21px', color: '#999999', marginBottom: '5px' }}>
                            <Col span={10}>
                                <div>客户等级</div>
                            </Col>

                        </Row>
                    </Row>
                </Row>
                <Row className="clue-opportunity">
                    <Row style={{ marginBottom: '5px' }}>
                        <Col span={24}>
                            <i className="iconfont icon-bianji" />
                            <span sytle={{ color: '#333333' }}>转化的商机</span>
                        </Col>
                    </Row>
                    <Row>
                        <Row style={{ marginLeft: '21px', marginBottom: '5px' }}>

                            <Col span={12} >
                                <div>用友网络股份有限公司</div>
                            </Col>

                            <Col span={12} style={{ textAlign: 'right', color: '#CCCCCC' }}>
                                <div>3天未跟进</div>
                            </Col>

                        </Row>
                        <Row style={{ marginLeft: '21px', color: '#999999', marginBottom: '5px' }}>
                            <Col span={12}>
                                <div>商机阶段</div>
                            </Col>
                            <Col span={12} style={{ textAlign: 'right', color: '#999999' }}>
                                <div>产品管理部</div>
                            </Col>
                        </Row>
                        <Row type='flex' justify='center' align='middle' style={{ marginLeft: '21px', marginBottom: '5px' }}>
                            <Col span={8} className='oppratunity' >
                                <div>￥1000000</div>
                            </Col>
                            <Col span={8} className='progessContent'>
                                <div className='progress'>
                                    <div className='color' style={{ width: '50%' }}>
                                    </div>
                                </div>
                                <div>50%</div>
                            </Col>
                            <Col span={8} style={{ textAlign: 'right', color: '#999999' }}>
                                <div>刘珊珊</div>
                            </Col>
                        </Row>
                        <Row style={{ marginLeft: '21px', color: '#CCCCCC', marginBottom: '5px' }}>
                            <Col span={10}>
                                <div>2017-03</div>
                            </Col>

                        </Row>
                    </Row>
                </Row>
                <Row className="clue-contast">
                    <Row style={{ marginBottom: '5px' }}>
                        <Col span={24}>
                            <i className="iconfont icon-bianji" />
                            <span sytle={{ color: '#333333' }}>转化的联系人</span>
                        </Col>
                    </Row>
                    <Row>
                        <Row style={{ marginLeft: '21px', marginBottom: '5px' }}>

                            <Col span={12} >
                                <div>刘珊珊</div>
                            </Col>

                            <Col span={12} style={{ textAlign: 'right', color: '#F1B941' }}>
                                <div>3天未跟进</div>
                            </Col>

                        </Row>
                        <Row style={{ marginLeft: '21px', color: '#999999', marginBottom: '5px' }}>
                            <Col span={12}>
                                <div>用友北清路</div>
                            </Col>

                        </Row>
                        <Row style={{ marginLeft: '21px', color: '#999999', marginBottom: '5px' }}>
                            <Col span={10}>
                                <div>产品经理</div>
                            </Col>

                        </Row>
                    </Row>
                </Row>
            </div>
        )
    }
}

//绑定状态到组件props
function mapStateToProps(state, ownProps) {
    return {
        $$state: state.lead,
        //$$stateOpp: state.opportunityList,
    };
}
//绑定action到组件props
function mapDispatchToProps(dispatch) {
    return {
        action: bindActionCreators(Actions, dispatch)
    };
}
//输出绑定state和action后组件
export default connect(mapStateToProps, mapDispatchToProps)(RelevantObject);