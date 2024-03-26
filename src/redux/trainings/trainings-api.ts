import { ModifiedTraining, Training } from '@common-types/trainings';
import { ApiEndpoints } from '@constants/api';
import { createApi } from '@reduxjs/toolkit/query/react';

import { appBaseQuery } from '@redux/base-query';
import { setAllUserTrainings, setDefaultTrainings } from './trainings-slice';

export const trainingsApi = createApi({
    reducerPath: 'trainingsApi',
    baseQuery: appBaseQuery,
    endpoints: (builder) => ({
        getTrainingList: builder.query<string[], void>({
            query: () => ({
                url: ApiEndpoints.TrainingList,
                method: 'GET',
                credentials: 'include',
            }),
            async onQueryStarted(_, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    dispatch(setDefaultTrainings(data));
                } catch (error) {
                    console.error(error);
                }
            },
            transformResponse: (response: Training[]) => response.map(({ name }) => name),
        }),
        getTrainings: builder.query<ModifiedTraining[], void>({
            query: () => ({
                url: ApiEndpoints.Training,
                method: 'GET',
                credentials: 'include',
            }),
            async onQueryStarted(_, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    dispatch(setAllUserTrainings(data));
                } catch (error) {
                    console.error(error);
                }
            },
        }),

        createTraining: builder.mutation<void, ModifiedTraining>({
            query: (body) => ({
                url: ApiEndpoints.Training,
                method: 'POST',
                body,
                credentials: 'include',
            }),
        }),
        updateTraining: builder.mutation<void, ModifiedTraining>({
            query: (body) => ({
                url: `${ApiEndpoints.Training}/${body._id}`,
                method: 'PUT',
                body,
            }),
        }),
    }),
});

export const {
    useLazyGetTrainingsQuery,
    useLazyGetTrainingListQuery,
    useGetTrainingsQuery,
    useCreateTrainingMutation,
    useGetTrainingListQuery,
    useUpdateTrainingMutation,
} = trainingsApi;
