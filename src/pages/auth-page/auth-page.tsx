import { Layout } from 'antd';
import { Outlet } from 'react-router-dom';

import './auth-page.less';

export const AuthPage: React.FC = () => {
    return (
        <Layout className='auth-page-layout background-filter'>
            <Outlet />
        </Layout>
    );
};
