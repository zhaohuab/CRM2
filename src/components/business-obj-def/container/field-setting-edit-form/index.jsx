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
    //debugger
    let value = e.target.value;
    this.props.onChange(key, value);
  }

  changePrecision = (key, value) => {
    this.props.onChange(key, value);
  }

  render() {

    const { data, nameFlag } = this.props;
    return (
      <div className="feild-setting-edit-form">
        <div className="feild-setting-form-props">
          <Row gutter={16} className="gutter-row">
            <Col className="gutter-row form-lable" span={6}>*字段名称</Col>
            <Col className="gutter-row" span={16}>
              <Input onChange={this.onChange.bind(this, "name")} placeholder="输入名称。。。" value={data.name} />
            </Col>
            {
              nameFlag?
              <Col className="gutter-row-prompt" span={2}>
                <p className='prompt'>
                名称不<br/>能为空
                </p>
              </Col>:''
            }
          </Row>
          <Row gutter={16} className="gutter-row">
            <Col className="gutter-row form-lable" span={6}>字段描述</Col>
            <Col className="gutter-row" span={16}>
              <TextArea onChange={this.onChange.bind(this, "description")} placeholder="输入字段描述。。。" value={data.description} />
            </Col>
          </Row>
          <Power showBool={data.type == 1 || data.type == 3} >
            <Row gutter={16} className="gutter-row">
              <Col className="gutter-row form-lable" span={6}>*字段长度</Col>
              <Col className="gutter-row" span={16}>
                <Input onChange={this.onChange.bind(this, "length")} placeholder="输入API名称。。。" disabled value={data.length} />
              </Col>
            </Row>
          </Power>
          <Power showBool={data.type == 6} >
            <Row gutter={16} className="gutter-row">
              <Col className="gutter-row form-lable" span={6}>*小数位数</Col>
              <Col className="gutter-row" span={16}>
                <Select value={data.precision} style={{ width: 120 }} onChange={this.changePrecision.bind(this, "precision")}>
                  <Option value="1">1</Option>
                  <Option value="2">2</Option>
                  <Option value="3">3</Option>
                  <Option value="4">4</Option>
                  <Option value="5">5</Option>
                </Select>
              </Col>
            </Row>
          </Power>
          <Power showBool={data.type == 5} >
            <Row gutter={16} className="gutter-row">
              <Col className="gutter-row form-lable" span={6}>*最小值</Col>
              <Col className="gutter-row" span={16}>
                <Input onChange={this.onChange.bind(this, "minValue")} placeholder="输入API名称。。。" value={data.minValue} />
              </Col>
            </Row>
          </Power>
          <Power showBool={data.type == 5} >
            <Row gutter={16} className="gutter-row">
              <Col className="gutter-row form-lable" span={6}>*最大值</Col>
              <Col className="gutter-row" span={16}>
                <Input onChange={this.onChange.bind(this, "maxValue")} placeholder="输入API名称。。。" value={data.maxValue} />
              </Col>
            </Row>
          </Power>
          <Power showBool={data.type == 16} >
            <Row gutter={16} className="gutter-row">
              <Col className="gutter-row form-lable" span={6}>*选项设置</Col>
              <Col className="gutter-row" span={6}>
                <Button>选择参照</Button>
              </Col>
              <Col className="gutter-row" span={12}>
              </Col>
            </Row>
          </Power>
        </div>
      </div>
    );
  }
}