import {
    Select,
    Input,
    Form,
    Table,
    Modal,
    Button,
    Icon,
    Row,
    Col,
    Tabs,
    Collapse
} from "antd";

const Panel = Collapse.Panel;

const columns = [{
    title: '订单号',
    dataIndex: 'name',
    key: 'name',
  }, {
    title: '订货日期',
    dataIndex: 'age',
    key: 'age',
  }, {
    title: '审批状态',
    dataIndex: 'address',
    key: 'address',
  }, {
    title: '发货状态',
    dataIndex: 'address',
    key: 'address',
  }];

  const dataSource = []; 

export default class DealObject extends React.Component {
    render(){
        return(
            <div className='cum-deal-warpper'>
                <Collapse defaultActiveKey={['1','2','3']}>
                    <Panel header="信用" key="1">
                        <Row>
                            <Col span={12}>
                                <Row type='flex' justify='center' className='deal-item'>
                                    <Col className='field-left'>信用余额:</Col>
                                    <Col className='field-right'>￥120.00</Col>
                                </Row>
                            </Col>
                            <Col span={12}>
                                <Row type='flex' justify='center'  className='deal-item'>
                                    <Col className='field-left'>信用额度:</Col>
                                    <Col className='field-right'>￥120.00</Col>
                                </Row>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={12}>
                                <Row type='flex' justify='center' className='deal-item'>
                                    <Col className='field-left'>信用等级:</Col>
                                    <Col className='field-right'>￥120.00</Col>
                                </Row>
                            </Col>
                        </Row>
                    </Panel>
                    <Panel header="信用占用" key="2">
                        <Row>
                            <Col span={12}>
                                <Row type='flex' justify='center' className='deal-item'>
                                    <Col className='field-left'>信用占用:</Col>
                                    <Col className='field-right'>￥120.00</Col>
                                </Row>
                            </Col>
                            <Col span={12}>
                                <Row type='flex' justify='center'  className='deal-item'>
                                    <Col className='field-left'>订单应收:</Col>
                                    <Col className='field-right'>￥120.00</Col>
                                </Row>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={12}>
                                <Row type='flex' justify='center' className='deal-item'>
                                    <Col className='field-left'>未确认应收:</Col>
                                    <Col className='field-right'>￥120.00</Col>
                                </Row>
                            </Col>
                            <Col span={12}>
                                <Row type='flex' justify='center' className='deal-item'>
                                    <Col className='field-left'>确认应收:</Col>
                                    <Col className='field-right'>￥120.00</Col>
                                </Row>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={12}>
                                <Row type='flex' justify='center' className='deal-item'>
                                    <Col className='field-left'>收款未核销:</Col>
                                    <Col className='field-right'>￥120.00</Col>
                                </Row>
                            </Col>
                            <Col span={12}>
                                <Row type='flex' justify='center' className='deal-item'>
                                    <Col className='field-left'>费用单余额:</Col>
                                    <Col className='field-right'>￥120.00</Col>
                                </Row>
                            </Col>
                        </Row>
                    </Panel>
                    <Panel header="订单" key="3">
                        <div className='table'>
                            <Table dataSource={dataSource} columns={columns} size='middle'/>
                        </div>
                    </Panel>
                </Collapse>
            </div>
        )
    }
}