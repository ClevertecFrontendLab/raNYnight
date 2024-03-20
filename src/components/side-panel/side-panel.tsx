import { useState } from 'react';
import { BREAKPOINT_520 } from '@constants/breakpoints';
import {
    SIDER_WIDTH_COLLAPSED_DEFAULT,
    SIDER_WIDTH_COLLAPSED_MOBILE,
    SIDER_WIDTH_DEFAULT,
    SIDER_WIDTH_MOBILE,
} from '@constants/sizes';
import Sider from 'antd/lib/layout/Sider';
import { useWindowSize } from 'usehooks-ts';

import CollapseButton from './collapse-button/collapse-button';
import ExitButton from './exit-button/exit-button';
import NavPanel from './nav-panel/nav-panel';

import './side-panel.less';

import headerLogo from '/cleverfit-logo.svg';
import headerLogoCollaped from '/cleverfit-logo-collapsed.svg';

const SidePanel = () => {
    const { width } = useWindowSize();
    const [isCollapsed, setIsCollapsed] = useState(width < BREAKPOINT_520 ? true : false);

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
            // breakpoint='xs'
            // onBreakpoint={() => setIsCollapsed(true)}
            className={`side-panel ${isCollapsed ? 'side-panel-collapsed' : ''}`}
        >
            <div
                className={`side-panel-logo ${isCollapsed ? 'logo-collapsed' : ''}`}
                style={{ backgroundImage: `url(${isCollapsed ? headerLogoCollaped : headerLogo})` }}
            />
            <NavPanel isCollapsed={isCollapsed} />
            <ExitButton isCollapsed={isCollapsed} />
            <CollapseButton onClick={onCollapse} isCollapsed={isCollapsed} />
        </Sider>
    );
};

export default SidePanel;
