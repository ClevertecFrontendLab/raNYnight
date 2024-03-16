import { RootState } from '@redux/configure-store';
import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ModalStore {
    [key: string]: boolean;
}

export enum ModalTypes {
    none = 'none',
    calendarTrainingListModal = 'calendarTrainingListModal',
    calendarCreateTrainingModal = 'calendarCreateTrainingModal',
    calendarGetDefaultTrainingsModal = 'calendarGetDefaultTrainingsModal',
}

const initialState: ModalStore = {
    [ModalTypes.none]: false,
    [ModalTypes.calendarTrainingListModal]: false,
    [ModalTypes.calendarCreateTrainingModal]: false,
};

const modalsSlice = createSlice({
    name: 'modals',
    initialState: initialState,
    reducers: {
        toggleModal: (state, action: PayloadAction<ModalTypes>) => {
            const modalType = action.payload;
            state[modalType] = !state[modalType];
        },
        setOpenModal: (state, action: PayloadAction<ModalTypes>) => {
            const modalType = action.payload;
            state[modalType] = true;
        },
        setCloseModal: (state, action: PayloadAction<ModalTypes>) => {
            const modalType = action.payload;
            state[modalType] = false;
        },
        setAllModalsToFalse: (state) => {
            Object.keys(state).forEach((key) => {
                state[key] = false;
            });
        },
    },
});

export const { toggleModal, setAllModalsToFalse, setOpenModal, setCloseModal } =
    modalsSlice.actions;

export const selectModalState = (state: RootState) => state.modals;

export const selectModalByType = (modalType: ModalTypes) =>
    createSelector(selectModalState, (modalState) => modalState[modalType]);

export default modalsSlice.reducer;
