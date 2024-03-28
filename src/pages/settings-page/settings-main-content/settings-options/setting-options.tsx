import { InfoCircleOutlined } from '@ant-design/icons';
import { BREAKPOINT_520 } from '@constants/breakpoints';
import { DATA_TEST_ID } from '@constants/data-test-id';
import { useAppSelector } from '@hooks/typed-react-redux-hooks';
import { useUpdateUserMutation } from '@redux/profile/profile-api';
import { selectUserInfo } from '@redux/profile/profile-slice';
import { Form, FormProps, Switch, Tooltip } from 'antd';
import { useWindowSize } from 'usehooks-ts';

import './setting-options.less';

const settingOptionsData = [
    {
        title: 'Открыт для совместных тренировок',
        tooltip: 'включеная функция позволит участвовать в совместных тренировках',
        name: 'readyForJointTraining',
        onlyProFeature: false,
        dataTestId: DATA_TEST_ID.tariffTrainings,
        dataTestIdIcon: DATA_TEST_ID.tariffTrainingsIcon,
    },
    {
        title: 'Уведомления',
        tooltip: 'включеная функция позволит получать уведомления об активностях',
        name: 'sendNotification',
        onlyProFeature: false,
        dataTestId: DATA_TEST_ID.tariffNotifications,
        dataTestIdIcon: DATA_TEST_ID.tariffNotificationsIcon,
    },
    {
        title: 'Тёмная тема',
        tooltip: 'темная тема доступна для PRO tarif',
        name: 'theme',
        onlyProFeature: true,
        dataTestId: DATA_TEST_ID.tariffTheme,
        dataTestIdIcon: DATA_TEST_ID.tariffThemeIcon,
    },
];

const SettingsOptions = () => {
    const { width } = useWindowSize();

    const userInfo = useAppSelector(selectUserInfo);
    const [updateUser] = useUpdateUserMutation();

    const isProActive = userInfo?.tariff;

    const isDesktop = width > BREAKPOINT_520;

    const onFieldsChange: FormProps['onFieldsChange'] = (changedFields) => {
        const changedField = changedFields[0];
        const fieldname = changedField.name[0];

        if (fieldname === 'theme') {
            return;
        }
        updateUser({ [fieldname]: changedField.value });
    };

    return (
        <Form
            className='options-wrapper'
            initialValues={userInfo || {}}
            onFieldsChange={onFieldsChange}
        >
            {settingOptionsData.map((option) => {
                const { title, tooltip, name, onlyProFeature, dataTestId, dataTestIdIcon } = option;
                const size = isDesktop ? 'default' : 'small';
                const tooltipPosition = isDesktop ? 'bottom' : 'top';
                const isDisabledOption = !isProActive && onlyProFeature;

                return (
                    <div className='option' key={title}>
                        <div
                            className={`option-title ${isDisabledOption ? 'disabled-option' : ''}`}
                        >
                            <span style={{ paddingBottom: '4px' }}>{title}</span>
                            <Tooltip title={tooltip} placement={tooltipPosition}>
                                <InfoCircleOutlined
                                    data-test-id={dataTestIdIcon}
                                    className='option-icon'
                                />
                            </Tooltip>
                        </div>
                        <Form.Item
                            name={name}
                            key={title}
                            valuePropName='checked'
                            className='option'
                        >
                            <Switch
                                disabled={isDisabledOption}
                                size={size}
                                data-test-id={dataTestId}
                            />
                        </Form.Item>
                    </div>
                );
            })}
        </Form>
    );
};

export default SettingsOptions;
