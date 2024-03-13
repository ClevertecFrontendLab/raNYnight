import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { NewTrainingResponse } from 'src/types/trainings';

interface TrainingStore {
    todaysTrainings: NewTrainingResponse[] | [];
    trainingToEdit: NewTrainingResponse | null;
    isDrawerOpen: boolean;
    selectedDay: string | null;
}

const initialState: TrainingStore = {
    todaysTrainings: [],
    trainingToEdit: null,
    isDrawerOpen: false,
    selectedDay: null,
};

const trainingsSlice = createSlice({
    name: 'trainings',
    initialState: initialState,
    reducers: {
        setSelectedDay: (state, action: PayloadAction<string | null>) => {
            state.selectedDay = action.payload;
        },
        setTodaysTrainings: (state, action: PayloadAction<NewTrainingResponse[]>) => {
            state.todaysTrainings = action.payload;
        },
        setTrainingToEdit: (state, action: PayloadAction<NewTrainingResponse | null>) => {
            state.trainingToEdit = action.payload;
        },
        setIsDrawerOpen: (state, action: PayloadAction<boolean>) => {
            state.isDrawerOpen = action.payload;
        },
    },
});

export const { setTodaysTrainings, setTrainingToEdit, setIsDrawerOpen, setSelectedDay } =
    trainingsSlice.actions;

export const selectTodaysTrainings = (state: { trainings: TrainingStore }) =>
    state.trainings.todaysTrainings;

export const selectTrainingToEdit = (state: { trainings: TrainingStore }) =>
    state.trainings.trainingToEdit;

export const selectIsDrawerOpen = (state: { trainings: TrainingStore }) =>
    state.trainings.isDrawerOpen;

export const selectSelectedDay = (state: { trainings: TrainingStore }) =>
    state.trainings.selectedDay;

export default trainingsSlice.reducer;
