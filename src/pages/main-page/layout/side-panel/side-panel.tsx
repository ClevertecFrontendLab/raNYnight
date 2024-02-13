import Sider from 'antd/lib/layout/Sider';
import headerLogo from '/cleverfit.svg';

import CollapseButton from './collapse-button/collapse-button';
import NavPanel from './nav-panel/nav-panel';
import ExitButton from './exit-button/exit-button';

import './side-panel.less';

const SidePanel = () => {
    const onCollapse = () => {
        console.log('onCollapse');
    };
    return (
        <Sider className='side-panel'>
            <img src={headerLogo} alt='logo' className='side-panel-logo' />
            <NavPanel />
            <ExitButton />
            <CollapseButton onClick={onCollapse} />
        </Sider>
    );
};

export default SidePanel;
