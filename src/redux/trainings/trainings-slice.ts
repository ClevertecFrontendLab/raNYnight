import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { NewTrainingResponse } from 'src/types/trainings';

interface TrainingStore {
    todaysTrainings: NewTrainingResponse[] | [];
    trainingToEdit: NewTrainingResponse | null;
    isDrawerOpen: boolean;
}

const initialState: TrainingStore = {
    todaysTrainings: [],
    trainingToEdit: null,
    isDrawerOpen: false,
};

const trainingsSlice = createSlice({
    name: 'trainings',
    initialState: initialState,
    reducers: {
        setTodaysTrainings: (state, action: PayloadAction<NewTrainingResponse[]>) => {
            state.todaysTrainings = action.payload;
        },
        setTrainingToEdit: (state, action: PayloadAction<NewTrainingResponse>) => {
            state.trainingToEdit = action.payload;
        },
        setIsDrawerOpen: (state, action: PayloadAction<boolean>) => {
            state.isDrawerOpen = action.payload;
        },
    },
});

export const { setTodaysTrainings, setTrainingToEdit, setIsDrawerOpen } = trainingsSlice.actions;

export const selectTodaysTrainings = (state: { trainings: TrainingStore }) =>
    state.trainings.todaysTrainings;

export const selectTrainingToEdit = (state: { trainings: TrainingStore }) =>
    state.trainings.trainingToEdit;

export const selectIsDrawerOpen = (state: { trainings: TrainingStore }) =>
    state.trainings.isDrawerOpen;

export default trainingsSlice.reducer;
