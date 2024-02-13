import exitIcon from '/exit-icon.svg';
import { Typography } from 'antd';

import './exit-button.less';

const { Text } = Typography;

interface ExitButtonProps {
    onClick?: () => void;
}

const ExitButton = ({ onClick }: ExitButtonProps) => {
    return (
        <div className='side-panel-exit-button' onClick={onClick}>
            <img src={exitIcon} alt='exitIcon' />
            <Text>Выход</Text>
        </div>
    );
};

export default ExitButton;
