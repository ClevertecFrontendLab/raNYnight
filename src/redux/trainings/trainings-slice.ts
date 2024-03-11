import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { NewTrainingResponse } from 'src/types/trainings';

interface TrainingStore {
    todaysTrainings: NewTrainingResponse[] | [];
}

const initialState: TrainingStore = {
    todaysTrainings: [],
};

const trainingsSlice = createSlice({
    name: 'trainings',
    initialState: initialState,
    reducers: {
        setTodaysTrainings: (state, action: PayloadAction<NewTrainingResponse[]>) => {
            state.todaysTrainings = action.payload;
        },
    },
});

export const { setTodaysTrainings } = trainingsSlice.actions;

export const selectTodaysTrainings = (state: { trainings: TrainingStore }) =>
    state.trainings.todaysTrainings;

export default trainingsSlice.reducer;
