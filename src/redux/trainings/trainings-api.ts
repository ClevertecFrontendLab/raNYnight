import { baseQuery } from '@constants/api';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ModifiedTraining, Training } from 'src/types/trainings';
import { setAllUserTrainings, setDefaultTrainings } from './trainings-slice';

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
                url: 'catalogs/training-list',
                method: 'GET',
                credentials: 'include',
            }),
            async onQueryStarted(_, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    dispatch(setDefaultTrainings(data));
                } catch (error) {
                    console.log(error);
                }
            },
            transformResponse: (response: Training[]) => response.map(({ name }) => name),
        }),
        getTrainings: builder.query<ModifiedTraining[], void>({
            query: () => ({
                url: 'training',
                method: 'GET',
                credentials: 'include',
            }),
            async onQueryStarted(_, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    dispatch(setAllUserTrainings(data));
                } catch (error) {
                    console.log(error);
                }
            },
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
    useLazyGetTrainingsQuery,
    useLazyGetTrainingListQuery,
    useGetTrainingsQuery,
    useCreateTrainingMutation,
    useGetTrainingListQuery,
    useUpdateTrainingMutation,
} = trainingsApi;
