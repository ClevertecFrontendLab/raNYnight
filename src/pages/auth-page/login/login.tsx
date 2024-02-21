import { GooglePlusOutlined } from '@ant-design/icons';
import Loader from '@components/loader/loader';
import { useCheckEmailMutation, useLoginUserMutation } from '@redux/auth/authApi';
import { Paths } from '@router/paths';
import { Button, Checkbox, Form, Input } from 'antd';
import { Navigate, useNavigate } from 'react-router-dom';
import { LoginRequest } from 'src/types/auth';
import AuthSwitcher from '../auth-switcher/auth-switcher';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import {
    selectForgotEmail,
    selectShouldRefetch,
    setAuthToken,
    setForgotEmail,
    setRememberMe,
    setShouldRefetch,
} from '@redux/auth/authSlice';
import { useEffect, useState } from 'react';
import useForm from 'antd/lib/form/hooks/useForm';

import './login.less';

const Login: React.FC = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const shouldRefetch = useAppSelector(selectShouldRefetch);
    const forgotEmail = useAppSelector(selectForgotEmail);
    const [isEmailValid, setIsEmailValid] = useState(false);
    const [isLoginAvailable, setIsLoginAvailable] = useState(false);
    const [isFormValid, setFormValid] = useState(false);

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
    const [checkEmail, { isLoading: isEmailCheckLoading, error }] = useCheckEmailMutation();
    console.log('check error from mutatuoin', error);

    const onFinish = async (values: LoginRequest) => {
        const { email, password } = values;
        await loginUser({ email, password });
    };

    const handleFormChange = () => {
        const email = form.getFieldValue('email');
        const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
        const password = form.getFieldValue('password');
        if (password && email) {
            const hasErrors = form.getFieldsError().some(({ errors }) => errors.length);
            setFormValid(!hasErrors);
        }

        if (email && emailRegex.test(email)) {
            setIsEmailValid(true);
        } else {
            setIsEmailValid(false);
        }
    };

    const handleCheckEmail = async (email: string) => {
        try {
            dispatch(setForgotEmail(email));
            await checkEmail({ email })
                .unwrap()
                .then(() => {
                    dispatch(setForgotEmail(''));
                    dispatch(setShouldRefetch(false));
                    navigate(Paths.CONFIRM_EMAIL);
                })
                .catch((error) => {
                    if (error.status === 404) {
                        navigate(`${Paths.RESULT}/${Paths.ERROR_CHECK_EMAIL_NO_EXIST}`);
                    } else {
                        dispatch(setShouldRefetch(true));
                        navigate(`${Paths.RESULT}/${Paths.ERROR_CHECK_EMAIL}`);
                    }
                });
        } catch (error) {
            console.error(error);
        }
    };

    const onForgotButtonClick = async () => {
        const email = form.getFieldValue('email');
        dispatch(setForgotEmail(email));
        handleCheckEmail(email);
        // await checkEmail({ email })
        //     .unwrap()
        //     .then(() => {
        //         dispatch(setForgotEmail(''));
        //         navigate(Paths.CONFIRM_EMAIL);
        //     })
        //     .catch((error) => {
        //         // console.log('errr', error, error.data.statusCode, error.data.message);
        //         console.log('err data', error);
        //         if (
        //             // error.data.statusCode == 404 ||
        //             error.status == 404
        //             // (error.data.message === 'Email не найден' ||
        //             //     error.message === 'Email не найден')
        //         ) {
        //             console.log('we are her ERROR_CHECK_EMAIL_NO_EXIST');
        //             navigate(`${Paths.RESULT}/${Paths.ERROR_CHECK_EMAIL_NO_EXIST}`);
        //         } else {
        //             console.log('we are here ERROR_CHECK_EMAIL');
        //             navigate(`${Paths.RESULT}/${Paths.ERROR_CHECK_EMAIL}`);
        //         }
        //     });
    };

    useEffect(() => {
        if (isLoginSuccess && loginData) {
            dispatch(setRememberMe(form.getFieldValue('remember')));
            dispatch(setAuthToken(loginData.accessToken));
            navigate(Paths.MAIN);
        }
    }, [isLoginSuccess]);

    useEffect(() => {
        if (shouldRefetch) {
            handleCheckEmail(forgotEmail);
        }
    }, []);

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
                                validator: (_, value) => {
                                    const passRegExp = /^(?=.*[A-Z])(?=.*\d).{8,}$/;
                                    return RegExp(passRegExp).test(value)
                                        ? Promise.resolve()
                                        : Promise.reject(new Error('asd'));
                                },
                            },
                        ]}
                    >
                        <Input.Password placeholder='Пароль' data-test-id='login-password' />
                    </Form.Item>

                    <Form.Item className='login-form-utils'>
                        <Form.Item name='remember' valuePropName='checked' noStyle>
                            <Checkbox data-test-id='login-remember'>Запомнить меня</Checkbox>
                        </Form.Item>

                        <Button
                            className='login-form-forgot-button '
                            // disabled={!isEmailValid}
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
                            disabled={
                                isLoadingLogin || isEmailCheckLoading
                                // !isEmailValid ||
                                // !isFormValid
                            }
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
                        >
                            <GooglePlusOutlined />
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
