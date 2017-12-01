import { Form, Input, Select, Row, Col, Card as AntdCard, InputNumber } from 'antd';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as Actions from "../action"
import Email from 'utils/components/emails'
import Department from 'components/refs/departments'
import Enum from 'utils/components/enums'
import RadioGroup from 'utils/components/radios'
import BatchSelect from './BatchSelect.jsx'
const FormItem = Form.Item;
const Option = Select.Option;

class ActionCard extends React.Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        let data = this.props.$$state.get("editData").toJS();
        let result = this.props.$$state.get("result").toJS();
        if (data.nowStage == undefined) {
            data.nowStage = data.oppstage[0].key;
        }
        
        for(let i=0;i<result.length;i++){
            if(result[i].key == data.nowStage){
                data.winProbability = result[i].winProbability;
                const oppdimension = result[i].children;
                for(let i=0;i<oppdimension.length;i++){
                    const actions = oppdimension[i].children?oppdimension[i].children:[];
                    const key = 'oppdimension'+oppdimension[i].key;
                    data[key] = actions
                }
                break;
            }
        }
        this.props.form.setFieldsValue(data);
    }


    getMyAction = item => {
        const allAction = this.props.$$state.get("allAction").toJS();
        const myAction = [];
        for (let i = 0; i < allAction.length; i++) {
            if (allAction[i].dimension == item.key) {
                myAction.push(allAction[i])
            }
        }
        return myAction;
    }

    ChangeStage =(stageKey)=>{
        const values = this.props.form.getFieldsValue()
        const result = this.props.$$state.get("result").toJS();
        const editData = this.props.$$state.get("editData").toJS();
        for(let i=0;i<result.length;i++){
          if(result[i].key == values.nowStage){
              result[i].winProbability = values.winProbability
            const stage = result[i];
            const dimensions = stage.children
            for(let i=0;i<dimensions.length;i++){
              const actions = values['oppdimension'+dimensions[i].key];
              dimensions[i].children = actions;
            }
            break;
          }
        }
        editData.nowStage = stageKey;
        this.props.action.saveEditData(editData);
        this.props.action.saveResult(result);
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        const editData = this.props.$$state.get("editData").toJS();
        const enumData = this.props.$$state.get("enumData").toJS();
        const allStage = this.props.$$state.get("allStage").toJS();
        const allDimension = this.props.$$state.get("allDimension").toJS();
        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 6 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 14 },
            },
        };
        {
            getFieldDecorator('nowStage', {
            })(
                <Input />
                )
        }


        const showStage = data =>
            data.map(item => {
                return (
                    <Col span={2}>
                    <div onClick={this.ChangeStage.bind(this,item.key)}>
                        {item.title}
                        </div>
                    </Col>

                );

            });
        const showAction = data =>
            data.map(item => {
                const aaa = 'oppdimension'+item.key
                return (
                    <div>
                    <Row>
                        <AntdCard title={item.title} bordered={false} >
                            {getFieldDecorator(aaa, {

                            })(
                                <BatchSelect dataSource={this.getMyAction(item)} />
                                )}
                        </AntdCard>
                    </Row>
                    
                    </div>
                );

            });
        return (
            <div>

                <Row>
                    {editData.oppstage?showStage(editData.oppstage):""}
                </Row>
                <Form >
                    <Row>
                        <Col span={12}>
                            <FormItem
                                label="阶段赢单概率"
                                {...formItemLayout}
                            >
                                {getFieldDecorator('winProbability', {
                                })(
                                    <InputNumber min={0} max={100} formatter={value => `${value}%`} parser={value => value.replace("%", "")} />
                                    )}
                            </FormItem>
                        </Col>
                    </Row>
                    {editData.oppdimension ? showAction(editData.oppdimension) : ""}

                </Form>
            </div>
        )
    }
}

//绑定状态到组件props
function mapStateToProps(state, ownProps) {
    return {
        $$state: state.oppflowList
    }
}

//绑定action到组件props
function mapDispatchToProps(dispatch) {
    return {
        action: bindActionCreators(Actions, dispatch)
    }
}

//输出绑定state和action后组件
export default connect(mapStateToProps, mapDispatchToProps)(ActionCard);