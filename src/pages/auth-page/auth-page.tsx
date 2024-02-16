import { Paths } from '@router/paths';
import './auth-page.less';
import { Link, Outlet } from 'react-router-dom';

export const AuthPage: React.FC = () => {
    return (
        <>
            <div>AuthPage</div>
            <Link to={Paths.REGISTRATION}> Регистрация </Link>
            <Link to={Paths.LOGIN}> Вход </Link>
            <Link to={Paths.FORGOT_PASSWORD}> Забыли пароль </Link>
            <Outlet />
        </>
    );
};
