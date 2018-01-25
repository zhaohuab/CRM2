import { Select } from "antd";

const Option = Select.Option;

class Enum extends React.Component {
    state = {
        select: {
            key: undefined,
            title: undefined
        }
    };

    trans = dataSource => {
        return dataSource.map(item => {
            item.key = String(item.key);
            return <Option key={item.key}>{item.title}</Option>;
        });
    };

    onSelect = (value, option) => {
        const onChange = this.props.onChange;
        if (onChange) {
            onChange({ key: value, title: option.props.children });
        }
    };

    render() {
        let key = "";
        if (this.props.value) {
            if (this.props.value.key) {
                debugger
                key = this.props.value.key;
            } else {
                key = this.props.value;
            }
        }
        if (key) {
            key = String(key);
        }
        return (
            <div>
                <Select
                    value={
                        this.props.addOptionAll != undefined && key == ""
                            ? "0"
                            : key
                    }
                    onSelect={this.onSelect}
                >
                    {this.props.addOptionAll != undefined ? (
                        <Option key={"0"}>
                            <span style={{color:'#CCCCCC'}}>{"全部" + this.props.addOptionAll}</span>
                        </Option>
                    ) : (
                        ""
                    )}
                    {
                        this.props.dataSource?this.trans(this.props.dataSource):''
                    }
                </Select>
            </div>
        );
    }
}

export default Enum;
