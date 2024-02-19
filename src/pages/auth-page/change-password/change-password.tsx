import { Button, Form, Input, Typography } from 'antd';

import { useForm } from 'antd/lib/form/Form';
import { useState } from 'react';
import './change-password.less';
const { Text } = Typography;

const AuthChangePassword = () => {
    const [isFormValid, setFormValid] = useState(true);
    const [form] = useForm();

    const handleFormChange = () => {
        const password = form.getFieldValue('password');
        const passwordRepeat = form.getFieldValue('password-repeat');
        if (password && passwordRepeat) {
            const hasErrors = form.getFieldsError().some(({ errors }) => errors.length);
            setFormValid(hasErrors);
        }
    };

    const onFinish = async (values: any) => {
        console.log(values);
        const { password, passwordRepeat } = values;
        console.log(password, passwordRepeat);
        form.resetFields();
    };

    return (
        <div className='auth-change-password-wrapper'>
            <Text className='auth-сhange-title'>Восстановление аккаунта</Text>
            <Form
                name='normal_register'
                className='register-form'
                onFieldsChange={handleFormChange}
                onFinish={onFinish}
                autoComplete='nope'
                form={form}
                initialValues={{ remember: false }}
                // disabled={isLoading}
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
                    <Input.Password placeholder='Пароль' />
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
                    <Input.Password placeholder='Повторите пароль' />
                </Form.Item>
                <Form.Item className='register-form-button-wrapper'>
                    <Button
                        type='primary'
                        htmlType='submit'
                        className='login-form-button'
                        // disabled={isFormValid || isLoading}
                        disabled={isFormValid}
                    >
                        Сохранить
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default AuthChangePassword;
