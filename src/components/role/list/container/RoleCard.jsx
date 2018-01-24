import { Form, Input, Select } from 'antd';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Department from 'components/refs/departments'
import Enum from 'utils/components/enums'
import * as roleActions from "../action"

const { TextArea } = Input;
const FormItem = Form.Item;
const Option = Select.Option;
class Card extends React.Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        //装箱过程
        let { orgId, orgName, type } = this.props.dataSource;

        // const isEdit = this.props.$$state.get("isEdit");
        // if(isEdit)
        // this.props.dataSource.orgId = { key: orgId, title: orgName };
        // if (type) {
        //     this.props.dataSource.type = { key: type, title: "" };
        // }
        this.props.form.setFieldsValue(this.props.dataSource);
    }
    componentWillMount() {

    }
    render() {
        const { getFieldDecorator } = this.props.form;
        const isEdit = this.props.$$state.get("isEdit");
        const enumData = this.props.$$state.get("enumData").toJS();
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
        {
            getFieldDecorator('id', {
            })(
                <Input />
                )
        }
        return (
            <Form >
                <FormItem
                    label="角色名称"
                    {...formItemLayout}
                >
                    {getFieldDecorator('name', {
                        rules: [{
                            required: true, message: '请输入角色名称',
                        }],
                    })(
                        <Input placeholder='请输入...' />
                        )}
                </FormItem>
                {isEdit ?
                    <div><FormItem
                        label="所属组织"
                        {...formItemLayout}
                    >
                        {getFieldDecorator('orgName', {
                            rules: [],
                        })(
                            <Input disabled />
                            )}
                    </FormItem>
                        <FormItem
                            label="角色类型"
                            {...formItemLayout}
                        >
                            {getFieldDecorator('typeName', {

                            })(
                                <Input disabled />
                                )}
                        </FormItem>
                        {getFieldDecorator('type', {
                            rules: [],
                        })(
                            <Input style={{ display: 'none' }} type='text' />
                            )}
                        {getFieldDecorator('orgId', {
                            rules: [],
                        })(
                            <Input style={{ display: 'none' }} type='text' />
                            )}
                    </div>
                    : <div><FormItem
                        label="所属组织"
                        {...formItemLayout}
                    >
                        {getFieldDecorator('orgId', {
                            rules: [{
                                required: true, message: '请选择所属组织',
                            }],
                        })(
                            <Department />
                            )}
                    </FormItem>
                        <FormItem
                            label="角色类型"
                            {...formItemLayout}
                        >
                            {getFieldDecorator('type', {
                                rules: [{
                                    required: true, message: '请选择角色类型',
                                }],
                            })(
                                <Enum
                                    dataSource={enumData.data} 
                                />
                                )}
                        </FormItem>
                    </div>
                }


                <FormItem
                    label="角色描述"
                    {...formItemLayout}
                >
                    {getFieldDecorator('description', {

                    })(
                        <TextArea rows='4' placeholder='请输入...' />
                        )}
                </FormItem>

            </Form>)
    }
}


//绑定状态到组件props
function mapStateToProps(state, ownProps) {
    return {
        $$state: state.roleList
    }
}

//绑定action到组件props
function mapDispatchToProps(dispatch) {
    return {
        action: bindActionCreators(roleActions, dispatch)
    }
}

//输出绑定state和action后组件
export default connect(mapStateToProps, mapDispatchToProps)(Card);