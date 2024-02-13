import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
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
            data-test-id={width < 520 ? 'sider-switch-mobile' : 'sider-switch'}
        >
            {isCollapsed ? (
                <MenuUnfoldOutlined
                    className='side-panel-collapse-icon'
                    // data-test-id={width < 520 ? 'sider-switch-mobile' : 'sider-switch'}
                />
            ) : (
                <MenuFoldOutlined
                    className='side-panel-collapse-icon'
                    // data-test-id={width < 520 ? 'sider-switch-mobile' : 'sider-switch'}
                />
            )}
        </div>
    );
};

export default CollapseButton;
