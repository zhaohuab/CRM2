/*
 * @Author: yangtmm 
 * @Date: 2017-11-10 16:30:00 
 * @Last Modified by: yangtmm
 * @Last Modified time: 2017-12-13 14:23:15
 */

import React from 'react'
import { Row, Col, Icon, Checkbox, Popconfirm } from 'antd';
import "./index.less"
export default class Card extends React.Component {
  static defaultProps = {
    data: {
      id: 1,
      name: "业务类型1",
      description: "描述业务类型1",
      isDefault: 1,
      roles: [],
      isCustom: 1,
      isEnabled: 1
    },
    delete: function (arg) {
      console.log(arg)
    },
    edit: function (arg) {
      console.log(arg)
    }
  }
  getTitle = (data) => {
    let str = '';
    data.forEach(item=>{
      str+=item.name+'、'
    })
    return str
  }
  constructor(props) {
    super(props);
  }

  render() {
    let roles = this.props.data.roles,
        getTitle = this.getTitle;
    return (
      <div className="busi-obj-def-card">
        {/*<Checkbox onChange={this.props.changeCheckbox} defaultChecked = {this.props.checked}></Checkbox>*/}
        <div className="card-header">
          <div className="card-header-name">
            {this.props.data.name}
          </div>
          <div className="card-header-btn">{this.props.data.isCustom == 0 ? "预设" : ''}</div>
        </div>
        <div className="card-body">
          <div className="card-body-con">
            <div className="card-body-con-item">
              <div className="card-body-con-name">适用角色：</div>
              <div className="card-body-con-text" title={this.props.data.isDefault == 1 ? "全部角色" : getTitle(roles)
              }>{this.props.data.isDefault == 1 ? "全部角色" : 
              this.props.data.roles.map(item=> <span>{item.name}</span>)}</div>
            </div>
            <div className="card-body-con-item">
              <div className="card-body-con-name">业务描述：</div>
              <div className="card-body-con-text">{this.props.data.description?this.props.data.description:"无"}</div>
            </div>
          </div>
          <div className="card-body-btn">
            <Popconfirm title="此操作不可恢复，确定删除？" onConfirm={this.props.delete} >
              <div className="card-body-btn-del">
                <Icon type="delete" />
              </div>
            </Popconfirm>
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