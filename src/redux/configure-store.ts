import { combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import { createReduxHistoryContext } from 'redux-first-history';
import { createBrowserHistory } from 'history';
import { authApi } from './auth/authApi';
import { setupListeners } from '@reduxjs/toolkit/query';
import authReducer from '@redux/auth/authSlice';

const { createReduxHistory, routerMiddleware, routerReducer } = createReduxHistoryContext({
    savePreviousLocations: 2,
    history: createBrowserHistory(),
});

export const selectRouterPreviousLocations = (state: RootState) => state.router.previousLocations;

export const store = configureStore({
    reducer: combineReducers({
        router: routerReducer,
        [authApi.reducerPath]: authApi.reducer,
        auth: authReducer,
    }),
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(routerMiddleware).concat(authApi.middleware),
});

export const history = createReduxHistory(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

setupListeners(store.dispatch);
