import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';

import './collapse-button.less';

interface CollapseButtonProps {
    onClick: () => void;
    isCollapsed: boolean;
}

const CollapseButton = ({ onClick, isCollapsed }: CollapseButtonProps) => {
    return (
        <div className='side-panel-collapse-button' data-test-id='sider-switch' onClick={onClick}>
            {isCollapsed ? (
                <MenuUnfoldOutlined className='side-panel-collapse-icon' />
            ) : (
                <MenuFoldOutlined className='side-panel-collapse-icon' />
            )}
        </div>
    );
};

export default CollapseButton;
