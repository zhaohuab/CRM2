import { Cascader } from "antd";

import cityData from "./citydata.js";

export default class CityChioce extends React.Component {
    onChange(value, selectedOptions) {
        let city = [];
        selectedOptions.forEach(item => {
            city.push({ name: item.label, code: item.code });
        });
        let custom = { name: city.label, code: city.code };
        this.props.onChange({ result: value, custom: city });
    }
    render() {
        this.props.value;
        return (
            <div>
                <Cascader
                    options={cityData}
                    placeholder="省/市/区"
                    value={this.props.value ? this.props.value.result : []}
                    onChange={this.onChange.bind(this)}
                />
            </div>
        );
    }
}
