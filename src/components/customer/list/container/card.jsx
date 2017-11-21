import {
    Cascader,
    Table,
    Icon,
    Button,
    Form,
    Input,
    Checkbox,
    Col,
    DatePicker,
    message,
    Radio,
    Row
} from "antd";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
//导入action方法
import * as Actions from "../action";
import moment from "moment";
import Department from "components/refs/departments";
import Enum from "utils/components/enums";
const FormItem = Form.Item;
const { TextArea } = Input;
import * as enumDataFake from "./enumdata";
import cityData from "./citydata";

const RadioGroup = Radio.Group;
class EditForm extends React.Component {
    constructor(props) {
        super(props);
    }

    // componentDidMount() {
    //     //用来判断是新增还是修改，添加数据用的
    //     if (this.props.$$state.get("isEdit") == true) {
    //         const viewData = this.props.$$state.get("viewData").toJS();
    //         let { fatherorgId, fatherorgName, level, levelName } = viewData;
    //         viewData.fatherorgId = {
    //             key: fatherorgId,
    //             title: fatherorgName
    //         };
    //         viewData.level = {
    //             key: level,
    //             title: levelName
    //         };
    //         const province_city_district = [];
    //         province_city_district.push(String(viewData.province));
    //         province_city_district.push(String(viewData.city));
    //         province_city_district.push(String(viewData.district));
    //         viewData.province_city_district = province_city_district;
    //         this.props.form.setFieldsValue(viewData);
    //     }
    // }

