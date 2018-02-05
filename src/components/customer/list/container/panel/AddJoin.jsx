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
import PersonChioce from '../../../../common/personChoice'
import { baseDir } from "api";
import reqwest from "utils/reqwest";

const columns = [{
    title: '姓名',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: '部门名称',
    dataIndex: 'deptName',
    key: 'deptName',
}];

export default class AddJoin extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            visible:false,
            treeList:[],
            personList:[],
            result:'',
            selectedTableRowKeys:[],
            selectedTreeKeys:[]
        }
    }

    //点击分配方法
     assignFn(e){
        e.stopPropagation()
        
        let { viewData } = this.props
        let orgId = viewData.orgId
        reqwest(
            {
                url: baseDir+'sys/orgs/orgTree',
                method: "GET",
                data:{
                    param:{
                        orgType:3,
                        fatherorgId:orgId
                    }
                }
            },
            result => {
                ;
                this.setState({
                    visible:true,
                    treeList:result.data
                })
            }
        );
    }

     //分配获取人员列表方法
     onSelectAssign(page,pageSize,selectedKeys){
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
                ;
                this.setState({
                    visible:true,
                    personList:result,
                    selectedTreeKeys:selectedKeys
                })
            }
        );
    }

//增加参与人modal确定
    handleOk(){
        let { viewData } = this.props
        let cumId = viewData.id    
        let userId = this.state.result.id
        if(cumId&&userId){
            reqwest(
                {
                    url: baseDir + 'cum/customer/relusers',
                    method: "POST",
                    data: {
                        param: {
                            cumId,
                            userId
                        }
                    }
                },
                data => {
                    debugger;
                    console.log('添加参与人后返回的数据==============',data)
                    if(data){                       
                        this.props.changeViewData(data)
                        // let nv = viewData.salesVOs[0]
                        // if(this.state.result){
                        //     nv.ownerUserName = this.state.result.value
                        //     nv.ownerUserId = this.state.result.id
                        //     viewData.ownerUserId = {id:nv.ownerUserId,name:nv.ownerUserName}    
                        //     //{id: 60, name: "李天赐"}
                        //     this.props.changeViewData(viewData)
                        // }
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
        }else{
             Modal.info({
                content: '请选择参与人！',
            });
        }      
    }

    //分配modal取消
    handleCancel(){
        this.setState({
            visible:false,
            treeList:[],
            personList:[],
            selectedTableRowKeys:[],
            selectedTreeKeys:[],
            result:''
        })
    }

    //选择table某一项方法
    selectedTableList(selectedRowKeys,selectedRows){
        debugger;
        this.setState({
            result:{id:selectedRowKeys[0],value:selectedRows[0].name},
            selectedTableRowKeys:selectedRowKeys
        })
    }

    render(){
        return(
            <div>
                <div className='add-contacts-btn' onClick={this.assignFn.bind(this)}>
                    <Icon type="plus" />
                </div>
                <Modal
                    title="增加参与人"
                    visible={this.state.visible}
                    onOk={this.handleOk.bind(this)}
                    onCancel={this.handleCancel.bind(this)}
                    width={700}
                    maskClosable={false}
                >   
                    <div className='crm-panel-join-modal'>
                        <PersonChioce 
                            data={this.state.treeList}  //获取所有部门数据
                            personList = {this.state.personList}//人员列表数据
                            selectList={this.onSelectAssign.bind(this)} //点击获取部门人员方法
                            selectedTableList = {this.selectedTableList.bind(this)}//table选中
                            selectedRowKeys = {this.state.selectedTableRowKeys}
                            selectedKeys = {this.state.selectedTreeKeys}
                            columns = {columns}
                        />
                    </div>
                </Modal>
            </div>
          
        )
    }
}