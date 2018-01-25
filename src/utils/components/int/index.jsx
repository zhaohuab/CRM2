//正浮点数 ^(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*))$ 
//验证非负整数（正整数 + 0） ^\d+$ 
//this.props.attr.precision

import { Button, Icon, Input} from 'antd';
import './index.less'

export default class Int extends React.Component {
    constructor(props){
        super(props);
    }

    onChange(e){    
        debugger
        let value = e.target.value;
        let int = /^\d+$/
        let test = int.test(value)
        if(test || !value){
            this.props.onChange(value)
           
        }else{
            this.props.onChange(this.props.value)
        }
    }

    render(){
        return(
            <div className='utils-int'>            
                <Input 
                    value={this.props.value?this.props.value:''}
                    onChange={this.onChange.bind(this)}
                /> 
            </div>
        )
    }
}
//改进：分单位输入