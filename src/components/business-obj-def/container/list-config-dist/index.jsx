/*
 * @Author: yangtmm 
 * @Date: 2017-11-10 16:30:00 
 * @Last Modified by: yangtmm
 * @Last Modified time: 2017-12-22 11:22:55
 */

import React from 'react'
import { Button, Input, Radio, Popconfirm, Form, Row, Col, Icon, Checkbox, Modal, Tabs, Select } from 'antd';
const Option = Select.Option;

import './index.less'

export default class Distribute extends React.Component {

  static defaultProps = {
    data: {
      selectData: [],
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

  checkTplType = (item, rowId) => {
    this.setState({
      checkedItem: rowId
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
    let { selectData, roles, assignments } = this.props.data;
    
    let elsSelectData = selectData.map((item) => {
      return <Option value={item.data.id}>{item.data.name}</Option>
    });

    let elsRows = roles.map((row) => {
      if (this.state.checkedItem == row.id) {
        return (<tr>
          <td className="table-head-item">{row.name}</td>
          <td className="table-item table-checked">
            <Select value={assignments[row.id]["id"]} style={{ width: 120 }} onChange={this.changeSelect}>
              {elsSelectData}
            </Select>
          </td>
        </tr>)
      } else {
        return (<tr>
          <td className="table-head-item">{row.name}</td>
          <td
            className="table-item"
            onClick={this.checkTplType.bind(this, assignments[row.id], row.id)}
          >{assignments[row.id]["name"]}</td>
        </tr>)
      }

    });


    return (
      <div className="list-config-dist">
        <table>{elsRows}</table>
      </div>
    );
  }
}