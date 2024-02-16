import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { HistoryRouter as Router } from 'redux-first-history/rr6';
import { history, store } from '@redux/configure-store';
import { routes } from './router/routes';

import 'normalize.css';
import './style.less';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

root.render(
    <React.StrictMode>
        <Provider store={store}>
            <Router history={history}>{routes}</Router>
        </Provider>
    </React.StrictMode>,
);
