import { Button, Checkbox, Form, Input } from 'antd';
import AuthSwitcher from '../auth-switcher/auth-switcher';
import './login.less';
import { Link } from 'react-router-dom';
import { Paths } from '@router/paths';
import { GooglePlusOutlined } from '@ant-design/icons';

const Login: React.FC = () => {
    const onFinish = (values: any) => {
        console.log('Received values of form: ', values);
    };

    return (
        <div className='login-container'>
            <div className='auth-logo' />
            <AuthSwitcher activeLink='login' />
            <Form
                name='normal_login'
                className='login-form'
                initialValues={{ remember: true }}
                onFinish={onFinish}
                autoComplete='off'
            >
                <Form.Item
                    name='email'
                    rules={[{ required: true, message: '' }]}
                    className='auth-input-wrapper'
                >
                    <Input prefix={'e-mail:'} className='auth-input' />
                </Form.Item>
                <Form.Item
                    name='password'
                    rules={[{ required: true, message: '' }]}
                    className='auth-input-wrapper auth-input-password'
                >
                    <Input.Password placeholder='Пароль' />
                </Form.Item>

                <Form.Item className='login-form-utils'>
                    <Form.Item name='remember' valuePropName='checked' noStyle>
                        <Checkbox>Запомнить меня</Checkbox>
                    </Form.Item>

                    <Link className='login-form-forgot' to={Paths.FORGOT_PASSWORD}>
                        Забыли пароль?
                    </Link>
                </Form.Item>

                <Form.Item className='login-form-button-wrapper'>
                    <Button type='primary' htmlType='submit' className='login-form-button'>
                        Войти
                    </Button>
                </Form.Item>
                <Form.Item className='google-auth-wrapper'>
                    <Button
                        type='primary'
                        htmlType='submit'
                        className='login-form-button google-auth'
                    >
                        <GooglePlusOutlined />
                        Войти через Google
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default Login;
