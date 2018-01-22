/*
 * @Author: yangtmm 
 * @Date: 2017-11-10 16:30:00 
 * @Last Modified by: yangtmm
 * @Last Modified time: 2017-12-08 16:41:11
 */

import React from 'react'
import { Row, Col, Icon, Checkbox, Modal } from 'antd';
import "./index.less";
import "assets/stylesheet/all/iconfont.css";
export default class Card extends React.Component {
  static defaultProps = {
    data: {
      id: "tpl_edit_1",
      name: "模板布局1",
      description: "",
      isDefault: 1,
      tenantId: 0,
      edit: 0,
      delete: 0
    },
    delete: function (arg) {
      console.log(arg)
    },
    edit: function (arg) {
      console.log(arg)
    }
  }

  constructor(props) {
    super(props);
  }

  onEnable = (enableState) => {
    if(this.props.data.isDefault) {
        Modal.warning({
          title: "你正在操作的是默认模板",
          content: '默认模板不可停用',
        });
    }else{
      this.props.enable(enableState);
    }
  }

  //点击删除按钮
  btnDelete(flag) {
    if(!flag) return ; 
    let that = this;
    Modal.confirm({
        title: "你是否确认删除选中的内容?",
        content: "此操作不可逆",
        okText: "是",
        okType: "danger",
        cancelText: "否",
        onOk() {
          that.props.delete();
        },
        onCancel() {
            console.log("Cancel");
        }
    });
  }

  render() {
    let { isDefault, roles, name, tenantId, enableState,biztypeName, biztypeId, description, checked } = this.props.data;
{   /*   let enableStyle = isEnabled ? {background:'#3CA4FB'}:{background:'#ddd'},
        cardStyle = isEnabled ? {border:'1px solid #56B0FC'}:{border:'1px solid #ddd'},
        deleteStyle = isDefault||!tenantId ? {color:'#ccc'}:{color:'#666'},
        editStyle = isDefault ?{color:'#ccc'}:{color:'#666'},
        flag = isDefault||!tenantId; */}
    let enableStyle = enableState==1 ? {background:'#3CA4FB'}:{background:'#ddd'},
        cardStyle = enableState==1 ? {border:'1px solid #56B0FC'}:{border:'1px solid #ddd'},
        deleteStyle = isDefault||!tenantId ? {color:'#ccc'}:{color:'#666'};
    return (
      <div className="busi-obj-def-card" style={cardStyle}>
        <Checkbox checked={checked} onChange={this.props.onChange.bind(this,this.props.data.id)}/>
        {
          isDefault?<div className='card-default'><i className="iconfont icon-moren1" /></div>:''
        } 
        <div className="card-header">        
          <div className="card-header-name">
            <span className='card-header-default-father'>
              {this.props.data.name}
              {
                !tenantId?
                <div className='card-default'>
                  <i className="iconfont icon-zhuyaolianxiren" />
                </div>:''
              } 
            </span>
          </div>
          <div className="card-header-btn" onClick={this.onEnable.bind(this,enableState)} style={enableStyle}>{enableState == 1 ? "启用" : '停用'}</div>
        </div>
        <div className="card-body">
          <div className="card-body-con">
            <div className="card-body-con-item">
              <div className="card-body-con-name">业务类型：</div>
              <div className="card-body-con-text">{biztypeName}</div>
            </div>         
          </div>
          <div className="card-body-btn">
            <div  onClick={this.btnDelete.bind(this,tenantId)}><Icon type="delete" style={deleteStyle}/></div>
            <div className="card-body-btn-edit" onClick={this.props.edit}><Icon type="edit" /></div>
          </div>
        </div>
      </div>
    )
  }
}

Card.propTypes = {
  name: React.PropTypes.string,
  contentLabel: React.PropTypes.string
}

    // return (
    //   <div className="tpl-obj-def-card">
    //     {/*<Checkbox onChange={this.props.changeCheckbox} defaultChecked = {this.props.checked}></Checkbox>*/}
    //     <div className="card-header">
    //       <div className="card-header-name">
    //         {this.props.data.name}
    //       </div>
    //       <div className="card-header-btn">{this.props.data.isDefault == 1 ? "预设" : "非预设"}</div>
    //     </div>
    //     <div className="card-body">
    //       <div className="card-body-con">
    //         <div className="card-body-con-item">
    //         <div className='card-body-con-type'>
    //           <div className="card-body-con-name">业务类型：</div>
    //           <div className="card-body-con-text">{this.props.data.description}</div></div>
    //         <div className='card-body-con-role'>
    //           <div className="card-body-con-name">适用角色：</div>
    //         </div>        
    //         </div>
    //       </div>
    //       <div className="card-body-btn">
    //         <Popconfirm title="此操作不可恢复，确定删除？" onConfirm={this.props.delete} >
    //           <div className="card-body-btn-del">
    //             <Icon type="delete" />
    //           </div>
    //         </Popconfirm>
    //         <div className="card-body-btn-edit" onClick={this.props.edit}><Icon type="edit" /></div>
    //       </div>
    //     </div>
    //   </div>
    // )