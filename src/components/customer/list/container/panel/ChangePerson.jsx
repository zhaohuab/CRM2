import {
    Row,
    Col,
    Input,
    Button,
    Icon,
    Dropdown,
} from "antd";


import "assets/stylesheet/all/iconfont.css";
import PersonChioce from '../../../../common/personChoice'
import { baseDir } from "api";
import reqwest from "utils/reqwest";

const columns = [{
    title: '姓名',
    dataIndex: 'name',
    key: 'name',
}];

export default class ChangePerson extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            visible:false,
            treeList:[],
            personList:[],
            result:{},
            selectedTableRowKeys:[],
            selectedTreeKeys:[]
        }
    }

    //table选中方法
    selectedTableList(selectedRowKeys,selectedRows){
        this.setState({
            result:{
                ownerDeptId :selectedRows[0].deptId,
                orgIds:selectedRows[0].orgId,
                ownerUserId:selectedRows[0].id,
                name:selectedRows[0].name
            },
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

    creatPanel(){
        
        return(
            <div className='reference'>
               <div className='reference-main' style={{width:this.props.width?this.props.width:'650px'}}>
                  <div className='reference-main-header'>
                    <p className='title'>
                        负责人
                    </p>
                  </div>
                  <div className='reference-main-choice'>
                        <PersonChioce 
                            data={this.state.treeList}  //获取所有部门数据
                            personList = {this.state.personList}//人员列表数据
                            selectList={this.treeSelect.bind(this)} //点击获取部门人员方法
                            selectedTableList = {this.selectedTableList.bind(this)}//table选中
                            selectedRowKeys = {this.state.selectedTableRowKeys}
                            selectedKeys = {this.state.selectedTreeKeys}
                            columns = {columns}
                        />
                  </div>
                    <Row className='reference-main-footer' type = 'flex' justify = 'end' align='middle' gutter={15} style={{marginLeft:0}}>
                        <div>
                            <Button onClick={this.onOk.bind(this)} type='primary'>确定</Button>
                        </div>
                        <div>
                            <Button onClick={this.onCancel.bind(this)}>取消</Button>
                        </div>
                    </Row>
               </div>
            </div>
        )
    }

    getList(flag){
        if(flag){
            debugger
            reqwest(
                {
                    url: baseDir+'sys/orgs/orgTree',
                    method: "GET",
                },
                result => {
                    debugger
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
        const suffix =
            this.props.value && this.props.value.name ? (
                <Icon type="close" onClick={this.emitEmpty.bind(this)} />
            ) : null;

        
        return(
            <div>
                <Dropdown
                    overlay={this.creatPanel()} //生成下拉结构样式
                    trigger={["click"]}
                    onVisibleChange={this.getList.bind(this)} //聚焦、和点击外侧时显示关闭下拉面板
                    visible={this.state.visible} //受控面板显示
                >   
                       <Input
                            placeholder="负责人"
                            value={this.props.value ? this.props.value.name : ""}
                            suffix={suffix}
                            addonAfter={
                                <Icon
                                    type="search"
                                    onClick={this.getList.bind(this, true)}
                                />
                            }
                       />
                </Dropdown>
            </div>
                
        )
    }
}
