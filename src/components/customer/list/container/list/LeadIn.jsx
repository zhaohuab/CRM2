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
export default class LeadIn extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <Row>
                    <Steps current={1} progressDot>
                        <Step title="上传文档" />
                        <Step title="导入数据" />
                        <Step title="完成" />
                    </Steps>
                </Row>
                <Row type="flex" justify="center">
                    <Col>
                        <Upload>
                            <Button>
                                <Icon type="upload" /> 下载数据模板
                            </Button>
                        </Upload>
                    </Col>
                    <Col>
                        <span>支持扩展名：.xls</span>
                    </Col>
                </Row>
                <Row type="flex" justify="center">
                    <Col>
                        <Upload>
                            <Button>
                                <Icon type="upload" /> 添加文件
                           </Button>
                        </Upload>
                    </Col>
                    <Col>
                        <span>仅支持Excel格式</span>
                    </Col>
                </Row>
            </div>
        )
    }
}
