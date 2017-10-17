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
import moment from "moment";
import Department from "components/refs/departments";
import Enum from "utils/components/enum";
const FormItem = Form.Item;
const { TextArea } = Input;

const RadioGroup = Radio.Group;
export default class EditForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectValueLevel: "客户等级",
            selectValueSaleArea: "营销区域",
            selectValueCannelType: "渠道类型",
            selectValueIndustry: "行业",
            selectValueLifecycle: "生命周期",
            selectValueEnableState: "启用标识"
        };
    }

    componentDidMount() {
        if (this.props.isEdit == true) {
            let { fatherorgId, fatherorgName } = this.props.data;
            this.props.data.fatherorgId = {
                key: fatherorgId,
                title: fatherorgName
            };

            this.props.form.setFieldsValue(this.props.data);
        }
    }
    handleChangeLevel = value => {
        if (value == "0") {
            this.setState({
                selectValueLevel: "客户等级"
            });
        } else {
            this.setState({
                selectValueLevel: value
            });
        }
    };
    handleChangeSaleArea = value => {
        if (value == "0") {
            this.setState({
                selectValueSaleArea: "营销区域"
            });
        } else {
            this.setState({
                selectValueSaleArea: value
            });
        }
    };

    handleChangeIndustry = value => {
        if (value == "0") {
            this.setState({
                selectValueIndustry: "行业"
            });
        } else {
            this.setState({
                selectValueIndustry: value
            });
        }
    };

    render() {
        const formItemLayout = {
            labelCol: { span: 6 },
            wrapperCol: { span: 12 }
        };
        const { getFieldDecorator } = this.props.form;
        return (
            <Row id="form-input-recover">
                {this.props.data ? (
                    <Row>
                        <Form layout="inline" className="login-form">
                            <Row className="form-bottom">
                                <Row>
                                    <Col span={1} className="form-label">
                                        客户信息:
                                    </Col>
                                </Row>
                                <Row>
                                    <Col offset={1}>
                                        <Row className="row-bottom">
                                            <Col span={8}>
                                                <FormItem
                                                    {...formItemLayout}
                                                    label="客户名称"
                                                >
                                                    {getFieldDecorator("name", {
                                                        rules: [
                                                            {
                                                                required: true,
                                                                message:
                                                                    "请输入客户名称!"
                                                            }
                                                        ]
                                                    })(
                                                        <Input
                                                            type="text"
                                                            placeholder="请输入"
                                                        />
                                                    )}
                                                </FormItem>
                                            </Col>
                                            <Col span={8}>
                                                <FormItem
                                                    {...formItemLayout}
                                                    label="客户等级"
                                                >
                                                    {getFieldDecorator(
                                                        "level",
                                                        {}
                                                    )(
                                                        <Enum
                                                            isAddAll={true}
                                                            dataSource={
                                                                this.props
                                                                    .enumData
                                                                    .levelEnum
                                                            }
                                                            selectValue={
                                                                this.state
                                                                    .selectValueLevel
                                                            }
                                                            handleChange={
                                                                this
                                                                    .handleChangeLevel
                                                            }
                                                        />
                                                    )}
                                                </FormItem>
                                            </Col>
                                            <Col span={8}>
                                                <FormItem
                                                    {...formItemLayout}
                                                    label="营销区域"
                                                >
                                                    {getFieldDecorator(
                                                        "saleArea",
                                                        {}
                                                    )(
                                                        <Enum
                                                            isAddAll={true}
                                                            dataSource={
                                                                this.props
                                                                    .enumData
                                                                    .saleAreaEnum
                                                            }
                                                            selectValue={
                                                                this.state
                                                                    .selectValueSaleArea
                                                            }
                                                            handleChange={
                                                                this
                                                                    .handleChangeSaleArea
                                                            }
                                                        />
                                                    )}
                                                </FormItem>
                                            </Col>
                                        </Row>
                                        <Row className="row-bottom">
                                            <Col span={8}>
                                                <FormItem
                                                    {...formItemLayout}
                                                    label="行业"
                                                >
                                                    {getFieldDecorator(
                                                        "industry",
                                                        {}
                                                    )(
                                                        <Enum
                                                            isAddAll={true}
                                                            dataSource={
                                                                this.props
                                                                    .enumData
                                                                    .industryEnum
                                                            }
                                                            selectValue={
                                                                this.state
                                                                    .selectValueIndustry
                                                            }
                                                            handleChange={
                                                                this
                                                                    .handleChangeIndustry
                                                            }
                                                        />
                                                    )}
                                                </FormItem>
                                            </Col>
                                            <Col span={8}>
                                                <FormItem
                                                    {...formItemLayout}
                                                    label="负责人"
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
                                            <Col span={8}>
                                                <FormItem
                                                    {...formItemLayout}
                                                    label="负责部门"
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
                                        <Row className="row-bottom">
                                            <Col span={8}>
                                                <FormItem
                                                    {...formItemLayout}
                                                    label="上级客户"
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
                                            <Col span={8}>
                                                <FormItem
                                                    {...formItemLayout}
                                                    label="员工人数"
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
                                            <Col span={8} />
                                        </Row>
                                    </Col>
                                </Row>
                            </Row>
                            <Row className="form-bottom">
                                <Row>
                                    <Col span={1} className="form-label">
                                        备注:
                                    </Col>
                                </Row>
                                <Row>
                                    <Col offset={2}>
                                        <Row>
                                            <Col span={8}>
                                                <FormItem {...formItemLayout}>
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
                                                        // <Input
                                                        //     type="text"
                                                        //     placeholder="请输入"
                                                        // />
                                                    )}
                                                </FormItem>
                                            </Col>
                                        </Row>
                                    </Col>
                                </Row>
                            </Row>
                            <Row className="form-bottom">
                                <Row>
                                    <Col span={1}>
                                        <div className="form-label">地址信息:</div>
                                    </Col>
                                </Row>
                                <Row className="row-bottom">
                                    <Col offset={1}>
                                        <Col span={8}>
                                            <FormItem
                                                {...formItemLayout}
                                                label="省/市/区/县"
                                            >
                                                {getFieldDecorator(
                                                    "province_city_district",
                                                    {}
                                                )(
                                                    <Cascader
                                                        options={
                                                            this.props.cityData
                                                        }
                                                        placeholder="请输入"
                                                    />
                                                )}
                                            </FormItem>
                                        </Col>
                                        <Col span={8}>
                                            <FormItem
                                                {...formItemLayout}
                                                label="街道号码"
                                            >
                                                {getFieldDecorator(
                                                    "street",
                                                    {}
                                                )(
                                                    <Input
                                                        type="text"
                                                        placeholder="请输入"
                                                    />
                                                )}
                                            </FormItem>
                                        </Col>
                                        <Col span={8}>
                                            <FormItem
                                                {...formItemLayout}
                                                label="电话"
                                            >
                                                {getFieldDecorator("tel", {})(
                                                    <Input
                                                        type="text"
                                                        placeholder="请输入"
                                                    />
                                                )}
                                            </FormItem>
                                        </Col>
                                    </Col>
                                </Row>
                                <Row className="row-bottom">
                                    <Col offset={1}>
                                        <Col span={8}>
                                            <FormItem
                                                {...formItemLayout}
                                                label="邮箱"
                                            >
                                                {getFieldDecorator("email", {})(
                                                    <Input
                                                        type="text"
                                                        placeholder="请输入"
                                                    />
                                                )}
                                            </FormItem>
                                        </Col>
                                    </Col>
                                </Row>
                            </Row>
                            <Row className="form-bottom">
                                <Row>
                                    <Col span={1}>
                                        <div className="form-label">更多信息:</div>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col offset={1}>
                                        <Row className="row-bottom">
                                            <Col span={8}>
                                                {" "}
                                                <FormItem
                                                    {...formItemLayout}
                                                    label="注册资金"
                                                >
                                                    {getFieldDecorator(
                                                        "regCapital",
                                                        {}
                                                    )(
                                                        <Input
                                                            type="text"
                                                            placeholder="请输入"
                                                        />
                                                    )}
                                                </FormItem>
                                            </Col>
                                            <Col span={8}>
                                                <FormItem
                                                    {...formItemLayout}
                                                    label="法定代表人"
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
                                            <Col span={8}>
                                                <FormItem
                                                    {...formItemLayout}
                                                    label="纳税人识别号"
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
                                        </Row>
                                        <Row className="row-bottom">
                                            <Col span={8}>
                                                <FormItem
                                                    {...formItemLayout}
                                                    label="工商注册号"
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
                                            <Col span={8}>
                                                <FormItem
                                                    {...formItemLayout}
                                                    label="组织机构代码"
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
                                            <Col>
                                                <FormItem
                                                    style={{
                                                        display: "none"
                                                    }}
                                                    {...formItemLayout}
                                                    label="id"
                                                >
                                                    {getFieldDecorator(
                                                        "id",
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
                            </Row>
                        </Form>
                    </Row>
                ) : (
                    ""
                )}
            </Row>
        );
    }
}
