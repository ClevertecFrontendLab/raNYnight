import { useEffect } from 'react';
import ModalManager from '@components/modal-manager/modal-manager';
import { useAppDispatch, useAppSelector } from '@hooks/index';
import { setAuthToken } from '@redux/auth/auth-slice';
import { history } from '@redux/configure-store';
import { routes } from '@router/routes';
import { HistoryRouter as Router } from 'redux-first-history/rr6';
import { useLazyGetUserInfoQuery } from '@redux/profile/profile-api';
import Loader from '@components/loader/loader';
import { selectShouldRefetch, setShouldRefetch } from '@redux/profile/profile-slice';

export const App = () => {
    const dispatch = useAppDispatch();
    const shouldRefetch = useAppSelector(selectShouldRefetch);

    const googleAccessToken = history.location.search.split('=')[1];
    const token = localStorage.getItem('jwtToken');

    const [getuserInfo, { isLoading }] = useLazyGetUserInfoQuery();

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
        if (token || googleAccessToken) {
            getuserInfo();
        }
    }, []);

    useEffect(() => {
        if (!token && !googleAccessToken) {
            return;
        }

        if (shouldRefetch) {
            getuserInfo()
                .unwrap()
                .then(() => dispatch(setShouldRefetch(false)));
        }
    }, [token, googleAccessToken, shouldRefetch]);

    return (
        <Router history={history}>
            {isLoading && <Loader />}
            <ModalManager />
            {routes}
        </Router>
    );
};
