import { authBaseQuery } from '@constants/api';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({
        baseUrl: authBaseQuery,
    }),
    endpoints: (builder) => ({
        loginUser: builder.mutation({
            query: (body: { email: string; password: string }) => {
                return {
                    url: 'login',
                    method: 'POST',
                    body,
                };
            },
        }),
    }),
});

export const { useLoginUserMutation } = authApi;
