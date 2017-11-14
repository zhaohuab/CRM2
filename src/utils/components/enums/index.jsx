import { Select } from 'antd';

const Option = Select.Option;

class Enum extends React.Component {
    state = {
        select : {
            key:undefined,
            title:undefined,
        }
    }

    trans = (dataSource) => {
        debugger
        return dataSource.map((item) => {
            item.key = String(item.key);
            return <Option key={item.key}>{item.title}</Option>
        })
    }

    onSelect = (value,option) => {
        const onChange = this.props.onChange;
        if (onChange) {
            onChange({key:value,title:option.props.children});
        }
    }

    render() {
        debugger
        let key="";
        if(this.props.value) {
            key = this.props.value.key;
        }
        if(key) {
            key = String(key);
        }
        console.info(typeof key);
        return (
            <div>
                <Select value={key} onSelect={this.onSelect}>
                    {/*this.props.addOptionAll!=undefined? <Option key={"0"}>{'全部'+this.props.addOptionAll}</Option>:''*/}
                    {this.trans(this.props.dataSource)}
                </Select>
            </div>
        );
    }
}

export default Enum