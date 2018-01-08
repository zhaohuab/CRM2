import { Row, Col, Card, Button, Radio, Checkbox, Modal } from 'antd';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as Actions from "../action";
import Radar from './Radar.jsx';
class SaleStage extends React.Component {
    constructor(props) {
        super(props);
    }

    selectStage(oppstage_id) {
        this.props.action.selectStage(oppstage_id)
    }

    finishAction(oppstage_id, oppaction_id, is_finish, oppdimension_id) {
        const opportunity_id = this.props.$$state.get("editData").toJS().id;
        if (is_finish == 1) {
            is_finish = 2
        } else {
            is_finish = 1
        }

        const resultData = this.props.$$state.get("resultData").toJS();
        for (let i = 0; i < resultData.length; i++) {
            if (resultData[i].oppstage_id == oppstage_id) {
                const dimensionData = resultData[i].children;
                for (let j = 0; j < dimensionData.length; j++) {
                    if (dimensionData[j].oppdimension_id == oppdimension_id) {
                        const actionData = dimensionData[j].children;
                        for (let k = 0; k < actionData.length; k++) {
                            if (actionData[k].oppaction_id == oppaction_id) {
                                resultData[i].children[j].children[k].is_finish = is_finish
                            }
                        }
                    }
                }
            }
        }

        this.props.action.finishAction(opportunity_id, oppstage_id, oppaction_id, is_finish, resultData);
    }

    setCurrentStage(stageId) {
        const oppId = this.props.$$state.get('editData').toJS().id;
        this.props.action.setCurrentStage(oppId, stageId);
    }

    onCancel() {
        this.props.action.showRadarCard(false)
    }

    showRadarCard() {
        this.props.action.showRadarCard(true)
    }

    render() {
        const resultData = this.props.$$state.get("resultData").toJS();
        const selectedStage = this.props.$$state.get("selectedStage");
        const editData = this.props.$$state.get('editData').toJS()
        let dimension = [];

        //根据当前选择阶段，看当前阶段的维度动作
        for (let i = 0; i < resultData.length; i++) {

            if (resultData[i].oppstage_id == selectedStage) {
                dimension = resultData[i].children;
                break;
            }
        }

        //阶段停留时间
        for (let i = 0; i < resultData.length; i++) {
            if (resultData[i].oppstage_id == editData.saleStage) {
                resultData[i].stageStayTime = editData.stageStayTime;
                break;
            }
        }

        if (dimension.length == 0 && resultData.length != 0) {
            this.props.action.selectStage(resultData[0].oppstage_id)
        }
        const radarCardVisible = this.props.$$state.get("radarCardVisible");
        const showStage = data =>
            data.map(item => {
                return (
                    
                    <div >
                        <Col span={4}>
                            <div onClick={this.selectStage.bind(this, item.oppstage_id)}
                                className={item.oppstage_id == selectedStage ? "SaleStage-box-selected" : "SaleStage-box"}
                            >
                               <div className={item.oppstage_id == editData.saleStage ? "background-green" : ""}>
                                        <Row class="SaleStage-stage-cell">
                                            {item.oppstage_name}
                                        </Row>
                                        <Row>
                                            {item.stageStayTime}
                                        </Row>
                                    </div>
                                  
                            </div>
                        </Col>
                    </div>
                );
            });


        const showDimension = data =>
            data.map(item => {
                return (
                    <Row className="dimension-line">
                        {/* <div className={item.selected ? "BatchSelect-box-selected" : "BatchSelect-box"}> {item.oppstage_name}</div> */}
                        <Col span={6}>
                            {item.oppdimension_name}:
                        </Col>
                        {showAction(item.children)}
                    </Row>
                );
            });

        const showAction = data =>
            data.map(item => {
                return (
                    <div onClick={this.finishAction.bind(this, item.oppstage_id, item.oppaction_id, item.is_finish, item.oppdimension_id)}>
                        <Col span={6}>
                            {/* <div className={item.selected ? "BatchSelect-box-selected" : "BatchSelect-box"}> {item.oppstage_name}</div> */}
                            <Radio checked={item.is_finish == 1 ? true : false} />
                            {item.oppaction_name}
                        </Col>
                    </div>
                );
            });


        return (
            <div>
                <Row>
                    <Col span={20}>
                        <Row>
                            {showStage(resultData)}
                        </Row>
                    </Col>
                    {editData.state!=3?"":<Col span={4}><Button type="primary" onClick={this.setCurrentStage.bind(this, selectedStage)}>设为当前</Button></Col>}
                    
                </Row>
                <Row>
                    <Col span={12}>
                        <Row className="dimension-line-title">
                            ●关键动作:
                        </Row>
                        {editData.state!=3?<div className = "SaleStage-action-topdiv"></div>:'' }
                        {showDimension(dimension)}
                    </Col>
                    <Col span={12} onClick={this.showRadarCard.bind(this)}>
                        <Radar data={dimension} />
                    </Col>
                </Row>
                <Modal
                    title="查看大图"
                    visible={radarCardVisible}
                    onOk={this.onCancel.bind(this)}
                    onCancel={this.onCancel.bind(this)}
                    width="50%"
                    maskClosable={false}
                >
                    <Radar data={dimension} />
                </Modal>
            </div>
        )
    }
}


//绑定状态到组件props
function mapStateToProps(state, ownProps) {
    return {
        $$state: state.opportunityList,
    };
}
//绑定action到组件props
function mapDispatchToProps(dispatch) {
    return {
        action: bindActionCreators(Actions, dispatch)
    };
}
//输出绑定state和action后组件
export default connect(mapStateToProps, mapDispatchToProps)(SaleStage);
