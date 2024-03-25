import { UserData } from '@common-types/profile';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserStore {
    userInfo: UserData | null;
    shouldRefetch: boolean;
}

const initialState: UserStore = {
    userInfo: null,
    shouldRefetch: false,
};

const profileSlice = createSlice({
    name: 'profile',
    initialState: initialState,
    reducers: {
        setUserInfo: (state, action: PayloadAction<UserData | null>) => {
            state.userInfo = action.payload;
        },
        setShouldRefetch: (state, action: PayloadAction<boolean>) => {
            state.shouldRefetch = action.payload;
        },
    },
});

export const { setUserInfo, setShouldRefetch } = profileSlice.actions;

export const selectUserInfo = (state: { profile: UserStore }) => state.profile.userInfo;

export const selectShouldRefetch = (state: { profile: UserStore }) => state.profile.shouldRefetch;

export default profileSlice.reducer;
