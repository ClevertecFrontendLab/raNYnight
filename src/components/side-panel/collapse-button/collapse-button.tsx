import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { BREAKPOINT_520 } from '@constants/breakpoints';
import { DATA_TEST_ID } from '@constants/data-test-id';
import { useWindowSize } from 'usehooks-ts';

import './collapse-button.less';

interface CollapseButtonProps {
    onClick: () => void;
    isCollapsed: boolean;
}

const CollapseButton = ({ onClick, isCollapsed }: CollapseButtonProps) => {
    const { width } = useWindowSize();
    const { siderSwitch, siderSwitchMobile } = DATA_TEST_ID;

    return (
        <div
            className='side-panel-collapse-button'
            onClick={onClick}
            onKeyDown={onClick}
            role='button'
            tabIndex={0}
            data-test-id={width < BREAKPOINT_520 ? siderSwitchMobile : siderSwitch}
        >
            {isCollapsed ? (
                <MenuUnfoldOutlined className='side-panel-collapse-icon' />
            ) : (
                <MenuFoldOutlined className='side-panel-collapse-icon' />
            )}
        </div>
    );
};

export default CollapseButton;
