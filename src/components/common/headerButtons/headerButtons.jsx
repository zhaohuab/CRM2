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
            <div className="crm-header-buttons">
                <div className="crm-header-buttons-inner">
                    <div className="crm-buttons-inner-left">
                        <span className="crm-inner-left-choice">
                            已选择
                            <span className="crm-import-choice">
                                {this.props.length}
                            </span>
                            条
                        </span>
                        <div className="crm-buttons-inner-btns">
                            <Button onClick={this.back.bind(this)}>
                                <i className="iconfont icon-fanhui" />返回
                            </Button>
                            {this.props.children}
                        </div>
                    </div>
                    <i
                        className="iconfont icon-guanbi-xiao"
                        onClick={this.back.bind(this)}
                    />
                </div>
            </div>
        );
    }
}
