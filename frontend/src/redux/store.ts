// store.ts
import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './slices/counterSlice';
import { TypedUseSelectorHook, useSelector, useDispatch } from 'react-redux';
import authReducer from './slices/authSlice';

// Створюємо store першим
export const store = configureStore({
  reducer: {
    counter: counterReducer,
    auth: authReducer
  },
});

// Оголошуємо типи на основі створеного store
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Експортуємо хуки з правильними типами
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppDispatch: () => AppDispatch = useDispatch;