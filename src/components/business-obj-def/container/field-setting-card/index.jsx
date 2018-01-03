/*
 * @Author: yangtmm 
 * @Date: 2017-11-10 16:30:00 
 * @Last Modified by: yangtmm
 * @Last Modified time: 2017-12-14 13:45:05
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
  }

  render() {
  /*   let typeReferencesComponents = {
      1: <Input style={{ width: 120 }} placeholder="" />,
      3: <TextArea style={{ width: 120 }} rows={2} />,
      16: <Select style={{ width: 120 }} defaultValue={"无"}><Option value="lucy">Lucy</Option></Select>
    } */

     let typeReferencesComponents = {
      1: '单行文本',
      2: '平铺单选',
      3: '多行文本',
      4: '布尔型',
      5: '整型',
      6: '浮点型',
      7: '多选',
      8:	'图像',
      9:	'货币',
      10:	'日期',
      11:	'日期时间',
      12:	'电话',
      13:	'邮箱',
      14:	'网址',
      15:	'位置',
      16:	'参照'
    }

    return (
      <div className="field-setting-card">
        <Row gutter={8} type='flex' align='middle'>
          <Col span={20}>
          <Row type="flex" align="middle">
              <Col span={24} style={{width:'100%',height:'50%'}}>名称：{this.props.data.name}</Col>
              <Col span={24} style={{width:'100%',height:'50%'}}>
                <div className="mask-layer"></div>
                类型：{typeReferencesComponents[this.props.data.type]}
              </Col>
            </Row>
          </Col>
          <Col span={4} >
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