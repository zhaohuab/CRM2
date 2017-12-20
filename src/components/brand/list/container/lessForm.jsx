import { 
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

import "assets/stylesheet/all/iconfont.css";
import * as Actions from "../action";

class LessForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            enumData:
                {enableState:[
                    {key:1,title:"启用"},
                    {key:2,title:"停用"}
                ]},
        }
    }

    handleSearch(e) {     
        e.preventDefault();
        this.props.handleSearch(this.props.$$state.get("lessFormData").toJS());
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: { span: 2 },
            wrapperCol: { span: 22 }
        };
        return (
            <div className="less-form">
                <Form layout="inline" >
                    <Row type="flex" align="middle" style={{ height: "54px" }}>
                        <Col span={6}>
                            <FormItem {...formItemLayout}>
                                {getFieldDecorator("code")(                                                                    
                                    <Input type="text" placeholder="编码"/>                                                                          
                                )}
                            </FormItem>
                        </Col>
                        <Col span={6}>
                            <FormItem {...formItemLayout}>
                                {getFieldDecorator("enableState", {})(
                                    <Enum
                                    addOptionAll={""}
                                    dataSource={this.state.enumData.enableState}
                                />
                                )}
                            </FormItem>
                        </Col>
                        <Col span={6}>
                            <div >
                                <Button htmlType="submit" onClick={this.handleSearch.bind(this)} >查询</Button>
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
            if(item == "enableState"){
                if(parseInt(fields[item].value.key) == 0){
                    delete props.dataSource.enableState;
                    fieldsChangeData = {enableStateName:fields[item].value.title};
                }else{
                    fieldsChangeData = {[item]:parseInt(fields[item].value.key),enableStateName:fields[item].value.title};
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
            code:{
                ...data.code,
                value:data.code
            },
            enableState:{
                ...data.enableState,
                value:data.enableStateName
            } 
        };
    }
})(LessForm);

//绑定状态到组件props
function mapStateToProps(state, ownProps) {
    return {
        $$state: state.brandList
    };
}
//绑定action到组件props
function mapDispatchToProps(dispatch) {
    return {
        action: bindActionCreators(Actions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(WarpMilForm);
