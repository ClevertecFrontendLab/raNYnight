import { Navigate, Outlet } from 'react-router-dom';

import { Layout } from 'antd';

import { useAppSelector } from '@hooks/typed-react-redux-hooks';
import { selectAuthToken } from '@redux/auth/authSlice';
import { Paths } from '@router/paths';

import './results-page.less';

export const ResultsPage: React.FC = () => {
    const auth = useAppSelector(selectAuthToken);

    return (
        <Layout className='results-page-layout background-filter'>
            {auth ? <Navigate to={Paths.MAIN} /> : <Outlet />}
        </Layout>
    );
};
