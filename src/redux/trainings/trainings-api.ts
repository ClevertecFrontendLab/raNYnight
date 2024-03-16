import { baseQuery } from '@constants/api';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ModifiedTraining, Training } from 'src/types/trainings';
import { setDefaultTrainings } from './trainings-slice';

export const trainingsApi = createApi({
    reducerPath: 'trainingsApi',
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
        getTrainingList: builder.query<string[], void>({
            query: () => ({
                url: 'catalogs/training-lists',
                method: 'GET',
                credentials: 'include',
            }),
            async onQueryStarted(_, { dispatch, queryFulfilled }) {
                const { data } = await queryFulfilled;
                dispatch(setDefaultTrainings(data));
            },
            transformResponse: (response: Training[]) => response.map(({ name }) => name),
        }),
        getTrainings: builder.query<ModifiedTraining[], void>({
            query: () => ({
                url: 'training',
                method: 'GET',
                credentials: 'include',
            }),
        }),

        createTraining: builder.mutation<void, ModifiedTraining>({
            query: (body) => ({
                url: 'training',
                method: 'POST',
                body,
                credentials: 'include',
            }),
        }),
        updateTraining: builder.mutation<void, ModifiedTraining>({
            query: (body) => ({
                url: `training/${body._id}`,
                method: 'PUT',
                body,
            }),
        }),
    }),
});

export const {
    useLazyGetTrainingListQuery,
    useGetTrainingsQuery,
    useCreateTrainingMutation,
    useGetTrainingListQuery,
    useUpdateTrainingMutation,
} = trainingsApi;
