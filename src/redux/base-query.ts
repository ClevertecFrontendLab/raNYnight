import { baseQuery } from '@constants/api';
import { fetchBaseQuery } from '@reduxjs/toolkit/query';

export const appBaseQuery = fetchBaseQuery({
    baseUrl: baseQuery,
    credentials: 'include',
    prepareHeaders: (headers) => {
        headers.set(
            'authorization',
            `Bearer ${localStorage.getItem('jwtToken') || sessionStorage.getItem('jwtToken')}`,
        );
    },
});
