import {
    Row,
    Col,
    Input,
    Button,
    Icon,
    Dropdown,
} from "antd";
const Search = Input.Search;

import "assets/stylesheet/all/iconfont.css";
import PersonChioce from '../../../../common/personChoice'
import DropDownModal from '../../../../common/DrowdownModal'
import { baseDir } from "api";
import reqwest from "utils/reqwest";

const columns = [{
    title: '姓名',
    dataIndex: 'name',
    key: 'name',
}];

export default class OwnUser extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            visible:false,
            treeList:[],
            personList:[],
            result:{},
            selectedTableRowKeys:[],
            selectedTreeKeys:[],
            value:'',//保存modal里input中搜索value值
        }
    }

    //table选中方法
    selectedTableList(selectedRowKeys,selectedRows){
        debugger
        this.setState({
            result:{id:selectedRowKeys[0],name:selectedRows[0].name,deptId:selectedRows[0].deptId,deptName:selectedRows[0].deptName},
            selectedTableRowKeys:selectedRowKeys
        })
    }

    //树选中方法
    treeSelect(page,pageSize,selectedKeys){
        
        let deptId = selectedKeys[0]//部门id
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
                debugger
                this.setState({
                    personList:result,
                    selectedTreeKeys:selectedKeys
                })
            }
        );
    }
    onOk(){
        
        this.setState({
            visible:false,
            treeList:[],
            personList:[],
            selectedTableRowKeys:[],
            selectedTreeKeys:[],
        },()=>{
            debugger
            this.props.onChange(this.state.result)
        })
    }

    onCancel(){
        this.setState({
            visible:false,
            treeList:[],
            personList:[],
            selectedTableRowKeys:[],
            selectedTreeKeys:[],
        })
    }

    //modal中input搜索值
    onSearch(){

    }

    //modal中input发生onchange
    onChange(value){
        this.setState({
            value
        })
    }

     //分页方法
     pagination({page,pageSize}){
        debugger
        this.treeSelect(page,pageSize,this.state.selectedTreeKeys)
    }


    creatPanel(){
        debugger
        return(
            <DropDownModal 
                title='负责人' 
                onCancel={this.onCancel.bind(this)}  
                onOk={this.onOk.bind(this)} 
                onSearch = {this.onSearch.bind(this)}
                value = {this.state.value}
                onChange = {this.onChange.bind(this)}
                width = {400}
                height= {320}
                className='crm-list-panel-ownerUser-modal'
            >   
                <div className='height' style={{width:'100%'}}>
                    <PersonChioce 
                        data={this.state.treeList}  //获取所有部门数据
                        personList = {this.state.personList}//人员列表数据
                        selectList={this.treeSelect.bind(this)} //点击获取部门人员方法
                        selectedTableList = {this.selectedTableList.bind(this)}//table选中
                        selectedRowKeys = {this.state.selectedTableRowKeys}
                        selectedKeys = {this.state.selectedTreeKeys}
                        pagination = {this.pagination.bind(this)}
                        columns = {columns}
                    />
                </div>
            </DropDownModal>
        )
    }

    getList(flag){
        
        if(this.props.disabled && this.props.viewData.id){
            return
        }
        if(flag){
            
            reqwest(
                {
                    url: baseDir+'sys/orgs/orgTree',
                    method: "GET",
                    data:{
                        param:{
                            orgType:3,
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
            
        }else{
            this.setState({
                visible:false,
                treeList:[],
                personList:[],
                result:''
            })
        }
    }

    emitEmpty(){
        this.props.onChange({})
    }

    render(){
        debugger
        /////ddddddd
        const suffix =
            this.props.value && this.props.value.name ? (
                <Icon type="close" onClick={this.emitEmpty.bind(this)} />
            ) : null;
        return(
            <div>
                {
                    this.props.disabled && this.props.viewData.id?
                    <Input placeholder="负责人" value={this.props.value ? this.props.value.name : ""} disabled />:
                    <Dropdown
                        overlay={this.creatPanel()} //生成下拉结构样式
                        trigger={["click"]}
                        onVisibleChange={this.getList.bind(this)} //聚焦、和点击外侧时显示关闭下拉面板
                        visible={this.state.visible} //受控面板显示
                    >   
                        <Search
                            placeholder="负责人"
                            onSearch={this.getList.bind(this, true)}
                            value={this.props.value ? this.props.value.name : ""}
                            suffix={suffix}
                        />
                    </Dropdown>
                }
            </div>
        )
    }
}
