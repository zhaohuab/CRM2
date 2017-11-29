import { DatePicker } from 'antd'
import moment from 'moment'

class DateTimeComp extends React.Component {
    
    onChange(date,dateString) {
        
        let onChange = this.props.onChange;
        if(onChange) {
            
            onChange(date.format("YYYY-MM-DD hh:mm:ss"));
        }
    }
    render() {
        let value = this.props.value;
        if(value && value.time) {
            //后台传入格式处理
            value = moment(value.time);
        }
        else {
            //编辑后，格式处理
            value = moment(value);
        }
        
        return <DatePicker onChange={this.onChange.bind(this)} value={value}/>
    }
}

export default DateTimeComp;