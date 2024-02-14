import Sider from 'antd/lib/layout/Sider';
import { useState } from 'react';
import { useWindowSize } from 'usehooks-ts';
import headerLogo from '/cleverfit-logo.svg';
import headerLogoCollaped from '/cleverfit-logo-collapsed.svg';

import CollapseButton from './collapse-button/collapse-button';
import ExitButton from './exit-button/exit-button';
import NavPanel from './nav-panel/nav-panel';
import {
    SIDER_WIDTH_MOBILE,
    SIDER_WIDTH_DEFAULT,
    SIDER_WIDTH_COLLAPSED_MOBILE,
    SIDER_WIDTH_COLLAPSED_DEFAULT,
} from '@constants/sizes';
import { BREAKPOINT_520 } from '@constants/breakpoints';

import './side-panel.less';

const SidePanel = () => {
    const { width } = useWindowSize();
    const [isCollapsed, setIsCollapsed] = useState(width < 520 ? true : false);
    const onCollapse = () => {
        setIsCollapsed(!isCollapsed);
    };
    return (
        <Sider
            width={width < BREAKPOINT_520 ? SIDER_WIDTH_MOBILE : SIDER_WIDTH_DEFAULT}
            collapsed={isCollapsed}
            collapsedWidth={
                width < BREAKPOINT_520
                    ? SIDER_WIDTH_COLLAPSED_MOBILE
                    : SIDER_WIDTH_COLLAPSED_DEFAULT
            }
            collapsible
            trigger={null}
            breakpoint='xl'
            className={`side-panel ${isCollapsed ? 'side-panel-collapsed' : ''}`}
        >
            <div
                className='side-panel-logo'
                style={{ backgroundImage: `url(${isCollapsed ? headerLogoCollaped : headerLogo})` }}
            ></div>
            <NavPanel isCollapsed={isCollapsed} />
            <ExitButton isCollapsed={isCollapsed} />
            <CollapseButton onClick={onCollapse} isCollapsed={isCollapsed} />
        </Sider>
    );
};

export default SidePanel;
