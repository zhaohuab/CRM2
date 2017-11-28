import { Row, Col } from 'antd';
import moment from 'moment'

class View extends React.Component {
    constructor(props) {
        super(props)
    }
    
    tranCol(item,dataSource) {
        
        return <Col className="ant-form-item" span={8}>
                    <Row>
                        <Col className="ant-form-item-label" span={5}>
                            {item.name}:&nbsp;
                        </Col>
                        <Col className="ant-form-item-control" span={19}>
                            {dataSource[item.key]}
                        </Col>
                    </Row>
                </Col>
    }
    transData(data) {
        data.companyCreatedTime = data.companyCreatedTime ? moment(data.companyCreatedTime.time).format("YYYY-MM-DD") : undefined;
        return data;
    }
    render() {
        
        const template = [{
            key:"companyName",
            name:"企业名称"
        },{
            key:"companyTypeName",
            name:"企业类型"
        },{
            key:"companySimpleName",
            name:"简称"
        },{
            key:"companyIndustry",
            name:"所属行业"
        },{
            key:"companyCreatedTime",
            name:"创立时间"
        },{
            key:"companyAddress",
            name:"总部地址"
        }]
        
        const dataSource = this.transData(this.props.dataSource/*dataSource*/);
        // const dataSource = {
        //     name:"华为集团",
        //     type:"集团型企业",
        //     shortname:"华为",
        //     industry:"互联网",
        //     createtime:"2017-10-24",
        //     address:"深圳***街***号"
        // }
        
        
        return (<div>
        <Row >
            {template.map((item) => {
                return this.tranCol(item,dataSource)
            })}  
        </Row>
        </div>)
    }
}
export default View;