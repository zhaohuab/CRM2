//正浮点数 ^(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*))$ 
//验证非负整数（正整数 + 0） ^\d+$ 
//this.props.attr.precision

import { Button, Icon, Input} from 'antd';
import './index.less'

export default class Float extends React.Component {
    constructor(props){
        super(props);
    }

    onChange(e){    
        let value = e.target.value;
        let num = /\d+/
        let reg = /^0\d$/
        let dots =/^\d+\.\d*(\.)$/
        let dot =/^\d+\.\d+$/
        let float = /^(0|[1-9]*)(\.){0,1}[0-9]*$/
       
        if(reg.test(value)){//开头多个0
            this.props.onChange('0')
        }else{
            //如果有多个点情况
            if(dots.test(value)){
                let index = value.lastIndexOf('.')
                value = value.substring(0,index)
                this.props.onChange(value)
            }else if(dot.test(value)){
                //如果超过精度值
                let combin = value.indexOf('.');
                let combinValue = value.substr(combin+1)

                if(combinValue.length>this.props.attr.precision){
                    combinValue = value.substr(combin+1,this.props.attr.precision)
                    value = value.substring(0,combin+1) + combinValue
                }else{
                    this.props.onChange(value)
                }
            }else{
                //那个情况都不符合在使用最全的正则
                if(float.test(value)){
                    this.props.onChange(value)
                }
            }
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