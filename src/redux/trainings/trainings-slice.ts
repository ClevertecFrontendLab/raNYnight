import { Exercise, ModifiedTraining } from '@common-types/trainings';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface TrainingStore {
    allUserTrainings: ModifiedTraining[] | [];
    defaultTrainings: string[];
    todaysTrainings: ModifiedTraining[] | [];
    trainingToEdit: ModifiedTraining | null;
    isDrawerOpen: boolean;
    selectedDay: string | null;
    modifiedTraining: ModifiedTraining | null;
    modifiedExercises: Exercise[] | null;
    isCalendarBlocked: boolean;
}

const initialState: TrainingStore = {
    allUserTrainings: [],
    defaultTrainings: [],
    todaysTrainings: [],
    trainingToEdit: null,
    isDrawerOpen: false,
    selectedDay: null,
    modifiedTraining: null,
    isCalendarBlocked: false,
    modifiedExercises: [],
};

const trainingsSlice = createSlice({
    name: 'trainings',
    initialState: initialState,
    reducers: {
        setAllUserTrainings: (state, action: PayloadAction<ModifiedTraining[]>) => {
            state.allUserTrainings = action.payload;
        },

        setDefaultTrainings: (state, action: PayloadAction<string[]>) => {
            state.defaultTrainings = action.payload;
        },
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
        setModifiedExercises(state, action: PayloadAction<Exercise[] | null>) {
            state.modifiedExercises = action.payload;
        },
        setCalendarBlocked: (state, action: PayloadAction<boolean>) => {
            state.isCalendarBlocked = action.payload;
        },
        resetTrainigState: () => initialState,
    },
});

export const {
    setAllUserTrainings,
    setDefaultTrainings,
    setTodaysTrainings,
    setTrainingToEdit,
    setIsDrawerOpen,
    setSelectedDay,
    setModifiedTraining,
    resetTrainigState,
    setCalendarBlocked,
    setModifiedExercises,
} = trainingsSlice.actions;

export const selectAllUserTrainings = (state: { trainings: TrainingStore }) =>
    state.trainings.allUserTrainings;

export const selectTodaysTrainings = (state: { trainings: TrainingStore }) =>
    state.trainings.todaysTrainings;

export const selectDefaultTrainings = (state: { trainings: TrainingStore }) =>
    state.trainings.defaultTrainings;

export const selectTrainingToEdit = (state: { trainings: TrainingStore }) =>
    state.trainings.trainingToEdit;

export const selectIsDrawerOpen = (state: { trainings: TrainingStore }) =>
    state.trainings.isDrawerOpen;

export const selectSelectedDay = (state: { trainings: TrainingStore }) =>
    state.trainings.selectedDay;

export const selectModifiedTraining = (state: { trainings: TrainingStore }) =>
    state.trainings.modifiedTraining;

export const selectIsCalendarBlocked = (state: { trainings: TrainingStore }) =>
    state.trainings.isCalendarBlocked;

export const selectModifiedExercises = (state: { trainings: TrainingStore }) =>
    state.trainings.modifiedExercises;

export default trainingsSlice.reducer;
