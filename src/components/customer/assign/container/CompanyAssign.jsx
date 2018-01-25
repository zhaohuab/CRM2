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
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as Actions from "../action";
import { baseDir } from "api";
import reqwest from "utils/reqwest";

import PersonChioce from '../../../common/personChoice/index.jsx'
import ChangePerson from './ChangePerson'

const columns = [{
    title: '姓名',
    dataIndex: 'name',
    key: 'name',
  }];

class CompanyAssign extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            visible:false,
            treeList:[],
            personList:[],
            result:'',
            selectedTableRowKeys:[],
            selectedTreeKeys:[],
            changeOwnUserValue:{},//变更所需value
            changeVisiable:false,
            isChange:[],//保存有负责人的客户列表
        }
    }
    //遍历table选择出来的人
    selectPerson(selectedRowKeys ,data){
        let choicePerson = data.data || [];
        choicePerson = choicePerson.filter((item)=>{
            if(selectedRowKeys.indexOf(item.id)>=0){
                return true
            }
        })
        return choicePerson
    }
    //遍历table已选择出来的人id,在分配情况下
    selectPersonId(selectedRowKeys ,data){
        let select = this.selectPerson(selectedRowKeys ,data);
        let cumIds = []
      
        select.forEach((item)=>{
            cumIds.push(item.id)
        })
        return cumIds
    }

    //点击分配方法
     assignFn(){
        let { selectedRowKeys ,data} = this.props.$$state.toJS()
        let select = this.selectPerson(selectedRowKeys ,data);
        let isChange=[]
        debugger
        select.forEach((item)=>{
            if(item.salesVOs){
                if(item.salesVOs[0].ownerUserId){
                    isChange.push({id:item.id,name:item.name})
                }
            }
        })
        if(!isChange.length){//如果选择的客户中没有已负责人显示分配modal
            reqwest(
                {
                    url: baseDir+'sys/orgs/orgTree',
                    method: "GET",
                    data:{
                        param:{
                            orgType:2,
                        }
                    }
                },
                result => {
                    debugger
                    this.setState({
                        visible:true,
                        treeList:result.data,
                    })
                }
            );
        }else{//如果选择的客户中某些客户已有负责人则变更
           
            this.setState({
                changeVisiable:true,
                isChange
            })
        }
    }

     //分配获取人员列表方法
     onSelectAssign(page,pageSize,selectedKeys){
        let deptId = selectedKeys[0];//部门id
        let searchMap = {deptId}
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

    //分配modal确定
    handleOk(){
        if(!this.state.result){
            this.setState({
                visible:false,
                treeList:[],
                personList:[],
                selectedTableRowKeys:[],
                selectedTreeKeys:[],
                result:'',
            },()=>{
                this.props.headerBtnsClose()
            })
            return
        }
        let { selectedRowKeys ,data} = this.props.$$state.toJS();
        let cumIds = this.selectPersonId(selectedRowKeys ,data)
       
        reqwest(
            {
                url: baseDir + 'cum/customersales/allocation',
                method: "PUT",
                data: {
                    param: {
                        ...this.state.result,
                        cumIds:cumIds.join(',')
                    }
                }
            },
            data => {
                debugger
                this.setState({
                    visible:false,
                    treeList:[],
                    personList:[],
                    selectedTableRowKeys:[],
                    selectedTreeKeys:[],
                    result:''
                },()=>{
                    this.props.headerBtnsClose()
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
        },()=>{
            this.props.headerBtnsClose()
        })
    }

    //选择分配table某一项方法
    selectedTableList(selectedRowKeys,selectedRows){
        this.setState({
            result:{
                ownerDeptId :selectedRows[0].deptId,
                orgIds:selectedRows[0].orgId,
                ownerUserId:selectedRows[0].id
            },
            selectedTableRowKeys:selectedRowKeys
        })
    }

    /**
     * 以下是变更方法
     */

      //变更modal确定
      changOk(){
        if(!this.state.changeOwnUserValue){
            this.setState({
                changeVisiable:false,
                changeOwnUserValue:{}
            },()=>{
                this.props.headerBtnsClose()
            })
            return
        }
        debugger
        let cumIds = []
        this.state.isChange.forEach((item)=>{
            cumIds.push(item.id)
        })
        debugger
        reqwest(
            {
                url: baseDir + 'cum/customersales/allocation',
                method: "PUT",
                data: {
                    param: {
                        orgIds:this.state.changeOwnUserValue.orgIds,
                        ownerUserId:this.state.changeOwnUserValue.ownerUserId,
                        ownerDeptId :this.state.changeOwnUserValue.ownerDeptId,
                        cumIds:cumIds.join(','),
                        relate:[]
                    }
                }
            },
            data => {
                debugger
                this.setState({
                    changeVisiable:false,
                    changeOwnUserValue:{},
                    isChange:[]
                },()=>{
                    this.props.headerBtnsClose()
                })
            }
        );
    }

    //变更modal取消
    changeCancel(){
        this.setState({
            changeVisiable:false,
            changeOwnUserValue:{},
            isChange:[]
        },()=>{
            this.props.headerBtnsClose()
        })
    }

    //变更 ChangePerson 
    onChange(value){
        this.setState({
            changeOwnUserValue:value
        })
    }
     
    render(){
        let {selectedRowKeys,data} = this.props.$$state.toJS()
        return(
            <div>
                <Button onClick={this.assignFn.bind(this)}><i className="iconfont icon-fenpei" />分配</Button>
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
                <Modal
                    title="变更"
                    visible={this.state.changeVisiable}
                    onOk={this.changOk.bind(this)}
                    onCancel={this.changeCancel.bind(this)}
                    width={500}
                    maskClosable={false}
                    className='crm-company-changeperson-modal'
                >
                   <Row type='flex' align='middle' className='change-person-item'>
                       <Col span={4} offset={2} className=''>原客户:</Col>
                       <Col span={10}>
                        {this.state.isChange && this.state.isChange.length?
                            this.state.isChange.map((item)=>{
                                return(
                                    <span className='change-person-name'>{item.name}</span>
                                )
                            }):''
                        }
                       </Col>
                   </Row>

                   <Row type='flex' align='middle' className='change-person-item'>
                        <Col span={4} offset={2}>现客户:</Col>
                        <Col span={10}>
                           <ChangePerson width={500} onChange={this.onChange.bind(this)} value={this.state.changeOwnUserValue}/>
                        </Col>
                   </Row>
                </Modal>
            </div> 
        )
    }
}


function mapStateToProps(state, ownProps) {
    return {
        $$state: state.cusAssignReducers
    };
}
//绑定action到组件props
function mapDispatchToProps(dispatch) {
    return {
        action: bindActionCreators(Actions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(CompanyAssign);