import { Input, Row, Col } from "antd";
import IcbcInfo from "./IcbcInfo";

import "assets/stylesheet/all/iconfont.css";

export default class CustomerName extends React.Component {
    onChange = (e) => {
        let value = e.target.value;
        const onChange = this.props.onChange;
        if (onChange) {
            onChange({ key: value, title: 'name' });
        }
    };
    render() {
        let attr = this.props.attr;
        let value = this.props.value;
        return (
            <div>
                <Row type = 'flex' gutter = { 10 } >
                    <Col span = { 16 }>
                        <Input onChange = { this.onChange.bind(this) }
                        />
                    </Col>
                    <Col span = { 8 }>
                        <IcbcInfo attr = { attr }/>               
                    </Col>
                </Row>
            </div>
        );
    }
}
