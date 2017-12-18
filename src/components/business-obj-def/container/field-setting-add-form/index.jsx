/*
 * @Author: yangtmm 
 * @Date: 2017-11-06 14:01:09 
 * @Last Modified by: yangtmm
 * @Last Modified time: 2017-12-06 14:21:11
 */
import { Modal, Button, Input, Radio, Popconfirm, Form, Row, Col, Checkbox } from 'antd';
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

  render() {

    const { visible, title, onCancel, onAdd, addData } = this.props;

    let nodeformControls = this.props.formControls.map((item) => {
      return <div
        className={addData.type == item.type ? "form-control-item form-control-item-checked" : "form-control-item"}
        onClick={this.props.checkFormControls.bind(this, item)}
      >{item.name}</div>
    });

    return (
      <Modal
        width={800}
        title={title}
        visible={visible}
        onOk={onAdd}
        onCancel={onCancel}
        style={{ top: 10 }}
      >
        <div className="feild-setting-add-form">
          <div className="feild-setting-form-source">
            {nodeformControls}
          </div>
          <div className="feild-setting-form-props">
            <Row gutter={16} className="gutter-row">
              <Col className="gutter-row form-lable" span={6}>*字段名称</Col>
              <Col className="gutter-row" span={16}>
                <Input onChange={this.onChange.bind(this, "name")} placeholder="输入名称。。。" value={addData.name}  />
              </Col>
            </Row>
            <Power showBool={addData.type == 1 || addData.type == 2} >
              <Row gutter={16} className="gutter-row">
                <Col className="gutter-row form-lable" span={6}>*字段长度</Col>
                <Col className="gutter-row" span={16}>
                  <Input onChange={this.onChange.bind(this, "length")} placeholder="输入API名称。。。" disabled value={addData.length} />
                </Col>
              </Row>
            </Power>
            <Power showBool={addData.type == 4} >
              <Row gutter={16} className="gutter-row">
                <Col className="gutter-row form-lable" span={6}>*小数位数</Col>
                <Col className="gutter-row" span={16}>
                  <Input onChange={this.onChange.bind(this, "precision")} placeholder="输入API名称。。。" value={addData.precision} />
                </Col>
              </Row>
            </Power>
            <Power showBool={addData.type == 4 } >
              <Row gutter={16} className="gutter-row">
                <Col className="gutter-row form-lable" span={6}>*最小值</Col>
                <Col className="gutter-row" span={16}>
                  <Input onChange={this.onChange.bind(this, "minValue")} placeholder="输入API名称。。。" value={addData.minValue} />
                </Col>
              </Row>
            </Power>
            <Power showBool={addData.type == 4} >
              <Row gutter={16} className="gutter-row">
                <Col className="gutter-row form-lable" span={6}>*最大值</Col>
                <Col className="gutter-row" span={16}>
                  <Input onChange={this.onChange.bind(this, "maxValue")} placeholder="输入API名称。。。" value={addData.maxValue} />
                </Col>
              </Row>
            </Power>
            <Row gutter={16} className="gutter-row">
              <Col className="gutter-row form-lable" span={6}>字段描述</Col>
              <Col className="gutter-row" span={16}>
                <TextArea onChange={this.onChange.bind(this, "description")} placeholder="输入字段描述。。。" value={addData.description}  />
              </Col>
            </Row>
            <Power showBool={addData.type == 3} >
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
      </Modal>
    );
  }
}