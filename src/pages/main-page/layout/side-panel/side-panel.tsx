import { HeartFilled, IdcardOutlined, TrophyFilled } from '@ant-design/icons';
import { Typography } from 'antd';
import Sider from 'antd/lib/layout/Sider';
import calendarOutlinedIcon from '/calendar-icon.svg';
import headerLogo from '/cleverfit.svg';
import exitIcon from '/exit-icon.svg';

import './side-panel.less';
import Link from 'antd/lib/typography/Link';

const { Text } = Typography;

const SidePanel = () => {
    return (
        <Sider className='side-panel'>
            <img src={headerLogo} alt='logo' className='side-panel-logo' />
            <nav className='side-panel-nav'>
                <Link className='nav-link'>
                    <img src={calendarOutlinedIcon} alt='calendar' />
                    <Text>Календарь</Text>
                </Link>
                <Link className='nav-link'>
                    <HeartFilled style={{ color: '#003a8c' }} /> <Text>Тренировки</Text>
                </Link>
                <Link className='nav-link'>
                    <TrophyFilled style={{ color: '#003a8c' }} /> <Text>Достижения</Text>
                </Link>
                <Link className='nav-link'>
                    <IdcardOutlined style={{ color: '#003a8c' }} /> <Text>Профиль</Text>
                </Link>
            </nav>
            <div className='side-panel-exit-button'>
                <img src={exitIcon} alt='exitIcon' />
                <Text>Выход</Text>
            </div>
        </Sider>
    );
};

export default SidePanel;
