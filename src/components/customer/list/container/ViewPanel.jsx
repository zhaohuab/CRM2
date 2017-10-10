

import {Collapse,Tabs,Row,Col, Layout, Menu, Breadcrumb, Icon ,Button} from 'antd'
import { browserHistory } from 'react-router'
const TabPane = Tabs.TabPane;
const { Header, Content, Sider } = Layout;
const Panel = Collapse.Panel;


export default class ViewPanel extends React.Component {
    constructor(props) {
        super(props);
    }


    componentDidMount() {

    }
    showContact(){
        browserHistory.push('/crm_web/page/contacts')
    }

    render() {
        return (
            <div>
                <Layout>
                    <Header style={{ height:'200',background: '#66ccff' }}>
                        <div>
                            <Row>
                                <Col span={12}>{this.props.data.name}</Col>
                                <Col span={12}>
                                <Button onClick={this.props.btnEdit.bind(this,this.props.data)}>编辑</Button>
                                <Button onClick={this.props.btnNew}>新增</Button>
                                <Button>更多</Button></Col>
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
                            <Tabs defaultActiveKey="1" >
                                <TabPane tab="相关" key="1">
                                    <Collapse defaultActiveKey={['1']} >
                                        <Panel header="联系人" key="1">
                                            <Row>
                                                <Col onClick={this.showContact.bind(this)} span={8} >
                                                    <div >李丽</div>
                                                    <div>公司名称：丽美诗有限公司</div>
                                                    <div>职务：销售</div>
                                                    <div>电话：18372674832</div>
                                                </Col>
                                                <Col span={8}>
                                                    <div>李丽</div>
                                                    <div>公司名称：丽美诗有限公司</div>
                                                    <div>职务：销售</div>
                                                    <div>电话：18372674832</div>
                                                </Col>
                                                <Col span={8}>
                                                    <div>李丽</div>
                                                    <div>公司名称：丽美诗有限公司</div>
                                                    <div>职务：销售</div>
                                                    <div>电话：18372674832</div>
                                                </Col> 
                                                <Col span={8}>
                                                    <div>李丽</div>
                                                    <div>公司名称：丽美诗有限公司</div>
                                                    <div>职务：销售</div>
                                                    <div>电话：18372674832</div>
                                                </Col> 
                                                <Col span={8}>
                                                    <div>李丽</div>
                                                    <div>公司名称：丽美诗有限公司</div>
                                                    <div>职务：销售</div>
                                                    <div>电话：18372674832</div>
                                                </Col> <Col span={8}>
                                                    <div>李丽</div>
                                                    <div>公司名称：丽美诗有限公司</div>
                                                    <div>职务：销售</div>
                                                    <div>电话：18372674832</div>
                                                </Col>
                                                
                                            </Row>
                                        </Panel>
                                        <Panel header="This is panel header 2" key="2">
                                        <p>wert</p>
                                        </Panel>
                                        <Panel header="This is panel header 3" key="3">
                                        <p>asdfg</p>
                                        </Panel>
                                    </Collapse>
                                </TabPane>
                                <TabPane tab="资料" key="2">Content of Tab Pane 2</TabPane>
                            </Tabs>
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