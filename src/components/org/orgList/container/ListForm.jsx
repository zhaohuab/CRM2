import { Table, Icon, Button, Form, Input, Checkbox, Col, DatePicker, message, Radio } from 'antd';
import moment from 'moment';
import Department from 'components/refs/departments'
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as Actions from "../action/index.js";
const FormItem = Form.Item;

const RadioGroup = Radio.Group;

class ListForm extends React.Component {
    constructor(props) {
        super(props);
    }


    componentDidMount() {
        //装箱过程
        let { fatherorgId, fatherorgName, path } = this.props.data;
        // this.props.data.fatherorgId = { key: fatherorgId, title: fatherorgName, path };
        let isEdit = this.props.$$state.get("isEdit");
        if (!isEdit) {
            this.props.data.orgType = 3
        }
        this.props.form.setFieldsValue(this.props.data);
    }


    render() {
        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 6 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 14 },
            },
        };
        const { getFieldDecorator } = this.props.form;
        let isEdit = this.props.$$state.get("isEdit");
        return (
            <div>
                <Form {...formItemLayout} className="login-form home-form" >
                    <div>
                        {getFieldDecorator('id', {
                            rules: [],
                        })(
                            <Input style={{ display: 'none' }} type='text' placeholder="请输入编号!" />
                            )}
                    </div>
                    <FormItem {...formItemLayout} label='编码'>
                        {getFieldDecorator('code', {
                            rules: [{ required: true, message: '请输入编码' }],
                        })(
                            <Input type="text" placeholder="请输入编码" />
                            )}
                    </FormItem>
                    <FormItem {...formItemLayout} label='名称'>
                        {getFieldDecorator('name', {
                            rules: [{ required: true, message: '请输入名称!' }],
                        })(
                            <Input type='text' placeholder="请输入名称!" />
                            )}
                    </FormItem>
                    <FormItem  {...formItemLayout} label='简称'>
                        {getFieldDecorator('simpleName', {
                        })(
                            <Input type='text' placeholder="请输入简称!" />
                            )}
                    </FormItem>
                    <FormItem  {...formItemLayout} label='助记码'>
                        {getFieldDecorator('simpleCode', {
                        })(
                            <Input type='text' placeholder="请输入助记码!" />
                            )}
                    </FormItem>
                    {getFieldDecorator('fatherorgId', {
                        rules: [],
                    })(
                        <Input style={{ display: 'none' }} type='text' />
                        )}
                    {getFieldDecorator('path', {
                        rules: [],
                    })(
                        <Input style={{ display: 'none' }} type='text' />
                        )}
                    <FormItem
                        label="上级组织"
                        {...formItemLayout}
                    >
                        {getFieldDecorator('fatherorgName', {
                            rules: [],
                        })(
                            <Input disabled />
                            )}
                    </FormItem>
                    <FormItem  {...formItemLayout} label='组织类型'>
                        {getFieldDecorator('orgType', {
                            //initialValue:3,
                            rules: [{ required: true, message: '请输入组织类型!' }],
                        })(
                            <RadioGroup disabled={isEdit}>
                                <Radio value={2}>公司</Radio>
                                <Radio value={3}>部门</Radio>
                            </RadioGroup>
                            )}
                    </FormItem>
                </Form>
            </div>
        );
    }
}
//绑定状态到组件props
function mapStateToProps(state, ownProps) {
    return {
        $$state: state.orgReducers
    }
}

//绑定action到组件props
function mapDispatchToProps(dispatch) {
    return {
        action: bindActionCreators(Actions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(
    Form.create({
        onFieldsChange(props, fields) {
            let fieldsChangeData = {};
            let data = props.data;
            for (let item in fields) {
                fieldsChangeData = { [item]: fields[item].value };
            }
            Object.assign(props.data, fieldsChangeData);
            // props.action.setFieldsChangeData(fieldsChangeData);
            props.action.setFormData(props.data);
        },
        mapPropsToFields(props) {
            let data = props.data;
            return {
                id: {
                    value: data.id
                },
                code: {
                    value: data.code
                },
                name: {
                    value: data.name
                },
                simpleName: {
                    value: data.simpleName
                },
                simpleCode: {
                    value: data.simpleCode
                },
                // fatherorgId: {
                //     value: { key: data.fatherorgId, title: data.fatherorgName, path: data.path }
                // },
                fatherorgId: {
                    value: data.fatherorgId
                },
                path: {
                    value: data.path
                },
                fatherorgName: {
                    value: data.fatherorgName
                },
                respoPerson: {
                    value: data.respoPerson
                },
                otherespoPerson: {
                    value: data.otherespoPerson
                },
                orgType: {
                    value: data.orgType
                },


            };
        }
    })(ListForm));

