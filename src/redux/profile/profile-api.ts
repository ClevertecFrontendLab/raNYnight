import { UserData } from '@common-types/profile';
import { ApiEndpoints, baseQuery } from '@constants/api';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { setUserInfo } from './profile-slice';

export const profileApi = createApi({
    reducerPath: 'profileApi',
    baseQuery: fetchBaseQuery({
        baseUrl: baseQuery,
        prepareHeaders: (headers) => {
            const token = sessionStorage.getItem('jwtToken') || localStorage.getItem('jwtToken');
            if (token) {
                headers.set('authentication', `Bearer ${token}`);
                headers.set('authorization', `Bearer ${token}`);
            }
            return headers;
        },
    }),
    endpoints: (builder) => ({
        getUserInfo: builder.query<UserData, void>({
            query: () => ({
                url: ApiEndpoints.UserMe,
                method: 'GET',
                credentials: 'include',
            }),
            async onQueryStarted(_, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    dispatch(setUserInfo(data));
                } catch (error) {
                    console.error(error);
                }
            },
        }),

        updateUser: builder.mutation<UserData, Partial<UserData>>({
            query: (body) => ({
                url: ApiEndpoints.User,
                method: 'PUT',
                body,
                credentials: 'include',
            }),
            async onQueryStarted(_, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    dispatch(setUserInfo(data));
                } catch (error) {
                    console.error(error);
                }
            },
        }),
    }),
});

export const { useLazyGetUserInfoQuery, useUpdateUserMutation } = profileApi;
