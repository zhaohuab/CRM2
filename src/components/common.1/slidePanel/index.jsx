import React, { Component, PropTypes } from "react";
import { Icon } from "antd";
import "./index.less";

export default class SlidePanel extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            height: ""
        };
        this.flag = false;
    }

    onClose() {
        this.props.onClose();
    }

    componentDidMount() {
        let slideHeight =
            document.documentElement.clientHeight || document.body.clientHeight;
        this.setState({
            height: slideHeight - 10 - 70 - 10
        });

        window.addEventListener("resize", () => {
            let slideHeight =
                document.documentElement.clientHeight ||
                document.body.clientHeight;
            this.setState({
                height: slideHeight - 10 - 70 - 10
            });
        });
    }

    render() {
        if (this.props.viewState) {
            this.flag = true;
        }
        return (
            <div>
                {this.flag ? (
                    <div
                        className={
                            this.props.viewState
                                ? "slider-warpper slider-warpper-show"
                                : "slider-hide slider-warpper-hide"
                        }
                        style={{ height: this.state.height + "px" }}
                    >
                        <span
                            onClick={this.onClose.bind(this)}
                            className="slider-back crm-pointer"
                        >
                            <Icon type="close" />
                        </span>
                        {this.props.children}
                    </div>
                ) : (
                    ""
                )}
            </div>
        );
    }
}

SlidePanel.defaultProps = {
    viewState: false,
    onClose: () => {}
};

SlidePanel.PropTypes = {
    viewState: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired
};
