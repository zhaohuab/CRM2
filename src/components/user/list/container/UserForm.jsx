import { Form,Input } from 'antd';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import getFormItem from 'utils/template/form'
import fieldHandler from 'utils/template/form/FieldHandler.js'
//导入action方法
import * as Actions from "../action";
import Enum from 'utils/components/enums'
const FormItem = Form.Item;
class Card extends React.Component {
    constructor(props) {
        super(props)
    }

    trans(getFieldDecorator,tpl) {
        let formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 6 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 14 },
            },
        };
        
        return tpl.map((field) => {
            return getFormItem(getFieldDecorator,field,formItemLayout);
        })
    }
    render() {
        const { getFieldDecorator } = this.props.form;

        let { tpl } = this.props;
        return (
        <Form >
            {tpl ? this.trans(getFieldDecorator,tpl) : ''}

        </Form>)
    }
}

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
//输出绑定state和action后组件

const WrapCard = Form.create({
    onFieldsChange(props, changedFields) {
        fieldHandler(changedFields);
        debugger
        props.onChange(changedFields);
    },
    mapPropsToFields(props) {
        debugger
        let data  = props.dataSource;
        
        return {
            ...data,
        }
    }
})(Card);
export default connect(mapStateToProps, mapDispatchToProps)(WrapCard);