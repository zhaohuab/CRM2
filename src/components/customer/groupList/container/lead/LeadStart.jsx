import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as Actions from "../../action";
import { baseDir } from "api";
import reqwest from "utils/reqwest";
import UpLoad from './UpLoad';
// import AntInput from './AntInput'
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

    //下载excel 表格 
    onLoad = () => {
        location.href = baseDir + "/tpub/excels/2/templates/import"
    }
    importSuccess = (result) => {
        console.log(66, result)

    }
    onErrorLoad = (errorUrl) => {
        debugger
        location.href = errorUrl
        // location.href = 'http://yonyoubucket.oss-cn-beijing.aliyuncs.com/newfile/%E5%AE%A2%E6%88%B7%E5%AF%BC%E5%85%A5%E6%95%B0%E6%8D%AE%E9%94%99%E8%AF%AF%E5%88%97%E8%A1%A820180127125451.xls'

    }
    beforeUpload(file, index, items) {

        let type = ['.bmp', '.gif', '.jpeg', '.html', '.txt', '.vsd', '.ppt', '.doc', '.xml', '.jpg', '.png', '.xlsx']
        let pos = file.name.lastIndexOf('.')
        let end = file.name.slice(pos)
        if (type.indexOf(end) >= 0) {
            return true
        } else {
            //保存信息写不符合上传类型
            return false
        }
    }
    render() {
        debugger
        let { leadEndVisible, leadStep, successResult, leadFiles } = this.props.$$state.toJS();
        let files = Array.prototype.slice.call(leadFiles);
        return (
            <div className={leadEndVisible ? 'leadin leadEndBorder' : 'leadin'}>
                <Row className="leadStep">
                    <Steps current={leadStep} progressDot>
                        <Step title="上传文档" />
                        <Step title="导入数据" />
                        <Step title="完成" />
                    </Steps>
                </Row>
                {leadEndVisible ?
                    <div className="stepboder"></div> :
                    <div className="leadLoad">
                        <Row type="flex" justify="center" align="middle" gutter={10} style={{ marginBottom: "10px" }}>
                            <Col>
                                <Button style={{ borderRadius: '40px', height: '25px', width: '150px' }} onClick={this.onLoad.bind(this)}>
                                    <Icon type="upload" /> 下载数据模板
                            </Button>
                            </Col>
                            <Col>
                                <span>支持扩展名：.xls</span>
                            </Col>
                        </Row>
                        <Row type="flex" justify="center" align="middle" gutter={10}>
                            <Col>
                                <UpLoad
                                    disabled={false}
                                    multiple={true}
                                    success={this.importSuccess}
                                    fail={this.importFail}
                                    beforeUpload={this.beforeUpload.bind(this)}
                                >
                                    <Button style={{ borderRadius: '40px', height: '25px', width: '150px' }}>
                                        <Icon type="paper-clip" /> 添加文件
                           </Button>

                                </UpLoad>
                            </Col>
                            <Col>
                                <span>仅支持Excel格式</span>
                            </Col>
                        </Row>
                        {/* <div>{files&&files.length?files[0].name:''}</div> */}
                    </div>}

                {successResult.length && successResult[0].data && successResult[0].data.errorURL ?
                    <div className="importView">
                        <p>下载错误报告，查看失败原因</p>
                        <div className="errorFile"><i className="iconfont icon-word"></i></div>
                        <div className="errorExcel">{successResult[0].data.fileName}
                            <Icon type="upload" onClick={this.onErrorLoad.bind(this, successResult[0].data.errorURL)} />
                        </div>
                    </div>
                    : null}

                {/*            
        <AntInput/>
    
            */}

            </div>
        )
    }
}
//绑定状态到组件props
function mapStateToProps(state, ownProps) {
    return {
        $$state: state.customerGroupList,
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