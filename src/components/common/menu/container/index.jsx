
import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Menu, Icon } from 'antd';
const SubMenu = Menu.SubMenu;
import * as Actions from "../action"
import './index.less'
import 'assets/stylesheet/menu/iconfont.css'

const basePath = '/crm_web/';
 class LeftMenu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedKeys:[1],
        }
        this.icon=['icon-xiaoshoujixiao-','icon-kehuguanli-xin','icon-hangdongguanlixin','icon-xiaoshouguocheng-xin','icon-jiaoyiguanlixin','icon-jichuyewu-xin','icon-xitongguanli-xin1']
    }

    componentDidMount() {
        this.props.action.getMenuData();
    }

    onSelect = ( item ) => {
        this.setState({
            selectedKeys:item.keyPath
        })
    }

    onClick = ( title ) => {
        this.props.action.changeHeader(title);
    }

    renderMenu = (data) => {

        let that = this;

        function tree(data,isRoot){
           
            return data.map((item,index) => {
                if(item.child.length>0){
                    return <SubMenu  key={item.id} title = {<span>
                        {
                            isRoot ?  <i className={"iconfont "+that.icon[index]}></i>:''
                        }
                            <span className='menu-title'>{item.name}</span>
                        </span>}>
                        {tree(item.child,false)}
                    </SubMenu>
                }else{
                    return <Menu.Item key={item.id}>
                            <Link to={basePath + item.webId} onClick={that.onClick.bind(that, item.name)}>
                                <span>
                                {
                                    isRoot ?  <i className={"iconfont "+that.icon[index]}></i>:''
                                }
                                    <span className='menu-title'>{item.name}</span>
                                </span>
                            
                            </Link>
                    </Menu.Item>
                }
            })
        };
        let isRoot = true;
        let rootTitle = "首页";
        return (
            <div>  
                <Menu
                    defaultSelectedKeys={["1"]}
                    selectedKeys={this.state.selectedKeys}
                    mode="vertical"
                    inlineCollapsed={this.props.collapsed}
                    theme={"dark"}
                    onSelect={this.onSelect}
                >
                    <Menu.Item key="index">
                        <Link to={basePath + "home"} onClick={that.onClick.bind(that, rootTitle)}>
                            <span><Icon type="home" className='menu-home'/><span className='menu-title'>{rootTitle}</span></span>
                        </Link>
                    </Menu.Item>
                    {tree(data, isRoot)}
                </Menu>
            </div>
        )
    }

    render() {
        const {$$state} = this.props;
        const data = $$state.get("data").toJS();
        let menuClassName = this.props.collapsed ? "app-menu-con" : "app-menu-con menu-con-open";
        let imgLogo= this.props.collapsed ? "img-logo-hide" : "img-logo";
    
        return (
          <div className='menu-bg-warpper'>
                <div className='menu-bg-logo'><img src={require('assets/images/menu/crm-logo.png')} className={imgLogo}/></div>
                <div className='menu-bg'  onClick={this.props.toggleCollapsed}>
                    <span className={this.props.collapsed?"menu-control-show rotateMenuIn":'menu-control-hide rotateMenuOut'}>
                        <i className='iconfont icon-zhankai' style={{fontSize:'14px'}}></i>
                    </span>
                </div>
                <div className={menuClassName}>
                    {this.renderMenu(data)}
                </div>
          </div>
        )
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