// src/redux/slices/userSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  userId: string | null;
  firstName: string | null;
  lastName: string | null;
  email: string | null; // Це login
  phone: string | null;
  address: string | null;
  postOfficeDetails: string | null;
  dateOfBirth: string | null;
  role: string | null;
  isLoggedIn: boolean;
}

const initialState: UserState = {
  userId: null,
  firstName: null,
  lastName: null,
  email: null,
  phone: null,
  address: null,
  postOfficeDetails: null,
  dateOfBirth: null,
  role: null,
  isLoggedIn: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (
      state,
      action: PayloadAction<{
        userId: string;
        firstName: string;
        lastName: string;
        email: string;
        phone?: string;
        address?: string;
        postOfficeDetails?: string;
        dateOfBirth?: string;
        role?: string;
      }>
    ) => {
      state.userId = action.payload.userId;
      state.firstName = action.payload.firstName;
      state.lastName = action.payload.lastName;
      state.email = action.payload.email;
      state.phone = action.payload.phone || null;
      state.address = action.payload.address || null;
      state.postOfficeDetails = action.payload.postOfficeDetails || null;
      state.dateOfBirth = action.payload.dateOfBirth || null;
      state.role = action.payload.role || null;
      state.isLoggedIn = true;
    },
    clearUser: (state) => {
      state.userId = null;
      state.firstName = null;
      state.lastName = null;
      state.email = null;
      state.phone = null;
      state.address = null;
      state.postOfficeDetails = null;
      state.dateOfBirth = null;
      state.role = null;
      state.isLoggedIn = false;
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
