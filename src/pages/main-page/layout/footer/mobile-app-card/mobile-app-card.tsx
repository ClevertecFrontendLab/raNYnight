import { Typography } from 'antd';
import { AndroidFilled, AppleFilled } from '@ant-design/icons';

import './mobile-app-card.less';

const { Text } = Typography;

const MobileAppCard = () => {
    return (
        <div className='mobile-app-card-wrapper'>
            <Text className='mobile-app-card-title'>Скачать на телефон</Text>
            <Text className='mobile-app-card-description'>Доступно в PRO-тарифе</Text>
            <div className='mobile-app-card-links'>
                <AndroidFilled className='mobile-app-card-icon android' />
                <Text className='mobile-app-card-link'>Android OS</Text>
                <AppleFilled className='mobile-app-card-icon apple' />
                <Text className='mobile-app-card-link'>Apple iOS</Text>
            </div>
        </div>
    );
};

export default MobileAppCard;
