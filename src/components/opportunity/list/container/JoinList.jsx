import {
    Modal,
    Popover,
    Collapse,
    Tabs,
    Row,
    Col,
    Layout,
    Menu,
    Breadcrumb,
    Icon,
    Button,
    Dropdown,
    Timeline
} from "antd";
import { browserHistory } from "react-router";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as Actions from "../action";

const TabPane = Tabs.TabPane;
const Panel = Collapse.Panel;
const confirm = Modal.confirm;

import { baseDir } from "api";
import reqwest from "utils/reqwest";

import AddJoin from './AddJoin'


class JoinList extends React.Component {
    changeViewData(data){
        this.props.action.saveRelUserSuccess(data)
    }
    changeCircleColor(item){
        let name = item.relUserName;
        let color = ['#3CA4FB','#9FD563','#F7A508','#F7A508','#C9A5FC']
        name = name.substring(item.relUserName.length-2);
        color = color[Math.floor(Math.random()*5)]
        return(
            <div className='join-round-color' style={{border:'1px solid '+color}}><span>{name}</span></div>
        )
    }
    
    componentDidMount() {
        let editData = this.props.$$state.get("editData").toJS();
        this.props.action.getRelUserListData(editData.id);
    }

    joinDel(relUserId){
        let editData = this.props.$$state.get("editData").toJS();
        reqwest(
            {
                url: baseDir+`sprc/opportunities/${editData.id}/relusers`,
                method: "DELETE",
                data:{
                    param:{
                        relUserId
                    }
                }
            },
            result => {
                this.props.action.delRelUserData(relUserId)
            }
        );
    }
 
    render(){  
        let {editData,relUserData} = this.props.$$state.toJS();
        return(
            <div className='join-warpper'>
                {
                    relUserData &&  relUserData.length?
                    relUserData.map((item,index)=>{
                        
                        return(
                            <div className='join-warpper-item' data-id={item.id}>                             
                                {
                                    
                                    this.changeCircleColor(item)
                                }
                                <span className='username'>{item.relUserName}<span className='del'><i className="iconfont icon-canyuren-shanchu opportunity_list_delparticipant_opportunity" onClick={this.joinDel.bind(this,item.relUserId)}/></span></span>
                            </div>
                        )
                    }):''
                }
                <div className='join-warpper-item opportunity_list_addparticipant_opportunity'>
                    <AddJoin viewData={editData} changeViewData = {this.changeViewData.bind(this)}/>
                </div>
            </div>
        )
    }
}

//绑定状态到组件props
function mapStateToProps(state, ownProps) {
    return {
        $$state: state.opportunityList,
    };
}
//绑定action到组件props
function mapDispatchToProps(dispatch) {
    return {
        action: bindActionCreators(Actions, dispatch)
    };
}
//输出绑定state和action后组件
export default connect(mapStateToProps, mapDispatchToProps)(JoinList);