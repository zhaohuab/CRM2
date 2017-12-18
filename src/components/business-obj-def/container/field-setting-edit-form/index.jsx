/*
 * @Author: yangtmm 
 * @Date: 2017-11-06 14:01:09 
 * @Last Modified by: yangtmm
 * @Last Modified time: 2017-12-06 14:20:58
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

    const { visible, title, onCancel, onSave, editData } = this.props;

    return (
      <Modal
        width={500}
        title={title}
        visible={visible}
        onOk={onSave}
        onCancel={onCancel}
        style={{ top: 10 }}
      >
        <div className="feild-setting-edit-form">
          <div className="feild-setting-form-props">
            <Row gutter={16} className="gutter-row">
              <Col className="gutter-row form-lable" span={6}>*字段名称</Col>
              <Col className="gutter-row" span={16}>
                <Input onChange={this.onChange.bind(this, "name")} placeholder="输入名称。。。" value={editData.name} />
              </Col>
            </Row>
            <Power showBool={editData.type == 1 || editData.type == 2} >
              <Row gutter={16} className="gutter-row">
                <Col className="gutter-row form-lable" span={6}>*字段长度</Col>
                <Col className="gutter-row" span={16}>
                  <Input onChange={this.onChange.bind(this, "length")} placeholder="输入API名称。。。" disabled value={editData.length} />
                </Col>
              </Row>
            </Power>
            <Power showBool={editData.type == 4} >
              <Row gutter={16} className="gutter-row">
                <Col className="gutter-row form-lable" span={6}>*小数位数</Col>
                <Col className="gutter-row" span={16}>
                  <Input onChange={this.onChange.bind(this, "precision")} placeholder="输入API名称。。。" disabled value={editData.precision} />
                </Col>
              </Row>
            </Power>
            <Power showBool={editData.type == 4} >
              <Row gutter={16} className="gutter-row">
                <Col className="gutter-row form-lable" span={6}>*最小值</Col>
                <Col className="gutter-row" span={16}>
                  <Input onChange={this.onChange.bind(this, "minValue")} placeholder="输入API名称。。。" value={editData.minValue} />
                </Col>
              </Row>
            </Power>
            <Power showBool={editData.type == 4} >
              <Row gutter={16} className="gutter-row">
                <Col className="gutter-row form-lable" span={6}>*最大值</Col>
                <Col className="gutter-row" span={16}>
                  <Input onChange={this.onChange.bind(this, "maxValue")} placeholder="输入API名称。。。" value={editData.maxValue} />
                </Col>
              </Row>
            </Power>
            <Row gutter={16} className="gutter-row">
              <Col className="gutter-row form-lable" span={6}>字段描述</Col>
              <Col className="gutter-row" span={16}>
                <TextArea onChange={this.onChange.bind(this, "description")} placeholder="输入字段描述。。。" value={editData.description} />
              </Col>
            </Row>
            <Power showBool={editData.type == 3} >
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