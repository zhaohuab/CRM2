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
import UploadImg from "./uploadImg";

export default class DetailObject extends React.Component {

     translate = (data) => {     
            switch(data.fieldApiName){
                case 'level':
                data.fieldApiName='levelName';
                break;
                case 'industry':
                data.fieldApiName='industryName';
                break;
                case 'cannelType':
                data.fieldApiName='cannelTypeName';
                break;
            }
            return data.fieldApiName
    } 

    render(){
        let { viewData, detailFilds } = this.props
        return(
                <Collapse
                    defaultActiveKey={["1", "2", "3"]}
                >
                    {
                        detailFilds.map((item,index) => {
                            let { fieldList } = item;
                            let key = index+1; 
                            return (
                                <Panel key={key} header={item.blockName}>
                                    <Row className="custom-info">
                                        {
                                            fieldList.map(item=>{
                                                
                                                return (
                                                    <Col span={12}>
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
                                                                    {item.fieldName}:
                                                                </span>
                                                            </Col>
                                                            <Col
                                                                span={16}
                                                                className="custom-info-content"
                                                            >
                                                                <span>
                                                                    {
                                                                        viewData[item.displayName]||'无'
                                                                    }
                                                                </span>
                                                            </Col>
                                                        </Row>
                                                    </Col>
                                                )
                                            })
                                        }
                                        
                                    </Row>
                                </Panel>
                            )
                        })
                    }
               
            </Collapse>
        )
    }
}


