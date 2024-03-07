import { Typography } from 'antd';

import './nav-link-with-icon.less';
import { Link } from 'react-router-dom';

const { Text } = Typography;

interface NavLinkWithIconProps {
    linkTo: string;
    icon: JSX.Element | null;
    text: string;
    isCollapsed: boolean;
}

const NavLinkWithIcon = ({ linkTo, icon, text, isCollapsed }: NavLinkWithIconProps) => (
    <Link to={linkTo} className='nav-link'>
        {icon}
        {isCollapsed ? null : <Text>{text}</Text>}
    </Link>
);

export default NavLinkWithIcon;
