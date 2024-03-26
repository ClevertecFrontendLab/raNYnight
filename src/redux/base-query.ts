import { fetchBaseQuery } from '@reduxjs/toolkit/query';
import { selectAuthToken } from './auth/auth-slice';
import { RootState } from './configure-store';
import { baseQuery } from '@constants/api';

export const appBaseQuery = fetchBaseQuery({
    baseUrl: baseQuery,
    prepareHeaders: (headers, { getState }) => {
        const state = getState() as RootState;
        const token = selectAuthToken(state);

        if (token) {
            headers.set('Authorization', `Bearer ${token}`);
        }

        return headers;
    },
});