    render() {
        const formItemLayout = {
            labelCol: { span: 6 },
            wrapperCol: { span: 12 }
        };
        const { getFieldDecorator } = this.props.form;
        const viewData = this.props.$$state.get("viewData").toJS();
        const enumData = this.props.$$state.get("enumData").toJS();
        return (
            <Row className="form-input-recover">
                <Row>
                    <Form layout="inline" className="login-form">
                        <FormItem
                            style={{
                                display: "none"
                            }}
                            {...formItemLayout}
                            label="id"
                        >
                            {getFieldDecorator("id", {})(
                                <Input type="text" placeholder="请输入" />
                            )}
                        </FormItem>
                        <Row className="form-bottom">
                            <Row>
                                <Col span={2} className="form-label">
                                    客户信息:
                                </Col>
                            </Row>
                            <Row>
                                <Col offset={2}>
                                    <Row className="row-bottom">
                                        <Col span={12}>
                                            <Row type="flex" align="middle">
                                                <Col span={6}>
                                                    <Row
                                                        type="flex"
                                                        justify="end"
                                                    >
                                                        <span className="import">*</span>客户名称：
                                                    </Row>
                                                </Col>
                                                <Col
                                                    span={11}
                                                    id="upload-form-item"
                                                >
                                                    <FormItem
                                                        {...formItemLayout}
                                                    >
                                                        {getFieldDecorator(
                                                            "name",
                                                            {
                                                                rules: [
                                                                    {
                                                                        required: true,
                                                                        message:
                                                                            "请输入客户名称!"
                                                                    }
                                                                ]
                                                            }
                                                        )(
                                                            <Input
                                                                type="text"
                                                                placeholder="请输入"
                                                            />
                                                        )}
                                                    </FormItem>
                                                </Col>
                                                <Col span={4}>
                                                    <Row
                                                        type="flex"
                                                        justify="end"
                                                    >
                                                        <span className="icbc">
                                                            工商认证
                                                        </span>
                                                    </Row>
                                                </Col>
                                            </Row>
                                        </Col>
                                        <Col span={12}>
                                            <Row type="flex" align="middle">
                                                <Col span={6}>
                                                    <Row
                                                        type="flex"
                                                        justify="end"
                                                    >
                                                        <div>客户等级：</div>
                                                    </Row>
                                                </Col>
                                                <Col span={16}>
                                                    <FormItem
                                                        {...formItemLayout}
                                                    >
                                                        {getFieldDecorator(
                                                            "level"
                                                        )(
                                                            <Enum
                                                                dataSource={
                                                                    enumData.level
                                                                }
                                                            />
                                                        )}
                                                    </FormItem>
                                                </Col>
                                            </Row>
                                        </Col>
                                    </Row>
                                    <Row className="row-bottom">
                                        <Col span={12}>
                                            <Row type="flex" align="middle">
                                                <Col span={6}>
                                                    <Row
                                                        type="flex"
                                                        justify="end"
                                                    >
                                                        <div>负责人：</div>
                                                    </Row>
                                                </Col>
                                                <Col span={16}>
                                                    <FormItem
                                                        {...formItemLayout}
                                                    >
                                                        {getFieldDecorator(
                                                            "respoPerson",
                                                            {}
                                                        )(
                                                            <Input
                                                                type="text"
                                                                placeholder="请输入"
                                                            />
                                                        )}
                                                    </FormItem>
                                                </Col>
                                            </Row>
                                        </Col>
                                        <Col span={12}>
                                            <Row type="flex" align="middle">
                                                <Col span={6}>
                                                    <Row
                                                        type="flex"
                                                        justify="end"
                                                    >
                                                        <div>行业：</div>
                                                    </Row>
                                                </Col>
                                                <Col span={16}>
                                                    <FormItem
                                                        {...formItemLayout}
                                                    >
                                                        {getFieldDecorator(
                                                            "industry"
                                                        )(<Input />)}
                                                    </FormItem>
                                                </Col>
                                            </Row>
                                        </Col>
                                    </Row>
                                    <Row className="row-bottom">
                                        <Col span={12}>
                                            <Row type="flex" align="middle">
                                                <Col span={6}>
                                                    <Row
                                                        type="flex"
                                                        justify="end"
                                                    >
                                                        <div>上级客户：</div>
                                                    </Row>
                                                </Col>
                                                <Col span={16}>
                                                    <FormItem
                                                        {...formItemLayout}
                                                    >
                                                        {getFieldDecorator(
                                                            "parentId",
                                                            {}
                                                        )(
                                                            <Input
                                                                type="text"
                                                                placeholder="请输入"
                                                            />
                                                        )}
                                                    </FormItem>
                                                </Col>
                                            </Row>
                                        </Col>
                                        <Col span={12}>
                                            <Row type="flex" align="middle">
                                                <Col span={6}>
                                                    <Row
                                                        type="flex"
                                                        justify="end"
                                                    >
                                                        <div>渠道类型：</div>
                                                    </Row>
                                                </Col>
                                                <Col span={16}>
                                                    <FormItem
                                                        {...formItemLayout}
                                                    >
                                                        {getFieldDecorator(
                                                            "respoDept",
                                                            {}
                                                        )(
                                                            <Input
                                                                type="text"
                                                                placeholder="请输入"
                                                            />
                                                        )}
                                                    </FormItem>
                                                </Col>
                                            </Row>
                                        </Col>
                                    </Row>
                                    <Row className="row-bottom">
                                        <Col span={12}>
                                            <Row type="flex">
                                                <Col span={6}>
                                                    <Row
                                                        type="flex"
                                                        justify="end"
                                                    >
                                                        <div>备注：</div>
                                                    </Row>
                                                </Col>
                                                <Col span={16}>
                                                    <FormItem
                                                        {...formItemLayout}
                                                    >
                                                        {getFieldDecorator(
                                                            "remark",
                                                            {}
                                                        )(
                                                            <TextArea
                                                                autosize={{
                                                                    minRows: 4,
                                                                    maxRows: 8
                                                                }}
                                                                placeholder="请输入"
                                                            />
                                                        )}
                                                    </FormItem>
                                                </Col>
                                            </Row>
                                        </Col>
                                        <Col span={12}>
                                            <Row type="flex" align="middle">
                                                <Col span={6}>
                                                    <Row
                                                        type="flex"
                                                        justify="end"
                                                    >
                                                        <div>员工人数：</div>
                                                    </Row>
                                                </Col>
                                                <Col span={16}>
                                                    <FormItem
                                                        {...formItemLayout}
                                                    >
                                                        {getFieldDecorator(
                                                            "employeeNum",
                                                            {}
                                                        )(
                                                            <Input
                                                                type="text"
                                                                placeholder="请输入"
                                                            />
                                                        )}
                                                    </FormItem>
                                                </Col>
                                            </Row>
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                        </Row>

                        <Row className="form-bottom">
                            <Row>
                                <Col span={2}>
                                    <div className="form-label">地址信息:</div>
                                </Col>
                            </Row>
                            <Row className="row-bottom">
                                <Col offset={2}>
                                    <Col span={12}>
                                        <Row type="flex" align="middle">
                                            <Col span={6}>
                                                <Row type="flex" justify="end">
                                                    <div>省/市/区：</div>
                                                </Row>
                                            </Col>
                                            <Col span={16}>
                                                <FormItem {...formItemLayout}>
                                                    {getFieldDecorator(
                                                        "province_city_district",
                                                        {}
                                                    )(
                                                        <Cascader
                                                            options={cityData}
                                                            placeholder="请输入"
                                                        />
                                                    )}
                                                </FormItem>
                                            </Col>
                                        </Row>
                                    </Col>
                                    <Col span={12}>
                                        <Row type="flex" align="middle">
                                            <Col span={6}>
                                                <Row type="flex" justify="end">
                                                    <div>详细地址：</div>
                                                </Row>
                                            </Col>
                                            <Col span={16}>
                                                <FormItem {...formItemLayout}>
                                                    {getFieldDecorator(
                                                        "address",
                                                        {}
                                                    )(
                                                        <Input
                                                            type="text"
                                                            placeholder="请输入"
                                                        />
                                                    )}
                                                </FormItem>
                                            </Col>
                                        </Row>
                                    </Col>
                                </Col>
                            </Row>
                            <Row className="row-bottom">
                                <Col offset={2}>
                                    <Col span={12}>
                                        <Row type="flex" align="middle">
                                            <Col span={6}>
                                                <Row type="flex" justify="end">
                                                    <div>邮箱：</div>
                                                </Row>
                                            </Col>
                                            <Col span={16}>
                                                <FormItem {...formItemLayout}>
                                                    {getFieldDecorator(
                                                        "email",
                                                        {}
                                                    )(
                                                        <Input
                                                            type="text"
                                                            placeholder="请输入"
                                                        />
                                                    )}
                                                </FormItem>
                                            </Col>
                                        </Row>
                                    </Col>
                                    <Col span={12}>
                                        <Row type="flex" align="middle">
                                            <Col span={6}>
                                                <Row type="flex" justify="end">
                                                    <div>电话：</div>
                                                </Row>
                                            </Col>
                                            <Col span={16}>
                                                <FormItem {...formItemLayout}>
                                                    {getFieldDecorator(
                                                        "tel",
                                                        {}
                                                    )(
                                                        <Input
                                                            type="text"
                                                            placeholder="请输入"
                                                        />
                                                    )}
                                                </FormItem>
                                            </Col>
                                        </Row>
                                    </Col>
                                </Col>
                            </Row>
                        </Row>
                        <Row className="form-bottom">
                            <Row>
                                <Col span={2}>
                                    <div className="form-label">更多信息:</div>
                                </Col>
                            </Row>
                            <Row>
                                <Col offset={2}>
                                    <Row className="row-bottom">
                                        <Col span={12}>
                                            <Row
                                                type="flex"
                                                align="middle"
                                                gutter={10}
                                            >
                                                <Col span={6}>
                                                    <Row
                                                        type="flex"
                                                        justify="end"
                                                    >
                                                        <div>注册资金：</div>
                                                    </Row>
                                                </Col>
                                                <Col span={16}>
                                                    <FormItem
                                                        {...formItemLayout}
                                                        label=""
                                                    >
                                                        {getFieldDecorator(
                                                            "regCapital"
                                                        )(
                                                            <Input
                                                                type="text"
                                                                placeholder="请输入"
                                                            />
                                                        )}
                                                    </FormItem>
                                                </Col>
                                            </Row>
                                        </Col>
                                        <Col span={12}>
                                            <Row
                                                type="flex"
                                                align="middle"
                                                gutter={10}
                                            >
                                                <Col span={6}>
                                                    <Row
                                                        type="flex"
                                                        justify="end"
                                                    >
                                                        <div>法定代表人：</div>
                                                    </Row>
                                                </Col>
                                                <Col span={16}>
                                                    <FormItem
                                                        {...formItemLayout}
                                                    >
                                                        {getFieldDecorator(
                                                            "legalRepresent",
                                                            {}
                                                        )(
                                                            <Input
                                                                type="text"
                                                                placeholder="请输入"
                                                            />
                                                        )}
                                                    </FormItem>
                                                </Col>
                                            </Row>
                                        </Col>
                                    </Row>
                                    <Row className="row-bottom">
                                        <Col span={12}>
                                            <Row
                                                type="flex"
                                                align="middle"
                                                gutter={10}
                                            >
                                                <Col span={6}>
                                                    <Row
                                                        type="flex"
                                                        justify="end"
                                                    >
                                                        纳税人识别号：
                                                    </Row>
                                                </Col>
                                                <Col
                                                    span={11}
                                                    id="upload-form-item"
                                                >
                                                    <FormItem
                                                        {...formItemLayout}
                                                    >
                                                        {getFieldDecorator(
                                                            "eaxplayerNo",
                                                            {}
                                                        )(
                                                            <Input
                                                                type="text"
                                                                placeholder="请输入"
                                                            />
                                                        )}
                                                    </FormItem>
                                                </Col>
                                                <Col span={4}>
                                                    <Button>+照片</Button>
                                                </Col>
                                            </Row>
                                        </Col>
                                        <Col span={12}>
                                            <Row
                                                type="flex"
                                                align="middle"
                                                gutter={10}
                                            >
                                                <Col span={6}>
                                                    <Row
                                                        type="flex"
                                                        justify="end"
                                                    >
                                                        工商注册号：
                                                    </Row>
                                                </Col>
                                                <Col
                                                    span={11}
                                                    id="upload-form-item"
                                                >
                                                    <FormItem
                                                        {...formItemLayout}
                                                    >
                                                        {getFieldDecorator(
                                                            "bizRegno",
                                                            {}
                                                        )(
                                                            <Input
                                                                type="text"
                                                                placeholder="请输入"
                                                            />
                                                        )}
                                                    </FormItem>
                                                </Col>
                                                <Col span={4}>
                                                    <Button>+照片</Button>
                                                </Col>
                                            </Row>
                                        </Col>
                                    </Row>
                                    <Row className="row-bottom">
                                        <Col span={12}>
                                            <Row
                                                type="flex"
                                                align="middle"
                                                gutter={10}
                                            >
                                                <Col span={6}>
                                                    <Row
                                                        type="flex"
                                                        justify="end"
                                                    >
                                                        组织机构代码：
                                                    </Row>
                                                </Col>
                                                <Col
                                                    span={11}
                                                    id="upload-form-item"
                                                >
                                                    <FormItem
                                                        {...formItemLayout}
                                                    >
                                                        {getFieldDecorator(
                                                            "orgCode",
                                                            {}
                                                        )(
                                                            <Input
                                                                type="text"
                                                                placeholder="请输入"
                                                            />
                                                        )}
                                                    </FormItem>
                                                </Col>
                                                <Col span={4}>
                                                    <Button>+照片</Button>
                                                </Col>
                                            </Row>
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                        </Row>
                    </Form>
                </Row>
            </Row>
        );
    }
}

const cardForm = Form.create({
    mapPropsToFields: props => {
        //把redux中的值取出来赋给表单
        let viewData = props.$$state.toJS().viewData;
        debugger;
        let value = {};
        for (let key in viewData) {
            value[key] = { value: viewData[key] };
        }
        return {
            ...value
        };
    },
    onFieldsChange: (props, onChangeFild) => {
        //往redux中写值//把值进行更新改变
        let viewData = props.$$state.toJS().viewData;
        debugger;
        for (let key in onChangeFild) {
            if (onChangeFild[key].value.key) {
                viewData[key] = onChangeFild[key].value.key;
            } else {
                viewData[key] = onChangeFild[key].value;
            }
        }
        props.editCardFn(viewData);
    }
})(EditForm);

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
export default connect(mapStateToProps, mapDispatchToProps)(cardForm);
