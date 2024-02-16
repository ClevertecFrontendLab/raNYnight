import { Paths } from '../../../router/paths';
import './registration.less';
import Link from 'antd/lib/typography/Link';

const Registration: React.FC = () => {
    return (
        <>
            <div>Registration</div>
            <Link href={Paths.AUTH}> Авторизация </Link>
        </>
    );
};

export default Registration;
