
import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Menu, Icon } from 'antd';
const SubMenu = Menu.SubMenu;
import * as Actions from "../action"
import './index.less'

const basePath = '/crm_web/';
 class LeftMenu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedKeys:[1]
        }
    }

    componentDidMount() {
        this.props.action.getMenuData();
    }

    onSelect = ( item ) => {
        this.setState({
            selectedKeys:item.keyPath
        })
    }

    renderMenu = (data) => {

        function tree(data,isRoot){
            return data.map((item) => {
                if(item.child.length>0){
                    return <SubMenu  key={item.id} title = {<span>
                        {
                            isRoot ?  <Icon type="user" />:''
                        }
                        {item.name}
                        </span>}>
                        {tree(item.child,false)}
                    </SubMenu>
                }else{
                    return <Menu.Item key={item.id}>
                        <Link to={basePath + item.webId}>
                        <span>
                        {
                            isRoot ?  <Icon type="user" />:''
                        }
                        {item.name}
                        </span>
                        </Link>
                    </Menu.Item>
                }
            })
        };
        let isRoot = true;
        return (
            <Menu
                defaultSelectedKeys={["1"]}
                selectedKeys={this.state.selectedKeys}
                mode="inline"
                inlineCollapsed={this.props.collapsed}
                theme={"dark"}
                onSelect={this.onSelect}
            >
                <Menu.Item key="index">
                    <Link to={basePath + "home"}>
                        <span><Icon type="user" />首页</span>
                    </Link>
                </Menu.Item>
                {tree(data, isRoot)}
            </Menu>
        )
    }
    
    render() {
        const {$$state} = this.props;
        const data = $$state.get("data").toJS();
        let menuClassName = this.props.collapsed ? "app-menu-con" : "app-menu-con menu-con-open";

        return <div  className={menuClassName}>
            {this.renderMenu(data)}
        </div>
    }
}

//绑定状态到组件props
function mapStateToProps(state, ownProps) {
  return {
    $$state: state.commonMenu
  }
}

//绑定action到组件props
function mapDispatchToProps(dispatch) {
  return {
      action : bindActionCreators(Actions, dispatch)
  }
}

//输出绑定state和action后组件
export default  connect( mapStateToProps, mapDispatchToProps)(LeftMenu);