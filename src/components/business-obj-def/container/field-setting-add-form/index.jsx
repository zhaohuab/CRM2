/*
 * @Author: yangtmm 
 * @Date: 2017-11-06 14:01:09 
 * @Last Modified by: yangtmm
 * @Last Modified time: 2017-12-22 18:48:13
 */
import { Modal, Button, Input, Radio, Select, Popconfirm, Form, Row, Col, Checkbox, Menu, Dropdown, Icon } from 'antd';
const Option = Select.Option;
const { TextArea } = Input;

import RolesChoosed from './RolesChoosed';
import "./index.less";
import "assets/stylesheet/all/iconfont.css";


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

  referenceChoice = (list) => { 
    this.props.refChoice(list[0]) 
  }  

/*   referenceChoice = (menuData,e) => { 
   let id = menuData[e.key-1].id;
   this.props.refChoice(id)    
  } */

  render() {

    let { data, menuData, nameFlag, formTypeList } = this.props;
    let src=`./image/${data.type}.png`,alt=`${data.name}`;
    let elsformControls = formTypeList.map((item) => {
      return <div
        className={data.type == item.type ? "form-control-item form-control-item-checked" : "form-control-item"}
        onClick={this.props.checkFormControls.bind(this, item)}
      >
        {item.name}
        {
          data.type == item.type ?
          <i className="iconfont icon-xuanzhong" />:''
        }
         
      </div>
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
          <div className='feild-setting-form-example'>
            <p className='example'>示例</p>
            <div className='image-wraper'>
              <img src={require(src)} alt={alt} className='image'/>
            </div>
          </div>
          
        </div>
        <div className="feild-setting-form-props">
          <Row  className="gutter-row">
            <Col className="gutter-row form-lable" span={7}>*字段名称：</Col>
            <Col className="gutter-row form-lable-content" span={13}>
              <Input onChange={this.onChange.bind(this, "name")} placeholder="请输入名称。。。" value={data.name} />
            </Col>
            {
              nameFlag?
              <Col className="gutter-row-prompt" span={4}>
                <p className='prompt'>
                  名称不能为空
                </p>
              </Col>:''
            }
          </Row>
          <Power showBool={data.type == 2||data.type == 21||data.type == 7} >
            <Row  className="gutter-row">
              <Col className="gutter-row form-lable" span={7}>*枚举来源：</Col>
              <Col className="gutter-row" span={13}>
               <RolesChoosed onChange={this.referenceChoice.bind(this)} />
              </Col>
              <Col className="gutter-row" span={4}>
                <div className='add-file'>新增档案</div>
              </Col>
            </Row>
          </Power>
          <Power showBool={data.type == 5||data.type == 6||data.type == 9} >
            <Row  className="gutter-row">
              <Col className="gutter-row form-lable" span={7}>最大值：</Col>
              <Col className="gutter-row" span={13}>
                <Input onChange={this.onChange.bind(this, "maxValue")} placeholder="请输入。。。" value={data.maxValue} />
              </Col>
            </Row>
          </Power>
          <Power showBool={data.type == 5||data.type == 6||data.type == 9} >
            <Row  className="gutter-row">
              <Col className="gutter-row form-lable" span={7}>最小值：</Col>
              <Col className="gutter-row" span={13}>
                <Input onChange={this.onChange.bind(this, "minValue")} placeholder="请输入。。。" value={data.minValue} />
              </Col>
            </Row>
          </Power>
          <Power showBool={data.type == 88} >
            <Row className="gutter-row">
              <Col className="gutter-row form-lable" span={7}>*字段长度：</Col>
              <Col className="gutter-row" span={13}>
                <Input onChange={this.onChange.bind(this, "length")} placeholder="输入API名称。。。" disabled value={data.length} />
              </Col>
            </Row>
          </Power>
          <Power showBool={data.type == 6||data.type == 9} >
            <Row  className="gutter-row">
              <Col className="gutter-row form-lable" span={7}>精度：</Col>
              <Col className="gutter-row" span={13}>
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
              <Col className="gutter-row" span={13}>
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
              <Col className="gutter-row" span={13}>
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
              <Col className="gutter-row" span={13}>
                <Select value={data.precision} style={{ width: '100%' }} onChange={this.changePrecision.bind(this, "precision")} placeholder='请选择日期类型。。。'>
                  <Option value={0}>年-月-日  时-分-秒</Option>
                  <Option value="2">年-月-日</Option>
                </Select>
              </Col>
            </Row>
          </Power>
          <Row  className="gutter-row">
            <Col className="gutter-row form-lable" span={7}>描述：</Col>
            <Col className="gutter-row" span={13}>
              <TextArea onChange={this.onChange.bind(this, "description")} placeholder="请输入描述。。。" value={data.description} />
            </Col>
          </Row>       
        </div>
      </div>
    );
  }
}