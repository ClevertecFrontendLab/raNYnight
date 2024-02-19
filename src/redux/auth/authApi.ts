import { authBaseQuery } from '@constants/api';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { LoginData, RegisterInput } from 'src/types/auth';

export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({
        baseUrl: authBaseQuery,
    }),
    endpoints: (builder) => ({
        loginUser: builder.mutation<{ access_token: string }, LoginData>({
            query: (body: { email: string; password: string }) => {
                return {
                    url: 'login',
                    method: 'POST',
                    body,
                    credentials: 'include',
                };
            },
        }),

        registerUser: builder.mutation<{}, RegisterInput>({
            query(body) {
                return {
                    url: 'registration',
                    method: 'POST',
                    body,
                };
            },
        }),
    }),
});

export const { useLoginUserMutation, useRegisterUserMutation } = authApi;
