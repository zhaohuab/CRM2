/*
 * @Author: yangtmm 
 * @Date: 2017-11-10 16:30:00 
 * @Last Modified by: yangtmm
 * @Last Modified time: 2017-12-13 14:23:15
 */

import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Row, Col, Icon, Checkbox, Popconfirm, Card, Modal} from 'antd';
import './index.less';
import "assets/stylesheet/all/iconfont.css";

class Cards extends React.Component {
  static defaultProps = {
    data: {
      id: 1, 
      name: "业务类型1",
      description: "描述业务类型1",
      isDefault: 1,
      roles: [],
      isCustom: 1,
      isEnabled: 1
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

  getTitle = (data) => {//生成鼠标跟随title内容
    let str = '';
    data.forEach(item=>{
      str+=item.name+'、'
    })
    return str
  }

onEnable=(isEnable)=>{ 
    if(this.props.data.isDefault) {
        Modal.warning({
          title: "你正在操作的是默认业务类型",
          content: '默认业务类型不可停用',
        });
    }else{
      this.props.enable(isEnable);
    }
}

  //点击删除按钮
  btnDelete(flag) {
    if(flag) return ; 
    let that = this;
    Modal.confirm({
        title: "你是否确认删除选中的业务类型?",
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
/* 
变量设定：
name:业务类型名称;
enable:停启用状态;

 */


  render() {
    let { roles, name, isCustom, isDefault, isEnabled } = this.props.data;
    let getTitle=this.getTitle;
    let enableStyle = isEnabled ? {background:'#3CA4FB'}:{background:'#ddd'},
        cardStyle = isEnabled ? {border:'1px solid #56B0FC'}:{border:'1px solid #ddd'},
        deleteStyle = isDefault||!isCustom ? {color:'#ccc'}:{color:'#666'},
        editStyle = isDefault ?{color:'#ccc'}:{color:'#666'},
        flag = isDefault||!isCustom;
    return (
      <div className="busi-obj-def-card" style={cardStyle}>
        {
          isDefault?<div className='card-default'><i className="iconfont icon-moren1" /></div>:''
        } 
        <div className="card-header">
          <div className="card-header-name">
            <span className='card-header-default-father'>
              {this.props.data.name}
              {
                !isCustom?<div className='card-default'><i className="iconfont icon-zhuyaolianxiren" /></div>:''
              } 
            </span>
          </div>
          <div className="card-header-btn" onClick={this.onEnable.bind(this,!isEnabled)} style={enableStyle}>{isEnabled ? "启用" : '停用'}</div>
        </div>
        <div className="card-body">
          <div className="card-body-con">
            <div className="card-body-con-item">
              <div className="card-body-con-name">适用业务角色：</div>
              <div className="card-body-con-text" title={this.props.data.isDefault == 1 ? "全部角色" : getTitle(roles)
              }>
                {this.props.data.isDefault == 1 ? "全部角色" : this.props.data.roles.map(item=> <span>{item.name}</span>)}
              </div>
            </div>         
          </div>
          <div className="card-body-btn">
            <div  onClick={this.btnDelete.bind(this,flag)}><Icon type="delete" style={deleteStyle}/></div>
            <div className="card-body-btn-edit" onClick={this.props.edit.bind(this,isDefault)}><Icon type="edit" style={editStyle}/></div>
          </div>
        </div>
      </div>
    )
  }
}

Cards.propTypes = {
  name: React.PropTypes.string,
  contentLabel: React.PropTypes.string
}

//绑定状态到组件props
function mapStateToProps(state, ownProps) {
  return {
    $$state: state.businessObjDef.businessObj
  }
}


//输出绑定state和action后组件
export default connect(mapStateToProps,{})(Cards);


/* 
 <div className='bussiness-obj-card'> 
        <Card title={this.getCardTitle.bind(this,name)} extra={this.getEnable.bind(this)} style={{ width: '100%', height: '100%' }}>
          <Row type='flex' gutter={10}>
            <Col span={7.5}>适用业务角色：</Col>
            <Col span={10.5}><div title={this.props.data.isDefault == 1 ? "全部角色" : this.getEleTitle.call(this,roles)}>
              {this.props.data.isDefault == 1 ? "全部角色" : 
                this.props.data.roles.map(item=> <span>{item.name}</span>)}
            </div></Col>
            <Col span={6}>
              <div className="operate">
                <div className={ isCustom ?'isOperate':'disOperate'} onClick={this.btnDelete.bind(this,isCustom)}><Icon type="delete" /></div>
                <div className="edit" onClick={this.props.edit}><Icon type="edit" /></div>
              </div>
            </Col>                  
          </Row>
        </Card>
      </div>
 */


/* 
 
 */