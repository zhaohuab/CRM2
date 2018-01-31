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
import * as Actions from "../../action";
import reqwest from "utils/reqwest";
import { cum as url, doc, baseDir,oppstage ,opportunity,contacts} from "api";

import ContactsCard from './ContactsCard'
import Opportunity from './Opportunity'
import * as objTypeConst from 'utils/const/ObjTypeConst'
import ContactsModal from './ContactsDetailModal'
import OppModal from './OppDetailModal'
import Upload from './Upload'
import RelFile from './RelFile'


class RelevantObject extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            visiable:false,
            contactsData:{},
            oppvisiable:false,
            oppData:[],
        }
    }
    //上传图片之前的操作
    beforeUpload(file,index,items){
        
        let type = ['.bmp', '.gif','.jpeg' ,'.html','.txt' ,'.vsd' ,'.ppt' ,'.doc' ,'.xml','.jpg' ,'.png' ,'.xlsx']
        let pos = file.name.lastIndexOf('.')
        let end = file.name.slice(pos)
        if(type.indexOf(end)){
            return true
        }else{
            //保存信息写不符合上传类型
            return false
        }
    }

    //上传图片成功
    fileSuccess(file){
        //把拿到的数据放在已有图片数据中
        //点击某一个文件能下载，是图片类型才能预览
        //IE iframe chorm/firefox a downlond下载文件
        //safiri // window.open('http://image.baidu.com/search/down?tn=download&ipn=dwnl&word=download&ie=utf8&fr=result&url=http%3A%2F%2Fwww.th7.cn%2Fd%2Ffile%2Fp%2F2014%2F07%2F04%2Feb26cd61a6c822839b70e7784fe90685.jpg&thumburl=http%3A%2F%2Fimg3.imgtn.bdimg.com%2Fit%2Fu%3D925173830%2C3059306923%26fm%3D27%26gp%3D0.jpg', '_self');
        this.props.action.fileSuccess(file);
    }

    //遍历折叠表头
    headerFn(obj){
        let {viewData,viewDataRelevant} = this.props.$$state.toJS();

        let temp
        if(obj.index==3){
            temp = viewDataRelevant[4].list.data.length
        }else if(viewDataRelevant[obj.index-1].list){
            temp = viewDataRelevant[obj.index-1].list.data.length
        }else{
            temp=0
        }
      
        let  icon = ['icon-canyuren','icon-lianxirenguanxi','icon-xiansuofenpei','icon-shengji','icon-wenjian']
        let fn = [
            [<i className={'iconfont icon-lianxiren'}/>,<ContactsCard/>],
            <Opportunity viewData={viewData} otherRef={this.otherRef.bind(this)}/>,
            '',
            <Upload 
                disabled = {false} 
                multiple={true}
                objType={objTypeConst.CUSTOMER}
                objId={viewData.id}         
                beforeUpload = {this.beforeUpload.bind(this)}
                success = {this.fileSuccess.bind(this)}
            >
                <i className='iconfont icon-shangchuan'/>
            </Upload>
        ]
        
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

    //更改时间
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

    otherRef(){   
        let {viewData} = this.props.$$state.toJS();
        this.props.action.getOppList(this.props.JoinPagination,viewData.id,2)
    }

    //删除商机
    oppDel(id,e){
        e.stopPropagation()
        this.props.action.delOpp(
            id,
            this.props.JoinPagination
        );
    }

    //删除联系人
    delContacts(id,e){
        e.stopPropagation()
        this.props.action.delContacts(
            id,
            this.props.JoinPagination
        )
    }

    //展示联系人详情
    contactsDetailModal(item,e){
        
        e.stopPropagation();
        reqwest(
            {
                url: baseDir+`/cum/contacts/${item.id}`,
                method: "GET",
            },
            result => {
                
                this.setState({
                    visiable:true,
                    contactsData:result
                })
            }
        );
    }
    //关闭联系人详情
    cancelContacts(){
        this.setState({
            visiable:false,
        })
    }

    //展示商机详情
    oppDetailModal(item,e){
        
        e.stopPropagation();
        reqwest({
            url: opportunity.opportunity + "/" + item.id,
            method: 'GET',
        }, (data) => {
            
            this.setState({
                oppvisiable:true,
                oppData:data,
            })
        })
        return false
    }

    //关闭商机详情
    cancelOpp(){
        this.setState({
            oppvisiable:false,
        })
    }

    onDeleteFile(file) {
        return (e) => {
            this.props.action.onDeleteFile(file);
        }
    }
    render(){
        let {viewData,viewDataRelevant} = this.props.$$state.toJS();
        let tempContacts,tempOpport,tempUpgrade,tempFile;
        
        if(viewDataRelevant&&viewDataRelevant.length){
            tempContacts = viewDataRelevant[0].list.data
            if(tempContacts.length>=8){
                tempContacts = tempContacts.slice(0,7)
            }
            tempOpport = viewDataRelevant[2].list.data
            if(tempOpport.length>=6){
                tempOpport = tempOpport.slice(0,5)
            }
            tempFile = viewDataRelevant[3].list.data;
            tempUpgrade = viewDataRelevant[4].list.data;
            if(tempUpgrade.length>=8){
                tempUpgrade = tempUpgrade.slice(0,7)
            }
        }
        let type = ['icon-xsl','icon-word','icon-ppt']
       
        return(
            <div className='relevant-wapper' id='relevant-wapper-item'>
                <Collapse defaultActiveKey={['1','2','3','4']}>
                    <Panel header={this.headerFn({title:'联系人',index:1})} key="1">
                        <div className='contacts-warpper'>
                        {
                            tempContacts && tempContacts.length?
                            tempContacts.map((item,index)=>{
                                return(
                                    <Row className='contacts-warpper-item' onClick={this.contactsDetailModal.bind(this,item)}>
                                        <Col span={8} className='left'>
                                                <Row className='parmary' type='flex' align='top'><i className='iconfont icon-zhuyaolianxiren' /></Row>
                                                <Row className='name' type='flex' justify='center'><span>{item.name}</span></Row>
                                                <Row className='position' type='flex' justify='center'><span>销售总监</span></Row>
                                        </Col>
                                        <Col span={16} className='right'>
                                                <Row  type='flex' justify='center' align='bottom' className='content1'><span className='key'>角色：</span><span className='value' title={item.role}>{item.role}</span></Row>
                                                <Row  type='flex' justify='center' align='top' className='content2'><span className='key'>态度：</span><span className='value'>{item.attitude}</span></Row>
                                        </Col>
                                        <span className='del' onClick={this.delContacts.bind(this,item.id)}><i className='iconfont icon-canyuren-shanchu'/></span>
                                    </Row>
                                )
                            }):'暂无数据'
                        }
                        {
                            viewDataRelevant && viewDataRelevant.length && viewDataRelevant[0].list.data.length>7?
                            <div className='contacts-warpper-item item-more'><span className='more'>更多</span><i className='iconfont icon-gengduo'/></div>:''
                        }
                        </div>
                    </Panel>
                    
                    <Panel header={this.headerFn({title:'商机',index:2})} key="2" >
                        <div className='business-chance'>
                                {
                                    tempOpport && tempOpport.length?
                                    tempOpport.map((item)=>{
                                        return(
                                            <Row className='business-chance-item' type='flex' justify='space-between' onClick={this.oppDetailModal.bind(this,item)}>
                                                <Col span={5} className='left'>
                                                    <i className='iconfont icon-shangji'/>
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
                                                        <Col className='main' span={22}>
                                                        <p className='name'>{item.name}</p>
                                                        <Row className='minor' type='flex'><Col span={13} className='text-right'>销售阶段：</Col><Col span={11}>{item.saleStageName}</Col></Row>
                                                        <Row className='minor' type='flex'><Col span={13} className='text-right'>阶段停留时间：</Col><Col span={11}>{item.stageResidenceTime}</Col></Row>
                                                        <Row className='minor' type='flex'><Col span={13} className='text-right'>赢单概率：</Col><Col span={11}>{item.winProbability}%</Col></Row>
                                                        <Row className='minor' type='flex'><Col span={13} className='text-right'>预计签单金额：</Col><Col span={11}>￥{item.expectSignMoney}.00</Col></Row>
                                                    
                                                        </Col>
                                                    </Row>
                                                    <Row className='time' type='flex' align='middle' style={{height:'20%'}}><span>预计签单时间：{item.expectSignTime?this.changeTime.call(this,item.expectSignTime.time,'day'):'无'}</span></Row>
                                                </Col>
                                                <span className='del' onClick={this.oppDel.bind(this,item.id)}><i className='iconfont icon-canyuren-shanchu'/></span>
                                            </Row>
                                        )
                                    }):'暂无数据'
                                }
                                {
                                    viewDataRelevant && viewDataRelevant.length && viewDataRelevant[2].list.data.length>5?
                                    <div className='business-chance-item item-more'><span className='more'>更多</span><i className='iconfont icon-gengduo'/></div>:''
                                }
                        </div>
                    </Panel>
                    <Panel header={this.headerFn({title:'升级申请',index:3})}  key="3" >
                        <div className='business-chance'>
                            {
                                tempUpgrade && tempUpgrade.length?
                                tempUpgrade.map((item)=>{
                                    return(
                                        <Row className='business-chance-item' type='flex' justify='space-between' >
                                            <Col span={5} className='left'>
                                                <i className='iconfont icon-shengji'/>
                                            </Col>
                                            <Col span={19} className='right'>
                                                <Row type='flex' className='main-top' style={{height:'100%'}}>
                                                    <Col className='decoret-warpper'>
                                                        <span className='circle'></span>
                                                        <span className='smail-circle style1'></span>
                                                        <span className='smail-circle style1'></span>
                                                        <span className='smail-circle style1'></span>
                                                        <span className='smail-circle style1'></span>
                                                        <span className='smail-circle style1'></span>
                                                        <span className='smail-circle style1'></span>
                                                        <span className='smail-circle style1'></span>
                                                        <span className='smail-circle style1'></span>
                                                        <span className='circle'></span>
                                                    </Col>
                                                    <Col className='main' span={22}>
                                                        <p className='name'>
                                                        {item.commitTime?this.changeTime.call(this,item.commitTime.time,'day'):'无'}
                                                        </p>
                                                        <Row type='flex' align='middle' className='main-height'><div className='mian-left'>申请公司：</div><div className='mian-right' title = {item.orgName}></div></Row>
                                                        <Row type='flex' align='middle' className='main-height'><div className='mian-left'>申请部门：</div><div className='mian-right' title = {item.orgName}>{item.deptName}</div></Row>
                                                        <Row type='flex' align='middle' className='main-height'><div className='mian-left'>申请人：</div><div className='mian-right' title = {item.orgName}>{item.applyUserName}</div></Row>
                                                        <Row type='flex' align='middle' className='main-height'><div className='mian-left'>审批状态：</div><div className='mian-right' title = {item.orgName}>{item.approvalStateName}</div></Row>
                                                    </Col>
                                                </Row>
                                            </Col>
                                            {/* <span className='del'><i className='iconfont icon-canyuren-shanchu'/></span> */}
                                        </Row>
                                    )
                                }):'暂无数据'
                            }
                            {
                                viewDataRelevant && viewDataRelevant.length && viewDataRelevant[4].list.data.length>5?
                                <div className='business-chance-item upgrade-item item-more'><span className='more'>更多</span><i className='iconfont icon-gengduo'/></div>:''
                            }
                        </div>
                    </Panel>
                    <Panel header={this.headerFn({title:'文件',index:4})}  key="4" >
                        <RelFile files={tempFile} onDeleteFile={this.onDeleteFile.bind(this)}/>
                    </Panel>
            </Collapse>
            <ContactsModal visiable={this.state.visiable} data={this.state.contactsData} cancel={this.cancelContacts.bind(this)}/>
            <OppModal visiable={this.state.oppvisiable} data={this.state.oppData} cancel={this.cancelOpp.bind(this)}/>
          </div>
        )
    }
}

//绑定状态到组件props
function mapStateToProps(state, ownProps) {
    return {
        $$state: state.customerList,
        $$stateOpp: state.opportunityList,
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