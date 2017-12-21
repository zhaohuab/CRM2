import {
    Modal,
    Cascader,
    Select,
    Form,
    Row,
    Col,
    Input,
    Button,
    Icon
} from "antd";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Enum from "utils/components/enums";
const FormItem = Form.Item;
const Option = Select.Option;
const ButtonGroup = Button.Group;
const confirm = Modal.confirm;
import "assets/stylesheet/all/iconfont.css";
import PrdClassRef from './PrdClassRef'
import OrgRef from './OrgRef'
import * as Actions from "../action";

class LessForm extends React.Component {
    constructor(props) {
        super(props);
    }

    handleSearch(e) {
        e.preventDefault();
        this.props.handleSearch(this.props.$$state.get("lessFormData").toJS());
    }

    moreForm() {
        this.props.formMore();
    }

    onOrgDelete() {
        let org = {orgName:""};
        let data = this.props.dataSource
        Object.assign(data, org);
        this.props.action.setLessFormData(data);
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: { span: 2 },
            wrapperCol: { span: 22 }
        };
        //let { enumData } = this.props.$$state.toJS();
        return (
            <div className="less-form">
                <Form layout="inline" >
                    <Row type="flex" align="middle" style={{ height: "54px" }}>
                        <Col span={6}>
                            <FormItem {...formItemLayout}>
                                {getFieldDecorator("orgId")(
                                   <OrgRef />
                                )}
                            </FormItem>
                        </Col>
                        <Col span={6}>
                            <FormItem {...formItemLayout}>
                                {getFieldDecorator("prdtypeId")(
                                    <PrdClassRef />
                                )}
                            </FormItem>
                        </Col>

                        <Col span={6}>
                            <div className="more-btn">
                                <Button htmlType="submit" onClick={this.handleSearch.bind(this)} >查询</Button>
                                <span
                                    onClick={this.moreForm.bind(this)}
                                    className="more-up"
                                >
                                    展开 <Icon type="down" />
                                </span>
                            </div>
                        </Col>
                    </Row>
                </Form>
            </div>
        );
    }
}

const WarpMilForm = Form.create({
    onFieldsChange(props, fields){ 
        let fieldsChangeData = {};
        let dataSource = props.dataSource;
        for(let item in fields){
            if(item == "prdtypeId"){
                if("isDelete" in fields[item].value){
                    delete props.dataSource.prdtypeId;
                    delete props.dataSource.prdtypeName;
                }else{
                    fieldsChangeData = {[item]:parseInt(fields[item].value.prdtypeId[0]),prdtypeName:fields[item].value.prdtypeName};
                }                                   
            }else if(item == "orgId"){
                if("isDelete" in fields[item].value){
                    delete props.dataSource.orgId;
                    delete props.dataSource.orgName;
                }else{
                    fieldsChangeData = {[item]:parseInt(fields[item].value.orgId[0]),orgName:fields[item].value.orgName};
                }                                   
            }else{           
                fieldsChangeData = {[item]:fields[item].value};
            }
        }
        Object.assign(props.dataSource, fieldsChangeData);
        props.action.setLessFormData(props.dataSource);
    },
    mapPropsToFields(props){
        let data = props.dataSource;
        return{
            orgId:{
                ...data.orgId,
                value:data.orgName
            },           
            prdtypeId:{
                ...data.prdtypeName,
                value:data.prdtypeName
            },  
          
        };
    }
})(LessForm);

//绑定状态到组件props
function mapStateToProps(state, ownProps) {
    return {
        $$state: state.product
    };
}
//绑定action到组件props
function mapDispatchToProps(dispatch) {
    return {
        action: bindActionCreators(Actions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(WarpMilForm);
