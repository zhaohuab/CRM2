/*
 * @Author: yangtmm 
 * @Date: 2017-11-06 14:01:09 
 * @Last Modified by: yangtmm
 * @Last Modified time: 2017-11-29 13:30:09
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
    let roleslist = ['admin', 'manager', 'normal']
    const onChange = this.props.onChange;
    if (onChange) {
      onChange(roleslist);
    }
  }

  render() {
    //引入状态与方法
    let { $$state, action } = this.props;
    let roleList = $$state.get("roleList").toJS();
    return (
      <div>
        <Row>
          <Col span={4}><Button type="primary" size="small" onClick={this.checkedAll}>全选</Button></Col>
          <Col span={18}><CheckboxGroup options={roleList} value={this.props.value} onChange={this.onChange} /></Col>
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