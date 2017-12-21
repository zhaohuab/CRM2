/*
 * @Author: yangtmm 
 * @Date: 2017-11-10 16:30:00 
 * @Last Modified by: yangtmm
 * @Last Modified time: 2017-12-08 16:40:49
 */

import React from 'react'
import { Row, Col, Icon, Checkbox, Popconfirm } from 'antd';
import "./index.less"
export default class Card extends React.Component {
  static defaultProps = {
    data: {
      id: "list_table_1",
      name: "列表配置1",
      description: "",
      isDefault: 1,
      isCustom: 0,
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

  render() {
    return (
      <div className="busi-obj-def-card">
        {/*<Checkbox onChange={this.props.changeCheckbox} defaultChecked = {this.props.checked}></Checkbox>*/}
        <div className="card-header">
          <div className="card-header-name">
            {this.props.data.name}
          </div>
          <div className="card-header-btn">{this.props.data.isDefault == 1 ? "预设" : null}</div>
        </div>
        <div className="card-body">
          <div className="card-body-con">
            <div className="card-body-con-item">
              <div className="card-body-con-name">描述：</div>
              <div className="card-body-con-text">{this.props.data.description}</div>
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