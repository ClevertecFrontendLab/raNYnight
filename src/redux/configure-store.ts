import { combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import { RouterState, createReduxHistoryContext } from 'redux-first-history';
import { createBrowserHistory } from 'history';
import { authApi } from './auth/authApi';
import { setupListeners } from '@reduxjs/toolkit/query';
import authReducer from '@redux/auth/authSlice';

const { createReduxHistory, routerMiddleware, routerReducer } = createReduxHistoryContext({
    savePreviousLocations: 1,
    history: createBrowserHistory(),
});

export const selectPreviousPath = (state: { router: RouterState }) =>
    state.router.previousLocations?.[1]?.location?.pathname;

export const store = configureStore({
    reducer: combineReducers({
        auth: authReducer,
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
