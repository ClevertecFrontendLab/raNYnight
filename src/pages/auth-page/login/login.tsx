import { useEffect, useState } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { GooglePlusOutlined } from '@ant-design/icons';
import Loader from '@components/loader/loader';
import { authGoogleQuery } from '@constants/api';
import { BREAKPOINT_520 } from '@constants/breakpoints';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import { useCheckEmailMutation, useLoginUserMutation } from '@redux/auth/auth-api';
import {
    selectForgotEmail,
    selectShouldRefetch,
    setAuthToken,
    setForgotEmail,
    setRememberMe,
    setShouldRefetch,
} from '@redux/auth/auth-slice';
import { Paths } from '@router/paths';
import { Button, Checkbox, Form, Input } from 'antd';
import useForm from 'antd/lib/form/hooks/useForm';
import { LoginRequest } from 'src/types/auth';
import { useWindowSize } from 'usehooks-ts';

import AuthSwitcher from '../auth-switcher/auth-switcher';
import { validatePassword } from '../registration/validators';

import './login.less';

const Login: React.FC = () => {
    const { width } = useWindowSize();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const shouldRefetch = useAppSelector(selectShouldRefetch);
    const forgotEmail = useAppSelector(selectForgotEmail);
    const [isEmailValid, setIsEmailValid] = useState(false);

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
        if (email && emailRegex.test(email)) {
            setIsEmailValid(true);
        } else {
            setIsEmailValid(false);
        }
    };

    const handleCheckEmail = async (email: string) => {
        dispatch(setForgotEmail(email));
        await checkEmail({ email })
            .unwrap()
            .then(() => {
                dispatch(setShouldRefetch(false));
                navigate(Paths.CONFIRM_EMAIL, { state: { prevPath: location.pathname } });
            })
            .catch((error) => {
                if (error.status === 404) {
                    navigate(`${Paths.RESULT}/${Paths.ERROR_CHECK_EMAIL_NO_EXIST}`, {
                        state: { prevPath: location.pathname },
                    });
                } else {
                    dispatch(setShouldRefetch(true));
                    navigate(`${Paths.RESULT}/${Paths.ERROR_CHECK_EMAIL}`, {
                        state: { prevPath: location.pathname },
                    });
                }
            });
    };

    const onForgotButtonClick = async () => {
        const email = form.getFieldValue('email');
        handleCheckEmail(email);
    };

    const handleGoogleLogin = async () => {
        window.location.href = authGoogleQuery;
    };

    useEffect(() => {
        if (isLoginSuccess && loginData) {
            dispatch(setRememberMe(form.getFieldValue('remember')));
            dispatch(setAuthToken(loginData.accessToken));
            navigate(Paths.MAIN, { state: { prevPath: location.pathname } });
        }
    }, [isLoginSuccess]);

    useEffect(() => {
        if (shouldRefetch) {
            handleCheckEmail(forgotEmail);
        }
    }, []);

    if (isLoginError) {
        return (
            <Navigate
                to={`${Paths.RESULT}/${Paths.ERROR_LOGIN}`}
                state={{ prevPath: location.pathname }}
            />
        );
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
                    initialValues={{ remember: false }}
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
                        <Input
                            prefix={'e-mail:'}
                            className='auth-input'
                            data-test-id='login-email'
                        />
                    </Form.Item>
                    <Form.Item
                        name='password'
                        className='auth-input-wrapper auth-input-password'
                        rules={[
                            {
                                required: true,
                                message: '',
                                validator: validatePassword,
                            },
                        ]}
                    >
                        <Input.Password
                            placeholder='Пароль'
                            data-test-id='login-password'
                            autoComplete='on'
                        />
                    </Form.Item>

                    <Form.Item className='login-form-utils'>
                        <Form.Item name='remember' noStyle valuePropName='checked'>
                            <Checkbox data-test-id='login-remember'>Запомнить меня</Checkbox>
                        </Form.Item>

                        <Button
                            className='login-form-forgot-button '
                            onClick={isEmailValid ? onForgotButtonClick : undefined}
                            data-test-id='login-forgot-button'
                        >
                            Забыли пароль?
                        </Button>
                    </Form.Item>

                    <Form.Item className='login-form-button-wrapper'>
                        <Button
                            type='primary'
                            htmlType='submit'
                            className='login-form-button'
                            disabled={isLoadingLogin || isEmailCheckLoading}
                            data-test-id='login-submit-button'
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
                            onClick={handleGoogleLogin}
                        >
                            {width <= BREAKPOINT_520 ? null : <GooglePlusOutlined />}
                            Войти через Google
                        </Button>
                    </Form.Item>
                </Form>
            </div>
            {isLoadingLogin || isEmailCheckLoading ? <Loader /> : null}
        </>
    );
};

export default Login;
