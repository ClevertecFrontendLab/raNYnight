import { baseQuery } from '@constants/api';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { NewTrainingRequest, NewTrainingResponse } from 'src/types/trainings';

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
        getTrainings: builder.query<NewTrainingResponse[], { trainingName: string }>({
            query: (params) => ({
                url: 'training',
                method: 'GET',
                credentials: 'include',
                params: {
                    name: params.trainingName,
                },
            }),
        }),

        createTraining: builder.mutation<NewTrainingResponse, NewTrainingRequest>({
            query: (body) => ({
                url: 'training',
                method: 'POST',
                body,
                credentials: 'include',
            }),
        }),
    }),
});

export const { useGetTrainingsQuery, useCreateTrainingMutation, useGetTrainingListQuery } =
    trainingsApi;
