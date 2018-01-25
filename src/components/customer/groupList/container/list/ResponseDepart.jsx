import {
    Row,
    Col,
    Input,
    Button,
    Icon,
    Dropdown,
} from "antd";
const Search = Input.Search;

import "assets/stylesheet/all/iconfont.css";


export default class ResponseDepart extends React.Component {
    render(){
        return(
            <div>
                <Input value = {this.props.viewData && this.props.viewData.ownerUserId? this.props.viewData.ownerUserId.deptName:'暂无部门'} disabled/>  
            </div>
        )
    }
}
