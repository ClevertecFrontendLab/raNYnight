import { CreateTariffRequest, Tariff } from '@common-types/profile';
import { ApiEndpoints } from '@constants/api';
import { createApi } from '@reduxjs/toolkit/query/react';

import { appBaseQuery } from '@redux/base-query';
import { setTariffList } from './tariffs-slice';

export const tariffsApi = createApi({
    reducerPath: 'tariffsApi',
    baseQuery: appBaseQuery,
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
