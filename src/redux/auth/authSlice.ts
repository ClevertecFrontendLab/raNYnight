import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthStore, RegisterInput } from 'src/types/auth';

const initialState: AuthStore = {
    shouldRefetch: false,
    lastRegisterRequest: {
        email: '',
        password: '',
    },
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setLastRegisterRequest: (state, action: PayloadAction<RegisterInput>) => {
            state.lastRegisterRequest = action.payload;
        },
        clearLastRegisterRequest: (state) => {
            state.lastRegisterRequest = {
                email: '',
                password: '',
            };
        },
        setShouldRefetch: (state, action: PayloadAction<boolean>) => {
            state.shouldRefetch = action.payload;
        },
    },
});

export const { setLastRegisterRequest, clearLastRegisterRequest, setShouldRefetch } =
    authSlice.actions;

export const selectLastRegisterRequest = (state: { auth: AuthStore }) =>
    state.auth.lastRegisterRequest;

export const selectShouldRefetch = (state: { auth: AuthStore }) => state.auth.shouldRefetch;

export default authSlice.reducer;
