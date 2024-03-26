import { Feedback, FeedbackRequest } from '@common-types/feedbacks';
import { ApiEndpoints } from '@constants/api';
import { appBaseQuery } from '@redux/base-query';
import { createApi } from '@reduxjs/toolkit/query/react';

export const feedbacksApi = createApi({
    reducerPath: 'feedbacksApi',
    baseQuery: appBaseQuery,
    endpoints: (builder) => ({
        sendFeedback: builder.mutation<Feedback[], FeedbackRequest>({
            query: (body) => ({
                url: ApiEndpoints.Feedback,
                method: 'POST',
                body,
                credentials: 'include',
            }),
        }),

        getFeedbacks: builder.query<Feedback[], void>({
            query: () => ({
                url: ApiEndpoints.Feedback,
                method: 'GET',
                credentials: 'include',
            }),
        }),
    }),
});

export const { useSendFeedbackMutation, useGetFeedbacksQuery } = feedbacksApi;
