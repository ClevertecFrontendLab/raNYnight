import { HistoryRouter as Router } from 'redux-first-history/rr6';
import { history } from '@redux/configure-store';
import { routes } from '@router/routes';
import { useEffect } from 'react';

const App = () => {
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
    return <Router history={history}>{routes}</Router>;
};

export default App;
