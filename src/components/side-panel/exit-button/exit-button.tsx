import { BREAKPOINT_520 } from '@constants/breakpoints';
import { useAppDispatch } from '@hooks/typed-react-redux-hooks';
import { setAuthToken, setRememberMe } from '@redux/auth/auth-slice';
import { Paths } from '@router/paths';
import { Typography } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useWindowSize } from 'usehooks-ts';

import './exit-button.less';

import { setUserInfo } from '@redux/profile/profile-slice';
import exitIcon from '/exit-icon.svg';

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
        dispatch(setRememberMe(false));
        dispatch(setUserInfo(null));
        navigate(Paths.AUTH);
    };

    return (
        <div
            onClick={handleExit}
            className={`side-panel-exit-button ${
                isCollapsed ? 'side-panel-exit-button-collapsed' : ''
            }`}
        >
            {width < BREAKPOINT_520 ? null : <img src={exitIcon} alt='exitIcon' />}
            {isCollapsed ? null : <Text className='side-panel-exit-text'>Выход</Text>}
        </div>
    );
};

export default ExitButton;
