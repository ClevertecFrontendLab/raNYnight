import Link from 'antd/lib/typography/Link';
import { Paths } from '@router/paths';
import './login.less';

const Login: React.FC = () => {
    return (
        <>
            <div> Вход </div>
            <Link href={Paths.AUTH}> Авторизация </Link>
        </>
    );
};

export default Login;
