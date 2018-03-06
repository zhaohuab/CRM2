import {
    Row,
    Col,
    Input,
    Button,
    Icon,
} from "antd";

import './index.less'
export default class DropDownRef extends React.Component {
    onChange(e){
        let value = e.target.value;
        this.props.onChange(value)
    }
    
    render(){
        let width = this.props.width ? this.props.width : 300;
        let height = this.props.height ? this.props.height : 360;
        return(
            <div className="crm-drowdown-modal" style={{width:width+'px'}}>
                <Row
                    type="flex"
                    justify="space-between"
                    className="container-header"
                >
                    <Row type="flex" align='middle'>
                        <div className='title'>{this.props.title}</div>
                    </Row>
                    <Row type="flex" align='middle'>
                        <Input
                            placeholder={"请选择"+this.props.title}
                            value = {this.props.value}
                            onChange = {this.onChange.bind(this)}
                            addonAfter={<Icon type="search" onClick={this.props.onSearch.bind(this)}/>}
                        />
                     </Row>
                </Row>
                <Row className="container-body" type="flex" style={{height:height+'px'}}>
                    {this.props.children}
                </Row>
                <Row
                    type="flex"
                    justify="end"
                    align="middle"
                    className="container-footer"
                >
                    <div className='btn'>
                        <Button onClick={this.props.onCancel.bind(this)}>
                            取消
                        </Button>
                    </div>
                    <div className='btn'>
                        <Button type="primary" onClick={this.props.onOk.bind(this)}>
                            确定
                        </Button>
                    </div>
                </Row>
            </div>
        )
    }
}