/*
 * @Author: yangtmm 
 * @Date: 2017-11-06 14:01:09 
 * @Last Modified by: yangtmm
 * @Last Modified time: 2017-12-22 15:29:26
 */
import { Modal, Button, Input, Radio, Select, Popconfirm, Form, Row, Col, Checkbox } from 'antd';
const Option = Select.Option;
const { TextArea } = Input;

import OptList from './OptList';
import "./index.less"

function Power(props) {
  let showBool = props.showBool || false;
  return <div className="gutter-row">{showBool ? props.children : null}</div>
}

export default class FormList extends React.Component {

  constructor(props) {
    super(props);
  }

  onChange = (key, e) => {
    let value = e.target.value;
    this.props.onChange(key, value);
  }

  changePrecision = (key, value) => {
    this.props.onChange(key, value);
  }

  render() {
      let typeReferencesComponents = {
      1: '单行文本',
      2: '平铺单选',
      3: '多行文本',
      4: '布尔型',
      5: '整型',
      6: '浮点型',
      7: '多选',
      8:	'图像',
      9:	'货币',
      10:	'日期',
      11:	'日期时间',
      12:	'电话',
      13:	'邮箱',
      14:	'网址',
      15:	'位置',
      16:	'参照'
    }
    const { data, nameFlag } = this.props;
    return (
      <div className="feild-setting-edit-form">
        <div className="feild-setting-form-props">
          <Row className="gutter-row">
            <Col className="gutter-row form-lable" span={7}>*字段名称：</Col>
            <Col className="gutter-row" span={12}>
              <Input onChange={this.onChange.bind(this, "name")} placeholder="输入名称。。。" value={data.name} />
            </Col>
            {
              nameFlag?
              <Col className="gutter-row-prompt" span={5}>
                <p className='prompt'>
                  *名称不能为空
                </p>
              </Col>:''
            }
          </Row>
           <Row className="gutter-row">
            <Col className="gutter-row form-lable" span={7}>字段类型：</Col>
            <Col className="gutter-row" span={12}>
              <Input disabled value={typeReferencesComponents[data.type]} />
            </Col>
          </Row>
          <Power showBool={data.type == 5||data.type == 6||data.type == 9} >
            <Row  className="gutter-row">
              <Col className="gutter-row form-lable" span={7}>最大值：</Col>
              <Col className="gutter-row" span={12}>
                <Input onChange={this.onChange.bind(this, "maxValue")} placeholder="请输入。。。" value={data.maxValue} />
              </Col>
            </Row>
          </Power>
          <Power showBool={data.type == 5||data.type == 6||data.type == 9} >
            <Row  className="gutter-row">
              <Col className="gutter-row form-lable" span={7}>最小值：</Col>
              <Col className="gutter-row" span={12}>
                <Input onChange={this.onChange.bind(this, "minValue")} placeholder="请输入。。。" value={data.minValue} />
              </Col>
            </Row>
          </Power>
          <Power showBool={data.type == 6||data.type == 9} >
            <Row  className="gutter-row">
              <Col className="gutter-row form-lable" span={7}>精度：</Col>
              <Col className="gutter-row" span={12}>
                <Select value={data.precision} style={{ width: '100%' }} onChange={this.changePrecision.bind(this, "precision")} placeholder='请选择精度。。。'>
                  <Option value="1">1</Option>
                  <Option value="2">2</Option>
                  <Option value="3">3</Option>
                  <Option value="4">4</Option>
                  <Option value="5">5</Option>
                </Select>
              </Col>
            </Row>
          </Power>
          <Power showBool={data.type == 8} >
            <Row  className="gutter-row">
              <Col className="gutter-row form-lable" span={7}>最大图片数：</Col>
              <Col className="gutter-row" span={12}>
                <Select value={data.precision} style={{ width: '100%' }} onChange={this.changePrecision.bind(this, "precision")} placeholder='请选择最大图片数。。。'>
                  <Option value="1">1</Option>
                  <Option value="2">2</Option>
                  <Option value="3">3</Option>
                  <Option value="4">4</Option>
                  <Option value="5">5</Option>
                  <Option value="6">6</Option>
                  <Option value="7">7</Option>
                  <Option value="8">8</Option>
                  <Option value="9">9</Option>
                </Select>
              </Col>
            </Row>
          </Power>
          <Power showBool={data.type == 9} >
            <Row  className="gutter-row">
              <Col className="gutter-row form-lable" span={7}>货币：</Col>
              <Col className="gutter-row" span={12}>
                <Select value={data.precision} style={{ width: '100%' }} onChange={this.changePrecision.bind(this, "precision")} placeholder='请选择币种。。。'>
                  <Option value={5}>人民币</Option>
                  <Option value="2">美元</Option>
                  <Option value="3">欧元</Option>
                </Select>
              </Col>
            </Row>
          </Power>
          <Power showBool={data.type == 11} >
            <Row  className="gutter-row">
              <Col className="gutter-row form-lable" span={7}>日期类型：</Col>
              <Col className="gutter-row" span={12}>
                <Select value={data.precision} style={{ width: '100%' }} onChange={this.changePrecision.bind(this, "precision")} placeholder='请选择日期类型。。。'>
                  <Option value={0}>年-月-日  时-分-秒</Option>
                  <Option value="2">年-月-日</Option>
                </Select>
              </Col>
            </Row>
          </Power>
          <Row className="gutter-row">
            <Col className="gutter-row form-lable" span={7}>描述：</Col>
            <Col className="gutter-row" span={12}>
              <TextArea onChange={this.onChange.bind(this, "description")} placeholder="输入字段描述。。。" value={data.description} />
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}



/* 
     <Power showBool={data.type == 88} >
      <Row className="gutter-row">
        <Col className="gutter-row form-lable" span={7}>*字段长度：</Col>
        <Col className="gutter-row" span={12}>
          <Input onChange={this.onChange.bind(this, "length")} placeholder="输入API名称。。。" disabled value={data.length} />
        </Col>
      </Row>
    </Power>
 */