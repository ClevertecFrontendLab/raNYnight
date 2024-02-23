import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { BREAKPOINT_520 } from '@constants/breakpoints';
import { useWindowSize } from 'usehooks-ts';

import './collapse-button.less';

interface CollapseButtonProps {
    onClick: () => void;
    isCollapsed: boolean;
}

const CollapseButton = ({ onClick, isCollapsed }: CollapseButtonProps) => {
    const { width } = useWindowSize();

    return (
        <div
            className='side-panel-collapse-button'
            onClick={onClick}
            data-test-id={width < BREAKPOINT_520 ? 'sider-switch-mobile' : 'sider-switch'}
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
