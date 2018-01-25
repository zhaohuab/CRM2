import {
    Select,
    Form,
    Row,
    Col,
    Input,
    Button,
    Icon
} from "antd";
const FormItem = Form.Item;
const Option = Select.Option;
const ButtonGroup = Button.Group;

import * as Actions from "../action";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Enum from "utils/components/enums";
import SalesCompany from './SalesCompany.jsx'

import "assets/stylesheet/all/iconfont.css";

class LessForm extends React.Component {
    constructor(props) {
        super(props);
    }
    visiable(){
        this.props.visiable()
    }
    
    render() {
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: { span: 2 },
            wrapperCol: { span: 22 }
        };
        
        return (
                <Form layout="inline">
                    <Row type="flex" align="middle">
                        <Col span={6}>
                            <FormItem {...formItemLayout}>
                                {getFieldDecorator("name")(
                                    <Input type="text" placeholder="客户名称" />
                                )}
                            </FormItem>
                        </Col>
                        <Col span={6}>
                            <FormItem {...formItemLayout}>
                                {getFieldDecorator("org")(
                                    <SalesCompany/>
                                )}
                            </FormItem>
                        </Col>

                        <Col span={6}>
                            <div className="operate">
                                <span className='search' onClick={this.props.searchForm.bind(this)}>查询</span>
                                <span className="more" onClick={this.visiable.bind(this)}>
                                    更多 <Icon type="down" />
                                </span>
                            </div>
                        </Col>
                    </Row>
                </Form>
        );
    }
}

const FormRedux = Form.create({
    mapPropsToFields: props => {
        //把redux中的值取出来赋给表单
        let searchMap = props.$$state.toJS().searchMap;
        let value = {};
        for (let key in searchMap) {
            value[key] = { value: searchMap[key] };
        }
        return {
            ...value
        };
    },
    onFieldsChange: (props, onChangeFild) => {
        //往redux中写值//把值进行更新改变
        let searchMap = props.$$state.toJS().searchMap;
        for (let key in onChangeFild) {
            searchMap[key] = onChangeFild[key].value;
        }
        props.formRedux(searchMap);
    }
})(LessForm);

//绑定状态到组件props
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

export default connect(mapStateToProps, mapDispatchToProps)(FormRedux);
