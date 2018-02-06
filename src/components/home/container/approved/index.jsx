
import React, { Component, PropTypes } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Icon, Tabs, Row, Col } from "antd";

import ListForm from './ListForm.jsx';
import SearchForm from './SearchForm.jsx';
import CommitSearchForm from './CommitSearchForm.jsx';
import ApproveForm from './ApproveForm.jsx';

import SlidePanel from "../../../common/slidePanel/index.jsx";
import ViewPanel from "./ViewPanel";
import "./index.less";
import * as Actions from "../../action/approval.js";
import StatusLine from './StatusLine';
const TabPane = Tabs.TabPane;

class Appropved extends React.Component {
    constructor(props) {
        super(props);
    }
    //显示面板
    slideShow = (record) => {
        this.props.action.showViewForm(true, record.id);
    }
    //隐藏面版
    slideHide = () => {
        //关闭面板清空数据
        this.props.action.hideViewForm(false);
    }
    approvedChange = (key) => {
        let flag = key == 1 ? false : true;
        this.props.action.approvedChange(key, flag);
        let pagination = this.props.$$state.get('pagination').toJS()
        if (key == '2') {
            this.props.action.getTodo(pagination)

        } else {
            this.props.action.getUnfinished(pagination);
           // this.props.action.setSearchMap('unFinish')
         }
    }
    render() {
         debugger;
        let { viewState, lineState } = this.props.$$state.toJS();
        return (
            <div className="approval-wrapper">
                <Icon type="close" className='closed' onClick={this.props.action.approvedClosed} />
                <Tabs animated={false} defaultActiveKey="1" onChange={key => { this.approvedChange(key) }}>
                    <TabPane tab="我提交" key="1" >
                        <CommitSearchForm />
                        <ListForm />
                    </TabPane>
                    <TabPane tab="我审批" key="2">
                        <SearchForm />
                        < ApproveForm />
                    </TabPane>
                </Tabs>
                <SlidePanel
                    viewState={viewState}
                    onClose={this.slideHide}
                    className='tab-viewPanel-recoverd'
                >
                    <ViewPanel
                        ref="panelHeight" />
                </SlidePanel>
                <StatusLine />
            </div>
        );
    }
}

function mapStateToProps(state, ownProps) {
    return {
        $$state: state.approval
    }
}

function mapDispatchToProps(dispatch) {
    return {
        action: bindActionCreators(Actions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Appropved);
