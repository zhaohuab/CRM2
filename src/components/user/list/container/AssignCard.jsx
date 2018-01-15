import { Form, Input,Row,Col,Checkbox } from 'antd';
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


    render() {
        const { getFieldDecorator } = this.props.form;
        const roleList = this.props.$$state.get("roleList").toJS();

        const showRole = (data) => data.map((item)=>{
            return <Col span={4}><Checkbox checked={item.checked} />{item.name}</Col>
        })
        let { tpl } = this.props;
        return (
            <div>
                <Row>
                    <Col span={6}>
                        已选择对象：
                    </Col>
                    <Col span={18}>
                        李达、李大大
                    </Col>
                </Row>
                <Row>
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