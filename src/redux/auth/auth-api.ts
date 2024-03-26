import {
    ChangePasswordRequest,
    ConfirmEmailRequest,
    EmailResponse,
    LoginRequest,
    LoginResponse,
    RegisterInput,
} from '@common-types/auth';
import { ApiEndpoints } from '@constants/api';
import { appBaseQuery } from '@redux/base-query';
import { createApi } from '@reduxjs/toolkit/query/react';

export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: appBaseQuery,
    endpoints: (builder) => ({
        loginUser: builder.mutation<LoginResponse, LoginRequest>({
            query: (body: { email: string; password: string }) => ({
                    url: ApiEndpoints.Login,
                    method: 'POST',
                    body,
                    credentials: 'include',
                }),
        }),

        registerUser: builder.mutation<object, RegisterInput>({
            query(body) {
                return {
                    url: ApiEndpoints.Register,
                    method: 'POST',
                    body,
                };
            },
        }),
        checkEmail: builder.mutation<EmailResponse, { email: string }>({
            query: (body) => ({
                url: ApiEndpoints.CheckEmail,
                method: 'POST',
                body,
            }),
        }),
        confirmEmail: builder.mutation<EmailResponse, ConfirmEmailRequest>({
            query: (body) => ({
                url: ApiEndpoints.ConfirmEmail,
                method: 'POST',
                body,
                credentials: 'include',
            }),
        }),
        changePassword: builder.mutation<{ email: string }, ChangePasswordRequest>({
            query: (body) => ({
                url: ApiEndpoints.ChangePassword,
                method: 'POST',
                body,
                credentials: 'include',
            }),
        }),
    }),
});

export const {
    useLoginUserMutation,
    useRegisterUserMutation,
    useCheckEmailMutation,
    useConfirmEmailMutation,
    useChangePasswordMutation,
} = authApi;
