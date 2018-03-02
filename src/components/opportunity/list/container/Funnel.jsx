import { DatePicker, Form, Input, Select, InputNumber, Row, Col, Card as AntdCard } from 'antd';
import Department from 'components/refs/departments'
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import moment from "moment";
import Enum from "utils/components/enums";
import * as Actions from "../action";
var echarts = require('../../../../../node_modules/echarts/lib/echarts');
require('../../../../../node_modules/echarts/lib/chart/funnel');
import funnelEcharts from './funnelEcharts.js'
const FormItem = Form.Item;
const Option = Select.Option;

const funnelChange = [{ data: [60, 40, 20, 80, 90, 100], data2: [30, 10, 5, 50, 70, 80] }, { data: [80, 40, 60, 30, 15, 10], data2: [60, 30, 55, 25, 13, 5] }, { data: [100, 20, 80, 10, 45, 60], data2: [90, 10, 65, 5, 33, 40] }, { data: [10, 20, 40, 60, 90, 75], data2: [7, 10, 21, 25, 63, 40] }]

class Funnel extends React.Component {
    constructor(props) {
        super(props)
        this.funnelOption = funnelEcharts;


        this.changeFunnelData = (key) => {

            // this.funnelOption.series[0].data.forEach((item, index) => {
            //     item.value = funnelChange[key].data[index]
            // })

            // this.funnelOption.series[1].data.forEach((item, index) => {
            //     item.value = funnelChange[key].data2[index]
            // })
            // this.funnelEchar.setOption(this.funnelOption);

            this.props.action.getListData(this.props.$$state.get("pagination").toJS(), { type: key });
            this.props.action.getFunnelData({ type: key });
        }
    }

    

    componentDidMount() {

        this.funnelEchar = echarts.init(this.refs.funnel);
        this.props.action.getFunnelData()
    }

    moneyOnclick(state){
        this.props.action.getListData(this.props.$$state.get("pagination").toJS(), { state});
        this.props.action.getFunnelData({ state });
    }

    onWindowResize() {
        setTimeout(() => {
            if (this.refs.target) {
                let resizeSize = this.refs.target.offsetWidth

                this.funnelEchar.resize({
                    width: resizeSize + 'px'
                })
            }
        }, 500)
    }

    render() {
        let { enumData } = this.props.$$state.toJS();
        const funnelData = this.props.$$state.get("funnelData").toJS().data;
        const moneyData = this.props.$$state.get("funnelData").toJS().money;
        const legend = []
        let tempMax = 0;
        for (let i = 0; i < funnelData.length; i++) {
            legend.push(funnelData[i].name);
            if(funnelData[i].value>tempMax){
                tempMax = funnelData[i].value
            }
        }
        if (this.funnelEchar) {
            this.funnelOption.legend.data = legend;
            this.funnelOption.series[0].max = tempMax;
            this.funnelOption.series[0].data = funnelData;
            this.funnelEchar.setOption(this.funnelOption);
            window.addEventListener('resize', this.onWindowResize.bind(this))
        }

        this.onWindowResize()

        const showSelectOption = data => {
            return data.map(item => {
                return <Option value={item.key}>{item.title}</Option>
            })
        };
        return (
            <div className='main-middle-bottom'>
                <AntdCard title={
                    <Row className="funnel-title">
                        <Col span={16}>
                            销售漏斗
                        </Col>
                         {/* 项目第一版移除  */}
                        {/* <Col span={8}>
                            <Row>
                                {
                                    enumData.biztypeList && enumData.biztypeList.length > 0 ?
                                        <Select className="funnel-title-select" defaultValue={enumData.biztypeList[0].key} onChange={this.changeFunnelData}>
                                            {showSelectOption(enumData.biztypeList)}
                                        </Select> : ""
                                }

                            </Row>
                        </Col> */}
                    </Row>
                }>
                    <div>
                        <div ref='funnel' className='funnel-chrats'></div>
                    </div>
                    <Row gutter={5}>
                        <div onClick={this.moneyOnclick.bind(this,3)}>
                            <Col className="funnel-bottom-line-left" span={12}>预计成交金额：</Col><Col span={12}>¥{moneyData.goon}</Col>
                        </div>
                    </Row>
                    <Row gutter={5}>
                        <div onClick={this.moneyOnclick.bind(this,1)}>
                            <Col className="funnel-bottom-line-left" span={12}>赢单金额：</Col><Col span={12}>¥{moneyData.win}</Col>
                        </div>
                    </Row>
                    <Row gutter={5}>
                        <div onClick={this.moneyOnclick.bind(this,2)}>
                            <Col className="funnel-bottom-line-left" span={12}>丢单金额：</Col><Col span={12}>¥{moneyData.fail}</Col>
                        </div>
                    </Row>
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
