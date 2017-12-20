/*
 * @Author: yangtmm 
 * @Date: 2017-11-06 14:01:09 
 * @Last Modified by: yangtmm
 * @Last Modified time: 2017-12-13 12:57:27
 */

import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Table, Modal, Button, Input, Select, Radio, Popconfirm, Form, Row, Col, Checkbox } from 'antd';

import Operation from 'components/common/operation'
const Search = Input.Search;
const FormItem = Form.Item;
const CheckboxGroup = Checkbox.Group;
import './index.less';

//action方法
import * as Actions from "../action/approval.js"

import CreateForm from './approval-form';
import Card from './approval-card';

class Approval extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    //初始请求数据
    let { $$state, action } = this.props;
    console.log(this.props.newObj)
    //action.getBusinessObjList();
  }

  handleCreate = () => {//--保存按钮
    let { $$state, action } = this.props;
    let saveData = $$state.get("editData").toJS();
    let roleList = $$state.get("roleList").toJS();
    let editIndex = $$state.get("editIndex");
    let isEdit = $$state.get("isEdit");
    //判断是否为编辑
    let viewRole = roleList.filter((item)=>{
      return saveData.roles.includes(item.value);//--这个es7的语法，在标准模式下ie11都不支持，我们应该封装抽取出来？？？？
    })

    saveData.roles = viewRole;
    if(isEdit){
      action.saveEditBusinessObj(saveData, editIndex);//--这个地方如果是编辑的话我们把redux中获取到的editIndex原封不动的再返回去，有什么作用？？？？
      return;
    }
    action.saveAddBusinessObj(saveData);
  }

  render() {
    //引入状态与方法
    let { $$state, action } = this.props;
    let editData = $$state.get("editData").toJS();
    //批量渲染card
    let nodeCard = $$state.get("data").toJS().map((item, index) => {
      return <Card
        data={item}
        operations={item.operations}
        edit={action.addBusinessObjData.bind(this,{djType:1})}
        delete={action.delBusinessObjData.bind(this, item, index)}
        />
    });

    return (
      <div className='business-obj-warpper'>
        <div className='head-panel'>
          <Row gutter={16}>
            <Col className="gutter-row" span={22}>
              <Operation disabled={0}>
                <Search
                  placeholder="搜索业务类型..."
                  onSearch={action.getBusinessObjList} 
                  style={{ width: "200px", marginRight: 10 }}
                /> 
              </Operation>
            </Col>
            <Col className="gutter-row" span={2} className="text-align-right">
              <Operation disabled={0}>
                <Button type="primary" icon="plus" onClick={action.addBusinessObjData.bind(this,{djType:1})}>新建</Button>
              </Operation>
            </Col>
          </Row>
        </div>
        <div className="card-con">{nodeCard}</div>
      </div>
    )
  }
}

//绑定状态到组件props
function mapStateToProps(state, ownProps) {
  return {
    $$state: state.businessObjDef.approval
  }
}

//绑定action到组件props
function mapDispatchToProps(dispatch) {
  return {
    action: bindActionCreators(Actions, dispatch)
  }
}

//输出绑定state和action后组件
export default connect(mapStateToProps, mapDispatchToProps)(Approval);