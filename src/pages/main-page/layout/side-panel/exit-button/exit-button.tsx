import exitIcon from '/exit-icon.svg';
import { Typography } from 'antd';

import './exit-button.less';

const { Text } = Typography;

interface ExitButtonProps {
    onClick?: () => void;
    isCollapsed: boolean;
}

const ExitButton = ({ onClick, isCollapsed }: ExitButtonProps) => {
    return (
        <div
            className={`side-panel-exit-button ${
                isCollapsed ? 'side-panel-exit-button-collapsed' : ''
            }`}
            onClick={onClick}
        >
            <img src={exitIcon} alt='exitIcon' />
            {isCollapsed ? null : <Text className='side-panel-exit-text'>Выход</Text>}
        </div>
    );
};

export default ExitButton;
