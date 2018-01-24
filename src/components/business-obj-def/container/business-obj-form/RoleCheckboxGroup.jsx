/*
 * @Author: yangtmm 
 * @Date: 2017-11-06 14:01:09 
 * @Last Modified by: yangtmm
 * @Last Modified time: 2017-12-12 11:22:17
 */
import { Modal, Button, Input, Radio, Popconfirm, Form, Row, Col, Checkbox } from 'antd';
const FormItem = Form.Item;
const CheckboxGroup = Checkbox.Group;
import { connect } from 'react-redux'

class RoleCheckboxGroup extends React.Component {

  static defaultProps = {
    value:[]
  }

  constructor(props) {
    super(props);
  }

  componentWillReceiveProps(nextProps) {
    // Should be a controlled component.
    if ('value' in nextProps) {
      const value = nextProps.value;
      this.setState(value);
    }
  }

  onChange = (checkedList) => {
    const onChange = this.props.onChange;
    if (onChange) {
      onChange(checkedList);
    }
  }

  checkedAll = () => {
    let roleList = this.props.$$state.get("roleList").toJS();
    let rolesOpt = roleList.map((item)=>item.id);
    const onChange = this.props.onChange;
    if (onChange) {
      onChange(rolesOpt);
    }
  }

  render() {
    //引入状态与方法
    let { $$state, action } = this.props;
    let roleList = $$state.get("roleList").toJS();
    let rolesOpt = roleList.map((item)=>{
          return {
              label:item.name,
              value:item.id
          }
    });

    return (
      <div>
        <Row>
          <Col span={4}><Button type="primary" size="small" onClick={this.checkedAll}>全选</Button></Col>
          <Col span={20}>       
            <CheckboxGroup value={this.props.value} onChange={this.onChange}>
              {
                rolesOpt.map(item=>{
                  return (
                    <Col span={12} style={{whiteSpace:'nowrap',overflow:'hidden',textOverflow:'ellipsis'}} title={item.label}><Checkbox value={item.value}>{item.label}</Checkbox></Col>
                  )
                })
              }
            </CheckboxGroup>         
          </Col>
        </Row>
      </div>
    );
  }
}

//绑定状态到组件props
function mapStateToProps(state, ownProps) {
  return {
    $$state: state.businessObjDef.businessObj
  }
}

export default connect(mapStateToProps, {})(RoleCheckboxGroup);

/* 

<CheckboxGroup options={rolesOpt} value={this.props.value} onChange={this.onChange} /> //天明原写法
*/

/* bug:如果适用角色是是全部角色的话，点击编辑出来显示的只有两个是勾选状态？？？？？ */
