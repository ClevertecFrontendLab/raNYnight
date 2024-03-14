import { baseQuery } from '@constants/api';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ModifiedTraining } from 'src/types/trainings';

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
        getTrainingList: builder.query<void, void>({
            query: () => ({
                url: 'catalogs/training-list',
                method: 'GET',
                credentials: 'include',
            }),
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
    useGetTrainingsQuery,
    useCreateTrainingMutation,
    useGetTrainingListQuery,
    useUpdateTrainingMutation,
} = trainingsApi;
