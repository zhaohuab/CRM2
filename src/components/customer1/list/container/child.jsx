import { Row, Col } from "antd";

export default class Child extends React.Component {
  
    render() {
        let Content = this.props.content;
        let { span, name, required, message, dataIndex } = this.props;
        return (
            <Col span={span}>
                <Row type="flex" align="middle">
                    <Col span={6}>
                        <Row
                            type="flex"
                            justify="end"
                        >
                            <div>{name}：</div>
                        </Row>
                    </Col>
                    <Col span={16}>
                        <FormItem
                            {...formItemLayout}
                        >
                            {getFieldDecorator("dataIndex",{
                                rules:[
                                    {
                                        required:required,
                                        message:message
                                    }
                                    ]
                                })(
                                <Content />
                            )}
                        </FormItem>
                    </Col>
                </Row>
            </Col> 
        );
    }
}