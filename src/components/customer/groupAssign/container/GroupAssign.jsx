import {
    Modal,
    Select,
    Row,
    Col,
    Input,
    Button,
    Icon,
    Dropdown,
    Tree,
} from "antd";
const TreeNode = Tree.TreeNode;

import "assets/stylesheet/all/iconfont.css";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as Actions from "../action";
import { baseDir } from "api";
import reqwest from "utils/reqwest";

class GroupAssign extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            visible:false,
            groupList:[],
            checkedKeys:[]
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

    //遍历已选择的table列表客户
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
        debugger
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
                    groupList:result.data
                })
            }
        );
    }

    //分配modal确定
    handleOk(){
        debugger
        if(!(this.state.checkedKeys && this.state.checkedKeys.length)){
            this.setState({
                visible:false,
                checkedKeys:[],
                groupList:[]
            },()=>{
                this.props.headerBtnsClose()
            })
            return
        }
        let { selectedRowKeys ,data,pagination} = this.props.$$state.toJS()
        let select = this.selectPerson(selectedRowKeys,data);
        let cumIds = []
        select.forEach((item)=>{
            cumIds.push(item.id)
        })
        debugger
        reqwest(
            {
                url: baseDir + 'cum/customersales/allocation',
                method: "PUT",
                data: {
                    param: {
                        orgIds:this.state.checkedKeys.join(','),
                        cumIds:cumIds.join(','),
                        ownerDeptId:'',
                        ownerUserId:'',
                        relate:[]
                    }
                }
            },
            data => {
                debugger
                this.setState({
                    visible:false,
                    checkedKeys:[],
                    groupList:[]
                },()=>{
                    this.props.action.getList(pagination,{},[])
                })
            }
        );
    }

    //分配modal取消
    handleCancel(){
        this.setState({
            visible:false,
            checkedKeys:[],
            groupList:[]
        },()=>{
            this.props.headerBtnsClose()
        })
    }

    onCheck(keys,keyObj){
        debugger
        this.setState({
            checkedKeys:keys.checked
        })
    }

    renderTreeNodes(data){
        return data.map((item) => {
          if (item.children && item.children.length) {
            return (
              <TreeNode title={item.name} key={item.id}>
                {this.renderTreeNodes(item.children)}
              </TreeNode>
            );
          }
          return <TreeNode title={item.name} key={item.id} />;
        });
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
                    className='crm-group-assignperson-modal'
                >
                   <div className='modal-height'>
                        <Tree
                            checkable
                            onCheck={this.onCheck.bind(this)}
                            checkStrictly = {true}
                            checkedKeys={this.state.checkedKeys}
                        >
                            {this.renderTreeNodes(this.state.groupList)}
                        </Tree>
                    </div>
                </Modal>
            </div> 
        )
    }
}


function mapStateToProps(state, ownProps) {
    return {
        $$state: state.cusGroupAssignReducers
    };
}
//绑定action到组件props
function mapDispatchToProps(dispatch) {
    return {
        action: bindActionCreators(Actions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(GroupAssign);

