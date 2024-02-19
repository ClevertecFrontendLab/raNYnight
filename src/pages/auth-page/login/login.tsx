import { Button, Checkbox, Form, Input } from 'antd';
import AuthSwitcher from '../auth-switcher/auth-switcher';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { Paths } from '@router/paths';
import { GooglePlusOutlined } from '@ant-design/icons';
import { useLoginUserMutation } from '@redux/auth/authApi';
import { LoginRequest } from 'src/types/auth';
import Loader from '@components/loader/loader';

import './login.less';
import { useAppDispatch } from '@hooks/typed-react-redux-hooks';
import { setAuthToken } from '@redux/auth/authSlice';
import { useEffect } from 'react';
// import { history } from '@redux/configure-store';

const Login: React.FC = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [loginUser, { data: loginData, isLoading, isError, isSuccess }] = useLoginUserMutation();

    const onFinish = async (values: LoginRequest) => {
        const { email, password } = values;
        await loginUser({ email, password });
    };

    useEffect(() => {
        if (isSuccess && loginData) {
            dispatch(setAuthToken(loginData.accessToken));
            // history.push(Paths.MAIN);
            navigate(Paths.MAIN);
        }
    }, [isSuccess]);

    if (isError) {
        return <Navigate to={`${Paths.RESULT}/${Paths.ERROR_LOGIN}`} />;
    }

    return (
        <>
            <div className={`login-container ${isLoading ? 'background-filter' : ''}`}>
                <div className='auth-logo' />
                <AuthSwitcher activeLink='login' />
                <Form
                    name='normal_login'
                    className='login-form'
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    autoComplete='nope'
                    disabled={isLoading}
                >
                    <Form.Item
                        name='email'
                        // rules={[{ required: true, message: '' }]}
                        className='auth-input-wrapper'
                    >
                        <Input prefix={'e-mail:'} className='auth-input' />
                    </Form.Item>
                    <Form.Item
                        name='password'
                        // rules={[{ required: true, message: '' }]}
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
                        <Button
                            type='primary'
                            htmlType='submit'
                            className='login-form-button'
                            disabled={isLoading}
                        >
                            Войти
                        </Button>
                    </Form.Item>
                    <Form.Item className='google-auth-wrapper'>
                        <Button
                            type='primary'
                            htmlType='submit'
                            className='login-form-button google-auth'
                            disabled={isLoading}
                        >
                            <GooglePlusOutlined />
                            Войти через Google
                        </Button>
                    </Form.Item>
                </Form>
            </div>
            {isLoading && <Loader />}
        </>
    );
};

export default Login;
