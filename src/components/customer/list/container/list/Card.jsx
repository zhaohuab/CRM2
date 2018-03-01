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
import CuperiorCustomer from "./SuperiorCustomer"; //组件暂时不用
import IcbcInfo from "./IcbcInfo";
import MultiFunctionMap from "./MultiFunctionMap";
import UploadImg from "./UploadImg";
import CityChioce from "../../../../common/cityChioce/CityChioce";
import InputDisable from './InputDisable'
import SuperiorCustomer from './SuperiorCustomer'
import ProductLine from '../panel/ProductLine'
//import OwnUser from './OwnUser'

import Int from "utils/components/int";
import Float from "utils/components/float/index.jsx";

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

        const { getFieldDecorator, resetFields } = this.props.form;
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
                                style={{display: "none"}}
                                {...formItemLayout}
                                label="verifyId"
                            >
                                {getFieldDecorator("verifyId", {})(
                                    <Input type="text" placeholder="请输入" />
                                )}
                            </FormItem>
                            <FormItem
                                style={{display: "none"}}
                                {...formItemLayout}
                                label="id"
                            >
                                {getFieldDecorator("id", {})(
                                    <Input type="text" placeholder="请输入" />
                                )}
                            </FormItem>
                            <Row>
                                <Row>
                                    <Col span={2} className="form-title">
                                        客户信息:
                                    </Col>
                                </Row>
                                <Row>
                                    <Col offset={1}>
                                        <Row >
                                            <Col span={12} className="cum-from-row-bottom">
                                                <Row type="flex" align="middle">
                                                    <Col span={6}>
                                                        <Row type="flex" justify="end">
                                                            <span className="import">*</span>客户名称：
                                                        </Row>
                                                    </Col>
                                                    <Col span={13} id="upload-form-item" className='name'>
                                                        <FormItem {...formItemLayout}>
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
                                                    {viewData.isIdentified == 1 ? (
                                                        ""
                                                    ) : (
                                                        <Col span={5}>
                                                            <Row type="flex">
                                                                <IcbcInfo viewDataProps = {viewData}/>
                                                            </Row>
                                                        </Col>
                                                    )}
                                                </Row>
                                            </Col>
                                            
                                            <Col span={12} className="cum-from-row-bottom">
                                                <Row type="flex" align="middle">
                                                    <Col span={6}>
                                                        <Row
                                                            type="flex"
                                                            justify="end"
                                                        >
                                                            <div>
                                                                客户简称：
                                                            </div>
                                                        </Row>
                                                    </Col>
                                                    <Col span={18}>
                                                        <FormItem
                                                            {...formItemLayout}
                                                        >
                                                            {getFieldDecorator(
                                                                "shortname"
                                                            )(
                                                                <Input placeholder="请输入" />
                                                            )}
                                                        </FormItem>
                                                    </Col>
                                                </Row>
                                            </Col>
                                            <Col span={12} className="cum-from-row-bottom">
                                                <Row type="flex" align="middle">
                                                    <Col span={6}>
                                                        <Row
                                                            type="flex"
                                                            justify="end"
                                                        >
                                                            <div>
                                                                营业额(万元)：
                                                            </div>
                                                        </Row>
                                                    </Col>
                                                    <Col span={18}>
                                                        <FormItem
                                                            {...formItemLayout}
                                                        >
                                                            {getFieldDecorator(
                                                                "turnover"
                                                            )(
                                                                <Float
                                                                    attr={{
                                                                        precision: 2
                                                                    }}
                                                                />
                                                            )}
                                                        </FormItem>
                                                    </Col>
                                                </Row>
                                            </Col>
                                            <Col span={12} className="cum-from-row-bottom">
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
                                                            )(<Int />)}
                                                        </FormItem>
                                                    </Col>
                                                </Row>
                                            </Col>
                                            <Col span={12} className="cum-from-row-bottom">
                                                <Row type="flex" align="middle">
                                                    <Col span={6}>
                                                        <Row
                                                            type="flex"
                                                            justify="end"
                                                        >
                                                            <div>网址：</div>
                                                        </Row>
                                                    </Col>
                                                    <Col span={18}>
                                                        <FormItem
                                                            {...formItemLayout}
                                                        >
                                                            {getFieldDecorator(
                                                                "website",
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
                                            <Col span={12} className="cum-from-row-bottom">
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
                                            
                                            <Col span={12} className="cum-from-row-bottom">
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
                                  
                                        <Row className="cum-from-row-bottom">
                                            <Col span={24}>
                                                <Row type="flex">
                                                    <Col span={3}>
                                                        <Row type="flex" justify="end" >
                                                            <div>客户概要：</div>
                                                        </Row>
                                                    </Col>
                                                    <Col span={21} className="remark">
                                                        <FormItem {...formItemLayout1}>
                                                            {getFieldDecorator(
                                                                "summary",
                                                            )(
                                                                <TextArea
                                                                    autosize={{minRows: 3,maxRows: 8}}
                                                                    placeholder="请输入"
                                                                    style={{width:"100%"}}
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

                            <Row >
                                <Row>
                                    <Col span={2}>
                                        <div className="form-title">
                                            地址信息:
                                        </div>
                                    </Col>
                                </Row>
                                <Row className="cum-from-row-bottom">
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
                                                        )(<CityChioce />)}
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
                                                                cityCode={
                                                                    viewData.province_city_district
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
                            <Row>
                                <Row>
                                    <Col span={2}>
                                        <div className="form-title">
                                            管理信息:
                                        </div>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col offset={1}>
                                    <Col span={12}  className="cum-from-row-bottom">
                                            <Row type="flex" align="middle">
                                                <Col span={6}>
                                                    <Row
                                                        type="flex"
                                                        justify="end"
                                                    >
                                                        <div>销售区域：</div>
                                                    </Row>
                                                </Col>
                                                <Col span={18}>
                                                    <FormItem
                                                        {...formItemLayout}
                                                    >
                                                        {getFieldDecorator(
                                                            "saleArea"
                                                        )(
                                                            <Enum
                                                                addOptionAll={"销售区域"}
                                                                dataSource={
                                                                    enumData.saleArea
                                                                }
                                                            />
                                                            )}
                                                    </FormItem>
                                                </Col>
                                            </Row>
                                        </Col>
                                        <Col span={12}  className="cum-from-row-bottom">
                                            <Row type="flex" align="middle">
                                                <Col span={6}>
                                                    <Row
                                                        type="flex"
                                                        justify="end"
                                                    >
                                                        <div>客户类别：</div>
                                                    </Row>
                                                </Col>
                                                <Col span={18}>
                                                    <FormItem
                                                        {...formItemLayout}
                                                    >
                                                        {getFieldDecorator(
                                                            "category"
                                                        )(
                                                            <Enum
                                                                addOptionAll={
                                                                    "客户类别"
                                                                }
                                                                dataSource={
                                                                    enumData.category
                                                                }
                                                            />
                                                            )}
                                                    </FormItem>
                                                </Col>
                                            </Row>
                                        </Col>
                                        <Col span={12}  className="cum-from-row-bottom">
                                            <Row type="flex" align="middle">
                                                <Col span={6}>
                                                    <Row
                                                        type="flex"
                                                        justify="end"
                                                    >
                                                        <div>客户价值：</div>
                                                    </Row>
                                                </Col>
                                                <Col span={18}>
                                                    <FormItem
                                                        {...formItemLayout}
                                                    >
                                                        {getFieldDecorator(
                                                            "worth"
                                                        )(
                                                            <Enum
                                                                addOptionAll={
                                                                    "客户价值"
                                                                }
                                                                dataSource={
                                                                    enumData.worth
                                                                }
                                                            />
                                                            )}
                                                    </FormItem>
                                                </Col>
                                            </Row>
                                        </Col>
                                        <Col span={12}  className="cum-from-row-bottom">
                                            <Row type="flex" align="middle">
                                                <Col span={6}>
                                                    <Row
                                                        type="flex"
                                                        justify="end"
                                                    >
                                                        <div>云产品线：</div>
                                                    </Row>
                                                </Col>
                                                <Col span={18}>
                                                    <FormItem
                                                        {...formItemLayout}
                                                    >
                                                        {getFieldDecorator(
                                                            "productLine"
                                                        )(
                                                            <ProductLine/>
                                                        )}
                                                    </FormItem>
                                                </Col>
                                            </Row>
                                        </Col>
                                        
                                        <Col span={12}  className="cum-from-row-bottom">
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
                                        
                                        <Col span={12} className="cum-from-row-bottom">
                                            <Row type="flex" align="middle">
                                                <Col span={6}>
                                                    <Row
                                                        type="flex"
                                                        justify="end"
                                                    >
                                                        <div>上级客户：</div>
                                                    </Row>
                                                </Col>
                                                <Col span={18}>
                                                    <FormItem {...formItemLayout}>
                                                        {getFieldDecorator(
                                                            "parentId"
                                                        )(<SuperiorCustomer />)}
                                                    </FormItem>
                                                </Col>
                                            </Row>
                                        </Col>
                                        <Col span={12}  className="cum-from-row-bottom">
                                            <Row type="flex" align="middle">
                                                <Col span={6}>
                                                    <Row
                                                        type="flex"
                                                        justify="end"
                                                    >
                                                        <div>客户规模：</div>
                                                    </Row>
                                                </Col>
                                                <Col span={18}>
                                                    <FormItem
                                                        {...formItemLayout}
                                                    >
                                                        {getFieldDecorator(
                                                            "scale"
                                                        )(
                                                            <Enum
                                                                addOptionAll={
                                                                    "客户规模"
                                                                }
                                                                dataSource={
                                                                    enumData.scale
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
                            <Row>
                                <Row>
                                    <Col span={2}>
                                        <div className="form-title">
                                            更多信息:
                                        </div>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col offset={1}>
                                        <Row className="cum-from-row-bottom">
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
                                        <Row className="cum-from-row-bottom">
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
                                                        span={18}
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
                                                    {/* <Col span={4}>
                                                        <FormItem>
                                                            {getFieldDecorator(
                                                                "taxCertificate"
                                                            )(
                                                                <UploadImg title="税务登记证" />
                                                                )}
                                                        </FormItem>
                                                    </Col> */}
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
                                                        span={18}
                                                        id="upload-form-item"
                                                    >
                                                        <FormItem
                                                            {...formItemLayout}
                                                        >
                                                            {getFieldDecorator(
                                                                "bizRegno",
                                                            )(
                                                                <Input
                                                                    type="text"
                                                                    placeholder="请输入"
                                                                />
                                                                )}
                                                        </FormItem>
                                                    </Col>
                                                    {/* <Col span={4}>
                                                        <FormItem>
                                                            {getFieldDecorator(
                                                                "bizLicense"
                                                            )(
                                                                <UploadImg title="工商营业执照" />
                                                                )}
                                                        </FormItem>
                                                    </Col> */}
                                                </Row>
                                            </Col>
                                        </Row>
                                        <Row className="cum-from-row-bottom">
                                            <Col span={12}>
                                                <Row
                                                    type="flex"
                                                    align="middle"
                                                    gutter={10}
                                                >
                                                    <Col span={6}>
                                                        <Row
                                                            type="flex"
                                                            justify="start"
                                                        >
                                                            组织机构代码证：
                                                        </Row>
                                                    </Col>
                                                    <Col
                                                        span={18}
                                                        id="upload-form-item"
                                                    >
                                                        <FormItem {...formItemLayout}>
                                                            {getFieldDecorator(
                                                                "orgCode",
                                                            )(
                                                                <Input
                                                                    type="text"
                                                                    placeholder="请输入"
                                                                />
                                                            )}
                                                        </FormItem>
                                                    </Col>
                                                    {/* <Col span={4}>
                                                        <FormItem>
                                                            {getFieldDecorator(
                                                                "bizLicense"
                                                            )(
                                                                <UploadImg title="组织机构代码证" />
                                                            )}
                                                        </FormItem>
                                                    </Col> */}
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
        let value = {}
        let changeFieldData = (viewData,key)=>{
            if(key == 'biztype') debugger
            if(viewData[key] && viewData[key].hasOwnProperty('value')){//带验证信息的值
                return viewData[key].value
            }else if(viewData[key] && !viewData[key].hasOwnProperty('value')){//值为编辑时附上值，而不是带验证信息的值
                return viewData[key]
            }else{
                return undefined
            }
        }

        if(viewData.id){//如果是编辑挨个赋值
            for (let key in viewData) {
              value[key] = { value: changeFieldData(viewData,key)};
            }
            return {
                ...value
            }
        }
        debugger
        return {
            ...viewData
        };
    },
    onFieldsChange: (props, onChangeFild) => {
        //往redux中写值//把值进行更新改变
        let viewData = props.$$state.toJS().viewData;
        debugger
        for (let key in onChangeFild) {
            if(onChangeFild[key].hasOwnProperty('value')){
                viewData[key] = onChangeFild[key];
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

    {/* <Col span={12} className="cum-from-row-bottom">
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
                                                                <Input placeholder="请输入" />
                                                            )}
                                                        </FormItem>
                                                    </Col>
                                                </Row>
                                        </Col> */}
                                        {/* <Row className="cum-from-row-bottom">
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
                                                    <Col span={21} className="remark">
                                                        <FormItem {...formItemLayout1}>
                                                            {getFieldDecorator(
                                                                "remark",
                                                            )(
                                                                <TextArea
                                                                    autosize={{minRows: 3,maxRows: 8}}
                                                                    placeholder="请输入"
                                                                    style={{width:"100%"}}
                                                                />
                                                            )}
                                                        </FormItem>
                                                    </Col>
                                                </Row>
                                            </Col>
                                        </Row> */}
                                        {/* <Col span={12}  className="cum-from-row-bottom">
                                            <Row type="flex" align="middle">
                                                <Col span={6}>
                                                    <Row
                                                        type="flex"
                                                        justify="end"
                                                    >
                                                        <div>客户状态：</div>
                                                    </Row>
                                                </Col>
                                                <Col span={18}>
                                                    <FormItem
                                                        {...formItemLayout}
                                                    >
                                                        {getFieldDecorator(
                                                            "state"
                                                        )(
                                                            <Enum
                                                                addOptionAll={
                                                                    "客户状态"
                                                                }
                                                                dataSource={
                                                                    enumData.state
                                                                }
                                                            />
                                                        )}
                                                    </FormItem>
                                                </Col>
                                            </Row>
                                        </Col> */}
                                        {/* <Col span={12}  className="cum-from-row-bottom">
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
                                                            "biztype"
                                                        )(
                                                           <InputDisable disabled = {true}/>
                                                        )}
                                                    </FormItem>
                                                </Col>
                                            </Row>
                                        </Col> */}
                                        
                                        {/* <Col span={12}  className="cum-from-row-bottom">
                                            <Row type="flex" align="middle">
                                                <Col span={6}>
                                                    <Row
                                                        type="flex"
                                                        justify="end"
                                                    >
                                                        <div>客户等级：</div>
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
                                        </Col> */}
                                        
                                        {/* <Col span={12} className="cum-from-row-bottom">
                                            <Row type="flex" align="middle">
                                                <Col span={6}>
                                                    <Row
                                                        type="flex"
                                                        justify="end"
                                                    >
                                                        <div>渠道类型：</div>
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
                                        </Col> */}
