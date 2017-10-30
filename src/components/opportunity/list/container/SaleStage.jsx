import { Row, Col ,Card,Button} from 'antd';

class SaleStage extends React.Component {
    constructor(props) {
        super(props);
    }


    render() {
        return (
            <div>
                <Row>
                <Button>发现商机</Button>
                <Button>确认商机</Button>
                <Button>需求沟通</Button>
                <Button>方案设计</Button>
                <Button>投标谈判</Button>
                <Button>签约</Button>
                <Button>赢单</Button>
                </Row>
                <Row>
                    <Col span={12}>
                        <Card title="关键指标" bordered={false} style={{ width: 300 }}>
                            <p>*识别客户</p>
                            <p>*识别联系人</p>
                        </Card>
                    </Col>
                    <Col span={12}>
                        <Card title="跟进指南" bordered={false} style={{ width: 300 }}>
                            <p>*识别客户</p>
                            <p>*识别联系人</p>
                            <p>*商机评分</p>
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

export default SaleStage;