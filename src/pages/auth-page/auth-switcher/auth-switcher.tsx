import { Link } from 'react-router-dom';

import { Paths } from '@router/paths';

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
                to={`${Paths.AUTH}/${Paths.REGISTRATION}`}
                className={`auth-switcher-link ${activeLink === 'registration' ? 'active' : ''}`}
            >
                Регистрация
            </Link>
        </div>
    );
};

export default AuthSwitcher;
