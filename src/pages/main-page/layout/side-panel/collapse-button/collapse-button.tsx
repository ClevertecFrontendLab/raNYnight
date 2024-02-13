import { MenuFoldOutlined } from '@ant-design/icons';

import './collapse-button.less';

interface CollapseButtonProps {
    onClick: () => void;
}

const CollapseButton = ({ onClick }: CollapseButtonProps) => {
    return (
        <div className='side-panel-collapse-button' data-test-id='sider-switch' onClick={onClick}>
            <MenuFoldOutlined className='side-panel-collapse-icon' />
        </div>
    );
};

export default CollapseButton;
