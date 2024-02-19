import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthStore, RegisterInput } from 'src/types/auth';

const initialState: AuthStore = {
    authToken: null,
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
        setAuthToken: (state, action: PayloadAction<string | null>) => {
            sessionStorage.setItem('jwtToken', action.payload || '');
            state.authToken = action.payload;
        },
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

export const { setAuthToken, setLastRegisterRequest, clearLastRegisterRequest, setShouldRefetch } =
    authSlice.actions;

export const selectLastRegisterRequest = (state: { auth: AuthStore }) =>
    state.auth.lastRegisterRequest;

export const selectShouldRefetch = (state: { auth: AuthStore }) => state.auth.shouldRefetch;

export const selectAuthToken = (state: { auth: AuthStore }) => state.auth.authToken;

export default authSlice.reducer;
