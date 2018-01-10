import { Cascader } from "antd";

import "assets/stylesheet/all/iconfont.css";
import cityData from "../data/citydata";

export default class CityChioce extends React.Component {
    onChange(value, selectedOptions) {
<<<<<<< HEAD
        //debugger;
=======
        ;
>>>>>>> 312d46699d979d9b7f362833e04a0fd802dbca3c
        let city = [];
        selectedOptions.forEach(item => {
            city.push({ name: item.label, code: item.code });
        });
        let custom = { name: city.label, code: city.code };
        this.props.onChange({ result: value, custom: city });
    }
    render() {
        this.props.value;
        //;
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
