import { Link } from 'react-router-dom';
import { HeartFilled, IdcardOutlined } from '@ant-design/icons';
import { Paths } from '@router/paths';
import { Typography } from 'antd';

import './main-cards.less';

import calendarOutlinedIcon from '/calendar-icon-2.svg';
import { DATA_TEST_ID } from '@constants/data-test-id';

const { Text } = Typography;

const MainCards = () => {
    return (
        <div className='main-content-cards'>
            <div className='card-wrapper'>
                <Text className='card-title'>Расписать тренировки</Text>
                <div className='card-link'>
                    <HeartFilled className='card-link-icon' /> <Link to={''}>Тренировки</Link>
                </div>
            </div>
            <div className='card-wrapper'>
                <Text className='card-title'>Назначить календарь</Text>
                <div className='card-link'>
                    <img src={calendarOutlinedIcon} alt='calendar' className='card-link-icon' />
                    <Link to={Paths.CALENDAR} data-test-id={DATA_TEST_ID.menuButtonCalendar}>
                        Календарь
                    </Link>
                </div>
            </div>
            <div className='card-wrapper'>
                <Text className='card-title'>Заполнить профиль</Text>
                <div className='card-link'>
                    <IdcardOutlined className='card-link-icon' /> <Link to={''}>Профиль</Link>
                </div>
            </div>
        </div>
    );
};
export default MainCards;
