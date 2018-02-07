import {
    Modal,
    Cascader,
    Select,
    Form,
    Row,
    Col,
    Input,
    Button,
    Icon,
    Menu,
    Dropdown,
    Tree,
    Table
} from "antd";

import "assets/stylesheet/all/iconfont.css";

import OwnUser from '../list/OwnUser'
import PersonChioce from '../../../../common/personChoice'

import { baseDir } from "api";
import reqwest from "utils/reqwest";

const columns = [{
    title: '姓名',
    dataIndex: 'name',
    key: 'name',
  }];

export default class PersonChoiceModal extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            visible:false,
            treeList:[],
            personList:[],
            result:'',
            selectedTableRowKeys:[],
            selectedTreeKeys:[],
            visibleModify:false,
            valueModify:{}
        }
    }

    //点击分配方法
    getTreeList(){
        let { viewData } = this.props
        let ownerUserId = viewData.salesVOs[0].ownerUserId
        let orgId = viewData.orgId
        
        if(ownerUserId){
            this.setState({
                visibleModify:true,
            })
        }else{
            reqwest(
                {
                    url: baseDir+'sys/orgs/orgTree',
                    method: "GET",
                    data:{
                        param:{
                            orgType:2,
                            fatherorgId:orgId
                        }
                    }
                },
                result => {
                    
                    this.setState({
                        visible:true,
                        treeList:result.data
                    })
                }
            );
        }
    }

     //分配获取人员列表方法
     getTableList(page,pageSize,selectedKeys){
        let { viewData } = this.props
        let orgId = viewData.orgId;//组织id
        let deptId = selectedKeys[0];//部门id
        let searchMap = {orgId,deptId}
        reqwest(
            {
                url: baseDir+'sys/users/ref',
                method: "GET",
                data:{
                    param:{
                        page,pageSize,searchMap
                    }
                }
            },
            result => {
                
                this.setState({
                    visible:true,
                    personList:result,
                    selectedTreeKeys:selectedKeys
                })
            }
        );
    }

    //table选择人员方法
    selectedTableList(selectedRowKeys,selectedRows){
        this.setState({
            result:{id:selectedRowKeys[0],value:selectedRows[0].name},
            selectedTableRowKeys:selectedRowKeys
        })
    }

    //分配modal确定
    onOk(){
        if(!this.state.result){
            this.setState({
                visible:false,
                treeList:[],
                personList:[],
                selectedTableRowKeys:[],
                selectedTreeKeys:[],
                result:''
            })
            return
        }
        let { viewData } = this.props
        let id = viewData.salesVOs[0].id
        let salesVOs = {ownerUserId:this.state.result.id}

        reqwest(
            {
                url: baseDir + "/cum/customersales/" +id,
                method: "PUT",
                data: {
                    param: salesVOs
                }
            },
            data => {
                if(data){
                    
                    let nv = viewData.salesVOs[0]
                    if(this.state.result){
                        nv.ownerUserName = this.state.result.value
                        nv.ownerUserId = this.state.result.id
                        viewData.ownerUserId = {id:nv.ownerUserId,name:nv.ownerUserName}    
                        //{id: 60, name: "李天赐"}
                        this.props.changeViewData(viewData)
                    }
                }
                
                this.setState({
                    visible:false,
                    treeList:[],
                    personList:[],
                    selectedTableRowKeys:[],
                    selectedTreeKeys:[],
                    result:''
                })
            }
        );
    }

    //分配modal取消
    onCancel(){
        this.setState({
            visible:false,
            treeList:[],
            personList:[],
            selectedTableRowKeys:[],
            selectedTreeKeys:[],
            result:''
        })
    }

    /**
     * 分配变更代码
     */
    
     //分配变更modal确定
     handleModifyOk(){
         
        if(!this.state.valueModify){
            this.setState({
                visibleModify:false,
                valueModify:{}
            })
            return
        }
        let { viewData } = this.props
        let id = viewData.salesVOs[0].id
        let salesVOs = {ownerUserId:this.state.valueModify.id}
        
        reqwest(
            {
                url: baseDir + "/cum/customersales/" +id,
                method: "PUT",
                data: {
                    param: salesVOs
                }
            },
            data => {
                
                if(data){
                    let nv = viewData.salesVOs[0]
                    if(this.state.valueModify){
                        nv.ownerUserName = this.state.valueModify.name
                        nv.ownerUserId = this.state.valueModify.id
                        viewData.ownerUserId = {id:nv.ownerUserId,name:nv.ownerUserName}  
                        this.props.changeViewData(viewData)
                    }
                }
                this.setState({
                    visibleModify:false,
                    valueModify:{}
                })
            }
        );
        
    }

    //分配变更modal取消
    handleModifyCancel(){
        this.setState({
            visibleModify:false,
        })
    }

    //分配变更中，选择负责人中的input值发生改变
    onModifyChange(valueModify){
        this.setState({
            valueModify
        })
    }

    render(){
        let { viewData } = this.props
        return(
            <div>
                {
                    this.props.title?this.props.title:<Button onClick={this.getTreeList.bind(this)}><i className="iconfont icon-fenpeijiaose" />分配</Button>
                }
                <Modal
                    title="分配"
                    visible={this.state.visible}
                    onOk={this.onOk.bind(this)}
                    onCancel={this.onCancel.bind(this)}
                    width={500}
                    maskClosable={false}
                    className='crm-list-panel-assign-modal'
                >  
                   <div className='height'>
                        <PersonChioce 
                            data={this.state.treeList}  //获取所有部门数据
                            personList = {this.state.personList}//人员列表数据
                            selectList={this.getTableList.bind(this)} //点击获取部门人员方法
                            selectedTableList = {this.selectedTableList.bind(this)}//table选中
                            selectedRowKeys = {this.state.selectedTableRowKeys}
                            selectedKeys = {this.state.selectedTreeKeys}
                            columns = {columns}
                            height= {300}
                        />
                    </div>
                </Modal>
                <Modal
                    title="变更"
                    visible={this.state.visibleModify}
                    onOk={this.handleModifyOk.bind(this)}
                    onCancel={this.handleModifyCancel.bind(this)}
                    width={400}
                    maskClosable={false}
                    className='crm-list-panel-change-modal'
                >   
                   <div className='height'>
                        <Row type='flex' align='middle' className='change-person-item'>
                            <Col span={6} offset={2}>
                                <Row type='flex' justify='end'>现负责人：</Row>
                            </Col>
                            <Col span={10}>{viewData.salesVOs && viewData.salesVOs.length?viewData.salesVOs[0].ownerUserName:''}</Col>
                        </Row>
                        <Row type='flex' align='middle' className='change-person-item'>
                            <Col span={6} offset={2}>
                                <Row type='flex' justify='end'>调整负责人：</Row>
                            </Col> 
                            <Col span={10}>
                                <OwnUser viewData={viewData} disabled={false} width={500} height={300} onChange={this.onModifyChange.bind(this)} value={this.state.valueModify}/>
                            </Col>
                        </Row>
                   </div>
                </Modal>
            </div>
        )
    }
}