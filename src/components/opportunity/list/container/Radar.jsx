import { DatePicker, Form, Input, Select, InputNumber, Row, Col ,Card as AntdCard} from 'antd';
import Department from 'components/refs/departments'
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import moment from "moment";
import * as Actions from "../action";
var echarts = require('../../../../../node_modules/echarts/lib/echarts');
require('../../../../../node_modules/echarts/lib/chart/funnel');
import funnelEcharts from './funnelEcharts.js'
const FormItem = Form.Item;
const Option = Select.Option;

const funnelChange=[{data:[60,40,20,80,90,100],data2:[30,10,5,50,70,80]},{data:[80,40,60,30,15,10],data2:[60,30,55,25,13,5]},{data:[100,20,80,10,45,60],data2:[90,10,65,5,33,40]},{data:[10,20,40,60,90,75],data2:[7,10,21,25,63,40]}] 

class Funnel extends React.Component {
    constructor(props) {
        super(props)
        this.funnelOption=funnelEcharts;

        
    this.changeFunnelData=(key)=>{
        this.funnelOption.series[0].data.forEach((item,index)=>{
            item.value=funnelChange[key].data[index]
        })

        this.funnelOption.series[1].data.forEach((item,index)=>{
            item.value=funnelChange[key].data2[index]
        })
        this.funnelEchar.setOption(this.funnelOption);
        }
    }

    componentDidMount() {

        this.funnelEchar = echarts.init(this.refs.radar);
        this.props.action.getFunnelData()
    }

    onWindowResize(){
        setTimeout(()=>{
            if(this.refs.target){
                let resizeSize=this.refs.target.offsetWidth
        
                this.funnelEchar.resize({
                    width:resizeSize+'px'
                })
            }
        },500)
    }
    
    render() {
        // const funnelData = this.props.$$state.get("funnelData").toJS();
        // if(this.funnelEchar){
        //     this.funnelOption.series[0].data = funnelData;
        //     this.funnelEchar.setOption(this.funnelOption);
        //     window.addEventListener('resize', this.onWindowResize.bind(this))
        // }
   
        this.onWindowResize()
        return (
            <div className='main-middle-bottom'>
                <AntdCard title="销售漏斗">
                <div>
                    <div ref='radar' className='radar-chrats'></div>
                </div>
                </AntdCard>
            </div>
        )
    }
}

//绑定状态到组件props
function mapStateToProps(state, ownProps) {
    return {
        $$state: state.opportunityList,
    };
}
//绑定action到组件props
function mapDispatchToProps(dispatch) {
    return {
        action: bindActionCreators(Actions, dispatch)
    };
}
//输出绑定state和action后组件
export default connect(mapStateToProps, mapDispatchToProps)(Funnel);
