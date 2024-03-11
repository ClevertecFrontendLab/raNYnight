import { RootState } from '@redux/configure-store';
import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ModalStore {
    isOpen: boolean;
    modalType: ModalTypes;
}

export enum ModalTypes {
    none = 'none',
    calendarTrainingListModal = 'calendarTrainingListModal',
    calendarCreateTrainingModal = 'calendarCreateTrainingModal',
}

const initialState: ModalStore = {
    isOpen: false,
    modalType: ModalTypes.none,
};

const modalsSlice = createSlice({
    name: 'modals',
    initialState: initialState,
    reducers: {
        toggleModal: (state, action: PayloadAction<ModalTypes>) => {
            state.isOpen = !state.isOpen;
            state.modalType = action.payload;
        },
    },
});

export const { toggleModal } = modalsSlice.actions;

export const selectModalState = (state: RootState) => state.modals;

export const selectModalByType = (modalType: ModalTypes) =>
    createSelector(selectModalState, (modalState) => modalState.modalType === modalType);

export default modalsSlice.reducer;
