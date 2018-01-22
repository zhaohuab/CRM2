import { Modal, Cascader, Select, Form, Row, Col, Input, Button, Icon, Radio, Dropdown, Menu } from "antd";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Enum from "utils/components/enums";
import Department from 'components/refs/departments'
const FormItem = Form.Item;
const Option = Select.Option;
const ButtonGroup = Button.Group;
const confirm = Modal.confirm;
let RadioGroup = Radio.Group;
import "assets/stylesheet/all/iconfont.css";
//导入action方法
import * as Actions from "../action";

class SearchForm extends React.Component {
    constructor(props) {
        super(props);
    }
    handleSearch(e) {
        e.preventDefault();
        let that = this;
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.props.action.getListData(this.props.$$state.get("pagination").toJS(), values);
                this.props.action.getFunnelData(values)
            }
        });
    }

    componentDidMount() {
        //装箱过程
        this.props.form.setFieldsValue(this.props.$$state.get("searchMap").toJS());
    }

    //点击新增按钮事件
    onAdd() {
        this.setState({ isEdit: false });
        this.props.action.showRoleForm(true, {}, false);
    }

    btnSearchOnClick() {
        let pagination = this.props.$$state.get("pagination").toJS();

        const enableState = this.props.$$state.get("searchMap").toJS().enableState;
        const data = this.props.form.getFieldsValue();
        data.enableState = enableState;
        this.props.action.getListData({ pagination, searchMap: data });
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: { span: 2 },
            wrapperCol: { span: 22 }
        };

        return (
            <Row className="header-warpper">
                <Col span={12}>
                    <div className="less-form">
                        <Form layout="inline" onSubmit={this.handleSearch.bind(this)}>
                            <Row type="flex" align="middle" style={{ height: "54px" }}>
                                <Col span={9}>

                                    <FormItem {...formItemLayout}>
                                        {getFieldDecorator("type", {})(
                                            <Input
                                                placeholder="角色名称"
                                            />
                                        )}
                                    </FormItem>
                                </Col>
                                <Col span={9}>
                                    <FormItem {...formItemLayout}>
                                        {getFieldDecorator("saleStage", {})(
                                            <Department />
                                        )}
                                    </FormItem>
                                </Col>

                                <Col span={6}>

                                    <Button style={{ border:0 }} htmlType="submit">搜索</Button>

                                </Col>
                            </Row>
                        </Form>
                    </div>
                </Col>


                <Col span={12}>
                    <Row type="flex" gutter={15} align="middle" justify="end" style={{ height: "54px" }}>
                        <Col>
                            <Button
                                type="primary"
                                onClick={this.onAdd.bind(this)}
                            >
                                <i className="iconfont icon-xinjian" />新建
                                        </Button>
                        </Col>
                    </Row>
                </Col>
            </Row>

        );
    }
}

const WarpSearchForm = Form.create({
})(SearchForm);

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

export default connect(mapStateToProps, mapDispatchToProps)(WarpSearchForm);
