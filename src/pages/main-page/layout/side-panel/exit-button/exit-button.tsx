import exitIcon from '/exit-icon.svg';
import { Typography } from 'antd';
import { useWindowSize } from 'usehooks-ts';
import { BREAKPOINT_520 } from '@constants/breakpoints';
import { useNavigate } from 'react-router-dom';
import { Paths } from '@router/paths';
import { useAppDispatch } from '@hooks/typed-react-redux-hooks';

import './exit-button.less';
import { setAuthToken } from '@redux/auth/authSlice';

const { Text } = Typography;

interface ExitButtonProps {
    isCollapsed: boolean;
}

const ExitButton = ({ isCollapsed }: ExitButtonProps) => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { width } = useWindowSize();
    const handleExit = () => {
        localStorage.getItem('jwtToken') && localStorage.removeItem('jwtToken');
        sessionStorage.getItem('jwtToken') && sessionStorage.removeItem('jwtToken');
        dispatch(setAuthToken(null));
        navigate(Paths.AUTH, { state: { prevPath: Paths.MAIN } });
    };

    return (
        <div
            className={`side-panel-exit-button ${
                isCollapsed ? 'side-panel-exit-button-collapsed' : ''
            }`}
        >
            {width < BREAKPOINT_520 ? null : <img src={exitIcon} alt='exitIcon' />}
            {isCollapsed ? null : (
                <Text className='side-panel-exit-text' onClick={handleExit}>
                    Выход
                </Text>
            )}
        </div>
    );
};

export default ExitButton;
