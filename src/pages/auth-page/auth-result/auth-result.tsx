import { useAppSelector } from '@hooks/typed-react-redux-hooks';
import { selectPreviousPath } from '@redux/configure-store';
import { Paths } from '@router/paths';
import { shouldRedirect } from '@router/should-redirect';
import { Button, Typography } from 'antd';
import { Link, Navigate } from 'react-router-dom';

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
    const previousRouterPath = useAppSelector(selectPreviousPath);

    if (!previousRouterPath || shouldRedirect(previousRouterPath, previousPathToCheck)) {
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
                <Link to={`/auth/${href}`}>{action}</Link>
            </Button>
        </div>
    );
};

export default AuthResult;
