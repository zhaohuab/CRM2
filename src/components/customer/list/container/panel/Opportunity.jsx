import {
    Select,
    Input,
    Form,
    Table,
    Modal,
    Button,
    Icon,
    Row,
    Col,
    Tabs,
    Collapse,
    Menu,
    Dropdown
} from "antd";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as Actions from "../../../../opportunity/list/action";
import ClueCard from '../../../../opportunity/list/container/Card'
import ClueTable from '../../../../opportunity/list/container/DetailTable'


class Opportunity extends React.Component {
    constructor(props){
        super(props)
        this.state={
            visible:false
        }
    }
    clueShow(e){
        e.stopPropagation()
        this.props.action.getbiztype();
    }
    btnNew(e){
        this.setState({
            visible:true
        })
        this.props.action.showFormNew(true,{type:e.key,typeName:e.item.props.children});
        this.props.action.saveOppBList([]);
    }
    onOk(){
        const isEdit = this.props.$$state.get("isEdit");
        const editData = this.props.$$state.get("editData").toJS();
        const oppBList = this.props.$$state.get("oppBList").toJS();
        editData.childList = oppBList;
        editData.customerId = {id:this.props.CusId.id,name:this.props.CusId.name}
        this.props.action.listAddSave(editData);
        this.setState({
            visible:false
        },()=>{
            this.props.otherRef()
        })
    }
    onCancel(){
        this.setState({
            visible:false
        })
    }
    render(){
        let {biztypeList} = this.props.$$state.toJS() 
        
        const loop = data => data.map((item) => {
            return <Menu.Item key={item.key} >{item.title}</Menu.Item>
        });
        const menu = (
            <Menu  style={{width:"100px"}} onClick={this.btnNew.bind(this)}>
                {loop(biztypeList)}
            </Menu>
          );
        return(
            <div>
                <Dropdown overlay={menu} trigger={['click']} placement="bottomRight">
                    <i className={'iconfont icon-tianjia'} onClick={this.clueShow.bind(this)}/>
                </Dropdown>
                
                <Modal
                    title='添加商机'
                    visible={this.state.visible}
                    onOk={this.onOk.bind(this)}
                    onCancel={this.onCancel.bind(this)}
                    width="900"
                    maskClosable={false}
                >
                    <div className="model-height">
                        <ClueCard
                            cusId={this.props.CusId}
                            wrappedComponentRef={inst => (this.formRef = inst)}
                        />
                        <ClueTable/>
                    </div>
                </Modal>
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
export default connect(mapStateToProps, mapDispatchToProps)(Opportunity);
