import { DatePicker, Form, Input, Select, InputNumber, Row, Col ,Card as AntdCard} from 'antd';
import Department from 'components/refs/departments'
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import moment from "moment";
import * as Actions from "../action";
var echarts = require('../../../../../node_modules/echarts/lib/echarts');
require('../../../../../node_modules/echarts/lib/chart/radar');
import radarEcharts from './radarEcharts.js'
const FormItem = Form.Item;
const Option = Select.Option;


class Radar extends React.Component {
    constructor(props) {
        super(props)
        this.radarOption=radarEcharts;

    }
    componentDidMount() {
        this.radarEchar = echarts.init(this.refs.radar);
        this.radarEchar.setOption(this.radarOption);
    }

    setRadarData(data){
        const indicator = []
        const result = []
        const suggestValue = [];
        const actualValue = [];
        for(let i=0;i<data.length;i++){
            indicator.push({name:data[i].oppdimension_name,max:10})
            const actions = data[i].children;
            for(let j=0;j<actions.length;j++){
                if(actions[j].is_finish == 1 && (actualValue[i]==undefined||actions[j].score>actualValue[i])){
                    actualValue[i] = actions[j].score;
                }
                if(actions[j].is_suggest == 1){
                    suggestValue[i] = actions[j].score
                }
            }
            if(suggestValue[i]==undefined){
                suggestValue[i]=0
            }
            if(actualValue[i]==undefined){
                actualValue[i]=0
            }
        }
        result.push({name:'推荐值',value:suggestValue})
        result.push({name:'实际值',value:actualValue})
        if(data.length>0&&this.radarEchar){
            this.radarOption.radar.indicator = indicator;
            this.radarOption.series[0].data = result;
            this.radarEchar.setOption(this.radarOption);
            window.addEventListener('resize', this.onWindowResize.bind(this))
        }
    }

    onWindowResize(){
        setTimeout(()=>{
            if(this.refs.target){
                let resizeSize=this.refs.target.offsetWidth
        
                this.radarEchar.resize({
                    width:resizeSize+'px'
                })
            }
        },500)
    }
    
    render() {
        this.setRadarData(this.props.data)
        this.onWindowResize()
        return (
            <div ref='radar' className='radar-charts'></div>
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
export default connect(mapStateToProps, mapDispatchToProps)(Radar);
