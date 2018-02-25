import React from 'react'
import { Form, Icon, Input, Button, Checkbox, message, Carousel, Spin } from "antd";
import * as Actions from "../action";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { browserHistory } from "react-router";
import cookie from "utils/cookie";
import "./index.less";

const FormItem = Form.Item;

class LoginForm extends React.Component {
    constructor(props) {
        super(props);
    }

    handleSubmit = e => {
        e.preventDefault();

        let { getFieldsValue } = this.props.form;
        this.props.login(getFieldsValue());
    };

    render() {
        const {
            getFieldDecorator,
            getFieldsError,
            getFieldError,
            isFieldTouched
        } = this.props.form;
        const userError = isFieldTouched("user") && getFieldError("user");
        const passwordError =
            isFieldTouched("password") && getFieldError("password");
        const loginError = this.props.loginError;

        return (
            <div className="login-form-warpper">
                <div className="login-shadow" />
                <div className="login-form">
                <Spin className="loading-spin" spinning={this.props.loading}>
                        <p className="login-form-title">欢迎登录</p>
                        <div className="login-form-error">{loginError}</div>

                        <Form onSubmit={this.handleSubmit} width={300}>
                            <FormItem
                                validateStatus={userError ? "error" : ""}
                                help={userError || ""}
                            >
                                {getFieldDecorator("user", {
                                    rules: []
                                })(
                                    <Input
                                        placeholder="用户名"
                                        prefix={<Icon type="user" />}
                                        className="login-imnput"
                                    />
                                    )}
                            </FormItem>
                          
                            <FormItem
                                validateStatus={passwordError ? "error" : ""}
                                help={passwordError || ""}
                            >
                                {getFieldDecorator("password", {
                                    rules: []
                                })(
                                    <Input
                                        type="password"
                                        placeholder="登录密码"
                                        prefix={<Icon type="lock" />}
                                        className="login-imnput"
                                    />
                                    )}
                            </FormItem>
                            <FormItem>
                                <Button
                                    type="primary"
                                    htmlType="submit"
                                    disabled={hasErrors(getFieldsError())}
                                    style={{ width: "100%" }}
                                    className="login-btn"
                                >
                                    登录
                            </Button>
                                <div className="form-footer">
                                    <span className="fast-experience">快速体验</span>
                                    <a className="forget-pass" href="">
                                        忘记密码?
                                </a>
                                </div>
                            </FormItem>
                        </Form>
                        </Spin>
                </div>
            </div>
        );
    }
}

function hasErrors(fieldsError) {
    return Object.keys(fieldsError).some(field => {
        return fieldsError[field];
    });
}

const Login = Form.create()(LoginForm);

class LoginCon extends React.Component {
    constructor(props) {
        super(props);
    }
    afterFn(from, to) {
        console.log(from, to);
    }

    componentDidMount() { }
    render() {

        let { $$state } = this.props;
        let logined = $$state.get("logined");

        if (this.props.params.loginmsg == "sessionover") {
            this.props.action.loginSessionOver();
            browserHistory.push("/crm_web/login");
        } else {
            if (logined) {
                browserHistory.push("/crm_web/home");
            }
        }

        let heightPx = document.documentElement.clientHeight;
        let errorMessage = $$state.get("errorMessage");

        let width =
            document.documentElement.clientWidth || document.body.clientWidth;
        let height =
            document.documentElement.clientHeight || document.body.clientHeight;
        const loading = this.props.$$state.get("loading");
        return (
            <div className="login-warpper">
                <div className="login-carousel">
                    <Carousel
                        autoplay
                        fade={true}
                        speed="4000"
                        autoplaySpeed="6000"
                        dots={true}
                    >
                        <div
                            ref="loginBg1"
                            style={{
                                width: width + "px",
                                height:
                                height >= 658 ? height + "px" : 658 + "px"
                            }}
                        >
                            <img
                                style={{
                                    width:
                                    width >= 1240
                                        ? width + "px"
                                        : 1240 + "px",
                                    height:
                                    height >= 658 && width >= 1240
                                        ? height + "px"
                                        : 780 + "px"
                                }}
                                ref="loginImg"
                                className="login-img"
                                src={require("assets/images/login/banner1.jpg")}
                            />
                            <img
                                style={{
                                    position: "absolute",
                                    top: 110,
                                    left: 90,
                                    width: 485,
                                    height: 198,
                                }}
                                ref="loginImg"

                                src={require("assets/images/login/banner-text1.png")}
                            />
                        </div>
                        <div
                            ref="loginBg1"
                            style={{
                                width:
                                width >= 1240 ? width + "px" : 1240 + "px",
                                height:
                                height >= 658 && width >= 1240
                                    ? height + "px"
                                    : 780 + "px"
                            }}
                        >
                            <img
                                style={{
                                    width:
                                    width >= 1240
                                        ? width + "px"
                                        : 1240 + "px",
                                    height:
                                    height >= 658 && width >= 1240
                                        ? height + "px"
                                        : 780 + "px"
                                }}
                                ref="loginImg"
                                className="login-img"
                                src={require("assets/images/login/banner2.jpg")}
                            />
                            <img
                                style={{
                                    position: "absolute",
                                    top: 20,
                                    left: 20,
                                    width: 685,
                                    height: 281,
                                }}
                                ref="loginImg"

                                src={require("assets/images/login/banner-text2.png")}
                            />
                        </div>
                        <div
                            ref="loginBg1"
                            style={{
                                width: width + "px",
                                height:
                                height >= 658 ? height + "px" : 658 + "px"
                            }}
                        >
                            <img
                                style={{
                                    width:
                                    width >= 1240
                                        ? width + "px"
                                        : 1240 + "px",
                                    height: height >= 658 ? "auto" : 658 + "px"
                                }}
                                ref="loginImg"
                                className="login-img"
                                src={require("assets/images/login/banner3.jpg")}
                            />
                            <img
                                style={{
                                    position: "absolute",
                                    top: 20,
                                    left: 20,
                                    width: 685,
                                    height: 281,
                                }}
                                ref="loginImg"

                                src={require("assets/images/login/banner-text3.png")}
                            />
                        </div>
                    </Carousel>
                </div>
                <div className="login-main">
                    <div className="login-main-inner">
                        <div className="login-main-top">
                            <div className="login-main-title">
                                <img
                                    src={require("assets/images/login/crm-logo.png")}
                                />
                                <p>
                                    <span>—</span>
                                    <span>企业营销工作平台</span>
                                    <span>—</span>
                                </p>
                            </div>
                            <Login
                                loginError={errorMessage}
                                login={this.props.action.login}
                                loading={loading}
                            />
                        </div>
                        <div className="login-main-footer">
                            <p>版权归用友股份有限公司所有</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default connect(
    state => {
        return {
            $$state: state.login
        };
    },
    dispatch => {
        return {
            action: bindActionCreators(Actions, dispatch)
        };
    }
)(LoginCon);
