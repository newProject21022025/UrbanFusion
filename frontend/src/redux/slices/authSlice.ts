// src/redux/slices/authSlice.ts

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  isAdmin: boolean;
  adminLinks: {
    aufLink: string;
    aufLabel: string;
  };
}

const loadAuthState = (): AuthState => {
  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem('authState');
    return saved ? JSON.parse(saved) : { 
      isAdmin: false,
      adminLinks: {
        aufLink: '/AUF/edit',
        aufLabel: 'BOSS'
      }
    };
  }
  return { 
    isAdmin: false,
    adminLinks: {
      aufLink: '/AUF/edit',
      aufLabel: 'BOSS'
    }
  };
};

const initialState: AuthState = loadAuthState();

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginAdmin: (state) => {
      state.isAdmin = true;
      if (typeof window !== 'undefined') {
        localStorage.setItem('authState', JSON.stringify(state));
      }
    },
    logoutAdmin: (state) => {
      state.isAdmin = false;
      if (typeof window !== 'undefined') {
        localStorage.removeItem('authState');
      }
    },
    setAdminLinks: (state, action: PayloadAction<{link: string, label: string}>) => {
      state.adminLinks = {
        aufLink: action.payload.link,
        aufLabel: action.payload.label
      };
      if (typeof window !== 'undefined') {
        localStorage.setItem('authState', JSON.stringify(state));
      }
    }
  },
});

export const { loginAdmin, logoutAdmin, setAdminLinks } = authSlice.actions;
export default authSlice.reducer;