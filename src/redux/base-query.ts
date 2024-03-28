import { baseQuery } from '@constants/api';
import { fetchBaseQuery } from '@reduxjs/toolkit/query';

import { selectAuthToken } from './auth/auth-slice';
import { RootState } from './configure-store';

export const appBaseQuery = fetchBaseQuery({
    baseUrl: baseQuery,
    credentials: 'include',
    prepareHeaders: (headers, { getState }) => {
        const state = getState() as RootState;
        const token = selectAuthToken(state);

        if (token) {
            headers.set('authorization', `Bearer ${token}`);
        }

        return headers;
    },
});