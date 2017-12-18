/*
 * @Author: yangtmm 
 * @Date: 2017-11-10 16:30:00 
 * @Last Modified by: yangtmm
 * @Last Modified time: 2017-12-11 13:37:32
 */

import React from 'react'
import { Button, Input, Radio, Popconfirm, Form, Row, Col, Icon, Checkbox, Modal, Tabs } from 'antd';
const TabPane = Tabs.TabPane;
const CheckboxGroup = Checkbox.Group;

import update from 'react/lib/update';
import "./index.less"

import Dustbin from './Dustbin';
import TargetBox from './TargetBox';
import SourceBox from './SourceBox';

export default class DragFields extends React.Component {

  static defaultProps = {
    tplName: "",
    fieldsSourceList: [],
    fieldsTargetList: [],
    relativeObj: [
      { label: '参与人', value: 'id1' },
      { label: '联系人', value: 'id2' },
    ],
    selectRelativeObj: [],
    onChange: function (name, targetList, selectRelativeObj) {
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
    this.props.onChange(this.props.name, targetList, this.props.selectRelativeObj);
  }

  changeName = (e) => {
    let name = e.target.value;
    this.props.onChange(name, this.props.targetList, this.props.selectRelativeObj);
  }

  addlist = (item) => {
    let targetList = this.props.targetList;
    item.id = "Id" + this.state.listId;
    targetList.push(item)
    this.props.onChange(this.props.name, targetList, this.props.selectRelativeObj);
    this.setState({ listId: this.state.listId + 1 });
  }

  delete = (index) => {
    let targetList = this.props.targetList;
    targetList.splice(index, 1)
    this.props.onChange(this.props.name, targetList, this.props.selectRelativeObj);
  }

  changeSelectRelativeObj = (checkedValues) => {
    this.props.onChange(this.props.name, this.props.targetList, checkedValues);
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
    if (type == "name") {
      value = e.target.value;
    } else {
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
    this.props.onChange(this.props.name, targetList, this.props.selectRelativeObj);
    this.setState({
      visible: false
    });
  }

  render() {
    let { sourceList, targetList } = this.props;

    //待拖拽块
    let nodeSourceList = sourceList.map((item, index) => {
      let filterBoolean = targetList.filter((listItem) => {
        return item.apiName == listItem.apiName
      })
      return (filterBoolean.length == 0 || item.apiName == "group") ? <SourceBox {...item} addlist={this.addlist.bind(this)} /> : <div className="sourceBlock disDrag">{item.name}</div>;
    });

    //已拖拽块-排序
    let nodeTargetList = this.props.targetList.map((item, index) => {
      const className = (item.apiName == "group") ? "drag-fields-list-item list-group" : "drag-fields-list-item";
      return <TargetBox
        index={index}
        id={item.id}
        key={item.id}
        moveCard={this.moveCard}
        edit={this.edit.bind(this, item, index)}
        delete={this.delete.bind(this, index)}
        item={item}
        classNames={className}
      />
    })

    return (
      <div className="tpl-setting-form">
        <Row gutter={16} className="gutter-row">
          <Col className="gutter-row form-lable" span={2}>*模板名称</Col>
          <Col className="gutter-row" span={6}>
            <Input onChange={this.changeName.bind(this)} placeholder="输入名称。。。" value={this.props.name} />
          </Col>
        </Row>
        <Tabs defaultActiveKey="1">
          <TabPane tab="主体字段" key="1">
            <div className="drag-fields-box">
              <div className="drag-fields-block">
                {nodeSourceList}
              </div>
              <div className="drag-fields-list-box">
                {nodeTargetList}
                <Dustbin />
              </div>
            </div>
          </TabPane>
          <TabPane tab="相关对象" key="2">
            <div className="relative-obj">
              <CheckboxGroup options={this.props.relativeObj} value={this.props.selectRelativeObj} onChange={this.changeSelectRelativeObj} />
            </div>
          </TabPane>
        </Tabs>
        <Modal
          width={500}
          title={"修改模板字段"}
          visible={this.state.visible}
          onOk={this.onOkChangeListItem}
          onCancel={this.hideChangeListItem}
          style={{ top: 10 }}
        >
          <div className="tpl-setting-edit-model">
            <Row gutter={16} className="gutter-row">
              <Col className="gutter-row form-lable text-align-right" span={6}>
                {this.state.editItem.apiName == "group" ? "*分组名称：" : "*模板字段名称："}
              </Col>
              <Col className="gutter-row" span={8}>
                <Input value={this.state.editItem.name} onChange={this.changeListItemForm.bind(this, "name")} placeholder="输入名称。。。" />
              </Col>
            </Row>
            {this.state.editItem.apiName == "group" ? null :
              <Row gutter={16} className="gutter-row">
                <Col className="gutter-row text-align-right" span={6}>字段属性：</Col>
                <Col className="gutter-row" span={4}>
                  <Checkbox checked={this.state.editItem.isRequired} onChange={this.changeListItemForm.bind(this, "isRequired")}>必填</Checkbox>
                </Col>
                <Col className="gutter-row" span={4}>
                  <Checkbox checked={this.state.editItem.isReadOnly} onChange={this.changeListItemForm.bind(this, "isReadOnly")}>只读</Checkbox>
                </Col>
              </Row>}
          </div>
        </Modal>
      </div>
    );
  }
}