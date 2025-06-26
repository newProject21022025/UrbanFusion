// store.ts
import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useSelector, useDispatch } from 'react-redux';
import authReducer from './slices/authSlice';
import basketReducer from './slices/basketSlice';
import favoritesReducer from './slices/favoritesSlice';
import userReducer from './slices/userSlice';

// Створюємо store першим
export const store = configureStore({
  reducer: {
    auth: authReducer,
    basket: basketReducer,
    favorites: favoritesReducer,
    user: userReducer,
  },
});

// Оголошуємо типи на основі створеного store
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Експортуємо хуки з правильними типами
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppDispatch: () => AppDispatch = useDispatch;
// export const useAppDispatch = () => useDispatch<AppDispatch>();  // <-- Ось тут зміни!