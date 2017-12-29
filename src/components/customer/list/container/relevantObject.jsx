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
import { browserHistory } from "react-router";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as Actions from "../action";

import ContactsCard from './contactsCard'

class RelevantObject extends React.Component {
    headerFn(obj){
        let {viewData,viewDataRelevant} = this.props.$$state.toJS();
        debugger
        let temp
        if(viewDataRelevant[obj.index-1].list){
            temp = viewDataRelevant[obj.index-1].list.data.length
           
        }else{
            temp=0
        }
        console.log(temp)
      
        let  icon = ['icon-canyuren','icon-lianxirenguanxi','icon-xiansuofenpei','icon-shangji','icon-wenjian']
    let fn = [[<ContactsCard/>,<i className={'iconfont icon-lianxiren'}/>],'',<i className={'iconfont icon-tianjia'}/>,<i className={'iconfont icon-tianjia'}/>]
    debugger    
    return(
            <Row className='relevant-title' type='flex' justify='space-between' align='middle'>
                <Col className='left'>
                    <i className={'iconfont '+icon[obj.index]} />
                    <span>{obj.title}</span>
                    <span>({temp})</span>
                </Col>
                <Col className='right'>
                    {
                       obj.index==1?
                       <div className='right-combine'>
                           {fn[0][0]}
                           {fn[0][1]}
                       </div>
                       :fn[obj.index-1]
                    }
                </Col>
            </Row>
        )
    }

