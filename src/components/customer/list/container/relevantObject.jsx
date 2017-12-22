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


export default class RelevantObject extends React.Component {
    aa(e){
       
        e.stopPropagation()

    }
    headerFn(obj){
        let  icon = ['icon-canyuren','icon-lianxirenguanxi','icon-xiansuofenpei','icon-shangji','icon-wenjian']
        let fn = ['']
        return(
            <Row className='relevant-title' type='flex' justify='space-between' align='middle'>
                <Col className='left'><i className={'iconfont '+icon[obj.index]} /><span>{obj.title}</span></Col>
                <Col className='right'>
                    {
                        obj.newBtn == 'add'?<i className={'iconfont icon-tianjia'} onClick={this.aa.bind(this)}/>:''
                    }
                </Col>
            </Row>
        )
    }
    render(){
        
        return(
            <div className='relevant-wapper' id='relevant-wapper-item'>
                <Collapse defaultActiveKey={['1']}>
                    <Panel header={this.headerFn({title:'参与人',index:0,newBtn:'add'})} key="1">
                        <div className='join-warpper'>
                            <p className='join-warpper-item'> 
                                <div>
                                    <img
                                        src={require("assets/images/header/photo.png")}
                                        className="join-image"
                                    />
                                </div>
                                <div>
                                    最多五个字
                                </div>
                                
                            </p>
                        </div>
                    </Panel>
                    <Panel header={this.headerFn({title:'联系人',index:1,newBtn:'add'})} key="2">
                    2
                    </Panel>
                    <Panel header={this.headerFn({title:'线索',index:2,newBtn:'false'})} key="3" >
                    3
                    </Panel>
                    <Panel header={this.headerFn({title:'商机',index:3,newBtn:'add'})} key="4" >
                    3
                    </Panel>
                    <Panel header={this.headerFn({title:'文件',index:4,newBtn:'add',type:'file'})}  key="5" >
                    3
                    </Panel>
            </Collapse>
          </div>
        )
    }
}