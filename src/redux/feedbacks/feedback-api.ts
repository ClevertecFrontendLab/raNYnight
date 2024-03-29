import { Feedback, FeedbackRequest } from '@common-types/feedbacks';
import { baseQuery } from '@constants/api';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const feedbacksApi = createApi({
    reducerPath: 'feedbacksApi',
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
        sendFeedback: builder.mutation<Feedback[], FeedbackRequest>({
            query: (body) => ({
                url: 'feedback',
                method: 'POST',
                body,
                credentials: 'include',
            }),
        }),

        getFeedbacks: builder.query<Feedback[], void>({
            query: () => ({
                url: 'feedback',
                method: 'GET',
                credentials: 'include',
            }),
        }),
    }),
});

export const { useSendFeedbackMutation, useGetFeedbacksQuery } = feedbacksApi;
