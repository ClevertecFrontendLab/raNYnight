import { UserData } from '@common-types/profile';
import { ApiEndpoints } from '@constants/api';
import { appBaseQuery } from '@redux/base-query';
import { createApi } from '@reduxjs/toolkit/query/react';

import { setUserInfo } from './profile-slice';

export const profileApi = createApi({
    reducerPath: 'profileApi',
    baseQuery: appBaseQuery,
    endpoints: (builder) => ({
        getUserInfo: builder.query<UserData, void>({
            query: () => ({
                url: ApiEndpoints.UserMe,
                method: 'GET',
            }),
            async onQueryStarted(_, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;

                    dispatch(setUserInfo(data));
                } catch (error) {
                    dispatch(setUserInfo(null));
                }
            },
        }),

        updateUser: builder.mutation<UserData, Partial<UserData>>({
            query: (body) => ({
                url: ApiEndpoints.User,
                method: 'PUT',
                body,
            }),
            async onQueryStarted(_, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;

                    dispatch(setUserInfo(data));
                } catch (error) {
                    dispatch(setUserInfo(null));
                }
            },
        }),
    }),
});

export const { useLazyGetUserInfoQuery, useUpdateUserMutation } = profileApi;
