import { HeartFilled, TrophyFilled, IdcardOutlined } from '@ant-design/icons';
import calendarOutlinedIcon from '/calendar-icon.svg';
import Link from 'antd/lib/typography/Link';
import { Typography } from 'antd';

import './nav-panel.less';

const { Text } = Typography;

const NavPanel = () => {
    return (
        <nav className='side-panel-nav'>
            <Link className='nav-link'>
                <img src={calendarOutlinedIcon} alt='calendar' />
                <Text>Календарь</Text>
            </Link>
            <Link className='nav-link'>
                <HeartFilled /> <Text>Тренировки</Text>
            </Link>
            <Link className='nav-link'>
                <TrophyFilled /> <Text>Достижения</Text>
            </Link>
            <Link className='nav-link'>
                <IdcardOutlined /> <Text>Профиль</Text>
            </Link>
        </nav>
    );
};

export default NavPanel;
