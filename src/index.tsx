import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from '@redux/configure-store';
import ruRu from 'antd/es/locale/ru_RU';
import 'normalize.css';

import { App } from './app';

import 'antd/dist/antd.variable.min.css';
import { ConfigProvider } from 'antd';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

root.render(
    <StrictMode>
        <ConfigProvider locale={ruRu}>
            <Provider store={store}>
                <App />
            </Provider>
        </ConfigProvider>
    </StrictMode>,
);
