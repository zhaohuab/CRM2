
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Form, Input, Table, Row, Col, Radio, Button } from 'antd';
import './index.less';
import 'assets/stylesheet/all/iconfont.css';
import * as Actions from "../../action/approval.js";
import { queryDataIndex } from 'echarts/lib/util/model';

const FormItem = Form.Item;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

class Search extends React.Component {
  constructor(props) {
    super(props)
  }


  handleSearch = (e) => {
     
    e.preventDefault();
    let { searchMapApproval, pagination } = this.props.$$state.toJS();
    if (searchMap.status == 'todo') {
      this.props.action.getTodo(pagination, searchMap, searchMap.queryDateKey)

    } else if (searchMap.status == 'done') {
      this.props.action.getDone(pagination, searchMap, searchMap.queryDateKey)
    } else {
      this.props.action.getTodo(pagination)
    }

  }

  onState = (e) => {
    let { searchMapApproval, pagination } = this.props.$$state.toJS();
    e.preventDefault();
    if (e.target.value == 'todo') { this.props.action.getTodo(pagination) }
    else if (e.target.value == 'done') { this.props.action.getDone(pagination) }
    else if (e.target.value == 'finish') { this.props.action.getFinished(pagination) }
    else if (e.target.value == 'unFinish') { this.props.action.getUnfinished(pagination) }
  }
  onChangeDate = (e) => {
    let val = e.target.value;
    let queryDateKey = val;
     
    let { searchMapApproval, pagination, } = this.props.$$state.toJS();
    if (searchMapApproval.status == 'unFinish') {
       
      this.props.action.getDateUnfinished(pagination, searchMapApproval, queryDateKey)
    } else if (searchMapApproval.status == 'todo') {
      this.props.action.getDateTodo(pagination, searchMapApproval, queryDateKey)
    } else if (searchMapApproval.status = 'done') {
       
      this.props.action.getDateDone(pagination, searchMapApproval, queryDateKey)
    } else if (searchMapApproval.status = 'finish') {
       
      this.props.action.getDateFinish(pagination, searchMapApproval, queryDateKey)
    }
  }
  render() {
    // ;
    let { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: { span: 3 },
      wrapperCol: { span: 14 }
    };
    const formItemLayout1 = {
      labelCol: { span: 6 },
      wrapperCol: { span:12 }
    };
    return (
      <div>
        <Form onSubmit={this.handleSearch}>
          <Row type="flex" justify="start">
            <Col span={20}>
              <FormItem
                label='时间范围'
                { ...formItemLayout }
              >
                {getFieldDecorator('queryDateKey')(
                  <RadioGroup size="large" onChange={this.onChangeDate}>
                    <RadioButton value="1">今天</RadioButton>
                    <RadioButton value="2">本周</RadioButton>
                    <RadioButton value="3">本季</RadioButton>
                    <RadioButton value="4">今年</RadioButton>
                    <RadioButton value="5">不限</RadioButton>
                  </RadioGroup>
                )}
              </FormItem>
            </Col>
          </Row>

          <Row type="flex" justify="start">
            <Col span={20}>
              <FormItem
                label='单据状态'
                {...formItemLayout}
              >
                {getFieldDecorator('status', {
                  initialValue:'todo'
                }    
              )(
                  <RadioGroup size="large " onChange={this.onState}>
                    <RadioButton value="todo">待办</RadioButton>
                    <RadioButton value="done">已办</RadioButton>
                  </RadioGroup>
                )}
              </FormItem>
            </Col>
          </Row>
          <Row type="flex" justify="start" className="approvalSearch" >
            <Col span={10}>
              <FormItem
                label='模糊搜索'
                {...formItemLayout1}
              >
                {getFieldDecorator('queryKey')(
                  <Input />
                )}
               
              </FormItem>
            </Col>
            <Col span={2}>
                  <Button className="approvalButton" htmlType="submit" style={{ cursor: 'pointer',border:'none' }}>查询</Button>
                </Col>
          </Row>
        </Form>
      </div>
    )
  }
}

const WrapedCard = Form.create({

  mapPropsToFields: (props) => {
    //把redux中的值取出来赋给表单
     
    let viewData = props.$$state.toJS().searchMapApproval;
    let value = {};
     
    for (let key in viewData) {
      value[key] = { value: viewData[key] };
    }
    // 把字段合成对象
    return {
      ...value
    };

  },
  onFieldsChange: (props, onChangeFild) => {
     
    //往redux中写值
    let viewData = props.$$state.toJS().searchMapApproval;

    //往redux中写值//把值进行更新改变
    for (let key in onChangeFild) {
      if (onChangeFild[key].value && onChangeFild[key].value.key) {
        viewData[key] = onChangeFild[key].value.key;
      } else {
        viewData[key] = onChangeFild[key].value;
      }
    }
    props.action.savesearchMapApproval(viewData);
  }
})(Search)

function mapStateToProps(state, ownProps) {
  return {
    $$state: state.approval
  }
}

function mapDispatchToProps(dispatch) {
  return {
    action: bindActionCreators(Actions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(WrapedCard);













































