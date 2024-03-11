import { RootState } from '@redux/configure-store';
import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ModalStore {
    [key: string]: boolean;
}

export enum ModalTypes {
    none = 'none',
    calendarTrainingListModal = 'calendarTrainingListModal',
    calendarCreateTrainingModal = 'calendarCreateTrainingModal',
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
    },
});

export const { toggleModal } = modalsSlice.actions;

export const selectModalState = (state: RootState) => state.modals;

export const selectModalByType = (modalType: ModalTypes) =>
    createSelector(selectModalState, (modalState) => modalState[modalType]);

export default modalsSlice.reducer;
