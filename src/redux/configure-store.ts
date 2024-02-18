import { combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import { createReduxHistoryContext } from 'redux-first-history';
import { createBrowserHistory } from 'history';
import { authApi } from './auth/authApi';
import { setupListeners } from '@reduxjs/toolkit/query';

const { createReduxHistory, routerMiddleware, routerReducer } = createReduxHistoryContext({
    history: createBrowserHistory(),
});

export const store = configureStore({
    reducer: combineReducers({
        router: routerReducer,
        [authApi.reducerPath]: authApi.reducer,
    }),
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(routerMiddleware).concat(authApi.middleware),
});

export const history = createReduxHistory(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

setupListeners(store.dispatch);
