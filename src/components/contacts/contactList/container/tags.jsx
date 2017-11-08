import React, { Component, PropTypes } from "react";
export default class Tags extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            changeData: []
        };
    }
    choose(index, select) {
        select = !select;
        let data = this.state.data.map((item, key) => {
            if (index == key) {
                item.select = select;
                return item;
            } else {
                return item;
            }
        });
        this.setState({
            data
        });

        const onChange = this.props.onChange;

        if (onChange) {
            onChange(this.result());
        }
    }

    result() {
        let result = [];
        this.state.data.forEach(item => {
            if (item.select) {
                result.push(item.title);
            }
        });
        return result.join(",");
    }

    componentDidMount() {
        // let newData = this.props.dataSource.split(/;|,/g);
        // let data = [];
        // newData.forEach(item => {
        //     data.push({ title: item, select: false });
        // });

        this.setState({
            data: this.props.dataSource
        });
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
                                          ? "tag-choose"
                                          : "tag-notChoose"
                                  }
                                  onClick={this.choose.bind(
                                      this,
                                      index,
                                      item.select
                                  )}
                              >
                                  <span>{item.title}</span>
                                  <i className="iconfont icon-xuanzhong" />
                              </p>
                          );
                      })
                    : ""}
            </div>
        );
    }
}
//tag-choose  tag-notChoose
