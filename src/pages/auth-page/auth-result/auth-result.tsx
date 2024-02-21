import { Paths } from '@router/paths';
import { Button, Typography } from 'antd';
import { Link, Navigate, useLocation } from 'react-router-dom';

import './auth-result.less';

const { Text } = Typography;

interface AuthResultProps {
    title: string;
    message: string;
    action: string;
    image: JSX.Element | null;
    href: string;
    previousPathToCheck: string;
    dataTestId?: string;
}

const AuthResult = ({
    title,
    message,
    action,
    image,
    href,
    previousPathToCheck,
    dataTestId,
}: AuthResultProps) => {
    const location = useLocation();

    const prevPath: string = location.state?.prevPath ?? '';

    if (!prevPath || prevPath !== previousPathToCheck) {
        return <Navigate to={Paths.AUTH} />;
    }

    return (
        <div className='auth-result-wrapper'>
            <div className='auth-result-image'>{image}</div>
            <Text className='auth-result-title'>{title}</Text>
            <Text className='auth-result-message'>{message}</Text>
            <Button
                type='primary'
                htmlType='submit'
                className='auth-result-button'
                data-test-id={dataTestId}
            >
                <Link to={`/auth/${href}`} state={{ prevPath: location.pathname }}>
                    {action}
                </Link>
            </Button>
        </div>
    );
};

export default AuthResult;
