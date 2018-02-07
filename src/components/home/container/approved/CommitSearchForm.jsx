
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

class Commit extends React.Component {
  constructor(props) {
    super(props)
  }

  handleSearch = (e) => {
    e.preventDefault();
    let { searchMap, pagination } = this.props.$$state.toJS();
    if (searchMap.statusCommit == 'unFinish') {
      this.props.action.getDateUnfinished(pagination, searchMap, searchMap.queryDateKey)
    } else if (searchMap.statusCommit == 'finish') {
      this.props.action.getDateFinish(pagination, searchMap, searchMap.queryDateKey)
    } else {
      this.props.action.getUnfinished(pagination)
    }
  }
  onState = (e) => {
    let { searchMap, pagination } = this.props.$$state.toJS();
    e.preventDefault();
    if (e.target.value == 'todo') { this.props.action.getTodo(pagination) }
    else if (e.target.value == 'done') { this.props.action.getDone(pagination) }
    else if (e.target.value == 'finish') { this.props.action.getFinished(pagination) }
    else if (e.target.value == 'unFinish') { this.props.action.getUnfinished(pagination) }
  }
  onChangeDate = (e) => {
    debugger
    let val = e.target.value;
    let queryDateKey = val;
     
    let { searchMap, pagination, } = this.props.$$state.toJS();
    if (searchMap.statusCommit == 'unFinish') {
       debugger
      this.props.action.getDateUnfinished(pagination, searchMap, queryDateKey)
    }
    else if (searchMap.statusCommit = 'finish') {
      debugger
      this.props.action.getDateFinish(pagination, searchMap, queryDateKey)
    }
  }
  render() {
    // ;
    // let initstate='unFinish'
    let {initState1}=this.props.$$state.toJS();
    let { $$state } = this.props;
    let myState = $$state.get('myState');
    let { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: { span: 3 },
      wrapperCol: { span: 14 }
    };
    const formItemLayout1 = {
      labelCol: { span: 6},
      wrapperCol: { span: 12 }
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
                {getFieldDecorator('statusCommit',
                  {initialValue:'unFinish'}
              )(
                  <RadioGroup size="large" onChange={this.onState}>
                    <RadioButton value="unFinish">未完成</RadioButton>
                    <RadioButton value="finish">已完成</RadioButton>
                  </RadioGroup>
                )}
              </FormItem>
            </Col>
          </Row>
          <Row type="flex" justify="start"  className="approvalSearch">
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
                  <Button htmlType="submit" style={{ cursor: 'pointer', border:'none' }}>查询</Button>
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
    debugger
    let viewData = props.$$state.toJS().searchMap;
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
     debugger
    //往redux中写值
    let viewData = props.$$state.toJS().searchMap;

    //往redux中写值//把值进行更新改变
    for (let key in onChangeFild) {
      if (onChangeFild[key].value && onChangeFild[key].value.key) {
        viewData[key] = onChangeFild[key].value.key;
      } else {
        viewData[key] = onChangeFild[key].value;
      }
    }
    props.action.saveSearchMap(viewData);
  }
})(Commit)

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













































