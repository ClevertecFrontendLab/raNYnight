import { useAppDispatch } from '@hooks/index';
import { setAuthToken } from '@redux/auth/auth-slice';
import { history } from '@redux/configure-store';
import { setAllModalsToFalse } from '@redux/modals/modals-slice';
import { routes } from '@router/routes';
import { useEffect } from 'react';
import { HistoryRouter as Router } from 'redux-first-history/rr6';

export const App = () => {
    const dispatch = useAppDispatch();
    const googleAccessToken = history.location.search.split('=')[1];

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
        const handleResize = () => {
            dispatch(setAllModalsToFalse());
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    useEffect(() => {
        const token = localStorage.getItem('jwtToken');
        if (googleAccessToken) {
            dispatch(setAuthToken(googleAccessToken));
        }
        if (token) {
            dispatch(setAuthToken(token));
        }
    }, []);

    return <Router history={history}>{routes}</Router>;
};
