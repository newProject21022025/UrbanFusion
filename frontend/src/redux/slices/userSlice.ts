// src/redux/slices/userSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  userName: string | null;
  userId: string | null;
  email: string | null;
  firstName: string | null;
  lastName: string | null;
  // додай інші поля, які потрібні
  isLoggedIn: boolean;
}

const initialState: UserState = {
  userId: null,
  email: null,
  firstName: null,
  lastName: null,
  isLoggedIn: false,
  userName: null
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (
      state,
      action: PayloadAction<{
        userId: string;
        email: string;
        firstName: string;
        lastName: string;
      }>
    ) => {
      state.userId = action.payload.userId;
      state.email = action.payload.email;
      state.firstName = action.payload.firstName;
      state.lastName = action.payload.lastName;
      state.userName = `${action.payload.firstName} ${action.payload.lastName}`;
      state.isLoggedIn = true;
    },
    clearUser: (state) => {
      state.userId = null;
      state.email = null;
      state.firstName = null;
      state.lastName = null;
      state.isLoggedIn = false;
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
