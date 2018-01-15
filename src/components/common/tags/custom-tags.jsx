import React, { Component, PropTypes } from "react";
import { Icon, Input, Row, Col } from "antd";

import './index.less'

export default class CustomTags extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            inputHide: false
        };
    }

    //显示input框，显示时自动获取焦点
    inputShow() {
        this.setState({ inputHide: true }, () => {
            this.refs.textInput.focus();
        });
    }

    //失去焦点，获取内容，生成新标签，自动选中
    onBlurFn(e) {
        let inputValue = e.target.value;
        if (!inputValue) {
            this.setState({
                inputHide: false
            });
            return;
        }
        //将数据清空
        e.target.value = "";
        // let value = this.toArray(this.props.value) || [];
        //value.push({ title: inputValue, select: true, disable: "able" });

        this.setState({
            inputHide: false
        });

        let onChange = this.props.onChange;
        let value = this.toArray(this.props.value) || [];

        if (onChange) {
            //选中
            value.push(inputValue);
            onChange(this.toString(value));
        }
    }

    onDelete(index, item) {
        let onChange = this.props.onChange;
        let value = this.toArray(this.props.value) || [];

        if (onChange) {
            //取消选中
            value = value.filter(dataItem => item.title != dataItem);
            onChange(this.toString(value));
        }
    }

    toArray(value) {
        if (value) {
            return value.split(",");
        }
    }
    toString(value) {
        if (value) {
            return value.join(",");
        }
    }
    onChoose(index, item) {
        let onChange = this.props.onChange;
        let value = this.toArray(this.props.value) || [];

        if (onChange) {
            //选中 和 反选两种形态
            if (item.select) {
                //取消选中
                value = value.filter(dataItem => item.title != dataItem);
                onChange(this.toString(value));
            } else {
                //选中
                value.push(item.title);
                onChange(this.toString(value));
            }
        }
    }

    combine(dataSource, data) {
        /*
        测试数据
        */

        //data = ["决策人"];
        //dataSource = ["决策人","商务决策人","技术决策人","财务决策人","项目决策人","审批者","评估者","影响人","使用人","普通人"]
        //
        let result = [];

        if (!data) {
            for (let i = 0, len = dataSource.length; i < len; i++) {
                let item = dataSource[i];
                result.push({ title: item, select: false });
            }
            return result;
        }

        for (let i = 0, len = dataSource.length; i < len; i++) {
            let item = dataSource[i];

            let index = data.findIndex(dataItem => item == dataItem);
            if (index != -1) {
                data.splice(index, 1);
                result.push({ title: item, select: true, disable: true });
            } else {
                result.push({ title: item, select: false, disable: true });
            }
        }
        for (let i = 0, len = data.length; i < len; i++) {
            result.push({ title: data[i], select: true, disable: false });
        }
        return result;
    }

    render() {
        let { dataSource, value } = this.props;
        let result = this.combine(dataSource, this.toArray(value));
        return (
            <div className="tag-ref-warrper">
                <div className="tag-ref-group">
                    {result && result.length
                        ? result.map((item, index) => {
                              return (
                                  <p
                                      className={
                                          item.select
                                              ? "custom-choose"
                                              : "custom-notChoose"
                                      }
                                      onClick={this.onChoose.bind(
                                          this,
                                          index,
                                          item
                                      )}
                                  >
                                      <span>{item.title}</span>
                                      {item.disable ? (
                                          ""
                                      ) : (
                                          <i
                                              className="iconfont icon-guanbi-xiao"
                                              onClick={this.onDelete.bind(
                                                  this,
                                                  index,
                                                  item
                                              )}
                                          />
                                      )}
                                      <i className="iconfont icon-xuanzhong" />
                                  </p>
                              );
                          })
                        : ""}

                    <div
                        className="custom-input"
                        onClick={this.inputShow.bind(this)}
                    >
                        <div
                            style={{
                                display: this.state.inputHide ? "none" : "block"
                            }}
                        >
                            <i className="iconfont icon-bianji" />
                            <span>自定义</span>
                        </div>

                        <Input
                            type="text"
                            style={{
                                display: this.state.inputHide ? "block" : "none"
                            }}
                            ref="textInput"
                            onBlur={this.onBlurFn.bind(this)}
                        />
                    </div>
                </div>
            </div>
        );
    }
}
