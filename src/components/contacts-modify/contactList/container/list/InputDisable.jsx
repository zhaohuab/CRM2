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


export default class InputDisable extends React.Component {
    render(){
        return(
            <div>
                <Input value = {this.props.value? this.props.value.name:''} disabled = {this.props.disabled?true:false}/>  
            </div>
        )
    }
}
