import { Form, Icon, Input, Button, Checkbox,message,Carousel } from 'antd';
import  * as Actions  from '../action'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { browserHistory } from 'react-router'
import cookie from 'utils/cookie'
import "./index.less"

const FormItem = Form.Item;

class LoginForm extends React.Component {
    constructor(props){
        super(props);
    }

    handleSubmit = (e) => {
        e.preventDefault();

        let {getFieldsValue} = this.props.form;
        this.props.login(getFieldsValue());
    }
    
    render() {
        const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form;
        const userError = isFieldTouched('user') && getFieldError('user');
        const passwordError = isFieldTouched('password') && getFieldError('password');
        const loginError = this.props.loginError
        
        return (
            <div className='login-form-warpper'>
                <div className='login-shadow'></div>
                <div className="login-form">
                    <p className='login-form-title'>欢迎登录</p>
                    <div className='login-form-error'>loginError</div>
                    <Form onSubmit={this.handleSubmit} width={300}>
                        <FormItem
                            validateStatus={userError ? 'error' : ''}
                            help={userError || ''}
                        >
                            {getFieldDecorator('user', {
                                rules: [],
                            })(
                                <Input placeholder="用户名" prefix={<Icon type="user" />} className='login-imnput'/>
                            )}
                        </FormItem>
                        <FormItem
                            validateStatus={passwordError ? 'error' : ''}
                            help={passwordError || ''}
                        >
                            {getFieldDecorator('password', {
                                rules: [],
                            })(
                                <Input type="password" placeholder="登录密码" prefix={<Icon type="lock" />} className='login-imnput'/>
                            )}
                        </FormItem>
                        <FormItem>
                            <Button
                                type="primary"
                                htmlType="submit"
                                disabled={hasErrors(getFieldsError())}
                                style={{ width: "100%" }}
                                className='login-btn'
                            >
                                登录
                            </Button>
                            <div className='form-footer'>
                                <span className='fast-experience'>快速体验</span>
                                <a className='forget-pass' href="">忘记密码?</a>
                            </div>
                        </FormItem>
                    </Form>
                </div>
            </div>
        );
    }
}

function hasErrors(fieldsError) {
    return Object.keys(fieldsError).some(field => {
        return fieldsError[field]
    });
}

const Login = Form.create()(LoginForm);

class LoginCon extends React.Component {
    constructor(props){
        super(props);
    }

    render() {
        let {$$state} = this.props;
        let logined = $$state.get('logined');
        if(this.props.params.loginmsg=="sessionover"){
            browserHistory.push('/crm_web/login');
        }else{
            if(logined) {
                browserHistory.push('/crm_web/home');
            }
        }
      
        let heightPx= document.documentElement.clientHeight
        let errorMessage = $$state.get('errorMessage');
        return (
            <div className='login-warpper'>
                <div className='login-carousel'>
                    <Carousel autoplay   effect='fade' speed='3000'>
                        <div><img src={require('assets/images/login/banner1.jpg')}/></div>
                        <div><img src={require('assets/images/login/banner2.jpg')}/></div>
                        <div><img src={require('assets/images/login/banner3.jpg')}/></div>
                    </Carousel>
                </div>
                <div className='login-main'>
                    <div className='login-main-inner'>
                        <div className='login-main-top'>
                            <div className='login-main-title'>
                                <img src={require('assets/images/login/crm-logo.png')}/>
                                <p><span>—</span><span>企业营销工作平台</span><span>—</span></p>
                            </div>
                            <Login loginError = {errorMessage} login = {this.props.action.login} />
                        </div>
                        <div className='login-main-footer'>
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
            $$state : state.login
        }
    },
    dispatch => {
        return  {
            action : bindActionCreators(Actions,dispatch),
        }
    }
)(LoginCon);
