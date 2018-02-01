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
    Modal,
    Upload
} from "antd";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
//导入action方法
import * as Actions from "../../action";
import moment from "moment";
import reqwest from "utils/reqwest";
import { baseDir } from "api";

import Department from "components/refs/departments";
import Enum from "utils/components/enums";

import * as enumDataFake from "../data/enumdata";

import Industry from "../../../../common/industry";
import CuperiorCustomer from "./SuperiorCustomer";//组件暂时不用
import IcbcInfo from "./IcbcInfo";
import MultiFunctionMap from "./MultiFunctionMap";
import UploadImg from "./UploadImg";
import CityChioce from "../../../../common/cityChioce/CityChioce"
//import OwnUser from './OwnUser'
//import ResponseDepart from './ResponseDepart'

import Int from 'utils/components/int'
import Float from 'utils/components/float/index.jsx'

const FormItem = Form.Item;
const { TextArea } = Input;
const RadioGroup = Radio.Group;

class EditForm extends React.Component {
    constructor(props) {
        super(props);
    }

    //取消认证
    cancelIdenti() {
        let { viewData } = this.props.$$state.toJS();
        let id = viewData.id;

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
                this.props.action.closeIcbcVisible1(false);
            }
        );
        //发Request请求
    }


    render() {
        const formItemLayout = {
            labelCol: { span: 6 },
            wrapperCol: { span: 12 }
        };
        const formItemLayout1 = {
            labelCol: { span: 6 },
            wrapperCol: { span: 20 }
        };

        const { getFieldDecorator ,resetFields} = this.props.form;
        let {
            viewData,
            enumData,
            icbcVisible,
            icbcInfo,
            icbcSelect,
            isClose,
            upLoadList
        } = this.props.$$state.toJS();
     
        return (
            <div>
                <Row className="customform-input-recover">
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
                                    <Col span={2} className="form-title">
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
                                                        span={12}
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
                                                    {
                                                        viewData.verifyFullname == 1 && viewData.id?'':
                                                        <Col span={5}>
                                                            <Row
                                                                type="flex"
                                                                justify="end"
                                                            >                                   
                                                                <IcbcInfo width={450}/>
                                                            </Row>
                                                        </Col>
                                                    }
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
                                                                客户全称：
                                                            </div>
                                                        </Row>
                                                    </Col>
                                                    <Col span={18}>
                                                        <FormItem
                                                            {...formItemLayout}
                                                        >
                                                            {getFieldDecorator(
                                                                "fullname"
                                                            )(
                                                                <Input placeholder='请输入'/>
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
                                                                <div>营业额(万元)：</div>
                                                            </Row>
                                                        </Col>
                                                        <Col span={18}>
                                                            <FormItem
                                                                {...formItemLayout}
                                                            >
                                                                {getFieldDecorator(
                                                                    "turnover"
                                                                )(
                                                                    <Float attr = {{precision:2}}/>
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
                                                <Col span={18}>
                                                    <FormItem
                                                        {...formItemLayout}
                                                    >
                                                        {getFieldDecorator(
                                                            "employeeNum",
                                                            {}
                                                        )(
                                                            <Int/>
                                                            
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
                                                    <div>邮箱：</div>
                                                </Row>
                                            </Col>
                                            <Col span={18}>
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
                                            <Col span={18}>
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
                                </Row>
                            
                                <Row className="row-bottom">
                                    <Col span={24}>
                                        <Row type="flex">
                                            <Col span={3}>
                                                <Row
                                                    type="flex"
                                                    justify="end"
                                                >
                                                    <div>备注：</div>
                                                </Row>
                                            </Col>
                                            <Col span={21} className='remark'>
                                                <FormItem
                                                    {...formItemLayout1}
                                                >
                                                    {getFieldDecorator(
                                                        "remark",
                                                        {}
                                                    )(
                                                        <TextArea
                                                            autosize={{
                                                                minRows: 3,
                                                                maxRows: 8
                                                            }}
                                                            placeholder="请输入"
                                                            style={{width:'100%'}}
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
                                        <div className="form-title">
                                            地址信息:
                                        </div>
                                    </Col>
                                </Row>
                                <Row className="row-bottom">
                                    <Col offset={1}>
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
                                                <Col span={18}>
                                                    <FormItem
                                                        {...formItemLayout}
                                                    >
                                                    {getFieldDecorator(
                                                        "province_city_district"
                                                    )(
                                                            <CityChioce/>
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
                                                <Col span={18}>
                                                    <FormItem
                                                        {...formItemLayout}
                                                    >
                                                        {getFieldDecorator(
                                                            "street"
                                                        )(
                                                            
                                                            <MultiFunctionMap
                                                                cityCode={viewData.province_city_district}
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
                                        <div className="form-title">
                                            负责人信息:
                                        </div>
                                    </Col>
                                </Row>
                                {/* <Row className="row-bottom">
                                    <Col offset={1}>
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
                                                <Col span={18}>
                                                    <FormItem
                                                        {...formItemLayout}
                                                    >
                                                        {getFieldDecorator(
                                                            "ownerUserId"
                                                        )(
                                                            <OwnUser viewData={viewData} disabled={true} width={650} height={300}/>
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
                                                        <div>负责部门：</div>
                                                    </Row>
                                                </Col>
                                                <Col span={18}>
                                                    <FormItem
                                                        {...formItemLayout}
                                                    >
                                                        {getFieldDecorator(
                                                            "ownerDeptName"
                                                        )(
                                                            <ResponseDepart viewData={viewData}/>
                                                        )}
                                                    </FormItem>
                                                </Col>
                                            </Row>
                                        </Col>
                                    </Col>
                                </Row> */}
                                <Row className="row-bottom">
                                    <Col offset={1}>
                                        <Col span={12}>
                                            <Row type="flex" align="middle">
                                                <Col span={6}>
                                                    <Row
                                                        type="flex"
                                                        justify="end"
                                                    >
                                                        <div>客户类型：</div>
                                                    </Row>
                                                </Col>
                                                <Col span={18}>
                                                    <FormItem
                                                        {...formItemLayout}
                                                    >
                                                        {getFieldDecorator(
                                                            "type"
                                                        )(
                                                            <Enum
                                                                addOptionAll={
                                                                    "客户类型"
                                                                }
                                                                dataSource={
                                                                    enumData.type
                                                                }
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
                                                            客户等级：
                                                        </div>
                                                    </Row>
                                                </Col>
                                                <Col span={18}>
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
                                    </Col>
                                </Row>
                                <Row className="row-bottom">
                                    <Col offset={1}>
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
                                                <Col span={18}>
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
                                                <Col span={18}>
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
                                    </Col>
                                </Row>
                            </Row>
                            <Row className="form-bottom">
                                <Row>
                                    <Col span={2}>
                                        <div className="form-title">
                                            更多信息:
                                        </div>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col offset={1}>
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
                                                                注册资本：
                                                            </div>
                                                        </Row>
                                                    </Col>
                                                    <Col span={18}>
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
                                                    <Col span={18}>
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
                                                        span={13}
                                                        id="upload-form-item"
                                                    >
                                                        <FormItem
                                                            {...formItemLayout}
                                                        >
                                                            {getFieldDecorator(
                                                                "taxpayerNo"
                                                            )(
                                                                <Input
                                                                    type="text"
                                                                    placeholder="请输入"
                                                                />
                                                            )}
                                                        </FormItem>
                                                    </Col>
                                                    <Col span={4}>
                                                        <FormItem>
                                                            {getFieldDecorator(
                                                                "taxCertificate",
                                                            )(
                                                                <UploadImg title='税务登记证'/>
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
                                                            工商注册号：
                                                        </Row>
                                                    </Col>
                                                    <Col
                                                        span={13}
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
                                                        <FormItem>
                                                            {getFieldDecorator(
                                                                "bizLicense",
                                                            )(
                                                                <UploadImg title='工商营业执照'/>
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
                                                            组织机构代码证：
                                                        </Row>
                                                    </Col>
                                                    <Col
                                                        span={13}
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
                                                        <FormItem>
                                                            {getFieldDecorator(
                                                                "bizLicense",
                                                            )(
                                                                <UploadImg title='组织机构代码证'/>
                                                            )}
                                                        </FormItem>
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
            // if (key == "address") {
            //     value[key] = {
            //         value: {
            //             address: viewData[key],
            //             latlng: viewData["latlng"]
            //         }
            //     };
            // } else {
                value[key] = { value: viewData[key] };
           // }
        }
        //address  把字段合成对象
        return {
            ...value
        };
    },
    onFieldsChange: (props, onChangeFild) => {
        debugger
        //往redux中写值//把值进行更新改变
        let viewData = props.$$state.toJS().viewData;
        for (let key in onChangeFild) {
            // if (key == "address") {
            //     let value = onChangeFild[key].value;
            //     viewData["address"] = value.address;
            //     if (typeof value.latlng == "string") {
            //         viewData["latlng"] = value.latlng;
            //     } else {
            //         viewData["latlng"] =
            //             value.latlng.lng + "," + value.latlng.lat;
            //     }
            // } else {
                viewData[key] = onChangeFild[key].value;
            //} //把对像拆成字段  latlng
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
