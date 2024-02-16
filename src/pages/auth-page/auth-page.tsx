import Link from 'antd/lib/typography/Link';

import './auth-page.less';
import Paths from '@router/paths';

export const AuthPage: React.FC = () => {
    return (
        <>
            <div>AuthPage</div>
            <Link href={Paths.REGISTRATION}> Регистрация </Link>
            <Link href={Paths.LOGIN}> Вход </Link>
            <Link href={Paths.FORGOT_PASSWORD}> Забыли пароль </Link>
        </>
    );
};
