import { Navigate, Outlet } from 'react-router-dom';
import { useAppSelector } from '@hooks/typed-react-redux-hooks';
import { selectAuthToken } from '@redux/auth/auth-slice';
import { Paths } from '@router/paths';
import { Layout } from 'antd';

import './results-page.less';

export const ResultsPage: React.FC = () => {
    const auth = useAppSelector(selectAuthToken);

    return (
        <Layout className='results-page-layout background-filter'>
            {auth ? <Navigate to={Paths.MAIN} /> : <Outlet />}
        </Layout>
    );
};
