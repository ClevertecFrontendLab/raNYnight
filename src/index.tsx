import React from 'react';
import { store } from '@redux/configure-store';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './app/app';

import 'normalize.css';
import './style.less';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

root.render(
    <React.StrictMode>
        <Provider store={store}>
            <App />
        </Provider>
    </React.StrictMode>,
);
