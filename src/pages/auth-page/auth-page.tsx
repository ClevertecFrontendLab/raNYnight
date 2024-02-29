import { Navigate, Outlet } from 'react-router-dom';
import { useAppSelector } from '@hooks/typed-react-redux-hooks';
import { selectAuthToken } from '@redux/auth/authSlice';
import { Paths } from '@router/paths';
import { Layout } from 'antd';

import './auth-page.less';

export const AuthPage: React.FC = () => {
    const auth = useAppSelector(selectAuthToken);

    return (
        <Layout className='auth-page-layout background-filter'>
            {auth ? <Navigate to={Paths.MAIN} /> : <Outlet />}
        </Layout>
    );
};
