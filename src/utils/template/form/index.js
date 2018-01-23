
import { Form,Input  } from 'antd';
import Email from 'utils/comp4tpl/emails'
import Department from 'utils/comp4tpl/department'
import Company from 'utils/comp4tpl/company'
import Enum from 'utils/comp4tpl/enums'
import RadioGroup from 'utils/comp4tpl/radios'
import DateTime from 'utils/comp4tpl/datetime'
const FormItem = Form.Item;

const getFormItem = (getFieldDecorator,field, layout) => {
    let comp = getComponent(field);
    //自定义显示组件
    if(!comp) {
        return undefined;
    }
    if (field.visible) {
        return <FormItem
            label={field.name}
            {...layout}
        >
            {getFieldDecorator(field.code, {
                initialValue:field.defaultValue,
                rules: [{
                    required: !field.nullAble,
                    message: field.name+"为必填项"
                }],
            })(
                comp
                )}
        </FormItem>
    }
    else {
        getFieldDecorator(field.code, {
            initialValue:field.defaultValue,
        })(
            comp
            )
        return '';
    }
}
const getComponent = (field) => {
    if (field.render == "Input") {
        return <Input placeholder='请输入...' />
    }
    else if (field.render == "Ratio") {
        return <RadioGroup dataSource={field.enumeration} mapper={field.readWriteFields} />
    }
    else if (field.render == "Ratio-button") {
        return <RadioGroup type="button" dataSource={field.enumeration} mapper={field.readWriteFields} />
    }
    else if (field.render == "Enum") {
        return <Enum dataSource={field.enumeration} mapper={field.readWriteFields} />
    }
    else if (field.render == "Email") {
        return <Email />
    }
    else if (field.render == "Company") {
        return !field.disabled ? <Company mapper={field.readWriteFields} />:<Input disabled  />
    }
    else if (field.render == "Department") {
        return  <Department fatherorgId={field.relationId}  mapper={field.readWriteFields} disabled={field.disabled}/>
        //return  !field.disabled ? <Department fatherorgId={field.relationId}  mapper={field.readWriteFields} />:<Input disabled  />
    }
    else if (field.render == "Date") {
        return <DateTime />
    }
    return undefined;
}

export default getFormItem;