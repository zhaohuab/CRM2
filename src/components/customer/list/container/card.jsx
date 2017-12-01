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
    Row,
    Modal
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
import Industry from "./industry";
import CuperiorCustomer from "./superiorCustomer";
import IcbcInfo from "./icbcInfo";
import reqwest from "utils/reqwest";
import { baseDir } from "api";

const RadioGroup = Radio.Group;
class EditForm extends React.Component {
    constructor(props) {
        super(props);
    }

    //把获取到的客户工商信息放在redux中 id, name, visiable, editId, stateIcbc, isClose
    customerListInfo(data, visiable, id) {
        let { viewData } = this.props.$$state.toJS();
        viewData.verifyId = id;
        data.forEach(item => {
            if (item.key == "address") {
                viewData["address"] = item.value;
            } else if (item.key == "gongsh") {
                viewData["bizRegno"] = item.value;
            } else if (item.key == "orgcode") {
                viewData["orgCode"] = item.value;
            } else if (item.key == "money") {
                viewData["regCapital"] = item.value;
            } else if (item.key == "proxyer") {
                viewData["legalRepresent"] = item.value;
            } else if (item.key == "industry") {
                viewData["industry"] = { name: item.value };
            } else if (item.key == "email") {
                viewData["email"] = item.value;
            } else if (item.key == "phone") {
                viewData["tel"] = item.value;
            } else if (item.key == "taxnumber") {
                viewData["eaxplayerNo"] = item.value;
            }
        });
        debugger;
        this.props.action.customerListInfo(data, visiable, viewData);
    }

    //modal取消按钮
    onCancel() {
        this.props.action.customerModal1Show(false);
    }

    //取消认证
    cancelIdenti() {
        let { viewData } = this.props.$$state.toJS();
        let id = viewData.id;
        console.log(id);
        reqwest(
            {
                url: baseDir + `cum/customers/${id}/identifications`,
                method: "PUT",
                data: {
                    param: {
                        status: "N"
                    }
                }
            },
            data => {
                debugger;
                this.props.action.closeIcbcVisible1(false);
            }
        );
        //发Request请求
    }

    //modal框底部按钮
    footerContent() {
        return (
            <div>
                <Button onClick={this.onCancel.bind(this)}>关闭</Button>
                <Button onClick={this.cancelIdenti.bind(this)}>取消认证</Button>
            </div>
        );
    }

    render() {
        const formItemLayout = {
            labelCol: { span: 6 },
            wrapperCol: { span: 12 }
        };
        const { getFieldDecorator } = this.props.form;
        let {
            viewData,
            enumData,
            icbcVisible,
            icbcInfo,
            icbcSelect,
            isClose
        } = this.props.$$state.toJS();
        console.log(icbcSelect);
        return (
            <div>
                <Row className="form-input-recover">
                    <Row>
                        <Form layout="inline" className="login-form">
                            <FormItem
                                style={{
                                    display: "none"
                                }}
                                {...formItemLayout}
                                label="verifyId"
                            >
                                {getFieldDecorator("verifyId", {})(
                                    <Input type="text" placeholder="请输入" />
                                )}
                            </FormItem>
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
                                    <Col offset={1}>
                                        <Row className="row-bottom">
                                            <Col span={12}>
                                                <Row type="flex" align="middle">
                                                    <Col span={6}>
                                                        <Row
                                                            type="flex"
                                                            justify="end"
                                                        >
                                                            <span className="import">
                                                                *
                                                            </span>客户名称：
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
                                                    <Col span={5}>
                                                        <Row
                                                            type="flex"
                                                            justify="end"
                                                        >
                                                            <IcbcInfo
                                                                viewData={
                                                                    //获取当前数据所有信息
                                                                    viewData
                                                                }
                                                                icbcSelect={
                                                                    //当前数据编辑状态
                                                                    icbcSelect
                                                                }
                                                                customerListInfo={this.customerListInfo.bind(
                                                                    this
                                                                )} //获取信息详情的方法
                                                                isClose={
                                                                    //判断是否为编辑状态初始值
                                                                    isClose
                                                                }
                                                                width={450}
                                                            />
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
                                                            <div>
                                                                客户等级：
                                                            </div>
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
                                                                    addOptionAll={
                                                                        "客户等级"
                                                                    }
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
                                                                "respoPerson"
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
                                                            )(<Industry />)}
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
                                                            <div>
                                                                上级客户：
                                                            </div>
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
                                                                <CuperiorCustomer
                                                                    width={500}
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
                                                            <div>
                                                                渠道类型：
                                                            </div>
                                                        </Row>
                                                    </Col>
                                                    <Col span={16}>
                                                        <FormItem
                                                            {...formItemLayout}
                                                        >
                                                            {getFieldDecorator(
                                                                "cannelType"
                                                            )(
                                                                <Enum
                                                                    addOptionAll={
                                                                        "渠道类型"
                                                                    }
                                                                    dataSource={
                                                                        enumData.cannelType
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
                                                            <div>
                                                                员工人数：
                                                            </div>
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
                                        <div className="form-label">
                                            地址信息:
                                        </div>
                                    </Col>
                                </Row>
                                <Row className="row-bottom">
                                    <Col offset={2}>
                                        <Col span={12}>
                                            <Row type="flex" align="middle">
                                                <Col span={6}>
                                                    <Row
                                                        type="flex"
                                                        justify="end"
                                                    >
                                                        <div>省/市/区：</div>
                                                    </Row>
                                                </Col>
                                                <Col span={16}>
                                                    <FormItem
                                                        {...formItemLayout}
                                                    >
                                                        {getFieldDecorator(
                                                            "province_city_district",
                                                            {}
                                                        )(
                                                            <Cascader
                                                                options={
                                                                    cityData
                                                                }
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
                                                        <div>详细地址：</div>
                                                    </Row>
                                                </Col>
                                                <Col span={16}>
                                                    <FormItem
                                                        {...formItemLayout}
                                                    >
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
                                                    <Row
                                                        type="flex"
                                                        justify="end"
                                                    >
                                                        <div>邮箱：</div>
                                                    </Row>
                                                </Col>
                                                <Col span={16}>
                                                    <FormItem
                                                        {...formItemLayout}
                                                    >
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
                                                    <Row
                                                        type="flex"
                                                        justify="end"
                                                    >
                                                        <div>电话：</div>
                                                    </Row>
                                                </Col>
                                                <Col span={16}>
                                                    <FormItem
                                                        {...formItemLayout}
                                                    >
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
                                        <div className="form-label">
                                            更多信息:
                                        </div>
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
                                                            <div>
                                                                注册资金：
                                                            </div>
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
                                                            <div>
                                                                法定代表人：
                                                            </div>
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
                                                            组织机构代码证：
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
                <Modal
                    title="工商核实"
                    visible={icbcVisible}
                    onCancel={this.onCancel.bind(this)}
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

const cardForm = Form.create({
    mapPropsToFields: props => {
        //把redux中的值取出来赋给表单
        let viewData = props.$$state.toJS().viewData;

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
        debugger;
        let viewData = props.$$state.toJS().viewData;
        for (let key in onChangeFild) {
            if (onChangeFild[key].value && onChangeFild[key].value.key) {
                viewData[key] = onChangeFild[key].value.key;
            } else {
                // if (key == "name") {
                //     props.changeState(false);
                // }
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
