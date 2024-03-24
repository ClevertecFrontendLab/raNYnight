import { Tariff } from '@common-types/auth';
import { RootState } from '@redux/configure-store';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface TariffStore {
    tariffList: Tariff[] | [];
    selectedTariffToBuy: Tariff | null;
}

const initialState: TariffStore = {
    tariffList: [],
    selectedTariffToBuy: null,
};

const tariffSlice = createSlice({
    name: 'tariff',
    initialState: initialState,
    reducers: {
        setTariffList: (state, action: PayloadAction<Tariff[] | []>) => {
            state.tariffList = action.payload;
        },
        setSelectedTariffToBuy: (state, action: PayloadAction<Tariff | null>) => {
            state.selectedTariffToBuy = action.payload;
        },
    },
});

export const { setTariffList, setSelectedTariffToBuy } = tariffSlice.actions;

export const selectTariffList = (state: RootState) => state.tariffs.tariffList;

export const selectSelectedTariffToBuy = (state: RootState) => state.tariffs.selectedTariffToBuy;

export default tariffSlice.reducer;
