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
    }
    
    render() {

        const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form;
        // Only show error after a field is touched.
        const userError = isFieldTouched('user') && getFieldError('user');
        const passwordError = isFieldTouched('password') && getFieldError('password');
        return (
            <div className="login-form">
                
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
               <div className="login-tit">Cloud CRM</div>
               <Login login = {this.props.action.login} />
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
