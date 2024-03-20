import { Typography } from 'antd';
import { NavLink } from 'react-router-dom';

import './nav-link-with-icon.less';

const { Text } = Typography;

interface NavLinkWithIconProps {
    linkTo: string;
    icon: JSX.Element | null;
    text: string;
    isCollapsed: boolean;
}

const NavLinkWithIcon = ({ linkTo, icon, text, isCollapsed }: NavLinkWithIconProps) => (
    <NavLink to={linkTo} className='nav-link'>
        {icon}
        {isCollapsed ? null : <Text>{text}</Text>}
    </NavLink>
);

export default NavLinkWithIcon;
