import { Select, Form, Row, Col, Input, Button, Icon } from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;
const ButtonGroup = Button.Group;



class BtnPanel extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {

        return (
            <div>
                <Button className='returnbtn-class' icon='swap-left'>返回</Button>
                <Button className='returnbtn-class' icon='delete'>删除</Button>
                <Button className='returnbtn-class' icon='edit'>编辑</Button>
                <ButtonGroup className='returnbtn-class'>
                    <Button icon='play-circle-o' >启用</Button>
                    <Button icon='pause-circle-o'>停用</Button>
                </ButtonGroup>
                <Button className='returnbtn-class' icon='download'>导出</Button>
            </div>

        );
    }
}

class SimForm extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        const count = 10;
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: { span: 5 },
            wrapperCol: { span: 19 },
        };
        const children = [];
        return (
            <div>

                <Col span={4} key={0} style={{ display: 0 < count ? 'block' : 'none' }}>
                    <FormItem {...formItemLayout} >
                        {getFieldDecorator('name', {
                            rules: [{ required: true, message: '请输入客户名称!' }],
                        })(
                            <Input type='text' placeholder="客户名称" />
                            )}
                    </FormItem>
                </Col>
                <Col span={4} key={1} style={{ display: 1 < count ? 'block' : 'none' }}>
                    <FormItem {...formItemLayout} >
                        {getFieldDecorator('name', {
                            rules: [{ required: true, message: '请输入渠道类型!' }],
                        })(
                            <Input type='text' placeholder="渠道类型" />
                            )}
                    </FormItem>
                </Col>


                <Col span={8} style={{ textAlign: 'right' }}>
                    <Button type="primary" htmlType="submit">搜索</Button>

                    <a style={{ fontSize: 12 }} onClick={this.toggle}>
                        更多 <Icon type='down' />
                    </a>
                </Col>

            </div>
        );
    }
}


class MilForm extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        const count = 10;
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: { span: 5 },
            wrapperCol: { span: 19 },
        };
        const children = [];
        return (
            <div>

                <Col span={4} key={0} style={{ display: 0 < count ? 'block' : 'none' }}>
                    <FormItem {...formItemLayout} >
                        {getFieldDecorator('name', {
                            rules: [{ required: true, message: '请输入客户名称!' }],
                        })(
                            <Input type='text' placeholder="客户名称" />
                            )}
                    </FormItem>
                </Col>
                <Col span={4} key={1} style={{ display: 1 < count ? 'block' : 'none' }}>
                    <FormItem {...formItemLayout} >
                        {getFieldDecorator('name', {
                            rules: [{ required: true, message: '请输入渠道类型!' }],
                        })(
                            <Input type='text' placeholder="渠道类型" />
                            )}
                    </FormItem>
                </Col>
                <Col span={4} key={2} style={{ display: 2 < count ? 'block' : 'none' }}>
                    <FormItem {...formItemLayout} >
                        {getFieldDecorator('name', {
                            rules: [{ required: true, message: '请输入客户等级!' }],
                        })(
                            <Input type='text' placeholder="客户等级" />
                            )}
                    </FormItem>
                </Col>
                <Col span={4} key={3} style={{ display: 3 < count ? 'block' : 'none' }}>
                    <FormItem {...formItemLayout} >
                        {getFieldDecorator('name', {
                            rules: [{ required: true, message: '请输入营销区域!' }],
                        })(
                            <Input type='text' placeholder="营销区域" />
                            )}
                    </FormItem>
                </Col>
                <Col span={4} key={4} style={{ display: 4 < count ? 'block' : 'none' }}>
                    <FormItem {...formItemLayout} >
                        {getFieldDecorator('name', {
                            rules: [{ required: true, message: '请输入上级客户!' }],
                        })(
                            <Input type='text' placeholder="上级客户" />
                            )}
                    </FormItem>
                </Col>
                <Col span={4} key={5} style={{ display: 5 < count ? 'block' : 'none' }}>
                    <FormItem {...formItemLayout} >
                        {getFieldDecorator('name', {
                            rules: [{ required: true, message: '请输入省/市/区/县!' }],
                        })(
                            <Input type='text' placeholder="省/市/区/县" />
                            )}
                    </FormItem>
                </Col>
                <Col span={4} key={6} style={{ display: 6 < count ? 'block' : 'none' }}>
                    <FormItem {...formItemLayout} >
                        {getFieldDecorator('name', {
                            rules: [{ required: true, message: '请输入行业!' }],
                        })(
                            <Input type='text' placeholder="行业" />
                            )}
                    </FormItem>
                </Col>
                <Col span={4} key={7} style={{ display: 7 < count ? 'block' : 'none' }}>
                    <FormItem {...formItemLayout} >
                        {getFieldDecorator('name', {
                            rules: [{ required: true, message: '请输入生命周期!' }],
                        })(
                            <Input type='text' placeholder="生命周期" />
                            )}
                    </FormItem>
                </Col>
                <Col span={4} key={8} style={{ display: 8 < count ? 'block' : 'none' }}>
                    <FormItem {...formItemLayout} >
                        {getFieldDecorator('name', {
                            rules: [{ required: true, message: '请输入启用状态!' }],
                        })(
                            <Input type='text' placeholder="启用状态" />
                            )}
                    </FormItem>
                </Col>

                <Col span={8} style={{ textAlign: 'right' }}>
                    <Button type="primary" htmlType="submit">搜索</Button>

                    <a style={{ fontSize: 12 }} onClick={this.toggle}>
                        收起 <Icon type='up' />
                    </a>
                </Col>

            </div>
        );
    }
}





class ToolForm extends React.Component {
    constructor(props) {
        super(props)
    }
    state = {
        expand: false,
    };

    handleSearch = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            console.log('Received values of form: ', values);
        });
    }

    handleReset = () => {
        this.props.form.resetFields();
    }

    toggle = () => {
        const { expand } = this.state;
        this.setState({ expand: !expand });
    }



    render() {
        const WarpSimForm = Form.create()(SimForm);
        const WarpMilForm = Form.create()(MilForm);

        return (
            <div>
                <Row>
                    <Col span={4}>
                        <Select style={{ width: 150 }} defaultValue="3" >
                            <Option value="0">全部</Option>
                            <Option value="1">我关注的</Option>
                            <Option value="2">最近新建</Option>
                            <Option value="3">最近查看</Option>
                        </Select>
                    </Col>
                    <Col span={14}>
                        <div style={{ display: this.props.visible.BtnPanel == true ? 'block' : 'none' }}>
                            <BtnPanel />
                        </div>
                        <div style={{ display: this.props.visible.simForm == true ? 'block' : 'none' }}>
                            <WarpSimForm />
                        </div>
                    </Col>
                    <Col span={6}>
                        <div className='list-add'>
                            <ButtonGroup className='list-add-group'>
                                <Button icon='download'>导入</Button>
                                <Button icon='upload'>导出</Button>
                            </ButtonGroup>
                            <Button type='primary' ><Icon type="plus" />新建</Button>
                        </div></Col>
                </Row>
                <Row style={{ marginLeft: 8, marginTop: 8, fontSize: 12, display: this.props.visible.milForm == true ? 'block' : 'none' }}>
                    <WarpMilForm />
                </Row>
            </div>
        );
    }
}

export default ToolForm;
