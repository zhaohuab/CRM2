import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as Actions from "../action";

import "./index.less";
import "assets/stylesheet/all/iconfont.css";

import LessForm from './lessForm'

import {
    Select,
    Input,
    Form,
    Table,
    Modal,
    Button,
    Icon,
    Row,
    Col,
    Tabs,
    Menu,
    Dropdown
} from "antd";


class AssignList extends React.Component {
    constructor(props){
        super(props);
        this.searchMenu = (
            <Menu>
              <Menu.Item key="0">
                全部
              </Menu.Item>
              <Menu.Item key="1">
                未分配
              </Menu.Item>
              <Menu.Item key="2">
                已分配
              </Menu.Item>
              <Menu.Item key="3">
                最近查看
              </Menu.Item>
              <Menu.Item key="4">
                最近创建
              </Menu.Item>
            </Menu>
       );
       this.moreMenu = (
        <Menu>
          <Menu.Item key="1">导入</Menu.Item>
          <Menu.Item key="2">导出</Menu.Item>
        </Menu>
      );
    }
    formRedux(value){
        debugger
        this.props.action.saveLessForm(value)
    }
    render(){
        return(
            <div className='assignment-container'>
                <div className='container-header'>
                    <Row className='container-header-show' type='flex' justify='space-between'>
                        <Col span={20}>
                           <Row type='flex' align='middle' gutter={15} style={{height:'54px'}}>
                               <Col>
                                    <Dropdown overlay={this.searchMenu} trigger={['click']}>
                                        <a className="ant-dropdown-link" href="#">
                                            全部 <Icon type="down" />
                                        </a>
                                    </Dropdown>
                               </Col>
                               <Col span={20}>
                                  <LessForm formRedux={this.formRedux.bind(this)}/>
                               </Col>
                           </Row>
                        </Col>
                        <Col span={4}>
                            <Row type='flex' align='middle' className='top-more'>
                                <Dropdown overlay={this.moreMenu} trigger={['click']} className='aa'>
                                    <Button>
                                        更多 <Icon type="down" />
                                    </Button>
                                </Dropdown>
                            </Row>
                        </Col>
                    </Row>
                    <div className='container-header-hide'>

                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state, ownProps) {
    return {
        $$state: state.cusAssignReducers
    };
}
//绑定action到组件props
function mapDispatchToProps(dispatch) {
    return {
        action: bindActionCreators(Actions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(AssignList);