import { UserData } from '@common-types/auth';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserStore {
    userInfo: UserData | null;
}

const initialState: UserStore = {
    userInfo: null,
};

const profileSlice = createSlice({
    name: 'profile',
    initialState: initialState,
    reducers: {
        setUserInfo: (state, action: PayloadAction<UserData | null>) => {
            state.userInfo = action.payload;
        },
    },
});

export const { setUserInfo } = profileSlice.actions;

export const selectUserInfo = (state: { profile: UserStore }) => state.profile.userInfo;

export default profileSlice.reducer;
