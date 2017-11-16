import { Radio as R} from 'antd';

const RG = R.Group;
const RadioButton = R.Button;

class RadioGroup extends React.Component {
    state = {
        select : {
            key:undefined,
            title:undefined,
        },
    }

    trans = (dataSource,type) => {
        if(type == "button") {
            return dataSource.map((item) => {
                return <RadioButton value={item.key} >{item.title}</RadioButton>
            })
        }
        return dataSource.map((item) => {
            return <R value={item.key} >{item.title}</R>
        })
    }

    findTitle = (key) => {
        let dataSource = this.props.dataSource;
        for(let i=0,len=dataSource.length;i<len;i++) {
            if(dataSource[i].key == key) {
                return dataSource[i].title;
            }
        }
    }
    onChange = (e) => {
        debugger
        const onChange = this.props.onChange;
        let key = Number(e.target.value);
        if (onChange) {
            onChange({key,title:this.findTitle(key)});
        }
    }
    render() {
        debugger
        let key=undefined;
        if(this.props.value) {
            key = this.props.value.key;
        }
        if(key) {
            key = Number(key);
        }
        return (
            <div>
                <RG onChange={this.onChange} value={key}>
                    {this.trans(this.props.dataSource,this.props.type)}
                </RG>
            </div>
        );
    }
}

export default RadioGroup