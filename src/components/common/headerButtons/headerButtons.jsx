import React, { Component, PropTypes } from "react";
import {
    Icon,
    Button,
    Dropdown,
    Menu,
    Collapse,
    Input,
    Row,
    Col,
    Table
} from "antd";
import "./index.less";

export default class HeaderButton extends React.Component {
    back() {
        this.props.goBack();
    }
    render() {
        return (
            <Row type='flex' justify='space-between' align='middle' className='crm-header-button-container'>
                <Col span={22}>
                    <Row  type='flex' align='middle'>
                       <div className='num'>已选择 <span className='import'> {this.props.length}</span>条</div>
                        <Col span={21}>
                            <Row type='flex' align='middle' gutter={15}>
                                <Button onClick={this.back.bind(this)}>
                                    <i className="iconfont icon-fanhui" />返回
                                </Button>
                                {this.props.children}
                            </Row>
                        </Col>
                    </Row>
                </Col>
                <Col span={2}>
                    <Row type='flex' justify='end' align='middle'>
                        <i
                            className="iconfont icon-guanbi-xiao"
                            onClick={this.back.bind(this)}
                        />
                    </Row>
                </Col>
            </Row>
        );
    }
}
