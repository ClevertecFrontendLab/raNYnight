import { Button, Typography } from 'antd';
import { Link, Navigate } from 'react-router-dom';
import { selectPreviousPath } from '@redux/configure-store';
import { shouldRedirect } from '@router/should-redirect';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '@hooks/typed-react-redux-hooks';
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
}

const AuthResult = ({
    title,
    message,
    action,
    image,
    href,
    previousPathToCheck,
}: AuthResultProps) => {
    // const navigate = useNavigate();
    const previousRouterPath = useAppSelector(selectPreviousPath);

    // useEffect(() => {
    //     console.log('previousRouterPath === ', previousRouterPath);
    //     console.log('previousPathToCheck === ', previousPathToCheck);
    //     console.log(
    //         'shouldRedirect === ',
    //         shouldRedirect(previousRouterPath!, previousPathToCheck),
    //     );

    //     // if(previousRouterPath !== previousPathToCheck) {
    //     //     navigate(Paths.AUTH);
    //     // }
    // }, []);

    if (!previousRouterPath || shouldRedirect(previousRouterPath, previousPathToCheck)) {
        console.log('previousRouterPath === ', previousRouterPath);
        console.log('previousPathToCheck === ', previousPathToCheck);

        console.log('we should redirect to auth');
        return <Navigate to={Paths.AUTH} />;
        // navigate(Paths.AUTH);
    }

    return (
        <div className='auth-result-wrapper'>
            <div className='auth-result-image'>{image}</div>
            <Text className='auth-result-title'>{title}</Text>
            <Text className='auth-result-message'>{message}</Text>
            <Button type='primary' htmlType='submit' className='auth-result-button'>
                <Link to={`/auth/${href}`}>{action}</Link>
            </Button>
        </div>
    );
};

export default AuthResult;
