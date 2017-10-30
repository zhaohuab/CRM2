import { Form, Input, Row, Col,DatePicker,Button } from 'antd';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import moment from 'moment'
import Radio from 'utils/components/radios'

import * as Actions from "../action"
const FormItem = Form.Item;
class Card extends React.Component {
    constructor(props) {
        super(props)
    }
    typeEnum = [{
        key : 1,
        title : "集团型企业"
    },{
        key : 2,
        title : "公司型企业"
    }]
    componentDidMount() {
        if(this.props.dataSource) {
            
            let data = this.props.dataSource;
            data.companyType = {key:data.companyType,title:data.companyTypeName}
            data.companyCreatedTime = data.companyCreatedTime ? moment(data.companyCreatedTime.time) : undefined;
            this.props.form.setFieldsValue(this.props.dataSource);
        }
    }
    tranCol(formitem) {
        return <Col span={8}>
                    {formitem}
                </Col>
    }
    save() {
        let { getFieldsValue, validateFieldsAndScroll } = this.props.form;
        validateFieldsAndScroll((err, values) => {
            if (!err) {
                this.props.action.onOrgSave(getFieldsValue());
            }
        });
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: { span: 5 },
            wrapperCol: { span: 19 },
        };
        const formElements = [
            <FormItem
                label="企业名称"
                {...formItemLayout}
            >
                {getFieldDecorator('companyName', {
                    rules: [{
                        required: true, message: '必输',
                    }],
                })(
                    <Input />
                    )}
            </FormItem>, 
            <FormItem
                label="企业类型"
                {...formItemLayout}
            >
                {getFieldDecorator('companyType', {
                    rules: [{
                        required: true, message: '必输',
                    }],
                })(
                    <Radio dataSource={this.typeEnum}/>
                    )}
            </FormItem>,
            <FormItem
                label="简称"
                {...formItemLayout}
            >
                {getFieldDecorator('companySimpleName', {
                    rules: [{
                        required: true, message: '必输',
                    }],
                })(
                    <Input />
                    )}
            </FormItem>,
            <FormItem
                label="所属行业"
                {...formItemLayout}
            >
                {getFieldDecorator('companyIndustry', {
                    rules: [{
                        required: true, message: '必输',
                    }],
                })(
                    <Input />
                    )}
            </FormItem>,
            <FormItem
                label="创立时间"
                {...formItemLayout}
            >
                {getFieldDecorator('companyCreatedTime', {
                    rules: [{
                        required: true, message: '必输',
                    }],
                })(
                    <DatePicker style={{width:'100%'}} />
                    )}
            </FormItem>,
            <FormItem
                label="总部地址"
                {...formItemLayout}
            >
                {getFieldDecorator('companyAddress', {
                    rules: [{
                        required: true, message: '必输',
                    }],
                })(
                    <Input />
                    )}
            </FormItem>];
        {getFieldDecorator('orgId', {
        })(
            <Input />
            )}
        return (<div>
        <Form >
        
            <Row >
                {formElements.map((formitem) => {
                    return this.tranCol(formitem)
                })}  
            </Row>
        </Form>
        <Button type="primary" style={{ marginLeft: 15 }} onClick={() => this.save()}>保存</Button>
        </div>)
    }
}

//绑定状态到组件props
function mapStateToProps(state, ownProps) {
    return {
        $$state: state.sysinit
    }
}
//绑定action到组件props
function mapDispatchToProps(dispatch) {
    return {
        action: bindActionCreators(Actions, dispatch)
    }
}
//输出绑定state和action后组件
export default connect(mapStateToProps, mapDispatchToProps)(Card);
