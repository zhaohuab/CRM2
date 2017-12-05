import { Select } from 'antd';

const Option = Select.Option;

class Enum extends React.Component {

    trans = (dataSource) => {
        return dataSource.map((item) => {
            item.key = String(item.key);
            return <Option key={item.key}>{item.title}</Option>
        })
    }

    onSelect = (value,option) => {
        const { onChange,mapper } = this.props;
        if (onChange) {
            onChange({value:{id:value,title:option.props.children},mapper});
        }
    }
    
    render() {
        let key = this.props.value;
        if(key) {
            key = String(key);
        }
        return (
        
            <div>
                <Select value={this.props.addOptionAll!=undefined&&key==""?"0":key}  onSelect={this.onSelect}>
                    {this.props.addOptionAll!=undefined? <Option key={"0"}>{'全部'+this.props.addOptionAll}</Option>:''}
                    {this.trans(this.props.dataSource)}
                </Select>
            </div>

        );
    }
}

export default Enum