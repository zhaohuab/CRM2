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
import OwnUser from '../list/OwnUser'

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

export default class ChangePerson extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            visible:false,
            value:{}
        }
    }

    //点击分配方法
     assignFn(){
        this.setState({
            visible:true,
        })
    }


    //分配modal确定
    handleOk(){
        if(!this.state.value){
            that.setState({
                visible:false,
                value:{}
            })
            return
        }
        let { viewData } = this.props
        let id = viewData.salesVOs[0].id
        let salesVOs = {ownerUserId:this.state.value.id}
        let that = this
        //debugger
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
                    //debugger
                    let nv = viewData.salesVOs[0]
                    if(that.state.value){
                        nv.ownerUserName = that.state.value.name
                        nv.ownerUserId = that.state.value.id
                        viewData.ownerUserId = {id:nv.ownerUserId,name:nv.ownerUserName}  
                        that.props.changeViewData(viewData)
                    }
                }
                that.setState({
                    visible:false,
                    value:{}
                })
            }
        );
        
    }

    //分配modal取消
    handleCancel(){
        this.setState({
            visible:false,
        })
    }

    onChange(value){
        this.setState({
            value
        })
    }

    render(){
        let {viewData} = this.props
        return(
            <div>
                <Button onClick={this.assignFn.bind(this)}><i className="iconfont icon-biangeng" />变更</Button>
                <Modal
                    title="变更"
                    visible={this.state.visible}
                    onOk={this.handleOk.bind(this)}
                    onCancel={this.handleCancel.bind(this)}
                    width={500}
                    maskClosable={false}
                    className='change-person'
                >
                   <Row type='flex' align='middle' className='change-person-item'>
                       <Col span={4} offset={2}>现销售员:</Col><Col span={10}>{viewData.salesVOs?viewData.salesVOs[0].ownerUserName:''}</Col>
                      
                   </Row>
                   <Row type='flex' align='middle' className='change-person-item'>
                        <Col span={4} offset={2}>变更销售员:</Col>
                        <Col span={10}>
                            <OwnUser viewData={viewData} disabled={false} width={500} height={300} onChange={this.onChange.bind(this)} value={this.state.value}/>
                        </Col>
                   </Row>
                </Modal>
            </div>
        )
    }
}