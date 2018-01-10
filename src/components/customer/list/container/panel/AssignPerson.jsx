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
import PersonChioce from './PersonChioce'
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

export default class AssignPerson extends React.Component {
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
     assignFn(){
<<<<<<< HEAD
        //debugger
=======
        
>>>>>>> 312d46699d979d9b7f362833e04a0fd802dbca3c
        let { viewData } = this.props
        let orgId = viewData.orgId

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
<<<<<<< HEAD
                //debugger;
=======
                ;
>>>>>>> 312d46699d979d9b7f362833e04a0fd802dbca3c
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
<<<<<<< HEAD
                //debugger;
=======
                ;
>>>>>>> 312d46699d979d9b7f362833e04a0fd802dbca3c
                this.setState({
                    visible:true,
                    personList:result,
                    selectedTreeKeys:selectedKeys
                })
            }
        );
    }

    //分配modal确定
    handleOk(){
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
<<<<<<< HEAD
                    //debugger
=======
                    
>>>>>>> 312d46699d979d9b7f362833e04a0fd802dbca3c
                    let nv = viewData.salesVOs[0]
                    if(this.state.result){
                        nv.ownerUserName = this.state.result.value
                        nv.ownerUserId = this.state.result.id
                        viewData.ownerUserId = {id:nv.ownerUserId,name:nv.ownerUserName}    
                        //{id: 60, name: "李天赐"}
                        this.props.changeViewData(viewData)
                    }
                }
<<<<<<< HEAD
                //debugger
=======
                
>>>>>>> 312d46699d979d9b7f362833e04a0fd802dbca3c
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
<<<<<<< HEAD
        //debugger
=======
        
>>>>>>> 312d46699d979d9b7f362833e04a0fd802dbca3c
        this.setState({
            result:{id:selectedRowKeys[0],value:selectedRows[0].name},
            selectedTableRowKeys:selectedRowKeys
        })
    }

    render(){
        return(
            <div>
                {
                    this.props.title?this.props.title:<Button onClick={this.assignFn.bind(this)}><i className="iconfont icon-fenpeijiaose" />分配</Button>
                }
                
                <Modal
                    title="分配"
                    visible={this.state.visible}
                    onOk={this.handleOk.bind(this)}
                    onCancel={this.handleCancel.bind(this)}
                    width={500}
                    maskClosable={false}
                >
                    <PersonChioce 
                        data={this.state.treeList}  //获取所有部门数据
                        personList = {this.state.personList}//人员列表数据
                        selectList={this.onSelectAssign.bind(this)} //点击获取部门人员方法
                        selectedTableList = {this.selectedTableList.bind(this)}//table选中
                        selectedRowKeys = {this.state.selectedTableRowKeys}
                        selectedKeys = {this.state.selectedTreeKeys}
                        columns = {columns}
                        height= {300}
                    />
                </Modal>
            </div>
          
        )
    }
}