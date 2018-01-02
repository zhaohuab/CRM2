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
        let {viewData} = this.props.$$state.toJS();
        let  icon = ['icon-canyuren','icon-lianxirenguanxi','icon-xiansuofenpei','icon-shangji','icon-wenjian']
    let fn = [[<ContactsCard/>,<i className={'iconfont icon-lianxiren'}/>],'',<i className={'iconfont icon-tianjia'}/>,<i className={'iconfont icon-tianjia'}/>]
    debugger    
    return(
            <Row className='relevant-title' type='flex' justify='space-between' align='middle'>
                <Col className='left'>
                    <i className={'iconfont '+icon[obj.index]} />
                    <span>{obj.title}</span>
                    {
                        obj.data?<span>({obj.data[0].contactList.data.length})</span>:<span>(0)</span>
                    }
                    
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

    changeViewData(){

    }

    joinDelFn(item){

    }

    render(){
        let {viewData,viewDataRelevant} = this.props.$$state.toJS();
        
        
        return(
            <div className='relevant-wapper' id='relevant-wapper-item'>
                <Collapse defaultActiveKey={['1','2','3','4']}>
                    <Panel header={this.headerFn({title:'联系人',index:1,newBtn:'add',data:viewDataRelevant&&viewDataRelevant.length?viewDataRelevant:''})} key="1">
                        <div className='contacts-warpper'>
                        {
                            viewDataRelevant&&viewDataRelevant.length?
                            viewDataRelevant[0].contactList.data.map((item)=>{
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
                        </div>
                    </Panel>
                    <Panel header={this.headerFn({title:'线索',index:2,newBtn:'false'})} key="2" >
                    3
                    </Panel>
                    <Panel header={this.headerFn({title:'商机',index:3,newBtn:'add'})} key="3" >
                    3
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