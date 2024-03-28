import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FeedbackStore {
    isCollapsed: boolean;
    shouldRefetch: boolean;
}

const initialState: FeedbackStore = {
    isCollapsed: true,
    shouldRefetch: false,
};

const feedbacksSlice = createSlice({
    name: 'feedbacks',
    initialState,
    reducers: {
        toggleFeedbacksList: (state) => {
            state.isCollapsed = !state.isCollapsed;
        },
        setShouldRefetch: (state, action: PayloadAction<boolean>) => {
            state.shouldRefetch = action.payload;
        },
    },
});

export const { toggleFeedbacksList, setShouldRefetch } = feedbacksSlice.actions;

export const selectIsFeedbackListCollapsed = (state: { feedbacks: FeedbackStore }) =>
    state.feedbacks.isCollapsed;

export const selectShouldRefetch = (state: { feedbacks: FeedbackStore }) =>
    state.feedbacks.shouldRefetch;

export default feedbacksSlice.reducer;
