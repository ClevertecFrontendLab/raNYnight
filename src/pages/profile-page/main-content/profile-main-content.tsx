import { useState } from 'react';
import { ModalTypes } from '@common-types/modal';
import Loader from '@components/loader/loader';
import { ProfileFormContext } from '@components/profile-form-context/profile-form-context';
import { BREAKPOINT_520 } from '@constants/breakpoints';
import { DATA_TEST_ID } from '@constants/data-test-id';
import { DATE_DDMMYYYY } from '@constants/dates';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import { validatePassword, validateRepeatPassword } from '@pages/auth-page/registration/validators';
import { setActiveModal } from '@redux/modals/modal-manager';
import { useUpdateUserMutation } from '@redux/profile/profile-api';
import { selectUserInfo } from '@redux/profile/profile-slice';
import { Alert, Button, DatePicker, Form, Input } from 'antd';
import { FormProps, useForm } from 'antd/lib/form/Form';
import Title from 'antd/lib/typography/Title';
import moment from 'moment';
import { useWindowSize } from 'usehooks-ts';

import ProfileImageUploader from './profile-image-uploader/profile-image-uploader';

import './profile-main-content.less';

const ProfileMainContent = () => {
    const dispatch = useAppDispatch();
    const [form] = useForm();

    const { width } = useWindowSize();

    const isDesktop = width > BREAKPOINT_520;

    const [isSaveDisabled, setIsSaveDisabled] = useState(true);

    const userInfo = useAppSelector(selectUserInfo);
    const initialValues = {
        ...userInfo,
        birthday: userInfo?.birthday && moment(userInfo?.birthday),
    };

    const [updateUser, { isLoading, isSuccess: isUserUpdated }] = useUpdateUserMutation();

    const handleSaveChanges: FormProps['onFinish'] = (values) => {
        const updatedValues = {
            ...values,
        };

        const { password } = values;
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

        updateUser(updatedValues)
            .unwrap()
            .then(() => {
                form.setFieldValue('password', '');
                form.setFieldValue('password-repeat', '');
                setIsSaveDisabled(true);
            })
            .catch(() => {
                dispatch(setActiveModal(ModalTypes.notificationErrorModal));
            });
    };

    const handleFormChange: FormProps['onFieldsChange'] = (values) => {
        if (values[0].name[0] === 'imgSrc') {
            const avatarValueStatus = values[0].value?.file?.status;

            if (avatarValueStatus === 'uploading' || avatarValueStatus === 'error') {
                setIsSaveDisabled(true);
            }
            if (avatarValueStatus === 'done') {
                setIsSaveDisabled(false);
            }
        } else {
            setIsSaveDisabled(false);
        }
    };

    return (
        <div className={`profile-main-content-wrapper ${isDesktop ? '' : 'mobile'}`}>
            <ProfileFormContext.Provider value={form}>
                <Form
                    name='profile-info'
                    className='profile-info'
                    onFinish={handleSaveChanges}
                    onFieldsChange={handleFormChange}
                    autoComplete='nope'
                    form={form}
                    initialValues={initialValues || {}}
                    disabled={isLoading}
                >
                    <Title level={5} className='profile-info-title'>
                        Личная информация
                    </Title>
                    <div className={`personal-info-inputs-wrapper ${isDesktop ? '' : 'mobile'}`}>
                        <ProfileImageUploader />
                        <div className={`personal-inputs ${isDesktop ? '' : 'mobile'}`}>
                            <Form.Item name='firstName'>
                                <Input
                                    placeholder='Имя'
                                    className='profile-input personal'
                                    data-test-id={DATA_TEST_ID.profileName}
                                />
                            </Form.Item>

                            <Form.Item name='lastName'>
                                <Input
                                    placeholder='Фамилия'
                                    className='profile-input personal'
                                    data-test-id={DATA_TEST_ID.profileSurname}
                                />
                            </Form.Item>

                            <Form.Item name='birthday'>
                                <DatePicker
                                    format={DATE_DDMMYYYY}
                                    placeholder='Дата рождения'
                                    className='profile-input personal'
                                    data-test-id={DATA_TEST_ID.profileBirthday}
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
                            prefix='e-mail:'
                            className='profile-email-input'
                            data-test-id={DATA_TEST_ID.profileEmail}
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
                            autoComplete='on'
                            className='profile-input security'
                            data-test-id={DATA_TEST_ID.profilePassword}
                        />
                    </Form.Item>
                    <Form.Item
                        name='password-repeat'
                        rules={[
                            {
                                required: !!form.getFieldValue('password'),
                                message: '',
                            },
                            validateRepeatPassword,
                        ]}
                        className=''
                    >
                        <Input.Password
                            placeholder='Повторите пароль'
                            autoComplete='on'
                            className='profile-input security'
                            data-test-id={DATA_TEST_ID.profileRepeatPassword}
                        />
                    </Form.Item>

                    <Form.Item className=''>
                        <Button
                            type='primary'
                            htmlType='submit'
                            className={`profile-save-button ${isDesktop ? '' : 'mobile'}`}
                            disabled={isSaveDisabled}
                            data-test-id={DATA_TEST_ID.profileSubmit}
                        >
                            Сохранить изменения
                        </Button>
                    </Form.Item>
                </Form>
            </ProfileFormContext.Provider>
            {isUserUpdated && (
                <Alert
                    data-test-id={DATA_TEST_ID.alert}
                    className={`profile-alert ${isDesktop ? '' : 'mobile'}`}
                    message='Данные профиля успешно обновлены'
                    type='success'
                    showIcon={true}
                    closable={true}
                />
            )}
            {isLoading && <Loader />}
        </div>
    );
};

export default ProfileMainContent;
