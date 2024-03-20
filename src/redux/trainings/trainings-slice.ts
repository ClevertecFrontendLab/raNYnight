import { Exercise, ModifiedTraining } from '@common-types/trainings';
import { DATE_DD_MM_YYYY } from '@constants/dates';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import dayjs from 'dayjs';

interface TrainingStore {
    allUserTrainings: ModifiedTraining[] | [];
    defaultTrainings: string[];
    todaysTrainings: ModifiedTraining[] | [];
    trainingToEdit: ModifiedTraining | null;
    isDrawerOpen: boolean;
    selectedDay: string;
    modifiedTraining: ModifiedTraining | null;
    modifiedExercises: Exercise[] | null;
    isCalendarBlocked: boolean;

    shouldRefetchDefaultTrainings: boolean;
    shouldRefetchUserTrainings: boolean;

    cellPosition: { top: number; left: number };
}

const initialState: TrainingStore = {
    allUserTrainings: [],
    defaultTrainings: [],
    todaysTrainings: [],
    trainingToEdit: null,
    isDrawerOpen: false,
    selectedDay: dayjs().format(DATE_DD_MM_YYYY),
    modifiedTraining: null,
    isCalendarBlocked: false,
    modifiedExercises: [],

    shouldRefetchDefaultTrainings: false,
    shouldRefetchUserTrainings: false,

    cellPosition: { top: 0, left: 0 },
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
        setSelectedDay: (state, action: PayloadAction<string>) => {
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

        setShouldRefetchDefaultTrainings: (state, action: PayloadAction<boolean>) => {
            state.shouldRefetchDefaultTrainings = action.payload;
        },

        setShouldRefetchUserTrainings: (state, action: PayloadAction<boolean>) => {
            state.shouldRefetchUserTrainings = action.payload;
        },

        setCellPosition: (state, action: PayloadAction<{ top: number; left: number }>) => {
            state.cellPosition = action.payload;
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
    setShouldRefetchDefaultTrainings,
    setCellPosition,
    setShouldRefetchUserTrainings,
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

export const selectShouldRefetchDefaultTrainings = (state: { trainings: TrainingStore }) =>
    state.trainings.shouldRefetchDefaultTrainings;

export const selectShouldRefetchUserTrainings = (state: { trainings: TrainingStore }) =>
    state.trainings.shouldRefetchUserTrainings;

export const selectCellPosition = (state: { trainings: TrainingStore }) =>
    state.trainings.cellPosition;

export default trainingsSlice.reducer;
