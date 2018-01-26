/*
 * @Author: yangtmm 
 * @Date: 2017-11-10 16:30:00 
 * @Last Modified by: yangtmm
 * @Last Modified time: 2017-11-30 10:50:46
 */

import React from 'react'
import { Row, Col, Icon, Checkbox, Popconfirm } from 'antd';
import "./index.less"
export default class Card extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="approval-obj-def-card">
        <div className="card-header">
          <div className="card-header-name">
           {this.props.data.ysModelName}
          </div>
          <div className="card-header-btn">审批流设置</div>
        </div>
        <div className="card-body">
          <div className="card-body-con"> 
            <div className="card-body-con-item">
              <div className="card-body-con-name"></div>
              <div className="card-body-con-text"></div>
            </div>
            <div className="card-body-con-item">
              <div className="card-body-con-name"></div>
              <div className="card-body-con-text"></div>
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

