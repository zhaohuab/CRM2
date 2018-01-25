import {
    Modal,
    Button,
    Icon,
    Row,
    Col,
    Table
} from "antd";
const columns = [{
    title: '产品名称',
    dataIndex: 'productId',
    key: 'productId',
  }, {
    title: '产品分类',
    dataIndex: 'productTypeId',
    key: 'productTypeId',
  }, {
    title: '品牌',
    dataIndex: 'brandId',
    key: 'brandId',
  },
  {
    title: '销售单位',
    dataIndex: 'measureId',
    key: 'measureId',
  },
  {
    title: '销售单价',
    dataIndex: 'price',
    key: 'price',
  },
  {
    title: '产品数量',
    dataIndex: 'number',
    key: 'number',
  },
  {
    title: '合计金额',
    dataIndex: 'sumMoney',
    key: 'sumMoney',
  },
  {
    title: '备注',
    dataIndex: 'description',
    key: 'description',
  }];

export default class OppDetail extends React.Component{
    handleCancel(){
        this.props.cancel()
    }

    changeTime(time,choose){
        time = new Date(time)
        let second = time.toLocaleTimeString()
        let  day= time.toLocaleDateString();
        let reg = /^(上午|下午)/g;

        second = second.replace(reg,'')
        day = day.split('/').join('-')
        if(choose == 'day'){
            return day
        }else{
            return day + ' ' + second
        }
    }

    render(){
        let {data} = this.props
        return(
            <div className=''>
                <Modal
                    title="详情"
                    visible={this.props.visiable}
                    footer = {null}
                    onCancel={this.handleCancel.bind(this)}
                    className='custom-modal-contacts'
                    width={900}
                    maskClosable = {false}
                > 
                    <div className='height'>
                        <div className='cus-collapse'>
                            <div className='cus-collapse-header'>
                                商机信息
                            </div>
                            <div className='cus-collapse-body'>
                                <Row className='body-item'>
                                    <Col span={12}>
                                        <Row type='flex' justify='center'>
                                            <span>商机名称：</span><span className='pri'>{data.name}</span>
                                        </Row>
                                    </Col>
                                    <Col span={12}>
                                        <Row type='flex' justify='center'>
                                            <span>客户名称：</span><span className='pri'>{data.customerName}</span>
                                        </Row>
                                    </Col>
                                </Row>
                                <Row className='body-item'>
                                    <Col span={12}>
                                        <Row type='flex' justify='center'>
                                            <span>商机类型：</span><span className='pri'>{data.typeName}</span>
                                        </Row>
                                    </Col>
                                    <Col span={12}>
                                        <Row type='flex' justify='center'>
                                            <span>商机阶段：</span><span className='pri'>{data.saleStageName}</span>
                                        </Row>
                                    </Col>
                                </Row>
                                <Row className='body-item'>
                                    <Col span={12}>
                                        <Row type='flex' justify='center'>
                                            <span>赢单概率：</span><span className='pri'>{data.winProbability}</span>
                                        </Row>
                                    </Col>
                                    <Col span={12}>
                                        <Row type='flex' justify='center'>
                                            <span>预签单时间：</span><span className='pri'>{data.expectSignTime?this.changeTime.call(this,data.expectSignTime.time,'day'):'无'}</span>
                                        </Row>
                                    </Col>
                                </Row>
                                <Row className='body-item'>
                                    <Col span={12}>
                                        <Row type='flex' justify='center'>
                                            <span>预签单金额：</span><span className='pri'>{data.expectSignMoney}</span>
                                        </Row>
                                    </Col>
                                    <Col span={12}>
                                        <Row type='flex' justify='center'>
                                            <span>商机日期：</span><span className='pri'>{data.createdTime?this.changeTime.call(this,data.createdTime.time,'day'):'无'}</span>
                                        </Row>
                                    </Col>
                                </Row>
                            </div>
                        </div>
                        <div className='cus-collapse'>
                            <div className='cus-collapse-header'>
                                产品信息
                            </div>
                            <div className='cus-collapse-body'>
                               <Table 
                               dataSource={this.props.data.childList}
                               columns={columns} 
                               size="middle"
                            //    pagination={{
                            //         size: "large",
                            //         showSizeChanger: true,
                            //         showQuickJumper: true,
                            //         total: page.total,
                            //         showTotal: this.showTotal,
                            //         onChange: this.onPageChange.bind(this),
                            //         onShowSizeChange: this.onPageSizeChange.bind(
                            //             this
                            //         )
                            //     }}
                               />
                            </div>
                        </div>
                   </div>
                </Modal>
            </div>
        )
    }
}
