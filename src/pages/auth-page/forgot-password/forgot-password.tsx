import Link from 'antd/lib/typography/Link';
import './forgot-password.less';
import Paths from '@router/paths';

const ForgotPassword: React.FC = () => {
    return (
        <>
            <div>ForgotPassword</div>
            <Link href={Paths.AUTH}> Авторизация </Link>
        </>
    );
};

export default ForgotPassword;
