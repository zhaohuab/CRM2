import { Form, Input,Spin } from 'antd';
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

    trans(getFieldDecorator, tpl) {
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
            return getFormItem(getFieldDecorator, field, formItemLayout);
        })
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        let cardLoading = this.props.$$state.get("cardLoading"); 
        let { tpl } = this.props;
        let formData = this.props.$$state.get("formData").toJS()
        if(tpl){
            for(let i=0;i<tpl.length;i++){
                if(tpl[i].relation&&formData[tpl[i].relation]&&formData[tpl[i].relation].value){
                   tpl[i].relationId = formData[tpl[i].relation].value;
                }else if(tpl[i].relation&&formData[tpl[i].relation]){
                    //此为编辑时打开情况。
                    tpl[i].relationId = formData[tpl[i].relation];
                }
            }
        }
        return (
            <Spin spinning={cardLoading}>
            <Form >
                {tpl ? this.trans(getFieldDecorator, tpl) : ''}

            </Form>
            </Spin>)
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
        if (changedFields.orgName && changedFields.orgName.value&&changedFields.orgName.value.value&&changedFields.orgName.value.value.id == undefined) {
            fieldHandler(changedFields);
            let template = props.$$state.get("template").toJS();
            let isEdit = props.$$state.get("isEdit");
            let tpl;
            if (isEdit) {
                tpl = template.edit;
            }
            else {
                tpl = template.add
            }
            for (let i = 0; i < tpl.length; i++) {
                if (tpl[i].code == "deptId") {
                    tpl[i].disabled = true;
                }
                if (tpl[i].code == "deptName") {
                    tpl[i].disabled = true;
                }
            }
            props.action.saveTpl(template)
        }else{
            fieldHandler(changedFields);
            if (changedFields.orgId) {
                let template = props.$$state.get("template").toJS();
                let isEdit = props.$$state.get("isEdit");
                let tpl;
                if (isEdit) {
                    tpl = template.edit;
                }
                else {
                    tpl = template.add
                }
                for (let i = 0; i < tpl.length; i++) {
                    if (tpl[i].code == "deptId") {
                        tpl[i].disabled = false;
                    }
                    if (tpl[i].code == "deptName") {
                        tpl[i].disabled = false;
                    }
                }
                props.action.saveTpl(template)
            }
        }
        props.onChange(changedFields);
    },
    mapPropsToFields(props) {
        // let data = props.$$state.get("formData").toJS()
        let formFields = props.$$state.get("formFields").toJS()
        if(formFields!=undefined){
            if(formFields.deptId!=undefined&&formFields.deptId.value==0){
                formFields.deptId = undefined;
            }
            if(formFields.roleId!=undefined&&formFields.roleId.value==0){
                formFields.roleId = undefined;
            }
        }
        return {
            ...formFields,
        }
    }
})(Card);
export default connect(mapStateToProps, mapDispatchToProps)(WrapCard);