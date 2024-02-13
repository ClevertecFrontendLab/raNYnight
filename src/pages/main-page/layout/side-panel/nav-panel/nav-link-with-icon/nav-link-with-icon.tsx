import Link from 'antd/lib/typography/Link';
import { Typography } from 'antd';

import './nav-link-with-icon.less';

const { Text } = Typography;

interface NavLinkWithIconProps {
    linkTo: string;
    icon: JSX.Element;
    text: string;
    isCollapsed: boolean;
}

const NavLinkWithIcon = ({ linkTo, icon, text, isCollapsed }: NavLinkWithIconProps) => {
    return (
        <Link href={linkTo} className='nav-link'>
            {icon}
            {isCollapsed ? null : <Text>{text}</Text>}
        </Link>
    );
};

export default NavLinkWithIcon;
