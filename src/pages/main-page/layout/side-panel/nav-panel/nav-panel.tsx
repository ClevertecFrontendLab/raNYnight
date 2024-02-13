import { HeartFilled, IdcardOutlined, TrophyFilled } from '@ant-design/icons';
import calendarOutlinedIcon from '/calendar-icon.svg';
import { useWindowSize } from 'usehooks-ts';
import NavLinkWithIcon from './nav-link-with-icon/nav-link-with-icon';

import './nav-panel.less';

interface NavPanelProps {
    isCollapsed: boolean;
}

const NavPanel = ({ isCollapsed }: NavPanelProps) => {
    const { width } = useWindowSize();

    return (
        <nav className={`side-panel-nav  ${isCollapsed ? 'side-panel-nav-collapsed' : ''}`}>
            <NavLinkWithIcon
                linkTo='/calendar'
                icon={width < 520 ? null : <img src={calendarOutlinedIcon} alt='calendar' />}
                text='Календарь'
                isCollapsed={isCollapsed}
            />
            <NavLinkWithIcon
                linkTo='/trainings'
                icon={width < 520 ? null : <HeartFilled />}
                text='Тренировки'
                isCollapsed={isCollapsed}
            />
            <NavLinkWithIcon
                linkTo='/coaches'
                icon={width < 520 ? null : <TrophyFilled />}
                text='Достижения'
                isCollapsed={isCollapsed}
            />
            <NavLinkWithIcon
                linkTo='/profile'
                icon={width < 520 ? null : <IdcardOutlined />}
                text='Профиль'
                isCollapsed={isCollapsed}
            />
        </nav>
    );
};

export default NavPanel;
