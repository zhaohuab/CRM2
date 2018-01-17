import { Form, Input,Row,Col,Checkbox,Radio } from 'antd';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import getFormItem from 'utils/template/form'
import fieldHandler from 'utils/template/form/FieldHandler.js'
//导入action方法
import * as Actions from "../action";
const FormItem = Form.Item;
class AssignCard extends React.Component {
    constructor(props) {
        super(props)
    }

    selectRole(id){
        this.props.action.selectRole(id)
    }

    render() {
        const roleList = this.props.$$state.get("roleList").toJS();
        const selectedRows = this.props.$$state.get("selectedRows").toJS();
        const selectedRowKeys = this.props.$$state.get("selectedRowKeys").toJS();
        const selectedRole = this.props.$$state.get("selectedRole");
        let userStr = "";
        for(let i=0;i<selectedRows.length;i++){
            userStr += selectedRows[i].name;
            userStr += "、";
        }
        userStr = userStr.substring(0,userStr.length-1);
        const showRole = (data) => data.map((item)=>{
            return <div onClick={this.selectRole.bind(this,item.id)}><Col span={8}><Radio checked={item.id == selectedRole?true:false} />{item.name}</Col></div>
        })
        let { tpl } = this.props;
        return (
            <div>
                <Row 
                    className="Assgin-row"
                    type="flex"
                    align="center"
                >
                    <Col span={6}>
                        已选择对象：
                    </Col>
                    <Col span={18}>
                        {userStr}
                    </Col>
                </Row>
                <Row 
                    className="Assgin-row"
                    type="flex"
                    align="center"
                >
                    <Col span={6}>
                        角色：
                    </Col>
                    <Col span={18}>
                    <Row>
                        {showRole(roleList)}
                        </Row>
                    </Col>
                </Row>
            </div>
        )
    }
}

//绑定状态到组件props
function mapStateToProps(state, ownProps) {
    return {
        $$state: state.userlist
    };
}

//绑定action到组件props
function mapDispatchToProps(dispatch) {
    return {
        action: bindActionCreators(Actions, dispatch)
    };
}
//输出绑定state和action后组件
export default connect(mapStateToProps, mapDispatchToProps)(AssignCard);