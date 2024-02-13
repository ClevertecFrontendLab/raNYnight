import { HeartFilled, IdcardOutlined, TrophyFilled } from '@ant-design/icons';
import calendarOutlinedIcon from '/calendar-icon.svg';

import NavLinkWithIcon from './nav-link-with-icon/nav-link-with-icon';
import './nav-panel.less';

interface NavPanelProps {
    isCollapsed: boolean;
}

const NavPanel = ({ isCollapsed }: NavPanelProps) => {
    return (
        <nav className={`side-panel-nav  ${isCollapsed ? 'side-panel-nav-collapsed' : ''}`}>
            <NavLinkWithIcon
                linkTo='/calendar'
                icon={<img src={calendarOutlinedIcon} alt='calendar' />}
                text='Календарь'
                isCollapsed={isCollapsed}
            />
            <NavLinkWithIcon
                linkTo='/trainings'
                icon={<HeartFilled />}
                text='Тренировки'
                isCollapsed={isCollapsed}
            />
            <NavLinkWithIcon
                linkTo='/coaches'
                icon={<TrophyFilled />}
                text='Достижения'
                isCollapsed={isCollapsed}
            />
            <NavLinkWithIcon
                linkTo='/profile'
                icon={<IdcardOutlined />}
                text='Профиль'
                isCollapsed={isCollapsed}
            />
        </nav>
    );
};

export default NavPanel;
