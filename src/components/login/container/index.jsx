import { Form, Icon, Input, Button, Checkbox,message } from 'antd';
import  * as Actions  from '../action'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { browserHistory } from 'react-router'
import "./index.less"

const FormItem = Form.Item;

class LoginForm extends React.Component {
    constructor(props){
        super(props);
    }

    componentDidMount() {
    }

    handleSubmit = (e) => {
        let {getFieldsValue} = this.props.form;
        this.props.login(getFieldsValue());
    }
    
    render() {

        const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form;
        // Only show error after a field is touched.
        const userError = isFieldTouched('user') && getFieldError('user');
        const passwordError = isFieldTouched('password') && getFieldError('password');
        return (
            <div className="login-form">
                <p className='login-form-title'>登录</p>
                <Form onSubmit={this.handleSubmit} width={300}>
                    <FormItem
                        validateStatus={userError ? 'error' : ''}
                        help={userError || ''}
                    >
                        {getFieldDecorator('user', {
                            rules: [{ required: true, message: '不能为空!' }],
                        })(
                            <Input placeholder="用户名..." />
                        )}
                    </FormItem>
                    <FormItem
                        validateStatus={passwordError ? 'error' : ''}
                        help={passwordError || ''}
                    >
                        {getFieldDecorator('password', {
                            rules: [{ required: true, message: '不能为空!' }],
                        })(
                            <Input type="password" placeholder="密码..." />
                        )}
                    </FormItem>
                    <FormItem>
                        {getFieldDecorator('remember', {
                            valuePropName: 'checked',
                            initialValue: true,
                        })(
                            <Checkbox >
                                记住状态
                            </Checkbox>
                        )}
                        <a style={{ float: "right" }} href="">忘记密码</a>
                        <Button
                            type="primary"
                            htmlType="submit"
                            disabled={hasErrors(getFieldsError())}
                            style={{ width: "100%" }}
                        >
                            登录
                        </Button>
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
    
    render() {
        return (
            <div className="login-box" >
                <header className="login-box-header">
                    <section className='header-login'>
                        <div className='header-login-logo'>
                            <img src={require('assets/images/login/login_logo.png')} />
                            <h3>用友云</h3>
                        </div>
                        
                    </section>
                </header>
                <main className='login-box-mian'>
                    <div className='login-box-mian-inner'>
                        <div className='mian-inner-left'>
                            <img src={require('assets/images/login/login_pic_left.png')} />
                        </div>
                        <div className='mian-inner-right'>
                            <Login login = {this.props.action.login} />
                        </div>
                    </div>
                </main>
                <footer className='login-box-end'>
                    版权归用友股份有限公司所有
                </footer>
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
