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
       // debugger;
        return dataSource.map(item => {
            //debugger;
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
        let addOptionAll = null,
            dataSource = null;
        if(this.props.attr){
            addOptionAll = this.props.attr.addOptionAll;
            dataSource = this.props.attr.dataSource;
        }else{
            addOptionAll = this.props.addOptionAll;
            dataSource = this.props.dataSource;
        }
        let key = "";
        if (this.props.value) {
            if (this.props.value.key) {
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
                        addOptionAll != undefined && key == ""
                            ? "0"
                            : key
                    }
                    onSelect={this.onSelect}
                >
                    {addOptionAll != undefined ? (
                        <Option key={"0"}>
                            <span style={{color:'#CCCCCC'}}>{"全部" + this.props.addOptionAll}</span>
                        </Option>
                    ) : (
                        ""
                    )}
                    {this.trans(dataSource)}
                </Select>
            </div>
        );
    }
}

export default Enum;
