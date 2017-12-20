/*
 * @Author: yangtmm 
 * @Date: 2017-11-06 14:01:09 
 * @Last Modified by: yangtmm
 * @Last Modified time: 2017-12-06 13:37:13
 */
import { Modal } from 'antd';
import "./index.less"

export default class FormList extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    const { visible, onCancel, onCreate, editData } = this.props;
    return (
      <Modal
        visible={visible}
        title={ this.props.title}
        onCancel={onCancel}
        onOk={onCreate}
      >
       <div className="business-obj-form">
       
        </div> 
      </Modal>
    );
  }
}



/* 
 <Row gutter={16} className="gutter-row">
          <Col className="gutter-row form-lable form-lable-line-height" span={6}>
            *单据类型
          </Col>
          <Col className="gutter-row" span={16}>
            <Input value = {editData.name} onChange = {this.onChange.bind(this, "name")} placeholder="输入名称。。。" />
          </Col>
        </Row>
        <Row gutter={16} className="gutter-row">
          <Col className="gutter-row form-lable form-lable-line-height" span={6}>
            业务类型
          </Col>
          <Col className="gutter-row " span={16}>
            <Input value = {editData.des}  type="textarea" onChange = {this.onChange.bind(this, "des")}/>
          </Col>
        </Row>
 */