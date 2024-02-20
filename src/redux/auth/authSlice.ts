import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthStore, RegisterInput } from 'src/types/auth';

const initialState: AuthStore = {
    authToken: null,
    rememberMe: false,
    shouldRefetch: false,
    lastRegisterRequest: {
        email: '',
        password: '',
    },
    forgotEmail: '',
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setAuthToken: (state, action: PayloadAction<string | null>) => {
            if (state.rememberMe) {
                localStorage.setItem('jwtToken', action.payload || '');
            }
            sessionStorage.setItem('jwtToken', action.payload || '');
            state.authToken = action.payload;
        },
        setRememberMe: (state, action: PayloadAction<boolean>) => {
            state.rememberMe = action.payload;
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
        setForgotEmail: (state, action: PayloadAction<string>) => {
            state.forgotEmail = action.payload;
        },
    },
});

export const {
    setAuthToken,
    setLastRegisterRequest,
    clearLastRegisterRequest,
    setShouldRefetch,
    setForgotEmail,
    setRememberMe,
} = authSlice.actions;

export const selectLastRegisterRequest = (state: { auth: AuthStore }) =>
    state.auth.lastRegisterRequest;

export const selectShouldRefetch = (state: { auth: AuthStore }) => state.auth.shouldRefetch;

export const selectAuthToken = (state: { auth: AuthStore }) => state.auth.authToken;

export const selectForgotEmail = (state: { auth: AuthStore }) => state.auth.forgotEmail;

export default authSlice.reducer;
