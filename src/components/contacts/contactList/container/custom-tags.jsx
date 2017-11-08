import React, { Component, PropTypes } from "react";
import { Icon, Input, Row, Col } from "antd";
import Immutable from "immutable";

export default class CustomTags extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            data: [],
            inputHide: false
        };
    }

    //选中一个标签
    onSelect(select, index) {
        select = !select;
        let data = Immutable.fromJS(this.state.data).toJS();

        for (var i = 0; i < data.length; i++) {
            if (index === i) {
                data[i].select = select;
                break;
            }
        }

        this.setState({
            data
        });
    }

    //转换成可用数据
    result() {
        let result = [];
        this.state.data.forEach(item => {
            if (item.select) {
                result.push(item.title);
            }
        });
        return result.join(",");
    }

    //删除一个标签
    unSelect(index, e) {
        e.stopPropagation();
        let data = Immutable.fromJS(this.state.data).toJS();
        data.splice(index, 1);

        this.setState({
            data
        });
    }

    //显示input框，显示时自动获取焦点
    inputShow() {
        this.setState(
            {
                inputHide: true
            },
            () => {
                this.refs.textInput.focus();
            }
        );
    }

    //失去焦点，获取内容，生成新标签
    onBlurFn(e) {
        let inputValue = e.target.value;
        if (!inputValue) {
            this.setState({
                inputHide: false
            });
            return;
        }
        e.target.value = "";
        let data = Immutable.fromJS(this.state.data).toJS();
        data.push({ title: inputValue, select: false, disable: "able" });

        this.setState({
            inputHide: false,
            data
        });
    }
    change(data, flag) {
        // if (data) {
        //     data = data.split(/;|,/g);
        //     let newData = [];
        //     if (!flag) {
        //         data.forEach(item => {
        //             newData.push({
        //                 title: item,
        //                 select: false,
        //                 disable: "disabled "
        //             });
        //         });
        //     }

        this.setState({
            data: this.props.dataSource
        });
        //}
    }

    componentDidMount() {
        this.change(this.props.dataSource, this.props.flag);
    }

    render() {
        return (
            <div className="contact-tag-group">
                {this.state.data && this.state.data.length
                    ? this.state.data.map((item, index) => {
                          return (
                              <p
                                  className={
                                      item.select
                                          ? "custom-choose"
                                          : "custom-notChoose"
                                  }
                                  onClick={this.onSelect.bind(
                                      this,
                                      item.select,
                                      index
                                  )}
                              >
                                  <span>{item.title}</span>
                                  {item.disable == "disabled" ? (
                                      ""
                                  ) : (
                                      <i
                                          className="iconfont icon-guanbi-xiao"
                                          onClick={this.unSelect.bind(
                                              this,
                                              index
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
        );
    }
}
