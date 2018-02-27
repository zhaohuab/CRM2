import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as Actions from "../../action";
import {Timeline} from "antd";

class DynamicState extends React.Component {
    render(){
        let { dynamicData } = this.props.$$state.toJS()
      
        return(
            <div className="main-right-timeline timeline-recoverd">
                {
                    dynamicData && dynamicData.length?
                    <Timeline>
                        {
                            dynamicData && dynamicData.length?
                            dynamicData.map((item)=>{
                                return(
                                    <Timeline.Item>
                                        <p>
                                            {
                                                item.content && item.content.length?
                                                item.content.map((itemDetail)=>{
                                                    return (
                                                        <span>
                                                            {
                                                                itemDetail.link?
                                                                <span className="timeline-import">
                                                                    {itemDetail.title + itemDetail.link.title}
                                                                </span>:
                                                                <span>{itemDetail.title}</span>
                                                            }
                                                        </span>
                                                    )
                                                }):''
                                            }
                                        </p>
                                        <p className="timeline-time">
                                            {item.time?item.time:'暂无创建时间'}
                                        </p>
                                    </Timeline.Item>
                                )
                            }):''
                        }
                    </Timeline>:<div>暂无动态</div>
                }
            </div>
        )
    }
}

//绑定状态到组件props
function mapStateToProps(state, ownProps) {
    return {
        $$state: state.contacts
    };
}
//绑定action到组件props
function mapDispatchToProps(dispatch) {
    return {
        action: bindActionCreators(Actions, dispatch)
    };
}
//输出绑定state和action后组件
export default connect(mapStateToProps, mapDispatchToProps)(DynamicState);
