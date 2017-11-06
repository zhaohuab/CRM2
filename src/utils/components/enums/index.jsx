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
        return dataSource.map((item) => {
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
        
        let key="";
        if(this.props.value) {
            key = this.props.value.key;
        }
        if(key) {
            key = String(key);
        }
        return (
            <div>
                <Select defaultValue={this.props.addOptionAll!=undefined&&key==""?"0":key} onSelect={this.onSelect}  >
                    {this.props.addOptionAll!=undefined? <Option key={"0"}>{'全部'+this.props.addOptionAll}</Option>:''}
                    {this.trans(this.props.dataSource)}
                </Select>
            </div>
        );
    }
}

export default Enum