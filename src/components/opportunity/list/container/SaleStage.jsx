import { Row, Col, Card, Button,Radio,Checkbox } from 'antd';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as Actions from "../action";
class SaleStage extends React.Component {
    constructor(props) {
        super(props);
    }

    selectStage(oppstage_id){
        this.props.action.selectStage(oppstage_id)
    }

    finishAction(oppstage_id,oppaction_id,is_finish,oppdimension_id){
        const opportunity_id = this.props.$$state.get("editData").toJS().id;
        if(is_finish == 1){
            is_finish = 2
        }else {
            is_finish = 1
        }

        const resultData = this.props.$$state.get("resultData").toJS();
        for(let i=0;i<resultData.length;i++){
            if(resultData[i].oppstage_id == oppstage_id){
                const dimensionData = resultData[i].children;
                for(let j=0;j<dimensionData.length;j++){
                    if(dimensionData[j].oppdimension_id == oppdimension_id){
                        const actionData = dimensionData[j].children;
                        for(let k=0;k<actionData.length;k++){
                            if(actionData[k].oppaction_id == oppaction_id){
                                resultData[i].children[j].children[k].is_finish = is_finish
                            }
                        }
                    }
                }
            }
        }

        this.props.action.finishAction(opportunity_id,oppstage_id,oppaction_id,is_finish,resultData);
    }

    render() {
        const resultData = this.props.$$state.get("resultData").toJS();
        const selectedStage = this.props.$$state.get("selectedStage");
        let dimension = [];
        for (let i = 0; i < resultData.length; i++) {
            if (resultData[i].oppstage_id == selectedStage) {
                dimension = resultData[i].children;
                break;
            }
        }
        if(dimension.length==0&&resultData.length!=0){
            this.props.action.selectStage(resultData[0].oppstage_id)
        }

        const showStage = data =>

            data.map(item => {
                return (
                    <div >
                        <Col span={3}>
                            <div onClick={this.selectStage.bind(this,item.oppstage_id)} className={item.selected ? "BatchSelect-box-selected" : "BatchSelect-box"}> {item.oppstage_name}</div>
                        </Col>
                    </div>
                );
            });


        const showDimension = data =>

            data.map(item => {
                return (
                    <Row>
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
                    <div onClick={this.finishAction.bind(this,item.oppstage_id,item.oppaction_id,item.is_finish,item.oppdimension_id)}>
                        <Col span={6}>
                            {/* <div className={item.selected ? "BatchSelect-box-selected" : "BatchSelect-box"}> {item.oppstage_name}</div> */}
                           <Radio checked={item.is_finish==1?true:false} />
                            {item.oppaction_name}
                        </Col>
                    </div>
                );
            });


        return (
            <div>
                <Row>
                    {showStage(resultData)}
                </Row>
                <Row>
                    <Col span={12}>
                        {/* <Card title="关键指标" bordered={false} style={{ width: 300 }}>
                            <p>*识别客户</p>
                            <p>*识别联系人</p>
                        </Card> */}

                        {showDimension(dimension)}
                    </Col>
                    <Col span={12}>
                        <Card title="跟进指南" bordered={false} style={{ width: 300 }}>
                           {/* <Radar /> */}
                        </Card>
                    </Col>
                </Row>
                <Row>
                    <Col span={12}>
                        <Card title="商机关联客户新闻" bordered={false} style={{ width: 300 }}>
                            <p>Designed as Ant Design，提炼和服务企业级中后台产品的交互语言和视觉风格。</p>
                            <p>React Component 基础上精心封装的高质量 UI 组件。</p>
                            <p>基于 npm + webpack + babel 的工作流，支持 ES2015 和 TypeScript。</p>
                        </Card>
                    </Col>
                    <Col span={12}>
                        <Card title="商机关联客户新闻" bordered={false} style={{ width: 300 }}>
                            <p>Designed as Ant Design，提炼和服务企业级中后台产品的交互语言和视觉风格。</p>
                            <p>React Component 基础上精心封装的高质量 UI 组件。</p>
                            <p>基于 npm + webpack + babel 的工作流，支持 ES2015 和 TypeScript。</p>
                        </Card>
                    </Col>
                </Row>
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