    render(){
        let {viewData,viewDataRelevant} = this.props.$$state.toJS();
        let tempContacts,tempClue
        if(viewDataRelevant&&viewDataRelevant.length){
            tempContacts = viewDataRelevant[0].list.data
            if(tempContacts.length>=8){
                tempContacts = tempContacts.slice(0,7)
            }
            tempClue = viewDataRelevant[2].list.data
            if(tempClue.length>=8){
                tempClue = tempClue.slice(0,7)
            }
        }
        
        debugger
        return(
            <div className='relevant-wapper' id='relevant-wapper-item'>
                <Collapse defaultActiveKey={['1','2','3','4']}>
                    <Panel header={this.headerFn({title:'联系人',index:1,newBtn:'add',data:viewDataRelevant&&viewDataRelevant.length?viewDataRelevant:''})} key="1">
                        <div className='contacts-warpper'>
                        {
                            tempContacts && tempContacts.length?
                            tempContacts.map((item,index)=>{
                                return(
                                    <Row className='contacts-warpper-item'>
                                        <Col span={8} className='left'>
                                                <Row className='parmary' type='flex' align='top'><i className='iconfont icon-zhuyaolianxiren' /></Row>
                                                <Row className='name' type='flex' justify='center'><span>{item.name}</span></Row>
                                                <Row className='position' type='flex' justify='center'><span>销售总监</span></Row>
                                        </Col>
                                        <Col span={16} className='right'>
                                                <Row  type='flex' justify='center' align='bottom' className='content1'><span className='key'>角色：</span><span className='value' title={item.role}>{item.role}</span></Row>
                                                <Row  type='flex' justify='center' align='top' className='content2'><span className='key'>态度：</span><span className='value'>{item.attitude}</span></Row>
                                        </Col>
                                    </Row>
                                )
                            }):'暂无数据'
                        }
                        {
                            viewDataRelevant && viewDataRelevant.length && viewDataRelevant[0].list.data.length>8?
                            <div className='contacts-warpper-item item-more'><span className='more'>更多</span><i className='iconfont icon-gengduo'/></div>:''
                        }
                        </div>
                    </Panel>
                    <Panel header={this.headerFn({title:'线索',index:2,newBtn:'false'})} key="2" >
                        <div className='clue-warpper'>
                            {
                                viewDataRelevant && viewDataRelevant.length?
                                viewDataRelevant[1].list.data.map((item)=>{
                                    return(
                                        <Row className='clue-warpper-item' type='flex' justify='space-between'>
                                            <Col span={5} className='left'>
                                                <i className='iconfont icon-shengji'/>
                                            </Col>
                                            <Col span={19} className='right'>
                                                <Row type='flex' className='main-top'>
                                                    <Col className='decoret-warpper'>
                                                        <span className='circle'></span>
                                                        <span className='smail-circle'></span>
                                                        <span className='smail-circle'></span>
                                                        <span className='smail-circle'></span>
                                                        <span className='smail-circle'></span>
                                                        <span className='smail-circle'></span>
                                                        <span className='smail-circle'></span>
                                                        <span className='circle'></span>
                                                    </Col>
                                                    <Col className='main' span={20}>
                                                    <p className='name'>{item.name}</p>
                                                    <p className='minor'>线索来源：{item.source}</p>
                                                    <p className='minor'>线索等级：{item.level}</p>
                                                    <p className='minor'>线索状态：{item.state}</p>
                                                    </Col>
                                                </Row>
                                                <Row className='time' type='flex' align='middle'><span>最后跟进时间：{item.followTime?this.changeTime(item.followTime):'无'}</span></Row>
                                            </Col>
                                        </Row>
                                    )
                                }):'暂无数据'
                            }
                        </div>
                    </Panel>
                    <Panel header={this.headerFn({title:'商机',index:3,newBtn:'add'})} key="3" >
                    <div className='clue-warpper'>
                            {
                                tempClue && tempClue.length?
                                tempClue.map((item)=>{
                                    return(
                                        <Row className='clue-warpper-item  business-chance-item' type='flex' justify='space-between'>
                                            <Col span={5} className='left'>
                                                <i className='iconfont icon-shengji'/>
                                            </Col>
                                            <Col span={19} className='right'>
                                                <Row type='flex' className='main-top' style={{height:'80%'}}>
                                                    <Col className='decoret-warpper'>
                                                        <span className='circle'></span>
                                                        <span className='smail-circle'></span>
                                                        <span className='smail-circle'></span>
                                                        <span className='smail-circle'></span>
                                                        <span className='smail-circle'></span>
                                                        <span className='smail-circle'></span>
                                                        <span className='smail-circle'></span>
                                                        <span className='smail-circle'></span>
                                                        <span className='smail-circle'></span>
                                                        <span className='circle'></span>
                                                    </Col>
                                                    <Col className='main' span={20}>
                                                    <p className='name'>{item.name}</p>
                                                    <Row className='minor' type='flex'><Col span={12} className='text-right'>销售阶段：</Col><Col span={12}>{item.saleStageName}</Col></Row>
                                                    <Row className='minor' type='flex'><Col span={12} className='text-right'>阶段停留时间：</Col><Col span={12}>{item.stageResidenceTime}</Col></Row>
                                                    <Row className='minor' type='flex'><Col span={12} className='text-right'>赢单概率：</Col><Col span={12}>{item.winProbability}</Col></Row>
                                                    <Row className='minor' type='flex'><Col span={12} className='text-right'>预计签单金额：</Col><Col span={12}>{item.expectSignMoney}</Col></Row>
                                                   
                                                    </Col>
                                                </Row>
                                                <Row className='time' type='flex' align='middle' style={{height:'20%'}}><span>预计签单时间：1</span></Row>
                                            </Col>
                                        </Row>
                                    )
                                }):'暂无数据'
                            }
                        </div>
                    </Panel>
                    <Panel header={this.headerFn({title:'文件',index:4,newBtn:'add',type:'file'})}  key="4" >
                    3
                    </Panel>
            </Collapse>
          </div>
        )
    }
}

//绑定状态到组件props
function mapStateToProps(state, ownProps) {
    return {
        $$state: state.customerList,
        $$stateCommon: state.componentReducer
    };
}
//绑定action到组件props
function mapDispatchToProps(dispatch) {
    return {
        action: bindActionCreators(Actions, dispatch)
    };
}
//输出绑定state和action后组件
export default connect(mapStateToProps, mapDispatchToProps)(RelevantObject);