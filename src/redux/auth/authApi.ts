import { authBaseQuery } from '@constants/api';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {
    ConfirmEmailRequest,
    EmailResponse,
    LoginRequest,
    LoginResponse,
    RegisterInput,
} from 'src/types/auth';

export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({
        baseUrl: authBaseQuery,
        prepareHeaders: (headers) => {
            const token = localStorage.getItem('jwtToken');
            if (token) {
                headers.set('authentication', `Bearer ${token}`);
            }
            return headers;
        },
    }),
    endpoints: (builder) => ({
        loginUser: builder.mutation<LoginResponse, LoginRequest>({
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
        checkEmail: builder.mutation<EmailResponse, { email: string }>({
            query: (body) => ({
                url: 'check-email',
                method: 'POST',
                body,
            }),
        }),
        confirmEmail: builder.mutation<EmailResponse, ConfirmEmailRequest>({
            query: (body) => ({
                url: 'confirm-email',
                method: 'POST',
                body,
            }),
        }),
    }),
});

export const { useLoginUserMutation, useRegisterUserMutation, useCheckEmailMutation } = authApi;
