import { Navigate, Outlet } from 'react-router-dom';

import { Paths } from './paths';

const PrivateRoutes = () => {
    const token = sessionStorage.getItem('jwtToken') || localStorage.getItem('jwtToken');
    return token ? <Outlet /> : <Navigate to={Paths.AUTH} />;
};

export default PrivateRoutes;
