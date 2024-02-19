import { HistoryRouter as Router } from 'redux-first-history/rr6';
import { history } from '@redux/configure-store';
import { routes } from '@router/routes';

const App = () => {
    return <Router history={history}>{routes}</Router>;
};

export default App;
