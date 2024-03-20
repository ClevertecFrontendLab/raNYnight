import { ModalTypes } from '@components/modal-manager/modal-manager';
import { RootState } from '@redux/configure-store';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ModalManager {
    activeModal: ModalTypes | null;
}

const initialState: ModalManager = {
    activeModal: null,
};

const modalManager = createSlice({
    name: 'modalManager',
    initialState: initialState,
    reducers: {
        setActiveModal: (state, action: PayloadAction<ModalTypes>) => {
            state.activeModal = action.payload;
        },
    },
});

export const { setActiveModal } = modalManager.actions;

export const selectActiveModal = (state: RootState) => state.modalManager.activeModal;

export default modalManager.reducer;
