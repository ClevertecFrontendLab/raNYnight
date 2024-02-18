import { GooglePlusOutlined } from '@ant-design/icons';
import { useForm } from 'antd/lib/form/Form';
import { Button, Form, Input } from 'antd';
import AuthSwitcher from '../auth-switcher/auth-switcher';
import './registration.less';
import { useState } from 'react';

const Registration: React.FC = () => {
    const [form] = useForm();
    const [isFormValid, setFormValid] = useState(true);

    const onFinish = (values: any) => {
        console.log('Received values of form: ', values);
    };

    const handleFormChange = () => {
        const hasErrors = form.getFieldsError().some(({ errors }) => errors.length);
        setFormValid(hasErrors);
    };

    return (
        <div className='register-container'>
            <div className='auth-logo' />
            <AuthSwitcher activeLink='registration' />
            <Form
                name='normal_register'
                className='register-form'
                onFinish={onFinish}
                onFieldsChange={handleFormChange}
                autoComplete='off'
                form={form}
                initialValues={{ remember: true }}
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
                    <Input prefix={'e-mail:'} className='auth-input' />
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
                        disabled={isFormValid}
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
                        <GooglePlusOutlined />
                        Регистрация через Google
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default Registration;
