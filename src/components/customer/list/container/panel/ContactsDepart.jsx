import {Input} from "antd";

export default class ContactsDepart extends React.Component {
    render(){
        let value = this.props.viewData;
        let valueResult
        if(value){
                valueResult = value.salesVOs[0].ownerDeptName
        }
        return (
            <Input value={valueResult?valueResult:''} disabled/>
        )
    }
}