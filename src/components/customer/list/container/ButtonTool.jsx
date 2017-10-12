import {Modal, Cascader, Select, Form, Row, Col, Input, Button, Icon } from 'antd';

import Enum from 'utils/components/enum'
const FormItem = Form.Item;
const Option = Select.Option;
const ButtonGroup = Button.Group;
const confirm = Modal.confirm;



class BtnPanel extends React.Component {
    constructor(props) {
        super(props)
    }
    btnBack() {
        this.props.btnBack();
    }

    btnDelete(){
        let that =this
        confirm({
            title: '确定要删除吗?',
            content: '此操作不可逆',
            okText: '是',
            okType: 'danger',
            cancelText: '否',
            onOk() {
                that.props.btnDelete();
            },
            onCancel() {
            console.log('Cancel');
            },
        });
    }
    
    render() {

        return (
            <div>
                <Button className='returnbtn-class' icon='swap-left' onClick={this.btnBack.bind(this)}>返回</Button>
                <Button className='returnbtn-class' icon='delete' onClick={this.btnDelete.bind(this)}>删除</Button>
               
                <ButtonGroup className='returnbtn-class'>
                    <Button icon='play-circle-o' onClick={this.props.btnSetEnable.bind(this, 1)}>启用</Button>
                    <Button icon='pause-circle-o' onClick={this.props.btnSetEnable.bind(this, 2)}>停用</Button>
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
    handleSearch(e) {
        e.preventDefault();
        this.props.handleSearch(this.props.form.getFieldsValue())
    }
    componentDidMount() {
        this.props.form.setFieldsValue(this.props.searchMap);
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: { span: 2 },
            wrapperCol: { span: 22 },
        };
        const children = [];
        return (
            <div>
                <Form layout="inline" onSubmit={this.handleSearch.bind(this)} className="login-form">

                    <FormItem style={{ width: 200 }}  {...formItemLayout} >
                        {getFieldDecorator('name', {
                            rules: [{ required: true, message: '请输入客户名称!' }],
                        })(
                            <Input type='text' placeholder="客户名称" />
                            )}
                    </FormItem>

                    <FormItem style={{ width: 200 }}  {...formItemLayout} >
                        {getFieldDecorator('level', {
                            rules: [{ required: true, message: '请输入客户等级!' }],
                        })(
                            <Enum
                                initValue={this.props.searchMap.level}
                                addOptionAll={'客户等级'}
                                dataSource={this.props.enumData.levelEnum}
                            />
                            )}
                    </FormItem>

                    <FormItem style={{ width: 200 }}  {...formItemLayout} >
                        {getFieldDecorator('saleArea', {
                            rules: [{ required: true, message: '请输入营销区域!' }],
                        })(
                            <Enum
                                initValue={this.props.searchMap.saleArea}
                                addOptionAll={'营销区域'}
                                dataSource={this.props.enumData.saleAreaEnum}
                            />
                            )}
                    </FormItem>

                    <Button type="primary" htmlType="submit" >搜索</Button>

                    <a style={{ fontSize: 12 }} onClick={this.props.btnMore.bind(this, { simForm: false, milForm: true })}>
                        更多 <Icon type='down' />
                    </a>

                </Form>
            </div>
        );
    }
}


class MilForm extends React.Component {
    constructor(props) {
        super(props)
    }
    componentDidMount() {
        this.props.form.setFieldsValue(this.props.searchMap);
    }

