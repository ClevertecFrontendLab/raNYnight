import { CalendarOutlined, HeartFilled, IdcardOutlined, TrophyFilled } from '@ant-design/icons';
import { BREAKPOINT_520 } from '@constants/breakpoints';
import { Paths } from '@router/paths';
import { useWindowSize } from 'usehooks-ts';

import NavLinkWithIcon from './nav-link-with-icon/nav-link-with-icon';

import './nav-panel.less';

interface NavPanelProps {
    isCollapsed: boolean;
}

const NavPanel = ({ isCollapsed }: NavPanelProps) => {
    const { width } = useWindowSize();

    const navLinks = [
        {
            linkTo: Paths.CALENDAR,
            icon: width <= BREAKPOINT_520 ? null : <CalendarOutlined />,
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
            linkTo: Paths.PROFILE,
            icon: width <= BREAKPOINT_520 ? null : <IdcardOutlined />,
            text: 'Профиль',
        },
    ];

    return (
        <nav className={`side-panel-nav  ${isCollapsed ? 'side-panel-nav-collapsed' : ''}`}>
            {navLinks.map((navLink) => (
                <NavLinkWithIcon
                    key={navLink.linkTo}
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
