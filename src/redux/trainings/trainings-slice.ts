import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ModifiedTraining } from 'src/types/trainings';

interface TrainingStore {
    todaysTrainings: ModifiedTraining[] | [];
    trainingToEdit: ModifiedTraining | null;
    isDrawerOpen: boolean;
    selectedDay: string | null;
    modifiedTraining: ModifiedTraining | null;
}

const initialState: TrainingStore = {
    todaysTrainings: [],
    trainingToEdit: null,
    isDrawerOpen: false,
    selectedDay: null,
    modifiedTraining: null,
};

const trainingsSlice = createSlice({
    name: 'trainings',
    initialState: initialState,
    reducers: {
        setSelectedDay: (state, action: PayloadAction<string | null>) => {
            state.selectedDay = action.payload;
        },

        setIsDrawerOpen: (state, action: PayloadAction<boolean>) => {
            state.isDrawerOpen = action.payload;
        },
        setTodaysTrainings: (state, action: PayloadAction<ModifiedTraining[]>) => {
            state.todaysTrainings = action.payload;
        },
        setTrainingToEdit: (state, action: PayloadAction<ModifiedTraining | null>) => {
            state.trainingToEdit = action.payload;
        },
        setModifiedTraining: (state, action: PayloadAction<ModifiedTraining | null>) => {
            state.modifiedTraining = action.payload;
        },
    },
});

export const {
    setTodaysTrainings,
    setTrainingToEdit,
    setIsDrawerOpen,
    setSelectedDay,
    setModifiedTraining,
} = trainingsSlice.actions;

export const selectTodaysTrainings = (state: { trainings: TrainingStore }) =>
    state.trainings.todaysTrainings;

export const selectTrainingToEdit = (state: { trainings: TrainingStore }) =>
    state.trainings.trainingToEdit;

export const selectIsDrawerOpen = (state: { trainings: TrainingStore }) =>
    state.trainings.isDrawerOpen;

export const selectSelectedDay = (state: { trainings: TrainingStore }) =>
    state.trainings.selectedDay;

export const selectModifiedTraining = (state: { trainings: TrainingStore }) =>
    state.trainings.modifiedTraining;

export default trainingsSlice.reducer;
