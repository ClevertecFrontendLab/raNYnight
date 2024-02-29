import { useEffect } from 'react';
import { useAppDispatch } from '@hooks/index';
import { setAuthToken } from '@redux/auth/authSlice';
import { history } from '@redux/configure-store';
import { routes } from '@router/routes';
import { HistoryRouter as Router } from 'redux-first-history/rr6';

export const App = () => {
    const dispatch = useAppDispatch();

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
        const token = localStorage.getItem('jwtToken');
        if (token) {
            dispatch(setAuthToken(token));
        }
    }, []);
    return <Router history={history}>{routes}</Router>;
};
