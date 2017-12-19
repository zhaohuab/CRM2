
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
        this.icon=['icon-xiaoshoujixiao-','icon-kehuguanli-xin','icon-hangdongguanlixin','icon-xiaoshouguochengmoren','icon-jichuyewu-moren','icon-xitongguanli-moren']
        this.height=[]
    }
    over(e){
        if(e.target.className=='cover-span'){
            let index = e.target.getAttribute('data-attr')
            let target = e.target.parentNode.parentNode.nextSibling;
            let out = document.querySelector('.menu-recover').offsetTop
            let top = this.height[index]
            let father = index*42+42+36+70;
            let ref = index*42+42
            if(father-top<out){
                target.style.top=-(ref)+'px'
            }else{
                target.style.top=-top+'px'
            }
        }
    }
    componentDidMount() {
        this.props.action.getMenuData();
        let out = document.querySelector('.menu-recover')
        out.addEventListener('mouseover',this.over.bind(this),false)
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
        that.height=[]
        function tree3(data) {
            return data.map((item, index) => {
                return (
                    <Menu.Item key={item.id} >
                    <Link to={basePath + item.webId} onClick={that.onClick.bind(that, item.name)}>
                        <span>
                            <i className="menu-dot"></i>
                            <span className='menu-title'>{item.name}</span>
                           
                        </span>
                    </Link>
                </Menu.Item>
                )
            })
        }
        function tree(data,level){
            
            return data.map((item,index) => {
                if(level == 1){
                    let height= (item.childHeight/2)-21
                    that.height.push(height)

                    return (
                        <SubMenu className={'hover-icon'+index} key={item.id}  title = {
                            <span className='cover-warpper'>
                                <i className={"iconfont "+that.icon[index]}></i><span className='menu-title'>{item.name}</span>
                                <span className='cover-span' data-attr={index}></span>
                            </span>}>
                            {tree(item.child,level+1,height)}
                        </SubMenu>
                    )
                }else if(level == 2 && (!item.child || item.child.length == 0)) {
                    return  (
                        <Menu.Item key={item.id} style={{clear:"both"}}>
                            <Link to={basePath + item.webId} onClick={that.onClick.bind(that, item.name)}>
                                <span>
                                    <span className='menu-title'>{item.name}</span>
                                </span>
                            </Link>
                        </Menu.Item>
                    )
                }else {
                    return (
                        <Menu.ItemGroup title={item.name}>
                            {tree3(item.child)}
                        </Menu.ItemGroup>
                    )
                }
              
            })
            
        };
        let level = 1;
        let rootTitle = "首页";
        let homeStyle={width:'100%',display:'flex',justifyContent:'center',height:'42px',lineHeight:'42px'}
      
        return (
            <div className='menu-recover'>  
                <Menu
                    defaultSelectedKeys={["1"]}
                    selectedKeys={this.state.selectedKeys}
                    mode="vertical"
                    inlineCollapsed={this.props.collapsed}
                    theme={"dark"}
                    onSelect={this.onSelect}
                    forceSubMenuRender={true}
                >
                    <Menu.Item key="index" style={homeStyle} className='spatial-icon'>
                        <Link to={basePath + "home"} onClick={that.onClick.bind(that, rootTitle)} >
                            <span><i className='iconfont icon-shouye-moren'></i><span className='menu-title'>{rootTitle}<span className='fake'></span></span></span>
                        </Link>
                    </Menu.Item>
                    {tree(data, level)}
                </Menu>
            </div>
        )
    }
    dataChange(data){
        data.forEach((item,index)=>{
            item.height=42*index+42+36+70+42;
            if(item.child&&item.child.length){
                item.childHeight=34*item.child.length;
                item.child.forEach((itemChild)=>{
                    if(itemChild.child &&itemChild.child.length){
                        let ceil = Math.ceil(itemChild.child.length/2)
                        item.childHeight = item.childHeight + ceil*30
                    }
                })
            }
        })
    }

    render() {
        const {$$state} = this.props;
        const data = $$state.get("data").toJS();
        let menuClassName = this.props.collapsed ? "app-menu-con menu-con-close" : "app-menu-con menu-con-open";
        let imgLogo= this.props.collapsed ? "img-logo-hide" : "img-logo";
        if(data && data.length){
            this.dataChange(data)
            console.log(data)
        }
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