import { DATA_TEST_ID } from '@constants/data-test-id';
import { ProfileFormContext } from '@hooks/useProfileFormContext';
import { validatePassword, validateRepeatPassword } from '@pages/auth-page/registration/validators';
import { Button, DatePicker, Form, Input } from 'antd';
import { useForm } from 'antd/lib/form/Form';
import Title from 'antd/lib/typography/Title';
import ProfileImageUploader from './profile-image-uploader/profile-image-uploader';
import './profile-main-content.less';
import { useAppSelector } from '@hooks/typed-react-redux-hooks';
import { selectUserInfo } from '@redux/profile/profile-slice';

const ProfileMainContent = () => {
    const [form] = useForm();

    const inititalValues = useAppSelector(selectUserInfo);

    const handleSaveChanges = () => {
        console.log('handleSaveChanges');
    };

    const handleFormChange = () => {
        console.log('handleFormChange');
    };

    return (
        <div className='profile-main-content-wrapper'>
            <ProfileFormContext.Provider value={form}>
                <Form
                    name='profile-info'
                    className='profile-info'
                    onFinish={handleSaveChanges}
                    onFieldsChange={handleFormChange}
                    autoComplete='nope'
                    form={form}
                    initialValues={inititalValues || {}}
                    // disabled={isLoading}
                >
                    <Title level={5} className='profile-info-title'>
                        Личная информация
                    </Title>
                    <div className='personal-info-inputs-wrapper'>
                        <ProfileImageUploader />
                        <div className='personal-inputs'>
                            <Form.Item name='firstName'>
                                <Input placeholder='Имя' className='profile-input personal' />
                            </Form.Item>

                            <Form.Item name='lastName'>
                                <Input placeholder='Фамилия' className='profile-input personal' />
                            </Form.Item>

                            <Form.Item name='birthday'>
                                <DatePicker
                                    format={'DD.MM.YYYY'}
                                    placeholder='Дата рождения'
                                    className='profile-input personal'
                                />
                            </Form.Item>
                        </div>
                    </div>

                    <Title level={5} className='profile-info-title'>
                        Приватность и авторизация
                    </Title>

                    <Form.Item
                        name='email'
                        rules={[
                            {
                                type: 'email',
                                message: '',
                            },
                            { required: true, message: '' },
                        ]}
                        className='profile-input security'
                    >
                        <Input
                            prefix={'e-mail:'}
                            className=''
                            data-test-id={DATA_TEST_ID.registrationEmail}
                        />
                    </Form.Item>
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
                        className=''
                    >
                        <Input.Password
                            placeholder='Пароль'
                            data-test-id={DATA_TEST_ID.registrationPassword}
                            autoComplete='on'
                            className='profile-input security'
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
                        className=''
                    >
                        <Input.Password
                            placeholder='Повторите пароль'
                            data-test-id={DATA_TEST_ID.registrationConfirmPassword}
                            autoComplete='on'
                            className='profile-input security'
                        />
                    </Form.Item>

                    <Form.Item className=''>
                        <Button
                            type='primary'
                            htmlType='submit'
                            className=''
                            // disabled={!isFormValid || isLoading}
                            data-test-id={DATA_TEST_ID.registrationSubmitButton}
                        >
                            Сохранить изменения
                        </Button>
                    </Form.Item>
                </Form>
            </ProfileFormContext.Provider>
        </div>
    );
};

export default ProfileMainContent;
