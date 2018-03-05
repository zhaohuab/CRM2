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

const TabPane = Tabs.TabPane;
const Panel = Collapse.Panel;

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as Actions from "../../action";

import UploadImg from "../list/UploadImg";

class DetailObject extends React.Component {
    //生成地址方法
    createAddress(viewData){
        debugger
        if(viewData.street && viewData.street.address){
             return(
                <span>
                    { viewData.street.address }
                </span>
             )
        }else if(viewData.street && typeof viewData.street == 'string'){
            return(
                <span>{ viewData.street }</span>
            )
        }else{
            return(
                <span></span>
            )
        }
    }

    //更改时间
    changeTime(time){
        time = new Date(time)
        let second = time.toLocaleTimeString()
        let  day= time.toLocaleDateString();
        let reg = /^(上午|下午)/g;

        second = second.replace(reg,'')
        day = day.split('/').join('-')
        
        return [day,second]
    }

    render(){
        let {viewData} = this.props.$$state.toJS();
        return(
                <Collapse
                    defaultActiveKey={["1", "2", "3"]}
                >
                    <Panel key="1" header ='客户信息' >
                        <Row>
                            {/* <Col span={12}>
                                <Row
                                    type="flex"
                                    gutter={10}
                                    align="middle"
                                >
                                    <Col
                                        span={8}
                                        className="custom-info-title"
                                    >
                                        <span>
                                            客户类型:
                                        </span>
                                    </Col>
                                    <Col
                                        span={16}
                                        className="custom-info-content"
                                    >
                                        <span>
                                            {
                                                viewData.biztypeName
                                            }
                                        </span>
                                    </Col>
                                </Row>
                            </Col> */}
                            {/* <Col span={12}  className="custom-info-item">
                                <Row
                                    type="flex"
                                    gutter={10}
                                    align="middle"
                                >
                                    <Col
                                        span={8}
                                        className="custom-info-title"
                                    >
                                        <span>
                                            客户等级:
                                        </span>
                                    </Col>
                                    <Col
                                        span={16}
                                        className="custom-info-content"
                                    >
                                        <span>
                                            {
                                                viewData.levelName
                                            }
                                        </span>
                                    </Col>
                                </Row>
                            </Col> */}
                            {/* <Col span={12} className="custom-info-item">
                                <Row
                                    type="flex"
                                    gutter={10}
                                    align="middle"
                                >
                                    <Col
                                        span={8}
                                        className="custom-info-title"
                                    >
                                        <span>
                                            客户全称:
                                        </span>
                                    </Col>
                                    <Col
                                        span={16}
                                        className="custom-info-content"
                                    >
                                        <span>
                                            {
                                                viewData.fullname
                                            }
                                        </span>
                                    </Col>
                                </Row>
                            </Col> */}
                            <Col span={12} className="custom-info-item">
                                <Row
                                    type="flex"
                                    gutter={10}
                                    align="middle"
                                >
                                    <Col
                                        span={8}
                                        className="custom-info-title"
                                    >
                                        <span>
                                            客户名称:
                                        </span>
                                    </Col>
                                    <Col
                                        span={16}
                                        className="custom-info-content"
                                    >
                                        <span>{viewData.name && viewData.name.value?viewData.name.value:viewData.name}</span>
                                    </Col>
                                </Row>
                            </Col>
                            
                            <Col span={12} className="custom-info-item">
                                <Row
                                    type="flex"
                                    gutter={10}
                                    align="middle"
                                >
                                    <Col
                                        span={8}
                                        className="custom-info-title"
                                    >
                                        <span>
                                            客户简称:
                                        </span>
                                    </Col>
                                    <Col
                                        span={16}
                                        className="custom-info-content"
                                    >
                                        <span>
                                            {viewData.shortname && viewData.shortname.value?viewData.shortname.value:viewData.shortname}
                                        </span>
                                    </Col>
                                </Row>
                            </Col>
                            <Col span={12} className="custom-info-item">
                                <Row
                                    type="flex"
                                    gutter={10}
                                    align="middle"
                                >
                                    <Col
                                        span={8}
                                        className="custom-info-title"
                                    >
                                        <span>
                                            行业:
                                        </span>
                                    </Col>
                                    <Col
                                        span={16}
                                        className="custom-info-content"
                                    >
                                        <span>
                                            {
                                                viewData.industryName
                                            }
                                        </span>
                                    </Col>
                                </Row>
                            </Col>
                            
                            <Col span={12}  className="custom-info-item">
                                <Row
                                    type="flex"
                                    gutter={10}
                                    align="middle"
                                >
                                    <Col
                                        span={8}
                                        className="custom-info-title"
                                    >
                                        <span>
                                            客户类别:
                                        </span>
                                    </Col>
                                    <Col
                                        span={16}
                                        className="custom-info-content"
                                    >
                                        <span>
                                            {
                                                viewData.categoryName
                                            }
                                        </span>
                                    </Col>
                                </Row>
                            </Col>
                            <Col span={12}  className="custom-info-item">
                                <Row
                                    type="flex"
                                    gutter={10}
                                    align="middle"
                                >
                                    <Col
                                        span={8}
                                        className="custom-info-title"
                                    >
                                        <span>
                                            客户状态:
                                        </span>
                                    </Col>
                                    <Col
                                        span={16}
                                        className="custom-info-content"
                                    >
                                        <span>
                                            {
                                                 viewData.salesVOs && viewData.salesVOs.length?viewData.salesVOs[0].stateName:'无'
                                            }
                                        </span>
                                    </Col>
                                </Row>
                            </Col>
                            <Col span={12}  className="custom-info-item">
                                <Row
                                    type="flex"
                                    gutter={10}
                                    align="middle"
                                >
                                    <Col
                                        span={8}
                                        className="custom-info-title"
                                    >
                                        <span>
                                            客户价值:
                                        </span>
                                    </Col>
                                    <Col
                                        span={16}
                                        className="custom-info-content"
                                    >
                                        <span>
                                            {
                                                viewData.worthName
                                            }
                                        </span>
                                    </Col>
                                </Row>
                            </Col>
                            <Col span={12}  className="custom-info-item">
                                <Row
                                    type="flex"
                                    gutter={10}
                                    align="middle"
                                >
                                    <Col
                                        span={8}
                                        className="custom-info-title"
                                    >
                                        <span>
                                            上级客户:
                                        </span>
                                    </Col>
                                    <Col
                                        span={16}
                                        className="custom-info-content"
                                    >
                                        <span>
                                            {
                                                viewData.parentName
                                            }
                                        </span>
                                    </Col>
                                </Row>
                            </Col>
                            <Col span={12}  className="custom-info-item">
                                <Row
                                    type="flex"
                                    gutter={10}
                                    align="middle"
                                >
                                    <Col
                                        span={8}
                                        className="custom-info-title"
                                    >
                                        <span>
                                            云产品线:
                                        </span>
                                    </Col>
                                    <Col
                                        span={16}
                                        className="custom-info-content"
                                    >
                                        <span>
                                            {
                                                viewData.productLineName
                                            }
                                        </span>
                                    </Col>
                                </Row>
                            </Col>
                            <Col span={12}  className="custom-info-item">
                                <Row
                                    type="flex"
                                    gutter={10}
                                    align="middle"
                                >
                                    <Col
                                        span={8}
                                        className="custom-info-title"
                                    >
                                        <span>
                                            负责人:
                                        </span>
                                    </Col>
                                    <Col
                                        span={16}
                                        className="custom-info-content"
                                    >
                                        <span>
                                             {
                                                 viewData.salesVOs && viewData.salesVOs.length?viewData.salesVOs[0].ownerUserName:'无'
                                             }
                                        </span>
                                        
                                    </Col>
                                </Row>
                            </Col>
                            <Col span={12}  className="custom-info-item">
                                <Row
                                    type="flex"
                                    gutter={10}
                                    align="middle"
                                >
                                    <Col
                                        span={8}
                                        className="custom-info-title"
                                    >
                                        <span>
                                            部门:
                                        </span>
                                    </Col>
                                    <Col
                                        span={16}
                                        className="custom-info-content"
                                    >
                                        <span>
                                            {
                                                viewData.salesVOs && viewData.salesVOs.length?viewData.salesVOs[0].ownerDeptName:'无'
                                            }
                                        </span>
                                    </Col>
                                </Row>
                            </Col>
                            <Col span={12}  className="custom-info-item">
                                <Row
                                    type="flex"
                                    gutter={10}
                                    align="middle"
                                >
                                    <Col
                                        span={8}
                                        className="custom-info-title"
                                    >
                                        <span>
                                            创建人:
                                        </span>
                                    </Col>
                                    <Col
                                        span={16}
                                        className="custom-info-content"
                                    >
                                        <span>
                                            {
                                                viewData.createdUserName
                                            }
                                        </span>
                                    </Col>
                                </Row>
                            </Col>
                            <Col span={12}  className="custom-info-item">
                                <Row
                                    type="flex"
                                    gutter={10}
                                    align="middle"
                                >
                                    <Col
                                        span={8}
                                        className="custom-info-title"
                                    >
                                        <span>
                                            创建时间:
                                        </span>
                                    </Col>
                                    <Col
                                        span={16}
                                        className="custom-info-content"
                                    >
                                        <span>
                                            {
                                                viewData.salesVOs && viewData.salesVOs.length?
                                                    viewData.salesVOs[0].createdTime?
                                                    this.changeTime(viewData.salesVOs[0].createdTime.time)[0]
                                                    :'无' 
                                                :'无'
                                            }
                                        </span>
                                    </Col>
                                </Row>
                            </Col>
                            <Col span={12}  className="custom-info-item">
                                <Row
                                    type="flex"
                                    gutter={10}
                                    align="middle"
                                >
                                    <Col
                                        span={8}
                                        className="custom-info-title"
                                    >
                                        <span>
                                            修改时间:
                                        </span>
                                    </Col>
                                    <Col
                                        span={16}
                                        className="custom-info-content"
                                    >
                                        <span>
                                            {
                                               viewData.salesVOs && viewData.salesVOs.length?
                                                    viewData.salesVOs[0].modifiedTime?
                                                    this.changeTime(viewData.salesVOs[0].modifiedTime.time)[0]
                                                    :'无' 
                                               :'无'
                                            }
                                        </span>
                                    </Col>
                                </Row>
                            </Col>
                            <Col span={12}  className="custom-info-item">
                                <Row
                                    type="flex"
                                    gutter={10}
                                    align="middle"
                                >
                                    <Col
                                        span={8}
                                        className="custom-info-title"
                                    >
                                        <span>
                                            来源线索:
                                        </span>
                                    </Col>
                                    <Col
                                        span={16}
                                        className="custom-info-content"
                                    >
                                        <span>
                                            {
                                                viewData.stateName
                                            }
                                        </span>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </Panel>
                    <Panel key="2" header="&nbsp;" header='联系方式'>
                        <Row>
                            <Col span={12}  className="custom-info-item">
                                <Row
                                    type="flex"
                                    gutter={10}
                                    align="middle"
                                >
                                    <Col
                                        span={8}
                                        className="custom-info-title"
                                    >
                                        <span>
                                            电话:
                                        </span>
                                    </Col>
                                    <Col
                                        span={16}
                                        className="custom-info-content"
                                    >
                                        <span>
                                            {viewData.tel && viewData.tel.value?viewData.tel.value:viewData.tel}                                            
                                        </span>
                                    </Col>
                                </Row>
                            </Col>
                            <Col span={12}  className="custom-info-item">
                                <Row
                                    type="flex"
                                    gutter={10}
                                    align="middle"
                                >
                                    <Col
                                        span={8}
                                        className="custom-info-title"
                                    >
                                        <span>
                                            邮箱:
                                        </span>
                                    </Col>
                                    <Col
                                        span={16}
                                        className="custom-info-content"
                                    >
                                        <span>
                                            {viewData.email && viewData.email.value?viewData.email.value:viewData.email}  
                                        </span>
                                    </Col>
                                </Row>
                            </Col>
                            <Col span={12}  className="custom-info-item">
                                <Row
                                    type="flex"
                                    gutter={10}
                                    align="middle"
                                >
                                    <Col
                                        span={8}
                                        className="custom-info-title"
                                    >
                                        <span>
                                            网址:
                                        </span>
                                    </Col>
                                    <Col
                                        span={16}
                                        className="custom-info-content"
                                    >
                                        <span>
                                            {viewData.website && viewData.website.value?viewData.website.value:viewData.website}  
                                        </span>
                                    </Col>
                                </Row>
                            </Col>
                            <Col span={12}  className="custom-info-item">
                                <Row
                                    type="flex"
                                    gutter={10}
                                    align="middle"
                                >
                                    <Col
                                        span={8}
                                        className="custom-info-title"
                                    >
                                        <span>
                                            地址:
                                        </span>
                                    </Col>
                                    <Col
                                        span={16}
                                        className="custom-info-content"
                                    >
                                        <span>
                                            {
                                                this.createAddress(viewData)
                                            }
                                        </span>
                                    </Col>
                                </Row>
                            </Col>
                            <Col span={12} className="custom-info-item">
                                <Row
                                    type="flex"
                                    gutter={10}
                                    align="middle"
                                >
                                    <Col
                                        span={8}
                                        className="custom-info-title"
                                    >
                                        <span>
                                            客户概要:
                                        </span>
                                    </Col>
                                    <Col
                                        span={16}
                                        className="custom-info-content"
                                    >
                                        <span>
                                            {viewData.summary && viewData.summary.value?viewData.summary.value:viewData.summary}  
                                        </span>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                </Panel>
                <Panel key="3" header="&nbsp;" header='客户身份'>
                    <Row>
                        <Col span={12} className="custom-info-item">
                            <Row
                                type="flex"
                                gutter={10}
                                align="middle"
                            >
                                <Col
                                    span={8}
                                    className="custom-info-title"
                                >
                                    <span>
                                        注册资本:
                                    </span>
                                </Col>
                                <Col
                                    span={16}
                                    className="custom-info-content"
                                >
                                    <span>
                                         {viewData.regCapital && viewData.regCapital.value?viewData.regCapital.value:viewData.regCapital} 
                                    </span>
                                </Col>
                            </Row>
                        </Col>
                        <Col span={12} className="custom-info-item">
                            <Row
                                type="flex"
                                gutter={10}
                                align="middle"
                            >
                                <Col
                                    span={8}
                                    className="custom-info-title"
                                >
                                    <span>
                                        营业额(万元):
                                    </span>
                                </Col>
                                <Col
                                    span={16}
                                    className="custom-info-content"
                                >
                                    <span>
                                        {viewData.turnover && viewData.turnover.value?viewData.turnover.value:viewData.turnover} 
                                    </span>
                                </Col>
                            </Row>
                        </Col>
                        <Col span={12} className="custom-info-item">
                            <Row
                                type="flex"
                                gutter={10}
                                align="middle"
                            >
                                <Col
                                    span={8}
                                    className="custom-info-title"
                                >
                                    <span>
                                        员工数:
                                    </span>
                                </Col>
                                <Col
                                    span={16}
                                    className="custom-info-content"
                                >
                                    <span>
                                        {viewData.employeeNum && viewData.employeeNum.value?viewData.employeeNum.value:viewData.employeeNum} 
                                    </span>
                                </Col>
                            </Row>
                        </Col>
                        <Col span={12} className="custom-info-item">
                            <Row
                                type="flex"
                                gutter={10}
                                align="middle"
                            >
                                <Col
                                    span={8}
                                    className="custom-info-title"
                                >
                                    <span>
                                        法定代表人:
                                    </span>
                                </Col>
                                <Col
                                    span={16}
                                    className="custom-info-content"
                                >
                                    <span>
                                        {viewData.legalRepresent && viewData.legalRepresent.value?viewData.legalRepresent.value:viewData.legalRepresent} 
                                    </span>
                                </Col>
                            </Row>
                        </Col>
                        <Col span={12} className="custom-info-item">
                            <Row
                                type="flex"
                                gutter={10}
                                align="middle"
                            >
                                <Col
                                    span={8}
                                    className="custom-info-title"
                                >
                                    <span>
                                        纳税人识别号:
                                    </span>
                                </Col>
                                <Col
                                    span={12}
                                    className="custom-info-content"
                                >
                                    <span>
                                        {viewData.taxpayerNo && viewData.taxpayerNo.value?viewData.taxpayerNo.value:viewData.taxpayerNo} 
                                    </span>
                                </Col>
                                {/* <Col span={4}>
                                    <UploadImg/>
                                </Col> */}
                            </Row>
                        </Col>
                    
                        <Col span={12} className="custom-info-item">
                            <Row
                                type="flex"
                                gutter={10}
                                align="middle"
                            >
                                <Col
                                    span={8}
                                    className="custom-info-title"
                                >
                                    <span>
                                        工商注册号:
                                    </span>
                                </Col>
                                <Col
                                    span={12}
                                    className="custom-info-content"
                                >
                                    <span>
                                        {viewData.bizRegno && viewData.bizRegno.value?viewData.bizRegno.value:viewData.bizRegno}
                                    </span>
                                </Col>
                                {/* <Col span={4}>
                                    <UploadImg/>
                                </Col> */}
                            </Row>
                        </Col>
                        <Col span={12} className="custom-info-item">
                            <Row
                                type="flex"
                                gutter={10}
                                align="middle"
                            >
                                <Col
                                    span={8}
                                    className="custom-info-title"
                                >
                                    <span>
                                        组织机构代码:
                                    </span>
                                </Col>
                                <Col
                                    span={12}
                                    className="custom-info-content"
                                >
                                    <span>
                                        {viewData.orgCode && viewData.orgCode.value?viewData.orgCode.value:viewData.orgCode}
                                    </span>
                                </Col>
                                {/* <Col span={4}>
                                    <UploadImg/>
                                </Col> */}
                            </Row>
                        </Col>
                    </Row>
                </Panel>
            </Collapse>
        )
    }
}

function mapStateToProps(state, ownProps) {
    return {
        $$state: state.customerList,
    };
}
//绑定action到组件props
function mapDispatchToProps(dispatch) {
    return {
        action: bindActionCreators(Actions, dispatch)
    };
}
//输出绑定state和action后组件
export default connect(mapStateToProps, mapDispatchToProps)(DetailObject);


