import {
    Modal,
    Button,
    Icon,
    Row,
    Col,
} from "antd";

export default class ContactsDetail extends React.Component{
    handleCancel(){
        this.props.cancel()
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
                        <Row className='top'>
                            <Row type='flex' gutter={20}>
                                <Row type='flex' align='middle'>
                                    <img
                                        src={require("assets/images/header/photo.png")}
                                        className="top-img"
                                    />
                                    <span className='cus-name'>{data.name}</span>
                                </Row>
                                <Row type='flex' align='middle' gutter={5}>
                                    <i className='iconfont icon-guanzhu1 red'/>
                                    <span className='related'>关注</span>
                                </Row>
                                <Row type='flex' align='middle' gutter={5}>
                                    <i className='iconfont icon-zhulianxiren'/>
                                    <span className='related'>主联系人:{data.mainContactName}</span>
                                </Row>
                            </Row>
                            
                        </Row>
                        <Row className='bottom'>
                            <Row type='flex' className='bottom-top'>
                                <div className='col'>
                                    <i className='iconfont icon-zhiwu'/>
                                    <span className='related'>职务</span>
                                </div>
                                <div className='col'>
                                    <i className='iconfont icon-chenmokehu'/>
                                    <span className='related'>客户</span>
                                </div>
                                <div className='col'>
                                    <i className='iconfont icon-shoujihao'/>
                                    <span className='related'>手机号</span>
                                </div>
                                <div className='col'>
                                    <i className='iconfont icon-fuzeren1'/>
                                    <span className='related'>负责人</span>
                                </div>
                                <div className='col'>
                                    <i className='iconfont icon-fuzebumen2'/>
                                    <span className='related'>负责部门</span>
                                </div>
                            </Row>
                            <Row type='flex' className='bottom-top1'>
                                <div className='col'>
                                    <span className='related1'>{data.post}</span>
                                </div>
                                <div className='col'>
                                    <span className='related1'>{data.customer}</span>
                                </div>
                                <div className='col'>
                                    <span className='related1'>{data.mobile}</span>
                                </div>
                                <div className='col'>
                                    <span className='related1'>
                                        <div>
                                            <img
                                                src={require("assets/images/header/photo.png")}
                                                className="top-img"
                                            />
                                        </div>
                                        <div>{data.ownerUserId}</div>
                                    </span>
                                </div>
                                <div className='col'>
                                    <span className='related1'>{data.deptName}</span>
                                </div>
                            </Row>
                        </Row>
                        <div className='cus-collapse'>
                            <div className='cus-collapse-header'>
                                标签
                            </div>
                            <div className='cus-collapse-body'>
                                <Row className='body-item'>
                                    <Col span={6}>
                                        <Row type='flex' justify='end'>
                                            角色：
                                        </Row>
                                    </Col>
                                    <Col span={16} className='body-span'><span>{data.role}</span></Col>
                                </Row>
                                <Row className='body-item'>
                                    <Col span={6}>
                                        <Row type='flex' justify='end'>
                                            态度：
                                        </Row>
                                    </Col>
                                    <Col span={16} className='body-span'><span>{data.attitude}</span></Col>
                                </Row>
                                <Row className='body-item'>
                                    <Col span={6}>
                                        <Row type='flex' justify='end'>
                                            兴趣爱好：
                                        </Row>
                                    </Col>
                                    <Col span={16} className='body-span'><span>{data.hobby}</span></Col>
                                </Row>
                            </div>
                        </div>
                        <div className='cus-collapse'>
                            <div className='cus-collapse-header'>
                                联系人信息
                            </div>
                            <div className='cus-collapse-body'>
                                <Row className='body-item'>
                                    <Col span={12}>
                                        <Row type='flex' justify='center'>
                                            <span>部门：</span><span className='pri'>{data.deptName}</span>
                                        </Row>
                                    </Col>
                                    <Col span={12}>
                                        <Row type='flex' justify='center'>
                                            <span>职务：</span><span className='pri'>{data.post}</span>
                                        </Row>
                                    </Col>
                                </Row>
                                <Row className='body-item'>
                                    <Col span={12}>
                                        <Row type='flex' justify='center'>
                                            <span>手机：</span><span className='pri'>{data.mobile}</span>
                                        </Row>
                                    </Col>
                                    <Col span={12}>
                                        <Row type='flex' justify='center'>
                                            <span>办公电话：</span><span className='pri'>{data.officePhone}</span>
                                        </Row>
                                    </Col>
                                </Row>
                                <Row className='body-item'>
                                    <Col span={12}>
                                        <Row type='flex' justify='center'>
                                            <span>邮箱：</span><span className='pri'>{data.email}</span>
                                        </Row>
                                    </Col>
                                    <Col span={12}>
                                        <Row type='flex' justify='center'>
                                            <span>备注：</span><span className='pri'>{data.remarks}</span>
                                        </Row>
                                    </Col>
                                </Row>
                            </div>
                        </div>
                   </div>
                </Modal>
            </div>
        )
    }
}
