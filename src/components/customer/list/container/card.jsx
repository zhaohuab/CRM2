import { Cascader, Table, Icon, Button, Form, Input, Checkbox, Col, DatePicker, message, Radio } from 'antd';
import moment from 'moment';
import Department from 'components/refs/Department'
import Enum from 'utils/components/enum'
const FormItem = Form.Item;

const RadioGroup = Radio.Group;
export default class EditForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectValueLevel: '客户等级',
      selectValueSaleArea: '营销区域',
      selectValueCannelType: '渠道类型',
      selectValueIndustry: '行业',
      selectValueLifecycle: '生命周期',
      selectValueEnableState: '启用标识',
    }
  }


  componentDidMount() {
    let { fatherorgId, fatherorgName } = this.props.data;
    this.props.data.fatherorgId = { key: fatherorgId, title: fatherorgName };

    this.props.form.setFieldsValue(this.props.data);
  }
  handleChangeLevel = (value) => {
    if (value == "0") {
      this.setState({
        selectValueLevel: "客户等级"
      });
    } else {
      this.setState({
        selectValueLevel: value
      });
    };
  }
  handleChangeSaleArea = (value) => {
    if (value == "0") {
      this.setState({
        selectValueSaleArea: "营销区域"
      });
    } else {
      this.setState({
        selectValueSaleArea: value
      });
    };
  }

  handleChangeIndustry = (value) => {
    if (value == "0") {
      this.setState({
        selectValueIndustry: "行业"
      });
    } else {
      this.setState({
        selectValueIndustry: value
      });
    };
  }


  render() {
    const formItemLayout = {
      labelCol: {
        xs: 20,
        sm: 23,
      },
      wrapperCol: {
        xs: 4,
        sm: 23,
      },
    };
    const { getFieldDecorator } = this.props.form;
    return (
      <div>
        {
          this.props.data ?
            <div>
              <Form layout="inline" className="login-form home-form" >
                <div>客户信息:</div>
                <FormItem style={{ width: 200 }} {...formItemLayout} label="客户名称">
                  {getFieldDecorator('name', {
                    rules: [{ required: true, message: '请输入客户名称!' }],
                  })(
                    <Input type='text' placeholder="请输入" />
                    )}
                </FormItem>
                <FormItem style={{ width: 200 }} {...formItemLayout} label="客户等级">
                  {getFieldDecorator('level', {
                  })(
                    <Enum
                      isAddAll={true}
                      dataSource={this.props.enumData.levelEnum}
                      selectValue={this.state.selectValueLevel}
                      handleChange={this.handleChangeLevel}
                    />
                    )}
                </FormItem>
                <FormItem style={{ width: 200 }} {...formItemLayout} label="营销区域">
                  {getFieldDecorator('saleArea', {
                  })(
                    <Enum
                      isAddAll={true}
                      dataSource={this.props.enumData.saleAreaEnum}
                      selectValue={this.state.selectValueSaleArea}
                      handleChange={this.handleChangeSaleArea}
                    />
                    )}
                </FormItem>

                <FormItem style={{ width: 200 }} {...formItemLayout} label="行业" >
                  {getFieldDecorator('industry', {
                  })(
                    <Enum
                      isAddAll={true}
                      dataSource={this.props.enumData.industryEnum}
                      selectValue={this.state.selectValueIndustry}
                      handleChange={this.handleChangeIndustry}
                    />
                    )}
                </FormItem>
                <FormItem style={{ width: 200 }} {...formItemLayout} label="负责人" >
                  {getFieldDecorator('respoPerson', {
                  })(
                    <Input type='text' placeholder="请输入" />
                    )}
                </FormItem>
                <FormItem style={{ width: 200 }} {...formItemLayout} label="负责部门" >
                  {getFieldDecorator('respoDept', {
                  })(
                    <Input type='text' placeholder="请输入" />
                    )}
                </FormItem>
                <FormItem style={{ width: 200 }} {...formItemLayout} label="上级客户">
                  {getFieldDecorator('parentId', {
                  })(
                    <Input type='text' placeholder="请输入" />
                    )}
                </FormItem>
                <FormItem style={{ width: 200 }} {...formItemLayout} label="员工人数" >
                  {getFieldDecorator('employeeNum', {
                  })(
                    <Input type='text' placeholder="请输入" />
                    )}
                </FormItem>
                <FormItem style={{ width: 200 }} {...formItemLayout} label="备注" >
                  {getFieldDecorator('remark', {
                  })(
                    <Input type='text' placeholder="请输入" />
                    )}
                </FormItem>
                <div>地址信息:</div>
                <FormItem style={{ width: 200 }} {...formItemLayout} label="省/市/区/县">
                  {getFieldDecorator('province_city_district', {
                  })(
                    <Cascader options={this.props.cityData} placeholder="请输入" />

                    )}
                </FormItem>

                <FormItem style={{ width: 200 }} {...formItemLayout} label="街道号码" >
                  {getFieldDecorator('street', {
                  })(
                    <Input type='text' placeholder="请输入" />
                    )}
                </FormItem>
                <FormItem style={{ width: 200 }} {...formItemLayout} label="电话" >
                  {getFieldDecorator('tel', {
                  })(
                    <Input type='text' placeholder="请输入" />
                    )}
                </FormItem>
                <FormItem style={{ width: 200 }} {...formItemLayout} label="邮箱">
                  {getFieldDecorator('email', {
                  })(
                    <Input type='text' placeholder="请输入" />
                    )}
                </FormItem>
                <div>更多信息:</div>

                <FormItem style={{ width: 200 }} {...formItemLayout} label="注册资金" >
                  {getFieldDecorator('regCapital', {
                  })(
                    <Input type='text' placeholder="请输入" />
                    )}
                </FormItem>
                <FormItem style={{ width: 200 }} {...formItemLayout} label="法定代表人" >
                  {getFieldDecorator('legalRepresent', {
                  })(
                    <Input type='text' placeholder="请输入" />
                    )}
                </FormItem>
                <FormItem style={{ width: 200 }} {...formItemLayout} label="纳税人识别号">
                  {getFieldDecorator('eaxplayerNo', {
                  })(
                    <Input type='text' placeholder="请输入" />
                    )}
                </FormItem>
                <FormItem style={{ width: 200 }} {...formItemLayout} label="工商注册号" >
                  {getFieldDecorator('bizRegno', {
                  })(
                    <Input type='text' placeholder="请输入" />
                    )}
                </FormItem>
                <FormItem style={{ width: 200 }} {...formItemLayout} label="组织机构代码">
                  {getFieldDecorator('orgCode', {
                  })(
                    <Input type='text' placeholder="请输入" />
                    )}
                </FormItem>
              </Form>
            </div> : ''
        }
      </div>
    );
  }
}