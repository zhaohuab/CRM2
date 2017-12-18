/*
 * @Author: yangtmm 
 * @Date: 2017-11-06 14:01:09 
 * @Last Modified by: yangtmm
 * @Last Modified time: 2017-12-05 15:01:16
 */

import React from 'react'
import update from 'react/lib/update'
import Immutable from 'immutable'
import "./index.less"

export default class FormList extends React.Component {
  static defaultProps = {
    data: []
  }

  constructor(props) {
    super(props);
    this.state = {
      data: [{
        name: "默认选项",
        key: "opt1",
        id: "id1",
      }],
      startIndex: 0
    }
  }

  onChange = () => {

  }

  render() {
    let len = this.state.data.length;
    let nodeList = this.state.data.map((item, index) => {
      return <div></div>
    })

    return (
      <div className="feild-setting-form-opt-list">
        {nodeList}
      </div>
    );
  }
}