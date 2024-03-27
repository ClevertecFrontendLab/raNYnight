import { useEffect } from 'react';
import Loader from '@components/loader/loader';
import ModalManager from '@components/modal-manager/modal-manager';
import { useAppDispatch } from '@hooks/index';
import { setAuthToken } from '@redux/auth/auth-slice';
import { history } from '@redux/configure-store';
import { useLazyGetUserInfoQuery } from '@redux/profile/profile-api';
import { routes } from '@router/routes';
import { HistoryRouter as Router } from 'redux-first-history/rr6';

export const App = () => {
    const dispatch = useAppDispatch();

    const googleAccessToken = history.location.search.split('=')[1];
    const token = localStorage.getItem('jwtToken') || sessionStorage.getItem('jwtToken');

    const [getUserInfo, { data, isLoading }] = useLazyGetUserInfoQuery();

    useEffect(() => {
        if (!data && token) {
            getUserInfo();
        }
    });

    useEffect(() => {
        const clearSessionStorage = () => {
            sessionStorage.clear();
        };
        const handleBeforeUnload = () => {
            clearSessionStorage();
        };

        window.addEventListener('beforeunload', handleBeforeUnload);

        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, []);

    useEffect(() => {
        if (googleAccessToken) {
            dispatch(setAuthToken(googleAccessToken));
        }
        if (token) {
            dispatch(setAuthToken(token));
        }
    }, []);

    return (
        <Router history={history}>
            <ModalManager />
            {isLoading && <Loader />}
            {routes}
        </Router>
    );
};
