import { Button, Icon, Input} from 'antd';
import './index.less'

class Phone extends React.Component {
    state = {
        flag: false,
    }

    onChange = (e) => {
        //debugger
        let {value} = e.target
        let reg = /^1[34578]\d*$/;
        let regStart=/^[^1]\d+$/;
        let regEnd=/^1[0269]\d+$/
        let onChange = this.props.onChange;
        let xx = reg.test(value)||value==1;
        let str='';
        if (!xx){
            this.setState({
                length: value.length,
                flag: true,
            })
            if(regStart.test(value)){
                str=value.substring(1)
            }else if(regEnd.test(value)){
                str=value.substring(0,1)+value.substring(2)
            }else{
                str = value.length==2? 1 : value.match(/^1[34578]\d{0,9}/); 
            }
            if (onChange) {          
                onChange(str);
            }
            value.length==11? this.setState({flag:false}) : null;
            return;
        }
        if(this.state.flag){
            this.setState({
                flag: false,
            })
        }       
        if (onChange) {
            if(value.length>11){
                str = value.match(/^1[34578]\d{0,9}/);
            }else{
                str = value;
            }
            onChange(str);
        }
    }
 
    render() {
        return (
            <div className='utils-phone'>            
                <Input 
                  value={this.props.value}
                  onChange={this.onChange.bind(this)}
                /> 
                {
                    this.state.flag ? 
                    <p classNmae='error-message-phone'>*请输入有效内容</p> : ''
                }                    
            </div>
        );
    }
}

export default Phone;