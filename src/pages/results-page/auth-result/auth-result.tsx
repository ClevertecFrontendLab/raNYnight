import { Link, Navigate, useLocation } from 'react-router-dom';

import { Button, Typography } from 'antd';

import { Paths } from '@router/paths';

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
    className?: string;
}

const AuthResult = ({
    title,
    message,
    action,
    image,
    href,
    previousPathToCheck,
    dataTestId,
    className,
}: AuthResultProps) => {
    const location = useLocation();

    const prevPath: string = location.state?.prevPath ?? '';
    const normalizedPrevPathname = prevPath.endsWith('/') ? prevPath.slice(0, -1) : prevPath;

    if (!prevPath || normalizedPrevPathname !== previousPathToCheck) {
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
                className={`auth-result-button ${className ?? ''}`}
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
