import { Paths } from '@router/paths';
import './registration.less';
import AuthSwitcher from '../auth-switcher/auth-switcher';
import { GooglePlusOutlined } from '@ant-design/icons';
import { Form, Input, Checkbox, Button } from 'antd';
import { Link } from 'react-router-dom';

const Registration: React.FC = () => {
    const onFinish = (values: any) => {
        console.log('Received values of form: ', values);
    };

    return (
        <div className='register-container'>
            <div className='auth-logo' />
            <AuthSwitcher activeLink='registration' />
            <Form
                name='normal_register'
                className='register-form'
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
                    label='Пароль не менее 8 символов, с заглавной буквой и цифрой'
                    rules={[
                        {
                            required: true,
                            message: 'Пароль не менее 8 символов, с заглавной буквой и цифрой',
                        },
                    ]}
                    className='auth-input-wrapper auth-input-password'
                >
                    <Input.Password placeholder='Пароль' />
                </Form.Item>
                <Form.Item
                    name='password-repeat'
                    rules={[{ required: true, message: '' }]}
                    className='auth-input-wrapper auth-input-password'
                >
                    <Input.Password placeholder='Повторите пароль' />
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
                        Регистрация через Google
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default Registration;
