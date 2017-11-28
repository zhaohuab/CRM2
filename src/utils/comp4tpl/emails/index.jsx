import { AutoComplete ,Button,Icon,Input} from 'antd';

class Email extends React.Component {
    state = {
        dataSource: [],
    }

    handleSearch = (value) => {
        this.setState({
            dataSource: !value ? [] : [
                value + "@yonyou.com",
                value + "@qq.com",
                value + "@163.com",
            ],
        });
    }

    onChange = (changedValue) => {
        const onChange = this.props.onChange;
        if (onChange) {
            onChange(changedValue);
        }
    }
    render() {
        const { dataSource } = this.state;
        return (
            <div>
                <AutoComplete
                    dataSource={dataSource}
                    onSearch={this.handleSearch}
                    onChange={this.onChange.bind(this)}
                    value={this.props.value}
                    placeholder="请输入..."
                >
                <Input 
              />
          </AutoComplete>
        </div>
        );
    }
}

export default Email