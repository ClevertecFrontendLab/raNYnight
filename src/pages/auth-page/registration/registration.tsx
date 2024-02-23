import { GooglePlusOutlined } from '@ant-design/icons';
import Loader from '@components/loader/loader';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import { useRegisterUserMutation } from '@redux/auth/authApi';
import {
    selectLastRegisterRequest,
    selectShouldRefetch,
    setLastRegisterRequest,
    setShouldRefetch,
} from '@redux/auth/authSlice';
import { Paths } from '@router/paths';
import { Button, Form, Input } from 'antd';
import { useForm } from 'antd/lib/form/Form';
import { useEffect, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { RegisterInput } from 'src/types/auth';
import AuthSwitcher from '../auth-switcher/auth-switcher';
import { useWindowSize } from 'usehooks-ts';
import { BREAKPOINT_520 } from '@constants/breakpoints';

import './registration.less';

const Registration: React.FC = () => {
    const [form] = useForm();
    const { width } = useWindowSize();
    const [isFormValid, setFormValid] = useState(false);
    const [registerUser, { isLoading, isSuccess }] = useRegisterUserMutation();
    const shouldRefetch = useAppSelector(selectShouldRefetch);
    const lastRegisterRequest = useAppSelector(selectLastRegisterRequest);
    const navigate = useNavigate();

    const dispatch = useAppDispatch();

    const handleRegisterUser = async (values: RegisterInput) => {
        const { email, password } = values;
        await registerUser({ email, password })
            .unwrap()
            .catch((error) => {
                if (error.status === 409) {
                    navigate(`${Paths.RESULT}/${Paths.ERROR_USER_EXIST}`, {
                        state: { prevPath: `${Paths.AUTH}/${Paths.REGISTRATION}` },
                    });
                } else {
                    navigate(`${Paths.RESULT}/${Paths.ERROR}`, {
                        state: { prevPath: `${Paths.AUTH}/${Paths.REGISTRATION}` },
                    });
                    dispatch(setShouldRefetch(true));
                    dispatch(setLastRegisterRequest({ email, password }));
                }
            });
    };

    const onFinish = async (values: RegisterInput) => {
        const { email, password } = values;
        await handleRegisterUser({ email, password });
        form.resetFields();
    };

    const handleFormChange = () => {
        const email = form.getFieldValue('email');
        const password = form.getFieldValue('password');
        const passwordRepeat = form.getFieldValue('password-repeat');
        if (password && passwordRepeat && email) {
            const hasErrors = form.getFieldsError().some(({ errors }) => errors.length);
            setFormValid(!hasErrors);
        }
    };

    useEffect(() => {
        if (shouldRefetch) {
            const { email, password } = lastRegisterRequest;
            handleRegisterUser({ email, password });
            dispatch(setShouldRefetch(false));
        }
    }, []);

    if (isSuccess) {
        return (
            <Navigate
                to={`${Paths.RESULT}/${Paths.SUCCESS}`}
                state={{ prevPath: `${Paths.AUTH}/${Paths.REGISTRATION}` }}
            />
        );
    }

    return (
        <>
            <div className={`register-container ${isLoading ? 'background-filter' : ''}`}>
                <div className='auth-logo' />
                <AuthSwitcher activeLink='registration' />
                <Form
                    name='normal_register'
                    className='register-form'
                    onFinish={onFinish}
                    onFieldsChange={handleFormChange}
                    autoComplete='nope'
                    form={form}
                    initialValues={{ remember: false }}
                    disabled={isLoading}
                >
                    <Form.Item
                        name='email'
                        rules={[
                            {
                                type: 'email',
                                message: '',
                            },
                            { required: true, message: '' },
                        ]}
                        className='auth-input-wrapper auth-input-email'
                    >
                        <Input
                            prefix={'e-mail:'}
                            className='auth-input'
                            data-test-id='registration-email'
                        />
                    </Form.Item>
                    <Form.Item
                        name='password'
                        help='Пароль не менее 8 символов, с заглавной буквой и цифрой'
                        rules={[
                            {
                                required: true,
                                message: 'Пароль не менее 8 символов, с заглавной буквой и цифрой',
                                validator: (_, value) => {
                                    const passRegExp = /^(?=.*[A-Z])(?=.*\d).{8,}$/;
                                    return RegExp(passRegExp).test(value)
                                        ? Promise.resolve()
                                        : Promise.reject(
                                              new Error(
                                                  'Пароль не менее 8 символов, с заглавной буквой и цифрой',
                                              ),
                                          );
                                },
                            },
                        ]}
                        className='auth-input-wrapper auth-input-password'
                    >
                        <Input.Password
                            placeholder='Пароль'
                            data-test-id='registration-password'
                            autoComplete='on'
                        />
                    </Form.Item>
                    <Form.Item
                        name='password-repeat'
                        rules={[
                            {
                                required: true,
                                message: '',
                            },
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                    if (!value || getFieldValue('password') === value) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject(new Error('Пароли не совпадают'));
                                },
                            }),
                        ]}
                        className='auth-input-wrapper auth-input-password password-repeat'
                    >
                        <Input.Password
                            placeholder='Повторите пароль'
                            data-test-id='registration-confirm-password'
                            autoComplete='on'
                        />
                    </Form.Item>

                    <Form.Item className='register-form-button-wrapper'>
                        <Button
                            type='primary'
                            htmlType='submit'
                            className='login-form-button'
                            disabled={!isFormValid || isLoading}
                            data-test-id='registration-submit-button'
                        >
                            Войти
                        </Button>
                    </Form.Item>
                    <Form.Item className='google-auth-wrapper'>
                        <Button
                            type='primary'
                            htmlType='submit'
                            className='login-form-button google-auth'
                        >
                            {width <= BREAKPOINT_520 ? null : <GooglePlusOutlined />}
                            Регистрация через Google
                        </Button>
                    </Form.Item>
                </Form>
            </div>
            {isLoading && <Loader />}
        </>
    );
};

export default Registration;
