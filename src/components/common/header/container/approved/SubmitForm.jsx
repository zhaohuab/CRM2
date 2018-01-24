
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Form, Input, Table, Row, Col, Radio } from 'antd';
import './index.less';
import 'assets/stylesheet/all/iconfont.css';
import * as Actions from "../../action/approved.js";

const FormItem = Form.Item;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

class Child extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    //debugger;
    let { $$state } = this.props;
    let myState = $$state.get('myState');
    let { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: { span: 3 },
      wrapperCol: { span: 14 }
    };
    return (
      <div>
        <Form >

          <Row gutter={10} type="flex" justify="start">
            <Col span={20}>
              <FormItem
                label='时间范围'
                { ...formItemLayout }
              >
                {getFieldDecorator('date')(
                  <RadioGroup size="large">
                    <RadioButton value="a">今天</RadioButton>
                    <RadioButton value="b">本周</RadioButton>
                    <RadioButton value="c">本季</RadioButton>
                    <RadioButton value="d">今年</RadioButton>
                    <RadioButton value="e">不限</RadioButton>
                  </RadioGroup>
                )}
              </FormItem>
            </Col>

          </Row>

          <FormItem
            label='单据状态'
            {...formItemLayout}
          >
            <Row gutter={10}>
              {
                myState ?
                  <Col span={20}>
                    {getFieldDecorator('status')(
                      <RadioGroup size="large">
                        <RadioButton value="a">待办</RadioButton>
                        <RadioButton value="b">已办</RadioButton>
                      </RadioGroup>
                    )}
                  </Col> :
                  <Col span={20}>
                    {getFieldDecorator('status')(
                      <RadioGroup size="large">
                        <RadioButton value="a">未完成</RadioButton>
                        <RadioButton value="b">已完成</RadioButton>
                      </RadioGroup>
                    )}
                  </Col>}
            </Row>
          </FormItem>
        <FormItem
            label='模糊搜索'
            {...formItemLayout}
          >
            <Row gutter={10}>
              <Col span={10}>
                {getFieldDecorator('searchData')(
                  <Input />
                )}
              </Col>
              <Col span={4}>
                <span style={{ cursor: 'pointer', marginLeft: '20px' }}>查询</span>
              </Col>
            </Row>
          </FormItem>
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
    debugger
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
        if (key == "address") {
          viewData[key] = onChangeFild[key].value;
          // let value = onChangeFild[key].value;
          // viewData["address"] = value.address;
        } else if (key == "province_city_district") {
          viewData[key] = onChangeFild[key].value.result;
          viewData["cityMyself"] = onChangeFild[key].value.custom;
        } else {
          viewData[key] = onChangeFild[key].value;
        } //把对像拆成字段  
      }
    }
    props.action.saveSearchMap(viewData);
  }
})(Child)

function mapStateToProps(state, ownProps) {
  return {
    $$state: state.header
  }
}

function mapDispatchToProps(dispatch) {
  return {
    action: bindActionCreators(Actions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(WrapedCard);













































