import authReducer from '@redux/auth/auth-slice';
import feedbacksReducer from '@redux/feedbacks/feedbacks-slice';
import profileReducer from '@redux/profile/profile-slice';
import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { createBrowserHistory } from 'history';
import { combineReducers } from 'redux';
import { createReduxHistoryContext } from 'redux-first-history';
import { profileApi } from './profile/profile-api';
import { authApi } from './auth/auth-api';
import { feedbacksApi } from './feedbacks/feedback-api';
import modalManagerReducer from './modals/modal-manager';
import { trainingsApi } from './trainings/trainings-api';
import trainingsReducer from './trainings/trainings-slice';

const { createReduxHistory, routerMiddleware, routerReducer } = createReduxHistoryContext({
    history: createBrowserHistory(),
});

export const store = configureStore({
    reducer: combineReducers({
        auth: authReducer,
        profile: profileReducer,
        modalManager: modalManagerReducer,
        feedbacks: feedbacksReducer,
        trainings: trainingsReducer,
        router: routerReducer,
        [authApi.reducerPath]: authApi.reducer,
        [profileApi.reducerPath]: profileApi.reducer,
        [feedbacksApi.reducerPath]: feedbacksApi.reducer,
        [trainingsApi.reducerPath]: trainingsApi.reducer,
    }),
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
            .concat(routerMiddleware)
            .concat(authApi.middleware)
            .concat(profileApi.middleware)
            .concat(feedbacksApi.middleware)
            .concat(trainingsApi.middleware),
});

export const history = createReduxHistory(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

setupListeners(store.dispatch);
