import { Cascader } from "antd";

import "assets/stylesheet/all/iconfont.css";
import cityData from "./citydata";

export default class CityChioce extends React.Component {
    onChange(value, selectedOptions) {
        debugger;
        let city = [];
        selectedOptions.forEach(item => {
            city.push({ name: item.label, code: item.code });
        });
         this.props.onChange({ result: value, custom: city });
    }
    render() {
        this.props.value;
        //debugger;
        return (
            <div>
                <Cascader
                    options={cityData}
                    placeholder="请输入"
                    value={this.props.value ? this.props.value : []}
                    onChange={this.onChange.bind(this)}
                />
            </div>
        );
    }
}
