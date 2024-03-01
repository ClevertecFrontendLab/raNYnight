import { useEffect, useState } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import Loader from '@components/loader/loader';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import { useChangePasswordMutation } from '@redux/auth/auth-api';
import {
    selectLastRegisterRequest,
    selectShouldRefetch,
    setLastRegisterRequest,
    setShouldRefetch,
} from '@redux/auth/auth-slice';
import { Paths } from '@router/paths';
import { Button, Form, Input, Typography } from 'antd';
import { useForm } from 'antd/lib/form/Form';
import { ChangePasswordRequest } from 'src/types/auth';

import { validatePassword, validateRepeatPassword } from '../registration/validators';

import './change-password.less';

const { Text } = Typography;

const AuthChangePassword = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const prevPath: string = location.state?.prevPath ?? '';
    const allowedPaths = [
        `${Paths.AUTH}/${Paths.CONFIRM_EMAIL}`,
        `${Paths.RESULT}/${Paths.ERROR_CHANGE_PASSWORD}`,
        `${Paths.AUTH}/${Paths.CONFIRM_EMAIL}/`,
        `${Paths.RESULT}/${Paths.ERROR_CHANGE_PASSWORD}/`,
    ];
    const shouldRedirect = !allowedPaths.includes(prevPath);

    const shouldRefetch = useAppSelector(selectShouldRefetch);
    const lastRegisterRequest = useAppSelector(selectLastRegisterRequest);

    const [isFormValid, setFormValid] = useState(false);
    const [form] = useForm();

    const [changePassword, { isSuccess, isLoading }] = useChangePasswordMutation();

    const handleChangePassword = async (password: string, confirmPassword: string) => {
        await changePassword({ password, confirmPassword })
            .unwrap()
            .catch(() => {
                navigate(`${Paths.RESULT}/${Paths.ERROR_CHANGE_PASSWORD}`, {
                    state: { prevPath: location.pathname },
                });
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

    const onFinish = async (values: ChangePasswordRequest) => {
        const { password } = values;
        await handleChangePassword(password, password);
        form.resetFields();
        setFormValid(false);
    };

    useEffect(() => {
        if (shouldRefetch) {
            const { password } = lastRegisterRequest;
            handleChangePassword(password, password);
            dispatch(setShouldRefetch(false));
        }
    }, []);

    if (shouldRedirect) {
        return <Navigate to={Paths.AUTH} />;
    }

    if (isSuccess) {
        return (
            <Navigate
                to={`${Paths.RESULT}/${Paths.SUCCESS_PASSWORD_CHANGE}`}
                state={{ prevPath: location.pathname }}
            />
        );
    }

    return (
        <>
            <div className={`auth-change-password-wrapper ${isLoading ? 'background-filter' : ''}`}>
                <Text className='auth-change-title'>Восстановление аккаунта</Text>
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
                                validator: validatePassword,
                            },
                        ]}
                        className='auth-input-wrapper auth-input-password'
                    >
                        <Input.Password
                            placeholder='Пароль'
                            data-test-id='change-password'
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
                            validateRepeatPassword,
                        ]}
                        className='auth-input-wrapper auth-input-password password-repeat'
                    >
                        <Input.Password
                            placeholder='Повторите пароль'
                            data-test-id='change-confirm-password'
                            autoComplete='on'
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
