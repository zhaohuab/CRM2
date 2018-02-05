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
import * as Actions from "../../action";

const TabPane = Tabs.TabPane;
const Panel = Collapse.Panel;
const confirm = Modal.confirm;

import { baseDir } from "api";
import reqwest from "utils/reqwest";

import AddJoin from './AddJoin'


class JoinList extends React.Component {
    changeViewData(data){
        debugger;
        this.props.action.setRightPaneltList(data)
    }
    changeCircleColor(item){
        debugger;
        let name = item.userName;
        let color = ['#3CA4FB','#9FD563','#F7A508','#F7A508','#C9A5FC']
        name = name.substring(item.userName.length-2);
        color = color[Math.floor(Math.random()*5)]
        return(
            <div className='join-round-color' style={{border:'1px solid '+color}}><span>{name}</span></div>
        )
    }
    
    joinDel(id){
        reqwest(
            {
                url: baseDir+`cum/customer/relusers/${id}`,
                method: "DELETE",
                data:{
                    param:{
                        id
                    }
                }
            },
            result => {
                this.props.action.delRightPaneltList(id)
            }
        );
    }

    render(){  
        let {viewData,viewDataJoinList} = this.props.$$state.toJS();
        debugger
        return(
            <div className='join-warpper'>
                {
                    viewDataJoinList && viewDataJoinList.data && viewDataJoinList.data.length?
                    viewDataJoinList.data.map((item,index)=>{
                        
                        return(
                            <div className='join-warpper-item' data-id={item.id}>                             
                                {
                                    item.joinImage?
                                    <img
                                        src={require("assets/images/header/photo.png")}
                                        className="join-image"
                                    />:
                                    this.changeCircleColor(item)
                                }
                                <span className='username'>{item.userName}<span className='del'><i className="iconfont icon-canyuren-shanchu" onClick={this.joinDel.bind(this,item.id)}/></span></span>
                            </div>
                        )
                    }):''
                }
                <div className='join-warpper-item'>
                    <AddJoin viewData={viewData} changeViewData = {this.changeViewData.bind(this)}/>
                </div>
            </div>
        )
    }
}

//绑定状态到组件props
function mapStateToProps(state, ownProps) {
    return {
        $$state: state.customerList,
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