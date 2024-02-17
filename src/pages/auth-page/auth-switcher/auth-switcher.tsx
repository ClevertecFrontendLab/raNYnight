import { Paths } from '@router/paths';
import { Link } from 'react-router-dom';

import './auth-switcher.less';

interface AuthSwitcherProps {
    activeLink: string;
}

const AuthSwitcher = ({ activeLink }: AuthSwitcherProps) => {
    return (
        <div className='auth-switcher'>
            <Link
                to={Paths.AUTH}
                className={`auth-switcher-link ${activeLink === 'login' ? 'active' : ''}`}
            >
                Вход
            </Link>
            <Link
                to={Paths.REGISTRATION}
                className={`auth-switcher-link ${activeLink === 'registration' ? 'active' : ''}`}
            >
                Регистрация
            </Link>
        </div>
    );
};

export default AuthSwitcher;
