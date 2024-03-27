import authReducer from '@redux/auth/auth-slice';
import feedbacksReducer from '@redux/feedbacks/feedbacks-slice';
import profileReducer from '@redux/profile/profile-slice';
import tariffReducer from '@redux/tariffs/tariffs-slice';
import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { createBrowserHistory } from 'history';
import { combineReducers } from 'redux';
import { createReduxHistoryContext } from 'redux-first-history';

import { authApi } from './auth/auth-api';
import { feedbacksApi } from './feedbacks/feedback-api';
import modalManagerReducer from './modals/modal-manager';
import { profileApi } from './profile/profile-api';
import { tariffsApi } from './tariffs/tariffs-api';
import { trainingsApi } from './trainings/trainings-api';
import trainingsReducer from './trainings/trainings-slice';

const { createReduxHistory, routerMiddleware, routerReducer } = createReduxHistoryContext({
    history: createBrowserHistory(),
});

export const store = configureStore({
    reducer: combineReducers({
        auth: authReducer,
        [authApi.reducerPath]: authApi.reducer,
        profile: profileReducer,
        [profileApi.reducerPath]: profileApi.reducer,
        tariffs: tariffReducer,
        [tariffsApi.reducerPath]: tariffsApi.reducer,
        feedbacks: feedbacksReducer,
        [feedbacksApi.reducerPath]: feedbacksApi.reducer,
        trainings: trainingsReducer,
        [trainingsApi.reducerPath]: trainingsApi.reducer,
        modalManager: modalManagerReducer,
        router: routerReducer,
    }),
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
            .concat(routerMiddleware)
            .concat(authApi.middleware)
            .concat(profileApi.middleware)
            .concat(tariffsApi.middleware)
            .concat(feedbacksApi.middleware)
            .concat(trainingsApi.middleware),
});

export const history = createReduxHistory(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

setupListeners(store.dispatch);
