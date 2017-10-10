

import {Row,Col, Layout, Menu, Breadcrumb, Icon ,Button} from 'antd';

const { Header, Content, Sider } = Layout;

export default class ViewPanel extends React.Component {
    constructor(props) {
        super(props);
    }


    componentDidMount() {

    }


    render() {
        return (
            <div>
                <Layout>
                    <Header style={{ height:'200',background: '#66ccff' }}>
                        <div>
                        <Row>
                        <Col span={12}>{this.props.data.name}</Col>
                        <Col span={12}><Button>编辑</Button><Button>新增</Button><Button>更多</Button></Col>
                        </Row>
                        <Row>
                        <Col span={6}>
                            <div>电话：</div>
                            <div>{this.props.data.tel}</div>
                        </Col>
                        <Col span={6}>
                            <div>详细地址：</div>
                            <div>{this.props.data.address}</div>
                        </Col>
                        <Col span={6}>
                            <div>负责人</div>
                            <div></div>
                        </Col>
                        <Col span={6}>
                            <div>负责部门</div>
                            <div></div>
                        </Col>
                      </Row>
                      </div>
                    </Header>
                    <Layout>
                        <Sider width={600} style={{ background: '#fff' }}>
rrefe
                        </Sider>
                        <Layout style={{ padding: '0 24px 24px' }}>
ewfewf
                        </Layout>
                    </Layout>
                </Layout>

            </div>
        )
    }
}