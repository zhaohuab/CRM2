import { Form, Input, Row, Col,DatePicker,Button } from 'antd';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import moment from 'moment'
import Radio from 'utils/components/radios'
import getFormItem from 'utils/template/form'
import fieldHandler from 'utils/template/form/FieldHandler.js'

import * as Actions from "../action"
const FormItem = Form.Item;
class Card extends React.Component {
    constructor(props) {
        super(props)
    }
    tranCol(formitem) {
        if(formitem) {
            return <Col span={8}>
                        {formitem}
                    </Col>

        }
        return '';
    }
    save() {
        let { getFieldsValue, validateFieldsAndScroll } = this.props.form;
        validateFieldsAndScroll((err, values) => {
            if (!err) {
                this.props.action.onOrgSave(getFieldsValue());
            }
        });
    }

    trans(getFieldDecorator,tpl) {
        const formItemLayout = {
            labelCol: { span: 5 },
            wrapperCol: { span: 19 },
        };
        
        
        return tpl.map((field) => {
            return this.tranCol(getFormItem(getFieldDecorator,field,formItemLayout));
        })
    }

    render() {
        
        const { getFieldDecorator } = this.props.form;
        let { tpl } = this.props;
        return (<div>
        <Form >
            <Row >
                {tpl ? this.trans(getFieldDecorator,tpl) : ''}
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

const WrapCard = Form.create({
    onFieldsChange(props, changedFields) {
        fieldHandler(changedFields);
        props.onChange(changedFields);
    },
    mapPropsToFields(props) {
        let data = props.dataSource;
        // if(data) {
        //     if(data.companyCreatedTime && !data.companyCreatedTime.isTrans) {
        //         data.companyCreatedTime.value = moment(data.companyCreatedTime.value.time);
        //         data.companyCreatedTime.isTrans = true;
        //     }
        // }
        return {
            ...data,
        }
    }
})(Card);
export default connect(mapStateToProps, mapDispatchToProps)(WrapCard);
