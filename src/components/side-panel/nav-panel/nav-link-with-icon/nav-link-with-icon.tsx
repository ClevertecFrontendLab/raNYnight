import { NavLink, useLocation } from 'react-router-dom';
import { Typography } from 'antd';

import './nav-link-with-icon.less';

const { Text } = Typography;

interface NavLinkWithIconProps {
    linkTo: string;
    icon: JSX.Element | null;
    text: string;
    isCollapsed: boolean;
}

const NavLinkWithIcon = ({ linkTo, icon, text, isCollapsed }: NavLinkWithIconProps) => {
    const location = useLocation();

    return (
        <NavLink to={linkTo} className='nav-link' state={{ prevPath: location.pathname }}>
            {icon}
            {isCollapsed ? null : <Text>{text}</Text>}
        </NavLink>
    );
};

export default NavLinkWithIcon;
