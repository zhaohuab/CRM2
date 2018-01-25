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
    Checkbox
} from "antd";
const TreeNode = Tree.TreeNode;

import "assets/stylesheet/all/iconfont.css";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as Actions from "../action";
import { baseDir } from "api";
import reqwest from "utils/reqwest";
import Tags from './Tags'

class GroupTakeBack extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            visible:false,
            companyList:[],
            checkedAll:false
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

    //点击回收方法
    takeBackFn(){
        let { selectedRowKeys ,data,pagination} = this.props.$$state.toJS()
        debugger
        // reqwest(
        //     {
        //         url: baseDir+'/cum/customerchart/customers',
        //         method: "GET",
        //         data:{
        //             param:{
        //                 ...pagination
        //             }
        //         }
        //     },
        //     result => {
        //         debugger
                
        //     }
        // );

        //拿到已选中table客户
        
        let select = this.selectPerson(selectedRowKeys,data);

        let companys = []
        //遍历所有客户的销售公司
        select.forEach((cumItem)=>{
            if(cumItem.salesVOs && cumItem.salesVOs.length){
                cumItem.salesVOs.forEach((saleItem)=>{
                    companys.push({id:saleItem.orgId,name:saleItem.def1})
                })
            }
        })

        //保存去重后的公司id、name
        var showCompany = [];
        var name = {};
        for(var i = 0; i < companys.length; i++){
            if(!name[companys[i].name]){
                companys[i].checked = false
                showCompany.push(companys[i]);
                name[companys[i].name] = 1;
            }
        }

        this.setState({
            visible:true,
            companyList:showCompany
        }) 
    }

    //分配modal确定
    handleOk(){
        let companyList = this.state.companyList;
        let { selectedRowKeys ,data,pagination} = this.props.$$state.toJS()
        companyList = companyList.map((item)=>{
            if(item.checked){
                item = item.id
                return item
            }
        })
        let cumIds = this.selectPersonId(selectedRowKeys,data)
        debugger
        reqwest(
            {
                url: baseDir+'cum/customersales/resume',
                method: "POST",
                data:{
                    param:{
                        orgIds:companyList.join(','),
                        cumIds:cumIds.join(',')
                    }
                }
            },
            result => {
                debugger
                this.setState({
                    visible:false,
                    companyList:[],
                    checkedAll:false
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
            companyList:[],
            checkedAll:false
        },()=>{
            this.props.headerBtnsClose()
        })
    }

    //点击全选
    checkedAllFn(){
        let companyList = this.state.companyList;
        let checkedAll = !this.state.checkedAll
        companyList.forEach((item)=>{
            item.checked = checkedAll
        })
        this.setState({
            checkedAll,
            companyList,
        })
    }

    //标签触发onchange
    onTagsChange(list){
        debugger
        this.setState({
            companyList:list
        })
    }

    render(){
        let {selectedRowKeys,data} = this.props.$$state.toJS()
        return(
            <div>
                <Button onClick={this.takeBackFn.bind(this)}><i className="iconfont icon-shouhui" />收回</Button>
                <Modal
                    title="收回"
                    visible={this.state.visible}
                    onOk={this.handleOk.bind(this)}
                    onCancel={this.handleCancel.bind(this)}
                    width={500}
                    maskClosable={false}
                    className='crm-group-takeback-modal'
                >
                   <div className='modal-height'>
                        <Row type='flex' justify='end'>
                            <Checkbox checked={this.state.checkedAll} onChange={this.checkedAllFn.bind(this)}>
                                全选
                            </Checkbox>
                        </Row>
                        <Row>
                            <Tags value = {this.state.companyList} onChange = {this.onTagsChange.bind(this)}/>
                        </Row>
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

export default connect(mapStateToProps, mapDispatchToProps)(GroupTakeBack);

