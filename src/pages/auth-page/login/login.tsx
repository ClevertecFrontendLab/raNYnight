import Link from 'antd/lib/typography/Link';
import './login.less';
import Paths from '@router/paths';

const Login: React.FC = () => {
    return (
        <>
            <div>Forgot password</div>
            <Link href={Paths.AUTH}> Авторизация </Link>
        </>
    );
};

export default Login;
