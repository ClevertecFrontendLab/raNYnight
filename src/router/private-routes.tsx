import { Navigate, Outlet } from 'react-router-dom';

import { useAppSelector } from '@hooks/typed-react-redux-hooks';
import { selectAuthToken } from '@redux/auth/authSlice';

import { Paths } from './paths';

const PrivateRoutes = () => {
    const auth = useAppSelector(selectAuthToken);

    return auth ? <Outlet /> : <Navigate to={Paths.AUTH} />;
};

export default PrivateRoutes;
