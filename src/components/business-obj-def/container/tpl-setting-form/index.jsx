/*
 * @Author: yangtmm 
 * @Date: 2017-11-10 16:30:00 
 * @Last Modified by: yangtmm
 * @Last Modified time: 2017-12-19 18:23:48
 */

import React from 'react'
import { Button, Input, Radio, Popconfirm, Form, Row, Col, Icon, Checkbox, Modal, Tabs } from 'antd';
const RadioGroup = Radio.Group;
const TabPane = Tabs.TabPane;
const CheckboxGroup = Checkbox.Group;
const { TextArea } = Input;
import update from 'react/lib/update';
import "./index.less"

import Dustbin from './Dustbin';
import TargetBox from './TargetBox';
import SourceBox from './SourceBox';
import RolesChoosed from './RolesChoosed';

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
        name: "",
        isRequired: 0,
        isReadOnly: 0,
        width: 0.5
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

  changeName = (name,e) => {
    let {value} = e.target;
    this.props.onChange(name, value, this.props.targetList, this.props.selectRelativeObj);
  }

  addlist = (item) => {
    let targetList = this.props.targetList;
    item.idForClient = "Id" + this.state.listId;
    targetList.push(item)
    this.props.changeTplList(targetList, this.props.selectRelativeObj);
   /*  if(item.apiName!=''&&item.apiName!='group'){//------自定义过滤方法
      this.props.filterSource(item)
    }  */ 
    this.setState({ listId: this.state.listId + 1 });
  }

  delete = (index,item) => {
    let targetList = this.props.targetList;
    targetList.splice(index, 1)
    this.props.changeTplList(targetList, this.props.selectRelativeObj);
    /* if(item.apiName!=''&&item.apiName!='group'){//----自定义恢复方法
       this.props.restoreSource(item);
    }  */
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
    } else if(type == "width"){
      value = e.target.value;
    }else {
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
    let { sourceList, targetList, objFlag, nameFlag } = this.props;
    //待拖拽块
    let nodeSourceList = sourceList.map((item, index) => {
      let filterBoolean = targetList.filter((listItem) => {
        return item.apiName == listItem.apiName
      })
      return (filterBoolean.length == 0 || item.elementType == "group" || item.isBlank == 1) ? <SourceBox {...item} addlist={this.addlist.bind(this)} /> : '';
    });

    //已拖拽块-排序
    let nodeTargetList = this.props.targetList.map((item, index) => {
      let className = "drag-fields-list-item";
      if (item.elementType == "group") {
        className = "drag-fields-list-item list-group";
      } else if (item.width == 1 && item.elementType != "group") {
        className = "drag-fields-list-item list-whole-line";
      };

      return <TargetBox
        index={index}
        id={item.idForClient}
        key={item.idForClient}
        moveCard={this.moveCard}
        edit={this.edit.bind(this, item, index)}
        delete={this.delete.bind(this, index)}
        item={item}
        classNames={className}
      />
    })

    return (
      <div className="tpl-setting-form">
        <Row gutter={16} className="gutter-row" type='flex' align='top'>
          <Col span={12}>
            <Row type='flex' align='middle'>
              <Col span={24} style={{marginBottom:'15px'}}>
                <Row type='flex' align='middle' > 
                  <Col className="gutter-row form-lable" span={5}>*模板名称：</Col>
                  <Col className="gutter-row" span={12}>
                    <Input onChange={this.changeName.bind(this,'name')} placeholder="输入名称。。。" value={this.props.name} />
                  </Col>
                  {
                    nameFlag?
                    <Col span={7}>
                      <p className='prompt'>*名称不能为空</p>
                    </Col>:''
                  }
                </Row>
              </Col>
              <Col span={24}>
                <Row type='flex' align='middle'> 
                  <Col className="gutter-row form-lable" span={5}>*业务类型：</Col>
                  <Col className="gutter-row" span={12}>
                    <RolesChoosed businessObj={this.props.businessObj} onChange={this.props.businessChoosed}/>
                  </Col>
                  {
                    nameFlag?
                    <Col span={7}>
                      <p className='prompt'>*名称不能为空</p>
                    </Col>:''
                  }
                </Row>
              </Col>
            </Row>
          </Col>
          <Col span={12}>
            <Row type='flex' align='middle'>
              <Col className="gutter-row" span={24}>
                <Col className="gutter-row form-lable" span={5}>布局描述：</Col>
                <Col span={12}>
                  <TextArea onChange={this.changeName.bind(this,'description')} placeholder="输入描述。。。" value={this.props.description} />
                </Col>
              </Col>
            </Row>
          </Col>
        </Row>
        <Tabs defaultActiveKey="1" animated={false}>
          <TabPane tab="主体字段" key="1">
            <div className="drag-fields-box">
              <div className="drag-fields-list-box">          
                <Dustbin className='dustbin'/>
                <div className='layout'>
                  {nodeTargetList}
                </div>       
              </div>
              <div className="drag-fields-block">
                <p className='drag-fields-block-name'>字段</p>
                <div className='drag-fields-block-content'>
                  {nodeSourceList}
                </div>           
              </div>
            </div>
          </TabPane>   
          {
            objFlag?
             <TabPane tab="相关对象" key="2">
              <div className="relative-obj">
                <CheckboxGroup options={this.props.relativeObj} value={this.props.selectRelativeObj} onChange={this.changeSelectRelativeObj} />
              </div>
            </TabPane>:
            <TabPane tab="明细字段" key="2">
           <div className="drag-fields-box">
              <div className="drag-fields-list-box">          
                <Dustbin className='dustbin'/>
                <div className='layout'>
                  {nodeTargetList}
                </div>       
              </div>
              <div className="drag-fields-block">
                <p className='drag-fields-block-name'>字段</p>
                <div className='drag-fields-block-content'>
                  {nodeSourceList}
                </div>           
              </div>
            </div>
            </TabPane>
          }    
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
                {this.state.editItem.elementType == "group" ? "*分组名称：" : "*模板字段名称："}
              </Col>
              <Col className="gutter-row" span={8}>
                <Input value={this.state.editItem.name} onChange={this.changeListItemForm.bind(this, "name")} placeholder="输入名称。。。" />
              </Col>
            </Row>
            {
              this.state.editItem.elementType == "group" ? null :
                <div>
                  <Row gutter={16} className="gutter-row">
                    <Col className="gutter-row text-align-right" span={6}>字段属性：</Col>
                    <Col className="gutter-row" span={4}>
                      <Checkbox checked={this.state.editItem.isRequired} onChange={this.changeListItemForm.bind(this, "isRequired")}>必填</Checkbox>
                    </Col>
                    <Col className="gutter-row" span={4}>
                      <Checkbox checked={this.state.editItem.isReadOnly} defaultChecked={true} onChange={this.changeListItemForm.bind(this, "isReadOnly")}>只读</Checkbox>
                    </Col>
                  </Row>
                  <Row gutter={16} className="gutter-row">
                    <Col className="gutter-row text-align-right" span={6}>宽度：</Col>
                    <Col className="gutter-row" span={10}>
                      <RadioGroup onChange={this.changeListItemForm.bind(this, "width")} value={this.state.editItem.width} defaultValue={0.5}>
                        <Radio value={1}>一行</Radio>
                        <Radio value={0.5}>半行</Radio>
                      </RadioGroup>
                    </Col>
                  </Row>
                </div>
            }
          </div>
        </Modal>
      </div>
    );
  }
}