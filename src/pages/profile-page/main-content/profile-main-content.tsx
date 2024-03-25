import { DATA_TEST_ID } from '@constants/data-test-id';
import { ProfileFormContext } from '@hooks/useProfileFormContext';
import { validatePassword, validateRepeatPassword } from '@pages/auth-page/registration/validators';
import { Alert, Button, DatePicker, Form, Input } from 'antd';
import { FormProps, useForm } from 'antd/lib/form/Form';
import Title from 'antd/lib/typography/Title';
import ProfileImageUploader from './profile-image-uploader/profile-image-uploader';
import './profile-main-content.less';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import { selectUserInfo, setShouldRefetch } from '@redux/profile/profile-slice';
import { useState } from 'react';

import { useUpdateUserMutation } from '@redux/profile/profile-api';
import { DATE_DDMMYYYY } from '@constants/dates';
import moment from 'moment';

const ProfileMainContent = () => {
    const dispatch = useAppDispatch();
    const [form] = useForm();

    const [isSaveDisabled, setIsSaveDisabled] = useState(true);

    const userInfo = useAppSelector(selectUserInfo);
    const initialValues = {
        ...userInfo,
        birthday: moment(userInfo?.birthday),
    };

    const [updateUser, { isLoading, isSuccess: isUserUpdated }] = useUpdateUserMutation();

    const handleSaveChanges: FormProps['onFinish'] = (values) => {
        const updatedValues = {
            ...values,
        };

        const password = values.password;
        const passwordRepeat = values['password-repeat'];

        if (!password) {
            delete updatedValues.password;
        }
        if (!passwordRepeat) {
            delete updatedValues['password-repeat'];
        }

        if (values.imgSrc) {
            if (typeof values.imgSrc === 'string') updatedValues.imgSrc = values.imgSrc;
            if (values.imgSrc.file?.status === 'removed') updatedValues.imgSrc = '';
            else {
                updatedValues.imgSrc = `https://training-api.clevertec.ru${values.imgSrc.file?.response?.url}`;
            }
        }

        console.log('updatedValues', updatedValues);
        updateUser(updatedValues)
            .unwrap()
            .then(() => {
                dispatch(setShouldRefetch(true));
                form.setFieldValue('password', '');
                form.setFieldValue('password-repeat', '');
            });
    };

    const handleFormChange: FormProps['onFieldsChange'] = (values) => {
        setIsSaveDisabled(false);
        console.log('form err', form.getFieldsError());
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
                    initialValues={initialValues || {}}
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
                                    format={DATE_DDMMYYYY}
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
                                validator: (_, value) => validatePassword(_, value, false),
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
                                required: form.getFieldValue('password') ? true : false,
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
                            disabled={isSaveDisabled}
                            data-test-id={DATA_TEST_ID.registrationSubmitButton}
                        >
                            Сохранить изменения
                        </Button>
                    </Form.Item>
                </Form>
            </ProfileFormContext.Provider>
            {isUserUpdated && (
                <Alert
                    data-test-id={DATA_TEST_ID.alert}
                    className='update-alert'
                    message='Данные профиля успешно обновлены'
                    type='success'
                    showIcon={true}
                    closable={true}
                    style={{ width: '395px', position: 'fixed', bottom: '72px', margin: '0 auto' }}
                />
            )}
        </div>
    );
};

export default ProfileMainContent;
