import { Navigate, Outlet } from 'react-router-dom';
import { useAppSelector } from '@hooks/typed-react-redux-hooks';
import { selectAuthToken } from '@redux/auth/auth-slice';

import { Paths } from './paths';

const PrivateRoutes = () => {
    const token = useAppSelector(selectAuthToken);

    return token ? <Outlet /> : <Navigate to={Paths.AUTH} />;
};

export default PrivateRoutes;
