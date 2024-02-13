import Sider from 'antd/lib/layout/Sider';
import { useState } from 'react';
import headerLogo from '/cleverfit-logo.svg';
import headerLogoCollaped from '/cleverfit-logo-collapsed.svg';

import CollapseButton from './collapse-button/collapse-button';
import ExitButton from './exit-button/exit-button';
import NavPanel from './nav-panel/nav-panel';

import './side-panel.less';

const SidePanel = () => {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const onCollapse = () => {
        setIsCollapsed(!isCollapsed);
    };
    return (
        <Sider
            width={208}
            collapsed={isCollapsed}
            collapsedWidth={64}
            collapsible
            trigger={null}
            breakpoint='xl'
            className={`side-panel ${isCollapsed ? 'side-panel-collapsed' : ''}`}
        >
            {/* <img
                src={isCollapsed ? headerLogoCollaped : headerLogo}
                alt='logo'
                className='side-panel-logo'
            /> */}
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
