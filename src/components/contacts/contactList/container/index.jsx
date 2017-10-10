import React, { Component, PropTypes } from 'react';
import {Icon,Button,Dropdown,Menu,Collapse} from 'antd';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux';
const Panel = Collapse.Panel;
import * as Actions from '../action/index.js'
import './index.less'
class Contacts extends React.Component {
    render(){
        let collapse=this.props.componentState.get('collapsed')
        const menu = (
            <Menu>
                <Menu.Item key="1">转移给他人</Menu.Item>
                <Menu.Item key="2">删除</Menu.Item>
                <Menu.Item key="3">操作记录</Menu.Item>
            </Menu>
        );
        return(
            <section className={collapse?'contacts-wrapper thin ':'contacts-wrapper wide'}>
                <header className='contacts-wrapper-header'>
                    <div className='wrapper-header-title'>
                        <Icon type="left" />
                        <h3>联系人</h3>
                    </div>
                </header>
                <main className='contacts-wrapper-main'>
                   <div className='wrapper-main-inner'>
                       <div className='inner-person-info'>
                           <figure>
                               <img src={require('assets/images/header/cat.png')} alt=""/>
                           </figure>
                           <div className='person-info-main'>
                                <span className='person-info-name'>李丽</span>
                                <table cellpadding={0} className='person-info-tabel'>
                                    <tr>
                                        <td>职务</td>
                                        <td>部门</td>
                                        <td>状态</td>
                                        <td>负责人</td>
                                    </tr>
                                    <tr>
                                        <td>产品经理</td>
                                        <td>营销云</td>
                                        <td>正常</td>
                                        <td>老王</td>
                                    </tr>
                                </table>
                           </div>
                           <div className='person-info-btn'>
                                 <Button className='btn-right'>编辑</Button>
                                 <Dropdown.Button  overlay={menu}  trigger={['click']}>
                                    更多
                                 </Dropdown.Button>
                           </div>
                       </div>
                       <div className='inner-base-info'>
                            <Collapse bordered={false} defaultActiveKey={['1']}>
                                <Panel header="基本信息" key="1">
                                    <table cellpadding={0} className='inside-tabel'>
                                        <tr>
                                            <td>申请人：小王</td>
                                            <td>申请类型:自助申请角色</td>
                                            <td>申请时间:2017-9-9</td>
                                            
                                        </tr>
                                        <tr>
                                            <td>申请人部门详情:金融云-体验技术产品-2组</td>
                                            <td>申请理由：大户续签</td>
                                        </tr>
                                    </table>
                                </Panel>
                            </Collapse>
                       </div>
                       <div className='inner-connect-info'>
                             <Collapse bordered={false} defaultActiveKey={['1']}>
                                <Panel header="联系方式" key="1">
                                    <table cellpadding={0} className='inside-tabel'>
                                        <tr>
                                            <td>角色名称:管理员</td>
                                            <td>角色码：343242443</td>
                                            <td>所属部门：营销云</td>
                                            
                                        </tr>
                                        <tr>
                                            <td>过期时间：2014-0-4</td>
                                            <td>描述：djasjdlsjdldj</td>
                                        </tr>
                                    </table>
                                </Panel>
                            </Collapse>
                       </div>
                       <div className='inner-add-info'>
                            <Collapse bordered={false} defaultActiveKey={['1']}>
                                <Panel header="附加信息" key="1">
                                    无
                                </Panel>
                            </Collapse>
                       </div>
                   </div>
                </main>
            </section>
        )
    }
}
export default connect(
    state=>{
        return{
            componentState:state.componentReducer
        }
    },
    dispatch=>{
        return{
            componentAction:bindActionCreators(Actions,dispatch)
        }
    }
)(Contacts)