/*
 * @Author: yangtmm 
 * @Date: 2017-11-10 16:30:00 
 * @Last Modified by: yangtmm
 * @Last Modified time: 2017-12-22 11:23:06
 */

import React from 'react'
import { Button, Input, Radio, Popconfirm, Form, Row, Col, Icon, Checkbox, Modal, Tabs, Select } from 'antd';
const Option = Select.Option;

import './index.less'

export default class Distribute extends React.Component {

  static defaultProps = {
    data: {
      selectData: [],
      biztypes: [],
      roles: [],
      assignments: {}
    }
  }

  constructor(props) {
    super(props);
    this.state = {
      checkedItem: "",
      checkedVal: ""
    }
  }

  checkTplType = (item, arr) => {
    // alert(item.id + ":" + arr[0] + "-" + arr[1])
    this.setState({
      checkedItem: arr[0] + "-" + arr[1]
    })
  }

  changeSelect = (value) => {
    let { selectData } = this.props.data;
    this.setState({
      checkedVal: value
    })

    let key = this.state.checkedItem;

    let selectIndex = selectData.findIndex((item) => {
      return item.data.id == value;
    });

    let argVal = {
      id: selectData[selectIndex].data.id,
      name: selectData[selectIndex].data.name
    };

    this.props.onChange(key, argVal)
  }

  render() {
    let { selectData, biztypes, roles, assignments } = this.props.data;
    let elsSelectData = selectData.map((item) => {
      return <Option value={item.data.id}>{item.data.name}</Option>
    });

    let head = roles.map((item) => {
      return <td className="table-head-item">{item.name}</td>
    });

    head.unshift(<td className="head" width="100">业务类型/角色</td>);
    let rows = biztypes.map((row, rowIndex) => {

      let tds = roles.map((td, tdIndex) => {
        if (assignments[td.id + "-" + row.id]) {
          if (this.state.checkedItem == (td.id + "-" + row.id)) {
            return <td className={"table-checked table-item"}>
              <Select value={assignments[td.id + "-" + row.id]["id"]} style={{ width: 120 }} onChange={this.changeSelect}>
                {elsSelectData}
              </Select>
            </td>
          } else {
            return <td className={"table-item"} onClick={this.checkTplType.bind(this, assignments[td.id + "-" + row.id], [td.id, row.id])}>{assignments[td.id + "-" + row.id]["name"]}</td>
          }
        }
        return <td className="table-item" >--</td>
      });

      tds.unshift(<td className="table-head-item">{row.name}</td>)
      return <tr>{tds}</tr>
    });

    return (
      <div className="tpl-setting-dist">
        <table>{head}{rows}</table>
      </div>
    );
  }
}