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

    componentDidMount() {
    }

    handleSubmit = (e) => {
        e.preventDefault();

        let {getFieldsValue} = this.props.form;
        this.props.login(getFieldsValue());
    }
    
    render() {

        const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form;
        // Only show error after a field is touched.
        const userError = isFieldTouched('user') && getFieldError('user');
        const passwordError = isFieldTouched('password') && getFieldError('password');
        const loginError = this.props.loginError
        return (
            <div className="login-form">
                <p className='login-form-title'>欢迎登录</p>
                <div className='login-form-error'>{loginError}</div>
                <Form onSubmit={this.handleSubmit} width={300}>
                    <FormItem
                        validateStatus={userError ? 'error' : ''}
                        help={userError || ''}
                    >
                        {getFieldDecorator('user', {
                            rules: [{ required: true, message: '不能为空!' }],
                        })(
                            <Input placeholder="用户名" prefix={<Icon type="user" />} className='login-imnput'/>
                        )}
                    </FormItem>
                    <FormItem
                        validateStatus={passwordError ? 'error' : ''}
                        help={passwordError || ''}
                    >
                        {getFieldDecorator('password', {
                            rules: [{ required: true, message: '不能为空!' }],
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
                            {getFieldDecorator('remember', {
                                valuePropName: 'checked',
                                initialValue: true,
                            })(
                                <Checkbox >
                                    记住状态
                                </Checkbox>
                            )}
                            <a style={{ float: "right" }} href="">忘记密码</a>
                        </div>
                    </FormItem>
                </Form>
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

    componentDidMount() {

    }
    componentWillMount(){
        if(this.props.params.loginmsg&&this.props.params.loginmsg=="sessionover"){
            this.props.action.setLogout();
        } 
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
