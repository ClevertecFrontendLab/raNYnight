import Loader from '@components/loader/loader';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import { useChangePasswordMutation } from '@redux/auth/authApi';
import {
    selectLastRegisterRequest,
    selectShouldRefetch,
    setLastRegisterRequest,
    setShouldRefetch,
} from '@redux/auth/authSlice';
import { selectPreviousPath } from '@redux/configure-store';
import { Paths } from '@router/paths';
import { Button, Form, Input, Typography } from 'antd';
import { useForm } from 'antd/lib/form/Form';
import { useEffect, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';

import './change-password.less';

const { Text } = Typography;

const AuthChangePassword = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const previousPath = useAppSelector(selectPreviousPath) ?? '';

    const [shouldRedirect, setShouldRedirect] = useState(false);

    const shouldRefetch = useAppSelector(selectShouldRefetch);
    const lastRegisterRequest = useAppSelector(selectLastRegisterRequest);

    const [isFormValid, setFormValid] = useState(false);
    const [form] = useForm();

    const [changePassword, { isSuccess, isLoading }] = useChangePasswordMutation();

    const changePasswordFunction = async (password: string, confirmPassword: string) => {
        await changePassword({ password, confirmPassword })
            .unwrap()
            .catch(() => {
                navigate(`${Paths.RESULT}/${Paths.ERROR_CHANGE_PASSWORD}`);
                dispatch(setShouldRefetch(true));
                dispatch(setLastRegisterRequest({ email: '', password }));
            });
    };

    const handleFormChange = () => {
        const password = form.getFieldValue('password');
        const passwordRepeat = form.getFieldValue('password-repeat');
        if (password && passwordRepeat) {
            const hasErrors = form.getFieldsError().some(({ errors }) => errors.length);
            setFormValid(!hasErrors);
        }
    };

    const onFinish = async (values: any) => {
        const { password } = values;
        await changePasswordFunction(password, password);
        form.resetFields();
        setFormValid(false);
    };

    useEffect(() => {
        if (shouldRefetch) {
            const { password } = lastRegisterRequest;
            changePasswordFunction(password, password);
            dispatch(setShouldRefetch(false));
        }
    }, []);

    useEffect(() => {
        const normalizedPrevPathname = previousPath.endsWith('/')
            ? previousPath.slice(0, -1)
            : previousPath;

        const allowedPaths = [
            `${Paths.AUTH}/${Paths.CONFIRM_EMAIL}`,
            `${Paths.RESULT}/${Paths.ERROR_CHANGE_PASSWORD}`,
            `${Paths.AUTH}/${Paths.CONFIRM_EMAIL}/`,
            `${Paths.RESULT}/${Paths.ERROR_CHANGE_PASSWORD}/`,
        ];

        if (!previousPath || !allowedPaths.includes(normalizedPrevPathname)) {
            setShouldRedirect(true);
        }
    }, []);

    if (shouldRedirect) {
        return <Navigate to={Paths.AUTH} />;
    }

    if (isSuccess) {
        return <Navigate to={`${Paths.RESULT}/${Paths.SUCCESS_PASSWORD_CHANGE}`} />;
    }

    return (
        <>
            <div className={`auth-change-password-wrapper ${isLoading ? 'background-filter' : ''}`}>
                <Text className='auth-сhange-title'>Восстановление аккаунта</Text>
                <Form
                    name='normal_register'
                    className='register-form'
                    onFieldsChange={handleFormChange}
                    onFinish={onFinish}
                    autoComplete='nope'
                    form={form}
                    initialValues={{ remember: false }}
                >
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
                        <Input.Password placeholder='Пароль' data-test-id='change-password' />
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
                            data-test-id='change-confirm-password'
                        />
                    </Form.Item>
                    <Form.Item className='register-form-button-wrapper'>
                        <Button
                            type='primary'
                            htmlType='submit'
                            className='login-form-button'
                            disabled={!isFormValid || isLoading}
                            data-test-id='change-submit-button'
                        >
                            Сохранить
                        </Button>
                    </Form.Item>
                </Form>
            </div>
            {isLoading && <Loader />}
        </>
    );
};

export default AuthChangePassword;
