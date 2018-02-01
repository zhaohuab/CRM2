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
    message
} from "antd";
const Search = Input.Search;
const confirm = Modal.confirm;

import "assets/stylesheet/all/iconfont.css";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as Actions from "../../action";
import debounce from "lodash.debounce";
import { baseDir } from "api";
import reqwest from "utils/reqwest";


import DropDownModal from '../../../../common/DrowdownModal'

class IcbcInfo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            icbcList: [],//保存工商列表
            select: "",//保存选中的某一个工商列表公司
            index: -1,//保存当前点击index，样式用
            value:'',//下拉面板中input的参数
        };
        this.that = this
    }
    /*
    data:获取的公司详细信息
    visiable:控制显示详细信息的modal的显隐
    */
    customerListInfo(data,visiable) {
        debugger
        this.props.action.customerListInfo(data,visiable);
    }


    //根据客户名称，获取搜索工商核实列表
    getIcbcList(name, callback) {
        reqwest(
            {
                url: baseDir + "cum/customers/identifications/",
                method: "GET",
                data: {
                    param: {
                        name,
                        size: 30
                    }
                }
            },
            result => {
                callback(result);
            }
        );
    }

    //根据客户id获取详细客户工商信息 id为公司id
    getIcbcDetal(select, visiable) {
        debugger
       //验证唯一性
        let that = this
        reqwest(
            {
                url: baseDir + "cum/customers/verification/",
                method: "GET",
                data:{
                    param:{
                        verifyFullname:select.companyname
                    }
                }
            },
            result => {
                //唯一性通过才能通过选中的公司名称获取公司信息
                reqwest(
                    {
                        url: baseDir + "cum/customers/identifications/full",
                        method: "GET",
                        data:{
                            param:{
                                name:select.companyname
                            }
                        }
                    },
                    result => {
                        //把获取到的工商信息放在redux中，让modal显示
                        that.customerListInfo(result.data,visiable);
                    }
                );
            }
        );
    }

    //点击核实按钮，新增判断是否已经获取核实信息 编辑判断是都认证
    getIcbc(flag) {
        debugger
        let {viewData,icbcSelect,isClose,addIcbcName} = this.props.$$state.toJS()
        let icbcName = viewData.name;
        let id = viewData.id
        let verifyId = viewData.verifyId;

        let reSpace=/^\s*(.*?)\s*$/;
        //把收尾空格去掉
        addIcbcName = addIcbcName?addIcbcName.replace(reSpace,'$1'):addIcbcName;
        icbcName = icbcName?icbcName.replace(reSpace,'$1'):icbcName;

        if (flag) {
            debugger
            //如果面板是显示状态
            if (icbcName) {
                if(addIcbcName == icbcName){//如果上一次输入的值等于当前输入的名称则不在此请求公司信息
                    this.props.action.saveIcbcName(viewData,true)
                }else{
                    this.getIcbcList(icbcName, result => {
                        if (result.data && result.data.length) {
                            this.setState({
                                visible: flag,
                                icbcList: result.data
                            });
                        }
                    });
                }
            } else {
                //没输入客户名称，搜索没有查询条件，列表没有数据
                this.setState({
                    visible: flag,
                    icbcList: []
                });
            }
        } else {
            //如果面板是关闭状态
            this.setState({
                visible: flag
            });
        }
    }   
    //公司列表选中触发方法
    onSelect(item, n) {
        this.setState({
            select: item,
            index: n
        });
    }
    //下拉面板点击确定
    onOk() {
        debugger
        if (!this.state.select) {
            this.setState({
                visible: false
            });
            return;
        }
        this.setState(
            {
                visible: false,
                index: -1
            },
            () => {       
                let visiable = true;
                this.getIcbcDetal(this.state.select, visiable);
            }
        );
    }
    //下拉面板点击取消
    onCancel() {
        this.setState({
            visible: false,
            index: -1
        });
    }
    //下拉面板中点击搜索
    onSearch(){

    }
    //下拉面板中的input  onchange
    onChange(value){
        this.setState({
            value
        })
    }

    //获取公司信息进行核实代码
    verifyFn(){
        let {viewData,icbcInfo} = this.props.$$state.toJS();
        let name
        name = icbcInfo.find((item)=>{
            return item.key == 'name'
        })
        debugger
        if(!viewData.fullname){
            viewData.fullname = name.value
        }
        viewData.verifyFullname = name.value
        debugger
        icbcInfo.forEach(item => {
            if (item.key == "street") {
                viewData["street"] = item.value;
            } else if (item.key == "bizRegno") {
                viewData["bizRegno"] = item.value;
            } else if (item.key == "orgCode") {
                viewData["orgCode"] = item.value;
            } else if (item.key == "regCapital") {
                viewData["regCapital"] = item.value;
            } else if (item.key == "legalRepresent") {
                viewData["legalRepresent"] = item.value;
            } else if (item.key == "industry") {
                viewData["industry"] = { name: item.value };
            } else if (item.key == "email") {
                viewData["email"] = item.value;
            } else if (item.key == "tel") {
                viewData["tel"] = item.value;
            } else if (item.key == "taxpayerNo") {
                viewData["taxpayerNo"] = item.value;
            } else if (item.key == "remark") {
                viewData["remark"] = item.value;
            }
        });
        return viewData
    }
     //覆盖表单信息二次确认modal
     icbcConfirm() {
        let that = this;
        confirm({
          title: '确认覆盖客户信息?',
          content: '确认后之前填写的客户信息将被覆盖，如已填写客户全称，此操作并不会覆盖客户名称',
          onOk(){
              debugger
            let viewData = that.verifyFn.call(that)
            debugger
            that.props.action.saveIcbcName(viewData,false)
          },
          onCancel() {
            that.props.action.saveIcbcNameCancel(false);
          },
        });
      }

    //详细信息modal取消按钮
    onInbcCancel() {
        //确定时，出判断是否覆盖表单，在判断客户全称是否有值 ，有值不进行覆盖，没有值才覆盖
        //表单点击确定时需要verifyFullname
        this.props.action.saveIcbcNameCancel(false);
    }

    //详细信息确定按钮，保存已获取公司的客户名称
    onIcbcOk(){
        debugger
        let {viewData,icbcSelect,isClose,addIcbcName} = this.props.$$state.toJS();
        debugger
        if(viewData.name == addIcbcName){
            this.props.action.saveIcbcName(viewData,false)
        }else{
            if(!viewData.verifyFullname){
                let viewData = this.verifyFn()
                this.props.action.saveIcbcName(viewData,false)
            }else{
                this.icbcConfirm.call(this)
            }
        }
    }

    //modal框底部按钮
    footerContent() {
        let {viewData} = this.props.$$state.toJS();
        return (
            <div>
                <Button onClick={this.onInbcCancel.bind(this)}>关闭</Button>
                <Button onClick={this.onIcbcOk.bind(this)}>确定</Button>
            </div>
        );
    }
  
    createList() {
        let index = this.state.index;
        return (
            <DropDownModal 
                title='工商列表' 
                onCancel={this.onCancel.bind(this)}  
                onOk={this.onOk.bind(this)} 
                onSearch = {this.onSearch.bind(this)}
                value = {this.state.value}
                onChange = {this.onChange.bind(this)}
                width = {400}
                height= {380}
                
            >  
               <div className="crm-list-card-icbc">
               {this.state.icbcList &&
                this.state.icbcList.length ? (
                    this.state.icbcList.map((item, n) => {
                        return (
                            <div
                                className={index == n? "icbc-item-choice": "icbc-item"}
                                onClick={this.onSelect.bind(this,item,n)}
                            >
                                {item.companyname}
                            </div>
                        );
                    })
                ) : (
                    <div className="icbc-item">暂无数据</div>
                )}
               </div>
             </DropDownModal>         
        );
    }

    render() {
        let {viewData,icbcVisible,icbcInfo,icbcSelect,isClose,} = this.props.$$state.toJS();
        return (
            <div>
                <Dropdown
                    overlay={this.createList()} //生成下拉结构样式
                    trigger={["click"]}
                    onVisibleChange={this.getIcbc.bind(this)} //聚焦、和点击外侧时显示关闭下拉面板
                    visible={this.state.visible} //受控面板显示
                >
                    <span className="icbc-btn" onClick={this.getIcbc.bind(this,true)}>
                        企业核实
                    </span>
                </Dropdown>
                <Modal
                    title="工商核实"
                    visible={icbcVisible}
                    onCancel={this.onInbcCancel.bind(this)}
                    footer={this.footerContent.call(this)}
                    width={500}
                    maskClosable={false}
                >
                    <div className="modal-height">
                        {icbcInfo && icbcInfo.length
                            ? icbcInfo.map(item => {
                                  return (
                                      <div className="icbc-detail-item">
                                          <span>{item.name}</span>:<span>
                                              {item.value}
                                          </span>
                                      </div>
                                  );
                              })
                            : ""}
                    </div>
                </Modal>
            </div>
        );
    }
}

//绑定状态到组件props
function mapStateToProps(state, ownProps) {
    return {
        $$state: state.customerList
    };
}
//绑定action到组件props
function mapDispatchToProps(dispatch) {
    return {
        action: bindActionCreators(Actions, dispatch)
    };
}
//输出绑定state和action后组件
export default connect(mapStateToProps, mapDispatchToProps)(IcbcInfo);
