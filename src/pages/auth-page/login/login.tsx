import { GooglePlusOutlined } from '@ant-design/icons';
import Loader from '@components/loader/loader';
import { useCheckEmailMutation, useLoginUserMutation } from '@redux/auth/authApi';
import { Paths } from '@router/paths';
import { Button, Checkbox, Form, Input } from 'antd';
import { Navigate, useNavigate } from 'react-router-dom';
import { LoginRequest } from 'src/types/auth';
import AuthSwitcher from '../auth-switcher/auth-switcher';
import { useAppDispatch } from '@hooks/typed-react-redux-hooks';
import { setAuthToken, setForgotEmail } from '@redux/auth/authSlice';
import { useEffect, useState } from 'react';
import useForm from 'antd/lib/form/hooks/useForm';

import './login.less';

const Login: React.FC = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [isEmailValid, setIsEmailValid] = useState(false);
    const [isLoginAvailable, setIsLoginAvailable] = useState(false);

    const [form] = useForm();
    const [
        loginUser,
        {
            data: loginData,
            isLoading: isLoadingLogin,
            isError: isLoginError,
            isSuccess: isLoginSuccess,
        },
    ] = useLoginUserMutation();
    const [checkEmail, { isLoading: isEmailCheckLoading }] = useCheckEmailMutation();

    const onFinish = async (values: LoginRequest) => {
        const { email, password } = values;
        await loginUser({ email, password });
    };

    const handleFormChange = () => {
        const email = form.getFieldValue('email');
        const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
        const password = form.getFieldValue('password');
        if (isEmailValid && password) {
            setIsLoginAvailable(true);
        }
        if (email && emailRegex.test(email)) {
            setIsEmailValid(true);
        } else {
            setIsEmailValid(false);
            setIsLoginAvailable(false);
        }
    };

    const onForgotButtonClick = async () => {
        const email = form.getFieldValue('email');
        await checkEmail({ email })
            .unwrap()
            .then(() => {
                dispatch(setForgotEmail(email));
                navigate(Paths.FORGOT_PASSWORD);
            })
            .catch((error) => {
                if (error.status === 404 && error.message !== 'Email не найден') {
                    navigate(`${Paths.RESULT}/${Paths.ERROR_CHECK_EMAIL_NO_EXIST}`);
                } else {
                    navigate(`${Paths.RESULT}/${Paths.ERROR_CHECK_EMAIL}`);
                }
            });
    };

    useEffect(() => {
        if (isLoginSuccess && loginData) {
            dispatch(setAuthToken(loginData.accessToken));
            navigate(Paths.MAIN);
        }
    }, [isLoginSuccess]);

    if (isLoginError) {
        return <Navigate to={`${Paths.RESULT}/${Paths.ERROR_LOGIN}`} />;
    }

    return (
        <>
            <div
                className={`login-container ${
                    isLoadingLogin || isEmailCheckLoading ? 'background-filter' : ''
                }`}
            >
                <div className='auth-logo' />
                <AuthSwitcher activeLink='login' />
                <Form
                    form={form}
                    name='normal_login'
                    className='login-form'
                    initialValues={{ remember: true }}
                    onFieldsChange={handleFormChange}
                    onFinish={onFinish}
                    autoComplete='nope'
                    disabled={isLoadingLogin || isEmailCheckLoading}
                >
                    <Form.Item
                        name='email'
                        className='auth-input-wrapper'
                        required
                        rules={[{ type: 'email', message: '' }]}
                    >
                        <Input prefix={'e-mail:'} className='auth-input' />
                    </Form.Item>
                    <Form.Item name='password' className='auth-input-wrapper auth-input-password'>
                        <Input.Password placeholder='Пароль' />
                    </Form.Item>

                    <Form.Item className='login-form-utils'>
                        <Form.Item name='remember' valuePropName='checked' noStyle>
                            <Checkbox>Запомнить меня</Checkbox>
                        </Form.Item>

                        <Button
                            className='login-form-forgot-button '
                            disabled={!isEmailValid}
                            onClick={onForgotButtonClick}
                        >
                            Забыли пароль?
                        </Button>
                    </Form.Item>

                    <Form.Item className='login-form-button-wrapper'>
                        <Button
                            type='primary'
                            htmlType='submit'
                            className='login-form-button'
                            disabled={
                                isLoadingLogin ||
                                isEmailCheckLoading ||
                                !isEmailValid ||
                                !isLoginAvailable
                            }
                        >
                            Войти
                        </Button>
                    </Form.Item>
                    <Form.Item className='google-auth-wrapper'>
                        <Button
                            type='primary'
                            htmlType='submit'
                            className='login-form-button google-auth'
                            disabled={isLoadingLogin || isEmailCheckLoading}
                        >
                            <GooglePlusOutlined />
                            Войти через Google
                        </Button>
                    </Form.Item>
                </Form>
            </div>
            {isLoadingLogin || (isEmailCheckLoading && <Loader />)}
        </>
    );
};

export default Login;
