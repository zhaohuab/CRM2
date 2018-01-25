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

import "assets/stylesheet/all/iconfont.css";

import CityChioce from "../../../common/cityChioce/CityChioce"
import Industry from "../../../common/industry";
import SalesCompany from './SalesCompany.jsx'

class MoreForm extends React.Component {
    constructor(props) {
        super(props);
    }
    visiable(){
        this.props.visiable()
    }
    
    //点击查询
    searchForm(){
        this.props.searchForm()
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        let {preSearchMap} = this.props.$$state.toJS()
        const formItemLayout = {
            labelCol: { span: 2 },
            wrapperCol: { span: 22 }
        };
        
        return (
                <Form layout="inline">
                    <Row type="flex" align="middle">
                        <Col span={6} className='form-list-item'>
                            <FormItem {...formItemLayout}>
                                {getFieldDecorator("name")(
                                    <Input type="text" placeholder="客户名称" />
                                )}
                            </FormItem>
                        </Col>
                        <Col span={6} className='form-list-item'>
                            <FormItem {...formItemLayout}>
                                {getFieldDecorator("org")(
                                    <SalesCompany/>
                                )}
                            </FormItem>
                        </Col>
                        <Col span={6} className='form-list-item'>
                            <FormItem {...formItemLayout}>
                                {getFieldDecorator("province_city_district")(
                                    <CityChioce/>
                                )}
                            </FormItem>
                        </Col>
                        <Col span={6} className='form-list-item'>
                            <FormItem {...formItemLayout}>
                                {getFieldDecorator("type")(
                                    <Enum
                                        addOptionAll={"客户类型"}
                                        dataSource={preSearchMap.type}
                                    />
                                )}
                            </FormItem>
                        </Col>
                        <Col span={6} className='form-list-item'>
                            <FormItem {...formItemLayout}>
                                {getFieldDecorator("level")(
                                    <Enum
                                        addOptionAll={"客户等级"}
                                        dataSource={preSearchMap.level}
                                    />
                                )}
                            </FormItem>
                        </Col>
                        <Col span={6} className='form-list-item'>
                            <FormItem {...formItemLayout}>
                                {getFieldDecorator("industry")(
                                    <Industry/>
                                )}
                            </FormItem>
                        </Col>
                        <Col span={6} className='form-list-item'>
                            <FormItem {...formItemLayout}>
                                {getFieldDecorator("cannelType")(
                                    <Enum
                                        addOptionAll={"渠道类型"}
                                        dataSource={preSearchMap.cannelType}
                                    />
                                )}
                            </FormItem>
                        </Col>
                        <Col span={6} className='form-list-item'>
                            <div className="operate">
                                <span className='search' onClick={this.props.searchForm.bind(this)}>查询</span>
                                <span className="up" onClick={this.visiable.bind(this)}> 
                                    收起 <Icon type="down" />
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
})(MoreForm);

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
