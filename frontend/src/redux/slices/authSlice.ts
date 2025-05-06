// src/redux/slices/authSlice.ts

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  isAuthenticated: boolean;
  isAdmin: boolean;
  adminLinks: {
    link: string;
    label: string;
  };
}

const loadAuthState = (): AuthState => {
  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem('authState');
    return saved ? JSON.parse(saved) : { 
      isAuthenticated: false,
      isAdmin: false,
      adminLinks: {
        link: '/AUF/edit',
        label: 'BOSS'
      }
    };
  }
  return { 
    isAuthenticated: false,
    isAdmin: false,
    adminLinks: {
      link: '/AUF/edit',
      label: 'BOSS'
    }
  };
};

const initialState: AuthState = loadAuthState();

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginAdmin: (state) => {
      state.isAuthenticated = true;
      state.isAdmin = true;
      saveToLocalStorage(state);
    },
    loginUser: (state) => {
      state.isAuthenticated = true;
      state.isAdmin = false;
      saveToLocalStorage(state);
    },
    logoutAdmin: (state) => {
      state.isAuthenticated = false;
      state.isAdmin = false;
      clearLocalStorage();
    },
    logoutUser: (state) => {
      state.isAuthenticated = false;
      state.isAdmin = false;
      clearLocalStorage();
    },
    setAdminLinks: (state, action: PayloadAction<{link: string, label: string}>) => {
      state.adminLinks = {
        link: action.payload.link,
        label: action.payload.label
      };
      saveToLocalStorage(state);
    }
  },
});

function saveToLocalStorage(state: AuthState) {
  if (typeof window !== 'undefined') {
    localStorage.setItem('authState', JSON.stringify(state));
  }
}

function clearLocalStorage() {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('authState');
  }
}

export const { loginAdmin, loginUser, logoutAdmin, logoutUser, setAdminLinks } = authSlice.actions;
export default authSlice.reducer;