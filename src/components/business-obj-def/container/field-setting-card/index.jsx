/*
 * @Author: yangtmm 
 * @Date: 2017-11-10 16:30:00 
 * @Last Modified by: yangtmm
 * @Last Modified time: 2017-12-14 13:45:05
 */

import React from 'react'
import { Row, Col, Icon, Checkbox, Input, Select, Modal } from 'antd';
const { TextArea } = Input;
const Option = Select.Option;
import "./index.less";
import "assets/stylesheet/all/iconfont.css";
export default class Card extends React.Component {
  static defaultProps = {
    data: {
      fullname: "Customer.address",
      apiName: "address",
      type: 1,
      name: "地址",
      isCustom: 0
    },
    operations: {
      edit: 1,
      delete: 1
    },
    delete: function (arg) {
      console.log(arg)
    },
    edit: function (arg) {
      console.log(arg)
    }
  }

  constructor(props) {
    super(props);
  }
  
 /* onDelete = (xx)=>{
   this.props.delete()
 } */

  btnDelete(flag) {
    let that = this;
    if(!flag) return ; 
    Modal.confirm({
        title: "你是否确认删除选中的内容?",
        content: "此操作不可逆",
        okText: "是",
        okType: "danger",
        cancelText: "否",
        onOk() {
          that.props.delete()
        },
        onCancel() {
            console.log("Cancel");
        }
    });
  }

 

  render() {
  /*   let typeReferencesComponents = {
      1: <Input style={{ width: 120 }} placeholder="" />,
      3: <TextArea style={{ width: 120 }} rows={2} />,
      16: <Select style={{ width: 120 }} defaultValue={"无"}><Option value="lucy">Lucy</Option></Select>
    } */

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

let { isCustom } =this.props.data;
let deleteStyle = isCustom ? {color:'#666'}:{color:'#ccc'};
    return (
  <div className="field-setting-card">
    
        <div className="card-header">
          <div className="card-header-name">
            <span className='card-header-default-father'>
              {this.props.data.name}
              {
                !isCustom?<div className='card-default'><i className="iconfont icon-zhuyaolianxiren" /></div>:''
              } 
            </span>
          </div>
        </div>
        <div className="card-body">
          <div className="card-body-con">
            <div className="card-body-con-item">
              <div className="card-body-con-name">字段类型：</div>
              <div className="card-body-con-text">
               {typeReferencesComponents[this.props.data.type]}
              </div>
            </div>         
          </div>
          <div className="card-body-btn">
            <div  onClick={this.btnDelete.bind(this,isCustom)}><Icon type="delete" style={deleteStyle}/></div>
            <div className="card-body-btn-edit" onClick={this.props.edit}><Icon type="edit" /></div>
          </div>
        </div>
      </div>














      
    )
  }
}

Card.propTypes = {
  name: React.PropTypes.string,
  contentLabel: React.PropTypes.string
}


/* 
<div className="field-setting-card">
        <Row gutter={8} type='flex' align='middle'>
          <Col span={20}>
          <Row type="flex" align="middle">
              <Col span={24} style={{width:'100%',height:'50%'}}>名称：{this.props.data.name}</Col>
              <Col span={24} style={{width:'100%',height:'50%'}}>
                <div className="mask-layer"></div>
                类型：{typeReferencesComponents[this.props.data.type]}
              </Col>
            </Row>
          </Col>
          <Col span={4} >
            {
              this.props.operations.edit ?
                <span className="field-setting-card-btn" title={"编辑"} onClick={this.props.edit}>
                  <Icon type="edit" />
                </span>
                : null
            }

            {
              this.props.operations.delete ?
                <Popconfirm title="此操作不可恢复，确定删除？" onConfirm={this.props.delete} >
                  <span className="field-setting-card-btn" title={"删除"}>
                    <Icon type="delete" />
                  </span>
                </Popconfirm>
                : null
            }
          </Col>
        </Row>
      </div>

 */