    handleSearch(e) {
        e.preventDefault();
        this.props.handleSearch(this.props.form.getFieldsValue())
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: { span: 2 },
            wrapperCol: { span: 22 },
        };
        const children = [];
        return (
            <div>
                <Form layout="inline" onSubmit={this.handleSearch.bind(this)} >

                    <FormItem style={{ width: 200 }} {...formItemLayout} >
                        {getFieldDecorator('name', {
                            rules: [{ required: true, message: '请输入客户名称!' }],
                        })(
                            <Input type='text' placeholder="客户名称" />
                            )}
                    </FormItem>
                    <FormItem style={{ width: 200 }} {...formItemLayout} >
                        {getFieldDecorator('level', {
                            rules: [{ required: true, message: '请输入客户等级!' }],
                        })(
                            <Enum
                                initValue={this.props.searchMap.level}
                                addOptionAll={'客户等级'}
                                dataSource={this.props.enumData.levelEnum}
                            />
                            )}
                    </FormItem>
                    <FormItem style={{ width: 200 }} {...formItemLayout} >
                        {getFieldDecorator('saleArea', {
                            rules: [{ required: true, message: '请输入营销区域!' }],
                        })(
                            <Enum
                                initValue={this.props.searchMap.saleArea}
                                addOptionAll={'营销区域'}
                                dataSource={this.props.enumData.saleAreaEnum}
                            />
                            )}
                    </FormItem>
                    <FormItem style={{ width: 200 }} {...formItemLayout} >
                        {getFieldDecorator('province_city_district', {
                            rules: [{ required: true, message: '请输入省/市/区/县!' }],
                        })(
                            <Cascader options={this.props.cityData} placeholder="省/市/区/县" />

                            )}
                    </FormItem>
                    <FormItem style={{ width: 200 }} {...formItemLayout} >
                        {getFieldDecorator('parentId', {
                            rules: [{ required: true, message: '请输入上级客户!' }],
                        })(
                            <Input type='text' placeholder="上级客户" />
                            )}
                    </FormItem>
                    <FormItem style={{ width: 200 }} {...formItemLayout} >
                        {getFieldDecorator('industry', {
                            rules: [{ required: true, message: '请输入行业!' }],
                        })(
                            <Enum
                                initValue={this.props.searchMap.industry}
                                addOptionAll={'行业'} 
                                dataSource={this.props.enumData.industryEnum}
                            />
                            )}
                    </FormItem>
                    <FormItem style={{ width: 200 }} {...formItemLayout} >
                        {getFieldDecorator('cannelType', {
                            rules: [{ required: true, message: '请输入渠道类型!' }],
                        })(
                            <Enum
                                initValue={this.props.searchMap.cannelType}
                                addOptionAll={'渠道类型'}
                                dataSource={this.props.enumData.cannelTypeEnum}
                            />
                            )}
                    </FormItem>
                    <FormItem style={{ width: 200 }} {...formItemLayout} >
                        {getFieldDecorator('lifecycle', {
                            rules: [{ required: true, message: '请输入生命周期!' }],
                        })(
                            <Enum
                                initValue={this.props.searchMap.lifecycle}
                                addOptionAll={'生命周期'}
                                dataSource={this.props.enumData.lifecycleEnum}
                            />
                            )}
                    </FormItem>
                    <FormItem style={{ width: 200 }} {...formItemLayout} >
                        {getFieldDecorator('enableState', {
                            rules: [{ required: true, message: '请输入启用状态!' }],
                        })(
                            <Enum
                                initValue={this.props.searchMap.enableState}
                                addOptionAll={'启用状态'}
                                dataSource={this.props.enumData.enableStateEnum}
                            />
                            )}
                    </FormItem>

                    <Button type="primary" htmlType="submit">搜索</Button>

                    <a style={{ fontSize: 12 }} onClick={this.props.btnLess.bind(this, { simForm: true, milForm: false })}>
                        收起 <Icon type='up' />
                    </a>
                </Form>
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
                    <Col span={15}>
                        <div style={{ display: this.props.visible.btnPanel == true ? 'block' : 'none' }}>
                            <BtnPanel
                                btnBack={this.props.btnBack}
                                btnSetEnable={this.props.btnSetEnable}
                                btnDelete={this.props.btnDelete}
                            />
                        </div>
                        <div style={{ display: this.props.visible.simForm == true ? 'block' : 'none' }}>
                            <WarpSimForm
                                enumData={this.props.enumData}
                                handleSearch={this.props.handleSearch}
                                btnMore={this.props.btnMore}
                                searchMap={this.props.searchMap}
                            />
                        </div>
                    </Col>
                    <Col span={5}>
                        <div className='list-add'>
                            <ButtonGroup className='list-add-group'>
                                <Button icon='download'>导入</Button>
                                <Button icon='upload'>导出</Button>
                            </ButtonGroup>
                            <Button type='primary' onClick={this.props.btnNew}><Icon type="plus" />新建</Button>
                        </div></Col>
                </Row>
                <Row style={{ marginLeft: 8, marginTop: 8, fontSize: 12, display: this.props.visible.milForm == true ? 'block' : 'none' }}>
                    <WarpMilForm
                        enumData={this.props.enumData}
                        cityData={this.props.cityData}
                        handleSearch={this.props.handleSearch}
                        btnLess={this.props.btnLess}
                        searchMap={this.props.searchMap}
                    />
                </Row>
            </div>
        );
    }
}

export default ToolForm;
