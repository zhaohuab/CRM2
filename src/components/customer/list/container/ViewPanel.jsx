

import {Popover,Collapse,Tabs,Row,Col, Layout, Menu, Breadcrumb, Icon ,Button} from 'antd'
import { browserHistory } from 'react-router'
const TabPane = Tabs.TabPane;
const { Header, Content, Sider } = Layout;
const Panel = Collapse.Panel;

console.log(browserHistory)
export default class ViewPanel extends React.Component {
    constructor(props) {
        super(props);
    }


    componentDidMount() {

    }
    showContact(){
        let path=browserHistory.getCurrentLocation().pathname
        browserHistory.push('/crm_web/page/contacts/'+encodeURIComponent(path))
    }

    render() {
        return (
            <div>
                <Layout>
                    <Header style={{ height:'200',background: '#66ccff' }}>
                        <div>
                            <Row>
                                <Col span={12}>{this.props.data.name}</Col>
                                <Col span={10}>
                                    <Button onClick={this.props.btnEdit.bind(this,this.props.data)}>编辑</Button>
                                    <Button onClick={this.props.btnNew}>新增</Button>
                                    {/* <Popover
                                        content={<a onClick={this.hide}>Close</a>}
                                        title="Title"
                                        trigger="click"
                                        visible={this.state.visible}
                                        onVisibleChange={this.handleVisibleChange}
                                    >
                                        <Button type="primary">Click me</Button>
                                    </Popover> */}
                                </Col>
                                <Col span={2}><Button onClick={this.props.btnClosePanel}>X</Button></Col>
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
                                        <Panel header="商机" key="2">
                                        <p>wert</p>
                                        </Panel>
                                        <Panel header="行动" key="3">
                                        <p>asdfg</p>
                                        </Panel>
                                    </Collapse>
                                </TabPane>
                                <TabPane tab="资料" key="2">Content of Tab Pane 2</TabPane>
                            </Tabs>
                        </Sider>
                        <Layout style={{ padding: '0 24px 24px' }}>
                            <div>动态</div>
                            <div>
                                <li>2017-08-18 14:30 winni创建了任务AAA</li>
                                <li>2017-08-18 14:30 winni创建了任务AAA</li>
                                <li>2017-08-18 14:30 winni创建了任务AAA</li>
                                <li>2017-08-18 14:30 winni创建了任务AAA</li>
                                <li>2017-08-18 14:30 winni创建了任务AAA</li>
                                <li>2017-08-18 14:30 winni创建了任务AAA</li>
                                <li>2017-08-18 14:30 winni创建了任务AAA</li>
                                <li>2017-08-18 14:30 winni创建了任务AAA</li>
                                <li>2017-08-18 14:30 winni创建了任务AAA</li>
                                <li>2017-08-18 14:30 winni创建了任务AAA</li>
                                <li>2017-08-18 14:30 winni创建了任务AAA</li>
                                <li>2017-08-18 14:30 winni创建了任务AAA</li>
                            </div>
                        </Layout>
                    </Layout>
                </Layout>

            </div>
        )
    }
}