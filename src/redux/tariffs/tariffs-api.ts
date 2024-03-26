import { ApiEndpoints, baseQuery } from '@constants/api';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { setTariffList } from './tariffs-slice';
import { CreateTariffRequest, Tariff } from '@common-types/profile';

export const tariffsApi = createApi({
    reducerPath: 'tariffsApi',
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
        getTariffList: builder.query<Tariff[], void>({
            query: () => ({
                url: ApiEndpoints.TariffList,
                method: 'GET',
                credentials: 'include',
            }),
            async onQueryStarted(_, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    dispatch(setTariffList(data));
                } catch (error) {
                    dispatch(setTariffList([]));
                }
            },
        }),

        createTariff: builder.mutation<void, CreateTariffRequest>({
            query: (body) => ({
                url: ApiEndpoints.Tariff,
                method: 'POST',
                body,
            }),
        }),
    }),
});

export const { useLazyGetTariffListQuery, useCreateTariffMutation } = tariffsApi;