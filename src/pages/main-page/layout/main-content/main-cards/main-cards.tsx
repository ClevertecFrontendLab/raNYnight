import { Typography } from 'antd';
import Link from 'antd/lib/typography/Link';

import { HeartFilled, IdcardOutlined } from '@ant-design/icons';

import calendarOutlinedIcon from '/calendar-icon-2.svg';

import './main-cards.less';

const { Text } = Typography;

const MainCards = () => {
    return (
        <div className='main-content-cards'>
            <div className='card-wrapper'>
                <Text className='card-title'>Расписать тренировки</Text>
                <div className='card-link'>
                    <HeartFilled className='card-link-icon' /> <Link>Тренировки</Link>
                </div>
            </div>
            <div className='card-wrapper'>
                <Text className='card-title'>Назначить календарь</Text>
                <div className='card-link'>
                    <img src={calendarOutlinedIcon} alt='calendar' className='card-link-icon' />
                    <Link>Календарь</Link>
                </div>
            </div>
            <div className='card-wrapper'>
                <Text className='card-title'>Заполнить профиль</Text>
                <div className='card-link'>
                    <IdcardOutlined className='card-link-icon' /> <Link>Профиль</Link>
                </div>
            </div>
        </div>
    );
};
export default MainCards;
