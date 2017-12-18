/*
 * @Author: yangtmm 
 * @Date: 2017-11-10 16:30:00 
 * @Last Modified by: yangtmm
 * @Last Modified time: 2017-12-06 13:41:32
 */

import React from 'react'
import { Row, Col, Icon, Checkbox, Input, Select, Popconfirm } from 'antd';
const { TextArea } = Input;
const Option = Select.Option;
import "./index.less"

export default class Card extends React.Component {
  static defaultProps = {
    data: {
      fullname: "Customer.address",
      apiName: "address",
      type: 1,
      name: "地址",
      isCustom: 0
    },
    operations: {
      edit: 1,
      delete: 1
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
    this.typeReferences = ["单行文本", "多行文本", "下拉菜单"]
  }

  render() {
    let typeReferencesComponents = {
      1: <Input style={{ width: 120 }} placeholder="" />,
      2: <TextArea style={{ width: 120 }} rows={2} />,
      3: <Select style={{ width: 120 }} defaultValue={"无"}><Option value="lucy">Lucy</Option></Select>
    }

    return (
      <div className="field-setting-card">
        <Row gutter={8}>
          <Col span={6} ><label title={this.props.data.name}>{this.props.data.name}</label></Col>
          <Col span={12} >
            <div className="mask-layer"></div>
            {typeReferencesComponents[this.props.data.type]}
          </Col>
          <Col span={6} >
            {
              this.props.operations.edit ?
                <span className="field-setting-card-btn" title={"编辑"} onClick={this.props.edit}>
                  <Icon type="edit" />
                </span>
                : null
            }

            {
              this.props.operations.delete ?
                <Popconfirm title="此操作不可恢复，确定删除？" onConfirm={this.props.delete} >
                  <span className="field-setting-card-btn" title={"删除"}>
                    <Icon type="delete" />
                  </span>
                </Popconfirm>
                : null
            }
          </Col>
        </Row>
      </div>
    )
  }
}

Card.propTypes = {
  name: React.PropTypes.string,
  contentLabel: React.PropTypes.string
}