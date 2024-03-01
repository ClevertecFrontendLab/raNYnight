import { createSlice } from '@reduxjs/toolkit';

interface FeedbackStore {
    isCollapsed: boolean;
}

const initialState: FeedbackStore = {
    isCollapsed: false,
};

const feedbacksSlice = createSlice({
    name: 'feedbacks',
    initialState: initialState,
    reducers: {
        toggleFeedbacksList: (state) => {
            state.isCollapsed = !state.isCollapsed;
        },
    },
});

export const { toggleFeedbacksList } = feedbacksSlice.actions;

export const selectIsFeedbackListCollapsed = (state: { feedbacks: FeedbackStore }) =>
    state.feedbacks.isCollapsed;

export default feedbacksSlice.reducer;
