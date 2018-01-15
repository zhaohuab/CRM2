import React, { Component, PropTypes } from "react";
import { Icon, Input, Row, Col } from "antd";
import './index.less'

export default class Tags extends React.Component {
    constructor(props) {
        super(props);
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

            let findResult = data.find(dataItem => item == dataItem);
            if (findResult) {
                result.push({ title: item, select: true });
            } else {
                result.push({ title: item, select: false });
            }
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
                                              ? "tag-choose"
                                              : "tag-notChoose"
                                      }
                                      onClick={this.onChoose.bind(
                                          this,
                                          index,
                                          item
                                      )}
                                  >
                                      <span>{item.title}</span>
                                      <i className="iconfont icon-xuanzhong" />
                                  </p>
                              );
                          })
                        : ""}
                </div>
            </div>
        );
    }
}
//tag-choose  tag-notChoose
