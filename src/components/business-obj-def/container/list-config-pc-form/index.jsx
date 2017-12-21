/*
 * @Author: yangtmm 
 * @Date: 2017-11-10 16:30:00 
 * @Last Modified by: yangtmm
 * @Last Modified time: 2017-12-11 10:04:07
 */

import React from 'react'
import { Button, Input, Radio, Popconfirm, Form, Row, Col, Icon, Checkbox, Modal } from 'antd';
import update from 'react/lib/update';
import "./index.less"
import Dustbin from './Dustbin';
import SourceBox from './SourceBox';

export default class DragFields extends React.Component {

  static defaultProps = {
    tplName: "",
    fieldsSourceList: [],
    fieldsTargetList: [],
    onChange: function (name, targetList) {

    }
  }

  constructor(props) {
    super(props);
    this.state = {
      listId: 0,
      visible: false,
      editIndex: 0,
      editItem: {
        name: ""
      }
    }
  }

  moveCard = (dragIndex, hoverIndex) => {
    let targetList = this.props.targetList;
    const dragCard = targetList[dragIndex];
    targetList.splice(dragIndex, 1)
    targetList.splice(hoverIndex, 0, dragCard)
    this.props.onChange(this.props.name, targetList);
  }

  changeName = (e) => {
    let name = e.target.value;
    this.props.onChange(name, this.props.targetList);
  }

  addlist = (item) => {
    let targetList = this.props.targetList;
    item.id = "Id" + this.state.listId;
    targetList.push(item)
    this.props.onChange(this.props.name, targetList);
    this.setState({ listId: this.state.listId + 1 });
  }

  delete = (index) => {
    let targetList = this.props.targetList;
    targetList.splice(index, 1)
    this.props.onChange(this.props.name, targetList);
  }

  edit = (item, index) => {
    let editItem = Object.assign({}, item);
    this.setState({
      visible: true,
      editItem: editItem,
      editIndex: index
    });
  }

  changeListItemForm = (type, e) => {
    let value, editItem = this.state.editItem;
    if(type == "name"){
      value = e.target.value;
    }else{
      value = Number(e.target.checked);
    };

    editItem[type] = value;
    this.setState({
      visible: true,
      editItem
    });
  }

  hideChangeListItem = () => {
    this.setState({
      visible: false
    });
  }

  onOkChangeListItem = () => {
    let targetList = this.props.targetList;
    targetList.splice(this.state.editIndex, 1, this.state.editItem)
    this.props.onChange(this.props.name, targetList);
    this.setState({
      visible: false
    });
  }

  render() {
    let { sourceList, sourceListDetail, targetList } = this.props;

    //待拖主体字段
    let nodeSourceList = sourceList.map((item, index) => {
      let filterBoolean = targetList.filter((listItem) => {
        return item.apiName == listItem.apiName
      })
      return (filterBoolean.length == 0 || item.apiName == "group") ? <SourceBox {...item} addlist={this.addlist.bind(this)} /> : <div className="sourceBlock disDrag">{item.name}</div>;
    });

    return (
      <div className="list-config-pc-form">
        <Row gutter={16} className="gutter-row">
          <Col className="gutter-row form-lable" span={2}>
            *模板名称
            </Col>
          <Col className="gutter-row" span={6}>
            <Input onChange={this.changeName.bind(this)} placeholder="输入名称。。。" value={this.props.name} />
          </Col>
        </Row>
        <div className="drag-fields-box">
          <div className="drag-fields-block" style = {{ borderRight: "1px solid #eee" }}>
            <h3>主体字段：</h3>
            {nodeSourceList}
          </div>
        </div>
        <h3>列表布局：</h3>
        <Dustbin 
          targetList = {targetList} 
          moveCard={this.moveCard}
          delete={this.delete}
        />
      </div>
    );
  }
}