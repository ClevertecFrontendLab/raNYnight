import { HeartFilled, IdcardOutlined, TrophyFilled } from '@ant-design/icons';
import { BREAKPOINT_520 } from '@constants/breakpoints';
import { useWindowSize } from 'usehooks-ts';

import NavLinkWithIcon from './nav-link-with-icon/nav-link-with-icon';

import './nav-panel.less';

import calendarOutlinedIcon from '/calendar-icon.svg';

interface NavPanelProps {
    isCollapsed: boolean;
}

const NavPanel = ({ isCollapsed }: NavPanelProps) => {
    const { width } = useWindowSize();

    const navLinks = [
        {
            linkTo: '/calendar',
            icon:
                width <= BREAKPOINT_520 ? null : <img src={calendarOutlinedIcon} alt='calendar' />,
            text: 'Календарь',
        },
        {
            linkTo: '/trainings',
            icon: width <= BREAKPOINT_520 ? null : <HeartFilled />,
            text: 'Тренировки',
        },
        {
            linkTo: '/achievments',
            icon: width <= BREAKPOINT_520 ? null : <TrophyFilled />,
            text: 'Достижения',
        },
        {
            linkTo: '/profile',
            icon: width <= BREAKPOINT_520 ? null : <IdcardOutlined />,
            text: 'Профиль',
        },
    ];

    return (
        <nav className={`side-panel-nav  ${isCollapsed ? 'side-panel-nav-collapsed' : ''}`}>
            {navLinks.map((navLink, index) => (
                <NavLinkWithIcon
                    key={index}
                    linkTo={navLink.linkTo}
                    icon={navLink.icon}
                    text={navLink.text}
                    isCollapsed={isCollapsed}
                />
            ))}
        </nav>
    );
};

export default NavPanel;
