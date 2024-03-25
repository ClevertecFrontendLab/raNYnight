import { CreateTariffRequest, Tariff } from '@common-types/profile';
import { RootState } from '@redux/configure-store';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface TariffStore {
    tariffList: Tariff[] | [];
    selectedTariffToBuy: CreateTariffRequest | null;
    isTariffDrawerOpen: boolean;
}

const initialState: TariffStore = {
    tariffList: [],
    selectedTariffToBuy: null,
    isTariffDrawerOpen: false,
};

const tariffSlice = createSlice({
    name: 'tariff',
    initialState: initialState,
    reducers: {
        setTariffList: (state, action: PayloadAction<Tariff[] | []>) => {
            state.tariffList = action.payload;
        },
        setSelectedTariffToBuy: (state, action: PayloadAction<CreateTariffRequest | null>) => {
            state.selectedTariffToBuy = action.payload;
        },
        setIsTarifDrawerOpen: (state, action: PayloadAction<boolean>) => {
            state.isTariffDrawerOpen = action.payload;
        },
    },
});

export const { setTariffList, setSelectedTariffToBuy, setIsTarifDrawerOpen } = tariffSlice.actions;

export const selectTariffList = (state: RootState) => state.tariffs.tariffList;

export const selectSelectedTariffToBuy = (state: RootState) => state.tariffs.selectedTariffToBuy;

export const selectIsTariffDrawerOpen = (state: RootState) => state.tariffs.isTariffDrawerOpen;

export default tariffSlice.reducer;
