/*
 * @Author: yangtmm 
 * @Date: 2017-11-06 14:01:09 
 * @Last Modified by: yangtmm
 * @Last Modified time: 2017-12-22 18:48:13
 */
import { Modal, Button, Input, Radio, Select, Popconfirm, Form, Row, Col, Checkbox, Menu, Dropdown, Icon } from 'antd';
const Option = Select.Option;
const { TextArea } = Input;

import OptList from './OptList';
import "./index.less"

function Power(props) {
  let showBool = props.showBool || false;
  return <div className="gutter-row">{showBool ? props.children : null}</div>
}

export default class FormList extends React.Component {
  static defaultProps = {
    formTypeList: [{
      name: "单行文本",
      type: 1,
      length: 255,
      precision: 2,
      minValue: 0,
      maxValue: 10000,
      description: '',
      defaultChecked: 1,
      refDocId: 0
    }]
  }

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

  referenceChoice = (menuData,e) => { 
   let id = menuData[e.key-1].id;
   this.props.refChoice(id)    
  }

  render() {

    const { data, menuData, nameFlag } = this.props;
   // debugger;

    let elsformControls = this.props.formTypeList.map((item) => {
      return <div
        className={data.type == item.type ? "form-control-item form-control-item-checked" : "form-control-item"}
        onClick={this.props.checkFormControls.bind(this, item)}
      >{item.name}</div>
    });
    let menu =<div></div>;
    if(menuData.length){
       menu=(
        <Menu onClick={this.referenceChoice.bind(this,menuData)} selectable={true}> 
          {
            menuData.map((item,index) => {
              return <Menu.Item key={index+1} >{item.name}</Menu.Item> 
            })           
          }                        
        </Menu>
      )
    }  

    return (
      <div className="feild-setting-add-form">
        <div className="feild-setting-form-source">
          {elsformControls}
        </div>
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
          <Power showBool={data.type == 2||data.type == 21} >
            <Row gutter={16} className="gutter-row">
              <Col className="gutter-row form-lable" span={6}>*选项设置</Col>
              <Col className="gutter-row" span={6}>
                    <Dropdown.Button
                      overlay={menu}
                      trigger={['click']}
                    >
                      选择参照
                    </Dropdown.Button>
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