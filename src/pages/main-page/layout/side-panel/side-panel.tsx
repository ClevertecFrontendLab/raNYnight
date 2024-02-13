import Sider from 'antd/lib/layout/Sider';
import { useState } from 'react';
import { useWindowSize } from 'usehooks-ts';
import headerLogo from '/cleverfit-logo.svg';
import headerLogoCollaped from '/cleverfit-logo-collapsed.svg';

import CollapseButton from './collapse-button/collapse-button';
import ExitButton from './exit-button/exit-button';
import NavPanel from './nav-panel/nav-panel';

import './side-panel.less';

const SidePanel = () => {
    const { width } = useWindowSize();
    const [isCollapsed, setIsCollapsed] = useState(width < 520 ? true : false);
    const onCollapse = () => {
        setIsCollapsed(!isCollapsed);
    };
    return (
        <Sider
            width={width < 520 ? 106 : 208}
            collapsed={isCollapsed}
            collapsedWidth={width < 520 ? 0 : 64}
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
