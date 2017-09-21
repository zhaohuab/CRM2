import { AutoComplete } from 'antd';

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
                    style={{ width: 200 }}
                    onSearch={this.handleSearch}
                    onChange={this.onChange.bind(this)}
                    value={this.props.value}
                />
            </div>
        );
    }
}

export default Email