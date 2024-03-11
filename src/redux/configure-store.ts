import authReducer from '@redux/auth/auth-slice';
import feedbacksReducer from '@redux/feedbacks/feedbacks-slice';
import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { createBrowserHistory } from 'history';
import { combineReducers } from 'redux';
import { createReduxHistoryContext } from 'redux-first-history';

import { authApi } from './auth/auth-api';
import { feedbacksApi } from './feedbacks/feedback-api';
import { trainingsApi } from './trainings/trainings-api';
import trainingsReducer from './trainings/trainings-slice';

const { createReduxHistory, routerMiddleware, routerReducer } = createReduxHistoryContext({
    history: createBrowserHistory(),
});

export const store = configureStore({
    reducer: combineReducers({
        auth: authReducer,
        feedbacks: feedbacksReducer,
        trainings: trainingsReducer,
        router: routerReducer,
        [authApi.reducerPath]: authApi.reducer,
        [feedbacksApi.reducerPath]: feedbacksApi.reducer,
        [trainingsApi.reducerPath]: trainingsApi.reducer,
    }),
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
            .concat(routerMiddleware)
            .concat(authApi.middleware)
            .concat(feedbacksApi.middleware)
            .concat(trainingsApi.middleware),
});

export const history = createReduxHistory(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

setupListeners(store.dispatch);
