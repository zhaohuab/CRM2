import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as Actions from "../../action";


import UpLoad from './UpLoad'
import {
    Steps,
    Cascader,
    Table,
    Icon,
    Button,
    Form,
    Input,
    Col,
    message,
    Radio,
    Row,
    Modal,
    Upload
} from 'antd';
const Step = Steps.Step;
class LeadIn extends React.Component {
    constructor(props) {
        super(props);
    }

    onLoad=()=>{

    }

    render() {
        let { leadEndVisible,leadStep} = this.props.$$state.toJS();
        return (
            <div className="leadin">
                <Row>
                    <Steps current={leadStep} progressDot>
                        <Step title="上传文档" />
                        <Step title="导入数据" />
                        <Step title="完成" />
                    </Steps>
                </Row>

                {leadEndVisible ? <div className="stepboder"> </div>:
                <div>
                <Row type="flex" justify="center">
                    <Col>
                        <Button onClick={this.onLoad.bind(this)}>
                            <Icon type="upload" /> 下载数据模板
                            </Button>
                    </Col>
                    <Col>
                        <span>支持扩展名：.xls</span>
                    </Col>
                </Row>
                <Row type="flex" justify="center">
                    <Col>
                        <UpLoad>
                            <Button>
                                <Icon type="upload" /> 添加文件
                           </Button>
                        </UpLoad>
                    </Col>
                    <Col>
                        <span>仅支持Excel格式</span>
                    </Col>
                </Row>
                </div>}
            </div>
        )
    }
}
//绑定状态到组件props
function mapStateToProps(state, ownProps) {
    return {
        $$state: state.customerList,
        $$stateCommon: state.componentReducer
    };
}
//绑定action到组件props
function mapDispatchToProps(dispatch) {
    return {
        action: bindActionCreators(Actions, dispatch)
    };
}
//输出绑定state和action后组件
export default connect(mapStateToProps, mapDispatchToProps)(LeadIn);